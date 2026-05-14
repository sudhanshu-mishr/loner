import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { joinQueue, leaveQueue, endActiveSession, getQueueSnapshot } from '@/features/matchmaking/matchmaking-service';
import { moderateText } from '@/features/moderation/moderation-service';
import type { QueueJoinPayload } from '@/types/realtime';

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const httpServer = createServer((request, response) => {
  if (request.url === '/health') {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ ok: true, service: 'loners-realtime' }));
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ ok: false, error: 'not_found' }));
});
const io = new Server(httpServer, { cors: { origin: allowedOrigins, credentials: true } });
const userSockets = new Map<string, string>();
const sessionUsers = new Map<string, [string, string]>();

io.on('connection', (socket) => {
  socket.on('presence:hello', ({ userId }) => { userSockets.set(userId, socket.id); socket.data.userId = userId; socket.emit('presence:ready', { heartbeatMs: 25_000 }); });
  socket.on('queue:join', (payload: QueueJoinPayload) => {
    const match = joinQueue({ ...payload, socketId: socket.id });
    if (!match) return socket.emit('queue:state', { state: 'searching', snapshot: getQueueSnapshot() });
    const partnerSocket = userSockets.get(match.partnerId);
    if (!partnerSocket) return socket.emit('queue:state', { state: 'searching', snapshot: getQueueSnapshot() });
    sessionUsers.set(match.sessionId, [payload.userId, match.partnerId]);
    socket.join(match.sessionId); io.sockets.sockets.get(partnerSocket)?.join(match.sessionId);
    socket.emit('match:found', match);
    io.to(partnerSocket).emit('match:found', { ...match, partnerId: payload.userId, initiator: false });
  });
  socket.on('queue:leave', ({ userId }) => { leaveQueue(userId); socket.emit('queue:state', { state: 'idle' }); });
  socket.on('call:offer', (payload) => socket.to(payload.sessionId).emit('call:offer', payload));
  socket.on('call:answer', (payload) => socket.to(payload.sessionId).emit('call:answer', payload));
  socket.on('call:ice-candidate', (payload) => socket.to(payload.sessionId).emit('call:ice-candidate', payload));
  socket.on('chat:typing', (payload) => socket.to(payload.sessionId).emit('chat:typing', payload));
  socket.on('chat:message', (payload) => {
    const moderation = moderateText(payload.body);
    if (moderation.warning) socket.emit('moderation:warning', moderation.warning);
    if (!moderation.allowed) return io.to(payload.sessionId).emit('moderation:disconnect', moderation.warning);
    io.to(payload.sessionId).emit('chat:message', { ...payload, moderated: moderation.score > 0 });
  });
  socket.on('session:next', ({ userId, sessionId }) => { endActiveSession(userId); socket.to(sessionId).emit('partner:disconnected', { reason: 'skipped' }); socket.leave(sessionId); });
  socket.on('session:end', ({ userId, sessionId }) => { endActiveSession(userId); io.to(sessionId).emit('session:ended', { reason: 'ended' }); });
  socket.on('user:report', (payload) => io.to(payload.sessionId).emit('moderation:warning', { level: 'notice', reason: 'report_received', message: 'Thanks. A report was sent and safety tools are available.' }));
  socket.on('user:block', ({ sessionId }) => io.to(sessionId).emit('session:ended', { reason: 'blocked' }));
  socket.on('disconnect', () => { const userId = socket.data.userId; if (userId) { leaveQueue(userId); endActiveSession(userId); userSockets.delete(userId); } });
});

const port = Number(process.env.PORT ?? 4000);
httpServer.listen(port, () => console.log(`Loners realtime server listening on :${port}`));
