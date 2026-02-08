import { PrismaService } from '../prisma/prisma.service.js';
import { QrService } from '../qr/qr.service.js';
import { BlockchainService } from '../blockchain/blockchain.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { ScanQrDto } from './dto/scan.dto.js';
export declare class GateAccessService {
    private readonly prisma;
    private readonly qrService;
    private readonly blockchainService;
    private readonly eventsGateway;
    private readonly logger;
    constructor(prisma: PrismaService, qrService: QrService, blockchainService: BlockchainService, eventsGateway: EventsGateway);
    scan(dto: ScanQrDto): Promise<({
        gate: {
            id: string;
            name: string;
        };
        booking: {
            id: string;
            carrierId: string;
            status: import("../../generated/prisma/enums.js").BookingStatus;
        };
    } & {
        id: string;
        result: import("../../generated/prisma/enums.js").GateAccessResult;
        reason: string | null;
        bookingId: string;
        gateId: string;
        scannedAt: Date;
    }) | {
        result: "ALLOWED" | "DENIED";
        reason: string;
        gateId: string;
        scannedAt: Date;
    }>;
    private createLog;
}
