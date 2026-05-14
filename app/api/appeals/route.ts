import { z } from 'zod'; import { ok, readJson } from '@/lib/api'; import { prisma } from '@/lib/prisma'; import { requireUser } from '@/server/auth/session';
const schema = z.object({ banId: z.string().optional(), message: z.string().min(20).max(2000) });
export async function POST(request: Request) { const user = await requireUser(); const data = await readJson(request, schema); return ok(await prisma.appeal.create({ data: { userId: user.id, ...data } })); }
