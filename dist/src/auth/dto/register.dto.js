var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../generated/prisma/client.js';
export class RegisterDto {
    email;
    password;
    role;
    companyId;
    deviceId;
}
__decorate([
    ApiProperty({ example: 'user@portflow.ai' }),
    IsEmail(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: 'password123' }),
    IsString(),
    MinLength(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    ApiProperty({ enum: Role, example: Role.CARRIER }),
    IsEnum(Role),
    __metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "companyId", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Device fingerprint for GATE_AGENT accounts. Binds the account to a specific physical device.',
        example: 'device-abc-123-xyz',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], RegisterDto.prototype, "deviceId", void 0);
//# sourceMappingURL=register.dto.js.map