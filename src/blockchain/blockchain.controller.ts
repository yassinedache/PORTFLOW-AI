import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BlockchainService } from './blockchain.service.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../../generated/prisma/client.js';

@ApiTags('Blockchain')
@ApiBearerAuth()
@Controller('blockchain')
@UseGuards(RolesGuard)
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Post('proofs')
  @Roles(Role.TERMINAL_OPERATOR, Role.PORT_ADMIN)
  @ApiOperation({ summary: 'Create a blockchain proof for an entity' })
  createProof(
    @Body()
    body: {
      entityType: 'BOOKING' | 'READINESS';
      entityId: string;
      payload: Record<string, any>;
    },
  ) {
    return this.blockchainService.createProof(
      body.entityType,
      body.entityId,
      body.payload,
    );
  }

  @Get('verify/:entityType/:entityId')
  @Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER, Role.GATE_AGENT)
  @ApiOperation({ summary: 'Verify a blockchain proof for an entity' })
  verifyProof(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    return this.blockchainService.verifyEntityProof(entityType, entityId);
  }

  @Get('proofs/:entityId')
  @Roles(Role.PORT_ADMIN, Role.TERMINAL_OPERATOR, Role.CARRIER, Role.GATE_AGENT)
  @ApiOperation({ summary: 'Get proof history for an entity' })
  getProofHistory(@Param('entityId') entityId: string) {
    return this.blockchainService.getProofHistory(entityId);
  }
}
