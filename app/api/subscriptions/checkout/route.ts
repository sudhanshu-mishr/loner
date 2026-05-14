import { ok } from '@/lib/api'; import { requireUser } from '@/server/auth/session';
export async function POST() { const user = await requireUser(); return ok({ checkoutUrl: `https://checkout.stripe.com/pay/mock_${user.id}`, note: 'Replace with Stripe checkout.sessions.create and webhook signature verification.' }); }
