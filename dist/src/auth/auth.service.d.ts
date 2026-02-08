import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    register(dto: RegisterDto): Promise<{
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
        id: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
        };
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            email: string;
            deviceId: string | null;
            role: import("../../generated/prisma/enums.js").Role;
            id: string;
        };
    }>;
    logout(refreshToken: string): Promise<{
        message: string;
    }>;
    private generateTokens;
    generateCsrfToken(): string;
}
