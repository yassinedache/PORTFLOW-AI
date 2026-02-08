var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BlockchainService_1;
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import { PrismaService } from '../prisma/prisma.service.js';
let BlockchainService = BlockchainService_1 = class BlockchainService {
    configService;
    prisma;
    logger = new Logger(BlockchainService_1.name);
    enabled;
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
        this.enabled =
            this.configService.get('BLOCKCHAIN_ENABLED', 'false') === 'true';
    }
    async storeProof(payload) {
        const serialized = JSON.stringify(payload, Object.keys(payload).sort());
        const hash = createHash('sha256').update(serialized).digest('hex');
        if (this.enabled) {
            this.logger.log(`Blockchain proof stored: ${hash}`);
        }
        return hash;
    }
    verifyProof(payload, hash) {
        const serialized = JSON.stringify(payload, Object.keys(payload).sort());
        const computedHash = createHash('sha256').update(serialized).digest('hex');
        return computedHash === hash;
    }
    async hashBooking(payload) {
        return this.storeProof(payload);
    }
    async verifyHash(payload, expectedHash) {
        return this.verifyProof(payload, expectedHash);
    }
    async createProof(entityType, entityId, payload) {
        const hash = await this.storeProof(payload);
        const payloadHash = createHash('sha256')
            .update(JSON.stringify(payload))
            .digest('hex');
        const proof = await this.prisma.blockchainProof.create({
            data: {
                entityType,
                entityId,
                hash,
                payloadHash,
            },
        });
        return proof;
    }
    async verifyEntityProof(entityType, entityId) {
        const proofs = await this.prisma.blockchainProof.findMany({
            where: { entityType, entityId },
            orderBy: { createdAt: 'desc' },
        });
        if (proofs.length === 0) {
            throw new NotFoundException(`No blockchain proof found for ${entityType} ${entityId}`);
        }
        const latestProof = proofs[0];
        let payload = null;
        if (entityType === 'BOOKING') {
            const booking = await this.prisma.booking.findUnique({
                where: { id: entityId },
            });
            if (!booking)
                throw new NotFoundException('Booking not found');
            payload = {
                bookingId: booking.id,
                carrierId: booking.carrierId,
                terminalId: booking.terminalId,
                timeSlotId: booking.timeSlotId,
            };
        }
        else if (entityType === 'READINESS') {
            const proof = await this.prisma.readinessProof.findFirst({
                where: { bookingId: entityId },
                include: { booking: true },
                orderBy: { confirmedAt: 'desc' },
            });
            if (!proof)
                throw new NotFoundException('Readiness proof not found');
            payload = {
                bookingId: proof.bookingId,
                carrierId: proof.booking.carrierId,
                terminalId: proof.booking.terminalId,
                timeSlotId: proof.booking.timeSlotId,
            };
        }
        if (!payload) {
            return {
                entityType,
                entityId,
                status: 'INVALID',
                reason: `Unknown entity type: ${entityType}`,
            };
        }
        const isValid = this.verifyProof(payload, latestProof.hash);
        return {
            entityType,
            entityId,
            proofId: latestProof.id,
            hash: latestProof.hash,
            status: isValid ? 'VALID' : 'INVALID',
            verifiedAt: new Date().toISOString(),
            createdAt: latestProof.createdAt,
        };
    }
    async getProofHistory(entityId) {
        const proofs = await this.prisma.blockchainProof.findMany({
            where: { entityId },
            orderBy: { createdAt: 'desc' },
        });
        if (proofs.length === 0) {
            throw new NotFoundException(`No blockchain proofs found for entity ${entityId}`);
        }
        return {
            entityId,
            totalProofs: proofs.length,
            proofs: proofs.map((p) => ({
                id: p.id,
                entityType: p.entityType,
                hash: p.hash,
                payloadHash: p.payloadHash,
                createdAt: p.createdAt,
            })),
        };
    }
};
BlockchainService = BlockchainService_1 = __decorate([
    Injectable(),
    __param(0, Inject(ConfigService)),
    __metadata("design:paramtypes", [ConfigService,
        PrismaService])
], BlockchainService);
export { BlockchainService };
//# sourceMappingURL=blockchain.service.js.map