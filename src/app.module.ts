import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard.js';
import { RolesGuard } from './common/guards/roles.guard.js';
import { CsrfGuard } from './common/guards/csrf.guard.js';
import { AuditInterceptor } from './common/interceptors/audit.interceptor.js';

import { TerminalModule } from './terminal/terminal.module.js';
import { GateModule } from './gate/gate.module.js';
import { SlotsModule } from './slots/slots.module.js';
import { BookingModule } from './booking/booking.module.js';
import { GateAccessModule } from './gate-access/gate-access.module.js';
import { EventsModule } from './events/events.module.js';
import { QrModule } from './qr/qr.module.js';
import { BlockchainModule } from './blockchain/blockchain.module.js';
import { AiModule } from './ai/ai.module.js';
import { OcrModule } from './ocr/ocr.module.js';
import { PublicModule } from './public/public.module.js';
import { OperatorModule } from './operator/operator.module.js';
import { AuditModule } from './audit/audit.module.js';
import { CarrierModule } from './carrier/carrier.module.js';
import { ZoneModule } from './zone/zone.module.js';
import { AppController } from './app.controller.js';

@Module({
  imports: [
    // ─── Configuration ────────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // ─── Rate Limiting ────────────────────────────────────────────────
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,   // 1 second
        limit: 10,   // 10 requests per second
      },
      {
        name: 'medium',
        ttl: 60000,  // 1 minute
        limit: 100,  // 100 requests per minute
      },
      {
        name: 'long',
        ttl: 3600000, // 1 hour
        limit: 1000,  // 1000 requests per hour
      },
    ]),

    // ─── Core ─────────────────────────────────────────────────────────
    PrismaModule,
    AuthModule,
    EventsModule,
    QrModule,
    BlockchainModule,

    // ─── Domain Modules ───────────────────────────────────────────────
    TerminalModule,
    GateModule,
    SlotsModule,
    BookingModule,
    GateAccessModule,
    CarrierModule,
    ZoneModule,

    // ─── Intelligence ─────────────────────────────────────────────────
    AiModule,
    OcrModule,

    // ─── Public & Operational ─────────────────────────────────────────
    PublicModule,
    OperatorModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [
    // Global JWT Authentication Guard
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Global RBAC Guard
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // Global CSRF Guard
    {
      provide: APP_GUARD,
      useClass: CsrfGuard,
    },
    // Global Rate Limiting Guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // Global Audit Interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule {}
