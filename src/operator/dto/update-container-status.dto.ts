import { IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ContainerStatusInput {
  NOT_ARRIVED = 'NOT_ARRIVED',
  IN_YARD = 'IN_YARD',
  READY = 'READY',
  RELEASED = 'RELEASED',
}

export class UpdateContainerStatusDto {
  @ApiProperty({
    description: 'New container status',
    enum: ContainerStatusInput,
    example: 'IN_YARD',
  })
  @IsEnum(ContainerStatusInput)
  status: ContainerStatusInput;
}
