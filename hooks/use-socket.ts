'use client';
import { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

export function useSocket(userId: string) {
  const socket = useMemo(() => io(process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:4000', { autoConnect: false, transports: ['websocket'] }), []);
  useEffect(() => { socket.connect(); socket.emit('presence:hello', { userId }); return () => { socket.disconnect(); }; }, [socket, userId]);
  return socket;
}
