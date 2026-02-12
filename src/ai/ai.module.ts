import { Module } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { AiController } from './ai.controller.js';
import { SlotsModule } from '../slots/slots.module.js';
import { BookingModule } from '../booking/booking.module.js';
import { EventsModule } from '../events/events.module.js';
import { CarrierModule } from '../carrier/carrier.module.js';

@Module({
  imports: [SlotsModule, BookingModule, EventsModule, CarrierModule],
  controllers: [AiController],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
