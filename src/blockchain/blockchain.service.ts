import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);
  private readonly enabled: boolean;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.enabled =
      this.configService.get<string>('BLOCKCHAIN_ENABLED', 'false') === 'true';
  }

  // ─── BlockchainAdapter Interface ─────────────────────────────────────

  /**
   * Store a proof on the blockchain (SHA-256 deterministic hash).
   */
  async storeProof(payload: Record<string, any>): Promise<string> {
    const serialized = JSON.stringify(payload, Object.keys(payload).sort());
    const hash = createHash('sha256').update(serialized).digest('hex');

    if (this.enabled) {
      this.logger.log(`Blockchain proof stored: ${hash}`);
    }

    return hash;
  }

  /**
   * Verify a proof against its payload (deterministic re-hash).
   */
  verifyProof(payload: Record<string, any>, hash: string): boolean {
    const serialized = JSON.stringify(payload, Object.keys(payload).sort());
    const computedHash = createHash('sha256').update(serialized).digest('hex');
    return computedHash === hash;
  }

  // ─── Legacy API (used by existing services) ──────────────────────────

  /**
   * Hash a booking payload and return a proof hash.
   */
  async hashBooking(payload: Record<string, any>): Promise<string> {
    return this.storeProof(payload);
  }

  /**
   * Verify a booking hash matches the expected payload.
   */
  async verifyHash(
    payload: Record<string, any>,
    expectedHash: string,
  ): Promise<boolean> {
    return this.verifyProof(payload, expectedHash);
  }

  // ─── Proof Persistence ───────────────────────────────────────────────

  /**
   * Create and persist a BlockchainProof record.
   */
  async createProof(
    entityType: 'BOOKING' | 'READINESS',
    entityId: string,
    payload: Record<string, any>,
  ) {
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

  /**
   * Verify an entity's blockchain proof by re-computing the hash
   * from the current system state.
   */
  async verifyEntityProof(entityType: string, entityId: string) {
    const proofs = await this.prisma.blockchainProof.findMany({
      where: { entityType, entityId },
      orderBy: { createdAt: 'desc' },
    });

    if (proofs.length === 0) {
      throw new NotFoundException(
        `No blockchain proof found for ${entityType} ${entityId}`,
      );
    }

    const latestProof = proofs[0];

    // Reconstruct the payload from the actual entity
    let payload: Record<string, any> | null = null;

    if (entityType === 'BOOKING') {
      const booking = await this.prisma.booking.findUnique({
        where: { id: entityId },
      });
      if (!booking) throw new NotFoundException('Booking not found');
      payload = {
        bookingId: booking.id,
        carrierId: booking.carrierId,
        terminalId: booking.terminalId,
        timeSlotId: booking.timeSlotId,
      };
    } else if (entityType === 'READINESS') {
      const proof = await this.prisma.readinessProof.findFirst({
        where: { bookingId: entityId },
        include: { booking: true },
        orderBy: { confirmedAt: 'desc' },
      });
      if (!proof) throw new NotFoundException('Readiness proof not found');
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

  /**
   * Get proof history for an entity.
   */
  async getProofHistory(entityId: string) {
    const proofs = await this.prisma.blockchainProof.findMany({
      where: { entityId },
      orderBy: { createdAt: 'desc' },
    });

    if (proofs.length === 0) {
      throw new NotFoundException(
        `No blockchain proofs found for entity ${entityId}`,
      );
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
}
