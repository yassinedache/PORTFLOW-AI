import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PublicService } from './public.service.js';
import { Public } from '../common/decorators/public.decorator.js';

@ApiTags('Public')
@Controller('public')
@Public()
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('pulse')
  @ApiOperation({ summary: 'Get real-time port pulse' })
  getPulse() {
    return this.publicService.getPulse();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get aggregate port statistics' })
  getStats() {
    return this.publicService.getStats();
  }

  @Get('containers/:containerNumber/track')
  @ApiOperation({ summary: 'Track a container by number' })
  trackContainer(@Param('containerNumber') containerNumber: string) {
    return this.publicService.trackContainer(containerNumber);
  }
}
