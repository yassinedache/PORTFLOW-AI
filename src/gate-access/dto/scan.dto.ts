import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ScanQrDto {
  @ApiProperty({ description: 'QR token scanned at the gate' })
  @IsString()
  qrToken: string;

  @ApiProperty({ description: 'Gate ID where the scan occurred' })
  @IsUUID()
  gateId: string;
}
