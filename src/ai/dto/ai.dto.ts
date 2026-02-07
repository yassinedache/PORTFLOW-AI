import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAiSessionDto {
  // Session is created automatically tied to the current user
}

export class AiQueryDto {
  @ApiProperty({ description: 'AI session ID' })
  @IsUUID()
  sessionId: string;

  @ApiProperty({
    description: 'User query / message',
    example: 'What slots are available for Terminal A tomorrow?',
  })
  @IsString()
  message: string;
}

export class RecommendSlotDto {
  @ApiProperty({
    description: 'Client booking intent in natural language',
    example: 'I want to book a slot tomorrow morning',
  })
  @IsString()
  message: string;
}

export class TestChatDto {
  @ApiProperty({
    description: 'Natural language question to the AI assistant',
    example: 'Is my container ready?',
  })
  @IsString()
  message: string;
}
