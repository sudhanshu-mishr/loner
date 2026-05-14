import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
export default function SignIn() { return <main className="grid min-h-screen place-items-center p-4 safe-gradient"><Card className="w-full max-w-md glass"><CardHeader><CardTitle>Welcome back</CardTitle></CardHeader><CardContent className="space-y-4"><Input type="email" placeholder="Email" aria-label="Email" /><Input type="password" placeholder="Password" aria-label="Password" /><Button className="w-full">Sign in</Button><div className="flex justify-between text-sm text-muted-foreground"><Link href="/auth/forgot">Forgot password?</Link><Link href="/auth/signup">Create account</Link></div></CardContent></Card></main>; }
