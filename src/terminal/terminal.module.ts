import { Module } from '@nestjs/common';
import { TerminalService } from './terminal.service.js';
import { TerminalController } from './terminal.controller.js';

@Module({
  controllers: [TerminalController],
  providers: [TerminalService],
  exports: [TerminalService],
})
export class TerminalModule {}
