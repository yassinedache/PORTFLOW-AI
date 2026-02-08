var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsUUID, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateBookingDto {
    terminalId;
    timeSlotId;
    truckId;
    containerId;
    idempotencyKey;
    price;
}
__decorate([
    ApiProperty({ description: 'Terminal ID' }),
    IsUUID(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "terminalId", void 0);
__decorate([
    ApiProperty({ description: 'Time Slot ID' }),
    IsUUID(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "timeSlotId", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Truck ID' }),
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "truckId", void 0);
__decorate([
    ApiProperty({ description: 'Container ID (mandatory per PRD)' }),
    IsUUID(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "containerId", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Idempotency key to prevent duplicate bookings',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateBookingDto.prototype, "idempotencyKey", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], CreateBookingDto.prototype, "price", void 0);
export class BookingActionDto {
    reason;
}
__decorate([
    ApiPropertyOptional({ description: 'Reason for rejection' }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], BookingActionDto.prototype, "reason", void 0);
//# sourceMappingURL=create-booking.dto.js.map