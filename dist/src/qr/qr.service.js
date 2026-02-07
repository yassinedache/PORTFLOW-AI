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
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import * as QRCode from 'qrcode';
let QrService = class QrService {
    configService;
    secret;
    constructor(configService) {
        this.configService = configService;
        this.secret = this.configService.get('QR_TOKEN_SECRET', 'qr-secret');
    }
    generateBookingToken(bookingId) {
        return jwt.sign({
            bookingId,
            type: 'gate-access',
            iat: Math.floor(Date.now() / 1000),
        }, this.secret, { expiresIn: '24h' });
    }
    verifyToken(token) {
        try {
            const decoded = jwt.verify(token, this.secret);
            if (decoded.type !== 'gate-access')
                return null;
            return { bookingId: decoded.bookingId, type: decoded.type };
        }
        catch {
            return null;
        }
    }
    async generateQrDataUrl(token) {
        return QRCode.toDataURL(token);
    }
    async generateQrBuffer(token) {
        return QRCode.toBuffer(token);
    }
};
QrService = __decorate([
    Injectable(),
    __param(0, Inject(ConfigService)),
    __metadata("design:paramtypes", [ConfigService])
], QrService);
export { QrService };
//# sourceMappingURL=qr.service.js.map