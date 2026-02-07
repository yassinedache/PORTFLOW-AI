var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service.js';
import { AiQueryDto, RecommendSlotDto, TestChatDto } from './dto/ai.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
let AiController = class AiController {
    aiService;
    constructor(aiService) {
        this.aiService = aiService;
    }
    createSession(user) {
        return this.aiService.createSession(user);
    }
    query(dto, user) {
        return this.aiService.query(dto, user);
    }
    getHistory(id, user) {
        return this.aiService.getHistory(id, user);
    }
    testChat(dto) {
        return this.aiService.testChat(dto.message);
    }
    recommendSlot(dto) {
        return this.aiService.recommendSlot(dto.message);
    }
};
__decorate([
    Post('sessions'),
    ApiOperation({ summary: 'Create a new AI chat session' }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "createSession", null);
__decorate([
    Post('query'),
    ApiOperation({ summary: 'Send a query to the AI assistant' }),
    __param(0, Body()),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiQueryDto, Object]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "query", null);
__decorate([
    Get('sessions/:id/history'),
    ApiOperation({ summary: 'Get AI session chat history' }),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "getHistory", null);
__decorate([
    Post('test/chat'),
    ApiOperation({
        summary: '[TEST] AI conversational assistant (AI_TEST_MODE only)',
        description: 'Ask natural language questions about containers, bookings, slots, or traffic. Returns structured intent + data + nextAction.',
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TestChatDto]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "testChat", null);
__decorate([
    Post('test/recommend-slot'),
    ApiOperation({
        summary: '[TEST] AI recommends the best slot (AI_TEST_MODE only)',
        description: 'No auth or CSRF required when AI_TEST_MODE=true. Returns source: "ai" for real AI or error details on failure.',
    }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RecommendSlotDto]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "recommendSlot", null);
AiController = __decorate([
    ApiTags('AI Assistant'),
    ApiBearerAuth(),
    Controller('ai'),
    UseGuards(RolesGuard),
    __metadata("design:paramtypes", [AiService])
], AiController);
export { AiController };
//# sourceMappingURL=ai.controller.js.map