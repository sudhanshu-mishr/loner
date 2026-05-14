import { ShieldCheck } from 'lucide-react';
import { ProfileEditor } from '@/components/profile/profile-editor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
export default function ProfilePage() { return <main className="mx-auto max-w-4xl px-4 py-8"><Card><CardHeader><div className="flex items-center gap-4"><div className="grid size-20 place-items-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">MH</div><div><CardTitle>midnighthuman</CardTitle><div className="mt-2 flex gap-2"><Badge tone="safe"><ShieldCheck className="mr-1 size-3" />Verified email</Badge><Badge>Premium trial</Badge></div></div></div></CardHeader><CardContent><ProfileEditor /></CardContent></Card></main>; }
