var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, ForbiddenException, } from '@nestjs/common';
let DeviceGuard = class DeviceGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user || user.role !== 'GATE_AGENT') {
            return true;
        }
        if (!user.deviceId) {
            return true;
        }
        const requestDeviceId = request.headers?.['x-device-id'] ||
            request.query?.deviceId ||
            request.body?.deviceId;
        if (!requestDeviceId) {
            throw new ForbiddenException('Device identification required. Provide x-device-id header.');
        }
        if (requestDeviceId !== user.deviceId) {
            throw new ForbiddenException('Request originated from an unregistered device. Access denied.');
        }
        return true;
    }
};
DeviceGuard = __decorate([
    Injectable()
], DeviceGuard);
export { DeviceGuard };
//# sourceMappingURL=device.guard.js.map