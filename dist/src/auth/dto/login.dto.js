var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class LoginDto {
    email;
    password;
    deviceId;
}
__decorate([
    ApiProperty({ example: 'admin@portflow.ai' }),
    IsEmail(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    ApiProperty({ example: 'password123' }),
    IsString(),
    MinLength(6),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    ApiPropertyOptional({
        description: 'Device fingerprint for GATE_AGENT accounts. Required for gate agents to bind their session to a specific device.',
        example: 'device-abc-123-xyz',
    }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], LoginDto.prototype, "deviceId", void 0);
//# sourceMappingURL=login.dto.js.map