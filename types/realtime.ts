export type QueueState = 'idle' | 'searching' | 'matched' | 'reconnecting' | 'ended';
export type ChatMode = 'VIDEO' | 'AUDIO' | 'TEXT' | 'SAFE_TEXT_FIRST';
export type MatchFilters = { mode: ChatMode; languages: string[]; regions: string[]; interests: string[]; verifiedOnly?: boolean; safeModeTextFirst?: boolean; };
export type QueueJoinPayload = { userId: string; guestId?: string; filters: MatchFilters; trustScore: number; socketId: string; };
export type MatchFoundPayload = { sessionId: string; partnerId: string; initiator: boolean; mode: ChatMode; sharedInterests: string[]; safetyReminder: string; };
export type ChatMessagePayload = { sessionId: string; senderId: string; body: string; sentAt: string; clientId: string; };
export type ModerationWarningPayload = { level: 'notice' | 'warning' | 'disconnect'; message: string; reason: string; };
