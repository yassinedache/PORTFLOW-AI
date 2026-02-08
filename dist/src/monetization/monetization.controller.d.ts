import { MonetizationService } from './monetization.service.js';
import { EnablePriorityDto, ApplyPenaltyDto } from './dto/monetization.dto.js';
export declare class MonetizationController {
    private readonly monetizationService;
    constructor(monetizationService: MonetizationService);
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
    enablePriority(bookingId: string, dto: EnablePriorityDto): Promise<{
        aiExplanation: string;
        id: string;
        createdAt: Date;
        bookingId: string;
        level: string;
        fee: number;
    }>;
    getAllPenalties(): Promise<({
        booking: {
            container: {
                containerNumber: string;
            };
            truck: {
                plate: string;
            } | null;
            id: string;
            status: import("../../generated/prisma/enums.js").BookingStatus;
            carrier: {
                email: string;
            };
        };
    } & {
        type: string;
        id: string;
        reason: string | null;
        bookingId: string;
        amount: number;
        appliedAt: Date;
    })[]>;
    applyPenalty(bookingId: string, dto: ApplyPenaltyDto): Promise<{
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
        slotCost: number;
        ecoDiscount: number;
        priorityFee: number;
        penalties: number;
        total: number;
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
