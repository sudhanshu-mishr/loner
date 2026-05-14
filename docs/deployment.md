# Render deployment guide

Loners is configured to deploy the entire platform on Render from the repository root with `render.yaml`.

## What Render creates

The Blueprint creates four managed resources:

1. `loners-web` — a Node web service that runs the Next.js app, API routes, admin pages, legal pages, and marketing site.
2. `loners-realtime` — a Node web service that runs the Socket.IO matchmaking and WebRTC signaling server.
3. `loners-db` — a Render Postgres database connected to both services through `DATABASE_URL`.
4. `loners-cache` — a Render Key Value instance connected through `REDIS_URL` for production queue, presence, and rate-limit upgrades.

Render Blueprints support service definitions, build/start commands, pre-deploy commands, databases, Key Value instances, generated secrets, and `sync: false` prompts for sensitive values. The included Blueprint uses those features so the app can be provisioned from one file.

## One-click Blueprint flow

1. Push this repository to GitHub/GitLab.
2. In Render, choose **New +** → **Blueprint**.
3. Select the repository and confirm the root `render.yaml`.
4. When prompted, provide values for the `sync: false` variables:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `CAPTCHA_SECRET_KEY`
   - `MODERATION_IMAGE_ENDPOINT`
   - `MODERATION_TEXT_ENDPOINT`
5. Create the Blueprint.
6. After Render creates the services, verify these public URL values:
   - `NEXT_PUBLIC_APP_URL=https://loners-web.onrender.com`
   - `NEXT_PUBLIC_SOCKET_URL=https://loners-realtime.onrender.com`
   - `ALLOWED_ORIGINS=https://loners-web.onrender.com`
7. If you add a custom domain, update all three values to use the custom app origin and realtime origin.

## Render commands

### `loners-web`

- Build command: `npm install && npm run render:build`
- Pre-deploy command: `npm run prisma:deploy`
- Start command: `npm run render:start`
- Health check path: `/`

`render:build` runs `prisma generate` and `next build`. The pre-deploy command runs `prisma db push` so the MVP schema is applied to the Render Postgres database before the app starts.

### `loners-realtime`

- Build command: `npm install && npm run prisma:generate`
- Start command: `npm run render:socket`
- Health check path: `/health`

The realtime server binds to Render's `PORT` environment variable and exposes `/health` for Render health checks.

## Production notes

- The Blueprint defaults to predictable Render subdomains. Rename the services only if you also update the public URL environment variables.
- `JWT_SECRET` and `ADMIN_ACTION_SECRET` are generated once in the shared environment group and mounted into both services.
- `REDIS_URL` is wired now, but the current MVP matchmaking remains in-memory. Before horizontal scaling, move queues, active sessions, rate limits, and Socket.IO presence to Render Key Value/Redis.
- For stricter production database governance, replace `prisma db push` with checked-in Prisma migrations and change `prisma:deploy` to `prisma migrate deploy`.
- Use managed TURN credentials for production mobile WebRTC reliability and set `TURN_URL`, `TURN_USERNAME`, and `TURN_CREDENTIAL` manually in Render.
- Keep Stripe webhook signature verification and moderation provider credentials as dashboard-managed secrets.
