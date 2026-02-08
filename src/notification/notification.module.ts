import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service.js';
import { NotificationController } from './notification.controller.js';
import { EventsModule } from '../events/events.module.js';

@Module({
  imports: [EventsModule],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
