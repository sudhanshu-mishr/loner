import { Footer } from '@/components/marketing/footer';
import { Hero } from '@/components/marketing/hero';
import { Navbar } from '@/components/marketing/navbar';
import { FeatureSections } from '@/components/marketing/sections';
export default function HomePage() { return <><Navbar /><main><Hero /><FeatureSections /><section className="mx-auto max-w-7xl px-4 py-16"><div className="grid gap-4 md:grid-cols-3">{['“A calmer way to meet strangers.”','“The safety reminders make it feel intentional.”','“Perfect for low-pressure language practice.”'].map((quote) => <blockquote key={quote} className="rounded-3xl border border-border bg-card p-6 text-muted-foreground">{quote}<footer className="mt-4 text-sm text-foreground">Beta tester</footer></blockquote>)}</div></section></main><Footer /></>; }
