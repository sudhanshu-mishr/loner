import { z } from 'zod'; import { ok, readJson } from '@/lib/api'; import { prisma } from '@/lib/prisma'; import { requireUser } from '@/server/auth/session';
const schema = z.object({ blockedId: z.string(), reason: z.string().optional() });
export async function POST(request: Request) { const user = await requireUser(); const data = await readJson(request, schema); return ok(await prisma.blockRelation.upsert({ where: { blockerId_blockedId: { blockerId: user.id, blockedId: data.blockedId } }, update: { reason: data.reason }, create: { blockerId: user.id, ...data } })); }
