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
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PublicService } from './public.service.js';
import { Public } from '../common/decorators/public.decorator.js';
let PublicController = class PublicController {
    publicService;
    constructor(publicService) {
        this.publicService = publicService;
    }
    getPulse() {
        return this.publicService.getPulse();
    }
    getStats() {
        return this.publicService.getStats();
    }
    trackContainer(containerNumber) {
        return this.publicService.trackContainer(containerNumber);
    }
};
__decorate([
    Get('pulse'),
    ApiOperation({ summary: 'Get real-time port pulse' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "getPulse", null);
__decorate([
    Get('stats'),
    ApiOperation({ summary: 'Get aggregate port statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "getStats", null);
__decorate([
    Get('containers/:containerNumber/track'),
    ApiOperation({ summary: 'Track a container by number' }),
    __param(0, Param('containerNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicController.prototype, "trackContainer", null);
PublicController = __decorate([
    ApiTags('Public'),
    Controller('public'),
    Public(),
    __metadata("design:paramtypes", [PublicService])
], PublicController);
export { PublicController };
//# sourceMappingURL=public.controller.js.map