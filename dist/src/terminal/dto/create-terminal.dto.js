var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateTerminalDto {
    name;
    location;
    isActive;
}
__decorate([
    ApiProperty({ example: 'Terminal A' }),
    IsString(),
    __metadata("design:type", String)
], CreateTerminalDto.prototype, "name", void 0);
__decorate([
    ApiProperty({ example: 'North Berth, Port of Algiers' }),
    IsString(),
    __metadata("design:type", String)
], CreateTerminalDto.prototype, "location", void 0);
__decorate([
    ApiPropertyOptional({ default: true }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateTerminalDto.prototype, "isActive", void 0);
export class UpdateTerminalDto {
    name;
    location;
    isActive;
}
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateTerminalDto.prototype, "name", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateTerminalDto.prototype, "location", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateTerminalDto.prototype, "isActive", void 0);
//# sourceMappingURL=create-terminal.dto.js.map