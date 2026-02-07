import { PrismaService } from '../prisma/prisma.service.js';
import { EventsGateway } from '../events/events.gateway.js';
import { CapacityOverrideDto } from './dto/capacity-override.dto.js';
export declare class OperatorService {
    private readonly prisma;
    private readonly eventsGateway;
    constructor(prisma: PrismaService, eventsGateway: EventsGateway);
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
            bookingId: string;
            gateId: string;
            result: import("../../generated/prisma/enums.js").GateAccessResult;
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
}
