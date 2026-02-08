import { PrismaService } from '../prisma/prisma.service.js';
export declare class MonetizationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSlotPricing(slotId: string): Promise<{
        slotId: string;
        terminalId: string;
        terminalName: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
        booked: number;
        utilizationPct: number;
        congestionLevel: string;
        basePrice: number;
        multiplier: number;
        finalPrice: number;
        isEcoSlot: boolean;
        reason: string;
        pricingId: string;
        computedAt: Date;
    }>;
    enablePriority(bookingId: string, level?: string): Promise<{
        aiExplanation: string;
        id: string;
        createdAt: Date;
        bookingId: string;
        level: string;
        fee: number;
    }>;
    applyPenalty(bookingId: string, type: string, customAmount?: number, minutesLate?: number): Promise<{
        aiExplanation: string;
        type: string;
        id: string;
        reason: string | null;
        bookingId: string;
        amount: number;
        appliedAt: Date;
    }>;
    getCharges(bookingId: string): Promise<{
        bookingId: string;
        terminalName: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        breakdown: {
            basePrice: number;
            pricingMultiplier: number;
            slotPrice: number;
            isEcoSlot: boolean;
            pricingReason: string;
            priorityAccess: {
                level: string;
                fee: number;
            } | null;
            penalties: {
                id: string;
                type: string;
                amount: number;
                reason: string | null;
                appliedAt: Date;
            }[];
            totalPenalties: number;
        };
        totalCharges: number;
        computedAt: string;
    }>;
}
