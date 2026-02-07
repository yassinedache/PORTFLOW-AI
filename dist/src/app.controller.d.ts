import { PrismaService } from './prisma/prisma.service.js';
export declare class AppController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    healthCheck(): Promise<{
        status: string;
        service: string;
        version: string;
        timestamp: string;
        database: string;
    }>;
}
