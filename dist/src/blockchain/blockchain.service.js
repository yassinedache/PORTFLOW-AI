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
var BlockchainService_1;
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
let BlockchainService = BlockchainService_1 = class BlockchainService {
    configService;
    logger = new Logger(BlockchainService_1.name);
    enabled;
    constructor(configService) {
        this.configService = configService;
        this.enabled =
            this.configService.get('BLOCKCHAIN_ENABLED', 'false') === 'true';
    }
    async hashBooking(payload) {
        const serialized = JSON.stringify(payload, Object.keys(payload).sort());
        const hash = createHash('sha256').update(serialized).digest('hex');
        if (this.enabled) {
            this.logger.log(`Blockchain hash submitted: ${hash}`);
        }
        return hash;
    }
    async verifyHash(payload, expectedHash) {
        const serialized = JSON.stringify(payload, Object.keys(payload).sort());
        const hash = createHash('sha256').update(serialized).digest('hex');
        return hash === expectedHash;
    }
};
BlockchainService = BlockchainService_1 = __decorate([
    Injectable(),
    __param(0, Inject(ConfigService)),
    __metadata("design:paramtypes", [ConfigService])
], BlockchainService);
export { BlockchainService };
//# sourceMappingURL=blockchain.service.js.map