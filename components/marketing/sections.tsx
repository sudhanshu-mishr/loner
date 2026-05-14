import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Crown, Languages, Lock, Radar, ShieldCheck, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Feature = {
  title: string;
  icon: LucideIcon;
  body: string;
};

const features: Feature[] = [
  { title: 'Fast matching', icon: Radar, body: 'Queue by mode, interests, language, region, and trust pool.' },
  { title: 'Video, audio, text', icon: Sparkles, body: 'Start text-only, use audio fallback, or unlock video after consent.' },
  { title: 'Safety by default', icon: ShieldCheck, body: 'Always-visible report/block, risk scoring, warnings, and review queues.' },
  { title: 'Privacy controls', icon: Lock, body: 'Minimal retention, delete/export flows, and no session recording by default.' },
  { title: 'Language practice', icon: Languages, body: 'Match by language goals and keep translation hooks ready.' },
  { title: 'Premium filters', icon: Crown, body: 'Boosts, precision filters, verified badge, and ad-free mode.' }
];

const faqs = [
  {
    question: 'Does Loners record sessions?',
    answer: 'No. Loners does not record chats by default. User-submitted reports may include evidence and are retained only according to policy.'
  },
  {
    question: 'Can I use guest mode?',
    answer: 'Yes, with limited sessions, stricter rate limits, and safety checks to reduce abuse.'
  },
  {
    question: 'What happens after a report?',
    answer: 'Reports are risk scored, correlated with account/device signals, and escalated to human review when needed.'
  }
];

export function FeatureSections() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold md:text-5xl">Meet someone new without the chaos.</h2>
          <p className="mt-4 text-muted-foreground">Built for spontaneous conversations, designed for safer connections.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, icon: Icon, body }) => (
            <Card key={title} className="glass">
              <CardHeader>
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">{body}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>How it works</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {['Choose text or video', 'Confirm safety rules', 'Match, chat, skip, or report'].map((item, index) => (
              <div key={item} className="rounded-3xl bg-secondary p-5">
                <span className="text-3xl font-bold text-primary">0{index + 1}</span>
                <p className="mt-3 font-medium">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-primary/30 bg-primary/10">
          <CardHeader>
            <CardTitle>Loners Premium</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>Precision language/region filters, queue boost, rematch, invisible mode, verified badge, and ad-free discovery.</p>
            <Button asChild>
              <Link href="/pricing">See plans</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <FAQ />
    </>
  );
}

function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <h2 className="mb-6 text-3xl font-bold">FAQ</h2>
      <div className="space-y-3">
        {faqs.map(({ question, answer }) => (
          <details key={question} className="group rounded-3xl border border-border bg-card px-5">
            <summary className="cursor-pointer list-none py-4 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {question}
            </summary>
            <p className="pb-4 text-muted-foreground">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
