import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../../generated/prisma/client.js';

export class RegisterDto {
  @ApiProperty({ example: 'user@portflow.ai' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: Role, example: Role.CARRIER })
  @IsEnum(Role)
  role: Role;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({
    description:
      'Device fingerprint for GATE_AGENT accounts. Binds the account to a specific physical device.',
    example: 'device-abc-123-xyz',
  })
  @IsOptional()
  @IsString()
  deviceId?: string;
}
