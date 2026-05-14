'use client';
import * as ProgressPrimitive from '@radix-ui/react-progress';
export function Progress({ value = 0 }: { value?: number }) { return <ProgressPrimitive.Root className="h-2 overflow-hidden rounded-full bg-secondary"><ProgressPrimitive.Indicator className="h-full bg-primary transition-all" style={{ transform: `translateX(-${100 - value}%)` }} /></ProgressPrimitive.Root>; }
