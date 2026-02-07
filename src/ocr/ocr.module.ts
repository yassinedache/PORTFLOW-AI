import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { OcrService } from './ocr.service.js';
import { OcrController } from './ocr.controller.js';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [OcrController],
  providers: [OcrService],
  exports: [OcrService],
})
export class OcrModule {}
