import { IsUUID, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EnablePriorityDto {
  @ApiPropertyOptional({
    enum: ['STANDARD', 'PRIORITY'],
    default: 'PRIORITY',
  })
  @IsOptional()
  @IsEnum(['STANDARD', 'PRIORITY'])
  level?: string;
}

export class ApplyPenaltyDto {
  @ApiProperty({ enum: ['NO_SHOW', 'LATE'], description: 'Penalty type' })
  @IsEnum(['NO_SHOW', 'LATE'])
  type: string;

  @ApiPropertyOptional({
    description:
      'Custom penalty amount. If omitted, auto-calculated from booking price.',
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiPropertyOptional({ description: 'Minutes late (for LATE penalties)' })
  @IsOptional()
  @IsNumber()
  minutesLate?: number;
}
