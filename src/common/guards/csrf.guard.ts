import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';

/**
 * CSRF Double-Submit Cookie Guard
 * Validates that the CSRF token in the header matches the one in the cookie.
 * Only applies to state-changing methods (POST, PUT, PATCH, DELETE).
 */
@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const method = request.method?.toUpperCase();

    // Only check CSRF for state-changing methods
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return true;
    }

    // Skip CSRF for AI test endpoints when AI_TEST_MODE is enabled
    if (
      process.env.AI_TEST_MODE === 'true' &&
      request.url?.startsWith('/ai/test/')
    ) {
      return true;
    }

    const cookieToken = request.cookies?.['csrf-token'];
    const headerToken =
      request.headers['x-csrf-token'] || request.headers['x-xsrf-token'];

    if (!cookieToken || !headerToken) {
      throw new ForbiddenException('CSRF token missing');
    }

    if (cookieToken !== headerToken) {
      throw new ForbiddenException('CSRF token mismatch');
    }

    return true;
  }
}
