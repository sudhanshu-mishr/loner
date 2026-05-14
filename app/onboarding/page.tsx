import type { LucideIcon } from 'lucide-react';
import { Camera, CheckCircle, Languages, ShieldCheck, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type OnboardingStep = {
  label: string;
  icon: LucideIcon;
};

const steps: OnboardingStep[] = [
  { label: 'Username', icon: User },
  { label: 'Age confirmation', icon: CheckCircle },
  { label: 'Languages', icon: Languages },
  { label: 'Safety rules', icon: ShieldCheck },
  { label: 'Permissions', icon: Camera }
];

const tags = ['English', 'Spanish', 'Music', 'Travel', 'Late-night', 'Study'];

export default function OnboardingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-4xl font-bold">Set up a safer first chat</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-[260px_1fr]">
        <Card>
          <CardContent className="space-y-3 pt-6">
            {steps.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 rounded-2xl bg-secondary p-3">
                <Icon className="size-4 text-primary" aria-hidden="true" />
                {label}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your basics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Username" aria-label="Username" />
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <label className="flex gap-3 text-sm">
              <input type="checkbox" />
              <span>I will not share personal information, explicit content, threats, scams, or harassment.</span>
            </label>
            <p className="rounded-2xl bg-secondary p-4 text-sm text-muted-foreground">
              Camera and microphone are consent-first. Loners does not record sessions by default.
            </p>
            <Button>Complete onboarding</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
