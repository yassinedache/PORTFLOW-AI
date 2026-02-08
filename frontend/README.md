# PORTFLOW-AI Frontend

Modern, animated React frontend for the **PORTFLOW-AI** port management platform. Built with **React 19**, **TypeScript**, **Vite**, and **TailwindCSS v4** with a dark glassmorphism design.

## Tech Stack

| Layer     | Technology                           |
| --------- | ------------------------------------ |
| Framework | React 19 + TypeScript 5.6            |
| Build     | Vite 6                               |
| Styling   | TailwindCSS v4 + Radix UI primitives |
| Animation | Framer Motion 11                     |
| Data      | TanStack React Query 5               |
| State     | Zustand 5 (with persist)             |
| HTTP      | Axios 1.7                            |
| Routing   | React Router 7                       |
| Realtime  | Socket.IO Client                     |
| Charts    | Recharts                             |
| Icons     | Lucide React                         |
| Forms     | React Hook Form + Zod                |
| QR        | qrcode.react + html5-qrcode          |

## Getting Started

### Prerequisites

- Node.js ≥ 18
- PORTFLOW-AI backend running on `http://localhost:3000`

### Install & Run

```bash
cd frontend
npm install
npm run dev
```

The dev server starts at **http://localhost:3001** with API proxy to `localhost:3000`.

### Environment Variables

Create a `.env` file in `frontend/` (already included):

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_WS_URL=http://localhost:3000
```

## Project Structure

```
src/
├── app/                    # App shell, routing, guards
│   ├── App.tsx             # Root (QueryClient, Socket, Toaster)
│   ├── AppShell.tsx        # Layout (Sidebar + Topbar + Outlet)
│   ├── Sidebar.tsx         # Role-based nav with animated indicator
│   ├── Topbar.tsx          # User info + logout
│   ├── router.tsx          # All routes with lazy loading
│   └── guards.tsx          # AuthGuard, GuestGuard, role checks
├── components/
│   ├── ui/                 # shadcn/ui-style primitives
│   │   ├── button.tsx      # 8 variants (glow, success, warning…)
│   │   ├── card.tsx        # Glass card
│   │   ├── badge.tsx       # 7 variants
│   │   ├── dialog.tsx      # Modal with glass overlay
│   │   ├── table.tsx       # Data table
│   │   └── ...             # input, label, select, tabs, skeleton…
│   └── shared/             # Domain components
│       ├── StatusBadge.tsx  # Maps all statuses to icons+colors
│       ├── MetricCard.tsx   # Animated stat card
│       ├── EmptyState.tsx   # Placeholder
│       └── PageTransition   # Framer Motion wrapper
├── features/
│   ├── auth/               # Login, Register
│   ├── admin/              # Overview dashboard, Port Builder (CRUD)
│   ├── carrier/            # Dashboard, Trucks, Containers, Slots,
│   │                       # Bookings, BookingDetail, Charges, OCR, AI
│   ├── operator/           # Dashboard, PendingBookings, BookingDetail,
│   │                       # Containers, Risk, Penalties, Alerts
│   └── gate/               # QR Scanner (camera + manual), History
├── hooks/
│   ├── useAuthStore.ts     # JWT auth state (persisted)
│   └── useUIStore.ts       # Sidebar toggle
├── lib/
│   ├── apiClient.ts        # Axios + interceptors (JWT, CSRF, refresh)
│   ├── socket.ts           # Socket.IO + React Query invalidation
│   ├── constants.ts        # Query key factory
│   ├── utils.ts            # cn(), formatDate, formatCurrency
│   └── api/                # Typed endpoint modules
│       ├── auth.ts
│       ├── admin.ts
│       ├── carrier.ts
│       ├── operator.ts
│       ├── gate.ts
│       └── assistant.ts
└── types/
    └── index.ts            # All enums + interfaces
```

## Role-Based Access

| Role                | Default Route             | Features                                                      |
| ------------------- | ------------------------- | ------------------------------------------------------------- |
| `PORT_ADMIN`        | `/app/admin/overview`     | Dashboard, Port Builder (CRUD terminals/gates/zones/slots)    |
| `CARRIER`           | `/app/carrier/dashboard`  | Fleet, Slots, Bookings, Charges, OCR, AI Assistant            |
| `TERMINAL_OPERATOR` | `/app/operator/dashboard` | Queue, Approve/Reject, Container ops, Risk, Penalties, Alerts |
| `GATE_AGENT`        | `/app/gate/scan`          | QR camera scanning, Scan history                              |

## Features

- **Dark glassmorphism UI** with gradients, glow effects, and animated transitions
- **Real-time updates** via Socket.IO (booking status, queue, truck locations, alerts)
- **Lazy-loaded routes** with Suspense + error boundaries
- **Optimistic cache invalidation** on mutations
- **Responsive** sidebar (collapsible) + mobile-friendly
- **QR code scanning** with camera (html5-qrcode) and manual token input
- **AI chat assistant** with suggested prompts and streaming-style UI
- **OCR upload** with drag-and-drop for Bill of Lading extraction
- **Risk visualization** with color-coded charts and score badges
- **Blockchain proof** display on booking details

## Build

```bash
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint check
```
