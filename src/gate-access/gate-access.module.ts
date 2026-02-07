import { Module } from '@nestjs/common';
import { GateAccessService } from './gate-access.service.js';
import { GateAccessController } from './gate-access.controller.js';
import { QrModule } from '../qr/qr.module.js';
import { BlockchainModule } from '../blockchain/blockchain.module.js';
import { EventsModule } from '../events/events.module.js';

@Module({
  imports: [QrModule, BlockchainModule, EventsModule],
  controllers: [GateAccessController],
  providers: [GateAccessService],
  exports: [GateAccessService],
})
export class GateAccessModule {}
