var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateGateDto {
    name;
    terminalId;
    isActive;
}
__decorate([
    ApiProperty({ example: 'Gate 1' }),
    IsString(),
    __metadata("design:type", String)
], CreateGateDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ description: 'Terminal ID' }),
    IsUUID(),
    __metadata("design:type", String)
], CreateGateDto.prototype, "terminalId", void 0);
__decorate([
    ApiPropertyOptional({ default: true }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateGateDto.prototype, "isActive", void 0);
export class UpdateGateDto {
    name;
    isActive;
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateGateDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateGateDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-gate.dto.js.map