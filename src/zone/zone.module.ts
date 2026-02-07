import { Module } from '@nestjs/common';
import { ZoneService } from './zone.service.js';
import { ZoneController } from './zone.controller.js';

@Module({
  controllers: [ZoneController],
  providers: [ZoneService],
  exports: [ZoneService],
})
export class ZoneModule {}
