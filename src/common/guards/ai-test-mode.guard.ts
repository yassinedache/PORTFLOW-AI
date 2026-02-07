import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * AI Test Mode Guard
 *
 * When AI_TEST_MODE=true:
 *   - Allows access to AI test endpoints without auth or CSRF.
 * When AI_TEST_MODE is not set or false:
 *   - Blocks access entirely (returns 403).
 *
 * Apply this guard on test-only endpoints via @UseGuards(AiTestModeGuard).
 */
@Injectable()
export class AiTestModeGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(_context: ExecutionContext): boolean {
    return this.configService.get<string>('AI_TEST_MODE', 'false') === 'true';
  }
}
