'use client';
import { Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function BlockButton({ blockedId }: { blockedId?: string }) { return <Button variant="outline" onClick={() => fetch('/api/block', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ blockedId, reason: 'Blocked during chat' }) })}><Ban className="size-4" />Block</Button>; }
