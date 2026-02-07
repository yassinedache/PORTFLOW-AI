import {
  IsString,
  Matches,
  IsOptional,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTruckDto {
  @ApiProperty({ description: 'License plate number', example: 'DZ-1234-A16' })
  @IsString()
  @Matches(/^[A-Z0-9\-]+$/i, {
    message: 'Plate must contain only alphanumeric characters and hyphens',
  })
  plate: string;
}

export class CreateContainerDto {
  @ApiProperty({
    description: 'Container number (ISO 6346)',
    example: 'MSKU1234567',
  })
  @IsString()
  @Matches(/^[A-Z]{4}\d{7}$/i, {
    message:
      'Container number must follow ISO 6346 format (4 letters + 7 digits)',
  })
  containerNumber: string;
}

export class UpdateTruckLocationDto {
  @ApiProperty({ description: 'Truck ID' })
  @IsUUID()
  truckId: string;

  @ApiProperty({ description: 'Latitude', example: 36.7538 })
  @IsNumber()
  lat: number;

  @ApiProperty({ description: 'Longitude', example: 3.0588 })
  @IsNumber()
  lng: number;
}
