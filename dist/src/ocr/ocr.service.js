var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OcrService_1;
import { Injectable, NotFoundException, Logger, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let OcrService = OcrService_1 = class OcrService {
    prisma;
    logger = new Logger(OcrService_1.name);
    pendingTimers = new Set();
    constructor(prisma) {
        this.prisma = prisma;
    }
    onModuleDestroy() {
        for (const timer of this.pendingTimers) {
            clearTimeout(timer);
        }
        this.pendingTimers.clear();
    }
    async uploadBol(userId, file) {
        const document = await this.prisma.document.create({
            data: {
                type: 'BILL_OF_LADING',
                status: 'UPLOADED',
                fileName: file.originalname,
                filePath: file.path || file.filename,
                userId,
            },
        });
        const ocrJob = await this.prisma.ocrJob.create({
            data: {
                documentId: document.id,
                status: 'PENDING',
            },
        });
        this.simulateOcrProcessing(ocrJob.id);
        return {
            documentId: document.id,
            ocrJobId: ocrJob.id,
            status: 'PENDING',
            message: 'Document uploaded. OCR processing started.',
        };
    }
    async getOcrJobStatus(jobId) {
        const job = await this.prisma.ocrJob.findUnique({
            where: { id: jobId },
            include: {
                document: { select: { id: true, fileName: true, type: true } },
            },
        });
        if (!job)
            throw new NotFoundException('OCR job not found');
        return job;
    }
    simulateOcrProcessing(jobId) {
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
                    }
                    catch (err) {
                        this.logger.error(`OCR completion error: ${err}`);
                    }
                }, 5000);
                this.pendingTimers.add(t2);
            }
            catch (err) {
                this.logger.error(`OCR processing error: ${err}`);
            }
        }, 2000);
        this.pendingTimers.add(t1);
    }
};
OcrService = OcrService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], OcrService);
export { OcrService };
//# sourceMappingURL=ocr.service.js.map