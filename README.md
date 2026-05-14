# Loners

Loners is a production-oriented MVP scaffold for a safer random video, audio, and text chat platform. It uses Next.js App Router, TypeScript, Tailwind CSS, Prisma/PostgreSQL, Socket.IO signaling, WebRTC hooks, and a moderation-first product architecture.

## System architecture

- **Frontend:** Next.js App Router pages in `app/`, shadcn-style primitives in `components/ui`, product components in `components/*`, Zustand chat state, Framer Motion-ready UI.
- **Backend APIs:** Route handlers under `app/api/*` with Zod validation, structured responses, rate-limit helpers, auth guards, and audit logging.
- **Realtime:** `server/realtime/socket-server.ts` runs a Socket.IO service for queue events, signaling, chat messages, typing, warnings, and disconnects.
- **Database:** PostgreSQL with Prisma models for users, profiles, preferences, sessions, reports, moderation flags, bans, appeals, subscriptions, device fingerprints, blocks, verification, audit logs, and admin users.
- **Moderation:** Client reporting, text risk scanning, media moderation hook plan, report risk scoring, sanctions ladder, appeal routes, admin review queues, and trust-pool matching.
- **Deployment:** Vercel for Next.js, Railway/Render/Fly for Socket.IO, Neon/Supabase for Postgres, Redis-ready queue/rate-limit upgrade path, Stripe checkout architecture.

## Socket event map

| Event | Direction | Purpose |
| --- | --- | --- |
| `presence:hello` | client → server | Register socket and heartbeat expectations. |
| `queue:join` / `queue:leave` | client → server | Enter or exit trust-aware matching. |
| `match:found` | server → client | Notify each participant of session, partner, mode, and safety reminder. |
| `call:offer` / `call:answer` / `call:ice-candidate` | both | WebRTC signaling. |
| `chat:message` / `chat:typing` | both | Text messaging and typing indicator. |
| `session:next` / `session:end` | client → server | Skip or end current session. |
| `user:report` / `user:block` | client → server | Safety actions during session. |
| `moderation:warning` / `moderation:disconnect` | server → client | Risk-based safety UX and severe enforcement. |

## Route map

- `POST /api/auth/otp` send verification hook
- `GET /api/auth/guest` create limited guest session
- `GET/PUT /api/profile` profile CRUD
- `PUT /api/preferences` matching preferences
- `POST /api/onboarding` onboarding completion
- `POST /api/queue/join`, `POST /api/queue/leave` queue controls
- `POST /api/session` persisted session creation
- `POST /api/reports`, `POST /api/block` safety actions
- `POST /api/moderation/review` moderator decisions
- `POST /api/admin/sanctions`, `GET /api/admin/stats` admin tools
- `POST /api/appeals` appeals workflow
- `POST /api/subscriptions/checkout` Stripe checkout placeholder
- `POST /api/contact` support intake

## Page map

Landing, auth, onboarding, dashboard, video chat, text chat, profile, settings, safety center, pricing, admin dashboard, terms, privacy, community guidelines, safety tips, cookies, and contact pages are included.

## Moderation flow

1. Onboarding sets expectations and confirms age/community rules.
2. Matching separates high-trust and new/unverified users with guest limits.
3. Text messages run through fast risk checks; media moderation providers can sample consented blurred preview frames.
4. Reports create structured records with evidence references and risk scores.
5. Admins review flags/reports, add notes through audit logs, and apply sanctions.
6. Users can appeal bans/suspensions; support resolves with transparent responses.

## Folder structure

```txt
app/                 Next.js pages and API routes
components/          UI primitives plus marketing, chat, video, profile, moderation, and admin components
features/            Matchmaking, moderation, and WebRTC feature logic
hooks/               Client hooks such as socket lifecycle
lib/                 Prisma, API response, utility, and rate-limit helpers
server/              Auth/session helpers and standalone realtime server
store/               Zustand state
types/               Shared TypeScript event payloads
prisma/              Database schema and seed script
docs/                Deployment and operational notes
```

## Final run guide

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev:socket
npm run dev
```

Open `http://localhost:3000`, start the Socket.IO server on port `4000`, and use a PostgreSQL database URL in `.env`.
