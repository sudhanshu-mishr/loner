import { z } from 'zod'; import { ok, readJson } from '@/lib/api'; import { prisma } from '@/lib/prisma'; import { requireUser } from '@/server/auth/session';
const schema = z.object({ partnerId: z.string(), mode: z.enum(['VIDEO','AUDIO','TEXT','SAFE_TEXT_FIRST']) });
export async function POST(request: Request) { const user = await requireUser(); const { partnerId, mode } = await readJson(request, schema); return ok(await prisma.chatSession.create({ data: { mode, participants: { create: [{ userId: user.id, role: 'INITIATOR' }, { userId: partnerId, role: 'PARTNER' }] } } })); }
