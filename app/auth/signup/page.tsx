import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
export default function SignUp() { return <main className="grid min-h-screen place-items-center p-4 safe-gradient"><Card className="w-full max-w-md glass"><CardHeader><CardTitle>Create your Loners account</CardTitle></CardHeader><CardContent className="space-y-4"><Input placeholder="Email" /><Input type="password" placeholder="Password" /><p className="text-xs text-muted-foreground">By continuing you confirm you meet the minimum age requirements and agree to strict community standards.</p><Button className="w-full">Continue</Button><Button asChild variant="secondary" className="w-full"><Link href="/api/auth/guest">Continue as guest</Link></Button></CardContent></Card></main>; }
