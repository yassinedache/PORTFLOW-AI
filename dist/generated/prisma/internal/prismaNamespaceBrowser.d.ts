import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Company: "Company";
    readonly User: "User";
    readonly RefreshToken: "RefreshToken";
    readonly Terminal: "Terminal";
    readonly Gate: "Gate";
    readonly TimeSlot: "TimeSlot";
    readonly Booking: "Booking";
    readonly ReadinessPrediction: "ReadinessPrediction";
    readonly ReadinessProof: "ReadinessProof";
    readonly BlockchainProof: "BlockchainProof";
    readonly GateAccessLog: "GateAccessLog";
    readonly Container: "Container";
    readonly TrackingEvent: "TrackingEvent";
    readonly Truck: "Truck";
    readonly TruckLocation: "TruckLocation";
    readonly Document: "Document";
    readonly OcrJob: "OcrJob";
    readonly AiSession: "AiSession";
    readonly AiMessage: "AiMessage";
    readonly Zone: "Zone";
    readonly AuditLog: "AuditLog";
    readonly MetricDaily: "MetricDaily";
    readonly SlotPricing: "SlotPricing";
    readonly PriorityAccess: "PriorityAccess";
    readonly Penalty: "Penalty";
    readonly Notification: "Notification";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const CompanyScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly createdAt: "createdAt";
};
export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly role: "role";
    readonly companyId: "companyId";
    readonly deviceId: "deviceId";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly token: "token";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const TerminalScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly location: "location";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type TerminalScalarFieldEnum = (typeof TerminalScalarFieldEnum)[keyof typeof TerminalScalarFieldEnum];
export declare const GateScalarFieldEnum: {
    readonly id: "id";
    readonly terminalId: "terminalId";
    readonly name: "name";
    readonly isActive: "isActive";
};
export type GateScalarFieldEnum = (typeof GateScalarFieldEnum)[keyof typeof GateScalarFieldEnum];
export declare const TimeSlotScalarFieldEnum: {
    readonly id: "id";
    readonly terminalId: "terminalId";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly capacity: "capacity";
};
export type TimeSlotScalarFieldEnum = (typeof TimeSlotScalarFieldEnum)[keyof typeof TimeSlotScalarFieldEnum];
export declare const BookingScalarFieldEnum: {
    readonly id: "id";
    readonly carrierId: "carrierId";
    readonly terminalId: "terminalId";
    readonly timeSlotId: "timeSlotId";
    readonly status: "status";
    readonly readinessScore: "readinessScore";
    readonly price: "price";
    readonly qrToken: "qrToken";
    readonly blockchainHash: "blockchainHash";
    readonly idempotencyKey: "idempotencyKey";
    readonly truckId: "truckId";
    readonly containerId: "containerId";
    readonly createdAt: "createdAt";
    readonly validatedAt: "validatedAt";
};
export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum];
export declare const ReadinessPredictionScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly probability: "probability";
    readonly riskLevel: "riskLevel";
    readonly computedAt: "computedAt";
};
export type ReadinessPredictionScalarFieldEnum = (typeof ReadinessPredictionScalarFieldEnum)[keyof typeof ReadinessPredictionScalarFieldEnum];
export declare const ReadinessProofScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly containerId: "containerId";
    readonly confirmedBy: "confirmedBy";
    readonly confirmedAt: "confirmedAt";
    readonly blockchainHash: "blockchainHash";
};
export type ReadinessProofScalarFieldEnum = (typeof ReadinessProofScalarFieldEnum)[keyof typeof ReadinessProofScalarFieldEnum];
export declare const BlockchainProofScalarFieldEnum: {
    readonly id: "id";
    readonly entityType: "entityType";
    readonly entityId: "entityId";
    readonly hash: "hash";
    readonly payloadHash: "payloadHash";
    readonly createdAt: "createdAt";
};
export type BlockchainProofScalarFieldEnum = (typeof BlockchainProofScalarFieldEnum)[keyof typeof BlockchainProofScalarFieldEnum];
export declare const GateAccessLogScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly gateId: "gateId";
    readonly result: "result";
    readonly reason: "reason";
    readonly scannedAt: "scannedAt";
};
export type GateAccessLogScalarFieldEnum = (typeof GateAccessLogScalarFieldEnum)[keyof typeof GateAccessLogScalarFieldEnum];
export declare const ContainerScalarFieldEnum: {
    readonly id: "id";
    readonly containerNumber: "containerNumber";
    readonly carrierId: "carrierId";
    readonly terminalId: "terminalId";
    readonly status: "status";
    readonly lastUpdatedAt: "lastUpdatedAt";
    readonly createdAt: "createdAt";
};
export type ContainerScalarFieldEnum = (typeof ContainerScalarFieldEnum)[keyof typeof ContainerScalarFieldEnum];
export declare const TrackingEventScalarFieldEnum: {
    readonly id: "id";
    readonly containerId: "containerId";
    readonly type: "type";
    readonly location: "location";
    readonly timestamp: "timestamp";
};
export type TrackingEventScalarFieldEnum = (typeof TrackingEventScalarFieldEnum)[keyof typeof TrackingEventScalarFieldEnum];
export declare const TruckScalarFieldEnum: {
    readonly id: "id";
    readonly plate: "plate";
    readonly carrierId: "carrierId";
    readonly createdAt: "createdAt";
};
export type TruckScalarFieldEnum = (typeof TruckScalarFieldEnum)[keyof typeof TruckScalarFieldEnum];
export declare const TruckLocationScalarFieldEnum: {
    readonly id: "id";
    readonly truckId: "truckId";
    readonly lat: "lat";
    readonly lng: "lng";
    readonly timestamp: "timestamp";
};
export type TruckLocationScalarFieldEnum = (typeof TruckLocationScalarFieldEnum)[keyof typeof TruckLocationScalarFieldEnum];
export declare const DocumentScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly status: "status";
    readonly fileName: "fileName";
    readonly filePath: "filePath";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum];
export declare const OcrJobScalarFieldEnum: {
    readonly id: "id";
    readonly documentId: "documentId";
    readonly status: "status";
    readonly resultJson: "resultJson";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OcrJobScalarFieldEnum = (typeof OcrJobScalarFieldEnum)[keyof typeof OcrJobScalarFieldEnum];
export declare const AiSessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type AiSessionScalarFieldEnum = (typeof AiSessionScalarFieldEnum)[keyof typeof AiSessionScalarFieldEnum];
export declare const AiMessageScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly role: "role";
    readonly content: "content";
    readonly timestamp: "timestamp";
};
export type AiMessageScalarFieldEnum = (typeof AiMessageScalarFieldEnum)[keyof typeof AiMessageScalarFieldEnum];
export declare const ZoneScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly terminalId: "terminalId";
    readonly type: "type";
    readonly maxTrucks: "maxTrucks";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type ZoneScalarFieldEnum = (typeof ZoneScalarFieldEnum)[keyof typeof ZoneScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly action: "action";
    readonly entity: "entity";
    readonly entityId: "entityId";
    readonly meta: "meta";
    readonly timestamp: "timestamp";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const MetricDailyScalarFieldEnum: {
    readonly id: "id";
    readonly date: "date";
    readonly terminalId: "terminalId";
    readonly avgWaitingTime: "avgWaitingTime";
    readonly totalBookings: "totalBookings";
    readonly revenue: "revenue";
};
export type MetricDailyScalarFieldEnum = (typeof MetricDailyScalarFieldEnum)[keyof typeof MetricDailyScalarFieldEnum];
export declare const SlotPricingScalarFieldEnum: {
    readonly id: "id";
    readonly slotId: "slotId";
    readonly basePrice: "basePrice";
    readonly multiplier: "multiplier";
    readonly finalPrice: "finalPrice";
    readonly reason: "reason";
    readonly isEcoSlot: "isEcoSlot";
    readonly computedAt: "computedAt";
};
export type SlotPricingScalarFieldEnum = (typeof SlotPricingScalarFieldEnum)[keyof typeof SlotPricingScalarFieldEnum];
export declare const PriorityAccessScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly level: "level";
    readonly fee: "fee";
    readonly createdAt: "createdAt";
};
export type PriorityAccessScalarFieldEnum = (typeof PriorityAccessScalarFieldEnum)[keyof typeof PriorityAccessScalarFieldEnum];
export declare const PenaltyScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly type: "type";
    readonly amount: "amount";
    readonly reason: "reason";
    readonly appliedAt: "appliedAt";
};
export type PenaltyScalarFieldEnum = (typeof PenaltyScalarFieldEnum)[keyof typeof PenaltyScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly title: "title";
    readonly message: "message";
    readonly bookingId: "bookingId";
    readonly read: "read";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
