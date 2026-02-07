import {
  IsString,
  IsUUID,
  IsOptional,
  IsInt,
  Min,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateZoneDto {
  @ApiProperty({ description: 'Zone name', example: 'Hazmat Area A' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Terminal ID' })
  @IsUUID()
  terminalId: string;

  @ApiPropertyOptional({
    description: 'Zone type',
    enum: ['GENERAL', 'HAZMAT', 'REEFER', 'OVERSIZED'],
    default: 'GENERAL',
  })
  @IsOptional()
  @IsString()
  @IsIn(['GENERAL', 'HAZMAT', 'REEFER', 'OVERSIZED'])
  type?: string;

  @ApiPropertyOptional({ description: 'Maximum trucks in zone', default: 50 })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxTrucks?: number;
}

export class UpdateZoneDto extends PartialType(CreateZoneDto) {
  @ApiPropertyOptional({ description: 'Whether zone is active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
