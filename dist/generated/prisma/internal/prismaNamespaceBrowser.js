import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    Company: 'Company',
    User: 'User',
    RefreshToken: 'RefreshToken',
    Terminal: 'Terminal',
    Gate: 'Gate',
    TimeSlot: 'TimeSlot',
    Booking: 'Booking',
    ReadinessPrediction: 'ReadinessPrediction',
    ReadinessProof: 'ReadinessProof',
    BlockchainProof: 'BlockchainProof',
    GateAccessLog: 'GateAccessLog',
    Container: 'Container',
    TrackingEvent: 'TrackingEvent',
    Truck: 'Truck',
    TruckLocation: 'TruckLocation',
    Document: 'Document',
    OcrJob: 'OcrJob',
    AiSession: 'AiSession',
    AiMessage: 'AiMessage',
    Zone: 'Zone',
    AuditLog: 'AuditLog',
    MetricDaily: 'MetricDaily',
    SlotPricing: 'SlotPricing',
    PriorityAccess: 'PriorityAccess',
    Penalty: 'Penalty',
    Notification: 'Notification'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const CompanyScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
};
export const UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    companyId: 'companyId',
    deviceId: 'deviceId',
    createdAt: 'createdAt'
};
export const RefreshTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt'
};
export const TerminalScalarFieldEnum = {
    id: 'id',
    name: 'name',
    location: 'location',
    isActive: 'isActive',
    createdAt: 'createdAt'
};
export const GateScalarFieldEnum = {
    id: 'id',
    terminalId: 'terminalId',
    name: 'name',
    isActive: 'isActive'
};
export const TimeSlotScalarFieldEnum = {
    id: 'id',
    terminalId: 'terminalId',
    startTime: 'startTime',
    endTime: 'endTime',
    capacity: 'capacity'
};
export const BookingScalarFieldEnum = {
    id: 'id',
    carrierId: 'carrierId',
    terminalId: 'terminalId',
    timeSlotId: 'timeSlotId',
    status: 'status',
    readinessScore: 'readinessScore',
    price: 'price',
    qrToken: 'qrToken',
    blockchainHash: 'blockchainHash',
    idempotencyKey: 'idempotencyKey',
    truckId: 'truckId',
    containerId: 'containerId',
    createdAt: 'createdAt',
    validatedAt: 'validatedAt'
};
export const ReadinessPredictionScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    probability: 'probability',
    riskLevel: 'riskLevel',
    computedAt: 'computedAt'
};
export const ReadinessProofScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    containerId: 'containerId',
    confirmedBy: 'confirmedBy',
    confirmedAt: 'confirmedAt',
    blockchainHash: 'blockchainHash'
};
export const BlockchainProofScalarFieldEnum = {
    id: 'id',
    entityType: 'entityType',
    entityId: 'entityId',
    hash: 'hash',
    payloadHash: 'payloadHash',
    createdAt: 'createdAt'
};
export const GateAccessLogScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    gateId: 'gateId',
    result: 'result',
    reason: 'reason',
    scannedAt: 'scannedAt'
};
export const ContainerScalarFieldEnum = {
    id: 'id',
    containerNumber: 'containerNumber',
    carrierId: 'carrierId',
    terminalId: 'terminalId',
    status: 'status',
    lastUpdatedAt: 'lastUpdatedAt',
    createdAt: 'createdAt'
};
export const TrackingEventScalarFieldEnum = {
    id: 'id',
    containerId: 'containerId',
    type: 'type',
    location: 'location',
    timestamp: 'timestamp'
};
export const TruckScalarFieldEnum = {
    id: 'id',
    plate: 'plate',
    carrierId: 'carrierId',
    createdAt: 'createdAt'
};
export const TruckLocationScalarFieldEnum = {
    id: 'id',
    truckId: 'truckId',
    lat: 'lat',
    lng: 'lng',
    timestamp: 'timestamp'
};
export const DocumentScalarFieldEnum = {
    id: 'id',
    type: 'type',
    status: 'status',
    fileName: 'fileName',
    filePath: 'filePath',
    userId: 'userId',
    createdAt: 'createdAt'
};
export const OcrJobScalarFieldEnum = {
    id: 'id',
    documentId: 'documentId',
    status: 'status',
    resultJson: 'resultJson',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const AiSessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt'
};
export const AiMessageScalarFieldEnum = {
    id: 'id',
    sessionId: 'sessionId',
    role: 'role',
    content: 'content',
    timestamp: 'timestamp'
};
export const ZoneScalarFieldEnum = {
    id: 'id',
    name: 'name',
    terminalId: 'terminalId',
    type: 'type',
    maxTrucks: 'maxTrucks',
    isActive: 'isActive',
    createdAt: 'createdAt'
};
export const AuditLogScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    action: 'action',
    entity: 'entity',
    entityId: 'entityId',
    meta: 'meta',
    timestamp: 'timestamp'
};
export const MetricDailyScalarFieldEnum = {
    id: 'id',
    date: 'date',
    terminalId: 'terminalId',
    avgWaitingTime: 'avgWaitingTime',
    totalBookings: 'totalBookings',
    revenue: 'revenue'
};
export const SlotPricingScalarFieldEnum = {
    id: 'id',
    slotId: 'slotId',
    basePrice: 'basePrice',
    multiplier: 'multiplier',
    finalPrice: 'finalPrice',
    reason: 'reason',
    isEcoSlot: 'isEcoSlot',
    computedAt: 'computedAt'
};
export const PriorityAccessScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    level: 'level',
    fee: 'fee',
    createdAt: 'createdAt'
};
export const PenaltyScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    type: 'type',
    amount: 'amount',
    reason: 'reason',
    appliedAt: 'appliedAt'
};
export const NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    message: 'message',
    bookingId: 'bookingId',
    read: 'read',
    createdAt: 'createdAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const NullableJsonNullValueInput = {
    DbNull: DbNull,
    JsonNull: JsonNull
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map