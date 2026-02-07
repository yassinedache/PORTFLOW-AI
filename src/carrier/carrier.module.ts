import { Module } from '@nestjs/common';
import { CarrierService } from './carrier.service.js';
import { CarrierController } from './carrier.controller.js';
import { EventsModule } from '../events/events.module.js';

@Module({
  imports: [EventsModule],
  controllers: [CarrierController],
  providers: [CarrierService],
  exports: [CarrierService],
})
export class CarrierModule {}
