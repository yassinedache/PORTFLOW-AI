import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class AiTestModeGuard implements CanActivate {
    private readonly configService;
    constructor(configService: ConfigService);
    canActivate(_context: ExecutionContext): boolean;
}
