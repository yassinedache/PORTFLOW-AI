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
import { Controller, Post, Body, Res, Req, HttpCode, HttpStatus, Get, } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { Public } from '../common/decorators/public.decorator.js';
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto) {
        return this.authService.register(dto);
    }
    async login(dto, res) {
        const result = await this.authService.login(dto);
        res.cookie('access_token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });
        res.cookie('refresh_token', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/auth/refresh',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const csrfToken = this.authService.generateCsrfToken();
        res.cookie('csrf-token', csrfToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
        });
        return {
            user: result.user,
            accessToken: result.accessToken,
            csrfToken,
        };
    }
    async refresh(req, res) {
        const refreshToken = req.cookies?.['refresh_token'];
        const result = await this.authService.refresh(refreshToken);
        res.cookie('access_token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });
        res.cookie('refresh_token', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/auth/refresh',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const csrfToken = this.authService.generateCsrfToken();
        res.cookie('csrf-token', csrfToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
        });
        return { user: result.user, accessToken: result.accessToken, csrfToken };
    }
    async logout(req, res) {
        const refreshToken = req.cookies?.['refresh_token'];
        const result = await this.authService.logout(refreshToken);
        res.clearCookie('access_token');
        res.clearCookie('refresh_token', { path: '/auth/refresh' });
        res.clearCookie('csrf-token');
        return result;
    }
    getCsrfToken(res) {
        const csrfToken = this.authService.generateCsrfToken();
        res.cookie('csrf-token', csrfToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
        });
        return { csrfToken };
    }
};
__decorate([
    Public(),
    Post('register'),
    ApiOperation({ summary: 'Register a new user' }),
    ApiResponse({ status: 201, description: 'User registered successfully' }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    Public(),
    Post('login'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Login with email and password' }),
    ApiResponse({ status: 200, description: 'Login successful' }),
    __param(0, Body()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Public(),
    Post('refresh'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Refresh access token using refresh token' }),
    ApiResponse({ status: 200, description: 'Tokens refreshed' }),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    Post('logout'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Logout and invalidate refresh token' }),
    ApiResponse({ status: 200, description: 'Logged out' }),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    Public(),
    Get('csrf-token'),
    ApiOperation({ summary: 'Get a fresh CSRF token' }),
    __param(0, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getCsrfToken", null);
AuthController = __decorate([
    ApiTags('Authentication'),
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map