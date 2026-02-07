/**
 * PORTFLOW AI — Full End-to-End Test Suite
 *
 * Tests every PRD endpoint against a live database.
 *
 * Prerequisites:
 *   1. Postgres must be running (use `npm run test:e2e:setup` or Docker)
 *   2. Schema must be pushed and seeded
 *
 * Quick run:  npm run test:e2e:full
 */

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from '../src/app.module.js';

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Helpers                                                                    */
/* ──────────────────────────────────────────────────────────────────────────── */

function parseCookies(res: request.Response): Record<string, string> {
  const map: Record<string, string> = {};
  const raw = res.headers['set-cookie'];
  if (!raw) return map;
  const arr = Array.isArray(raw) ? raw : [raw];
  for (const c of arr) {
    const [pair] = c.split(';');
    const [name, ...rest] = pair.split('=');
    map[name.trim()] = rest.join('=');
  }
  return map;
}

function cookieString(cookies: Record<string, string>): string {
  return Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ');
}

interface AuthCtx {
  accessToken: string;
  csrfToken: string;
  cookies: Record<string, string>;
}

/* ──────────────────────────────────────────────────────────────────────────── */
/*  Test Suite                                                                 */
/* ──────────────────────────────────────────────────────────────────────────── */

describe('PORTFLOW AI — Full E2E', () => {
  let app: INestApplication;
  let server: any;

  let admin: AuthCtx;
  let operator: AuthCtx;
  let carrier: AuthCtx;
  let gate: AuthCtx;

  let terminalId: string;
  let gateId: string;
  let timeSlotId: string;
  let bookingId: string;
  let qrToken: string;
  let aiSessionId: string;
  let zoneId: string;
  let truckId: string;
  let containerId: string;

  const testRunId = `e2e-${Date.now()}`;
  const runSuffix = Date.now().toString().slice(-6);
  const testPlate = `E2E-${runSuffix}`;
  const testContainerNum = `TSTE${Date.now().toString().slice(-7)}`;

  // Track extra resources created during reject/cancel flows for cleanup
  const extraSlotIds: string[] = [];
  const extraBookingIds: string[] = [];

  /* ──── Bootstrap ──────────────────────────────────────────────────────── */

  beforeAll(async () => {
    // Ensure AI service uses rule-based fallback (no real network calls)
    process.env.NODE_ENV = 'test';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    app.useWebSocketAdapter(new IoAdapter(app));
    await app.init();
    server = app.getHttpServer();
  }, 30_000);

  afterAll(async () => {
    if (app) await app.close();
  });

  /* ──── Auth helpers ──────────────────────────────────────────────────── */

  async function login(
    email: string,
    password: string,
    deviceId?: string,
  ): Promise<AuthCtx> {
    const body: any = { email, password };
    if (deviceId) body.deviceId = deviceId;

    const res = await request(server)
      .post('/auth/login')
      .send(body)
      .expect(200);
    const cookies = parseCookies(res);
    return {
      accessToken: res.body.accessToken,
      csrfToken: res.body.csrfToken,
      cookies,
    };
  }

  function authGet(ctx: AuthCtx, url: string) {
    return request(server)
      .get(url)
      .set('Cookie', cookieString(ctx.cookies))
      .set('Authorization', `Bearer ${ctx.accessToken}`);
  }

  function authPost(ctx: AuthCtx, url: string) {
    return request(server)
      .post(url)
      .set('Cookie', cookieString(ctx.cookies))
      .set('Authorization', `Bearer ${ctx.accessToken}`)
      .set('X-CSRF-Token', ctx.csrfToken);
  }

  function authPut(ctx: AuthCtx, url: string) {
    return request(server)
      .put(url)
      .set('Cookie', cookieString(ctx.cookies))
      .set('Authorization', `Bearer ${ctx.accessToken}`)
      .set('X-CSRF-Token', ctx.csrfToken);
  }

  function authDelete(ctx: AuthCtx, url: string) {
    return request(server)
      .delete(url)
      .set('Cookie', cookieString(ctx.cookies))
      .set('Authorization', `Bearer ${ctx.accessToken}`)
      .set('X-CSRF-Token', ctx.csrfToken);
  }

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  1. HEALTH CHECK                                                        */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Health Check', () => {
    it('GET / → 200 with status ok', async () => {
      const res = await request(server).get('/').expect(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('PORTFLOW AI');
      expect(res.body.database).toBe('up');
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  2. AUTHENTICATION                                                      */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Authentication', () => {
    it('POST /auth/login → admin', async () => {
      admin = await login('admin@portflow.ai', 'password123');
      expect(admin.accessToken).toBeDefined();
      expect(admin.csrfToken).toBeDefined();
    });

    it('POST /auth/login → operator', async () => {
      operator = await login('operator@portflow.ai', 'password123');
      expect(operator.accessToken).toBeDefined();
    });

    it('POST /auth/login → carrier', async () => {
      carrier = await login('carrier@acme.com', 'password123');
      expect(carrier.accessToken).toBeDefined();
    });

    it('POST /auth/login → gate agent (device-bound)', async () => {
      gate = await login('gate@portflow.ai', 'password123', 'gate-scanner-001');
      expect(gate.accessToken).toBeDefined();
    });

    it('POST /auth/login → reject wrong password', async () => {
      await request(server)
        .post('/auth/login')
        .send({ email: 'admin@portflow.ai', password: 'wrongpassword' })
        .expect(401);
    });

    it('POST /auth/refresh → rotates tokens', async () => {
      const res = await request(server)
        .post('/auth/refresh')
        .set('Cookie', cookieString(admin.cookies))
        .set('X-CSRF-Token', admin.csrfToken)
        .expect(200);
      expect(res.body.accessToken).toBeDefined();
      const cookies = parseCookies(res);
      admin = {
        accessToken: res.body.accessToken,
        csrfToken: res.body.csrfToken,
        cookies: { ...admin.cookies, ...cookies },
      };
    });

    it('POST /auth/logout → clears session', async () => {
      const temp = await login('admin@portflow.ai', 'password123');
      await request(server)
        .post('/auth/logout')
        .set('Cookie', cookieString(temp.cookies))
        .set('Authorization', `Bearer ${temp.accessToken}`)
        .set('X-CSRF-Token', temp.csrfToken)
        .expect(200);
    });

    it('GET /auth/csrf-token → public', async () => {
      const res = await request(server).get('/auth/csrf-token').expect(200);
      expect(res.body.csrfToken).toBeDefined();
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  3. PUBLIC ENDPOINTS                                                    */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Public Endpoints', () => {
    it('GET /public/pulse', async () => {
      await request(server).get('/public/pulse').expect(200);
    });

    it('GET /public/stats', async () => {
      await request(server).get('/public/stats').expect(200);
    });

    it('GET /public/containers/MSKU1234567/track', async () => {
      await request(server)
        .get('/public/containers/MSKU1234567/track')
        .expect(200);
    });

    it('GET /public/containers/NONEXISTENT/track → 404', async () => {
      await request(server)
        .get('/public/containers/NONEXISTENT/track')
        .expect(404);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  4. ADMIN — TERMINALS                                                   */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Admin — Terminals', () => {
    it('POST /admin/terminals → create (Admin)', async () => {
      const res = await authPost(admin, '/admin/terminals')
        .send({ name: 'Test Terminal E2E', location: 'E2E Dock' })
        .expect(201);
      terminalId = res.body.id;
      expect(terminalId).toBeDefined();
    });

    it('GET /admin/terminals → list', async () => {
      const res = await authGet(admin, '/admin/terminals').expect(200);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    it('GET /admin/terminals/:id → by ID', async () => {
      await authGet(admin, `/admin/terminals/${terminalId}`).expect(200);
    });

    it('PUT /admin/terminals/:id → update', async () => {
      const res = await authPut(admin, `/admin/terminals/${terminalId}`)
        .send({ name: 'Test Terminal E2E Updated' })
        .expect(200);
      expect(res.body.name).toBe('Test Terminal E2E Updated');
    });

    it('Carrier cannot create terminals', async () => {
      await authPost(carrier, '/admin/terminals')
        .send({ name: 'X', location: 'X' })
        .expect(403);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  5. ADMIN — GATES                                                       */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Admin — Gates', () => {
    it('POST /admin/gates → create', async () => {
      const res = await authPost(admin, '/admin/gates')
        .send({ name: 'E2E Gate', terminalId })
        .expect(201);
      gateId = res.body.id;
    });

    it('GET /admin/gates → list', async () => {
      await authGet(admin, '/admin/gates').expect(200);
    });

    it('PUT /admin/gates/:id → update', async () => {
      const res = await authPut(admin, `/admin/gates/${gateId}`)
        .send({ name: 'E2E Gate Updated' })
        .expect(200);
      expect(res.body.name).toBe('E2E Gate Updated');
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  6. ADMIN — ZONES                                                       */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Admin — Zones', () => {
    it('POST /admin/zones → create', async () => {
      const res = await authPost(admin, '/admin/zones')
        .send({ name: 'E2E Zone', terminalId, type: 'HAZMAT', maxTrucks: 10 })
        .expect(201);
      zoneId = res.body.id;
    });

    it('GET /admin/zones → list', async () => {
      await authGet(admin, '/admin/zones').expect(200);
    });

    it('PUT /admin/zones/:id → update', async () => {
      const res = await authPut(admin, `/admin/zones/${zoneId}`)
        .send({ maxTrucks: 20 })
        .expect(200);
      expect(res.body.maxTrucks).toBe(20);
    });

    it('DELETE /admin/zones/:id', async () => {
      await authDelete(admin, `/admin/zones/${zoneId}`).expect(200);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  7. SLOTS                                                               */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Slots & Availability', () => {
    it('POST /slots → create (Admin)', async () => {
      const now = new Date();
      const t = new Date(now.getTime() + 5 * 60 * 1000); // 5 min from now (future for booking, within gate 30-min buffer)
      const e = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
      const res = await authPost(admin, '/slots')
        .send({
          terminalId,
          startTime: t.toISOString(),
          endTime: e.toISOString(),
          capacity: 20,
        })
        .expect(201);
      timeSlotId = res.body.id;
    });

    it('GET /slots/availability', async () => {
      await authGet(carrier, '/slots/availability').expect(200);
    });

    it('GET /slots/heatmap', async () => {
      await authGet(carrier, '/slots/heatmap').expect(200);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  8. CARRIER FLEET                                                       */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Carrier — Fleet', () => {
    it('POST /carrier/trucks → register', async () => {
      const res = await authPost(carrier, '/carrier/trucks')
        .send({ plate: testPlate })
        .expect(201);
      truckId = res.body.id;
    });

    it('GET /carrier/trucks → list', async () => {
      const res = await authGet(carrier, '/carrier/trucks').expect(200);
      expect(res.body.some((t: any) => t.id === truckId)).toBe(true);
    });

    it('POST /carrier/trucks/location → GPS update', async () => {
      await authPost(carrier, '/carrier/trucks/location')
        .send({ truckId, lat: 36.75, lng: 3.06 })
        .expect(201);
    });

    it('GET /carrier/trucks/:id/locations → history', async () => {
      const res = await authGet(
        carrier,
        `/carrier/trucks/${truckId}/locations`,
      ).expect(200);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });

    it('POST /carrier/containers → register', async () => {
      const res = await authPost(carrier, '/carrier/containers')
        .send({ containerNumber: testContainerNum })
        .expect(201);
      containerId = res.body.id;
    });

    it('GET /carrier/containers → list', async () => {
      await authGet(carrier, '/carrier/containers').expect(200);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  9. FULL BOOKING LIFECYCLE                                              */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Booking Lifecycle (PENDING → CONFIRMED → READY_TO_GO → CONSUMED)', () => {
    it('POST /bookings → create (Carrier)', async () => {
      const res = await authPost(carrier, '/bookings')
        .send({
          terminalId,
          timeSlotId,
          truckId,
          containerId,
          price: 250,
          idempotencyKey: testRunId,
        })
        .expect(201);
      bookingId = res.body.id;
      expect(res.body.status).toBe('PENDING');
    });

    it('POST /bookings → idempotency returns same', async () => {
      const res = await authPost(carrier, '/bookings')
        .send({
          terminalId,
          timeSlotId,
          containerId,
          idempotencyKey: testRunId,
        })
        .expect(201);
      expect(res.body.id).toBe(bookingId);
    });

    it('GET /bookings/my', async () => {
      const res = await authGet(carrier, '/bookings/my').expect(200);
      expect(res.body.some((b: any) => b.id === bookingId)).toBe(true);
    });

    it('GET /bookings/:id', async () => {
      const res = await authGet(carrier, `/bookings/${bookingId}`).expect(200);
      expect(res.body.status).toBe('PENDING');
    });

    it('POST /operator/bookings/:id/approve → CONFIRMED + QR + blockchain hash', async () => {
      const res = await authPost(
        operator,
        `/operator/bookings/${bookingId}/approve`,
      ).expect(201);
      expect(res.body.status).toBe('CONFIRMED');
      expect(res.body.qrToken).toBeDefined();
      expect(res.body.blockchainHash).toBeDefined();
      expect(res.body.qrDataUrl).toContain('data:image/png');
      qrToken = res.body.qrToken;
    });

    it('POST /operator/containers/:id/status → IN_YARD', async () => {
      const res = await authPost(
        operator,
        `/operator/containers/${containerId}/status`,
      )
        .send({ status: 'IN_YARD' })
        .expect(201);
      expect(res.body.status).toBe('IN_YARD');
    });

    it('POST /operator/containers/:id/status → READY', async () => {
      const res = await authPost(
        operator,
        `/operator/containers/${containerId}/status`,
      )
        .send({ status: 'READY' })
        .expect(201);
      expect(res.body.status).toBe('READY');
    });

    it('POST /operator/bookings/:id/confirm-readiness → READY_TO_GO', async () => {
      const res = await authPost(
        operator,
        `/operator/bookings/${bookingId}/confirm-readiness`,
      ).expect(201);
      expect(res.body.status).toBe('READY_TO_GO');
    });

    it('GET /bookings/:id/reschedule-options → alternative slots', async () => {
      // Create a second slot so reschedule has options
      const now = new Date();
      const t = new Date(now.getTime() + 4 * 60 * 60 * 1000);
      const e = new Date(now.getTime() + 6 * 60 * 60 * 1000);
      const slot2 = await authPost(admin, '/slots')
        .send({
          terminalId,
          startTime: t.toISOString(),
          endTime: e.toISOString(),
          capacity: 10,
        })
        .expect(201);
      extraSlotIds.push(slot2.body.id);

      const res = await authGet(
        carrier,
        `/bookings/${bookingId}/reschedule-options`,
      ).expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('GET /ai/readiness/:bookingId → readiness prediction', async () => {
      const res = await authGet(carrier, `/ai/readiness/${bookingId}`).expect(
        200,
      );
      expect(res.body.bookingId).toBe(bookingId);
      expect(res.body.probability).toBeDefined();
      expect(typeof res.body.probability).toBe('number');
      expect(res.body.probability).toBeGreaterThanOrEqual(0);
      expect(res.body.probability).toBeLessThanOrEqual(100);
      expect(res.body.riskLevel).toBeDefined();
    });

    it('POST /gate/scan → ALLOWED', async () => {
      const res = await request(server)
        .post('/gate/scan')
        .set('Cookie', cookieString(gate.cookies))
        .set('Authorization', `Bearer ${gate.accessToken}`)
        .set('X-CSRF-Token', gate.csrfToken)
        .set('x-device-id', 'gate-scanner-001')
        .send({ qrToken, gateId })
        .expect(201);
      expect(res.body.result).toBe('ALLOWED');
    });

    it('Booking is now CONSUMED', async () => {
      const res = await authGet(carrier, `/bookings/${bookingId}`).expect(200);
      expect(res.body.status).toBe('CONSUMED');
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  10. REJECT & CANCEL FLOWS                                              */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Booking — Reject & Cancel', () => {
    it('Reject flow', async () => {
      const d = new Date();
      d.setDate(d.getDate() + 2);
      d.setHours(10, 0, 0, 0);
      const e = new Date(d);
      e.setHours(12, 0, 0, 0);
      const slot = await authPost(admin, '/slots')
        .send({
          terminalId,
          startTime: d.toISOString(),
          endTime: e.toISOString(),
          capacity: 5,
        })
        .expect(201);
      extraSlotIds.push(slot.body.id);
      const book = await authPost(carrier, '/bookings')
        .send({ terminalId, timeSlotId: slot.body.id, containerId })
        .expect(201);
      extraBookingIds.push(book.body.id);
      const rej = await authPost(
        operator,
        `/operator/bookings/${book.body.id}/reject`,
      )
        .send({ reason: 'E2E test' })
        .expect(201);
      expect(rej.body.status).toBe('REJECTED');
    });

    it('Cancel flow', async () => {
      const d = new Date();
      d.setDate(d.getDate() + 3);
      d.setHours(14, 0, 0, 0);
      const e = new Date(d);
      e.setHours(16, 0, 0, 0);
      const slot = await authPost(admin, '/slots')
        .send({
          terminalId,
          startTime: d.toISOString(),
          endTime: e.toISOString(),
          capacity: 5,
        })
        .expect(201);
      extraSlotIds.push(slot.body.id);
      const book = await authPost(carrier, '/bookings')
        .send({ terminalId, timeSlotId: slot.body.id, containerId })
        .expect(201);
      extraBookingIds.push(book.body.id);
      const cancel = await authPost(
        carrier,
        `/bookings/${book.body.id}/cancel`,
      ).expect(201);
      expect(cancel.body.status).toBe('CANCELLED');
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  11. OPERATOR CONTROL ROOM                                              */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Operator Control Room', () => {
    it('GET /operator/queue', async () => {
      await authGet(operator, '/operator/queue').expect(200);
    });

    it('POST /operator/capacity/override', async () => {
      const res = await authPost(operator, '/operator/capacity/override')
        .send({ timeSlotId, newCapacity: 30 })
        .expect(201);
      expect(res.body.capacity).toBe(30);
    });

    it('GET /operator/alerts', async () => {
      await authGet(operator, '/operator/alerts').expect(200);
    });

    it('POST /operator/containers/:id/status → invalid transition → 400', async () => {
      // Container is already READY from lifecycle, try NOT_ARRIVED (invalid back-transition)
      await authPost(operator, `/operator/containers/${containerId}/status`)
        .send({ status: 'NOT_ARRIVED' })
        .expect(400);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  12. GATE — ERROR CASES                                                 */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Gate — Error Cases', () => {
    it('Invalid QR → DENIED', async () => {
      const res = await request(server)
        .post('/gate/scan')
        .set('Cookie', cookieString(gate.cookies))
        .set('Authorization', `Bearer ${gate.accessToken}`)
        .set('X-CSRF-Token', gate.csrfToken)
        .set('x-device-id', 'gate-scanner-001')
        .send({ qrToken: 'bad-token', gateId })
        .expect(201);
      expect(res.body.result).toBe('DENIED');
    });

    it('Wrong device → 403', async () => {
      await request(server)
        .post('/gate/scan')
        .set('Cookie', cookieString(gate.cookies))
        .set('Authorization', `Bearer ${gate.accessToken}`)
        .set('X-CSRF-Token', gate.csrfToken)
        .set('x-device-id', 'wrong-device')
        .send({ qrToken: 'x', gateId })
        .expect(403);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  13. AI ASSISTANT                                                       */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('AI Assistant', () => {
    it('POST /ai/sessions → create', async () => {
      const res = await authPost(carrier, '/ai/sessions').send({}).expect(201);
      aiSessionId = res.body.id;
    });

    it('POST /ai/query → send message', async () => {
      const res = await authPost(carrier, '/ai/query')
        .send({ sessionId: aiSessionId, message: 'What slots are available?' })
        .expect(201);
      expect(res.body).toBeDefined();
    });

    it('GET /ai/sessions/:id/history', async () => {
      const res = await authGet(
        carrier,
        `/ai/sessions/${aiSessionId}/history`,
      ).expect(200);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  14. OCR                                                                */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('OCR / Smart Booking', () => {
    it('POST /carrier/bol/upload', async () => {
      const res = await request(server)
        .post('/carrier/bol/upload')
        .set('Cookie', cookieString(carrier.cookies))
        .set('Authorization', `Bearer ${carrier.accessToken}`)
        .set('X-CSRF-Token', carrier.csrfToken)
        .attach('file', Buffer.from('fake PDF'), {
          filename: 'bol.pdf',
          contentType: 'application/pdf',
        });
      expect([200, 201, 400].includes(res.status)).toBe(true);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  15. ADMIN — AUDIT & ANALYTICS                                          */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Admin — Audit & Analytics', () => {
    it('GET /admin/audit-logs', async () => {
      await authGet(admin, '/admin/audit-logs').expect(200);
    });

    it('GET /admin/audit-logs?page=1&limit=5', async () => {
      await authGet(admin, '/admin/audit-logs?page=1&limit=5').expect(200);
    });

    it('GET /admin/analytics/waiting-time', async () => {
      await authGet(admin, '/admin/analytics/waiting-time').expect(200);
    });

    it('GET /admin/analytics/waiting-time?days=7', async () => {
      await authGet(admin, '/admin/analytics/waiting-time?days=7').expect(200);
    });

    it('Carrier cannot view audit logs → 403', async () => {
      await authGet(carrier, '/admin/audit-logs').expect(403);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  16. RBAC ENFORCEMENT                                                   */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('RBAC Enforcement', () => {
    it('Carrier ✗ operator queue', () =>
      authGet(carrier, '/operator/queue').expect(403));
    it('Operator ✗ create booking', () =>
      authPost(operator, '/bookings')
        .send({ terminalId, timeSlotId })
        .expect(403));
    it('Carrier ✗ approve booking', () =>
      authPost(carrier, `/operator/bookings/${bookingId}/approve`).expect(403));
    it('Gate ✗ create terminal', () =>
      request(server)
        .post('/admin/terminals')
        .set('Cookie', cookieString(gate.cookies))
        .set('Authorization', `Bearer ${gate.accessToken}`)
        .set('X-CSRF-Token', gate.csrfToken)
        .set('x-device-id', 'gate-scanner-001')
        .send({ name: 'X', location: 'X' })
        .expect(403));
    it('Unauthenticated → 401', () =>
      request(server).get('/bookings/my').expect(401));
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  17. CSRF ENFORCEMENT                                                   */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('CSRF Enforcement', () => {
    it('POST without CSRF → 403', async () => {
      await request(server)
        .post('/bookings')
        .set('Cookie', cookieString(carrier.cookies))
        .set('Authorization', `Bearer ${carrier.accessToken}`)
        .send({ terminalId, timeSlotId })
        .expect(403);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  18. CLEANUP                                                            */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Cleanup', () => {
    // Cascade rules in schema handle FK dependencies:
    // - Deleting a gate cascades to gate_access_logs
    // - Deleting a terminal cascades to bookings, gates, time_slots, zones, metrics

    it('Delete gate', async () => {
      if (gateId) {
        await authDelete(admin, `/admin/gates/${gateId}`).expect(200);
      }
    });

    it('Delete truck', async () => {
      if (truckId) {
        await authDelete(carrier, `/carrier/trucks/${truckId}`).expect(200);
      }
    });

    it('Delete container', async () => {
      if (containerId) {
        await authDelete(carrier, `/carrier/containers/${containerId}`).expect(
          200,
        );
      }
    });

    it('Delete terminal', async () => {
      if (terminalId) {
        await authDelete(admin, `/admin/terminals/${terminalId}`).expect(200);
      }
    });
  });
});
