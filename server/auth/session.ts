import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export type SessionUser = { id: string; role: 'USER' | 'MODERATOR' | 'ADMIN' | 'SUPPORT'; isGuest?: boolean };
const cookieName = 'loners_session';

export async function createSessionToken(user: SessionUser) {
  return jwt.sign(user, process.env.JWT_SECRET ?? 'dev-secret', { expiresIn: user.isGuest ? '12h' : '14d' });
}
export async function setSession(user: SessionUser) {
  (await cookies()).set(cookieName, await createSessionToken(user), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/' });
}
export async function getSessionUser(): Promise<SessionUser | null> {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  try { return jwt.verify(token, process.env.JWT_SECRET ?? 'dev-secret') as SessionUser; } catch { return null; }
}
export async function requireUser() { const user = await getSessionUser(); if (!user) throw new Error('UNAUTHORIZED'); return user; }
export async function requireAdmin() {
  const user = await requireUser();
  if (!['ADMIN', 'MODERATOR', 'SUPPORT'].includes(user.role)) throw new Error('FORBIDDEN');
  const admin = await prisma.adminUser.findUnique({ where: { userId: user.id } });
  if (!admin || !admin.active) throw new Error('FORBIDDEN');
  return { user, admin };
}
