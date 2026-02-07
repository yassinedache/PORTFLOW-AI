import { IsUUID, IsInt, Min, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTimeSlotDto {
  @ApiProperty()
  @IsUUID()
  terminalId: string;

  @ApiProperty({ example: '2025-06-15T08:00:00Z' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ example: '2025-06-15T09:00:00Z' })
  @IsDateString()
  endTime: string;

  @ApiProperty({ example: 20 })
  @IsInt()
  @Min(1)
  capacity: number;
}

export class AvailabilityQueryDto {
  terminalId?: string;
  date?: string; // YYYY-MM-DD
}
