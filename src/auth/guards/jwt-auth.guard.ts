import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator.js';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Skip JWT auth for AI test endpoints when AI_TEST_MODE is enabled
    if (process.env.AI_TEST_MODE === 'true') {
      const request = context.switchToHttp().getRequest();
      if (request.url?.startsWith('/ai/test/')) {
        return true;
      }
    }

    return super.canActivate(context);
  }
}
