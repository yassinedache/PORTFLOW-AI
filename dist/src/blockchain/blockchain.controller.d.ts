import { BlockchainService } from './blockchain.service.js';
export declare class BlockchainController {
    private readonly blockchainService;
    constructor(blockchainService: BlockchainService);
    createProof(body: {
        entityType: 'BOOKING' | 'READINESS';
        entityId: string;
        payload: Record<string, any>;
    }): Promise<{
        id: string;
        createdAt: Date;
        entityId: string;
        entityType: string;
        hash: string;
        payloadHash: string;
    }>;
    verifyProof(entityType: string, entityId: string): Promise<{
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
