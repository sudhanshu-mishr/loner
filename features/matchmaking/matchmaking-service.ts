import type { MatchFilters, QueueJoinPayload, MatchFoundPayload } from '@/types/realtime';

type QueueEntry = QueueJoinPayload & { joinedAt: number; recentPartnerIds: Set<string> };
const queues = new Map<string, QueueEntry>();
const activeSessions = new Map<string, string>();

function scoreCompatibility(a: QueueEntry, b: QueueEntry) {
  if (a.userId === b.userId) return -Infinity;
  if (a.recentPartnerIds.has(b.userId) || b.recentPartnerIds.has(a.userId)) return -Infinity;
  if (activeSessions.has(a.userId) || activeSessions.has(b.userId)) return -Infinity;
  if (a.filters.mode !== b.filters.mode && a.filters.mode !== 'SAFE_TEXT_FIRST' && b.filters.mode !== 'SAFE_TEXT_FIRST') return -20;
  if ((a.filters.verifiedOnly && b.trustScore < 70) || (b.filters.verifiedOnly && a.trustScore < 70)) return -Infinity;
  const interests = a.filters.interests.filter((tag) => b.filters.interests.includes(tag)).length;
  const language = a.filters.languages.some((lang) => b.filters.languages.includes(lang)) ? 20 : 0;
  const region = a.filters.regions.length === 0 || b.filters.regions.length === 0 || a.filters.regions.some((r) => b.filters.regions.includes(r)) ? 8 : -5;
  const trustBand = Math.abs(a.trustScore - b.trustScore) < 35 ? 10 : -10;
  const waitBoost = Math.min(15, Math.floor((Date.now() - a.joinedAt + Date.now() - b.joinedAt) / 20_000));
  return interests * 14 + language + region + trustBand + waitBoost;
}

function sharedInterests(a: MatchFilters, b: MatchFilters) { return a.interests.filter((tag) => b.interests.includes(tag)).slice(0, 4); }
export function leaveQueue(userId: string) { queues.delete(userId); }
export function endActiveSession(userId: string) { activeSessions.delete(userId); }
export function joinQueue(entry: QueueJoinPayload): MatchFoundPayload | null {
  const current: QueueEntry = { ...entry, joinedAt: Date.now(), recentPartnerIds: new Set() };
  let best: QueueEntry | null = null;
  let bestScore = 25;
  for (const candidate of queues.values()) {
    const score = scoreCompatibility(current, candidate);
    if (score > bestScore) { best = candidate; bestScore = score; }
  }
  if (!best) { queues.set(entry.userId, current); return null; }
  queues.delete(best.userId);
  const sessionId = `sess_${crypto.randomUUID()}`;
  activeSessions.set(entry.userId, sessionId);
  activeSessions.set(best.userId, sessionId);
  return { sessionId, partnerId: best.userId, initiator: true, mode: entry.filters.mode, sharedInterests: sharedInterests(entry.filters, best.filters), safetyReminder: 'Keep it kind. Never share personal information. Report anything uncomfortable.' };
}
export function getQueueSnapshot() { return { waiting: queues.size, active: activeSessions.size / 2 }; }
