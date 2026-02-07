import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from './common/decorators/public.decorator.js';
import { PrismaService } from './prisma/prisma.service.js';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Health check' })
  async healthCheck() {
    let dbStatus = 'up';
    try {
      await this.prisma.$queryRawUnsafe('SELECT 1');
    } catch {
      dbStatus = 'down';
    }

    return {
      status: 'ok',
      service: 'PORTFLOW AI',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      database: dbStatus,
    };
  }
}
