var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, } from '@nestjs/common';
import { tap } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service.js';
let AuditInterceptor = class AuditInterceptor {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.url;
        const userId = request.user?.id || null;
        if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
            return next.handle();
        }
        return next.handle().pipe(tap(async (responseBody) => {
            try {
                const entityId = request.params?.id ||
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
            }
            catch {
            }
        }));
    }
    extractEntity(url) {
        const segments = url.split('/').filter(Boolean);
        return segments[0] || 'unknown';
    }
};
AuditInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AuditInterceptor);
export { AuditInterceptor };
//# sourceMappingURL=audit.interceptor.js.map