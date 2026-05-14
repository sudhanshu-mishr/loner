import { ok } from '@/lib/api'; import { leaveQueue } from '@/features/matchmaking/matchmaking-service'; import { requireUser } from '@/server/auth/session';
export async function POST() { const user = await requireUser(); leaveQueue(user.id); return ok({ state: 'idle' }); }
