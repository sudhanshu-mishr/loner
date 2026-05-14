import { prisma } from '@/lib/prisma';
import type { ModerationWarningPayload } from '@/types/realtime';

const spamPhrases = [/\bfree\s+crypto\b/i, /\btelegram\s+me\b/i, /\bsend\s+nudes\b/i, /\bwhatsapp\b/i];
const harassmentTerms = [/\bkill yourself\b/i, /\bslur\b/i, /\bthreaten\b/i];

export type TextModerationResult = { allowed: boolean; score: number; flags: string[]; warning?: ModerationWarningPayload };
export function moderateText(body: string): TextModerationResult {
  const flags = [...spamPhrases.filter((r) => r.test(body)).map(() => 'SPAM'), ...harassmentTerms.filter((r) => r.test(body)).map(() => 'HARASSMENT')];
  const score = Math.min(100, flags.length * 45 + (body.length > 1200 ? 20 : 0));
  if (score >= 80) return { allowed: false, score, flags, warning: { level: 'disconnect', reason: 'high_risk_text', message: 'This session was stopped because the message appears to violate community rules.' } };
  if (score >= 40) return { allowed: true, score, flags, warning: { level: 'warning', reason: 'possible_abuse', message: 'Please keep conversations safe and respectful.' } };
  return { allowed: true, score, flags };
}

export async function recordFlag(input: { userId: string; sessionId?: string; type: 'SPAM' | 'HARASSMENT' | 'NUDITY' | 'SEXUAL' | 'VIOLENCE' | 'UNDERAGE' | 'BOT' | 'SUSPICIOUS_BEHAVIOR'; confidence: number; source: string; payload?: unknown; }) {
  return prisma.moderationFlag.create({ data: { ...input, payload: input.payload as object | undefined } });
}
export function imageModerationPlan() {
  return ['Sample blurred preview frames only after consent.', 'Hash and discard non-evidence frames by default.', 'Escalate high-confidence explicit/violence/underage signals.', 'Preserve user-submitted report evidence with retention policy.'];
}
export const sanctionsLadder = [
  { level: 'warning', trigger: 'first low-confidence issue' },
  { level: 'cooldown', trigger: 'spam, repeated skips after reports, repeated warnings' },
  { level: 'temporary suspension', trigger: 'credible harassment, explicit content, evasion' },
  { level: 'permanent ban', trigger: 'severe sexual content, underage risk, threats, scams, repeated evasion' }
];
