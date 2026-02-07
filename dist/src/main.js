import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IoAdapter } from '@nestjs/platform-socket.io';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
async function bootstrap() {
    const logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-CSRF-Token',
            'X-XSRF-Token',
            'X-Idempotency-Key',
        ],
    });
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useWebSocketAdapter(new IoAdapter(app));
    const config = new DocumentBuilder()
        .setTitle('PORTFLOW AI')
        .setDescription('AI-Enhanced Truck Booking & Port Access Control Backend API')
        .setVersion('1.0.0')
        .addBearerAuth()
        .addCookieAuth('access_token')
        .addTag('Authentication', 'JWT-based auth with refresh tokens')
        .addTag('Public', 'Public endpoints (no auth required)')
        .addTag('Slots & Availability', 'Time slot management and availability')
        .addTag('Bookings', 'Carrier booking lifecycle')
        .addTag('Gate Access', 'QR-based gate scanning')
        .addTag('AI Assistant', 'LLM-powered AI assistant')
        .addTag('Operator Control Room', 'Operator queue and alerts')
        .addTag('OCR / Smart Booking', 'Bill of Lading OCR')
        .addTag('Admin - Terminals', 'Terminal management')
        .addTag('Admin - Gates', 'Gate management')
        .addTag('Admin - Audit & Analytics', 'Audit logs and analytics')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`🚀 PORTFLOW AI API running on http://localhost:${port}`);
    logger.log(`📚 Swagger docs at http://localhost:${port}/api/docs`);
    logger.log(`🔌 WebSocket server running on ws://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map