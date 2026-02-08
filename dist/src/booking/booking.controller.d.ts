import { BookingService } from './booking.service.js';
import { CreateBookingDto, BookingActionDto } from './dto/create-booking.dto.js';
import type { RequestUser } from '../common/interfaces/jwt-payload.interface.js';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    create(dto: CreateBookingDto, user: RequestUser): Promise<{
        id: string;
        createdAt: Date;
        terminalId: string;
        timeSlotId: string;
        truckId: string | null;
        containerId: string;
        idempotencyKey: string | null;
        price: number | null;
        carrierId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
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
        timeSlotId: string;
        truckId: string | null;
        containerId: string;
        idempotencyKey: string | null;
        price: number | null;
        carrierId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
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
        container: {
            id: string;
            createdAt: Date;
            terminalId: string | null;
            carrierId: string;
            status: import("../../generated/prisma/enums.js").ContainerStatus;
            containerNumber: string;
            lastUpdatedAt: Date | null;
        };
        truck: {
            id: string;
            createdAt: Date;
            carrierId: string;
            plate: string;
        } | null;
        carrier: {
            email: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        terminalId: string;
        timeSlotId: string;
        truckId: string | null;
        containerId: string;
        idempotencyKey: string | null;
        price: number | null;
        carrierId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        validatedAt: Date | null;
    }>;
    cancel(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        terminalId: string;
        timeSlotId: string;
        truckId: string | null;
        containerId: string;
        idempotencyKey: string | null;
        price: number | null;
        carrierId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        validatedAt: Date | null;
    }>;
    approve(id: string): Promise<{
        qrDataUrl: string;
        id: string;
        createdAt: Date;
        terminalId: string;
        timeSlotId: string;
        truckId: string | null;
        containerId: string;
        idempotencyKey: string | null;
        price: number | null;
        carrierId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        validatedAt: Date | null;
    }>;
    reject(id: string, dto: BookingActionDto): Promise<{
        rejectionReason: string | undefined;
        id: string;
        createdAt: Date;
        terminalId: string;
        timeSlotId: string;
        truckId: string | null;
        containerId: string;
        idempotencyKey: string | null;
        price: number | null;
        carrierId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        readinessScore: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        validatedAt: Date | null;
    }>;
}
