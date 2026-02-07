import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class DeviceGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
