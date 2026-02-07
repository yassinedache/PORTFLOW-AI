import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const userId = request.user?.id || null;

    // Only audit state-changing requests
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async (responseBody) => {
        try {
          const entityId =
            request.params?.id ||
            responseBody?.id ||
            null;

          await this.prisma.auditLog.create({
            data: {
              userId,
              action: `${method} ${url}`,
              entity: this.extractEntity(url),
              entityId: entityId ? String(entityId) : null,
              meta: {
                ip: request.ip,
                userAgent: request.headers?.['user-agent'],
                statusCode: context.switchToHttp().getResponse().statusCode,
              },
            },
          });
        } catch {
          // Audit logging should never break the request
        }
      }),
    );
  }

  private extractEntity(url: string): string {
    const segments = url.split('/').filter(Boolean);
    // Return the first meaningful segment (e.g., 'bookings', 'auth', 'admin')
    return segments[0] || 'unknown';
  }
}
