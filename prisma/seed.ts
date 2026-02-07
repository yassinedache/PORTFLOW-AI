import 'dotenv/config';
import { PrismaClient, Role } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding PORTFLOW AI database...\n');

  // ─── Companies ──────────────────────────────────────────────────────────
  const company1 = await prisma.company.upsert({
    where: { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01' },
    update: {},
    create: {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
      name: 'ACME Logistics',
    },
  });

  const company2 = await prisma.company.upsert({
    where: { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02' },
    update: {},
    create: {
      id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
      name: 'FastFreight Inc.',
    },
  });

  console.log('✅ Companies created');

  // ─── Users ──────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('password123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@portflow.ai' },
    update: {},
    create: {
      id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
      email: 'admin@portflow.ai',
      passwordHash,
      role: Role.PORT_ADMIN,
    },
  });

  const operator = await prisma.user.upsert({
    where: { email: 'operator@portflow.ai' },
    update: {},
    create: {
      id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
      email: 'operator@portflow.ai',
      passwordHash,
      role: Role.TERMINAL_OPERATOR,
    },
  });

  const carrier1 = await prisma.user.upsert({
    where: { email: 'carrier@acme.com' },
    update: {},
    create: {
      id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
      email: 'carrier@acme.com',
      passwordHash,
      role: Role.CARRIER,
      companyId: company1.id,
    },
  });

  const carrier2 = await prisma.user.upsert({
    where: { email: 'driver@fastfreight.com' },
    update: {},
    create: {
      id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a04',
      email: 'driver@fastfreight.com',
      passwordHash,
      role: Role.CARRIER,
      companyId: company2.id,
    },
  });

  const gateAgent = await prisma.user.upsert({
    where: { email: 'gate@portflow.ai' },
    update: {},
    create: {
      id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a05',
      email: 'gate@portflow.ai',
      passwordHash,
      role: Role.GATE_AGENT,
      deviceId: 'gate-scanner-001', // Pre-bound demo device
    },
  });

  console.log('✅ Users created (password: password123 for all)');

  // ─── Terminals ──────────────────────────────────────────────────────────
  const terminal1 = await prisma.terminal.upsert({
    where: { id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a01' },
    update: {},
    create: {
      id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
      name: 'Terminal A - Container',
      location: 'Port of Algiers, Dock 1',
      isActive: true,
    },
  });

  const terminal2 = await prisma.terminal.upsert({
    where: { id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a02' },
    update: {},
    create: {
      id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
      name: 'Terminal B - Bulk',
      location: 'Port of Algiers, Dock 2',
      isActive: true,
    },
  });

  const terminal3 = await prisma.terminal.upsert({
    where: { id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a03' },
    update: {},
    create: {
      id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
      name: 'Terminal C - RoRo',
      location: 'Port of Algiers, Dock 3',
      isActive: true,
    },
  });

  console.log('✅ Terminals created');

  // ─── Gates ──────────────────────────────────────────────────────────────
  const gate1 = await prisma.gate.upsert({
    where: { id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a01' },
    update: {},
    create: {
      id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
      terminalId: terminal1.id,
      name: 'Gate A-1 (Entry)',
      isActive: true,
    },
  });

  const gate2 = await prisma.gate.upsert({
    where: { id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a02' },
    update: {},
    create: {
      id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
      terminalId: terminal1.id,
      name: 'Gate A-2 (Exit)',
      isActive: true,
    },
  });

  await prisma.gate.upsert({
    where: { id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a03' },
    update: {},
    create: {
      id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
      terminalId: terminal2.id,
      name: 'Gate B-1 (Entry)',
      isActive: true,
    },
  });

  await prisma.gate.upsert({
    where: { id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a04' },
    update: {},
    create: {
      id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a04',
      terminalId: terminal3.id,
      name: 'Gate C-1 (Entry)',
      isActive: true,
    },
  });

  console.log('✅ Gates created');

  // ─── Time Slots (next 7 days, 2-hour windows) ──────────────────────────
  const terminals = [terminal1, terminal2, terminal3];
  const capacities = [20, 15, 10];
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  for (let day = 0; day < 7; day++) {
    for (let hour = 6; hour < 22; hour += 2) {
      for (let t = 0; t < terminals.length; t++) {
        const startTime = new Date(now);
        startTime.setDate(startTime.getDate() + day);
        startTime.setHours(hour, 0, 0, 0);

        const endTime = new Date(startTime);
        endTime.setHours(hour + 2, 0, 0, 0);

        await prisma.timeSlot.create({
          data: {
            terminalId: terminals[t].id,
            startTime,
            endTime,
            capacity: capacities[t],
          },
        });
      }
    }
  }

  console.log('✅ Time slots created (7 days × 8 windows × 3 terminals)');

  // ─── Trucks ─────────────────────────────────────────────────────────────
  const truck1 = await prisma.truck.upsert({
    where: { plate: 'DZ-1234-A16' },
    update: {},
    create: {
      id: 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
      plate: 'DZ-1234-A16',
      carrierId: carrier1.id,
    },
  });

  const truck2 = await prisma.truck.upsert({
    where: { plate: 'DZ-5678-B09' },
    update: {},
    create: {
      id: 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
      plate: 'DZ-5678-B09',
      carrierId: carrier1.id,
    },
  });

  const truck3 = await prisma.truck.upsert({
    where: { plate: 'DZ-9012-C31' },
    update: {},
    create: {
      id: 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
      plate: 'DZ-9012-C31',
      carrierId: carrier2.id,
    },
  });

  console.log('✅ Trucks created');

  // ─── Containers ─────────────────────────────────────────────────────────
  const container1 = await prisma.container.upsert({
    where: { containerNumber: 'MSKU1234567' },
    update: {},
    create: {
      id: 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
      containerNumber: 'MSKU1234567',
      carrierId: carrier1.id,
    },
  });

  const container2 = await prisma.container.upsert({
    where: { containerNumber: 'TCLU7654321' },
    update: {},
    create: {
      id: 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
      containerNumber: 'TCLU7654321',
      carrierId: carrier2.id,
    },
  });

  console.log('✅ Containers created');

  // ─── Tracking Events ───────────────────────────────────────────────────
  await prisma.trackingEvent.createMany({
    data: [
      {
        containerId: container1.id,
        type: 'IN_TRANSIT',
        location: 'Port of Shanghai',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        containerId: container1.id,
        type: 'ARRIVED',
        location: 'Port of Algiers - Anchorage',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        containerId: container1.id,
        type: 'CUSTOMS_HOLD',
        location: 'Port of Algiers - Customs',
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
      {
        containerId: container1.id,
        type: 'RELEASED',
        location: 'Port of Algiers - Terminal A',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        containerId: container2.id,
        type: 'IN_TRANSIT',
        location: 'Port of Rotterdam',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        containerId: container2.id,
        type: 'ARRIVED',
        location: 'Port of Algiers - Dock 2',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
    ],
  });

  console.log('✅ Tracking events created');

  // ─── Sample Bookings ───────────────────────────────────────────────────
  const futureSlots = await prisma.timeSlot.findMany({
    where: {
      terminalId: terminal1.id,
      startTime: { gt: new Date() },
    },
    orderBy: { startTime: 'asc' },
    take: 3,
  });

  if (futureSlots.length >= 3) {
    await prisma.booking.create({
      data: {
        carrierId: carrier1.id,
        terminalId: terminal1.id,
        timeSlotId: futureSlots[0].id,
        truckId: truck1.id,
        containerId: container1.id,
        status: 'PENDING',
        price: 150.0,
      },
    });

    await prisma.booking.create({
      data: {
        carrierId: carrier1.id,
        terminalId: terminal1.id,
        timeSlotId: futureSlots[1].id,
        truckId: truck2.id,
        containerId: container2.id,
        status: 'CONFIRMED',
        price: 200.0,
        qrToken: 'sample-qr-token-for-demo',
        blockchainHash: 'abc123def456sample',
        validatedAt: new Date(),
      },
    });

    await prisma.booking.create({
      data: {
        carrierId: carrier2.id,
        terminalId: terminal1.id,
        timeSlotId: futureSlots[2].id,
        truckId: truck3.id,
        containerId: container2.id,
        status: 'PENDING',
        price: 175.0,
      },
    });

    console.log('✅ Sample bookings created');
  }

  // ─── Sample Metric Daily ───────────────────────────────────────────────
  for (let day = 0; day < 7; day++) {
    const date = new Date();
    date.setDate(date.getDate() - day);
    date.setHours(0, 0, 0, 0);

    for (const terminal of terminals) {
      await prisma.metricDaily.upsert({
        where: {
          date_terminalId: {
            date,
            terminalId: terminal.id,
          },
        },
        update: {},
        create: {
          date,
          terminalId: terminal.id,
          avgWaitingTime: Math.round((Math.random() * 30 + 10) * 100) / 100,
          totalBookings: Math.floor(Math.random() * 50 + 10),
          revenue: Math.round((Math.random() * 5000 + 1000) * 100) / 100,
        },
      });
    }
  }

  console.log('✅ Daily metrics created');

  // ─── Summary ───────────────────────────────────────────────────────────
  console.log('\n🎉 Seed completed successfully!\n');
  console.log('Test accounts:');
  console.log('  Admin:    admin@portflow.ai       / password123');
  console.log('  Operator: operator@portflow.ai     / password123');
  console.log('  Carrier:  carrier@acme.com         / password123');
  console.log('  Carrier:  driver@fastfreight.com   / password123');
  console.log('  Gate:     gate@portflow.ai          / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
