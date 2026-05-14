import { z } from 'zod'; import { fail, ok, readJson } from '@/lib/api'; import { ipKey, rateLimit } from '@/lib/rate-limit';
const schema = z.object({ email: z.string().email() });
export async function POST(request: Request) { const limit = rateLimit(ipKey(request, 'otp'), 5, 60_000); if (!limit.allowed) return fail('RATE_LIMITED','Too many OTP attempts',429); const { email } = await readJson(request, schema); return ok({ email, message: 'OTP delivery provider hook goes here.' }); }
