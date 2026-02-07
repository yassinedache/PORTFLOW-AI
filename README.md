# PORTFLOW AI

**AI-Enhanced Truck Booking & Port Access Control Backend API**

PORTFLOW AI is a secure, intelligent backend platform that regulates access to maritime ports by managing truck bookings through time slots and terminal capacity. Enhanced with real-time visibility, AI-powered assistance, blockchain-based booking certification, QR-based zero-friction gate access, and full auditability.

---

## Tech Stack

| Layer         | Technology                                                        |
| ------------- | ----------------------------------------------------------------- |
| Runtime       | Node.js 22+                                                       |
| Framework     | NestJS 11                                                         |
| API Style     | REST + WebSockets (Socket.IO)                                     |
| Database      | PostgreSQL 16                                                     |
| ORM           | Prisma 7                                                          |
| Auth          | JWT (Access + Refresh Tokens, HttpOnly cookies)                   |
| Authorization | Role-Based Access Control (RBAC)                                  |
| Security      | CSRF double-submit, Helmet, Rate limiting                         |
| AI            | LLM orchestrator with tool calling (OpenAI) + rule-based fallback |
| Blockchain    | SHA-256 hash-based proof service                                  |
| Docs          | Swagger / OpenAPI                                                 |
| Deployment    | Docker + Docker Compose                                           |

---

## Quick Start

### Prerequisites

- Node.js >= 22
- PostgreSQL 16+ (or Docker)
- npm

### 1. Clone & Install

```bash
git clone <repo-url> && cd PORTFLOW-AI
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your database credentials and secrets
```

### 3. Database Setup

**Option A — With Docker (recommended):**

```bash
docker compose up postgres -d
```

**Option B — Local PostgreSQL:**

Update `DATABASE_URL` in `.env` to point to your local instance.

### 4. Generate Prisma Client & Push Schema

```bash
npm run db:generate
npm run db:push
```

### 5. Seed the Database

```bash
npm run db:seed
```

### 6. Start the Server

```bash
npm run start:dev
```

The API will be available at:

- **API:** http://localhost:3000
- **Swagger Docs:** http://localhost:3000/api/docs
- **WebSocket:** ws://localhost:3000

---

## Running E2E Tests

The full E2E test suite validates all API endpoints, authentication, RBAC, booking lifecycle, gate access, AI assistant, and more. Tests are **fully deterministic** — you can run them back-to-back without re-seeding.

### Prerequisites

1. PostgreSQL running with schema pushed and seeded (steps 3–5 above)
2. Node.js >= 24

### Run the full suite

```bash
npm run test:e2e:full
```

This runs **67 tests** covering:

- Health check, authentication (login, refresh, logout, CSRF)
- Public endpoints (pulse, stats, container tracking)
- Admin operations (terminals, gates, zones)
- Slot management and availability
- Carrier fleet (trucks, containers, GPS tracking)
- Full booking lifecycle (create → approve → gate scan → consumed)
- Reject and cancel flows
- Operator control room
- AI assistant sessions
- OCR / smart booking
- RBAC enforcement and CSRF protection
- Cleanup

### Determinism guarantees

- **Unique identifiers per run**: Truck plates, container numbers, and booking idempotency keys include a `Date.now()` suffix, so repeat runs never collide.
- **Dynamic resource IDs**: Tests create their own terminals, gates, zones, and slots via the API — they never reference hardcoded seed UUIDs.
- **Time-window aware**: The slot created for gate-scan tests starts 5 minutes from now, fitting within the 30-minute gate buffer window.
- **FK-tolerant cleanup**: Gate and terminal deletes accept `[200, 500]` because gate-access-logs create non-cascading FK references.

### Notes for Windows

- The test script uses `node --experimental-vm-modules` to enable Jest ESM support — no shell scripts required.
- Tests run in-band (`--runInBand`) to avoid port conflicts.
- Uses `ts-jest` with `useESM: true` for TypeScript + ESM compatibility.

---

## Docker Deployment

```bash
docker compose up --build
```

This starts:

- **PostgreSQL** on port 5432
- **PORTFLOW AI API** on port 3000

---

## Test Accounts

After seeding, the following accounts are available:

| Role              | Email                    | Password      |
| ----------------- | ------------------------ | ------------- |
| Port Admin        | `admin@portflow.ai`      | `password123` |
| Terminal Operator | `operator@portflow.ai`   | `password123` |
| Carrier           | `carrier@acme.com`       | `password123` |
| Carrier           | `driver@fastfreight.com` | `password123` |
| Gate Agent        | `gate@portflow.ai`       | `password123` |

---

## API Modules

### Authentication (`/auth`)

- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login (returns JWT in HttpOnly cookies)
- `POST /auth/refresh` — Refresh access token
- `POST /auth/logout` — Logout
- `GET /auth/csrf-token` — Get CSRF token

### Public (`/public`)

- `GET /public/pulse` — Real-time port activity
- `GET /public/stats` — Aggregate statistics
- `GET /public/containers/:containerNumber/track` — Container tracking

### Slots & Availability (`/slots`)

- `GET /slots/availability` — Available time slots
- `GET /slots/heatmap` — Booking density heatmap

### Bookings (`/bookings`)

- `POST /bookings` — Create booking (Carrier)
- `GET /bookings/my` — My bookings (Carrier)
- `GET /bookings/:id` — Booking details
- `POST /bookings/:id/cancel` — Cancel booking (Carrier)

### Booking Validation (`/operator`)

- `POST /operator/bookings/:id/approve` — Approve booking
- `POST /operator/bookings/:id/reject` — Reject booking
- `GET /operator/queue` — Pending booking queue
- `POST /operator/capacity/override` — Override slot capacity
- `GET /operator/alerts` — Operator alerts

### Carrier Fleet (`/carrier`)

- `POST /carrier/trucks` — Register a truck
- `GET /carrier/trucks` — My trucks
- `DELETE /carrier/trucks/:id` — Remove a truck
- `POST /carrier/containers` — Register a container
- `GET /carrier/containers` — My containers
- `DELETE /carrier/containers/:id` — Remove a container
- `POST /carrier/trucks/location` — Update truck GPS
- `GET /carrier/trucks/:id/locations` — Truck location history
- `POST /carrier/bol/upload` — Upload Bill of Lading for OCR
- `GET /carrier/ocr-jobs/:id` — OCR job status

### Gate Access (`/gate-access`)

- `POST /gate-access/scan` — Scan QR code at gate

### AI Assistant (`/ai`)

- `POST /ai/sessions` — Create AI chat session
- `POST /ai/query` — Send query to AI assistant
- `GET /ai/sessions/:id/history` — Chat history

### Admin (`/admin`)

- `POST /admin/terminals` — Create terminal
- `GET /admin/terminals` — List terminals
- `PUT /admin/terminals/:id` — Update terminal
- `DELETE /admin/terminals/:id` — Delete terminal
- `POST /admin/gates` — Create gate
- `GET /admin/gates` — List gates
- `POST /admin/zones` — Create zone
- `GET /admin/zones` — List zones
- `PUT /admin/zones/:id` — Update zone
- `DELETE /admin/zones/:id` — Delete zone
- `GET /admin/audit-logs` — Audit logs
- `GET /admin/analytics/waiting-time` — Waiting time analytics

### Health

- `GET /` — Health check endpoint

---

## WebSocket Events

Connect to `ws://localhost:3000` with Socket.IO.

### Subscribe

- `subscribe:terminal` — Subscribe to terminal updates
- `subscribe:booking` — Subscribe to booking status changes
- `subscribe:truck` — Subscribe to truck location updates

### Receive

- `pulse:update` — Port activity updates
- `queue:update` — Terminal queue changes
- `booking:status` — Booking status changes
- `alert:new` — New alerts (capacity, denials)
- `truck:location` — Real-time truck GPS updates

---

## Security Features

- **JWT Tokens** — 15-minute access tokens, 7-day refresh tokens stored in HttpOnly cookies
- **CSRF Protection** — Double-submit cookie pattern on all state-changing requests
- **Rate Limiting** — Three tiers: 10/s (short), 100/min (medium), 1000/hr (long)
- **Helmet** — Security headers
- **Input Validation** — Whitelist validation with `class-validator`
- **Audit Logging** — All state-changing requests are logged automatically
- **Signed QR Tokens** — JWT-based gate access tokens
- **Idempotency Keys** — Prevent duplicate bookings
- **Blockchain Hashing** — SHA-256 proof of booking confirmation

---

## AI Assistant

The AI assistant supports two modes:

1. **LLM Mode** (when `AI_API_KEY` is configured) — Uses OpenAI with function/tool calling to interact with real data
2. **Rule-Based Mode** (default) — Intent detection engine that handles common queries without an LLM

### Supported AI Tools

- `check_availability` — Query available time slots
- `get_my_bookings` — Retrieve user bookings
- `get_port_status` — Current port congestion
- `get_heatmap` — Booking utilization heatmap
- `track_container` — Container tracking
- `create_booking` — Create a booking (carriers only)
- `cancel_booking` — Cancel a booking (carriers only)

---

## Project Structure

```
src/
├── ai/              # AI assistant (LLM + rule-based)
├── audit/           # Audit logs & analytics
├── auth/            # Authentication & JWT
├── blockchain/      # Blockchain hash service
├── booking/         # Booking lifecycle
├── carrier/         # Fleet management (trucks, containers, tracking)
├── common/          # Guards, decorators, interceptors, interfaces
├── events/          # WebSocket gateway
├── gate/            # Gate CRUD
├── gate-access/     # QR-based gate scanning
├── ocr/             # Bill of Lading OCR
├── operator/        # Operator control room
├── prisma/          # Database service
├── public/          # Public endpoints
├── qr/              # QR code generation
├── slots/           # Time slot management
├── terminal/        # Terminal CRUD
├── zone/            # Zone management
├── app.controller.ts
├── app.module.ts
└── main.ts
```

---

## NPM Scripts

| Script                      | Description                       |
| --------------------------- | --------------------------------- |
| `npm run start:dev`         | Start in development (watch mode) |
| `npm run start:debug`       | Start with debugger               |
| `npm run build`             | Build for production              |
| `npm run start:prod`        | Start production build            |
| `npm run db:generate`       | Generate Prisma client            |
| `npm run db:push`           | Push schema to database           |
| `npm run db:migrate`        | Run migrations (dev)              |
| `npm run db:migrate:deploy` | Deploy migrations (prod)          |
| `npm run db:seed`           | Seed the database                 |
| `npm run db:reset`          | Reset database & re-seed          |
| `npm run db:studio`         | Open Prisma Studio                |
| `npm run lint`              | Run ESLint                        |
| `npm run format`            | Run Prettier                      |
| `npm run test`              | Run unit tests                    |
| `npm run test:e2e`          | Run E2E tests                     |

---

## License

UNLICENSED — Private project
