import { PrismaService } from '../prisma/prisma.service.js';
import { CreateTimeSlotDto } from './dto/create-slot.dto.js';
export declare class SlotsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTimeSlotDto): Promise<{
        id: string;
        terminalId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
    }>;
    createBulk(slots: CreateTimeSlotDto[]): Promise<{
        id: string;
        terminalId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
    }[]>;
    getAvailability(terminalId?: string, date?: string): Promise<{
        id: string;
        terminalId: string;
        terminalName: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
        booked: number;
        available: number;
    }[]>;
    getHeatmap(terminalId?: string): Promise<{
        slotId: string;
        terminalId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
        booked: number;
        utilization: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        terminalId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
    }>;
}
