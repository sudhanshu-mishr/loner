'use client';
import { create } from 'zustand';
import type { QueueState, ChatMessagePayload, MatchFoundPayload } from '@/types/realtime';

type ChatStore = { queueState: QueueState; match?: MatchFoundPayload; messages: ChatMessagePayload[]; setQueueState: (state: QueueState) => void; setMatch: (match?: MatchFoundPayload) => void; addMessage: (message: ChatMessagePayload) => void; reset: () => void; };
export const useChatStore = create<ChatStore>((set) => ({ queueState: 'idle', messages: [], setQueueState: (queueState) => set({ queueState }), setMatch: (match) => set({ match, queueState: match ? 'matched' : 'idle' }), addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })), reset: () => set({ queueState: 'idle', match: undefined, messages: [] }) }));
