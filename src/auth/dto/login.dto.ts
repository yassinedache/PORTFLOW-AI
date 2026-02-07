import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@portflow.ai' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    description:
      'Device fingerprint for GATE_AGENT accounts. Required for gate agents to bind their session to a specific device.',
    example: 'device-abc-123-xyz',
  })
  @IsOptional()
  @IsString()
  deviceId?: string;
}
