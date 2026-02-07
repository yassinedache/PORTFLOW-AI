import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);
  private readonly enabled: boolean;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.enabled =
      this.configService.get<string>('BLOCKCHAIN_ENABLED', 'false') === 'true';
  }

  /**
   * Hash a booking payload and return a proof hash.
   * In production, this would submit to a blockchain network.
   * For MVP, we use SHA-256 hash as proof of record.
   */
  async hashBooking(payload: Record<string, any>): Promise<string> {
    const serialized = JSON.stringify(payload, Object.keys(payload).sort());

    const hash = createHash('sha256').update(serialized).digest('hex');

    if (this.enabled) {
      // In production: submit hash to blockchain
      this.logger.log(`Blockchain hash submitted: ${hash}`);
    }

    return hash;
  }

  /**
   * Verify a booking hash matches the expected payload.
   */
  async verifyHash(
    payload: Record<string, any>,
    expectedHash: string,
  ): Promise<boolean> {
    const serialized = JSON.stringify(payload, Object.keys(payload).sort());
    const hash = createHash('sha256').update(serialized).digest('hex');
    return hash === expectedHash;
  }
}
