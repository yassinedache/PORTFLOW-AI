# PORTFLOW AI — Full API Specification

Complete request/response definitions for every endpoint, plus full entity schemas.

---

## Table of Contents

1. [Entity Specifications](#1-entity-specifications)
2. [Enumerations](#2-enumerations)
3. [Authentication Endpoints](#3-authentication)
4. [Public Endpoints](#4-public)
5. [Slots & Availability](#5-slots--availability)
6. [Bookings (Carrier)](#6-bookings-carrier)
7. [Booking Validation (Operator)](#7-booking-validation-operator)
8. [Gate Access](#8-gate-access)
9. [Carrier Fleet Management](#9-carrier-fleet-management)
10. [OCR / Smart Booking](#10-ocr--smart-booking)
11. [AI Assistant](#11-ai-assistant)
12. [Operator Control Room](#12-operator-control-room)
13. [Admin — Terminals](#13-admin--terminals)
14. [Admin — Gates](#14-admin--gates)
15. [Admin — Zones](#15-admin--zones)
16. [Admin — Audit & Analytics](#16-admin--audit--analytics)
17. [Health Check](#17-health-check)
18. [WebSocket Events](#18-websocket-events)
19. [Error Responses](#19-error-responses)
20. [Security Headers](#20-security-headers)

---

## 1. Entity Specifications

### Company

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `name` | string | required | Company name |
| `createdAt` | DateTime | auto-generated | Creation timestamp |

DB Table: `companies`

---

### User

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `email` | string | required, unique | User email address |
| `passwordHash` | string | required | bcrypt hash (12 rounds) |
| `role` | Role | required | One of: PORT_ADMIN, TERMINAL_OPERATOR, CARRIER, GATE_AGENT |
| `companyId` | UUID? | FK → Company | Optional company association |
| `createdAt` | DateTime | auto-generated | Registration timestamp |

DB Table: `users`  
Relations: `bookings[]`, `aiSessions[]`, `auditLogs[]`, `refreshTokens[]`

---

### RefreshToken

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `userId` | UUID | FK → User, CASCADE | Owner user |
| `token` | string | unique | The refresh token string |
| `expiresAt` | DateTime | required | Expiration timestamp (7 days from creation) |
| `createdAt` | DateTime | auto-generated | Creation timestamp |

DB Table: `refresh_tokens`

---

### Terminal

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `name` | string | required | Terminal name |
| `location` | string | required | Physical location description |
| `isActive` | boolean | default: true | Whether terminal is operational |
| `createdAt` | DateTime | auto-generated | Creation timestamp |

DB Table: `terminals`  
Relations: `gates[]`, `timeSlots[]`, `bookings[]`, `metrics[]`, `zones[]`

---

### Gate

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `terminalId` | UUID | FK → Terminal, CASCADE | Parent terminal |
| `name` | string | required | Gate name (e.g., "Gate A-1 (Entry)") |
| `isActive` | boolean | default: true | Whether gate is operational |

DB Table: `gates`  
Relations: `gateAccessLogs[]`

---

### Zone

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `name` | string | required | Zone name |
| `terminalId` | UUID | FK → Terminal, CASCADE | Parent terminal |
| `type` | string | default: "GENERAL" | GENERAL, HAZMAT, REEFER, or OVERSIZED |
| `maxTrucks` | int | default: 50, min: 1 | Maximum concurrent trucks |
| `isActive` | boolean | default: true | Whether zone is active |
| `createdAt` | DateTime | auto-generated | Creation timestamp |

DB Table: `zones`

---

### TimeSlot

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `terminalId` | UUID | FK → Terminal, CASCADE | Parent terminal |
| `startTime` | DateTime | required | Slot start time |
| `endTime` | DateTime | required | Slot end time |
| `capacity` | int | required, min: 1 | Maximum bookings allowed |

DB Table: `time_slots`  
Relations: `bookings[]`

---

### Booking

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `carrierId` | UUID | FK → User | The carrier who created the booking |
| `terminalId` | UUID | FK → Terminal | Target terminal |
| `timeSlotId` | UUID | FK → TimeSlot | Assigned time slot |
| `status` | BookingStatus | default: PENDING | PENDING → CONFIRMED → CONSUMED or CANCELLED/REJECTED |
| `price` | float? | optional | Booking price |
| `qrToken` | string? | set on approval | Signed JWT for QR gate access |
| `blockchainHash` | string? | set on approval | SHA-256 proof hash |
| `idempotencyKey` | string? | unique | Client-provided deduplication key |
| `truckId` | UUID? | FK → Truck | Associated truck |
| `containerId` | UUID? | FK → Container | Associated container |
| `createdAt` | DateTime | auto-generated | Creation timestamp |
| `validatedAt` | DateTime? | set on approval | When operator approved |

DB Table: `bookings`  
Relations: `gateAccessLogs[]`

---

### GateAccessLog

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `bookingId` | UUID | FK → Booking | Associated booking |
| `gateId` | UUID | FK → Gate | Gate where scan occurred |
| `result` | GateAccessResult | required | ALLOWED or DENIED |
| `reason` | string? | optional | Human-readable reason |
| `scannedAt` | DateTime | auto-generated | Scan timestamp |

DB Table: `gate_access_logs`

---

### Container

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `containerNumber` | string | unique, ISO 6346 | Container number (e.g., MSKU1234567) |
| `carrierId` | UUID | required | Owner carrier |
| `createdAt` | DateTime | auto-generated | Creation timestamp |

DB Table: `containers`  
Relations: `trackingEvents[]`, `bookings[]`

---

### TrackingEvent

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `containerId` | UUID | FK → Container, CASCADE | Parent container |
| `type` | TrackingEventType | required | Event type |
| `location` | string | required | Location description |
| `timestamp` | DateTime | auto-generated | Event timestamp |

DB Table: `tracking_events`

---

### Truck

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `plate` | string | unique | License plate number |
| `carrierId` | UUID | required | Owner carrier |
| `createdAt` | DateTime | auto-generated | Creation timestamp |

DB Table: `trucks`  
Relations: `locations[]`, `bookings[]`

---

### TruckLocation

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `truckId` | UUID | FK → Truck, CASCADE | Parent truck |
| `lat` | float | required | Latitude |
| `lng` | float | required | Longitude |
| `timestamp` | DateTime | auto-generated | Location timestamp |

DB Table: `truck_locations`

---

### Document

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `type` | DocumentType | required | Currently: BILL_OF_LADING |
| `status` | string | default: "UPLOADED" | Document processing status |
| `fileName` | string | required | Original file name |
| `filePath` | string | required | Server file path |
| `userId` | UUID | required | Uploader user ID |
| `createdAt` | DateTime | auto-generated | Upload timestamp |

DB Table: `documents`  
Relations: `ocrJobs[]`

---

### OcrJob

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `documentId` | UUID | FK → Document, CASCADE | Parent document |
| `status` | OcrJobStatus | default: PENDING | PENDING → PROCESSING → COMPLETED/FAILED |
| `resultJson` | JSON? | optional | Extracted data as JSON |
| `createdAt` | DateTime | auto-generated | Creation timestamp |
| `updatedAt` | DateTime | auto-updated | Last update timestamp |

DB Table: `ocr_jobs`

---

### AiSession

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `userId` | UUID | FK → User | Session owner |
| `createdAt` | DateTime | auto-generated | Creation timestamp |

DB Table: `ai_sessions`  
Relations: `messages[]`

---

### AiMessage

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `sessionId` | UUID | FK → AiSession, CASCADE | Parent session |
| `role` | AiMessageRole | required | USER, ASSISTANT, SYSTEM, or TOOL |
| `content` | string | required | Message content |
| `timestamp` | DateTime | auto-generated | Message timestamp |

DB Table: `ai_messages`

---

### AuditLog

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `userId` | UUID? | FK → User | User who performed the action (null for system) |
| `action` | string | required | HTTP method + URL (e.g., "POST /bookings") |
| `entity` | string | required | Target entity type (e.g., "bookings") |
| `entityId` | string? | optional | Target entity ID |
| `meta` | JSON? | optional | Additional metadata (IP, user-agent, status code) |
| `timestamp` | DateTime | auto-generated | Action timestamp |

DB Table: `audit_logs`

---

### MetricDaily

| Field | Type | Constraints | Description |
|-------|------|------------|-------------|
| `id` | UUID | PK, auto-generated | Unique identifier |
| `date` | Date | required | Metric date |
| `terminalId` | UUID | FK → Terminal | Terminal measured |
| `avgWaitingTime` | float | default: 0 | Average waiting time in minutes |
| `totalBookings` | int | default: 0 | Total bookings for the day |
| `revenue` | float | default: 0 | Revenue for the day |

DB Table: `metric_daily`  
Unique constraint: `[date, terminalId]`

---

## 2. Enumerations

### Role
```
PORT_ADMIN | TERMINAL_OPERATOR | CARRIER | GATE_AGENT
```

### BookingStatus
```
PENDING | CONFIRMED | REJECTED | CONSUMED | CANCELLED
```

### GateAccessResult
```
ALLOWED | DENIED
```

### TrackingEventType
```
ARRIVED | DEPARTED | IN_TRANSIT | CUSTOMS_HOLD | RELEASED
```

### DocumentType
```
BILL_OF_LADING
```

### OcrJobStatus
```
PENDING | PROCESSING | COMPLETED | FAILED
```

### AiMessageRole
```
USER | ASSISTANT | SYSTEM | TOOL
```

---

## 3. Authentication

All auth endpoints are **public** (no JWT required).  
CSRF validation is **not** required on auth endpoints.

---

### `POST /auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "carrier@acme.com",        // required, valid email
  "password": "password123",          // required, min 6 characters
  "role": "CARRIER",                  // required, enum: PORT_ADMIN | TERMINAL_OPERATOR | CARRIER | GATE_AGENT
  "companyId": "uuid-string"          // optional, UUID of existing company
}
```

**Response `201 Created`:**
```json
{
  "id": "10000000-0000-0000-0000-000000000003",
  "email": "carrier@acme.com",
  "role": "CARRIER"
}
```

**Error Responses:**
- `409 Conflict` — Email already registered
- `400 Bad Request` — Validation error

---

### `POST /auth/login`

Authenticate and receive JWT tokens in HttpOnly cookies.

**Request Body:**
```json
{
  "email": "admin@portflow.ai",       // required, valid email
  "password": "password123"            // required, min 6 characters
}
```

**Response `200 OK`:**

**Cookies set:**
- `access_token` — HttpOnly, Secure, SameSite=Strict, 15min
- `refresh_token` — HttpOnly, Secure, SameSite=Strict, path=/auth/refresh, 7 days
- `csrf-token` — readable by client, 15min

```json
{
  "user": {
    "id": "10000000-0000-0000-0000-000000000001",
    "email": "admin@portflow.ai",
    "role": "PORT_ADMIN"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "csrfToken": "c2f8a3b1-4e5d-6f7a-8b9c-0d1e2f3a4b5c"
}
```

**Error Responses:**
- `401 Unauthorized` — Invalid credentials

---

### `POST /auth/refresh`

Rotate the access token using the refresh token from the cookie.

**Request:** No body required. Reads `refresh_token` cookie automatically.

**Response `200 OK`:**

**Cookies set:** Same as login (rotated tokens)

```json
{
  "user": {
    "id": "10000000-0000-0000-0000-000000000001",
    "email": "admin@portflow.ai",
    "role": "PORT_ADMIN"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "csrfToken": "new-csrf-uuid"
}
```

**Error Responses:**
- `401 Unauthorized` — Missing, invalid, or expired refresh token

---

### `POST /auth/logout`

Invalidate the refresh token and clear all cookies.

**Auth:** JWT required  
**Request:** No body required. Reads `refresh_token` cookie.

**Response `200 OK`:**

**Cookies cleared:** `access_token`, `refresh_token`, `csrf-token`

```json
{
  "message": "Logged out successfully"
}
```

---

### `GET /auth/csrf-token`

Get a fresh CSRF token (public endpoint).

**Response `200 OK`:**

**Cookie set:** `csrf-token`

```json
{
  "csrfToken": "c2f8a3b1-4e5d-6f7a-8b9c-0d1e2f3a4b5c"
}
```

---

## 4. Public

All public endpoints require **no authentication**.

---

### `GET /public/pulse`

Real-time port activity summary.

**Response `200 OK`:**
```json
{
  "timestamp": "2026-02-06T14:30:00.000Z",
  "activeBookings": 42,
  "recentGateAccess": 15,
  "activeTerminals": 3,
  "terminals": [
    { "id": "20000000-...-001", "name": "Terminal A - Container" },
    { "id": "20000000-...-002", "name": "Terminal B - Bulk" },
    { "id": "20000000-...-003", "name": "Terminal C - RoRo" }
  ]
}
```

---

### `GET /public/stats`

Aggregate statistics for landing page.

**Response `200 OK`:**
```json
{
  "totalBookings": 1250,
  "totalGateAccess": 980,
  "activeTerminals": 3,
  "todayBookings": 47
}
```

---

### `GET /public/containers/:containerNumber/track`

Track a container by its ISO number.

**Path Parameters:**
- `containerNumber` — Container number (e.g., `MSKU1234567`)

**Response `200 OK`:**
```json
{
  "containerNumber": "MSKU1234567",
  "events": [
    {
      "id": "uuid",
      "containerId": "uuid",
      "type": "RELEASED",
      "location": "Port of Algiers - Terminal A",
      "timestamp": "2026-02-06T12:00:00.000Z"
    },
    {
      "id": "uuid",
      "containerId": "uuid",
      "type": "CUSTOMS_HOLD",
      "location": "Port of Algiers - Customs",
      "timestamp": "2026-02-06T02:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `404 Not Found` — Container not found

---

## 5. Slots & Availability

**Auth:** JWT required  
**CSRF:** Required for POST methods  
**Roles:** Varies per endpoint

---

### `POST /slots`

Create a single time slot. **Role: PORT_ADMIN**

**Request Body:**
```json
{
  "terminalId": "20000000-0000-0000-0000-000000000001",   // required, UUID
  "startTime": "2026-06-15T08:00:00Z",                    // required, ISO 8601
  "endTime": "2026-06-15T10:00:00Z",                      // required, ISO 8601
  "capacity": 20                                           // required, integer >= 1
}
```

**Response `201 Created`:**
```json
{
  "id": "uuid",
  "terminalId": "20000000-0000-0000-0000-000000000001",
  "startTime": "2026-06-15T08:00:00.000Z",
  "endTime": "2026-06-15T10:00:00.000Z",
  "capacity": 20
}
```

---

### `POST /slots/bulk`

Create multiple time slots in a transaction. **Role: PORT_ADMIN**

**Request Body:** Array of `CreateTimeSlotDto`
```json
[
  {
    "terminalId": "uuid",
    "startTime": "2026-06-15T08:00:00Z",
    "endTime": "2026-06-15T10:00:00Z",
    "capacity": 20
  },
  {
    "terminalId": "uuid",
    "startTime": "2026-06-15T10:00:00Z",
    "endTime": "2026-06-15T12:00:00Z",
    "capacity": 15
  }
]
```

**Response `201 Created`:** Array of created TimeSlot objects.

---

### `GET /slots/availability`

Query available time slots. **Roles: PORT_ADMIN, TERMINAL_OPERATOR, CARRIER**

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `terminalId` | UUID | No | Filter by terminal |
| `date` | string | No | Filter by date (YYYY-MM-DD). Default: from now onwards |

**Response `200 OK`:**
```json
[
  {
    "id": "slot-uuid",
    "terminalId": "20000000-...-001",
    "terminalName": "Terminal A - Container",
    "startTime": "2026-02-07T08:00:00.000Z",
    "endTime": "2026-02-07T10:00:00.000Z",
    "capacity": 20,
    "booked": 12,
    "available": 8
  }
]
```

---

### `GET /slots/heatmap`

Booking density heatmap for the next 7 days. **Roles: PORT_ADMIN, TERMINAL_OPERATOR, CARRIER**

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `terminalId` | UUID | No | Filter by terminal |

**Response `200 OK`:**
```json
[
  {
    "slotId": "uuid",
    "terminalId": "uuid",
    "startTime": "2026-02-07T08:00:00.000Z",
    "endTime": "2026-02-07T10:00:00.000Z",
    "capacity": 20,
    "booked": 16,
    "utilization": 80
  }
]
```

---

## 6. Bookings (Carrier)

**Auth:** JWT required  
**CSRF:** Required for POST methods

---

### `POST /bookings`

Create a new booking. **Role: CARRIER**

**Request Headers:**
- `X-Idempotency-Key` (optional) — or include in body as `idempotencyKey`

**Request Body:**
```json
{
  "terminalId": "20000000-0000-0000-0000-000000000001",   // required, UUID
  "timeSlotId": "slot-uuid",                               // required, UUID
  "truckId": "40000000-0000-0000-0000-000000000001",       // optional, UUID
  "containerId": "50000000-0000-0000-0000-000000000001",   // optional, UUID
  "idempotencyKey": "client-generated-uuid",               // optional, for deduplication
  "price": 150.00                                          // optional, float
}
```

**Response `201 Created`:**
```json
{
  "id": "booking-uuid",
  "carrierId": "10000000-...-003",
  "terminalId": "20000000-...-001",
  "timeSlotId": "slot-uuid",
  "status": "PENDING",
  "price": 150.00,
  "qrToken": null,
  "blockchainHash": null,
  "idempotencyKey": "client-generated-uuid",
  "truckId": "40000000-...-001",
  "containerId": "50000000-...-001",
  "createdAt": "2026-02-06T14:30:00.000Z",
  "validatedAt": null,
  "terminal": { "name": "Terminal A - Container" },
  "timeSlot": {
    "startTime": "2026-02-07T08:00:00.000Z",
    "endTime": "2026-02-07T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `404 Not Found` — Time slot not found
- `400 Bad Request` — Slot doesn't belong to terminal, or slot is in the past
- `409 Conflict` — Slot is fully booked, or duplicate idempotency key returns existing

---

### `GET /bookings/my`

Get the current carrier's bookings. **Role: CARRIER**

**Response `200 OK`:**
```json
[
  {
    "id": "booking-uuid",
    "carrierId": "user-uuid",
    "terminalId": "terminal-uuid",
    "timeSlotId": "slot-uuid",
    "status": "CONFIRMED",
    "price": 200.00,
    "qrToken": "eyJhbGci...",
    "blockchainHash": "abc123...",
    "idempotencyKey": null,
    "truckId": "truck-uuid",
    "containerId": null,
    "createdAt": "2026-02-06T10:00:00.000Z",
    "validatedAt": "2026-02-06T11:00:00.000Z",
    "terminal": { "id": "uuid", "name": "Terminal A - Container" },
    "timeSlot": {
      "startTime": "2026-02-07T08:00:00.000Z",
      "endTime": "2026-02-07T10:00:00.000Z"
    }
  }
]
```

---

### `GET /bookings/:id`

Get a single booking by ID. **Roles: CARRIER, TERMINAL_OPERATOR, PORT_ADMIN**

**Path Parameters:**
- `id` — Booking UUID

**Response `200 OK`:**
```json
{
  "id": "booking-uuid",
  "carrierId": "user-uuid",
  "terminalId": "terminal-uuid",
  "timeSlotId": "slot-uuid",
  "status": "CONFIRMED",
  "price": 200.00,
  "qrToken": "eyJhbGci...",
  "blockchainHash": "abc123def456...",
  "idempotencyKey": null,
  "truckId": "truck-uuid",
  "containerId": "container-uuid",
  "createdAt": "2026-02-06T10:00:00.000Z",
  "validatedAt": "2026-02-06T11:00:00.000Z",
  "terminal": { "id": "uuid", "name": "Terminal A", "location": "...", "isActive": true, "createdAt": "..." },
  "timeSlot": { "id": "uuid", "terminalId": "uuid", "startTime": "...", "endTime": "...", "capacity": 20 },
  "carrier": { "id": "uuid", "email": "carrier@acme.com" },
  "truck": { "id": "uuid", "plate": "DZ-1234-A16", "carrierId": "uuid", "createdAt": "..." },
  "container": { "id": "uuid", "containerNumber": "MSKU1234567", "carrierId": "uuid", "createdAt": "..." }
}
```

**Error Responses:**
- `404 Not Found` — Booking not found

---

### `POST /bookings/:id/cancel`

Cancel a booking. **Role: CARRIER** (own bookings only)

**Path Parameters:**
- `id` — Booking UUID

**Request Body:** None

**Response `200 OK`:**
```json
{
  "id": "booking-uuid",
  "carrierId": "user-uuid",
  "terminalId": "terminal-uuid",
  "timeSlotId": "slot-uuid",
  "status": "CANCELLED",
  "price": 150.00,
  "qrToken": null,
  "blockchainHash": null,
  "idempotencyKey": null,
  "truckId": null,
  "containerId": null,
  "createdAt": "2026-02-06T10:00:00.000Z",
  "validatedAt": null
}
```

**Error Responses:**
- `403 Forbidden` — Not your booking
- `400 Bad Request` — Cannot cancel booking with current status (only PENDING/CONFIRMED)
- `404 Not Found` — Booking not found

---

## 7. Booking Validation (Operator)

**Auth:** JWT required  
**CSRF:** Required  
**Role:** TERMINAL_OPERATOR

---

### `POST /operator/bookings/:id/approve`

Approve a pending booking. Generates QR token and blockchain hash.

**Path Parameters:**
- `id` — Booking UUID

**Request Body:** None

**Response `200 OK`:**
```json
{
  "id": "booking-uuid",
  "carrierId": "user-uuid",
  "terminalId": "terminal-uuid",
  "timeSlotId": "slot-uuid",
  "status": "CONFIRMED",
  "price": 150.00,
  "qrToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "blockchainHash": "a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789a",
  "idempotencyKey": null,
  "truckId": "truck-uuid",
  "containerId": "container-uuid",
  "createdAt": "2026-02-06T10:00:00.000Z",
  "validatedAt": "2026-02-06T14:35:00.000Z",
  "qrDataUrl": "data:image/png;base64,iVBORw0KGgo..."
}
```

**Error Responses:**
- `400 Bad Request` — Booking status is not PENDING
- `404 Not Found` — Booking not found

---

### `POST /operator/bookings/:id/reject`

Reject a pending booking.

**Path Parameters:**
- `id` — Booking UUID

**Request Body:**
```json
{
  "reason": "Insufficient documentation"   // optional, string
}
```

**Response `200 OK`:**
```json
{
  "id": "booking-uuid",
  "status": "REJECTED",
  "rejectionReason": "Insufficient documentation",
  "carrierId": "user-uuid",
  "terminalId": "terminal-uuid",
  "timeSlotId": "slot-uuid",
  "price": null,
  "qrToken": null,
  "blockchainHash": null,
  "createdAt": "2026-02-06T10:00:00.000Z",
  "validatedAt": null
}
```

**Error Responses:**
- `400 Bad Request` — Booking status is not PENDING
- `404 Not Found` — Booking not found

---

## 8. Gate Access

**Auth:** JWT required  
**CSRF:** Required  
**Role:** GATE_AGENT

---

### `POST /gate/scan`

Scan a QR code at a gate. Validates booking, time window, and terminal match.

**Request Body:**
```json
{
  "qrToken": "eyJhbGciOiJIUzI1NiIs...",   // required, string (JWT from QR code)
  "gateId": "30000000-0000-0000-0000-000000000001"   // required, UUID
}
```

**Response `200 OK` (Access Granted):**
```json
{
  "id": "log-uuid",
  "bookingId": "booking-uuid",
  "gateId": "gate-uuid",
  "result": "ALLOWED",
  "reason": "Access granted",
  "scannedAt": "2026-02-07T08:15:00.000Z",
  "booking": {
    "id": "booking-uuid",
    "status": "CONSUMED",
    "carrierId": "user-uuid"
  },
  "gate": {
    "id": "gate-uuid",
    "name": "Gate A-1 (Entry)"
  }
}
```

**Response `200 OK` (Access Denied):**
```json
{
  "id": "log-uuid",
  "bookingId": "booking-uuid",
  "gateId": "gate-uuid",
  "result": "DENIED",
  "reason": "Too early - time slot has not started yet",
  "scannedAt": "2026-02-07T06:00:00.000Z",
  "booking": {
    "id": "booking-uuid",
    "status": "CONFIRMED",
    "carrierId": "user-uuid"
  },
  "gate": {
    "id": "gate-uuid",
    "name": "Gate A-1 (Entry)"
  }
}
```

**Response `200 OK` (No booking found — inline):**
```json
{
  "result": "DENIED",
  "reason": "Invalid or expired QR token",
  "gateId": "gate-uuid",
  "scannedAt": "2026-02-07T08:15:00.000Z"
}
```

**Validation Rules:**
1. Gate must exist and be active
2. QR token must be a valid, non-expired JWT with `type: "gate-access"`
3. Booking must exist and have status `CONFIRMED`
4. Gate must belong to the booking's terminal
5. Current time must be within [slotStart - 30min, slotEnd + 30min]
6. On success, booking status changes to `CONSUMED`

---

## 9. Carrier Fleet Management

**Auth:** JWT required  
**CSRF:** Required for POST/DELETE  
**Role:** CARRIER

---

### `POST /carrier/trucks`

Register a new truck.

**Request Body:**
```json
{
  "plate": "DZ-1234-A16"    // required, alphanumeric + hyphens
}
```

**Response `201 Created`:**
```json
{
  "id": "truck-uuid",
  "plate": "DZ-1234-A16",
  "carrierId": "user-uuid",
  "createdAt": "2026-02-06T14:30:00.000Z"
}
```

**Error Responses:**
- `409 Conflict` — Truck with this plate already exists

---

### `GET /carrier/trucks`

Get all trucks owned by the current carrier, with latest location.

**Response `200 OK`:**
```json
[
  {
    "id": "truck-uuid",
    "plate": "DZ-1234-A16",
    "carrierId": "user-uuid",
    "createdAt": "2026-02-06T14:30:00.000Z",
    "locations": [
      {
        "id": "loc-uuid",
        "truckId": "truck-uuid",
        "lat": 36.7538,
        "lng": 3.0588,
        "timestamp": "2026-02-06T15:00:00.000Z"
      }
    ]
  }
]
```

---

### `DELETE /carrier/trucks/:id`

Delete a truck. **Carrier can only delete own trucks.**

**Path Parameters:**
- `id` — Truck UUID

**Response `200 OK`:**
```json
{
  "message": "Truck deleted successfully"
}
```

**Error Responses:**
- `404 Not Found` — Truck not found
- `403 Forbidden` — Not your truck

---

### `POST /carrier/containers`

Register a new container.

**Request Body:**
```json
{
  "containerNumber": "MSKU1234567"    // required, ISO 6346 format (4 letters + 7 digits)
}
```

**Response `201 Created`:**
```json
{
  "id": "container-uuid",
  "containerNumber": "MSKU1234567",
  "carrierId": "user-uuid",
  "createdAt": "2026-02-06T14:30:00.000Z"
}
```

**Error Responses:**
- `409 Conflict` — Container number already exists

---

### `GET /carrier/containers`

Get all containers owned by the current carrier, with latest tracking event.

**Response `200 OK`:**
```json
[
  {
    "id": "container-uuid",
    "containerNumber": "MSKU1234567",
    "carrierId": "user-uuid",
    "createdAt": "2026-02-06T14:30:00.000Z",
    "trackingEvents": [
      {
        "id": "event-uuid",
        "containerId": "container-uuid",
        "type": "RELEASED",
        "location": "Port of Algiers - Terminal A",
        "timestamp": "2026-02-06T12:00:00.000Z"
      }
    ]
  }
]
```

---

### `DELETE /carrier/containers/:id`

Delete a container. **Carrier can only delete own containers.**

**Path Parameters:**
- `id` — Container UUID

**Response `200 OK`:**
```json
{
  "message": "Container deleted successfully"
}
```

**Error Responses:**
- `404 Not Found` — Container not found
- `403 Forbidden` — Not your container

---

### `POST /carrier/trucks/location`

Update a truck's GPS location. Emits real-time WebSocket event `truck:location`.

**Request Body:**
```json
{
  "truckId": "40000000-0000-0000-0000-000000000001",   // required, UUID
  "lat": 36.7538,                                       // required, float
  "lng": 3.0588                                          // required, float
}
```

**Response `201 Created`:**
```json
{
  "id": "loc-uuid",
  "truckId": "truck-uuid",
  "lat": 36.7538,
  "lng": 3.0588,
  "timestamp": "2026-02-06T15:00:00.000Z"
}
```

**Error Responses:**
- `404 Not Found` — Truck not found
- `403 Forbidden` — Not your truck

---

### `GET /carrier/trucks/:id/locations`

Get location history for a truck (last 100 entries).

**Path Parameters:**
- `id` — Truck UUID

**Response `200 OK`:**
```json
[
  {
    "id": "loc-uuid",
    "truckId": "truck-uuid",
    "lat": 36.7538,
    "lng": 3.0588,
    "timestamp": "2026-02-06T15:00:00.000Z"
  },
  {
    "id": "loc-uuid-2",
    "truckId": "truck-uuid",
    "lat": 36.7540,
    "lng": 3.0590,
    "timestamp": "2026-02-06T14:55:00.000Z"
  }
]
```

**Error Responses:**
- `404 Not Found` — Truck not found
- `403 Forbidden` — Not your truck

---

## 10. OCR / Smart Booking

**Auth:** JWT required  
**Role:** CARRIER

---

### `POST /carrier/bol/upload`

Upload a Bill of Lading document for OCR processing.

**Request:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | PDF/image of the Bill of Lading |

**Response `201 Created`:**
```json
{
  "documentId": "doc-uuid",
  "ocrJobId": "job-uuid",
  "status": "PENDING",
  "message": "Document uploaded. OCR processing started."
}
```

---

### `GET /carrier/ocr-jobs/:id`

Get OCR job status and extracted data.

**Path Parameters:**
- `id` — OCR Job UUID

**Response `200 OK` (Pending):**
```json
{
  "id": "job-uuid",
  "documentId": "doc-uuid",
  "status": "PENDING",
  "resultJson": null,
  "createdAt": "2026-02-06T14:30:00.000Z",
  "updatedAt": "2026-02-06T14:30:00.000Z",
  "document": {
    "id": "doc-uuid",
    "fileName": "bol_acme_2026.pdf",
    "type": "BILL_OF_LADING"
  }
}
```

**Response `200 OK` (Completed):**
```json
{
  "id": "job-uuid",
  "documentId": "doc-uuid",
  "status": "COMPLETED",
  "resultJson": {
    "shipper": "ACME Logistics",
    "consignee": "Port Terminal Corp",
    "containerNumber": "MSKU1234567",
    "weight": "25000 kg",
    "description": "Electronic components",
    "vesselName": "MSC MAYA",
    "portOfLoading": "Shanghai",
    "portOfDischarge": "Algiers"
  },
  "createdAt": "2026-02-06T14:30:00.000Z",
  "updatedAt": "2026-02-06T14:30:07.000Z",
  "document": {
    "id": "doc-uuid",
    "fileName": "bol_acme_2026.pdf",
    "type": "BILL_OF_LADING"
  }
}
```

**Error Responses:**
- `404 Not Found` — OCR job not found

---

## 11. AI Assistant

**Auth:** JWT required  
**CSRF:** Required for POST  
**Roles:** All authenticated users

---

### `POST /ai/sessions`

Create a new AI chat session.

**Request Body:** None

**Response `201 Created`:**
```json
{
  "id": "session-uuid",
  "userId": "user-uuid",
  "createdAt": "2026-02-06T14:30:00.000Z"
}
```

---

### `POST /ai/query`

Send a message to the AI assistant.

**Request Body:**
```json
{
  "sessionId": "session-uuid",                                    // required, UUID
  "message": "What slots are available for Terminal A tomorrow?"   // required, string
}
```

**Response `200 OK`:**
```json
{
  "sessionId": "session-uuid",
  "response": "Here are the available slots for 2026-02-07:\n\n• **Terminal A - Container**: 2/7/2026, 8:00 AM - 2/7/2026, 10:00 AM | 8/20 spots\n• **Terminal A - Container**: 2/7/2026, 10:00 AM - 2/7/2026, 12:00 PM | 15/20 spots\n\nWould you like to book one of these slots?"
}
```

**Error Responses:**
- `404 Not Found` — Session not found
- `403 Forbidden` — Session does not belong to user

**AI Tool Functions Available:**
| Tool | Description | Parameters |
|------|-------------|------------|
| `check_availability` | Query slot availability | `terminalId?`, `date?` |
| `get_my_bookings` | User's bookings | none |
| `get_port_status` | Terminal congestion | none |
| `get_heatmap` | 7-day utilization | `terminalId?` |
| `track_container` | Container tracking | `containerNumber` (required) |
| `create_booking` | Create a booking | `terminalId`, `timeSlotId`, `truckId?`, `containerId?` |
| `cancel_booking` | Cancel a booking | `bookingId` (required) |

---

### `GET /ai/sessions/:id/history`

Get chat history for a session.

**Path Parameters:**
- `id` — Session UUID

**Response `200 OK`:**
```json
[
  {
    "id": "msg-uuid-1",
    "sessionId": "session-uuid",
    "role": "USER",
    "content": "What slots are available tomorrow?",
    "timestamp": "2026-02-06T14:30:00.000Z"
  },
  {
    "id": "msg-uuid-2",
    "sessionId": "session-uuid",
    "role": "ASSISTANT",
    "content": "Here are the available slots...",
    "timestamp": "2026-02-06T14:30:01.000Z"
  }
]
```

**Error Responses:**
- `404 Not Found` — Session not found
- `403 Forbidden` — Session does not belong to user

---

## 12. Operator Control Room

**Auth:** JWT required  
**CSRF:** Required for POST  
**Roles:** TERMINAL_OPERATOR, PORT_ADMIN

---

### `GET /operator/queue`

Get the pending/confirmed booking queue.

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `terminalId` | UUID | No | Filter by terminal |

**Response `200 OK`:**
```json
[
  {
    "id": "booking-uuid",
    "carrierId": "user-uuid",
    "terminalId": "terminal-uuid",
    "timeSlotId": "slot-uuid",
    "status": "PENDING",
    "price": 150.00,
    "qrToken": null,
    "blockchainHash": null,
    "createdAt": "2026-02-06T10:00:00.000Z",
    "validatedAt": null,
    "carrier": { "id": "user-uuid", "email": "carrier@acme.com" },
    "terminal": { "id": "terminal-uuid", "name": "Terminal A - Container" },
    "timeSlot": {
      "startTime": "2026-02-07T08:00:00.000Z",
      "endTime": "2026-02-07T10:00:00.000Z"
    },
    "truck": { "plate": "DZ-1234-A16" }
  }
]
```

---

### `POST /operator/capacity/override`

Override a time slot's capacity.

**Request Body:**
```json
{
  "timeSlotId": "slot-uuid",    // required, UUID
  "newCapacity": 30              // required, integer >= 0
}
```

**Response `200 OK`:**
```json
{
  "id": "slot-uuid",
  "terminalId": "terminal-uuid",
  "startTime": "2026-02-07T08:00:00.000Z",
  "endTime": "2026-02-07T10:00:00.000Z",
  "capacity": 30
}
```

**Side Effects:**
- Emits `alert:new` WebSocket event (type: `capacity-override`)
- Emits `queue:update` WebSocket event

**Error Responses:**
- `404 Not Found` — Time slot not found

---

### `GET /operator/alerts`

Get operator alerts: recent gate denials and capacity warnings.

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `terminalId` | UUID | No | Filter by terminal |

**Response `200 OK`:**
```json
{
  "denials": [
    {
      "id": "log-uuid",
      "bookingId": "booking-uuid",
      "gateId": "gate-uuid",
      "result": "DENIED",
      "reason": "Too early - time slot has not started yet",
      "scannedAt": "2026-02-06T06:00:00.000Z",
      "gate": { "name": "Gate A-1 (Entry)", "terminalId": "terminal-uuid" },
      "booking": { "id": "booking-uuid", "carrierId": "user-uuid" }
    }
  ],
  "capacityAlerts": [
    {
      "type": "capacity-warning",
      "slotId": "slot-uuid",
      "terminal": "Terminal A - Container",
      "startTime": "2026-02-07T08:00:00.000Z",
      "booked": 18,
      "capacity": 20,
      "utilization": 90
    }
  ]
}
```

---

## 13. Admin — Terminals

**Auth:** JWT required  
**CSRF:** Required for POST/PUT/DELETE  
**Role:** PORT_ADMIN (CRUD), TERMINAL_OPERATOR/CARRIER (read only)

---

### `POST /admin/terminals`

**Role: PORT_ADMIN**

**Request Body:**
```json
{
  "name": "Terminal D - Passenger",        // required, string
  "location": "Port of Algiers, Dock 4",   // required, string
  "isActive": true                          // optional, boolean, default: true
}
```

**Response `201 Created`:**
```json
{
  "id": "terminal-uuid",
  "name": "Terminal D - Passenger",
  "location": "Port of Algiers, Dock 4",
  "isActive": true,
  "createdAt": "2026-02-06T14:30:00.000Z"
}
```

---

### `GET /admin/terminals`

**Roles: PORT_ADMIN, TERMINAL_OPERATOR, CARRIER**

**Response `200 OK`:**
```json
[
  {
    "id": "terminal-uuid",
    "name": "Terminal A - Container",
    "location": "Port of Algiers, Dock 1",
    "isActive": true,
    "createdAt": "2026-02-01T00:00:00.000Z",
    "gates": [
      { "id": "gate-uuid", "terminalId": "terminal-uuid", "name": "Gate A-1 (Entry)", "isActive": true }
    ],
    "_count": { "bookings": 45 }
  }
]
```

---

### `GET /admin/terminals/:id`

**Roles: PORT_ADMIN, TERMINAL_OPERATOR, CARRIER**

**Response `200 OK`:**
```json
{
  "id": "terminal-uuid",
  "name": "Terminal A - Container",
  "location": "Port of Algiers, Dock 1",
  "isActive": true,
  "createdAt": "2026-02-01T00:00:00.000Z",
  "gates": [
    { "id": "gate-uuid", "terminalId": "terminal-uuid", "name": "Gate A-1 (Entry)", "isActive": true }
  ],
  "timeSlots": [
    { "id": "slot-uuid", "terminalId": "terminal-uuid", "startTime": "...", "endTime": "...", "capacity": 20 }
  ]
}
```

**Error Responses:**
- `404 Not Found`

---

### `PUT /admin/terminals/:id`

**Role: PORT_ADMIN**

**Request Body:** (all fields optional)
```json
{
  "name": "Terminal A - Updated",
  "location": "New Location",
  "isActive": false
}
```

**Response `200 OK`:** Updated terminal object.

---

### `DELETE /admin/terminals/:id`

**Role: PORT_ADMIN**

**Response `200 OK`:** Deleted terminal object.

---

## 14. Admin — Gates

**Auth:** JWT required  
**CSRF:** Required for POST/PUT/DELETE  
**Role:** PORT_ADMIN

---

### `POST /admin/gates`

**Request Body:**
```json
{
  "name": "Gate D-1 (Entry)",                               // required, string
  "terminalId": "20000000-0000-0000-0000-000000000001",     // required, UUID
  "isActive": true                                           // optional, boolean, default: true
}
```

**Response `201 Created`:**
```json
{
  "id": "gate-uuid",
  "terminalId": "terminal-uuid",
  "name": "Gate D-1 (Entry)",
  "isActive": true
}
```

---

### `GET /admin/gates`

**Response `200 OK`:**
```json
[
  {
    "id": "gate-uuid",
    "terminalId": "terminal-uuid",
    "name": "Gate A-1 (Entry)",
    "isActive": true,
    "terminal": { "id": "terminal-uuid", "name": "Terminal A - Container" }
  }
]
```

---

### `GET /admin/gates/:id`

**Response `200 OK`:** Gate object with full terminal relation.

**Error Responses:**
- `404 Not Found`

---

### `PUT /admin/gates/:id`

**Request Body:** (all fields optional)
```json
{
  "name": "Gate A-1 (Updated)",
  "isActive": false
}
```

**Response `200 OK`:** Updated gate object.

---

### `DELETE /admin/gates/:id`

**Response `200 OK`:** Deleted gate object.

---

## 15. Admin — Zones

**Auth:** JWT required  
**CSRF:** Required for POST/PUT/DELETE  
**Roles:** PORT_ADMIN (CRUD), TERMINAL_OPERATOR (read)

---

### `POST /admin/zones`

**Role: PORT_ADMIN**

**Request Body:**
```json
{
  "name": "Hazmat Area A",                                  // required, string
  "terminalId": "20000000-0000-0000-0000-000000000001",     // required, UUID
  "type": "HAZMAT",                                          // optional, enum: GENERAL | HAZMAT | REEFER | OVERSIZED
  "maxTrucks": 10                                            // optional, integer >= 1, default: 50
}
```

**Response `201 Created`:**
```json
{
  "id": "zone-uuid",
  "name": "Hazmat Area A",
  "terminalId": "terminal-uuid",
  "type": "HAZMAT",
  "maxTrucks": 10,
  "isActive": true,
  "createdAt": "2026-02-06T14:30:00.000Z",
  "terminal": { "id": "terminal-uuid", "name": "Terminal A - Container" }
}
```

**Error Responses:**
- `404 Not Found` — Terminal not found

---

### `GET /admin/zones`

**Roles: PORT_ADMIN, TERMINAL_OPERATOR**

**Query Parameters:**
| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `terminalId` | UUID | No | Filter by terminal |

**Response `200 OK`:**
```json
[
  {
    "id": "zone-uuid",
    "name": "Hazmat Area A",
    "terminalId": "terminal-uuid",
    "type": "HAZMAT",
    "maxTrucks": 10,
    "isActive": true,
    "createdAt": "2026-02-06T14:30:00.000Z",
    "terminal": { "id": "terminal-uuid", "name": "Terminal A - Container" }
  }
]
```

---

### `GET /admin/zones/:id`

**Roles: PORT_ADMIN, TERMINAL_OPERATOR**

**Response `200 OK`:** Full zone object with terminal.

**Error Responses:**
- `404 Not Found`

---

### `PUT /admin/zones/:id`

**Role: PORT_ADMIN**

**Request Body:** (all fields optional)
```json
{
  "name": "Hazmat Area A - Updated",
  "type": "REEFER",
  "maxTrucks": 15,
  "isActive": false
}
```

**Response `200 OK`:** Updated zone object.

---

### `DELETE /admin/zones/:id`

**Role: PORT_ADMIN**

**Response `200 OK`:**
```json
{
  "message": "Zone deleted successfully"
}
```

---

## 16. Admin — Audit & Analytics

**Auth:** JWT required  
**Role:** PORT_ADMIN

---

### `GET /admin/audit-logs`

Paginated audit log retrieval with filters.

**Query Parameters:**
| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `page` | int | No | 1 | Page number |
| `limit` | int | No | 50 | Items per page |
| `userId` | UUID | No | — | Filter by user |
| `entity` | string | No | — | Filter by entity (partial match) |
| `action` | string | No | — | Filter by action (partial match) |

**Response `200 OK`:**
```json
{
  "data": [
    {
      "id": "log-uuid",
      "userId": "user-uuid",
      "action": "POST /bookings",
      "entity": "bookings",
      "entityId": "booking-uuid",
      "meta": {
        "ip": "::1",
        "userAgent": "Mozilla/5.0...",
        "statusCode": 201
      },
      "timestamp": "2026-02-06T14:30:00.000Z",
      "user": {
        "id": "user-uuid",
        "email": "carrier@acme.com",
        "role": "CARRIER"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 234,
    "totalPages": 5
  }
}
```

---

### `GET /admin/analytics/waiting-time`

Waiting time analytics with daily metrics.

**Query Parameters:**
| Param | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `terminalId` | UUID | No | — | Filter by terminal |
| `days` | int | No | 30 | Number of days to analyze |

**Response `200 OK`:**
```json
{
  "period": {
    "from": "2026-01-07T00:00:00.000Z",
    "to": "2026-02-06T14:30:00.000Z",
    "days": 30
  },
  "summary": {
    "avgWaitingTime": 22.45,
    "totalBookings": 1250,
    "totalRevenue": 187500.00
  },
  "daily": [
    {
      "id": "metric-uuid",
      "date": "2026-01-07T00:00:00.000Z",
      "terminalId": "terminal-uuid",
      "avgWaitingTime": 18.5,
      "totalBookings": 42,
      "revenue": 6300.00,
      "terminal": {
        "id": "terminal-uuid",
        "name": "Terminal A - Container"
      }
    }
  ]
}
```

---

## 17. Health Check

**Auth:** None (public)

---

### `GET /`

**Response `200 OK`:**
```json
{
  "status": "ok",
  "service": "PORTFLOW AI",
  "version": "1.0.0",
  "timestamp": "2026-02-06T14:30:00.000Z",
  "database": "up"
}
```

---

## 18. WebSocket Events

Connect via Socket.IO to `ws://localhost:3000`

### Client → Server (Subscribe)

| Event | Payload | Description |
|-------|---------|-------------|
| `subscribe:terminal` | `"terminal-uuid"` (string) | Join terminal room for updates |
| `subscribe:booking` | `"booking-uuid"` (string) | Join booking room for status changes |
| `subscribe:truck` | `"truck-uuid"` (string) | Join truck room for location updates |

### Server → Client (Broadcast)

#### `pulse:update`
```json
{
  "type": "gate-access",
  "terminalId": "terminal-uuid",
  "gateName": "Gate A-1 (Entry)",
  "result": "ALLOWED"
}
```

#### `queue:update`
```json
{
  "terminalId": "terminal-uuid"
}
```

#### `booking:status`
```json
{
  "bookingId": "booking-uuid",
  "status": "CONFIRMED"
}
```

#### `alert:new`
```json
{
  "type": "capacity-override",
  "message": "Capacity for slot <id> changed to 30",
  "terminalId": "terminal-uuid"
}
```

#### `truck:location`
```json
{
  "truckId": "truck-uuid",
  "plate": "DZ-1234-A16",
  "lat": 36.7538,
  "lng": 3.0588,
  "timestamp": "2026-02-06T15:00:00.000Z"
}
```

---

## 19. Error Responses

All errors follow a consistent format:

### `400 Bad Request` — Validation Error
```json
{
  "statusCode": 400,
  "message": ["terminalId must be a UUID", "capacity must not be less than 1"],
  "error": "Bad Request"
}
```

### `401 Unauthorized`
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### `403 Forbidden` — RBAC or CSRF
```json
{
  "statusCode": 403,
  "message": "User role 'CARRIER' is not authorized. Required: PORT_ADMIN",
  "error": "Forbidden"
}
```

### `404 Not Found`
```json
{
  "statusCode": 404,
  "message": "Booking not found",
  "error": "Not Found"
}
```

### `409 Conflict`
```json
{
  "statusCode": 409,
  "message": "Time slot is fully booked",
  "error": "Conflict"
}
```

### `429 Too Many Requests` — Rate Limit
```json
{
  "statusCode": 429,
  "message": "ThrottlerException: Too Many Requests"
}
```

---

## 20. Security Headers

### Required on All State-Changing Requests (POST, PUT, PATCH, DELETE)

| Header | Description |
|--------|-------------|
| `Cookie: access_token=<jwt>` | JWT access token (set by login) |
| `X-CSRF-Token: <token>` | Must match `csrf-token` cookie value |

### Alternative Auth (for non-browser clients)

| Header | Description |
|--------|-------------|
| `Authorization: Bearer <jwt>` | JWT access token in header |

### Rate Limits

| Tier | Window | Max Requests |
|------|--------|-------------|
| Short | 1 second | 10 |
| Medium | 1 minute | 100 |
| Long | 1 hour | 1000 |

---

## RBAC Permission Matrix

| Action | PORT_ADMIN | TERMINAL_OPERATOR | CARRIER | GATE_AGENT |
|--------|-----------|-------------------|---------|------------|
| POST /admin/terminals | Yes | — | — | — |
| POST /admin/gates | Yes | — | — | — |
| POST /admin/zones | Yes | — | — | — |
| GET /admin/audit-logs | Yes | — | — | — |
| GET /admin/analytics/* | Yes | — | — | — |
| POST /slots | Yes | — | — | — |
| GET /slots/availability | Yes | Yes | Yes | — |
| GET /slots/heatmap | Yes | Yes | Yes | — |
| POST /bookings | — | — | Yes | — |
| GET /bookings/my | — | — | Yes | — |
| POST /bookings/:id/cancel | — | — | Yes | — |
| POST /operator/bookings/:id/approve | — | Yes | — | — |
| POST /operator/bookings/:id/reject | — | Yes | — | — |
| GET /operator/queue | Yes | Yes | — | — |
| POST /operator/capacity/override | Yes | Yes | — | — |
| GET /operator/alerts | Yes | Yes | — | — |
| POST /gate/scan | — | — | — | Yes |
| POST /carrier/trucks | — | — | Yes | — |
| POST /carrier/containers | — | — | Yes | — |
| POST /carrier/trucks/location | — | — | Yes | — |
| POST /carrier/bol/upload | — | — | Yes | — |
| POST /ai/sessions | Yes | Yes | Yes | Yes |
| POST /ai/query | Yes | Yes | Yes | Yes |
