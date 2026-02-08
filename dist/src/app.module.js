var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { MonetizationModule } from './monetization/monetization.module.js';
import { NotificationModule } from './notification/notification.module.js';
import { AppController } from './app.controller.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            ThrottlerModule.forRoot([
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 10,
                },
                {
                    name: 'medium',
                    ttl: 60000,
                    limit: 100,
                },
                {
                    name: 'long',
                    ttl: 3600000,
                    limit: 1000,
                },
            ]),
            PrismaModule,
            AuthModule,
            EventsModule,
            QrModule,
            BlockchainModule,
            TerminalModule,
            GateModule,
            SlotsModule,
            BookingModule,
            GateAccessModule,
            CarrierModule,
            ZoneModule,
            MonetizationModule,
            AiModule,
            OcrModule,
            PublicModule,
            OperatorModule,
            AuditModule,
            NotificationModule,
        ],
        controllers: [AppController],
        providers: [
            {
                provide: APP_GUARD,
                useClass: JwtAuthGuard,
            },
            {
                provide: APP_GUARD,
                useClass: RolesGuard,
            },
            {
                provide: APP_GUARD,
                useClass: CsrfGuard,
            },
            {
                provide: APP_GUARD,
                useClass: ThrottlerGuard,
            },
            {
                provide: APP_INTERCEPTOR,
                useClass: AuditInterceptor,
            },
        ],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map