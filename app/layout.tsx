import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Loners — Talk to someone new, instantly.', template: '%s | Loners' },
  description: 'A safer random video, audio, and text chat platform for spontaneous conversations.',
  openGraph: { title: 'Loners', description: 'Meet someone new without the chaos.', type: 'website' },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000')
};
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en" suppressHydrationWarning><body><ThemeProvider attribute="class" defaultTheme="dark" enableSystem>{children}</ThemeProvider></body></html>; }
