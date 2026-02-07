import { IsUUID, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CapacityOverrideDto {
  @ApiProperty({ description: 'Time Slot ID to override' })
  @IsUUID()
  timeSlotId: string;

  @ApiProperty({ description: 'New capacity value', example: 30 })
  @IsInt()
  @Min(0)
  newCapacity: number;
}
