import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service.js';
import { SlotsController } from './slots.controller.js';

@Module({
  controllers: [SlotsController],
  providers: [SlotsService],
  exports: [SlotsService],
})
export class SlotsModule {}
