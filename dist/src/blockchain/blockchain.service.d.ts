import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class BlockchainService {
    private readonly configService;
    private readonly prisma;
    private readonly logger;
    private readonly enabled;
    constructor(configService: ConfigService, prisma: PrismaService);
    storeProof(payload: Record<string, any>): Promise<string>;
    verifyProof(payload: Record<string, any>, hash: string): boolean;
    hashBooking(payload: Record<string, any>): Promise<string>;
    verifyHash(payload: Record<string, any>, expectedHash: string): Promise<boolean>;
    createProof(entityType: 'BOOKING' | 'READINESS', entityId: string, payload: Record<string, any>): Promise<{
        id: string;
        createdAt: Date;
        entityId: string;
        entityType: string;
        hash: string;
        payloadHash: string;
    }>;
    verifyEntityProof(entityType: string, entityId: string): Promise<{
        entityType: string;
        entityId: string;
        status: string;
        reason: string;
        proofId?: undefined;
        hash?: undefined;
        verifiedAt?: undefined;
        createdAt?: undefined;
    } | {
        entityType: string;
        entityId: string;
        proofId: string;
        hash: string;
        status: string;
        verifiedAt: string;
        createdAt: Date;
        reason?: undefined;
    }>;
    getProofHistory(entityId: string): Promise<{
        entityId: string;
        totalProofs: number;
        proofs: {
            id: string;
            entityType: string;
            hash: string;
            payloadHash: string;
            createdAt: Date;
        }[];
    }>;
}
