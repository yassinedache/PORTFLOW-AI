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
var AiService_1;
import { Inject, Injectable, NotFoundException, Logger, ForbiddenException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { SlotsService } from '../slots/slots.service.js';
import { BookingService } from '../booking/booking.service.js';
import { toOpenAiTools } from './ai-tools.js';
import { EventsGateway } from '../events/events.gateway.js';
import { CarrierService } from '../carrier/carrier.service.js';
export var ConversationStatus;
(function (ConversationStatus) {
    ConversationStatus["IDLE"] = "IDLE";
    ConversationStatus["SUGGESTED_SLOTS_SHOWN"] = "SUGGESTED_SLOTS_SHOWN";
    ConversationStatus["AWAITING_CONFIRMATION"] = "AWAITING_CONFIRMATION";
    ConversationStatus["AWAITING_SLOT_SELECTION"] = "AWAITING_SLOT_SELECTION";
    ConversationStatus["AWAITING_INFO"] = "AWAITING_INFO";
    ConversationStatus["BOOKING_IN_PROGRESS"] = "BOOKING_IN_PROGRESS";
    ConversationStatus["AWAITING_CONTAINER"] = "AWAITING_CONTAINER";
    ConversationStatus["CONTAINER_LIST_SHOWN"] = "CONTAINER_LIST_SHOWN";
    ConversationStatus["CONTAINER_SELECTED"] = "CONTAINER_SELECTED";
    ConversationStatus["COMPLETED"] = "COMPLETED";
    ConversationStatus["CANCELED"] = "CANCELED";
})(ConversationStatus || (ConversationStatus = {}));
export var ConversationIntent;
(function (ConversationIntent) {
    ConversationIntent["NONE"] = "NONE";
    ConversationIntent["BOOK_SLOT"] = "BOOK_SLOT";
    ConversationIntent["CANCEL_BOOKING"] = "CANCEL_BOOKING";
    ConversationIntent["RESCHEDULE_BOOKING"] = "RESCHEDULE_BOOKING";
    ConversationIntent["TRACK_CONTAINER"] = "TRACK_CONTAINER";
    ConversationIntent["VIEW_BOOKINGS"] = "VIEW_BOOKINGS";
    ConversationIntent["CHECK_AVAILABILITY"] = "CHECK_AVAILABILITY";
})(ConversationIntent || (ConversationIntent = {}));
export var QuestionType;
(function (QuestionType) {
    QuestionType["NONE"] = "NONE";
    QuestionType["CONFIRM_BOOK_SLOT"] = "CONFIRM_BOOK_SLOT";
    QuestionType["SELECT_SLOT"] = "SELECT_SLOT";
    QuestionType["PROVIDE_TERMINAL"] = "PROVIDE_TERMINAL";
    QuestionType["PROVIDE_DATE"] = "PROVIDE_DATE";
    QuestionType["PROVIDE_TIME"] = "PROVIDE_TIME";
    QuestionType["PROVIDE_CONTAINER"] = "PROVIDE_CONTAINER";
    QuestionType["SELECT_CONTAINER"] = "SELECT_CONTAINER";
    QuestionType["PROVIDE_BOOKING_ID"] = "PROVIDE_BOOKING_ID";
    QuestionType["CONFIRM_CANCEL"] = "CONFIRM_CANCEL";
})(QuestionType || (QuestionType = {}));
const YES_PATTERNS = /^(yes|y|ok|okay|sure|yep|yeah|sounds?\s*good|go\s*ahead|confirm|do\s*it|book\s*it|absolutely|definitely|please)$/i;
const NO_PATTERNS = /^(no|n|nope|nah|cancel|not?\s*now|never\s*mind|stop|don'?t|forget\s*it)$/i;
let AiService = AiService_1 = class AiService {
    prisma;
    configService;
    slotsService;
    bookingService;
    eventsGateway;
    carrierService;
    logger = new Logger(AiService_1.name);
    aiProvider;
    aiApiKey;
    aiModel;
    aiBaseUrl;
    aiTestMode;
    constructor(prisma, configService, slotsService, bookingService, eventsGateway, carrierService) {
        this.prisma = prisma;
        this.configService = configService;
        this.slotsService = slotsService;
        this.bookingService = bookingService;
        this.eventsGateway = eventsGateway;
        this.carrierService = carrierService;
        this.aiProvider = this.configService.get('AI_PROVIDER', 'rule-based');
        this.aiApiKey = this.configService.get('AI_API_KEY');
        this.aiModel = this.configService.get('AI_MODEL', 'openai/gpt-oss-120b:free');
        this.aiBaseUrl = this.configService.get('AI_BASE_URL', 'https://openrouter.ai/api/v1');
        this.aiTestMode =
            this.configService.get('AI_TEST_MODE', 'false') === 'true';
        this.logger.log(`AI config → provider=${this.aiProvider} model=${this.aiModel} testMode=${this.aiTestMode}`);
    }
    async createSession(user) {
        return this.prisma.aiSession.create({
            data: { userId: user.id },
        });
    }
    async startNewChat(user) {
        const initialState = {
            currentIntent: ConversationIntent.NONE,
            status: ConversationStatus.IDLE,
            lastQuestionType: QuestionType.NONE,
            context: {},
        };
        const session = await this.prisma.aiSession.create({
            data: {
                userId: user.id,
                currentIntent: initialState.currentIntent,
                status: initialState.status,
                lastQuestionType: initialState.lastQuestionType,
                context: initialState.context,
            },
        });
        const greeting = 'Hi 👋 How can I help you today?';
        await this.prisma.aiMessage.create({
            data: {
                sessionId: session.id,
                role: 'ASSISTANT',
                content: greeting,
            },
        });
        this.logger.log(`[NEW CHAT] Created session ${session.id} for user ${user.id}`);
        return {
            sessionId: session.id,
            status: 'IDLE',
            greeting,
        };
    }
    async query(dto, user) {
        const session = await this.prisma.aiSession.findUnique({
            where: { id: dto.sessionId },
        });
        if (!session)
            throw new NotFoundException('AI session not found');
        if (session.userId !== user.id) {
            throw new ForbiddenException('Session does not belong to user');
        }
        const state = this.loadConversationState(session);
        this.logger.log(`[STATE] status=${state.status} intent=${state.currentIntent} lastQ=${state.lastQuestionType}`);
        await this.prisma.aiMessage.create({
            data: {
                sessionId: dto.sessionId,
                role: 'USER',
                content: dto.message,
            },
        });
        const history = await this.prisma.aiMessage.findMany({
            where: { sessionId: dto.sessionId },
            orderBy: { timestamp: 'asc' },
            take: 20,
        });
        const containerResult = await this.runContainerStepResolver(dto.message, state, user);
        if (containerResult) {
            this.logger.log(`[CONTAINER RESOLVER] Handled deterministically`);
            await this.updateSessionState(dto.sessionId, containerResult.newState);
            await this.prisma.aiMessage.create({
                data: {
                    sessionId: dto.sessionId,
                    role: 'ASSISTANT',
                    content: containerResult.response,
                },
            });
            return {
                sessionId: dto.sessionId,
                response: containerResult.response,
                state: containerResult.newState,
            };
        }
        const yesNoResult = await this.runYesNoResolver(dto.message, state, user);
        if (yesNoResult) {
            this.logger.log(`[YES/NO RESOLVER] Handled deterministically`);
            await this.updateSessionState(dto.sessionId, yesNoResult.newState);
            await this.prisma.aiMessage.create({
                data: {
                    sessionId: dto.sessionId,
                    role: 'ASSISTANT',
                    content: yesNoResult.response,
                },
            });
            return {
                sessionId: dto.sessionId,
                response: yesNoResult.response,
                state: yesNoResult.newState,
            };
        }
        let response;
        let newState = state;
        if (this.aiApiKey &&
            this.aiApiKey !== 'your-openai-api-key' &&
            this.aiApiKey !== 'your-api-key' &&
            process.env.NODE_ENV !== 'test') {
            const result = await this.processWithLlmStateful(history, dto.message, user, state);
            response = result.response;
            newState = result.newState;
        }
        else {
            const result = await this.processWithRulesStateful(dto.message, user, history, state);
            response = result.response;
            newState = result.newState;
        }
        await this.updateSessionState(dto.sessionId, newState);
        await this.prisma.aiMessage.create({
            data: {
                sessionId: dto.sessionId,
                role: 'ASSISTANT',
                content: response,
            },
        });
        return {
            sessionId: dto.sessionId,
            response,
            state: newState,
        };
    }
    loadConversationState(session) {
        return {
            currentIntent: session.currentIntent ||
                ConversationIntent.NONE,
            status: session.status || ConversationStatus.IDLE,
            lastQuestionType: session.lastQuestionType || QuestionType.NONE,
            context: session.context || {},
        };
    }
    async updateSessionState(sessionId, state) {
        await this.prisma.aiSession.update({
            where: { id: sessionId },
            data: {
                currentIntent: state.currentIntent,
                status: state.status,
                lastQuestionType: state.lastQuestionType,
                context: state.context,
            },
        });
    }
    resetState() {
        return {
            currentIntent: ConversationIntent.NONE,
            status: ConversationStatus.IDLE,
            lastQuestionType: QuestionType.NONE,
            context: {},
        };
    }
    SHOW_CONTAINERS_PATTERNS = /^(show|list|my|pick|choose|select|get|display|see)\s*(me\s+)?(my\s+)?(the\s+)?(containers?|container\s*list|available\s*containers?)$/i;
    CONTAINER_NUMBER_PATTERN = /^[A-Z0-9]{3,15}$/i;
    async runContainerStepResolver(message, state, user) {
        const trimmedMsg = message.trim();
        const lowerMsg = trimmedMsg.toLowerCase();
        const containerStatuses = [
            ConversationStatus.AWAITING_CONTAINER,
            ConversationStatus.CONTAINER_LIST_SHOWN,
            ConversationStatus.BOOKING_IN_PROGRESS,
        ];
        if (!containerStatuses.includes(state.status)) {
            return null;
        }
        if (this.SHOW_CONTAINERS_PATTERNS.test(trimmedMsg) ||
            (lowerMsg.includes('show') && lowerMsg.includes('container')) ||
            (lowerMsg.includes('list') && lowerMsg.includes('container')) ||
            lowerMsg.includes('my container') ||
            lowerMsg === 'containers') {
            return this.handleShowContainersRequest(state, user);
        }
        if (state.status === ConversationStatus.CONTAINER_LIST_SHOWN) {
            const containerNumber = parseInt(trimmedMsg, 10);
            if (!isNaN(containerNumber) &&
                state.context.containerCandidates &&
                containerNumber >= 1 &&
                containerNumber <= state.context.containerCandidates.length) {
                return this.handleContainerSelection(containerNumber, state, user);
            }
        }
        const cleanedInput = trimmedMsg.replace(/[-\s]/g, '').toUpperCase();
        if (this.CONTAINER_NUMBER_PATTERN.test(cleanedInput)) {
            return this.handleContainerNumberInput(cleanedInput, state, user);
        }
        if (state.context.lastPromptType === 'PROVIDE_CONTAINER' &&
            state.context.lastPromptTimestamp &&
            Date.now() - state.context.lastPromptTimestamp < 60000) {
            return {
                response: `I didn't recognize that as a container number.\n\n` +
                    `You can:\n` +
                    `• Type a container number (e.g., MSKU1234567 or ABC123)\n` +
                    `• Say "show my containers" to see your list\n` +
                    `• Say "cancel" to stop the booking`,
                newState: {
                    ...state,
                    context: {
                        ...state.context,
                        lastPromptType: 'CONTAINER_HELP',
                        lastPromptTimestamp: Date.now(),
                    },
                },
            };
        }
        return null;
    }
    async handleShowContainersRequest(state, user) {
        try {
            const containers = await this.carrierService.getMyContainers(user.id);
            if (!containers || containers.length === 0) {
                return {
                    response: `You don't have any containers registered in your account.\n\n` +
                        `You can:\n` +
                        `• Type a container number manually (e.g., MSKU1234567)\n` +
                        `• Register a container first in the Carrier section`,
                    newState: {
                        ...state,
                        context: {
                            ...state.context,
                            lastPromptType: 'NO_CONTAINERS',
                            lastPromptTimestamp: Date.now(),
                        },
                    },
                };
            }
            const containerCandidates = containers.map((c) => ({
                id: c.id,
                containerNumber: c.containerNumber,
                size: 'Standard',
                status: c.status || 'available',
            }));
            const containerList = containerCandidates
                .map((c, i) => `${i + 1}. **${c.containerNumber}** (${c.size}) - ${c.status}`)
                .join('\n');
            const newState = {
                ...state,
                status: ConversationStatus.CONTAINER_LIST_SHOWN,
                lastQuestionType: QuestionType.SELECT_CONTAINER,
                context: {
                    ...state.context,
                    containerCandidates,
                    lastPromptType: 'CONTAINER_LIST',
                    lastPromptTimestamp: Date.now(),
                },
            };
            return {
                response: `Here are your containers. Pick one:\n\n${containerList}\n\n` +
                    `Reply with the number or type the container number directly.`,
                newState,
            };
        }
        catch (error) {
            this.logger.error(`Error fetching containers: ${error}`);
            return {
                response: `I couldn't fetch your containers right now. Please type your container number manually (e.g., MSKU1234567).`,
                newState: state,
            };
        }
    }
    async handleContainerSelection(selectionNumber, state, user) {
        if (!state.context.containerCandidates) {
            return {
                response: `I don't have a container list. Please type your container number or say "show my containers".`,
                newState: state,
            };
        }
        const selectedContainer = state.context.containerCandidates[selectionNumber - 1];
        if (!selectedContainer) {
            return {
                response: `Please select a valid number (1-${state.context.containerCandidates.length}).`,
                newState: state,
            };
        }
        return this.completeContainerSelection(selectedContainer.containerNumber, selectedContainer.id, state, user);
    }
    async handleContainerNumberInput(containerNumber, state, user) {
        let containerId;
        try {
            const containers = await this.carrierService.getMyContainers(user.id);
            const existingContainer = containers.find((c) => c.containerNumber.toUpperCase() === containerNumber.toUpperCase());
            if (existingContainer) {
                containerId = existingContainer.id;
            }
            else {
                const dbContainer = await this.prisma.container.findUnique({
                    where: { containerNumber: containerNumber.toUpperCase() },
                });
                if (dbContainer) {
                    containerId = dbContainer.id;
                }
            }
        }
        catch (error) {
            this.logger.warn(`Container lookup failed: ${error}`);
        }
        return this.completeContainerSelection(containerNumber, containerId, state, user);
    }
    async completeContainerSelection(containerNumber, containerId, state, user) {
        const upperContainerNumber = containerNumber.toUpperCase();
        if (state.context.containerNumber === upperContainerNumber ||
            state.context.bookingDraft?.containerNumber === upperContainerNumber) {
            return {
                response: `Container **${upperContainerNumber}** is already selected for this booking.\n\n` +
                    `Would you like to:\n` +
                    `• Confirm and complete the booking? (say "yes" or "confirm")\n` +
                    `• Choose a different container? (say "change container")\n` +
                    `• Cancel the booking? (say "cancel")`,
                newState: {
                    ...state,
                    status: ConversationStatus.AWAITING_CONFIRMATION,
                    lastQuestionType: QuestionType.CONFIRM_BOOK_SLOT,
                },
            };
        }
        const newState = {
            ...state,
            status: ConversationStatus.CONTAINER_SELECTED,
            lastQuestionType: QuestionType.NONE,
            context: {
                ...state.context,
                containerNumber: upperContainerNumber,
                selectedContainerId: containerId,
                bookingDraft: {
                    ...state.context.bookingDraft,
                    containerNumber: upperContainerNumber,
                },
                lastPromptType: 'CONTAINER_CONFIRMED',
                lastPromptTimestamp: Date.now(),
            },
        };
        const slotInfo = state.context.slotCandidates?.[state.context.selectedSlotIndex ?? 0];
        const slotDescription = slotInfo
            ? `${slotInfo.terminal}: ${slotInfo.start}-${slotInfo.end} on ${slotInfo.date}`
            : 'your selected slot';
        return {
            response: `Great! Container **${upperContainerNumber}** selected.\n\n` +
                `📋 **Booking Summary:**\n` +
                `• Slot: ${slotDescription}\n` +
                `• Container: ${upperContainerNumber}\n\n` +
                `Would you like to add a truck plate (optional)? Or say "confirm" to complete the booking.`,
            newState: {
                ...newState,
                status: ConversationStatus.AWAITING_CONFIRMATION,
                lastQuestionType: QuestionType.CONFIRM_BOOK_SLOT,
            },
        };
    }
    async runYesNoResolver(message, state, user) {
        const trimmedMsg = message.trim();
        const confirmationStatuses = [
            ConversationStatus.AWAITING_CONFIRMATION,
            ConversationStatus.SUGGESTED_SLOTS_SHOWN,
        ];
        if (!confirmationStatuses.includes(state.status)) {
            return null;
        }
        const isYes = YES_PATTERNS.test(trimmedMsg);
        const isNo = NO_PATTERNS.test(trimmedMsg);
        if (!isYes && !isNo) {
            const slotNumber = parseInt(trimmedMsg, 10);
            if (!isNaN(slotNumber) &&
                state.context.slotCandidates &&
                slotNumber >= 1 &&
                slotNumber <= state.context.slotCandidates.length) {
                return this.handleSlotSelection(slotNumber, state, user);
            }
            return null;
        }
        if (isYes) {
            return this.handleYesResponse(state, user);
        }
        if (isNo) {
            return this.handleNoResponse(state, user);
        }
        return null;
    }
    async handleYesResponse(state, user) {
        const newState = { ...state, context: { ...state.context } };
        switch (state.lastQuestionType) {
            case QuestionType.CONFIRM_BOOK_SLOT:
                if (state.context.slotCandidates &&
                    state.context.slotCandidates.length > 0) {
                    if (state.context.slotCandidates.length === 1) {
                        newState.status = ConversationStatus.BOOKING_IN_PROGRESS;
                        newState.lastQuestionType = QuestionType.NONE;
                        newState.context.suggestedSlotId =
                            state.context.slotCandidates[0].slotId;
                        const slot = state.context.slotCandidates[0];
                        return {
                            response: `Great! 👍 I'll book ${slot.terminal} from ${slot.start} to ${slot.end} on ${slot.date}.\n\n` +
                                `Please provide your container number and truck plate (if applicable) to complete the booking.`,
                            newState,
                        };
                    }
                    else {
                        newState.status = ConversationStatus.AWAITING_SLOT_SELECTION;
                        newState.lastQuestionType = QuestionType.SELECT_SLOT;
                        const slotList = state.context.slotCandidates
                            .map((s, i) => `${i + 1}. ${s.terminal}: ${s.start}-${s.end} (${s.capacity})`)
                            .join('\n');
                        return {
                            response: `Great! 👍 Which slot would you like to book? Reply with the number:\n\n${slotList}`,
                            newState,
                        };
                    }
                }
                break;
            case QuestionType.SELECT_SLOT:
                if (state.context.slotCandidates) {
                    const slotList = state.context.slotCandidates
                        .map((s, i) => `${i + 1}. ${s.terminal}: ${s.start}-${s.end}`)
                        .join('\n');
                    return {
                        response: `Please pick a slot number:\n\n${slotList}`,
                        newState: state,
                    };
                }
                break;
            case QuestionType.CONFIRM_CANCEL:
                newState.status = ConversationStatus.COMPLETED;
                newState.currentIntent = ConversationIntent.NONE;
                return {
                    response: `Booking cancelled. Is there anything else I can help you with?`,
                    newState: this.resetState(),
                };
            default:
                if (state.status === ConversationStatus.SUGGESTED_SLOTS_SHOWN) {
                    return this.handleYesResponse({ ...state, lastQuestionType: QuestionType.CONFIRM_BOOK_SLOT }, user);
                }
        }
        return {
            response: `Okay! What would you like to do next?`,
            newState: this.resetState(),
        };
    }
    async handleNoResponse(state, user) {
        const newState = { ...state, context: { ...state.context } };
        switch (state.lastQuestionType) {
            case QuestionType.CONFIRM_BOOK_SLOT:
            case QuestionType.SELECT_SLOT:
                newState.status = ConversationStatus.IDLE;
                newState.lastQuestionType = QuestionType.NONE;
                newState.context.slotCandidates = undefined;
                return {
                    response: `No problem! Would you like me to show you:\n` +
                        `• Different time slots?\n` +
                        `• A different terminal?\n` +
                        `• A different date?\n\n` +
                        `Just let me know what you'd prefer.`,
                    newState,
                };
            case QuestionType.CONFIRM_CANCEL:
                newState.status = ConversationStatus.IDLE;
                newState.lastQuestionType = QuestionType.NONE;
                return {
                    response: `Okay, I won't cancel it. Is there anything else you need?`,
                    newState,
                };
            default:
                return {
                    response: `Alright, no worries. What would you like to do instead?`,
                    newState: this.resetState(),
                };
        }
    }
    async handleSlotSelection(slotNumber, state, user) {
        if (!state.context.slotCandidates) {
            return {
                response: `I don't have any slots to select from. Would you like me to show available slots?`,
                newState: this.resetState(),
            };
        }
        const selectedSlot = state.context.slotCandidates[slotNumber - 1];
        if (!selectedSlot) {
            return {
                response: `Please select a valid slot number (1-${state.context.slotCandidates.length}).`,
                newState: state,
            };
        }
        const newState = {
            ...state,
            status: ConversationStatus.AWAITING_CONTAINER,
            lastQuestionType: QuestionType.PROVIDE_CONTAINER,
            context: {
                ...state.context,
                suggestedSlotId: selectedSlot.slotId,
                selectedSlotIndex: slotNumber - 1,
                bookingDraft: {
                    slotId: selectedSlot.slotId,
                    terminalId: selectedSlot.terminalId,
                    timeSlotId: selectedSlot.slotId,
                },
                lastPromptType: 'PROVIDE_CONTAINER',
                lastPromptTimestamp: Date.now(),
            },
        };
        return {
            response: `Perfect! You selected **${selectedSlot.terminal}**: ${selectedSlot.start}-${selectedSlot.end} on ${selectedSlot.date}.\n\n` +
                `Now I need your container number to complete the booking.\n\n` +
                `You can:\n` +
                `• Type your container number (e.g., MSKU1234567)\n` +
                `• Say "show my containers" to choose from your list`,
            newState,
        };
    }
    async getHistory(sessionId, user) {
        const session = await this.prisma.aiSession.findUnique({
            where: { id: sessionId },
        });
        if (!session)
            throw new NotFoundException('AI session not found');
        if (session.userId !== user.id) {
            throw new ForbiddenException('Session does not belong to user');
        }
        return this.prisma.aiMessage.findMany({
            where: { sessionId },
            orderBy: { timestamp: 'asc' },
        });
    }
    async processWithLlm(history, message, user) {
        try {
            const systemPrompt = this.buildSystemPrompt(user, history);
            const messages = [
                { role: 'system', content: systemPrompt },
                ...history.map((m) => ({
                    role: m.role.toLowerCase() === 'user' ? 'user' : 'assistant',
                    content: m.content,
                })),
            ];
            this.logger.log(`[AI CALL] model=${this.aiModel} promptMessages=${messages.length} promptChars=${JSON.stringify(messages).length}`);
            const response = await fetch(`${this.aiBaseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.aiApiKey}`,
                    'HTTP-Referer': 'https://portflow.ai',
                    'X-Title': 'PORTFLOW AI',
                },
                body: JSON.stringify({
                    model: this.aiModel,
                    messages,
                    tools: toOpenAiTools(),
                    tool_choice: 'auto',
                    temperature: 0.7,
                    max_tokens: 1024,
                    provider: { data_collection: 'allow' },
                }),
            });
            this.logger.log(`[AI RESPONSE] status=${response.status}`);
            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`[AI PROVIDER ERROR] ${this.aiProvider} ${response.status}: ${errorText}`);
                this.logger.warn('[AI FALLBACK USED] Switching to rule-based due to provider error');
                return this.processWithRules(message, user);
            }
            const data = await response.json();
            const choice = data.choices?.[0];
            if (!choice) {
                this.logger.warn('[AI FALLBACK USED] No choices returned from provider');
                return this.processWithRules(message, user);
            }
            if (choice.message?.tool_calls?.length > 0) {
                this.logger.log('[AI REAL RESPONSE] Tool calls received, executing...');
                return await this.handleToolCalls(choice.message, messages, user);
            }
            this.logger.log('[AI REAL RESPONSE] Direct text response received');
            return (choice.message?.content ||
                'I apologize, I could not process that request.');
        }
        catch (error) {
            this.logger.error(`[AI PROVIDER ERROR] LLM processing exception: ${error}`);
            this.logger.warn('[AI FALLBACK USED] Switching to rule-based due to exception');
            return this.processWithRules(message, user);
        }
    }
    async handleToolCalls(assistantMessage, messages, user) {
        const toolResults = [];
        for (const toolCall of assistantMessage.tool_calls) {
            const functionName = toolCall.function.name;
            const args = JSON.parse(toolCall.function.arguments || '{}');
            this.logger.log(`AI tool call: ${functionName}(${JSON.stringify(args)})`);
            let result;
            try {
                result = await this.executeTool(functionName, args, user);
            }
            catch (error) {
                result = { error: error.message || 'Tool execution failed' };
            }
            toolResults.push({
                role: 'tool',
                tool_call_id: toolCall.id,
                content: JSON.stringify(result),
            });
            await this.prisma.aiMessage
                .create({
                data: {
                    sessionId: messages[1]?.sessionId || '',
                    role: 'TOOL',
                    content: JSON.stringify({
                        tool: functionName,
                        args,
                        result: typeof result === 'string'
                            ? result
                            : JSON.stringify(result).slice(0, 500),
                    }),
                },
            })
                .catch(() => {
            });
        }
        try {
            const followUp = await fetch(`${this.aiBaseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.aiApiKey}`,
                    'HTTP-Referer': 'https://portflow.ai',
                    'X-Title': 'PORTFLOW AI',
                },
                body: JSON.stringify({
                    model: this.aiModel,
                    messages: [...messages, assistantMessage, ...toolResults],
                    temperature: 0.7,
                    max_tokens: 1024,
                }),
            });
            if (followUp.ok) {
                const followUpData = await followUp.json();
                return (followUpData.choices?.[0]?.message?.content ||
                    'Here are your results.');
            }
        }
        catch (error) {
            this.logger.error(`LLM follow-up error: ${error}`);
        }
        return toolResults
            .map((r) => {
            const parsed = JSON.parse(r.content);
            return typeof parsed === 'string'
                ? parsed
                : JSON.stringify(parsed, null, 2);
        })
            .join('\n\n');
    }
    async executeTool(name, args, user) {
        switch (name) {
            case 'check_availability':
                return this.toolCheckAvailability(args.terminalId, args.date);
            case 'get_my_bookings':
                return this.toolGetMyBookings(user, args.status);
            case 'get_port_status':
                return this.toolGetPortStatus();
            case 'get_heatmap':
                return this.toolGetHeatmap(args.terminalId);
            case 'track_container':
                return this.toolTrackContainer(args.containerNumber);
            case 'create_booking':
                return this.toolCreateBooking(args, user);
            case 'cancel_booking':
                return this.toolCancelBooking(args.bookingId, user);
            case 'get_operator_queue':
                if (user.role !== 'TERMINAL_OPERATOR' && user.role !== 'PORT_ADMIN') {
                    return {
                        error: 'Access denied. This tool is for terminal operators only. Use get_my_bookings instead.',
                    };
                }
                return this.toolGetOperatorQueue(args.status);
            case 'get_alerts':
                if (user.role !== 'TERMINAL_OPERATOR' && user.role !== 'PORT_ADMIN') {
                    return {
                        error: 'Access denied. This tool is for terminal operators only.',
                    };
                }
                return this.toolGetAlerts();
            default:
                return { error: `Unknown tool: ${name}` };
        }
    }
    async toolCheckAvailability(terminalId, date) {
        const availability = await this.slotsService.getAvailability(terminalId, date);
        return {
            slots: availability.slice(0, 10).map((s) => ({
                id: s.id,
                terminal: s.terminalName,
                start: s.startTime,
                end: s.endTime,
                available: s.availableCount,
                capacity: s.capacity,
            })),
            total: availability.length,
        };
    }
    async toolGetMyBookings(user, status) {
        const where = { carrierId: user.id };
        if (status) {
            where.status = status;
        }
        const bookings = await this.prisma.booking.findMany({
            where,
            include: {
                terminal: { select: { name: true } },
                timeSlot: { select: { startTime: true, endTime: true } },
                container: { select: { containerNumber: true } },
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
        });
        return {
            bookings: bookings.map((b) => ({
                id: b.id,
                terminal: b.terminal?.name || 'N/A',
                container: b.container?.containerNumber || 'N/A',
                status: b.status,
                startTime: b.timeSlot?.startTime,
                endTime: b.timeSlot?.endTime,
            })),
            total: bookings.length,
            summary: {
                pending: bookings.filter((b) => b.status === 'PENDING').length,
                confirmed: bookings.filter((b) => b.status === 'CONFIRMED').length,
                atRisk: bookings.filter((b) => b.status === 'AT_RISK').length,
            },
        };
    }
    async toolGetPortStatus() {
        const now = new Date();
        const terminals = await this.prisma.terminal.findMany({
            where: { isActive: true },
            include: {
                _count: {
                    select: {
                        bookings: {
                            where: { status: { in: ['PENDING', 'CONFIRMED'] } },
                        },
                    },
                },
            },
        });
        return terminals.map((t) => ({
            name: t.name,
            location: t.location,
            activeBookings: t._count.bookings,
        }));
    }
    async toolGetHeatmap(terminalId) {
        return this.slotsService.getHeatmap(terminalId);
    }
    async toolTrackContainer(containerNumber) {
        const container = await this.prisma.container.findUnique({
            where: { containerNumber },
            include: {
                trackingEvents: {
                    orderBy: { timestamp: 'desc' },
                    take: 10,
                },
            },
        });
        if (!container) {
            return { error: `Container ${containerNumber} not found` };
        }
        return {
            containerNumber: container.containerNumber,
            events: container.trackingEvents.map((e) => ({
                type: e.type,
                location: e.location,
                timestamp: e.timestamp,
            })),
        };
    }
    async toolCreateBooking(args, user) {
        if (user.role !== 'CARRIER') {
            return { error: 'Only carriers can create bookings' };
        }
        try {
            const booking = await this.bookingService.create({
                terminalId: args.terminalId,
                timeSlotId: args.timeSlotId,
                truckId: args.truckId,
                containerId: args.containerId || '',
            }, user);
            return {
                id: booking.id,
                status: booking.status,
                message: 'Booking created successfully. Waiting for operator approval.',
            };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async toolCancelBooking(bookingId, user) {
        try {
            await this.bookingService.cancel(bookingId, user.id);
            return { message: `Booking ${bookingId} cancelled successfully.` };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async toolGetOperatorQueue(status) {
        try {
            const where = {};
            if (status) {
                where.status = status;
            }
            const bookings = await this.prisma.booking.findMany({
                where,
                include: {
                    terminal: { select: { name: true } },
                    timeSlot: { select: { startTime: true, endTime: true } },
                    carrier: { select: { email: true } },
                    container: { select: { containerNumber: true } },
                },
                orderBy: { createdAt: 'desc' },
                take: 20,
            });
            return {
                bookings: bookings.map((b) => ({
                    id: b.id,
                    terminal: b.terminal.name,
                    carrier: b.carrier.email,
                    container: b.container?.containerNumber || 'N/A',
                    status: b.status,
                    startTime: b.timeSlot.startTime,
                    endTime: b.timeSlot.endTime,
                    createdAt: b.createdAt,
                })),
                total: bookings.length,
                summary: {
                    pending: bookings.filter((b) => b.status === 'PENDING').length,
                    confirmed: bookings.filter((b) => b.status === 'CONFIRMED').length,
                    atRisk: bookings.filter((b) => b.status === 'AT_RISK').length,
                    readyToGo: bookings.filter((b) => b.status === 'READY_TO_GO').length,
                },
            };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async toolGetAlerts() {
        try {
            const atRiskBookings = await this.prisma.booking.findMany({
                where: { status: 'AT_RISK' },
                include: {
                    terminal: { select: { name: true } },
                    carrier: { select: { email: true } },
                    timeSlot: { select: { startTime: true } },
                },
                take: 10,
            });
            const pendingCount = await this.prisma.booking.count({
                where: { status: 'PENDING' },
            });
            const alerts = [];
            if (atRiskBookings.length > 0) {
                alerts.push({
                    type: 'AT_RISK',
                    severity: 'high',
                    message: `${atRiskBookings.length} booking(s) are at risk of missing their slots`,
                    bookings: atRiskBookings.map((b) => ({
                        id: b.id,
                        carrier: b.carrier.email,
                        terminal: b.terminal.name,
                        slotTime: b.timeSlot.startTime,
                    })),
                });
            }
            if (pendingCount > 5) {
                alerts.push({
                    type: 'QUEUE_BACKLOG',
                    severity: 'medium',
                    message: `${pendingCount} bookings are pending approval`,
                });
            }
            return {
                alerts,
                summary: `${alerts.length} active alert(s)`,
            };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async processWithLlmStateful(history, message, user, state) {
        const systemPrompt = this.buildSystemPromptStateful(user, history, state);
        try {
            const messages = [
                { role: 'system', content: systemPrompt },
                ...history.map((m) => ({
                    role: m.role.toLowerCase() === 'user' ? 'user' : 'assistant',
                    content: m.content,
                })),
            ];
            this.logger.log(`[AI STATEFUL CALL] status=${state.status} intent=${state.currentIntent}`);
            const response = await fetch(`${this.aiBaseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.aiApiKey}`,
                    'HTTP-Referer': 'https://portflow.ai',
                    'X-Title': 'PORTFLOW AI',
                },
                body: JSON.stringify({
                    model: this.aiModel,
                    messages,
                    tools: toOpenAiTools(),
                    tool_choice: 'auto',
                    temperature: 0.7,
                    max_tokens: 1024,
                }),
            });
            if (!response.ok) {
                const result = await this.processWithRulesStateful(message, user, history, state);
                return result;
            }
            const data = await response.json();
            const choice = data.choices?.[0];
            if (!choice) {
                return this.processWithRulesStateful(message, user, history, state);
            }
            if (choice.message?.tool_calls?.length > 0) {
                const toolResponse = await this.handleToolCallsStateful(choice.message, messages, user, state);
                return toolResponse;
            }
            const newState = this.inferStateFromResponse(choice.message?.content || '', state);
            return {
                response: choice.message?.content || 'I apologize, I could not process that.',
                newState,
            };
        }
        catch (error) {
            this.logger.error(`[AI STATEFUL ERROR] ${error}`);
            return this.processWithRulesStateful(message, user, history, state);
        }
    }
    async handleToolCallsStateful(assistantMessage, messages, user, state) {
        const response = await this.handleToolCalls(assistantMessage, messages, user);
        const newState = this.inferStateFromResponse(response, state);
        return { response, newState };
    }
    inferStateFromResponse(response, currentState) {
        const lowerResponse = response.toLowerCase();
        const newState = { ...currentState, context: { ...currentState.context } };
        if (lowerResponse.includes('available slots') ||
            lowerResponse.includes('here are the slots') ||
            lowerResponse.includes('found these slots')) {
            newState.status = ConversationStatus.SUGGESTED_SLOTS_SHOWN;
            newState.currentIntent = ConversationIntent.BOOK_SLOT;
            const slotCandidates = this.extractSlotsFromResponse(response);
            if (slotCandidates.length > 0) {
                newState.context.slotCandidates = slotCandidates;
            }
        }
        if (lowerResponse.includes('would you like to book') ||
            lowerResponse.includes('shall i book') ||
            lowerResponse.includes('want me to book')) {
            newState.status = ConversationStatus.AWAITING_CONFIRMATION;
            newState.lastQuestionType = QuestionType.CONFIRM_BOOK_SLOT;
        }
        if (lowerResponse.includes('which slot') ||
            lowerResponse.includes('pick a slot') ||
            lowerResponse.includes('select a slot') ||
            lowerResponse.includes('reply with the number')) {
            newState.status = ConversationStatus.AWAITING_SLOT_SELECTION;
            newState.lastQuestionType = QuestionType.SELECT_SLOT;
        }
        if (lowerResponse.includes('provide your container') ||
            lowerResponse.includes('complete your booking') ||
            lowerResponse.includes("i'll book")) {
            newState.status = ConversationStatus.BOOKING_IN_PROGRESS;
        }
        if (lowerResponse.includes('booking confirmed') ||
            lowerResponse.includes('successfully booked') ||
            lowerResponse.includes('booking complete')) {
            newState.status = ConversationStatus.COMPLETED;
        }
        if (lowerResponse.includes('cancelled') ||
            lowerResponse.includes('canceled')) {
            newState.status = ConversationStatus.CANCELED;
        }
        return newState;
    }
    extractSlotsFromResponse(response) {
        const slots = [];
        const slotPattern = /(?:(\d+)[.)\s]+)?(?:terminal\s*)?([A-Za-z0-9]+)[:\s]+(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/gi;
        let match;
        while ((match = slotPattern.exec(response)) !== null) {
            slots.push({
                slotId: `slot-${slots.length + 1}`,
                terminal: `Terminal ${match[2].toUpperCase()}`,
                terminalId: match[2].toLowerCase(),
                start: match[3],
                end: match[4],
                capacity: 'available',
                date: new Date().toISOString().split('T')[0],
            });
        }
        return slots;
    }
    buildSystemPromptStateful(user, history, state) {
        const basePrompt = this.buildSystemPrompt(user, history);
        const stateContext = `\n\n─── CONVERSATION STATE (CRITICAL) ───\n` +
            `Status: ${state.status}\n` +
            `Intent: ${state.currentIntent}\n` +
            `Last Question: ${state.lastQuestionType}\n` +
            `Context: ${JSON.stringify(state.context)}\n\n` +
            `IMPORTANT STATE RULES:\n` +
            `- Current status is ${state.status}\n` +
            (state.status !== ConversationStatus.IDLE
                ? '- DO NOT show help menu or capability list - we are in the middle of a task!\n' +
                    '- Continue the current flow until completion or explicit cancellation\n'
                : '') +
            (state.lastQuestionType !== QuestionType.NONE
                ? `- You asked a ${state.lastQuestionType} question - expect an answer to that\n`
                : '');
        return basePrompt + stateContext;
    }
    async processWithRules(message, user, history = []) {
        const lowerMsg = message.toLowerCase().trim();
        const lastAssistantMsg = [...history]
            .reverse()
            .find((m) => m.role === 'ASSISTANT');
        const lastAssistantContent = lastAssistantMsg?.content?.toLowerCase() || '';
        const isFollowUp = this.isShortAnswer(lowerMsg);
        const hasOngoingTask = this.detectOngoingTask(lastAssistantContent);
        try {
            if (isFollowUp && lastAssistantContent) {
                const contextResponse = await this.handleContextualResponse(lowerMsg, lastAssistantContent, user);
                if (contextResponse) {
                    return contextResponse;
                }
            }
            if (hasOngoingTask &&
                !lowerMsg.includes('help') &&
                !lowerMsg.includes('cancel')) {
                const currentEntities = this.extractEntities(message);
                const hasNewInfo = Object.values(currentEntities).some((v) => v !== undefined);
                if (hasNewInfo || this.isShortAnswer(lowerMsg)) {
                    return await this.continueTaskFlowWithContext(history, message, user);
                }
                return await this.continueTaskFlowWithContext(history, message, user);
            }
            if (!hasOngoingTask &&
                (/^(hey|hi|hello|yo|sup|greetings|good morning|good afternoon|good evening|howdy|hiya)\b/i.test(lowerMsg) ||
                    lowerMsg === 'hey' ||
                    lowerMsg === 'hi' ||
                    lowerMsg === 'hello')) {
                const greetings = [
                    `Hey there! How can I help you today?`,
                    `Hello! What can I assist you with?`,
                    `Hi! How can I help you with your port operations?`,
                    `Hey! What would you like to know?`,
                ];
                return greetings[Math.floor(Math.random() * greetings.length)];
            }
            if (lowerMsg.includes('available') ||
                lowerMsg.includes('availability') ||
                lowerMsg.includes('slot') ||
                lowerMsg.includes('free')) {
                return await this.handleAvailabilityQuery(lowerMsg);
            }
            if (lowerMsg.includes('my booking') ||
                lowerMsg.includes('my reservation') ||
                lowerMsg.includes('my trips')) {
                return await this.handleMyBookingsQuery(user);
            }
            if (lowerMsg.includes('pending') ||
                lowerMsg.includes('queue') ||
                lowerMsg.includes('approve') ||
                lowerMsg.includes('waiting') ||
                (lowerMsg.includes('booking') && user.role === 'TERMINAL_OPERATOR')) {
                return await this.handleOperatorQueueQuery();
            }
            if (lowerMsg.includes('alert') ||
                lowerMsg.includes('risk') ||
                lowerMsg.includes('warning')) {
                return await this.handleAlertsQuery();
            }
            if (lowerMsg.includes('book') ||
                lowerMsg.includes('reserve') ||
                lowerMsg.includes('create booking')) {
                return this.handleBookingIntent();
            }
            if (lowerMsg.includes('cancel')) {
                return this.handleCancelIntent();
            }
            if (lowerMsg.includes('track') || lowerMsg.includes('container')) {
                const containerMatch = message.match(/[A-Z]{4}\d{7}/i);
                if (containerMatch) {
                    return await this.handleContainerTrack(containerMatch[0].toUpperCase());
                }
                return 'Please provide a container number (e.g., MSKU1234567) to track.';
            }
            if (lowerMsg.includes('status') ||
                lowerMsg.includes('pulse') ||
                lowerMsg.includes('congestion') ||
                lowerMsg.includes('busy')) {
                return await this.handleStatusQuery();
            }
            if (lowerMsg === 'help' ||
                lowerMsg.includes('what can you do') ||
                lowerMsg.includes('what can you help') ||
                lowerMsg.includes('what are your capabilities') ||
                lowerMsg.includes('show me what you can do')) {
                return this.handleHelpQuery(user);
            }
            return (`I'm not quite sure what you're asking about. ` +
                `Could you be more specific? For example, you can ask me about:\n` +
                `- Your bookings or slot availability\n` +
                `- Container tracking\n` +
                `- Port status\n\n` +
                `Or just say "help" to see everything I can do!`);
        }
        catch (error) {
            this.logger.error(`AI rule-based processing error: ${error}`);
            return 'I encountered an error processing your request. Please try again.';
        }
    }
    async processWithRulesStateful(message, user, history, state) {
        const lowerMsg = message.toLowerCase().trim();
        let newState = { ...state, context: { ...state.context } };
        const isInProgress = state.status !== ConversationStatus.IDLE;
        if (lowerMsg === 'cancel' ||
            lowerMsg === 'stop' ||
            lowerMsg === 'nevermind') {
            return {
                response: 'Okay, cancelled. What would you like to do instead?',
                newState: this.resetState(),
            };
        }
        if (lowerMsg === 'help' ||
            lowerMsg.includes('what can you do') ||
            lowerMsg.includes('what can you help')) {
            return {
                response: this.handleHelpQuery(user),
                newState: isInProgress ? state : this.resetState(),
            };
        }
        switch (state.status) {
            case ConversationStatus.SUGGESTED_SLOTS_SHOWN:
            case ConversationStatus.AWAITING_CONFIRMATION: {
                const entities = this.extractEntities(message);
                Object.keys(entities).forEach((key) => {
                    if (entities[key]) {
                        newState.context[key] = entities[key];
                    }
                });
                const slotNum = parseInt(lowerMsg, 10);
                if (!isNaN(slotNum) && state.context.slotCandidates) {
                    if (slotNum >= 1 && slotNum <= state.context.slotCandidates.length) {
                        const selected = state.context.slotCandidates[slotNum - 1];
                        newState.context.suggestedSlotId = selected.slotId;
                        newState.status = ConversationStatus.BOOKING_IN_PROGRESS;
                        newState.lastQuestionType = QuestionType.NONE;
                        return {
                            response: `Great choice! You selected ${selected.terminal}: ${selected.start}-${selected.end}.\n\n` +
                                `To complete booking, please provide your container number (e.g., MSKU1234567).`,
                            newState,
                        };
                    }
                }
                const missing = this.getMissingSlotsStateful(state.currentIntent, newState.context);
                if (missing.length > 0) {
                    newState.lastQuestionType = this.getQuestionTypeForSlot(missing[0]);
                    return {
                        response: this.askForNextSlotStateful(missing[0], newState.context),
                        newState,
                    };
                }
                if (state.context.slotCandidates &&
                    state.context.slotCandidates.length > 0) {
                    return {
                        response: `Would you like me to proceed with booking one of these slots?`,
                        newState: {
                            ...newState,
                            status: ConversationStatus.AWAITING_CONFIRMATION,
                            lastQuestionType: QuestionType.CONFIRM_BOOK_SLOT,
                        },
                    };
                }
                break;
            }
            case ConversationStatus.AWAITING_SLOT_SELECTION: {
                const slotNum = parseInt(lowerMsg, 10);
                if (!isNaN(slotNum) && state.context.slotCandidates) {
                    if (slotNum >= 1 && slotNum <= state.context.slotCandidates.length) {
                        const selected = state.context.slotCandidates[slotNum - 1];
                        newState.context.suggestedSlotId = selected.slotId;
                        newState.status = ConversationStatus.BOOKING_IN_PROGRESS;
                        return {
                            response: `Perfect! Selected ${selected.terminal}: ${selected.start}-${selected.end}.\n\n` +
                                `Please provide your container number to complete the booking.`,
                            newState,
                        };
                    }
                    else {
                        return {
                            response: `Please select a number between 1 and ${state.context.slotCandidates.length}.`,
                            newState: state,
                        };
                    }
                }
                const entities = this.extractEntities(message);
                if (entities.time && state.context.slotCandidates) {
                    const match = state.context.slotCandidates.find((s) => s.start === entities.time || s.end === entities.time);
                    if (match) {
                        newState.context.suggestedSlotId = match.slotId;
                        newState.status = ConversationStatus.BOOKING_IN_PROGRESS;
                        return {
                            response: `Got it! ${match.terminal}: ${match.start}-${match.end}.\n\n` +
                                `Please provide your container number.`,
                            newState,
                        };
                    }
                }
                const slotList = (state.context.slotCandidates || [])
                    .map((s, i) => `${i + 1}. ${s.terminal}: ${s.start}-${s.end}`)
                    .join('\n');
                return {
                    response: `Which slot would you like? Reply with the number:\n\n${slotList}`,
                    newState: state,
                };
            }
            case ConversationStatus.AWAITING_INFO: {
                const entities = this.extractEntities(message);
                Object.keys(entities).forEach((key) => {
                    if (entities[key]) {
                        newState.context[key] = entities[key];
                    }
                });
                const missing = this.getMissingSlotsStateful(state.currentIntent, newState.context);
                if (missing.length > 0) {
                    newState.lastQuestionType = this.getQuestionTypeForSlot(missing[0]);
                    return {
                        response: this.askForNextSlotStateful(missing[0], newState.context),
                        newState,
                    };
                }
                return this.showSlotsForContext(newState, user);
            }
            case ConversationStatus.BOOKING_IN_PROGRESS: {
                const entities = this.extractEntities(message);
                if (entities.containerNumber) {
                    newState.context.containerNumber = entities.containerNumber;
                }
                if (entities.truckPlate) {
                    newState.context.truckPlate = entities.truckPlate;
                }
                if (newState.context.containerNumber) {
                    newState.status = ConversationStatus.COMPLETED;
                    newState.currentIntent = ConversationIntent.NONE;
                    return {
                        response: `✅ Booking request received!\n\n` +
                            `• Container: ${newState.context.containerNumber}\n` +
                            `• Truck: ${newState.context.truckPlate || 'Not specified'}\n\n` +
                            `Your booking is being processed. Is there anything else I can help with?`,
                        newState: this.resetState(),
                    };
                }
                return {
                    response: `Please provide your container number (e.g., MSKU1234567) to complete the booking.`,
                    newState,
                };
            }
            case ConversationStatus.IDLE:
            default:
                break;
        }
        if (/^(hey|hi|hello|yo|greetings|good morning|good afternoon|good evening)\b/i.test(lowerMsg)) {
            return {
                response: `Hey there! How can I help you today?`,
                newState: this.resetState(),
            };
        }
        if (lowerMsg.includes('available') ||
            lowerMsg.includes('slot') ||
            lowerMsg.includes('book') ||
            lowerMsg.includes('reserve')) {
            const entities = this.extractEntities(message);
            newState.currentIntent = ConversationIntent.BOOK_SLOT;
            newState.context = { ...newState.context, ...entities };
            const missing = this.getMissingSlotsStateful(ConversationIntent.BOOK_SLOT, newState.context);
            if (missing.length === 0 || newState.context.date) {
                return this.showSlotsForContext(newState, user);
            }
            newState.status = ConversationStatus.AWAITING_INFO;
            newState.lastQuestionType = this.getQuestionTypeForSlot(missing[0]);
            return {
                response: this.askForNextSlotStateful(missing[0], newState.context),
                newState,
            };
        }
        if (lowerMsg.includes('my booking') ||
            lowerMsg.includes('my reservation')) {
            const bookingsResponse = await this.handleMyBookingsQuery(user);
            return {
                response: bookingsResponse,
                newState: this.resetState(),
            };
        }
        if (lowerMsg.includes('track') || lowerMsg.includes('where is')) {
            const containerMatch = message.match(/[A-Z]{4}\d{7}/i);
            if (containerMatch) {
                const trackResponse = await this.handleContainerTrack(containerMatch[0].toUpperCase());
                return {
                    response: trackResponse,
                    newState: this.resetState(),
                };
            }
            newState.currentIntent = ConversationIntent.TRACK_CONTAINER;
            newState.status = ConversationStatus.AWAITING_INFO;
            newState.lastQuestionType = QuestionType.PROVIDE_CONTAINER;
            return {
                response: 'What container number would you like to track? (e.g., MSKU1234567)',
                newState,
            };
        }
        if (lowerMsg.includes('status') ||
            lowerMsg.includes('congestion') ||
            lowerMsg.includes('busy')) {
            const statusResponse = await this.handleStatusQuery();
            return {
                response: statusResponse,
                newState: this.resetState(),
            };
        }
        if (isInProgress) {
            const taskName = state.currentIntent === ConversationIntent.BOOK_SLOT
                ? 'booking'
                : state.currentIntent === ConversationIntent.TRACK_CONTAINER
                    ? 'container tracking'
                    : 'your request';
            return {
                response: `I'm helping you with ${taskName}. Could you clarify what you need, or say "cancel" to start over?`,
                newState: state,
            };
        }
        return {
            response: `I'm not sure what you're looking for. Could you tell me more?\n\n` +
                `For example: "Show available slots" or "Track container MSKU1234567"`,
            newState: this.resetState(),
        };
    }
    getMissingSlotsStateful(intent, context) {
        const missing = [];
        switch (intent) {
            case ConversationIntent.BOOK_SLOT:
                if (!context.date)
                    missing.push('date');
                break;
            case ConversationIntent.TRACK_CONTAINER:
                if (!context.containerNumber)
                    missing.push('container');
                break;
            case ConversationIntent.CANCEL_BOOKING:
            case ConversationIntent.RESCHEDULE_BOOKING:
                if (!context.bookingId)
                    missing.push('booking');
                break;
        }
        return missing;
    }
    getQuestionTypeForSlot(slot) {
        switch (slot) {
            case 'terminal':
                return QuestionType.PROVIDE_TERMINAL;
            case 'date':
                return QuestionType.PROVIDE_DATE;
            case 'time':
                return QuestionType.PROVIDE_TIME;
            case 'container':
                return QuestionType.PROVIDE_CONTAINER;
            case 'booking':
                return QuestionType.PROVIDE_BOOKING_ID;
            default:
                return QuestionType.NONE;
        }
    }
    askForNextSlotStateful(slot, context) {
        switch (slot) {
            case 'terminal':
                return 'Which terminal? (e.g., Terminal A, Terminal B)';
            case 'date':
                return 'What date are you looking for? (e.g., tomorrow, next Monday, 2026-02-10)';
            case 'time':
                return `What time on ${context.date || 'that day'}? (e.g., 9am, 14:00, morning)`;
            case 'container':
                return 'What is the container number? (e.g., MSKU1234567)';
            case 'booking':
                return 'Which booking? Please provide the booking ID, or say "show my bookings".';
            default:
                return `Could you provide the ${slot}?`;
        }
    }
    async showSlotsForContext(state, user) {
        const context = state.context;
        const newState = { ...state, context: { ...context } };
        try {
            const availability = await this.slotsService.getAvailability(undefined, context.date);
            let filtered = availability;
            if (context.terminal) {
                filtered = availability.filter((slot) => slot.terminalName
                    .toLowerCase()
                    .includes(context.terminal.toLowerCase().replace('terminal ', '')));
            }
            if (filtered.length === 0) {
                newState.status = ConversationStatus.IDLE;
                return {
                    response: `No slots available for ${context.terminal || 'any terminal'} on ${context.date || 'the requested date'}.\n\n` +
                        `Would you like to try a different date or terminal?`,
                    newState,
                };
            }
            const slotCandidates = filtered
                .slice(0, 5)
                .map((slot, i) => ({
                slotId: slot.id || `slot-${i + 1}`,
                terminal: slot.terminalName,
                terminalId: slot.terminalId || '',
                start: new Date(slot.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                end: new Date(slot.endTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                capacity: `${slot.availableCount}/${slot.capacity}`,
                date: context.date ||
                    new Date(slot.startTime).toISOString().split('T')[0],
            }));
            newState.context.slotCandidates = slotCandidates;
            newState.status = ConversationStatus.SUGGESTED_SLOTS_SHOWN;
            newState.lastQuestionType = QuestionType.CONFIRM_BOOK_SLOT;
            const slotList = slotCandidates
                .map((s, i) => `${i + 1}. **${s.terminal}**: ${s.start}-${s.end} (${s.capacity} spots)`)
                .join('\n');
            return {
                response: `Here are the available slots${context.date ? ` for ${context.date}` : ''}:\n\n` +
                    `${slotList}\n\n` +
                    `Would you like to book one of these?`,
                newState,
            };
        }
        catch (error) {
            this.logger.error(`Error fetching slots: ${error}`);
            return {
                response: 'Sorry, I had trouble fetching available slots. Please try again.',
                newState: this.resetState(),
            };
        }
    }
    isShortAnswer(msg) {
        const shortAnswers = [
            'yes',
            'no',
            'ok',
            'okay',
            'sure',
            'yep',
            'nope',
            'yeah',
            'nah',
            'correct',
            'right',
            'wrong',
            'cancel',
            'stop',
            'done',
            'next',
            'confirm',
            'proceed',
            'go ahead',
            'never mind',
            'nevermind',
        ];
        return shortAnswers.some((a) => msg === a || msg === a + '.' || msg === a + '!');
    }
    extractEntities(message) {
        const lowerMsg = message.toLowerCase();
        const entities = {};
        const terminalMatch = message.match(/terminal\s*([a-z0-9]+)/i);
        if (terminalMatch) {
            entities.terminal = `Terminal ${terminalMatch[1].toUpperCase()}`;
        }
        const isoDateMatch = message.match(/(\d{4}-\d{2}-\d{2})/);
        if (isoDateMatch) {
            entities.date = isoDateMatch[1];
        }
        else if (lowerMsg.includes('today')) {
            entities.date = new Date().toISOString().split('T')[0];
        }
        else if (lowerMsg.includes('tomorrow')) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            entities.date = tomorrow.toISOString().split('T')[0];
        }
        else if (lowerMsg.includes('next week')) {
            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            entities.date = nextWeek.toISOString().split('T')[0];
        }
        const time24Match = message.match(/(\d{1,2}:\d{2})/);
        const time12Match = message.match(/(\d{1,2})\s*(am|pm)/i);
        if (time24Match) {
            entities.time = time24Match[1];
        }
        else if (time12Match) {
            let hour = parseInt(time12Match[1]);
            const isPm = time12Match[2].toLowerCase() === 'pm';
            if (isPm && hour !== 12)
                hour += 12;
            if (!isPm && hour === 12)
                hour = 0;
            entities.time = `${hour.toString().padStart(2, '0')}:00`;
        }
        else if (lowerMsg.includes('morning')) {
            entities.time = '09:00';
        }
        else if (lowerMsg.includes('afternoon')) {
            entities.time = '14:00';
        }
        else if (lowerMsg.includes('evening')) {
            entities.time = '18:00';
        }
        const containerMatch = message.match(/\b([A-Z]{4}\d{7})\b/i);
        if (containerMatch) {
            entities.containerNumber = containerMatch[1].toUpperCase();
        }
        const plateMatch = message.match(/\b([A-Z]{2,3}[-\s]?\d{2,4}[-\s]?[A-Z]{2,3})\b/i);
        if (plateMatch) {
            entities.truckPlate = plateMatch[1].toUpperCase().replace(/\s/g, '-');
        }
        const bookingMatch = message.match(/\b(BK-\d+|[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}|[a-f0-9]{8})\b/i);
        if (bookingMatch) {
            entities.bookingId = bookingMatch[1];
        }
        return entities;
    }
    accumulateContextFromHistory(history) {
        const accumulated = {};
        for (const msg of history) {
            const extracted = this.extractEntities(msg.content);
            Object.keys(extracted).forEach((key) => {
                if (extracted[key])
                    accumulated[key] = extracted[key];
            });
            const lowerContent = msg.content.toLowerCase();
            if (lowerContent.includes('book') ||
                lowerContent.includes('reserve') ||
                lowerContent.includes('slot')) {
                accumulated.task = 'booking';
            }
            else if (lowerContent.includes('cancel') &&
                !lowerContent.includes('no problem')) {
                accumulated.task = 'cancel';
            }
            else if (lowerContent.includes('track') ||
                lowerContent.includes('where is')) {
                accumulated.task = 'track';
            }
            else if (lowerContent.includes('reschedule') ||
                lowerContent.includes('change')) {
                accumulated.task = 'reschedule';
            }
        }
        return accumulated;
    }
    getMissingSlots(task, context) {
        const missing = [];
        switch (task) {
            case 'booking':
                if (!context.terminal)
                    missing.push('terminal');
                if (!context.date)
                    missing.push('date');
                if (!context.time)
                    missing.push('time');
                break;
            case 'cancel':
            case 'reschedule':
                if (!context.bookingId)
                    missing.push('booking ID');
                break;
            case 'track':
                if (!context.containerNumber)
                    missing.push('container number');
                break;
        }
        return missing;
    }
    detectOngoingTask(lastAssistantMsg) {
        const questionIndicators = [
            '?',
            'which one',
            'would you like',
            'do you want',
            'please provide',
            'please specify',
            'let me know',
            'choose',
            'select',
            'confirm',
        ];
        return questionIndicators.some((q) => lastAssistantMsg.includes(q));
    }
    async handleContextualResponse(userMsg, lastAssistantMsg, user) {
        if ([
            'yes',
            'yep',
            'yeah',
            'sure',
            'ok',
            'okay',
            'correct',
            'right',
            'confirm',
            'proceed',
            'go ahead',
        ].includes(userMsg)) {
            if (lastAssistantMsg.includes('show') &&
                lastAssistantMsg.includes('booking')) {
                return await this.handleMyBookingsQuery(user);
            }
            if (lastAssistantMsg.includes('available') ||
                lastAssistantMsg.includes('slot')) {
                return await this.handleAvailabilityQuery('');
            }
            if (lastAssistantMsg.includes('cancel')) {
                return 'Alright, to cancel a booking, please tell me the booking ID or say "show my bookings" to see your bookings first.';
            }
            if (lastAssistantMsg.includes('help')) {
                return this.handleHelpQuery(user);
            }
            return 'Got it! What would you like me to do next?';
        }
        if ([
            'no',
            'nope',
            'nah',
            'wrong',
            'cancel',
            'stop',
            'never mind',
            'nevermind',
        ].includes(userMsg)) {
            return 'No problem! Is there anything else I can help you with?';
        }
        if (['done', 'next'].includes(userMsg)) {
            return 'Great! What would you like to do next?';
        }
        return null;
    }
    async continueTaskFlowWithContext(history, userMsg, user) {
        const context = this.accumulateContextFromHistory(history);
        const currentEntities = this.extractEntities(userMsg);
        Object.keys(currentEntities).forEach((key) => {
            if (currentEntities[key]) {
                context[key] = currentEntities[key];
            }
        });
        const task = context.task || 'unknown';
        const missing = this.getMissingSlots(task, context);
        if (missing.length === 0) {
            return await this.executeCompletedTask(task, context, user);
        }
        const acknowledged = this.buildAcknowledgement(currentEntities);
        const nextQuestion = this.askForNextSlot(missing[0], context);
        if (acknowledged) {
            return `${acknowledged} ${nextQuestion}`;
        }
        return nextQuestion;
    }
    buildAcknowledgement(entities) {
        const parts = [];
        if (entities.terminal)
            parts.push(`Terminal: ${entities.terminal}`);
        if (entities.date)
            parts.push(`Date: ${entities.date}`);
        if (entities.time)
            parts.push(`Time: ${entities.time}`);
        if (entities.containerNumber)
            parts.push(`Container: ${entities.containerNumber}`);
        if (entities.bookingId)
            parts.push(`Booking: ${entities.bookingId}`);
        if (parts.length === 0)
            return '';
        return `Got it! (${parts.join(', ')})`;
    }
    askForNextSlot(slot, context) {
        switch (slot) {
            case 'terminal':
                return 'Which terminal would you like? (e.g., Terminal A, Terminal B)';
            case 'date':
                return 'What date? (e.g., tomorrow, 2026-02-08)';
            case 'time':
                return `What time on ${context.date || 'that day'}? (e.g., 9am, 14:00, morning)`;
            case 'booking ID':
                return 'Which booking? Please provide the booking ID, or say "show my bookings" to see your list.';
            case 'container number':
                return 'What is the container number? (e.g., MSKU1234567)';
            default:
                return `Could you provide the ${slot}?`;
        }
    }
    async executeCompletedTask(task, context, user) {
        switch (task) {
            case 'booking':
                const availability = await this.slotsService.getAvailability(undefined, context.date);
                const matchingSlots = availability.filter((slot) => {
                    const matchesTerminal = !context.terminal ||
                        slot.terminalName
                            .toLowerCase()
                            .includes(context.terminal.toLowerCase().replace('terminal ', ''));
                    const slotTime = new Date(slot.startTime).toTimeString().slice(0, 5);
                    const matchesTime = !context.time || slotTime === context.time;
                    return matchesTerminal && (matchesTime || !context.time);
                });
                if (matchingSlots.length === 0) {
                    return `No available slots found for ${context.terminal || 'any terminal'} on ${context.date}${context.time ? ` at ${context.time}` : ''}. Would you like to try a different time or date?`;
                }
                const slotSummary = matchingSlots
                    .slice(0, 3)
                    .map((slot) => {
                    const start = new Date(slot.startTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    });
                    const end = new Date(slot.endTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    });
                    return `• ${slot.terminalName}: ${start}-${end} (${slot.availableCount} spots)`;
                })
                    .join('\n');
                return `Here are the available slots for ${context.terminal || 'all terminals'} on ${context.date}:\n\n${slotSummary}\n\nWould you like me to book one of these?`;
            case 'cancel':
                return `I found booking ${context.bookingId}. Are you sure you want to cancel it? Reply "yes" to confirm or "no" to keep it.`;
            case 'track':
                return await this.handleContainerTrack(context.containerNumber);
            case 'reschedule':
                return `To reschedule booking ${context.bookingId}, what new date and time would you prefer?`;
            default:
                return 'How can I help you with that?';
        }
    }
    continueTaskFlow(lastAssistantMsg, userMsg, user) {
        if (lastAssistantMsg.includes('?')) {
            return `I'm still waiting for your response. Could you please answer the question, or say "cancel" to start over.`;
        }
        return `I'm not sure how to proceed. Could you clarify?`;
    }
    async handleAvailabilityQuery(message) {
        const dateMatch = message.match(/(\d{4}-\d{2}-\d{2})/);
        const date = dateMatch?.[1] || undefined;
        let resolvedDate = date;
        if (!resolvedDate && message.includes('tomorrow')) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            resolvedDate = tomorrow.toISOString().split('T')[0];
        }
        const availability = await this.slotsService.getAvailability(undefined, resolvedDate);
        if (availability.length === 0) {
            return resolvedDate
                ? `No time slots found for ${resolvedDate}. Try checking another date.`
                : 'No upcoming time slots are currently available.';
        }
        const summary = availability.slice(0, 5).map((slot) => {
            const start = new Date(slot.startTime).toLocaleString();
            const end = new Date(slot.endTime).toLocaleString();
            return `• **${slot.terminalName}**: ${start} - ${end} | ${slot.availableCount}/${slot.capacity} spots`;
        });
        return (`Here are the available slots${resolvedDate ? ` for ${resolvedDate}` : ''}:\n\n` +
            summary.join('\n') +
            (availability.length > 5
                ? `\n\n...and ${availability.length - 5} more slots available.`
                : '') +
            '\n\nWould you like to book one of these slots?');
    }
    async handleMyBookingsQuery(user) {
        const bookings = await this.bookingService.findMyBookings(user.id);
        if (bookings.length === 0) {
            return "You don't have any bookings yet. Would you like to create one? Ask me about available slots!";
        }
        const summary = bookings.slice(0, 5).map((b) => {
            const status = b.status === 'CONFIRMED'
                ? '✅ Confirmed'
                : b.status === 'PENDING'
                    ? '⏳ Pending'
                    : b.status === 'CONSUMED'
                        ? '🏁 Used'
                        : b.status === 'CANCELLED'
                            ? '❌ Cancelled'
                            : `📋 ${b.status}`;
            return `• **${b.terminal.name}** | ${status} | ${new Date(b.timeSlot.startTime).toLocaleString()} — ID: \`${b.id.slice(0, 8)}...\``;
        });
        return `Your recent bookings:\n\n${summary.join('\n')}`;
    }
    handleBookingIntent() {
        return ('To create a booking, here is what you need:\n\n' +
            '1. **Check available slots** — Ask "What slots are available?"\n' +
            '2. **Choose a terminal and time slot** from the list\n' +
            '3. **Create the booking** via `POST /bookings` with the terminal ID and time slot ID\n\n' +
            'Alternatively, tell me the terminal and date you want, and I can help you find the best slot!');
    }
    handleCancelIntent() {
        return ('To cancel a booking:\n\n' +
            '1. Ask me "Show my bookings" to find the booking ID\n' +
            '2. Use `POST /bookings/{id}/cancel` to cancel it\n\n' +
            'Note: Only **PENDING** or **CONFIRMED** bookings can be cancelled.');
    }
    async handleContainerTrack(containerNumber) {
        try {
            const container = await this.prisma.container.findUnique({
                where: { containerNumber },
                include: {
                    trackingEvents: {
                        orderBy: { timestamp: 'desc' },
                        take: 5,
                    },
                },
            });
            if (!container) {
                return `Container **${containerNumber}** not found. Please check the number and try again.`;
            }
            if (container.trackingEvents.length === 0) {
                return `Container **${containerNumber}** found, but no tracking events are recorded yet.`;
            }
            const events = container.trackingEvents.map((e) => {
                return `• **${e.type}** — ${e.location} — ${new Date(e.timestamp).toLocaleString()}`;
            });
            return `Tracking for container **${containerNumber}**:\n\n${events.join('\n')}`;
        }
        catch {
            return `Error tracking container ${containerNumber}. Please try again.`;
        }
    }
    async handleStatusQuery() {
        const now = new Date();
        const terminals = await this.prisma.terminal.findMany({
            where: { isActive: true },
            include: {
                _count: {
                    select: {
                        bookings: {
                            where: {
                                status: { in: ['PENDING', 'CONFIRMED'] },
                                timeSlot: {
                                    startTime: { gte: now },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (terminals.length === 0) {
            return 'No active terminals found.';
        }
        const lines = terminals.map((t) => {
            const level = t._count.bookings > 15
                ? '🔴 High'
                : t._count.bookings > 8
                    ? '🟡 Medium'
                    : '🟢 Low';
            return `• **${t.name}** — ${t._count.bookings} active bookings — Congestion: ${level}`;
        });
        return `Current port status:\n\n${lines.join('\n')}\n\nWant to see slot availability for a specific terminal?`;
    }
    async handleOperatorQueueQuery() {
        const bookings = await this.prisma.booking.findMany({
            where: {
                status: { in: ['PENDING', 'CONFIRMED', 'AT_RISK', 'READY_TO_GO'] },
            },
            include: {
                terminal: { select: { name: true } },
                timeSlot: { select: { startTime: true, endTime: true } },
                carrier: { select: { email: true } },
            },
            orderBy: { createdAt: 'desc' },
            take: 15,
        });
        if (bookings.length === 0) {
            return 'No bookings in the queue right now. 🎉';
        }
        const pending = bookings.filter((b) => b.status === 'PENDING');
        const atRisk = bookings.filter((b) => b.status === 'AT_RISK');
        const confirmed = bookings.filter((b) => b.status === 'CONFIRMED');
        let response = '📋 **Booking Queue Summary:**\n\n';
        response += `• **${pending.length}** Pending approval\n`;
        response += `• **${atRisk.length}** At risk\n`;
        response += `• **${confirmed.length}** Confirmed\n\n`;
        if (pending.length > 0) {
            response += '**Pending Bookings (need approval):**\n';
            pending.slice(0, 5).forEach((b) => {
                const time = new Date(b.timeSlot.startTime).toLocaleString();
                response += `• ${b.carrier.email} @ ${b.terminal.name} — ${time}\n`;
            });
        }
        if (atRisk.length > 0) {
            response += '\n⚠️ **At-Risk Bookings:**\n';
            atRisk.slice(0, 3).forEach((b) => {
                const time = new Date(b.timeSlot.startTime).toLocaleString();
                response += `• ${b.carrier.email} @ ${b.terminal.name} — ${time}\n`;
            });
        }
        return response;
    }
    async handleAlertsQuery() {
        const atRiskBookings = await this.prisma.booking.findMany({
            where: { status: 'AT_RISK' },
            include: {
                terminal: { select: { name: true } },
                carrier: { select: { email: true } },
                timeSlot: { select: { startTime: true } },
            },
            take: 5,
        });
        const pendingCount = await this.prisma.booking.count({
            where: { status: 'PENDING' },
        });
        let response = '⚠️ **Current Alerts:**\n\n';
        let alertCount = 0;
        if (atRiskBookings.length > 0) {
            alertCount++;
            response += `🔴 **${atRiskBookings.length} booking(s) are AT RISK:**\n`;
            atRiskBookings.forEach((b) => {
                const time = new Date(b.timeSlot.startTime).toLocaleString();
                response += `  • ${b.carrier.email} @ ${b.terminal.name} — ${time}\n`;
            });
            response += '\n';
        }
        if (pendingCount > 5) {
            alertCount++;
            response += `🟡 **Queue backlog:** ${pendingCount} bookings waiting for approval\n\n`;
        }
        if (alertCount === 0) {
            return '✅ No active alerts. Everything looks good!';
        }
        return response;
    }
    handleHelpQuery(user) {
        const baseHelp = "I'm your **PORTFLOW AI** assistant. Here's what I can do:\n\n" +
            '📋 **"What slots are available?"** — Check time slot availability\n' +
            '📊 **"What is the port status?"** — Current congestion levels\n' +
            '📦 **"Track container MSKU1234567"** — Container tracking\n';
        if (user.role === 'CARRIER') {
            return (baseHelp +
                '🚛 **"Show my bookings"** — View your booking history\n' +
                '📝 **"How do I book?"** — Booking instructions\n' +
                '❌ **"How do I cancel?"** — Cancellation instructions\n');
        }
        if (user.role === 'TERMINAL_OPERATOR') {
            return (baseHelp +
                '📋 **"Show the queue"** — View pending bookings\n' +
                '⚠️ **"Any alerts?"** — Check current alerts\n');
        }
        return baseHelp + '🔍 Ask me anything about port operations!';
    }
    buildSystemPrompt(user, history = []) {
        const isNewChat = history.length <= 1;
        const newChatInstructions = isNewChat
            ? '\n\n🔴 NEW CHAT SESSION - IMPORTANT:\n' +
                '- This is a BRAND NEW conversation with NO prior context\n' +
                '- You have NO knowledge of any previous messages or conversations\n' +
                '- Do NOT reference or assume anything from past interactions\n' +
                '- Do NOT say "as we discussed" or "as I mentioned before"\n' +
                '- Treat this user as if you are meeting them for the first time in this session\n' +
                '- Start fresh with no assumptions about their previous requests\n'
            : '';
        const roleSpecificInstructions = user.role === 'CARRIER'
            ? `This user is a CARRIER (${user.email}). IMPORTANT:
- ONLY show this carrier's OWN bookings and data - NEVER show other carriers' data
- Use get_my_bookings tool for their bookings (supports status filter: PENDING, CONFIRMED, AT_RISK)
- DO NOT use get_operator_queue or get_alerts - those are for operators only
- Help them with: booking slots, checking availability, tracking their containers, viewing their bookings, understanding charges`
            : user.role === 'TERMINAL_OPERATOR'
                ? `This user is a TERMINAL OPERATOR. Help them with:
- Use get_operator_queue to see ALL pending bookings from all carriers
- Use get_alerts for at-risk bookings and system warnings
- Approving/rejecting bookings, managing the queue, checking terminal utilization`
                : user.role === 'PORT_ADMIN'
                    ? 'This user is a PORT ADMIN. Help them with: viewing analytics, managing terminals, auditing operations, and system configuration.'
                    : 'This user is a GATE AGENT. Help them with: validating gate access, scanning QR codes, and managing truck entry.';
        return ('You are PORTFLOW AI, a STATEFUL conversational assistant for port operations.\n\n' +
            `Current user: ${user.email} (Role: ${user.role})\n` +
            `${roleSpecificInstructions}\n\n` +
            'CRITICAL RULES - FOLLOW THESE EXACTLY:\n' +
            '1. Respond naturally like a human assistant - be conversational and friendly\n' +
            '2. NEVER show a menu or list of capabilities UNLESS the user explicitly asks "help" or "what can you do"\n' +
            '3. If the user greets you (hey, hello, hi, etc.), greet them back warmly and ask how you can help\n' +
            '4. If the user asks a question, answer it DIRECTLY using tools to fetch real data\n' +
            '5. If information is missing to answer, ask a follow-up question\n' +
            '6. Be concise but helpful - no unnecessary explanations\n' +
            '7. For CARRIERS: ONLY show their own data, never other carriers\n\n' +
            'STATEFUL CONVERSATION RULES (VERY IMPORTANT):\n' +
            '- Always consider previous messages in the conversation\n' +
            '- If the last assistant message asked a question, interpret short answers (yes, no, ok, sure) as replies to that question\n' +
            '- Never reset the conversation unless explicitly told\n' +
            '- Never show a menu if a task is in progress\n' +
            '- Continue the flow until the task is completed or canceled\n\n' +
            'SLOT FILLING RULES (CRITICAL - FOLLOW EXACTLY):\n' +
            '- When collecting information for a task, EXTRACT and REMEMBER all provided details\n' +
            '- NEVER ask the user to repeat information they already provided in this conversation\n' +
            '- If user says "Terminal A" → remember terminal=Terminal A for the rest of this task\n' +
            '- If user says "tomorrow at 9am" → extract BOTH date AND time, remember both\n' +
            '- Acknowledge what you received: "Got it, Terminal A on Feb 8th. What time?"\n' +
            '- Only ask for MISSING information, never re-ask for provided info\n' +
            '- NEVER fall back to help menu while collecting slot information\n\n' +
            'EXAMPLES OF STATEFUL RESPONSES:\n' +
            '- Assistant: "Would you like to see available slots?" → User: "yes" → Show available slots (NOT a menu!)\n' +
            '- Assistant: "Should I cancel this booking?" → User: "no" → "No problem! Is there anything else I can help with?"\n' +
            '- Assistant: "Which terminal?" → User: "Terminal A" → Continue with Terminal A (remember the context)\n\n' +
            'EXAMPLES OF BAD RESPONSES (NEVER DO THIS):\n' +
            '- User: "yes" (after assistant asked a question) → "I can help you with: 1. Bookings 2. Slots..." (WRONG!)\n' +
            '- User: "ok" → Showing a menu instead of proceeding (WRONG!)\n\n' +
            'Remember: Be conversational, stateful, and never lose context!' +
            newChatInstructions);
    }
    MOCK_CONTEXT = {
        availableSlots: [
            {
                terminal: 'Terminal A',
                date: '2026-02-07',
                start: '08:00',
                end: '09:00',
                congestion: 'high',
                score: 0.45,
            },
            {
                terminal: 'Terminal A',
                date: '2026-02-07',
                start: '09:30',
                end: '10:30',
                congestion: 'low',
                score: 0.87,
            },
            {
                terminal: 'Terminal A',
                date: '2026-02-07',
                start: '11:00',
                end: '12:00',
                congestion: 'medium',
                score: 0.65,
            },
            {
                terminal: 'Terminal B',
                date: '2026-02-07',
                start: '14:00',
                end: '15:00',
                congestion: 'low',
                score: 0.92,
            },
        ],
        myBookings: [
            {
                bookingId: 'BK-001',
                terminal: 'Terminal A',
                date: '2026-02-06',
                slot: '10:00-11:00',
                status: 'AT_RISK',
                truckPlate: 'AB-123-CD',
                containerNumber: 'MSCU1234567',
                riskReason: 'Container not confirmed',
                recommendedAction: 'Reschedule slot',
            },
            {
                bookingId: 'BK-002',
                terminal: 'Terminal B',
                date: '2026-02-07',
                slot: '14:00-15:00',
                status: 'CONFIRMED',
                truckPlate: 'EF-456-GH',
                containerNumber: 'TCLU7654321',
                riskReason: null,
                recommendedAction: null,
            },
            {
                bookingId: 'BK-003',
                terminal: 'Terminal A',
                date: '2026-02-06',
                slot: '14:00-15:00',
                status: 'CANCELLED',
                truckPlate: 'AB-123-CD',
                containerNumber: 'HLXU3344556',
                riskReason: null,
                recommendedAction: null,
            },
        ],
        containers: [
            {
                containerId: 'MSCU1234567',
                status: 'IN_YARD',
                location: 'Terminal A - Yard 2',
                readiness: 'NOT_READY',
                eta: '2026-02-06T22:00:00',
                readinessProbability: 0.35,
                readinessBlockers: [
                    'Customs clearance pending',
                    'Inspection scheduled',
                ],
            },
            {
                containerId: 'TCLU7654321',
                status: 'READY',
                location: 'Terminal B - Gate Staging',
                readiness: 'READY',
                eta: null,
                readinessProbability: 1.0,
                readinessBlockers: [],
            },
            {
                containerId: 'HLXU3344556',
                status: 'NOT_ARRIVED',
                location: 'At sea - ETA vessel MAERSK VOYAGER',
                readiness: 'NOT_READY',
                eta: '2026-02-07T08:00:00',
                readinessProbability: 0.1,
                readinessBlockers: ['Vessel not docked', 'Discharge pending'],
            },
        ],
        rescheduleOptions: [
            {
                slot: '14:00-15:00',
                terminal: 'Terminal A',
                date: '2026-02-07',
                readinessProbability: 0.82,
                reason: 'Container likely ready by afternoon',
            },
            {
                slot: '16:00-17:00',
                terminal: 'Terminal A',
                date: '2026-02-07',
                readinessProbability: 0.95,
                reason: 'High confidence — all clearances expected by then',
            },
        ],
        gateAccess: {
            truckPlate: 'AB-123-CD',
            bookingId: 'BK-001',
            gateResult: 'DENIED',
            denialReason: 'Container readiness not confirmed — missing customs clearance',
            suggestedAction: 'Wait for customs clearance or reschedule booking',
        },
        readinessProof: {
            bookingId: 'BK-002',
            containerId: 'TCLU7654321',
            proofHash: '0xabc123def456789abcdef0123456789abcdef0123456789abcdef01234',
            blockchain: 'Ethereum Sepolia',
            timestamp: '2026-02-06T10:30:00Z',
            status: 'VERIFIED',
            explanation: 'This cryptographic proof confirms the container was marked READY at the recorded time. It is immutable and auditable.',
        },
        pendingContainers: [
            {
                containerId: 'MSCU1234567',
                status: 'IN_YARD',
                location: 'Terminal A - Yard 2',
                blockedReason: 'Customs clearance pending',
                impactedBookings: ['BK-001'],
                severity: 'HIGH',
            },
            {
                containerId: 'HLXU3344556',
                status: 'NOT_ARRIVED',
                location: 'At sea',
                blockedReason: 'Vessel not docked',
                impactedBookings: ['BK-003'],
                severity: 'CRITICAL',
            },
            {
                containerId: 'MSCU9988776',
                status: 'IN_YARD',
                location: 'Terminal A - Yard 3',
                blockedReason: 'Damaged seal — inspection required',
                impactedBookings: [],
                severity: 'MEDIUM',
            },
        ],
        congestionForecast: {
            terminal: 'Terminal A',
            currentOccupancy: '78%',
            forecastNextHour: '92%',
            riskLevel: 'HIGH',
            peakWindow: '14:00-16:00',
            recommendation: 'Divert non-urgent trucks to Terminal B',
        },
        operationalPriorities: [
            {
                rank: 1,
                action: 'Unload MSCU1234567',
                reason: 'Blocking booking BK-001 — customer at risk',
                urgency: 'CRITICAL',
            },
            {
                rank: 2,
                action: 'Complete inspection for MSCU9988776',
                reason: 'Damaged seal — yard space occupied',
                urgency: 'HIGH',
            },
            {
                rank: 3,
                action: 'Prepare berth for MAERSK VOYAGER',
                reason: 'Vessel arriving 2026-02-07 08:00 with 3 expected containers',
                urgency: 'MEDIUM',
            },
        ],
        activeAlerts: [
            {
                alertId: 'ALT-001',
                type: 'CONGESTION',
                message: 'Terminal A approaching capacity (78%)',
                severity: 'WARNING',
                timestamp: '2026-02-06T13:00:00',
            },
            {
                alertId: 'ALT-002',
                type: 'READINESS_FAILURE',
                message: 'Container MSCU1234567 missed readiness deadline for BK-001',
                severity: 'CRITICAL',
                timestamp: '2026-02-06T09:45:00',
            },
            {
                alertId: 'ALT-003',
                type: 'GATE_DENIAL',
                message: 'Truck AB-123-CD denied at Gate A — 3rd attempt today',
                severity: 'HIGH',
                timestamp: '2026-02-06T11:30:00',
            },
        ],
        gateValidation: {
            truckPlate: 'EF-456-GH',
            qrValid: true,
            bookingId: 'BK-002',
            bookingStatus: 'CONFIRMED',
            containerReady: true,
            accessDecision: 'ALLOWED',
            explanation: 'Booking confirmed, container ready, QR valid. Truck may enter.',
        },
        gateEntryEstimate: {
            truckPlate: 'AB-123-CD',
            currentStatus: 'DENIED',
            reason: 'Container MSCU1234567 not ready',
            estimatedReadyAt: '2026-02-06T16:00:00',
            suggestedSlot: '16:00-17:00',
            waitTime: 'approx. 3 hours',
        },
        kpiSummary: {
            date: '2026-02-06',
            totalBookings: 47,
            completedOnTime: 38,
            delayed: 6,
            cancelled: 3,
            avgWaitTimeMinutes: 22,
            avgTurnaroundMinutes: 45,
            gateUtilization: '81%',
            aiAssistedDecisions: 29,
            readinessAccuracy: '94%',
        },
        delayAnalysis: {
            date: '2026-02-06',
            totalDelays: 6,
            topCauses: [
                { cause: 'Container not ready', count: 3, avgDelayMinutes: 35 },
                { cause: 'Customs hold', count: 2, avgDelayMinutes: 60 },
                { cause: 'Gate queue overflow', count: 1, avgDelayMinutes: 15 },
            ],
            worstTerminal: 'Terminal A',
            suggestion: 'Pre-clear customs for morning bookings to reduce delays by ~40%',
        },
        aiImpact: {
            period: '2026-02-06',
            tripsAvoided: 8,
            reschedulesTriggered: 12,
            avgTimeSavedMinutes: 28,
            proactiveAlerts: 15,
            readinessPredictionAccuracy: '94%',
            summary: 'AI prevented 8 unnecessary trips and saved an average of 28 minutes per booking through proactive rescheduling.',
        },
        auditTrail: {
            bookingId: 'BK-001',
            events: [
                {
                    timestamp: '2026-02-06T08:00:00',
                    action: 'BOOKING_CREATED',
                    actor: 'carrier@acme.com',
                    details: 'Slot 10:00-11:00 at Terminal A',
                },
                {
                    timestamp: '2026-02-06T09:00:00',
                    action: 'READINESS_CHECK_FAILED',
                    actor: 'system',
                    details: 'Container MSCU1234567 not ready — customs pending',
                },
                {
                    timestamp: '2026-02-06T09:05:00',
                    action: 'STATUS_CHANGED',
                    actor: 'system',
                    details: 'Booking moved to AT_RISK',
                },
                {
                    timestamp: '2026-02-06T09:30:00',
                    action: 'RESCHEDULE_SUGGESTED',
                    actor: 'ai-engine',
                    details: 'AI recommended slot 16:00-17:00 (readiness probability 95%)',
                },
                {
                    timestamp: '2026-02-06T11:30:00',
                    action: 'GATE_DENIED',
                    actor: 'gate-agent@port.com',
                    details: 'Truck AB-123-CD denied — container not ready',
                },
            ],
        },
        blockchainVerification: {
            proofHash: '0xabc123def456789abcdef0123456789abcdef0123456789abcdef01234',
            valid: true,
            blockchain: 'Ethereum Sepolia',
            blockNumber: 18234567,
            timestamp: '2026-02-06T10:30:00Z',
            explanation: 'The hash matches the on-chain record. This proof is immutable and confirms the readiness status was recorded at the stated time.',
        },
        containerDelayAnalysis: {
            containerId: 'MSCU1234567',
            currentStatus: 'IN_YARD',
            delayReason: 'Customs clearance pending — documentation received late',
            delayResponsibility: 'Customs authority',
            delayStarted: '2026-02-06T06:00:00',
            estimatedResolution: '2026-02-06T16:00:00',
            impactedBookings: ['BK-001'],
        },
        containerEtaPrediction: {
            containerId: 'MSCU1234567',
            predictedReadyAt: '2026-02-06T16:30:00',
            confidence: 0.78,
            factors: [
                'Customs processing avg 4h',
                'Inspection queue: 2 containers ahead',
            ],
        },
        containerComparison: [
            {
                containerId: 'MSCU1234567',
                readinessProbability: 0.35,
                eta: '2026-02-06T16:30:00',
                status: 'NOT_READY',
                rank: 3,
            },
            {
                containerId: 'TCLU7654321',
                readinessProbability: 1.0,
                eta: null,
                status: 'READY',
                rank: 1,
            },
            {
                containerId: 'HLXU3344556',
                readinessProbability: 0.1,
                eta: '2026-02-07T08:00:00',
                status: 'NOT_READY',
                rank: 2,
            },
        ],
        waitingTimeSimulation: {
            options: [
                {
                    slot: '14:00-15:00',
                    estimatedWaitMinutes: 12,
                    congestion: 'low',
                    recommendation: 'BEST OPTION',
                },
                {
                    slot: '10:00-11:00',
                    estimatedWaitMinutes: 45,
                    congestion: 'high',
                    recommendation: 'AVOID',
                },
                {
                    slot: '16:00-17:00',
                    estimatedWaitMinutes: 18,
                    congestion: 'medium',
                    recommendation: 'GOOD',
                },
            ],
            summary: 'The 14:00-15:00 slot minimizes waiting time at 12 minutes.',
        },
        costImpactEstimate: {
            bookingId: 'BK-001',
            currentDelayCostEUR: 120,
            idleTruckCostPerHour: 40,
            projectedTotalCostIfWait: 280,
            projectedTotalCostIfReschedule: 60,
            recommendation: 'Reschedule — saves approximately €220',
            breakdown: [
                { item: 'Truck idle time (3h)', cost: 120 },
                { item: 'Late delivery penalty', cost: 100 },
                { item: 'Port storage surcharge', cost: 60 },
            ],
        },
        fleetOverview: {
            totalTrucks: 5,
            activeTrucks: 3,
            idleTrucks: 1,
            inTransitTrucks: 1,
            trucks: [
                {
                    plate: 'AB-123-CD',
                    status: 'AT_PORT',
                    currentBooking: 'BK-001',
                    risk: 'HIGH',
                },
                {
                    plate: 'EF-456-GH',
                    status: 'AT_PORT',
                    currentBooking: 'BK-002',
                    risk: 'NONE',
                },
                {
                    plate: 'IJ-789-KL',
                    status: 'IN_TRANSIT',
                    currentBooking: null,
                    risk: 'NONE',
                },
                {
                    plate: 'MN-012-OP',
                    status: 'IDLE',
                    currentBooking: null,
                    risk: 'NONE',
                },
                {
                    plate: 'QR-345-ST',
                    status: 'AT_PORT',
                    currentBooking: 'BK-004',
                    risk: 'MEDIUM',
                },
            ],
        },
        truckAssignment: {
            bookingId: 'BK-001',
            currentTruck: 'AB-123-CD',
            availableTrucks: ['MN-012-OP', 'IJ-789-KL'],
            constraints: [
                'Truck must have valid port pass',
                'Driver must be assigned',
            ],
            status: 'READY_TO_ASSIGN',
        },
        driverInstructions: {
            truckPlate: 'AB-123-CD',
            bookingId: 'BK-001',
            currentSituation: 'Gate access denied — container not ready',
            steps: [
                'Step 1: Drive to Waiting Zone C (follow blue signs)',
                'Step 2: Park in bay 14-18 (nearest available)',
                'Step 3: Wait for SMS notification (~3 hours estimated)',
                'Step 4: Return to Gate A when notified',
                'Step 5: Present QR code for re-entry',
            ],
            alternativeAction: 'Request reschedule to 16:00-17:00 slot via the app',
        },
        yardStatus: {
            terminal: 'Terminal A',
            totalCapacity: 500,
            currentLoad: 390,
            occupancyPercent: '78%',
            overflowRisk: 'HIGH',
            predictedFullAt: '2026-02-06T17:00:00',
            hotZones: [
                { zone: 'Yard 2', occupancy: '92%', status: 'NEAR_FULL' },
                { zone: 'Yard 3', occupancy: '85%', status: 'HIGH' },
                { zone: 'Yard 1', occupancy: '58%', status: 'NORMAL' },
            ],
        },
        containerSequence: [
            {
                rank: 1,
                containerId: 'MSCU1234567',
                reason: 'Blocking booking BK-001 — highest downstream impact',
                impactScore: 9.2,
            },
            {
                rank: 2,
                containerId: 'HLXU3344556',
                reason: 'Vessel MAERSK VOYAGER discharge — berth needed',
                impactScore: 7.8,
            },
            {
                rank: 3,
                containerId: 'MSCU9988776',
                reason: 'Yard space recovery — damaged seal area',
                impactScore: 5.1,
            },
        ],
        terminalSimulation: {
            scenario: 'Crane 2 offline',
            normalCapacityTrucksPerHour: 24,
            reducedCapacityTrucksPerHour: 16,
            congestionIncrease: '+35%',
            estimatedQueueLength: 14,
            estimatedExtraWaitMinutes: 25,
            recommendation: 'Redirect 40% of afternoon trucks to Terminal B to prevent queue overflow',
        },
        dailyRiskAssessment: {
            date: '2026-02-06',
            overallRisk: 'HIGH',
            riskScore: 7.4,
            factors: [
                {
                    factor: 'At-risk bookings',
                    count: 4,
                    severity: 'HIGH',
                },
                {
                    factor: 'Pending customs clearances',
                    count: 3,
                    severity: 'MEDIUM',
                },
                {
                    factor: 'Terminal near capacity',
                    count: 1,
                    severity: 'HIGH',
                },
            ],
            recommendation: 'Prioritize customs follow-ups and consider capacity overflow plan',
        },
        escalation: {
            containerId: 'MSCU1234567',
            bookingId: 'BK-001',
            escalatedTo: ['port-admin@port.com', 'carrier@acme.com'],
            severity: 'CRITICAL',
            reason: 'Container delay exceeds 6h threshold — booking at risk of cancellation',
            timestamp: '2026-02-06T12:00:00',
            status: 'ESCALATED',
        },
        gateQueueStatus: {
            gate: 'Gate A',
            queueLength: 7,
            estimatedWaitMinutes: 22,
            trucksWaiting: [
                { plate: 'AB-123-CD', waitingSince: '2026-02-06T11:30:00' },
                { plate: 'UV-678-WX', waitingSince: '2026-02-06T11:45:00' },
                { plate: 'YZ-901-AB', waitingSince: '2026-02-06T12:00:00' },
            ],
            throughputPerHour: 18,
        },
        truckRedirect: {
            truckPlate: 'AB-123-CD',
            suggestedArea: 'Waiting Zone C',
            directions: 'Exit gate lane → Turn right → Follow blue signs → Bay 14-18',
            estimatedCallbackTime: '2026-02-06T16:00:00',
            reason: 'Container not ready — redirecting to avoid gate congestion',
        },
        overrideRequest: {
            truckPlate: 'AB-123-CD',
            requestedBy: 'gate-agent@port.com',
            reason: 'Emergency cargo — perishable goods at risk',
            overrideType: 'MANUAL_GATE_ACCESS',
            status: 'PENDING_APPROVAL',
            approvalRequired: 'port-admin@port.com',
            timestamp: '2026-02-06T12:15:00',
        },
        driverVerification: {
            driverId: 'DRV-20261234',
            name: 'Jean Dupont',
            licenseValid: true,
            portPassValid: true,
            assignedTruck: 'EF-456-GH',
            matchesBooking: true,
            bookingId: 'BK-002',
            verificationResult: 'AUTHORIZED',
            explanation: 'Driver identity verified — license valid, port pass active, matches booking BK-002.',
        },
        terminalComparison: {
            terminals: [
                {
                    name: 'Terminal A',
                    avgWaitMinutes: 28,
                    throughputPerDay: 185,
                    delayRate: '14%',
                    gateUtilization: '81%',
                    bottleneck: 'Customs clearance',
                },
                {
                    name: 'Terminal B',
                    avgWaitMinutes: 15,
                    throughputPerDay: 142,
                    delayRate: '6%',
                    gateUtilization: '62%',
                    bottleneck: 'None',
                },
            ],
            recommendation: 'Terminal B has better performance; consider redistributing load from Terminal A.',
        },
        policyConfig: {
            currentPolicy: {
                atRiskThreshold: 0.5,
                maxGateDenials: 3,
                autoEscalateAfterHours: 6,
                readinessDeadlineHoursBeforeSlot: 2,
            },
            proposedChange: {
                field: 'atRiskThreshold',
                oldValue: 0.5,
                newValue: 0.6,
                impact: 'Fewer bookings flagged as AT_RISK (~20% reduction), but higher risk of missed containers.',
            },
            status: 'PENDING_CONFIRMATION',
        },
        carrierBehaviorAnalysis: {
            carriers: [
                {
                    carrier: 'Acme Logistics',
                    totalBookings: 120,
                    onTimeRate: '78%',
                    cancelRate: '8%',
                    avgDelayMinutes: 22,
                    reliabilityScore: 72,
                },
                {
                    carrier: 'FastFreight Inc',
                    totalBookings: 95,
                    onTimeRate: '91%',
                    cancelRate: '3%',
                    avgDelayMinutes: 8,
                    reliabilityScore: 93,
                },
                {
                    carrier: 'OceanWay',
                    totalBookings: 60,
                    onTimeRate: '65%',
                    cancelRate: '15%',
                    avgDelayMinutes: 38,
                    reliabilityScore: 54,
                },
            ],
            recommendation: 'Investigate OceanWay — lowest reliability (54). Consider priority access for FastFreight (93).',
        },
        incidentReport: {
            reportId: 'INC-2026-0042',
            type: 'GATE_DENIAL_INCIDENT',
            date: '2026-02-06',
            involvedParties: [
                { role: 'Carrier', entity: 'Acme Logistics', truck: 'AB-123-CD' },
                { role: 'Gate Agent', entity: 'gate-agent@port.com' },
            ],
            timeline: [
                '11:30 — Truck AB-123-CD arrived at Gate A',
                '11:31 — QR scanned — booking BK-001 found',
                '11:31 — Container MSCU1234567 NOT READY',
                '11:32 — Gate access DENIED',
                '11:35 — Truck redirected to Waiting Zone C',
            ],
            blockchainProof: '0xabc123def456789abcdef0123456789abcdef0123456789abcdef01234',
            status: 'GENERATED',
        },
        complianceExport: {
            exportId: 'EXP-2026-0206',
            dateRange: '2026-02-01 to 2026-02-06',
            totalRecords: 312,
            categories: [
                { category: 'Gate access logs', count: 145 },
                { category: 'Booking status changes', count: 98 },
                { category: 'AI decisions', count: 69 },
            ],
            format: 'CSV',
            status: 'READY_TO_DOWNLOAD',
            downloadUrl: '/admin/exports/EXP-2026-0206.csv',
        },
        aiDecisionExplanation: {
            decision: 'RESCHEDULE_RECOMMENDED',
            bookingId: 'BK-001',
            reasoning: [
                'Container MSCU1234567 readiness probability is 35% (below 50% threshold)',
                'Customs clearance has avg processing time of 4 hours',
                'Slot 16:00-17:00 gives 95% readiness probability',
                'Historical data: 89% of similar rescheduled bookings succeeded',
            ],
            modelConfidence: 0.91,
            alternativesConsidered: [
                { option: 'Wait', successProbability: 0.35 },
                { option: 'Reschedule to 14:00', successProbability: 0.82 },
                { option: 'Reschedule to 16:00', successProbability: 0.95 },
            ],
        },
        worstCaseSimulation: {
            scenario: 'Carrier does NOT reschedule BK-001',
            consequences: [
                'Container remains NOT_READY at slot time',
                'Truck denied at gate — 3rd denial today',
                'Booking auto-cancelled after 3 denials',
                'Carrier charged €280 (idle + penalty + storage)',
                'Terminal slot wasted — no recovery possible',
            ],
            probability: 0.65,
            recommendation: 'Reschedule now to avoid cascading failures.',
        },
        systemHealth: {
            status: 'HEALTHY',
            uptime: '99.97%',
            lastRestart: '2026-02-01T03:00:00Z',
            services: [
                { name: 'API Server', status: 'UP', responseTimeMs: 45 },
                { name: 'Database', status: 'UP', responseTimeMs: 12 },
                { name: 'AI Engine', status: 'UP', responseTimeMs: 320 },
                { name: 'Blockchain Node', status: 'UP', responseTimeMs: 180 },
                { name: 'WebSocket Gateway', status: 'UP', connections: 14 },
            ],
            recentIssues: [],
        },
        onboardingGuide: {
            role: 'CARRIER',
            steps: [
                '1. Register → POST /auth/register with company info',
                '2. Add trucks → POST /carrier/trucks (plate + driver info)',
                '3. Add containers → POST /carrier/containers (number + type)',
                '4. Check slots → GET /slots/availability?terminalId=X&date=YYYY-MM-DD',
                '5. Create booking → POST /bookings (slotId + truckId + containerId)',
                '6. Monitor status → GET /bookings/my',
                '7. Gate access → Driver presents QR at gate',
            ],
            tips: [
                'Book off-peak slots (early morning or late afternoon) for less congestion',
                'Monitor readiness probability — reschedule early if below 50%',
                'Use AI chat for real-time guidance',
            ],
        },
        glossary: {
            terms: [
                {
                    term: 'READY_TO_GO',
                    definition: 'Container has passed all checks (customs, inspection, documentation) and is cleared for pickup.',
                    example: 'Container TCLU7654321 is READY_TO_GO — the truck can proceed to the gate.',
                },
                {
                    term: 'AT_RISK',
                    definition: 'Booking whose container may not be ready by the slot time. Readiness probability is below the threshold (default 50%).',
                    example: 'Booking BK-001 is AT_RISK because container MSCU1234567 has only 35% readiness probability.',
                },
                {
                    term: 'Readiness Proof',
                    definition: 'A blockchain-anchored cryptographic hash proving a container was marked READY at a specific time. Immutable and auditable.',
                    example: 'Proof hash 0xabc123... on Ethereum Sepolia confirms TCLU7654321 was ready at 10:30 UTC.',
                },
                {
                    term: 'Gate Denial',
                    definition: 'A truck is refused entry because the booking or container does not meet entry requirements.',
                    example: 'Truck AB-123-CD was denied because MSCU1234567 was not ready.',
                },
                {
                    term: 'Congestion Forecast',
                    definition: 'AI prediction of terminal traffic levels in the coming hours, based on bookings, yard load, and historical patterns.',
                    example: 'Terminal A forecasts 92% occupancy next hour — divert trucks to Terminal B.',
                },
            ],
        },
        traffic: {
            window: 'next 60 minutes',
            incomingTrucks: 18,
            congestion: 'HIGH',
        },
    };
    async testChat(message) {
        if (process.env.AI_DISABLED === 'true') {
            this.logger.warn('[AI FALLBACK USED] AI_DISABLED=true → mock chat');
            return {
                intent: 'UNKNOWN',
                summary: 'AI is disabled.',
                data: {},
                nextAction: 'Enable AI by setting AI_DISABLED=false.',
            };
        }
        if (!this.aiApiKey ||
            this.aiApiKey === 'your-api-key' ||
            this.aiApiKey === 'your-openai-api-key') {
            const msg = 'No valid AI_API_KEY configured';
            this.logger.error(`[AI PROVIDER ERROR] ${msg}`);
            return { error: 'AI_PROVIDER_ERROR', details: msg };
        }
        const systemPrompt = 'You are PORTFLOW AI, a port operations assistant.\n' +
            'You serve 4 roles: Carrier/Driver, Terminal Operator, Gate Agent, Port Admin.\n\n' +
            'DETECT the user intent from the following categories:\n\n' +
            '── CARRIER / DRIVER INTENTS (CORE) ──\n' +
            '• CHECK_SLOT_AVAILABILITY — Show available time slots (use availableSlots)\n' +
            '• CREATE_BOOKING — Help create a new booking (use availableSlots)\n' +
            "• VIEW_MY_BOOKINGS — List the user's bookings (use myBookings)\n" +
            '• CANCEL_BOOKING — Cancel a booking (use myBookings)\n' +
            '• CHECK_CONTAINER_STATUS — Container location & status (use containers)\n' +
            '• CHECK_READINESS_PROBABILITY — Readiness prediction (use containers.readinessProbability)\n' +
            '• EXPLAIN_AT_RISK — Why a booking is at risk (use myBookings where status=AT_RISK)\n' +
            '• GET_RESCHEDULE_OPTIONS — Suggest new slots for at-risk bookings (use rescheduleOptions)\n' +
            '• ACCEPT_RESCHEDULE — Confirm a rescheduled slot (use rescheduleOptions)\n' +
            '• CHECK_GATE_ACCESS — Can the truck enter the port? (use gateAccess)\n' +
            '• EXPLAIN_DENIAL — Why was gate access denied? (use gateAccess)\n' +
            '• GET_READINESS_PROOF — Blockchain proof of readiness (use readinessProof)\n\n' +
            '── CARRIER / DRIVER INTENTS (ADVANCED) ──\n' +
            '• CONTAINER_DELAY_REASON — Why is my container late / what is blocking it (use containerDelayAnalysis)\n' +
            '• CONTAINER_ETA — Predicted ETA with confidence (use containerEtaPrediction)\n' +
            '• COMPARE_CONTAINERS — Compare containers by readiness (use containerComparison)\n' +
            '• MINIMIZE_WAITING_TIME — Fastest option / minimize waiting (use waitingTimeSimulation)\n' +
            '• ESTIMATE_COST_IMPACT — Cost of delay vs reschedule (use costImpactEstimate)\n' +
            '• FLEET_OVERVIEW — Fleet status overview (use fleetOverview)\n' +
            '• ASSIGN_TRUCK — Assign/change truck for a booking (use truckAssignment)\n' +
            '• DRIVER_INSTRUCTIONS — Step-by-step guidance for the driver (use driverInstructions)\n\n' +
            '── TERMINAL OPERATOR INTENTS (CORE) ──\n' +
            '• LIST_PENDING_CONTAINERS — Containers awaiting action (use pendingContainers)\n' +
            '• UPDATE_CONTAINER_STATUS — Change container status (use pendingContainers)\n' +
            '• CONFIRM_READINESS — Mark container as ready (use containers)\n' +
            '• PREDICT_CONGESTION — Terminal congestion forecast (use congestionForecast)\n' +
            '• PRIORITIZE_OPERATIONS — What to do first (use operationalPriorities)\n' +
            '• VIEW_ALERTS — Current alerts & warnings (use activeAlerts)\n' +
            '• BLOCKING_CONTAINERS — Containers blocking operations today (use pendingContainers)\n\n' +
            '── TERMINAL OPERATOR INTENTS (ADVANCED) ──\n' +
            '• YARD_LOAD_STATUS — Yard occupancy & overflow risk (use yardStatus)\n' +
            '• CONTAINER_SEQUENCE_OPTIMIZATION — Optimal unloading order (use containerSequence)\n' +
            '• SIMULATE_TERMINAL_SCENARIO — What-if capacity simulation (use terminalSimulation)\n' +
            '• DETECT_HIGH_RISK_DAY — Is today risky? (use dailyRiskAssessment)\n' +
            '• ESCALATE_DELAY — Escalate a critical delay (use escalation)\n\n' +
            '── GATE AGENT INTENTS (CORE) ──\n' +
            '• VALIDATE_GATE_ACCESS — Validate a truck at the gate (use gateValidation)\n' +
            '• EXPLAIN_GATE_DECISION — Why was a truck allowed/denied (use gateValidation or gateAccess)\n' +
            '• ESTIMATE_ENTRY_TIME — When can a denied truck re-enter (use gateEntryEstimate)\n\n' +
            '── GATE AGENT INTENTS (EXTENDED) ──\n' +
            '• CHECK_QUEUE_STATUS — Gate queue length & wait time (use gateQueueStatus)\n' +
            '• REDIRECT_TRUCK — Where to send a truck / waiting zone (use truckRedirect)\n' +
            '• OVERRIDE_ACCESS_REQUEST — Emergency / manual override request (use overrideRequest)\n' +
            '• VERIFY_DRIVER_ID — Verify driver identity & authorization (use driverVerification)\n\n' +
            '── PORT ADMIN INTENTS (CORE) ──\n' +
            '• GET_KPI_SUMMARY — Daily performance metrics (use kpiSummary)\n' +
            '• ANALYZE_DELAYS — Delay causes & patterns (use delayAnalysis)\n' +
            '• EVALUATE_AI_IMPACT — How AI is improving operations (use aiImpact)\n' +
            '• VIEW_AUDIT_TRAIL — Full audit log for a booking (use auditTrail)\n' +
            '• VERIFY_BLOCKCHAIN_PROOF — Validate a blockchain proof (use blockchainVerification)\n\n' +
            '── PORT ADMIN INTENTS (STRATEGIC) ──\n' +
            '• COMPARE_TERMINALS — Compare terminal KPIs (use terminalComparison)\n' +
            '• DEFINE_POLICY — Change/view policy configuration (use policyConfig)\n' +
            '• EVALUATE_CARRIER_BEHAVIOR — Rank carriers by reliability (use carrierBehaviorAnalysis)\n' +
            '• GENERATE_INCIDENT_REPORT — Compile incident report (use incidentReport)\n' +
            '• EXPORT_COMPLIANCE_DATA — Export audit/compliance data (use complianceExport)\n\n' +
            '── META / SYSTEM INTENTS ──\n' +
            '• EXPLAIN_AI_DECISION — Why did AI recommend this? (use aiDecisionExplanation)\n' +
            "• SIMULATE_USER_ACTION — What happens if I don't act? (use worstCaseSimulation)\n" +
            '• SYSTEM_HEALTH — Is the system healthy? (use systemHealth)\n' +
            '• TRAIN_NEW_USER — Onboarding / teach me how to use this (use onboardingGuide)\n' +
            '• EXPLAIN_TERM — Define a port/system term (use glossary)\n\n' +
            '── GENERAL ──\n' +
            '• TRAFFIC_FORECAST — Traffic & congestion prediction (use traffic)\n' +
            '• SLOT_RECOMMENDATION — Best slot to book (use availableSlots)\n' +
            '• BOOKING_RISK — Check booking risk status (use myBookings)\n' +
            '• CONTAINER_STATUS — Container location & status (alias for CHECK_CONTAINER_STATUS)\n\n' +
            'RULES:\n' +
            '- Use ONLY the provided context data — do NOT invent data\n' +
            '- Respond with structured JSON only\n' +
            '- Always suggest a next action\n' +
            '- Pick the MOST SPECIFIC intent that matches\n\n' +
            'Respond ONLY with valid JSON in this exact format:\n' +
            '{\n' +
            '  "intent": "<one of the intents above>",\n' +
            '  "summary": "Short human-readable answer",\n' +
            '  "data": { ... relevant data from context ... },\n' +
            '  "nextAction": "What the user should do next"\n' +
            '}\n\n' +
            'If you cannot determine the intent, respond with:\n' +
            '{\n' +
            '  "intent": "UNKNOWN",\n' +
            '  "summary": "I did not understand your request.",\n' +
            '  "data": {},\n' +
            '  "nextAction": "Try asking about bookings, containers, slots, traffic, gate access, KPIs, or operations."\n' +
            '}';
        const userMessage = `User question: "${message}"\n\n` +
            `Available context data:\n${JSON.stringify(this.MOCK_CONTEXT, null, 2)}`;
        try {
            this.logger.log(`[AI CALL] test-chat → model=${this.aiModel} promptChars=${systemPrompt.length + userMessage.length}`);
            const response = await fetch(`${this.aiBaseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.aiApiKey}`,
                    'HTTP-Referer': 'https://portflow.ai',
                    'X-Title': 'PORTFLOW AI Test Chat',
                },
                body: JSON.stringify({
                    model: this.aiModel,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage },
                    ],
                    temperature: 0.2,
                    max_tokens: 1024,
                    provider: { data_collection: 'allow' },
                }),
            });
            this.logger.log(`[AI RESPONSE] test-chat status=${response.status}`);
            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`[AI PROVIDER ERROR] test-chat ${response.status}: ${errorText}`);
                return {
                    error: 'AI_PROVIDER_ERROR',
                    status: response.status,
                    details: errorText,
                };
            }
            const data = await response.json();
            const content = data.choices?.[0]?.message?.content;
            if (!content) {
                this.logger.warn('[AI PROVIDER ERROR] No content in test-chat response');
                return {
                    error: 'AI_PROVIDER_ERROR',
                    details: 'Empty response from model',
                };
            }
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                this.logger.warn('[AI PARSE ERROR] Could not parse JSON from test-chat response');
                return {
                    error: 'AI_PARSE_ERROR',
                    details: 'Model did not return valid JSON',
                    raw: content,
                };
            }
            const parsed = JSON.parse(jsonMatch[0]);
            this.logger.log(`[AI REAL RESPONSE] test-chat intent=${parsed.intent}`);
            return { source: 'ai', ...parsed };
        }
        catch (error) {
            this.logger.error(`[AI PROVIDER ERROR] test-chat exception: ${error}`);
            return { error: 'AI_PROVIDER_ERROR', details: String(error) };
        }
    }
    async getReadinessPrediction(bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                container: true,
                terminal: { select: { name: true } },
                timeSlot: { select: { startTime: true, endTime: true } },
            },
        });
        if (!booking) {
            return {
                bookingId,
                error: 'Booking not found',
            };
        }
        const blockers = [];
        let probability = 100;
        if (booking.container) {
            if (booking.container.status === 'NOT_ARRIVED') {
                blockers.push('Container has not arrived at the terminal');
                probability -= 40;
            }
            else if (booking.container.status === 'IN_YARD') {
                blockers.push('Container is in yard but not yet cleared/ready');
                probability -= 20;
            }
        }
        else if (booking.containerId) {
            blockers.push('Container record not found');
            probability -= 30;
        }
        if (booking.status === 'PENDING') {
            blockers.push('Booking is still pending operator approval');
            probability -= 30;
        }
        else if (booking.status === 'AT_RISK') {
            blockers.push('Booking is flagged as at-risk');
            probability -= 20;
        }
        if (!booking.blockchainHash) {
            blockers.push('No blockchain proof generated yet');
            probability -= 10;
        }
        if (!booking.qrToken) {
            blockers.push('QR code not yet generated');
            probability -= 10;
        }
        if (booking.timeSlot) {
            const now = new Date();
            const slotStart = new Date(booking.timeSlot.startTime);
            const hoursUntil = (slotStart.getTime() - now.getTime()) / (1000 * 60 * 60);
            if (hoursUntil < 0) {
                blockers.push('Time slot has already passed');
                probability -= 30;
            }
        }
        probability = Math.max(0, Math.min(100, probability));
        const riskLevel = probability >= 80 ? 'LOW' : probability >= 50 ? 'MEDIUM' : 'HIGH';
        await this.prisma.readinessPrediction.create({
            data: {
                bookingId,
                probability,
                riskLevel,
                computedAt: new Date(),
            },
        });
        if (probability < 50 &&
            (booking.status === 'CONFIRMED' || booking.status === 'PENDING')) {
            await this.prisma.booking.update({
                where: { id: bookingId },
                data: { status: 'AT_RISK' },
            });
            this.eventsGateway.emitBookingAtRisk(bookingId, {
                probability,
                riskLevel,
                blockers,
            });
        }
        return {
            bookingId,
            status: booking.status,
            containerStatus: booking.container?.status || null,
            terminal: booking.terminal?.name || null,
            timeSlot: booking.timeSlot || null,
            probability,
            riskLevel,
            blockers,
            recommendation: blockers.length === 0
                ? 'Booking is fully ready for gate entry'
                : `${blockers.length} issue(s) need attention before gate entry`,
        };
    }
    MOCK_SLOTS = [
        { date: '2026-02-07', start: '08:00', end: '09:00', congestion: 'high' },
        { date: '2026-02-07', start: '09:30', end: '10:30', congestion: 'low' },
        { date: '2026-02-07', start: '11:00', end: '12:00', congestion: 'medium' },
    ];
    async recommendSlot(message) {
        const isTestMode = this.aiTestMode;
        if (process.env.AI_DISABLED === 'true') {
            this.logger.warn('[AI FALLBACK USED] AI_DISABLED=true → mock response');
            return {
                source: 'fallback',
                recommendedSlot: { date: '2026-02-07', start: '09:30', end: '10:30' },
                reason: 'This slot is in the morning and has low congestion. (mock — AI_DISABLED)',
            };
        }
        if (!this.aiApiKey ||
            this.aiApiKey === 'your-api-key' ||
            this.aiApiKey === 'your-openai-api-key') {
            const msg = 'No valid AI_API_KEY configured';
            this.logger.error(`[AI PROVIDER ERROR] ${msg}`);
            if (isTestMode) {
                return { error: 'AI_PROVIDER_ERROR', details: msg };
            }
            return {
                source: 'fallback',
                recommendedSlot: { date: '2026-02-07', start: '09:30', end: '10:30' },
                reason: 'Fallback: no API key. Best morning slot with low congestion.',
            };
        }
        const systemPrompt = 'You are a scheduling assistant for a maritime port.\n' +
            'You must recommend ONE slot from the provided list.\n' +
            "Prefer low congestion and match the user's time preference.\n" +
            'You must NOT invent new slots.\n' +
            'Respond ONLY with valid JSON in this exact format:\n' +
            '{\n' +
            '  "recommendedSlot": { "date": "YYYY-MM-DD", "start": "HH:MM", "end": "HH:MM" },\n' +
            '  "reason": "Short explanation"\n' +
            '}\n' +
            'If no slot matches, respond: { "message": "No suitable slot found" }';
        const userMessage = `Client request: "${message}"\n\n` +
            `Available slots:\n${JSON.stringify(this.MOCK_SLOTS, null, 2)}`;
        try {
            this.logger.log(`[AI CALL] recommend-slot → model=${this.aiModel} promptChars=${systemPrompt.length + userMessage.length}`);
            const response = await fetch(`${this.aiBaseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.aiApiKey}`,
                    'HTTP-Referer': 'https://portflow.ai',
                    'X-Title': 'PORTFLOW AI Test',
                },
                body: JSON.stringify({
                    model: this.aiModel,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userMessage },
                    ],
                    temperature: 0.3,
                    max_tokens: 256,
                    provider: { data_collection: 'allow' },
                }),
            });
            this.logger.log(`[AI RESPONSE] recommend-slot status=${response.status}`);
            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`[AI PROVIDER ERROR] recommend-slot ${response.status}: ${errorText}`);
                if (isTestMode) {
                    return {
                        error: 'AI_PROVIDER_ERROR',
                        status: response.status,
                        details: errorText,
                    };
                }
                return {
                    source: 'fallback',
                    recommendedSlot: { date: '2026-02-07', start: '09:30', end: '10:30' },
                    reason: 'Fallback: AI API error. Best morning slot with low congestion.',
                };
            }
            const data = await response.json();
            const content = data.choices?.[0]?.message?.content;
            if (!content) {
                this.logger.warn('[AI PROVIDER ERROR] No content in response choices');
                return isTestMode
                    ? { error: 'AI_PROVIDER_ERROR', details: 'Empty response from model' }
                    : { message: 'No suitable slot found' };
            }
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                this.logger.warn('[AI PROVIDER ERROR] Could not parse JSON from AI response');
                return isTestMode
                    ? {
                        error: 'AI_PARSE_ERROR',
                        details: 'Model did not return valid JSON',
                        raw: content,
                    }
                    : { message: 'No suitable slot found' };
            }
            const parsed = JSON.parse(jsonMatch[0]);
            this.logger.log('[AI REAL RESPONSE] recommend-slot returned valid JSON');
            return { source: 'ai', ...parsed };
        }
        catch (error) {
            this.logger.error(`[AI PROVIDER ERROR] recommend-slot exception: ${error}`);
            if (isTestMode) {
                return {
                    error: 'AI_PROVIDER_ERROR',
                    details: String(error),
                };
            }
            return {
                source: 'fallback',
                recommendedSlot: { date: '2026-02-07', start: '09:30', end: '10:30' },
                reason: 'Fallback: AI unavailable. Best morning slot with low congestion.',
            };
        }
    }
};
AiService = AiService_1 = __decorate([
    Injectable(),
    __param(1, Inject(ConfigService)),
    __metadata("design:paramtypes", [PrismaService,
        ConfigService,
        SlotsService,
        BookingService,
        EventsGateway,
        CarrierService])
], AiService);
export { AiService };
//# sourceMappingURL=ai.service.js.map