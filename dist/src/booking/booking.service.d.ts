import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';
import { BlockchainService } from '../blockchain/blockchain.service.js';
import { QrService } from '../qr/qr.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { RequestUser } from '../common/interfaces/jwt-payload.interface.js';
export declare class BookingService {
    private readonly prisma;
    private readonly blockchainService;
    private readonly qrService;
    private readonly eventsGateway;
    constructor(prisma: PrismaService, blockchainService: BlockchainService, qrService: QrService, eventsGateway: EventsGateway);
    create(dto: CreateBookingDto, user: RequestUser): Promise<{
        id: string;
        createdAt: Date;
        terminalId: string;
        carrierId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string | null;
        validatedAt: Date | null;
    }>;
    findMyBookings(userId: string): Promise<({
        terminal: {
            id: string;
            name: string;
        };
        timeSlot: {
            startTime: Date;
            endTime: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        terminalId: string;
        carrierId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string | null;
        validatedAt: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        terminal: {
            id: string;
            name: string;
            createdAt: Date;
            location: string;
            isActive: boolean;
        };
        timeSlot: {
            id: string;
            terminalId: string;
            startTime: Date;
            endTime: Date;
            capacity: number;
        };
        container: {
            id: string;
            createdAt: Date;
            carrierId: string;
            containerNumber: string;
        } | null;
        truck: {
            id: string;
            createdAt: Date;
            carrierId: string;
            plate: string;
        } | null;
        carrier: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        terminalId: string;
        carrierId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string | null;
        validatedAt: Date | null;
    }>;
    cancel(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        terminalId: string;
        carrierId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string | null;
        validatedAt: Date | null;
    }>;
    approve(id: string): Promise<{
        qrDataUrl: string;
        id: string;
        createdAt: Date;
        terminalId: string;
        carrierId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string | null;
        validatedAt: Date | null;
    }>;
    reject(id: string, reason?: string): Promise<{
        rejectionReason: string | undefined;
        id: string;
        createdAt: Date;
        terminalId: string;
        carrierId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string | null;
        validatedAt: Date | null;
    }>;
    getOperatorQueue(terminalId?: string): Promise<({
        terminal: {
            id: string;
            name: string;
        };
        timeSlot: {
            startTime: Date;
            endTime: Date;
        };
        truck: {
            plate: string;
        } | null;
        carrier: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        terminalId: string;
        carrierId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string | null;
        validatedAt: Date | null;
    })[]>;
}
