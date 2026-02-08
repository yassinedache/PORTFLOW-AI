import { BookingService } from './booking.service.js';
import { CreateBookingDto, BookingActionDto } from './dto/create-booking.dto.js';
import type { RequestUser } from '../common/interfaces/jwt-payload.interface.js';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
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
    rescheduleOptions(id: string): Promise<{
        slotId: string;
        startTime: Date;
        endTime: Date;
        availableCapacity: number;
        totalCapacity: number;
    }[]>;
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
    reject(id: string, dto: BookingActionDto): Promise<{
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
}
