import { ShieldAlert } from 'lucide-react';
export function WarningBanner({ message }: { message: string }) { return <div role="alert" className="flex items-center gap-3 rounded-3xl border border-amber-400/30 bg-amber-400/10 p-4 text-amber-100"><ShieldAlert className="size-5" /><p className="text-sm">{message}</p></div>; }
