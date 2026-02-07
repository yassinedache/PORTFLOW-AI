import { IsUUID, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ description: 'Terminal ID' })
  @IsUUID()
  terminalId: string;

  @ApiProperty({ description: 'Time Slot ID' })
  @IsUUID()
  timeSlotId: string;

  @ApiPropertyOptional({ description: 'Truck ID' })
  @IsOptional()
  @IsUUID()
  truckId?: string;

  @ApiProperty({ description: 'Container ID (mandatory per PRD)' })
  @IsUUID()
  containerId: string;

  @ApiPropertyOptional({
    description: 'Idempotency key to prevent duplicate bookings',
  })
  @IsOptional()
  @IsString()
  idempotencyKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price?: number;
}

export class BookingActionDto {
  @ApiPropertyOptional({ description: 'Reason for rejection' })
  @IsOptional()
  @IsString()
  reason?: string;
}
