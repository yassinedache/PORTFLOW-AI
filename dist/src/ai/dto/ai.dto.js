var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAiSessionDto {
}
export class AiQueryDto {
    sessionId;
    message;
}
__decorate([
    ApiProperty({ description: 'AI session ID' }),
    IsUUID(),
    __metadata("design:type", String)
], AiQueryDto.prototype, "sessionId", void 0);
__decorate([
    ApiProperty({
        description: 'User query / message',
        example: 'What slots are available for Terminal A tomorrow?',
    }),
    IsString(),
    __metadata("design:type", String)
], AiQueryDto.prototype, "message", void 0);
export class RecommendSlotDto {
    message;
}
__decorate([
    ApiProperty({
        description: 'Client booking intent in natural language',
        example: 'I want to book a slot tomorrow morning',
    }),
    IsString(),
    __metadata("design:type", String)
], RecommendSlotDto.prototype, "message", void 0);
export class TestChatDto {
    message;
}
__decorate([
    ApiProperty({
        description: 'Natural language question to the AI assistant',
        example: 'Is my container ready?',
    }),
    IsString(),
    __metadata("design:type", String)
], TestChatDto.prototype, "message", void 0);
//# sourceMappingURL=ai.dto.js.map