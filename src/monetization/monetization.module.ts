import { Module } from '@nestjs/common';
import { MonetizationService } from './monetization.service.js';
import { MonetizationController } from './monetization.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [MonetizationController],
  providers: [MonetizationService],
  exports: [MonetizationService],
})
export class MonetizationModule {}
