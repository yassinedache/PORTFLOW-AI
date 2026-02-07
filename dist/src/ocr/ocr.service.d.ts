import { PrismaService } from '../prisma/prisma.service.js';
export declare class OcrService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
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
            id: string;
            type: "BILL_OF_LADING";
            fileName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        status: import("../../generated/prisma/enums.js").OcrJobStatus;
        documentId: string;
        resultJson: import("@prisma/client/runtime/client").JsonValue | null;
        updatedAt: Date;
    }>;
    private simulateOcrProcessing;
}
