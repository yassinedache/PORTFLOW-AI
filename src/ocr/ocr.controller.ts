import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { OcrService } from './ocr.service.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';

@ApiTags('OCR / Smart Booking')
@ApiBearerAuth()
@Controller('carrier')
@UseGuards(RolesGuard)
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post('bol/upload')
  @Roles(Role.CARRIER)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload Bill of Lading for OCR (Carrier)' })
  uploadBol(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('id') userId: string,
  ) {
    return this.ocrService.uploadBol(userId, file);
  }

  @Get('ocr-jobs/:id')
  @Roles(Role.CARRIER)
  @ApiOperation({ summary: 'Get OCR job status and result' })
  getOcrJobStatus(@Param('id') id: string) {
    return this.ocrService.getOcrJobStatus(id);
  }
}
