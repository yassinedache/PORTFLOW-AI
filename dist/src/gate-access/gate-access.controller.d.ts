import { GateAccessService } from './gate-access.service.js';
import { ScanQrDto } from './dto/scan.dto.js';
export declare class GateAccessController {
    private readonly gateAccessService;
    constructor(gateAccessService: GateAccessService);
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
}
