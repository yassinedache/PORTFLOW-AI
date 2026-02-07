import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: string;
        email: string;
        role: import("../../generated/prisma/enums.js").Role;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        user: {
            id: string;
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
        };
        accessToken: string;
        csrfToken: string;
    }>;
    refresh(req: Request, res: Response): Promise<{
        user: {
            id: string;
            email: string;
            role: import("../../generated/prisma/enums.js").Role;
            deviceId: string | null;
        };
        accessToken: string;
        csrfToken: string;
    }>;
    logout(req: Request, res: Response): Promise<{
        message: string;
    }>;
    getCsrfToken(res: Response): {
        csrfToken: string;
    };
}
