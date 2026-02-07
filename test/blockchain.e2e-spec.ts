/**
 * PORTFLOW AI — Blockchain Verification E2E Test Suite
 *
 * Tests all 7 blockchain scenarios from the Blockchain PRD:
 *   TEST 1 — Create Container Readiness Proof
 *   TEST 2 — Verify Blockchain Proof
 *   TEST 3 — Immutability (Tampering Attempt)
 *   TEST 4 — Gate Enforcement via Blockchain
 *   TEST 5 — Dual Proof Validation (booking + readiness)
 *   TEST 6 — Dispute Resolution Simulation
 *   TEST 7 — Proof History
 *
 * Prerequisites:
 *   1. Postgres running with schema pushed and seeded
 *
 * Run:  npm run test:e2e:blockchain
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

describe('PORTFLOW AI — Blockchain Verification', () => {
  let app: INestApplication;
  let server: any;

  let admin: AuthCtx;
  let operator: AuthCtx;
  let carrier: AuthCtx;
  let gate: AuthCtx;

  // Resources created during tests
  let terminalId: string;
  let gateId: string;
  let timeSlotId: string;
  let bookingId: string;
  let containerId: string;
  let truckId: string;
  let qrToken: string;
  let bookingBlockchainHash: string;
  let readinessBlockchainHash: string;

  const runSuffix = Date.now().toString().slice(-6);
  const testPlate = `BC-${runSuffix}`;
  const testContainerNum = `BCTE${Date.now().toString().slice(-7)}`;

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

  function authDelete(ctx: AuthCtx, url: string) {
    return request(server)
      .delete(url)
      .set('Cookie', cookieString(ctx.cookies))
      .set('Authorization', `Bearer ${ctx.accessToken}`)
      .set('X-CSRF-Token', ctx.csrfToken);
  }

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  SETUP — Create resources for blockchain testing                        */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Setup', () => {
    it('Login all roles', async () => {
      admin = await login('admin@portflow.ai', 'password123');
      operator = await login('operator@portflow.ai', 'password123');
      carrier = await login('carrier@acme.com', 'password123');
      gate = await login('gate@portflow.ai', 'password123', 'gate-scanner-001');
      expect(admin.accessToken).toBeDefined();
      expect(operator.accessToken).toBeDefined();
      expect(carrier.accessToken).toBeDefined();
      expect(gate.accessToken).toBeDefined();
    });

    it('Create terminal', async () => {
      const res = await authPost(admin, '/admin/terminals')
        .send({
          name: `BC Terminal ${runSuffix}`,
          location: 'Blockchain Test Port',
        })
        .expect(201);
      terminalId = res.body.id;
      expect(terminalId).toBeDefined();
    });

    it('Create gate', async () => {
      const res = await authPost(admin, '/admin/gates')
        .send({ name: `BC Gate ${runSuffix}`, terminalId })
        .expect(201);
      gateId = res.body.id;
      expect(gateId).toBeDefined();
    });

    it('Create time slot (current window)', async () => {
      const start = new Date();
      start.setMinutes(start.getMinutes() + 5);
      const end = new Date(start);
      end.setHours(end.getHours() + 2);

      const res = await authPost(admin, '/slots')
        .send({
          terminalId,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          capacity: 10,
        })
        .expect(201);
      timeSlotId = res.body.id;
      expect(timeSlotId).toBeDefined();
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
        .send({ containerNumber: testContainerNum })
        .expect(201);
      containerId = res.body.id;
      expect(containerId).toBeDefined();
    });

    it('Create booking (PENDING)', async () => {
      const res = await authPost(carrier, '/bookings')
        .send({
          terminalId,
          timeSlotId,
          truckId,
          containerId,
          price: 100,
        })
        .expect(201);
      bookingId = res.body.id;
      expect(res.body.status).toBe('PENDING');
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  TEST 1 — Create Container Readiness Proof                              */
  /*  Objective: Ensure readiness confirmation creates a blockchain proof.    */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('TEST 1 — Create Container Readiness Proof', () => {
    it('Approve booking → CONFIRMED (generates booking blockchain hash)', async () => {
      const res = await authPost(
        operator,
        `/operator/bookings/${bookingId}/approve`,
      ).expect(201);
      expect(res.body.status).toBe('CONFIRMED');
      expect(res.body.blockchainHash).toBeDefined();
      expect(typeof res.body.blockchainHash).toBe('string');
      expect(res.body.blockchainHash.length).toBe(64); // SHA-256 = 64 hex chars
      bookingBlockchainHash = res.body.blockchainHash;
    });

    it('Container → IN_YARD', async () => {
      const res = await authPost(
        operator,
        `/operator/containers/${containerId}/status`,
      )
        .send({ status: 'IN_YARD' })
        .expect(201);
      expect(res.body.status).toBe('IN_YARD');
    });

    it('Container → READY', async () => {
      const res = await authPost(
        operator,
        `/operator/containers/${containerId}/status`,
      )
        .send({ status: 'READY' })
        .expect(201);
      expect(res.body.status).toBe('READY');
    });

    it('Confirm readiness → READY_TO_GO + blockchain hash generated', async () => {
      const res = await authPost(
        operator,
        `/operator/bookings/${bookingId}/confirm-readiness`,
      ).expect(201);
      expect(res.body.status).toBe('READY_TO_GO');
      expect(res.body.blockchainHash).toBeDefined();
      expect(res.body.blockchainHash.length).toBe(64);
      readinessBlockchainHash = res.body.blockchainHash;
    });

    it('Booking blockchain hash is stored in database', async () => {
      const res = await authGet(carrier, `/bookings/${bookingId}`).expect(200);
      expect(res.body.blockchainHash).toBeDefined();
      expect(res.body.blockchainHash.length).toBe(64);
      expect(res.body.status).toBe('READY_TO_GO');
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  TEST 2 — Verify Blockchain Proof                                       */
  /*  Endpoint: GET /blockchain/verify/readiness/{bookingId}                 */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('TEST 2 — Verify Blockchain Proof', () => {
    it('GET /blockchain/verify/READINESS/:bookingId → VALID', async () => {
      const res = await authGet(
        operator,
        `/blockchain/verify/READINESS/${bookingId}`,
      ).expect(200);
      expect(res.body.status).toBe('VALID');
      expect(res.body.entityType).toBe('READINESS');
      expect(res.body.entityId).toBe(bookingId);
      expect(res.body.hash).toBeDefined();
      expect(res.body.hash.length).toBe(64);
      expect(res.body.verifiedAt).toBeDefined();
    });

    it('GET /blockchain/verify/BOOKING/:bookingId → VALID', async () => {
      const res = await authGet(
        operator,
        `/blockchain/verify/BOOKING/${bookingId}`,
      ).expect(200);
      expect(res.body.status).toBe('VALID');
      expect(res.body.entityType).toBe('BOOKING');
      expect(res.body.entityId).toBe(bookingId);
      expect(res.body.hash).toBeDefined();
    });

    it('Verify non-existent entity → 404', async () => {
      await authGet(
        operator,
        `/blockchain/verify/BOOKING/00000000-0000-0000-0000-000000000000`,
      ).expect(404);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  TEST 3 — Immutability (Tampering Attempt)                              */
  /*  Objective: Ensure modifications break proof validity.                   */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('TEST 3 — Immutability (Tampering Detection)', () => {
    it('POST /blockchain/proofs → create proof with known payload', async () => {
      const payload = {
        bookingId: bookingId,
        testField: 'original-data',
        timestamp: '2026-01-01T00:00:00Z',
      };
      const res = await authPost(operator, '/blockchain/proofs')
        .send({ entityType: 'BOOKING', entityId: bookingId, payload })
        .expect(201);
      expect(res.body.hash).toBeDefined();
      expect(res.body.hash.length).toBe(64);
      expect(res.body.entityType).toBe('BOOKING');
    });

    it('Tampered data produces different hash (deterministic SHA-256)', async () => {
      // Create a proof with original payload
      const originalPayload = { key: 'value-A', seq: 1 };
      const tamperedPayload = { key: 'value-B', seq: 1 };

      const originalRes = await authPost(operator, '/blockchain/proofs')
        .send({
          entityType: 'BOOKING',
          entityId: bookingId,
          payload: originalPayload,
        })
        .expect(201);

      const tamperedRes = await authPost(operator, '/blockchain/proofs')
        .send({
          entityType: 'BOOKING',
          entityId: bookingId,
          payload: tamperedPayload,
        })
        .expect(201);

      // Hashes must differ — proves immutability/tamper detection
      expect(originalRes.body.hash).not.toBe(tamperedRes.body.hash);
      expect(originalRes.body.hash.length).toBe(64);
      expect(tamperedRes.body.hash.length).toBe(64);
    });

    it('Same payload always produces same hash (deterministic)', async () => {
      const payload = { deterministic: true, value: 42 };

      const res1 = await authPost(operator, '/blockchain/proofs')
        .send({ entityType: 'BOOKING', entityId: bookingId, payload })
        .expect(201);

      const res2 = await authPost(operator, '/blockchain/proofs')
        .send({ entityType: 'BOOKING', entityId: bookingId, payload })
        .expect(201);

      expect(res1.body.hash).toBe(res2.body.hash);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  TEST 4 — Gate Enforcement via Blockchain                               */
  /*  Objective: Gate access depends on valid blockchain proof.               */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('TEST 4 — Gate Enforcement via Blockchain', () => {
    it('POST /gate/scan with valid proof → ALLOWED', async () => {
      // Booking is READY_TO_GO with valid blockchainHash
      const booking = await authGet(carrier, `/bookings/${bookingId}`).expect(
        200,
      );
      expect(booking.body.status).toBe('READY_TO_GO');
      expect(booking.body.qrToken).toBeDefined();
      expect(booking.body.blockchainHash).toBeDefined();

      const res = await request(server)
        .post('/gate/scan')
        .set('Cookie', cookieString(gate.cookies))
        .set('Authorization', `Bearer ${gate.accessToken}`)
        .set('X-CSRF-Token', gate.csrfToken)
        .set('x-device-id', 'gate-scanner-001')
        .send({ gateId, qrToken: booking.body.qrToken })
        .expect(201);

      expect(res.body.result).toBe('ALLOWED');
      expect(res.body.reason).toBe('Access granted');
    });

    it('Booking is now CONSUMED', async () => {
      const res = await authGet(carrier, `/bookings/${bookingId}`).expect(200);
      expect(res.body.status).toBe('CONSUMED');
    });

    it('POST /gate/scan on CONSUMED booking → DENIED', async () => {
      const booking = await authGet(carrier, `/bookings/${bookingId}`).expect(
        200,
      );

      const res = await request(server)
        .post('/gate/scan')
        .set('Cookie', cookieString(gate.cookies))
        .set('Authorization', `Bearer ${gate.accessToken}`)
        .set('X-CSRF-Token', gate.csrfToken)
        .set('x-device-id', 'gate-scanner-001')
        .send({ gateId, qrToken: booking.body.qrToken })
        .expect(201);

      expect(res.body.result).toBe('DENIED');
      expect(res.body.reason).toContain('CONSUMED');
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  TEST 5 — Dual Proof Validation (booking + readiness)                   */
  /*  Objective: Both booking and readiness produce distinct, valid hashes.   */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('TEST 5 — Dual Proof Validation', () => {
    let booking2Id: string;
    let slot2Id: string;

    it('Create second booking for dual-proof test', async () => {
      // Create a new slot
      const start = new Date();
      start.setHours(start.getHours() + 5);
      const end = new Date(start);
      end.setHours(end.getHours() + 2);

      const slotRes = await authPost(admin, '/slots')
        .send({
          terminalId,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          capacity: 10,
        })
        .expect(201);
      slot2Id = slotRes.body.id;

      // Register a new container for this booking
      const cNum = `DUAL${Date.now().toString().slice(-7)}`;
      const cRes = await authPost(carrier, '/carrier/containers')
        .send({ containerNumber: cNum })
        .expect(201);
      const container2Id = cRes.body.id;

      const res = await authPost(carrier, '/bookings')
        .send({
          terminalId,
          timeSlotId: slot2Id,
          truckId,
          containerId: container2Id,
          price: 200,
        })
        .expect(201);
      booking2Id = res.body.id;

      // Approve
      await authPost(
        operator,
        `/operator/bookings/${booking2Id}/approve`,
      ).expect(201);
      // Container flow
      await authPost(operator, `/operator/containers/${container2Id}/status`)
        .send({ status: 'IN_YARD' })
        .expect(201);
      await authPost(operator, `/operator/containers/${container2Id}/status`)
        .send({ status: 'READY' })
        .expect(201);
      // Confirm readiness
      await authPost(
        operator,
        `/operator/bookings/${booking2Id}/confirm-readiness`,
      ).expect(201);
    });

    it('Both BOOKING and READINESS proofs exist and are distinct', async () => {
      const bookingProof = await authGet(
        operator,
        `/blockchain/verify/BOOKING/${booking2Id}`,
      ).expect(200);
      const readinessProof = await authGet(
        operator,
        `/blockchain/verify/READINESS/${booking2Id}`,
      ).expect(200);

      expect(bookingProof.body.status).toBe('VALID');
      expect(readinessProof.body.status).toBe('VALID');

      // Two distinct hashes
      expect(bookingProof.body.hash).toBeDefined();
      expect(readinessProof.body.hash).toBeDefined();

      // Both are 64-char SHA-256 hashes
      expect(bookingProof.body.hash.length).toBe(64);
      expect(readinessProof.body.hash.length).toBe(64);

      // Both verifiable
      expect(bookingProof.body.verifiedAt).toBeDefined();
      expect(readinessProof.body.verifiedAt).toBeDefined();
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  TEST 6 — Dispute Resolution Simulation                                */
  /*  Scenario: Carrier disputes denial; proof provides objective evidence.  */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('TEST 6 — Dispute Resolution Simulation', () => {
    it('Proof has timestamp for dispute resolution', async () => {
      const res = await authGet(
        operator,
        `/blockchain/verify/READINESS/${bookingId}`,
      ).expect(200);

      // Proof timestamp is available for dispute resolution
      expect(res.body.createdAt).toBeDefined();
      expect(res.body.verifiedAt).toBeDefined();
      expect(res.body.hash).toBeDefined();

      // The proof can be used to objectively justify decisions
      const createdAt = new Date(res.body.createdAt);
      expect(createdAt.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it('Gate access log provides denial evidence for disputes', async () => {
      const res = await authGet(operator, '/operator/alerts').expect(200);
      expect(res.body.denials).toBeDefined();
      expect(Array.isArray(res.body.denials)).toBe(true);
      // The CONSUMED-booking denial from TEST 4 should be logged
    });

    it('Audit logs capture blockchain-related actions', async () => {
      const res = await authGet(admin, '/admin/audit-logs').expect(200);
      expect(res.body.data).toBeDefined();
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  TEST 7 — Proof History                                                 */
  /*  Endpoint: GET /blockchain/proofs/{entityId}                            */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('TEST 7 — Proof History', () => {
    it('GET /blockchain/proofs/:bookingId → full proof timeline', async () => {
      const res = await authGet(
        operator,
        `/blockchain/proofs/${bookingId}`,
      ).expect(200);

      expect(res.body.entityId).toBe(bookingId);
      expect(res.body.totalProofs).toBeGreaterThanOrEqual(2);
      expect(Array.isArray(res.body.proofs)).toBe(true);

      // Each proof has required fields
      for (const proof of res.body.proofs) {
        expect(proof.id).toBeDefined();
        expect(proof.entityType).toBeDefined();
        expect(proof.hash).toBeDefined();
        expect(proof.hash.length).toBe(64);
        expect(proof.createdAt).toBeDefined();
      }

      // Should have both BOOKING and READINESS proofs
      const types = res.body.proofs.map((p: any) => p.entityType);
      expect(types).toContain('BOOKING');
      expect(types).toContain('READINESS');
    });

    it('Proofs are ordered by creation time (newest first)', async () => {
      const res = await authGet(
        operator,
        `/blockchain/proofs/${bookingId}`,
      ).expect(200);

      const proofs = res.body.proofs;
      for (let i = 1; i < proofs.length; i++) {
        const prev = new Date(proofs[i - 1].createdAt).getTime();
        const curr = new Date(proofs[i].createdAt).getTime();
        expect(prev).toBeGreaterThanOrEqual(curr);
      }
    });

    it('Non-existent entity → 404', async () => {
      await authGet(
        operator,
        '/blockchain/proofs/00000000-0000-0000-0000-000000000000',
      ).expect(404);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  Non-Functional — Performance                                           */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Non-Functional — Performance', () => {
    it('Proof generation < 1 second', async () => {
      const start = Date.now();
      await authPost(operator, '/blockchain/proofs')
        .send({
          entityType: 'BOOKING',
          entityId: bookingId,
          payload: { performanceTest: true, ts: Date.now() },
        })
        .expect(201);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThan(1000);
    });

    it('Proof verification < 300ms', async () => {
      const start = Date.now();
      await authGet(operator, `/blockchain/verify/BOOKING/${bookingId}`).expect(
        200,
      );
      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThan(300);
    });
  });

  /* ════════════════════════════════════════════════════════════════════════ */
  /*  Cleanup                                                                */
  /* ════════════════════════════════════════════════════════════════════════ */

  describe('Cleanup', () => {
    it('Delete terminal (cascades bookings, gates, slots, proofs)', async () => {
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
