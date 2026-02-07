import { ConfigService } from '@nestjs/config';
export declare class BlockchainService {
    private readonly configService;
    private readonly logger;
    private readonly enabled;
    constructor(configService: ConfigService);
    hashBooking(payload: Record<string, any>): Promise<string>;
    verifyHash(payload: Record<string, any>, expectedHash: string): Promise<boolean>;
}
