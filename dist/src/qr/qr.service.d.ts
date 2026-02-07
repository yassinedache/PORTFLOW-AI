import { ConfigService } from '@nestjs/config';
export declare class QrService {
    private readonly configService;
    private readonly secret;
    constructor(configService: ConfigService);
    generateBookingToken(bookingId: string): string;
    verifyToken(token: string): {
        bookingId: string;
        type: string;
    } | null;
    generateQrDataUrl(token: string): Promise<string>;
    generateQrBuffer(token: string): Promise<Buffer>;
}
