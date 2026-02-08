import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';
import { BlockchainService } from '../blockchain/blockchain.service.js';
import { QrService } from '../qr/qr.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { NotificationService } from '../notification/notification.service.js';
import { RequestUser } from '../common/interfaces/jwt-payload.interface.js';
export declare class BookingService {
    private readonly prisma;
    private readonly blockchainService;
    private readonly qrService;
    private readonly eventsGateway;
    private readonly notificationService;
    constructor(prisma: PrismaService, blockchainService: BlockchainService, qrService: QrService, eventsGateway: EventsGateway, notificationService: NotificationService);
    create(dto: CreateBookingDto, user: RequestUser): Promise<{
        id: string;
        createdAt: Date;
        carrierId: string;
        terminalId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string;
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
        carrierId: string;
        terminalId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string;
        validatedAt: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        carrier: {
            id: string;
            email: string;
        };
        terminal: {
            id: string;
            createdAt: Date;
            name: string;
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
        truck: {
            id: string;
            createdAt: Date;
            carrierId: string;
            plate: string;
        } | null;
        container: {
            id: string;
            createdAt: Date;
            carrierId: string;
            terminalId: string | null;
            status: import("../../generated/prisma/enums.js").ContainerStatus;
            containerNumber: string;
            lastUpdatedAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        carrierId: string;
        terminalId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string;
        validatedAt: Date | null;
    }>;
    cancel(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        carrierId: string;
        terminalId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string;
        validatedAt: Date | null;
    }>;
    approve(id: string): Promise<{
        qrDataUrl: string;
        id: string;
        createdAt: Date;
        carrierId: string;
        terminalId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string;
        validatedAt: Date | null;
    }>;
    reject(id: string, reason?: string): Promise<{
        rejectionReason: string | undefined;
        id: string;
        createdAt: Date;
        carrierId: string;
        terminalId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string;
        validatedAt: Date | null;
    }>;
    rescheduleOptions(id: string): Promise<{
        slotId: string;
        startTime: Date;
        endTime: Date;
        availableCapacity: number;
        totalCapacity: number;
    }[]>;
    getOperatorQueue(terminalId?: string): Promise<({
        carrier: {
            id: string;
            email: string;
        };
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
    } & {
        id: string;
        createdAt: Date;
        carrierId: string;
        terminalId: string;
        timeSlotId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string;
        validatedAt: Date | null;
    })[]>;
}
