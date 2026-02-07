import {
  Injectable,
  NotFoundException,
  Logger,
  OnModuleDestroy,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class OcrService implements OnModuleDestroy {
  private readonly logger = new Logger(OcrService.name);
  private readonly pendingTimers = new Set<ReturnType<typeof setTimeout>>();

  constructor(private readonly prisma: PrismaService) {}

  onModuleDestroy() {
    for (const timer of this.pendingTimers) {
      clearTimeout(timer);
    }
    this.pendingTimers.clear();
  }

  async uploadBol(
    userId: string,
    file: { originalname: string; path: string; filename: string },
  ) {
    // Create document record
    const document = await this.prisma.document.create({
      data: {
        type: 'BILL_OF_LADING',
        status: 'UPLOADED',
        fileName: file.originalname,
        filePath: file.path || file.filename,
        userId,
      },
    });

    // Create OCR job
    const ocrJob = await this.prisma.ocrJob.create({
      data: {
        documentId: document.id,
        status: 'PENDING',
      },
    });

    // In production: trigger async OCR processing (e.g., via queue)
    // For MVP: simulate OCR processing
    this.simulateOcrProcessing(ocrJob.id);

    return {
      documentId: document.id,
      ocrJobId: ocrJob.id,
      status: 'PENDING',
      message: 'Document uploaded. OCR processing started.',
    };
  }

  async getOcrJobStatus(jobId: string) {
    const job = await this.prisma.ocrJob.findUnique({
      where: { id: jobId },
      include: {
        document: { select: { id: true, fileName: true, type: true } },
      },
    });

    if (!job) throw new NotFoundException('OCR job not found');
    return job;
  }

  private simulateOcrProcessing(jobId: string) {
    const t1 = setTimeout(async () => {
      this.pendingTimers.delete(t1);
      try {
        await this.prisma.ocrJob.update({
          where: { id: jobId },
          data: {
            status: 'PROCESSING',
          },
        });

        const t2 = setTimeout(async () => {
          this.pendingTimers.delete(t2);
          try {
            await this.prisma.ocrJob.update({
              where: { id: jobId },
              data: {
                status: 'COMPLETED',
                resultJson: {
                  shipper: 'ACME Logistics',
                  consignee: 'Port Terminal Corp',
                  containerNumber: 'MSKU1234567',
                  weight: '25000 kg',
                  description: 'Electronic components',
                  vesselName: 'MSC MAYA',
                  portOfLoading: 'Shanghai',
                  portOfDischarge: 'Algiers',
                },
              },
            });
          } catch (err) {
            this.logger.error(`OCR completion error: ${err}`);
          }
        }, 5000);
        this.pendingTimers.add(t2);
      } catch (err) {
        this.logger.error(`OCR processing error: ${err}`);
      }
    }, 2000);
    this.pendingTimers.add(t1);
  }
}
