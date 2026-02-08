export const Role = {
    PORT_ADMIN: 'PORT_ADMIN',
    TERMINAL_OPERATOR: 'TERMINAL_OPERATOR',
    CARRIER: 'CARRIER',
    GATE_AGENT: 'GATE_AGENT'
};
export const BookingStatus = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    AT_RISK: 'AT_RISK',
    READY_TO_GO: 'READY_TO_GO',
    REJECTED: 'REJECTED',
    CONSUMED: 'CONSUMED',
    CANCELLED: 'CANCELLED'
};
export const ContainerStatus = {
    NOT_ARRIVED: 'NOT_ARRIVED',
    IN_YARD: 'IN_YARD',
    READY: 'READY',
    RELEASED: 'RELEASED'
};
export const GateAccessResult = {
    ALLOWED: 'ALLOWED',
    DENIED: 'DENIED'
};
export const TrackingEventType = {
    ARRIVED: 'ARRIVED',
    DEPARTED: 'DEPARTED',
    IN_TRANSIT: 'IN_TRANSIT',
    CUSTOMS_HOLD: 'CUSTOMS_HOLD',
    RELEASED: 'RELEASED'
};
export const DocumentType = {
    BILL_OF_LADING: 'BILL_OF_LADING'
};
export const OcrJobStatus = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED'
};
export const AiMessageRole = {
    USER: 'USER',
    ASSISTANT: 'ASSISTANT',
    SYSTEM: 'SYSTEM',
    TOOL: 'TOOL'
};
//# sourceMappingURL=enums.js.map