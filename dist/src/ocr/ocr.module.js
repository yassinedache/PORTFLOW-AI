var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { OcrService } from './ocr.service.js';
import { OcrController } from './ocr.controller.js';
let OcrModule = class OcrModule {
};
OcrModule = __decorate([
    Module({
        imports: [
            MulterModule.register({
                dest: './uploads',
            }),
        ],
        controllers: [OcrController],
        providers: [OcrService],
        exports: [OcrService],
    })
], OcrModule);
export { OcrModule };
//# sourceMappingURL=ocr.module.js.map