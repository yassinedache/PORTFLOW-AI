export declare const Role: {
    readonly PORT_ADMIN: "PORT_ADMIN";
    readonly TERMINAL_OPERATOR: "TERMINAL_OPERATOR";
    readonly CARRIER: "CARRIER";
    readonly GATE_AGENT: "GATE_AGENT";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const BookingStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly AT_RISK: "AT_RISK";
    readonly READY_TO_GO: "READY_TO_GO";
    readonly REJECTED: "REJECTED";
    readonly CONSUMED: "CONSUMED";
    readonly CANCELLED: "CANCELLED";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
export declare const ContainerStatus: {
    readonly NOT_ARRIVED: "NOT_ARRIVED";
    readonly IN_YARD: "IN_YARD";
    readonly READY: "READY";
    readonly RELEASED: "RELEASED";
};
export type ContainerStatus = (typeof ContainerStatus)[keyof typeof ContainerStatus];
export declare const GateAccessResult: {
    readonly ALLOWED: "ALLOWED";
    readonly DENIED: "DENIED";
};
export type GateAccessResult = (typeof GateAccessResult)[keyof typeof GateAccessResult];
export declare const TrackingEventType: {
    readonly ARRIVED: "ARRIVED";
    readonly DEPARTED: "DEPARTED";
    readonly IN_TRANSIT: "IN_TRANSIT";
    readonly CUSTOMS_HOLD: "CUSTOMS_HOLD";
    readonly RELEASED: "RELEASED";
};
export type TrackingEventType = (typeof TrackingEventType)[keyof typeof TrackingEventType];
export declare const DocumentType: {
    readonly BILL_OF_LADING: "BILL_OF_LADING";
};
export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];
export declare const OcrJobStatus: {
    readonly PENDING: "PENDING";
    readonly PROCESSING: "PROCESSING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
};
export type OcrJobStatus = (typeof OcrJobStatus)[keyof typeof OcrJobStatus];
export declare const AiMessageRole: {
    readonly USER: "USER";
    readonly ASSISTANT: "ASSISTANT";
    readonly SYSTEM: "SYSTEM";
    readonly TOOL: "TOOL";
};
export type AiMessageRole = (typeof AiMessageRole)[keyof typeof AiMessageRole];
