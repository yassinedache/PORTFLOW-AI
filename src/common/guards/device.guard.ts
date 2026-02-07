import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

/**
 * DeviceGuard – enforces device-binding for GATE_AGENT users.
 *
 * When a gate agent has a registered deviceId, every request reaching a
 * gate-protected endpoint must include the same deviceId in one of the
 * following locations (checked in order):
 *   1. `x-device-id` header
 *   2. `deviceId` query parameter
 *   3. `deviceId` body field
 *
 * Non-GATE_AGENT users pass through freely.
 */
@Injectable()
export class DeviceGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Only enforce for gate agents
    if (!user || user.role !== 'GATE_AGENT') {
      return true;
    }

    // If the account has no device bound yet, allow through
    if (!user.deviceId) {
      return true;
    }

    // Extract deviceId from the request
    const requestDeviceId =
      request.headers?.['x-device-id'] ||
      request.query?.deviceId ||
      request.body?.deviceId;

    if (!requestDeviceId) {
      throw new ForbiddenException(
        'Device identification required. Provide x-device-id header.',
      );
    }

    if (requestDeviceId !== user.deviceId) {
      throw new ForbiddenException(
        'Request originated from an unregistered device. Access denied.',
      );
    }

    return true;
  }
}
