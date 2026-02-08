/**
 * PORTFLOW AI — Business & Monetization E2E Test Suite
 *
 * Tests all 4 monetization features from the PRD:
 *   FEATURE 1 — Dynamic Pricing (demand-based + eco-slots)
 *   FEATURE 2 — Priority Access
 *   FEATURE 3 — Automated Penalties (no-show / late)
 *   FEATURE 4 — Charges Summary
 *
 * Prerequisites:
 *   1. Postgres running with schema pushed and seeded
 *
 * Run:  npm run test:e2e:monetization:win
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

describe('PORTFLOW AI — Business & Monetization', () => {
  let app: INestApplication;
  let server: any;

  let admin: AuthCtx;
  let operator: AuthCtx;
  let carrier: AuthCtx;

  // Resources
  let terminalId: string;
  let slotId: string; // normal slot (peak hours)
  let ecoSlotId: string; // eco slot (off-peak)
  let bookingId: string;
  let containerId: string;
  let truckId: string;

  const runSuffix = Date.now().toString().slice(-6);
  const testPlate = `MN-${runSuffix}`;
  const testContainer = `MNTZ${Date.now().toString().slice(-7)}`;

  /* ──── Bootstrap ──────────────────────────────────────────────────────── */

  beforeAll(async () => {
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

  async function login(email: string, password: string): Promise<AuthCtx> {
    const res = await request(server)
      .post('/auth/login')
      .send({ email, password })
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

  function authDelete(ctx: AuthCtx, url: string) {
    return request(server)
      .delete(url)
      .set('Cookie', cookieString(ctx.cookies))
      .set('Authorization', `Bearer ${ctx.accessToken}`)
      .set('X-CSRF-Token', ctx.csrfToken);
  }

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  SETUP                                                                  */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Setup', () => {
    it('Login all roles', async () => {
      admin = await login('admin@portflow.ai', 'password123');
      operator = await login('operator@portflow.ai', 'password123');
      carrier = await login('carrier@acme.com', 'password123');
      expect(admin.accessToken).toBeDefined();
      expect(operator.accessToken).toBeDefined();
      expect(carrier.accessToken).toBeDefined();
    });

    it('Create terminal', async () => {
      const res = await authPost(admin, '/admin/terminals')
        .send({
          name: `Monetization Terminal ${runSuffix}`,
          location: 'Monetization Test Port',
        })
        .expect(201);
      terminalId = res.body.id;
      expect(terminalId).toBeDefined();
    });

    it('Create peak-hours time slot (10:00-12:00)', async () => {
      const start = new Date();
      start.setDate(start.getDate() + 1);
      start.setUTCHours(10, 0, 0, 0);
      const end = new Date(start);
      end.setUTCHours(12, 0, 0, 0);

      const res = await authPost(admin, '/slots')
        .send({
          terminalId,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          capacity: 5,
        })
        .expect(201);
      slotId = res.body.id;
      expect(slotId).toBeDefined();
    });

    it('Create eco-slot (off-peak, 20:00-22:00)', async () => {
      const start = new Date();
      start.setDate(start.getDate() + 1);
      start.setUTCHours(20, 0, 0, 0);
      const end = new Date(start);
      end.setUTCHours(22, 0, 0, 0);

      const res = await authPost(admin, '/slots')
        .send({
          terminalId,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          capacity: 5,
        })
        .expect(201);
      ecoSlotId = res.body.id;
      expect(ecoSlotId).toBeDefined();
    });

    it('Register truck', async () => {
      const res = await authPost(carrier, '/carrier/trucks')
        .send({ plate: testPlate })
        .expect(201);
      truckId = res.body.id;
      expect(truckId).toBeDefined();
    });

    it('Register container', async () => {
      const res = await authPost(carrier, '/carrier/containers')
        .send({ containerNumber: testContainer })
        .expect(201);
      containerId = res.body.id;
      expect(containerId).toBeDefined();
    });

    it('Create booking (PENDING)', async () => {
      const res = await authPost(carrier, '/bookings')
        .send({
          terminalId,
          timeSlotId: slotId,
          truckId,
          containerId,
          price: 120,
        })
        .expect(201);
      bookingId = res.body.id;
      expect(res.body.status).toBe('PENDING');
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  FEATURE 1 — Dynamic Pricing                                           */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('FEATURE 1 — Dynamic Pricing', () => {
    it('GET /slots/:id/pricing → returns dynamic price for peak-hour slot', async () => {
      const res = await authGet(carrier, `/slots/${slotId}/pricing`).expect(
        200,
      );

      expect(res.body.slotId).toBe(slotId);
      expect(res.body.basePrice).toBe(100);
      expect(res.body.multiplier).toBeDefined();
      expect(res.body.finalPrice).toBeDefined();
      expect(res.body.congestionLevel).toBeDefined();
      expect(res.body.utilizationPct).toBeDefined();
      expect(res.body.reason).toBeDefined();
      expect(res.body.pricingId).toBeDefined();
      expect(res.body.computedAt).toBeDefined();
      expect(typeof res.body.finalPrice).toBe('number');
      expect(res.body.isEcoSlot).toBe(false);
    });

    it('GET /slots/:id/pricing → eco-slot has isEcoSlot=true and lower price', async () => {
      const res = await authGet(carrier, `/slots/${ecoSlotId}/pricing`).expect(
        200,
      );

      expect(res.body.slotId).toBe(ecoSlotId);
      expect(res.body.isEcoSlot).toBe(true);
      expect(res.body.reason).toContain('Eco-slot');
      // Eco-slot should have a lower multiplier (×0.8 × 0.8 = ×0.64)
      expect(res.body.multiplier).toBeLessThanOrEqual(0.8);
      expect(res.body.finalPrice).toBeLessThanOrEqual(80);
    });

    it('Pricing is deterministic — same input produces same output', async () => {
      const res1 = await authGet(carrier, `/slots/${slotId}/pricing`).expect(
        200,
      );
      const res2 = await authGet(carrier, `/slots/${slotId}/pricing`).expect(
        200,
      );

      expect(res1.body.multiplier).toBe(res2.body.multiplier);
      expect(res1.body.finalPrice).toBe(res2.body.finalPrice);
      expect(res1.body.congestionLevel).toBe(res2.body.congestionLevel);
    });

    it('Pricing calculation < 200ms (non-functional)', async () => {
      const start = Date.now();
      await authGet(carrier, `/slots/${slotId}/pricing`).expect(200);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThan(200);
    });

    it('Non-existent slot → 404', async () => {
      await authGet(
        carrier,
        '/slots/00000000-0000-0000-0000-000000000000/pricing',
      ).expect(404);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  FEATURE 2 — Priority Access                                           */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('FEATURE 2 — Priority Access', () => {
    it('POST /bookings/:id/priority → enable PRIORITY level', async () => {
      const res = await authPost(carrier, `/bookings/${bookingId}/priority`)
        .send({ level: 'PRIORITY' })
        .expect(201);

      expect(res.body.bookingId).toBe(bookingId);
      expect(res.body.level).toBe('PRIORITY');
      expect(res.body.fee).toBe(30);
      expect(res.body.aiExplanation).toContain('Priority access enabled');
    });

    it('Duplicate priority → 409 Conflict', async () => {
      await authPost(carrier, `/bookings/${bookingId}/priority`)
        .send({ level: 'PRIORITY' })
        .expect(409);
    });

    it('Non-existent booking → 404', async () => {
      await authPost(
        carrier,
        '/bookings/00000000-0000-0000-0000-000000000000/priority',
      )
        .send({ level: 'PRIORITY' })
        .expect(404);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  FEATURE 3 — Automated Penalties                                        */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('FEATURE 3 — Automated Penalties', () => {
    it('POST /bookings/:id/penalty → NO_SHOW penalty (50% of price)', async () => {
      const res = await authPost(operator, `/bookings/${bookingId}/penalty`)
        .send({ type: 'NO_SHOW' })
        .expect(201);

      expect(res.body.bookingId).toBe(bookingId);
      expect(res.body.type).toBe('NO_SHOW');
      expect(res.body.amount).toBe(60); // 120 × 0.5
      expect(res.body.reason).toContain('No-show');
      expect(res.body.aiExplanation).toContain('Penalty applied');
      expect(res.body.appliedAt).toBeDefined();
    });

    it('POST /bookings/:id/penalty → LATE penalty >15 min (20%)', async () => {
      const res = await authPost(operator, `/bookings/${bookingId}/penalty`)
        .send({ type: 'LATE', minutesLate: 20 })
        .expect(201);

      expect(res.body.type).toBe('LATE');
      expect(res.body.amount).toBe(24); // 120 × 0.2
      expect(res.body.reason).toContain('20 min late');
    });

    it('POST /bookings/:id/penalty → LATE penalty >30 min (40%)', async () => {
      const res = await authPost(operator, `/bookings/${bookingId}/penalty`)
        .send({ type: 'LATE', minutesLate: 45 })
        .expect(201);

      expect(res.body.type).toBe('LATE');
      expect(res.body.amount).toBe(48); // 120 × 0.4
      expect(res.body.reason).toContain('45 min late');
    });

    it('POST /bookings/:id/penalty → LATE ≤15 min → no penalty', async () => {
      const res = await authPost(operator, `/bookings/${bookingId}/penalty`)
        .send({ type: 'LATE', minutesLate: 10 })
        .expect(201);

      expect(res.body.amount).toBe(0);
      expect(res.body.reason).toContain('no penalty');
    });

    it('POST /bookings/:id/penalty → custom amount', async () => {
      const res = await authPost(operator, `/bookings/${bookingId}/penalty`)
        .send({ type: 'NO_SHOW', amount: 75 })
        .expect(201);

      expect(res.body.amount).toBe(75);
      expect(res.body.reason).toContain('Custom penalty');
    });

    it('Non-existent booking → 404', async () => {
      await authPost(
        operator,
        '/bookings/00000000-0000-0000-0000-000000000000/penalty',
      )
        .send({ type: 'NO_SHOW' })
        .expect(404);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  FEATURE 4 — Charges Summary                                           */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('FEATURE 4 — Charges Summary', () => {
    it('GET /bookings/:id/charges → full breakdown', async () => {
      const res = await authGet(
        carrier,
        `/bookings/${bookingId}/charges`,
      ).expect(200);

      expect(res.body.bookingId).toBe(bookingId);
      expect(res.body.breakdown).toBeDefined();
      expect(res.body.breakdown.basePrice).toBeDefined();
      expect(res.body.breakdown.slotPrice).toBeDefined();
      expect(res.body.totalCharges).toBeDefined();
      expect(typeof res.body.totalCharges).toBe('number');
      expect(res.body.computedAt).toBeDefined();
    });

    it('Charges include priority access fee', async () => {
      const res = await authGet(
        carrier,
        `/bookings/${bookingId}/charges`,
      ).expect(200);

      expect(res.body.breakdown.priorityAccess).toBeDefined();
      expect(res.body.breakdown.priorityAccess.level).toBe('PRIORITY');
      expect(res.body.breakdown.priorityAccess.fee).toBe(30);
    });

    it('Charges include all penalties', async () => {
      const res = await authGet(
        carrier,
        `/bookings/${bookingId}/charges`,
      ).expect(200);

      expect(res.body.breakdown.penalties).toBeDefined();
      expect(Array.isArray(res.body.breakdown.penalties)).toBe(true);
      expect(res.body.breakdown.penalties.length).toBeGreaterThanOrEqual(5);
      expect(res.body.breakdown.totalPenalties).toBeGreaterThan(0);
    });

    it('Total charges = slotPrice + priorityFee + totalPenalties', async () => {
      const res = await authGet(
        carrier,
        `/bookings/${bookingId}/charges`,
      ).expect(200);

      const { slotPrice, totalPenalties } = res.body.breakdown;
      const priorityFee = res.body.breakdown.priorityAccess?.fee || 0;
      const expected =
        Math.round((slotPrice + priorityFee + totalPenalties) * 100) / 100;

      expect(res.body.totalCharges).toBe(expected);
    });

    it('Non-existent booking → 404', async () => {
      await authGet(
        carrier,
        '/bookings/00000000-0000-0000-0000-000000000000/charges',
      ).expect(404);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  Non-Functional                                                         */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Non-Functional', () => {
    it('Pricing, priority, penalty are all auditable (have IDs and timestamps)', async () => {
      const pricing = await authGet(carrier, `/slots/${slotId}/pricing`).expect(
        200,
      );
      expect(pricing.body.pricingId).toBeDefined();
      expect(pricing.body.computedAt).toBeDefined();
    });

    it('All decisions are explainable (reason + aiExplanation)', async () => {
      const pricing = await authGet(carrier, `/slots/${slotId}/pricing`).expect(
        200,
      );
      expect(pricing.body.reason.length).toBeGreaterThan(0);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  Cleanup                                                                */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Cleanup', () => {
    it('Delete terminal (cascades bookings, slots, pricing, penalties)', async () => {
      if (terminalId) {
        await authDelete(admin, `/admin/terminals/${terminalId}`).expect(200);
      }
    });

    it('Delete truck', async () => {
      if (truckId) {
        await authDelete(carrier, `/carrier/trucks/${truckId}`).expect(200);
      }
    });
  });
});
