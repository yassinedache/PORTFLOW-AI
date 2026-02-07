import { Module } from '@nestjs/common';
import { GateService } from './gate.service.js';
import { GateController } from './gate.controller.js';

@Module({
  controllers: [GateController],
  providers: [GateService],
  exports: [GateService],
})
export class GateModule {}
