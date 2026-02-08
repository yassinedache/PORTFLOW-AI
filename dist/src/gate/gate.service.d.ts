import { PrismaService } from '../prisma/prisma.service.js';
import { CreateGateDto, UpdateGateDto } from './dto/create-gate.dto.js';
export declare class GateService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateGateDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        terminalId: string;
    }>;
    findAll(): Promise<({
        terminal: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        isActive: boolean;
        terminalId: string;
    })[]>;
    findOne(id: string): Promise<{
        terminal: {
            id: string;
            createdAt: Date;
            name: string;
            location: string;
            isActive: boolean;
        };
    } & {
        id: string;
        name: string;
        isActive: boolean;
        terminalId: string;
    }>;
    update(id: string, dto: UpdateGateDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        terminalId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        terminalId: string;
    }>;
}
