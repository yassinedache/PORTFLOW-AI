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
import { Inject, Injectable, UnauthorizedException, ConflictException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service.js';
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existing) {
            throw new ConflictException('Email already registered');
        }
        const passwordHash = await bcrypt.hash(dto.password, 12);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash,
                role: dto.role,
                companyId: dto.companyId || null,
                deviceId: dto.role === 'GATE_AGENT' ? dto.deviceId || null : null,
            },
            select: { id: true, email: true, role: true },
        });
        return user;
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (user.role === 'GATE_AGENT') {
            if (user.deviceId) {
                if (!dto.deviceId) {
                    throw new UnauthorizedException('Device ID is required for gate agent login');
                }
                if (dto.deviceId !== user.deviceId) {
                    throw new UnauthorizedException('This gate agent account is bound to a different device');
                }
            }
            else if (dto.deviceId) {
                await this.prisma.user.update({
                    where: { id: user.id },
                    data: { deviceId: dto.deviceId },
                });
            }
        }
        const tokens = await this.generateTokens(user.id, user.email, user.role, user.deviceId);
        await this.prisma.refreshToken.create({
            data: {
                userId: user.id,
                token: tokens.refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        return {
            user: { id: user.id, email: user.email, role: user.role },
            ...tokens,
        };
    }
    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token required');
        }
        const stored = await this.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: {
                user: { select: { id: true, email: true, role: true, deviceId: true } },
            },
        });
        if (!stored || stored.expiresAt < new Date()) {
            if (stored) {
                await this.prisma.refreshToken.delete({ where: { id: stored.id } });
            }
            throw new UnauthorizedException('Invalid or expired refresh token');
        }
        await this.prisma.refreshToken.delete({ where: { id: stored.id } });
        const tokens = await this.generateTokens(stored.user.id, stored.user.email, stored.user.role, stored.user.deviceId);
        await this.prisma.refreshToken.create({
            data: {
                userId: stored.user.id,
                token: tokens.refreshToken,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });
        return {
            user: stored.user,
            ...tokens,
        };
    }
    async logout(refreshToken) {
        if (refreshToken) {
            await this.prisma.refreshToken
                .delete({ where: { token: refreshToken } })
                .catch(() => { });
        }
        return { message: 'Logged out successfully' };
    }
    async generateTokens(userId, email, role, deviceId) {
        const payload = {
            sub: userId,
            email,
            role: role,
            ...(deviceId ? { deviceId } : {}),
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRY', '15m'),
            }),
            this.jwtService.signAsync({ sub: userId, jti: uuidv4() }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRY', '7d'),
            }),
        ]);
        return { accessToken, refreshToken };
    }
    generateCsrfToken() {
        return uuidv4();
    }
};
AuthService = __decorate([
    Injectable(),
    __param(2, Inject(ConfigService)),
    __metadata("design:paramtypes", [PrismaService,
        JwtService,
        ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map