'use client';
import { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
export function VideoPanel({ stream, label, muted }: { stream?: MediaStream | null; label: string; muted?: boolean }) { const ref = useRef<HTMLVideoElement>(null); useEffect(() => { if (ref.current && stream) ref.current.srcObject = stream; }, [stream]); return <div className="relative aspect-video overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950"><video ref={ref} autoPlay playsInline muted={muted} className="h-full w-full object-cover" /><Badge className="absolute left-4 top-4">{label}</Badge>{!stream && <div className="absolute inset-0 grid place-items-center text-muted-foreground">Waiting for media…</div>}</div>; }
