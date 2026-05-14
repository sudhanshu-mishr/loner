# Deployment notes

## Vercel frontend

1. Import the repository into Vercel.
2. Set `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SOCKET_URL`, Stripe keys, CAPTCHA secret, and moderation provider endpoints.
3. Run `prisma generate` during build.
4. Use Vercel Edge/Node route handlers for APIs that do not require long-lived sockets.

## Realtime server

Deploy `server/realtime/socket-server.ts` as a separate Node service on Railway, Render, Fly.io, or Kubernetes. Configure CORS to the production `NEXT_PUBLIC_APP_URL`. Add Redis adapter for multi-instance scaling and persistent queue/presence.

## Database

Use Neon, Supabase, RDS, or Railway PostgreSQL. Run migrations with `npm run prisma:migrate` in CI or a release job. Enable PITR backups and separate production/staging databases.

## TURN/STUN

Use managed TURN for production mobile networks. Set `TURN_URL`, `TURN_USERNAME`, and `TURN_CREDENTIAL`. The client currently ships with a STUN placeholder and is ready to add TURN credentials through a protected API.

## Stripe

Replace the checkout placeholder with `stripe.checkout.sessions.create`. Verify webhook signatures with `STRIPE_WEBHOOK_SECRET`, then update `Subscription` and `Payment` records idempotently.

## Security checklist

- Rotate secrets and keep them out of Git.
- Add production Redis-backed rate limits.
- Add CAPTCHA at guest entry, auth, queue joins, and contact forms.
- Add CSRF protections for browser-mutating endpoints if cookie auth is used.
- Keep audit logs for admin actions and sanctions.
- Configure strict CSP headers before launch.
