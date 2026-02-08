import { PrismaService } from '../prisma/prisma.service.js';
import { BlockchainService } from '../blockchain/blockchain.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { CapacityOverrideDto } from './dto/capacity-override.dto.js';
export declare class OperatorService {
    private readonly prisma;
    private readonly blockchainService;
    private readonly eventsGateway;
    constructor(prisma: PrismaService, blockchainService: BlockchainService, eventsGateway: EventsGateway);
    getQueue(terminalId?: string): Promise<({
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
    })[]>;
    overrideCapacity(dto: CapacityOverrideDto): Promise<{
        id: string;
        terminalId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
    }>;
    getAlerts(terminalId?: string): Promise<{
        denials: ({
            gate: {
                name: string;
                terminalId: string;
            };
            booking: {
                id: string;
                carrierId: string;
            };
        } & {
            id: string;
            result: import("../../generated/prisma/enums.js").GateAccessResult;
            reason: string | null;
            bookingId: string;
            gateId: string;
            scannedAt: Date;
        })[];
        capacityAlerts: {
            type: string;
            slotId: string;
            terminal: string;
            startTime: Date;
            booked: number;
            capacity: number;
            utilization: number;
        }[];
    }>;
    private static readonly VALID_TRANSITIONS;
    updateContainerStatus(containerId: string, newStatus: string): Promise<{
        id: string;
        createdAt: Date;
        terminalId: string | null;
        carrierId: string;
        status: import("../../generated/prisma/enums.js").ContainerStatus;
        containerNumber: string;
        lastUpdatedAt: Date | null;
    }>;
    confirmReadiness(bookingId: string, userId?: string): Promise<{
        terminal: {
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
    }>;
}
