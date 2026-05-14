import type { LucideIcon } from 'lucide-react';
import { Activity, Flag, ShieldAlert, Users } from 'lucide-react';
import { AdminTable } from '@/components/admin/admin-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type MetricCard = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const cards: MetricCard[] = [
  { label: 'Active users', value: '1,284', icon: Users },
  { label: 'Open reports', value: '42', icon: Flag },
  { label: 'Flagged sessions', value: '17', icon: ShieldAlert },
  { label: 'Socket health', value: '99.9%', icon: Activity }
];

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-4xl font-bold">Moderation dashboard</h1>
      <p className="text-muted-foreground">Role-gated review queue, sanctions, appeals, and system health.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardHeader>
              <Icon className="size-5 text-primary" aria-hidden="true" />
              <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-bold">{value}</CardContent>
          </Card>
        ))}
      </div>
      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold">Review queue</h2>
        <AdminTable />
      </section>
    </main>
  );
}
