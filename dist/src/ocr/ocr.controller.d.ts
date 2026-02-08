import { OcrService } from './ocr.service.js';
export declare class OcrController {
    private readonly ocrService;
    constructor(ocrService: OcrService);
    uploadBol(file: Express.Multer.File, userId: string): Promise<{
        documentId: string;
        ocrJobId: string;
        status: string;
        message: string;
    }>;
    getOcrJobStatus(id: string): Promise<{
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
}
