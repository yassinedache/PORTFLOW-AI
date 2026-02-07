import { Module } from '@nestjs/common';
import { BookingService } from './booking.service.js';
import { BookingController } from './booking.controller.js';
import { BlockchainModule } from '../blockchain/blockchain.module.js';
import { QrModule } from '../qr/qr.module.js';
import { EventsModule } from '../events/events.module.js';

@Module({
  imports: [BlockchainModule, QrModule, EventsModule],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}
