import { Module } from '@nestjs/common';
import { OperatorService } from './operator.service.js';
import { OperatorController } from './operator.controller.js';
import { EventsModule } from '../events/events.module.js';
import { BlockchainModule } from '../blockchain/blockchain.module.js';

@Module({
  imports: [EventsModule, BlockchainModule],
  controllers: [OperatorController],
  providers: [OperatorService],
  exports: [OperatorService],
})
export class OperatorModule {}
