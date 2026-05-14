import { z } from 'zod'; import { ok, readJson } from '@/lib/api'; import { prisma } from '@/lib/prisma'; import { requireUser } from '@/server/auth/session';
const schema = z.object({ username: z.string().min(3).max(32), bio: z.string().max(280).optional(), languages: z.array(z.string()).default([]), interests: z.array(z.string()).default([]), country: z.string().optional() });
export async function GET() { const user = await requireUser(); return ok(await prisma.profile.findUnique({ where: { userId: user.id } })); }
export async function PUT(request: Request) { const user = await requireUser(); const data = await readJson(request, schema); return ok(await prisma.profile.upsert({ where: { userId: user.id }, update: data, create: { userId: user.id, ...data } })); }
