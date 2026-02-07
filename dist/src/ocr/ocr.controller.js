var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Get, Param, UseGuards, UseInterceptors, UploadedFile, } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { OcrService } from './ocr.service.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';
let OcrController = class OcrController {
    ocrService;
    constructor(ocrService) {
        this.ocrService = ocrService;
    }
    uploadBol(file, userId) {
        return this.ocrService.uploadBol(userId, file);
    }
    getOcrJobStatus(id) {
        return this.ocrService.getOcrJobStatus(id);
    }
};
__decorate([
    Post('bol/upload'),
    Roles(Role.CARRIER),
    UseInterceptors(FileInterceptor('file')),
    ApiConsumes('multipart/form-data'),
    ApiOperation({ summary: 'Upload Bill of Lading for OCR (Carrier)' }),
    __param(0, UploadedFile()),
    __param(1, CurrentUser('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], OcrController.prototype, "uploadBol", null);
__decorate([
    Get('ocr-jobs/:id'),
    Roles(Role.CARRIER),
    ApiOperation({ summary: 'Get OCR job status and result' }),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OcrController.prototype, "getOcrJobStatus", null);
OcrController = __decorate([
    ApiTags('OCR / Smart Booking'),
    ApiBearerAuth(),
    Controller('carrier'),
    UseGuards(RolesGuard),
    __metadata("design:paramtypes", [OcrService])
], OcrController);
export { OcrController };
//# sourceMappingURL=ocr.controller.js.map