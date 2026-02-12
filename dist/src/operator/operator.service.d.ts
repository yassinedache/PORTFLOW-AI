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
        createdAt: Date;
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
            booking: {
                id: string;
                carrierId: string;
            };
            gate: {
                terminalId: string;
                name: string;
            };
        } & {
            result: import("../../generated/prisma/enums.js").GateAccessResult;
            id: string;
            bookingId: string;
            gateId: string;
            reason: string | null;
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
        carrierId: string;
        terminalId: string | null;
        status: import("../../generated/prisma/enums.js").ContainerStatus;
        createdAt: Date;
        containerNumber: string;
        lastUpdatedAt: Date | null;
    }>;
    confirmReadiness(bookingId: string, userId?: string): Promise<{
        warning?: string | undefined;
        readinessStatus: string;
        confirmedAt: string;
        terminal: {
            name: string;
        };
        timeSlot: {
            startTime: Date;
            endTime: Date;
        };
        id: string;
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
        createdAt: Date;
        validatedAt: Date | null;
    }>;
}
