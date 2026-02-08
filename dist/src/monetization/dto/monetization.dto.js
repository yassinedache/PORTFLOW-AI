var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEnum, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class EnablePriorityDto {
    level;
}
__decorate([
    ApiPropertyOptional({
        enum: ['STANDARD', 'PRIORITY'],
        default: 'PRIORITY',
    }),
    IsOptional(),
    IsEnum(['STANDARD', 'PRIORITY']),
    __metadata("design:type", String)
], EnablePriorityDto.prototype, "level", void 0);
export class ApplyPenaltyDto {
    type;
    amount;
    minutesLate;
}
__decorate([
    ApiProperty({ enum: ['NO_SHOW', 'LATE'], description: 'Penalty type' }),
    IsEnum(['NO_SHOW', 'LATE']),
    __metadata("design:type", String)
], ApplyPenaltyDto.prototype, "type", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Custom penalty amount. If omitted, auto-calculated from booking price.',
    }),
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], ApplyPenaltyDto.prototype, "amount", void 0);
__decorate([
    ApiPropertyOptional({ description: 'Minutes late (for LATE penalties)' }),
    IsOptional(),
    IsNumber(),
    __metadata("design:type", Number)
], ApplyPenaltyDto.prototype, "minutesLate", void 0);
//# sourceMappingURL=monetization.dto.js.map