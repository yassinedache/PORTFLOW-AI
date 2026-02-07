import { SlotsService } from './slots.service.js';
import { CreateTimeSlotDto } from './dto/create-slot.dto.js';
export declare class SlotsController {
    private readonly slotsService;
    constructor(slotsService: SlotsService);
    create(dto: CreateTimeSlotDto): Promise<{
        id: string;
        terminalId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
    }>;
    createBulk(dtos: CreateTimeSlotDto[]): Promise<{
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
}
