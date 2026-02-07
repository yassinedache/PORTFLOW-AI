import { Module } from '@nestjs/common';
import { BlockchainService } from './blockchain.service.js';
import { BlockchainController } from './blockchain.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [BlockchainController],
  providers: [BlockchainService],
  exports: [BlockchainService],
})
export class BlockchainModule {}
