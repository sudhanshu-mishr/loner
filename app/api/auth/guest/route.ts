import { NextResponse } from 'next/server';
import { setSession } from '@/server/auth/session';
import { prisma } from '@/lib/prisma';
export async function GET() { const user = await prisma.user.create({ data: { trustScore: 35, profile: { create: { username: `guest_${crypto.randomUUID().slice(0, 8)}`, ageConfirmed: false } }, guestSessions: { create: { guestTokenHash: crypto.randomUUID(), expiresAt: new Date(Date.now() + 12*60*60*1000) } } } }); await setSession({ id: user.id, role: 'USER', isGuest: true }); return NextResponse.redirect(new URL('/onboarding', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')); }
