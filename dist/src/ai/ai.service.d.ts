import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { SlotsService } from '../slots/slots.service.js';
import { BookingService } from '../booking/booking.service.js';
import { RequestUser } from '../common/interfaces/jwt-payload.interface.js';
import { AiQueryDto } from './dto/ai.dto.js';
import { EventsGateway } from '../events/events.gateway.js';
import { CarrierService } from '../carrier/carrier.service.js';
export declare enum ConversationStatus {
    IDLE = "IDLE",
    SUGGESTED_SLOTS_SHOWN = "SUGGESTED_SLOTS_SHOWN",
    AWAITING_CONFIRMATION = "AWAITING_CONFIRMATION",
    AWAITING_SLOT_SELECTION = "AWAITING_SLOT_SELECTION",
    AWAITING_INFO = "AWAITING_INFO",
    BOOKING_IN_PROGRESS = "BOOKING_IN_PROGRESS",
    AWAITING_CONTAINER = "AWAITING_CONTAINER",
    CONTAINER_LIST_SHOWN = "CONTAINER_LIST_SHOWN",
    CONTAINER_SELECTED = "CONTAINER_SELECTED",
    COMPLETED = "COMPLETED",
    CANCELED = "CANCELED"
}
export declare enum ConversationIntent {
    NONE = "NONE",
    BOOK_SLOT = "BOOK_SLOT",
    CANCEL_BOOKING = "CANCEL_BOOKING",
    RESCHEDULE_BOOKING = "RESCHEDULE_BOOKING",
    TRACK_CONTAINER = "TRACK_CONTAINER",
    VIEW_BOOKINGS = "VIEW_BOOKINGS",
    CHECK_AVAILABILITY = "CHECK_AVAILABILITY"
}
export declare enum QuestionType {
    NONE = "NONE",
    CONFIRM_BOOK_SLOT = "CONFIRM_BOOK_SLOT",
    SELECT_SLOT = "SELECT_SLOT",
    PROVIDE_TERMINAL = "PROVIDE_TERMINAL",
    PROVIDE_DATE = "PROVIDE_DATE",
    PROVIDE_TIME = "PROVIDE_TIME",
    PROVIDE_CONTAINER = "PROVIDE_CONTAINER",
    SELECT_CONTAINER = "SELECT_CONTAINER",
    PROVIDE_BOOKING_ID = "PROVIDE_BOOKING_ID",
    CONFIRM_CANCEL = "CONFIRM_CANCEL"
}
export interface SlotCandidate {
    slotId: string;
    terminal: string;
    terminalId: string;
    start: string;
    end: string;
    capacity: string;
    date: string;
}
export interface ContainerCandidate {
    id: string;
    containerNumber: string;
    size: string;
    status: string;
}
export interface ConversationContext {
    slotCandidates?: SlotCandidate[];
    suggestedSlotId?: string;
    selectedSlotIndex?: number;
    terminal?: string;
    date?: string;
    time?: string;
    containerNumber?: string;
    truckPlate?: string;
    bookingId?: string;
    containerCandidates?: ContainerCandidate[];
    selectedContainerId?: string;
    bookingDraft?: {
        slotId?: string;
        terminalId?: string;
        timeSlotId?: string;
        containerNumber?: string;
        truckPlate?: string;
    };
    lastPromptType?: string;
    lastPromptTimestamp?: number;
}
export interface ConversationState {
    currentIntent: ConversationIntent;
    status: ConversationStatus;
    lastQuestionType: QuestionType;
    context: ConversationContext;
}
export declare class AiService {
    private readonly prisma;
    private readonly configService;
    private readonly slotsService;
    private readonly bookingService;
    private readonly eventsGateway;
    private readonly carrierService;
    private readonly logger;
    private readonly aiProvider;
    private readonly aiApiKey;
    private readonly aiModel;
    private readonly aiBaseUrl;
    private readonly aiTestMode;
    constructor(prisma: PrismaService, configService: ConfigService, slotsService: SlotsService, bookingService: BookingService, eventsGateway: EventsGateway, carrierService: CarrierService);
    createSession(user: RequestUser): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        status: string;
        currentIntent: string | null;
        lastQuestionType: string | null;
        context: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    startNewChat(user: RequestUser): Promise<{
        sessionId: string;
        status: string;
        greeting: string;
    }>;
    query(dto: AiQueryDto, user: RequestUser): Promise<{
        sessionId: string;
        response: string;
        state: ConversationState;
    }>;
    private loadConversationState;
    private updateSessionState;
    private resetState;
    private readonly SHOW_CONTAINERS_PATTERNS;
    private readonly CONTAINER_NUMBER_PATTERN;
    private runContainerStepResolver;
    private handleShowContainersRequest;
    private handleContainerSelection;
    private handleContainerNumberInput;
    private completeContainerSelection;
    private runYesNoResolver;
    private handleYesResponse;
    private handleNoResponse;
    private handleSlotSelection;
    getHistory(sessionId: string, user: RequestUser): Promise<{
        role: import("../../generated/prisma/enums.js").AiMessageRole;
        id: string;
        content: string;
        timestamp: Date;
        sessionId: string;
    }[]>;
    private processWithLlm;
    private handleToolCalls;
    private executeTool;
    private toolCheckAvailability;
    private toolGetMyBookings;
    private toolGetPortStatus;
    private toolGetHeatmap;
    private toolTrackContainer;
    private toolCreateBooking;
    private toolCancelBooking;
    private toolGetOperatorQueue;
    private toolGetAlerts;
    private processWithLlmStateful;
    private handleToolCallsStateful;
    private inferStateFromResponse;
    private extractSlotsFromResponse;
    private buildSystemPromptStateful;
    private processWithRules;
    private processWithRulesStateful;
    private getMissingSlotsStateful;
    private getQuestionTypeForSlot;
    private askForNextSlotStateful;
    private showSlotsForContext;
    private isShortAnswer;
    private extractEntities;
    private accumulateContextFromHistory;
    private getMissingSlots;
    private detectOngoingTask;
    private handleContextualResponse;
    private continueTaskFlowWithContext;
    private buildAcknowledgement;
    private askForNextSlot;
    private executeCompletedTask;
    private continueTaskFlow;
    private handleAvailabilityQuery;
    private handleMyBookingsQuery;
    private handleBookingIntent;
    private handleCancelIntent;
    private handleContainerTrack;
    private handleStatusQuery;
    private handleOperatorQueueQuery;
    private handleAlertsQuery;
    private handleHelpQuery;
    private buildSystemPrompt;
    private readonly MOCK_CONTEXT;
    testChat(message: string): Promise<Record<string, any>>;
    getReadinessPrediction(bookingId: string): Promise<{
        bookingId: string;
        error: string;
        status?: undefined;
        containerStatus?: undefined;
        terminal?: undefined;
        timeSlot?: undefined;
        probability?: undefined;
        riskLevel?: undefined;
        blockers?: undefined;
        recommendation?: undefined;
    } | {
        bookingId: string;
        status: import("../../generated/prisma/enums.js").BookingStatus;
        containerStatus: import("../../generated/prisma/enums.js").ContainerStatus;
        terminal: string | null;
        timeSlot: {
            startTime: Date;
            endTime: Date;
        };
        probability: number;
        riskLevel: string;
        blockers: string[];
        recommendation: string;
        error?: undefined;
    }>;
    private readonly MOCK_SLOTS;
    recommendSlot(message: string): Promise<Record<string, any>>;
}
