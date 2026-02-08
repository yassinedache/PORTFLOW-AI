import { OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class OcrService implements OnModuleDestroy {
    private readonly prisma;
    private readonly logger;
    private readonly pendingTimers;
    constructor(prisma: PrismaService);
    onModuleDestroy(): void;
    uploadBol(userId: string, file: {
        originalname: string;
        path: string;
        filename: string;
    }): Promise<{
        documentId: string;
        ocrJobId: string;
        status: string;
        message: string;
    }>;
    getOcrJobStatus(jobId: string): Promise<{
        document: {
            type: "BILL_OF_LADING";
            id: string;
            fileName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        status: import("../../generated/prisma/enums.js").OcrJobStatus;
        resultJson: import("@prisma/client/runtime/client").JsonValue | null;
        updatedAt: Date;
        documentId: string;
    }>;
    private simulateOcrProcessing;
}
