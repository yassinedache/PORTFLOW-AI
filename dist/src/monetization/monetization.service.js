var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, BadRequestException, ConflictException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let MonetizationService = class MonetizationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSlotPricing(slotId) {
        const slot = await this.prisma.timeSlot.findUnique({
            where: { id: slotId },
            include: {
                terminal: { select: { id: true, name: true } },
                _count: {
                    select: {
                        bookings: {
                            where: {
                                status: { in: ['PENDING', 'CONFIRMED', 'READY_TO_GO'] },
                            },
                        },
                    },
                },
            },
        });
        if (!slot)
            throw new NotFoundException('Time slot not found');
        const basePrice = 100;
        const utilization = slot.capacity > 0 ? slot._count.bookings / slot.capacity : 0;
        const utilizationPct = Math.round(utilization * 100);
        let multiplier;
        let congestionLevel;
        if (utilizationPct < 30) {
            multiplier = 0.8;
            congestionLevel = 'LOW';
        }
        else if (utilizationPct < 70) {
            multiplier = 1.0;
            congestionLevel = 'NORMAL';
        }
        else if (utilizationPct < 90) {
            multiplier = 1.3;
            congestionLevel = 'HIGH';
        }
        else {
            multiplier = 1.5;
            congestionLevel = 'PEAK';
        }
        const hour = new Date(slot.startTime).getUTCHours();
        const isEcoSlot = hour < 8 || hour >= 18;
        if (isEcoSlot) {
            multiplier = Math.round(multiplier * 0.8 * 100) / 100;
        }
        const finalPrice = Math.round(basePrice * multiplier * 100) / 100;
        const reasons = [];
        reasons.push(`Congestion: ${congestionLevel} (${utilizationPct}% utilization)`);
        if (isEcoSlot) {
            reasons.push('Eco-slot discount applied (−20%): off-peak hours');
        }
        if (congestionLevel === 'LOW') {
            reasons.push('Low demand discount applied');
        }
        else if (congestionLevel === 'HIGH' || congestionLevel === 'PEAK') {
            reasons.push('High demand surcharge applied. Off-peak slots are available at lower cost.');
        }
        const reason = reasons.join('. ');
        const pricing = await this.prisma.slotPricing.create({
            data: {
                slotId,
                basePrice,
                multiplier,
                finalPrice,
                reason,
                isEcoSlot,
            },
        });
        return {
            slotId,
            terminalId: slot.terminalId,
            terminalName: slot.terminal.name,
            startTime: slot.startTime,
            endTime: slot.endTime,
            capacity: slot.capacity,
            booked: slot._count.bookings,
            utilizationPct,
            congestionLevel,
            basePrice,
            multiplier,
            finalPrice,
            isEcoSlot,
            reason,
            pricingId: pricing.id,
            computedAt: pricing.computedAt,
        };
    }
    async enablePriority(bookingId, level = 'PRIORITY') {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: { priorityAccess: true },
        });
        if (!booking)
            throw new NotFoundException('Booking not found');
        if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
            throw new BadRequestException(`Cannot enable priority for booking with status: ${booking.status}`);
        }
        if (booking.priorityAccess) {
            throw new ConflictException('Priority access already enabled for this booking');
        }
        const fee = level === 'PRIORITY' ? 30 : 0;
        const priority = await this.prisma.priorityAccess.create({
            data: {
                bookingId,
                level,
                fee,
            },
        });
        return {
            ...priority,
            aiExplanation: level === 'PRIORITY'
                ? 'Priority access enabled. Your booking is protected from auto-reschedule and will receive faster gate processing.'
                : 'Standard access level. No additional fee.',
        };
    }
    async applyPenalty(bookingId, type, customAmount, minutesLate) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking)
            throw new NotFoundException('Booking not found');
        const bookingPrice = booking.price || 100;
        let amount;
        let reason;
        if (customAmount !== undefined) {
            amount = customAmount;
            reason = `Custom penalty: ${amount} units`;
        }
        else if (type === 'NO_SHOW') {
            amount = Math.round(bookingPrice * 0.5 * 100) / 100;
            reason = `No-show penalty: 50% of booking price (${bookingPrice})`;
        }
        else if (type === 'LATE') {
            const mins = minutesLate || 0;
            if (mins > 30) {
                amount = Math.round(bookingPrice * 0.4 * 100) / 100;
                reason = `Late arrival penalty (${mins} min late): 40% of booking price`;
            }
            else if (mins > 15) {
                amount = Math.round(bookingPrice * 0.2 * 100) / 100;
                reason = `Late arrival penalty (${mins} min late): 20% of booking price`;
            }
            else {
                amount = 0;
                reason = 'Arrival within acceptable window — no penalty';
            }
        }
        else {
            throw new BadRequestException(`Invalid penalty type: ${type}`);
        }
        const penalty = await this.prisma.penalty.create({
            data: {
                bookingId,
                type,
                amount,
                reason,
            },
        });
        return {
            ...penalty,
            aiExplanation: type === 'NO_SHOW'
                ? 'Penalty applied because the booking was not used while the container was ready.'
                : amount > 0
                    ? `Penalty applied for late arrival. Arriving on time avoids penalties.`
                    : 'No penalty — arrival was within the acceptable window.',
        };
    }
    async getCharges(bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                timeSlot: true,
                priorityAccess: true,
                penalties: { orderBy: { appliedAt: 'desc' } },
                terminal: { select: { name: true } },
            },
        });
        if (!booking)
            throw new NotFoundException('Booking not found');
        const latestPricing = await this.prisma.slotPricing.findFirst({
            where: { slotId: booking.timeSlotId },
            orderBy: { computedAt: 'desc' },
        });
        const basePrice = booking.price || latestPricing?.basePrice || 100;
        const pricingMultiplier = latestPricing?.multiplier || 1.0;
        const slotPrice = latestPricing?.finalPrice || basePrice;
        const priorityFee = booking.priorityAccess?.fee || 0;
        const totalPenalties = booking.penalties.reduce((sum, p) => sum + p.amount, 0);
        const isEcoSlot = latestPricing?.isEcoSlot || false;
        const totalCharges = Math.round((slotPrice + priorityFee + totalPenalties) * 100) / 100;
        return {
            bookingId,
            terminalName: booking.terminal.name,
            status: booking.status,
            breakdown: {
                basePrice,
                pricingMultiplier,
                slotPrice,
                isEcoSlot,
                pricingReason: latestPricing?.reason || 'No dynamic pricing computed',
                priorityAccess: booking.priorityAccess
                    ? { level: booking.priorityAccess.level, fee: priorityFee }
                    : null,
                penalties: booking.penalties.map((p) => ({
                    id: p.id,
                    type: p.type,
                    amount: p.amount,
                    reason: p.reason,
                    appliedAt: p.appliedAt,
                })),
                totalPenalties,
            },
            totalCharges,
            computedAt: new Date().toISOString(),
        };
    }
};
MonetizationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], MonetizationService);
export { MonetizationService };
//# sourceMappingURL=monetization.service.js.map