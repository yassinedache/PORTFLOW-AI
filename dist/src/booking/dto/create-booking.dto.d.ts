export declare class CreateBookingDto {
    terminalId: string;
    timeSlotId: string;
    truckId?: string;
    containerId?: string;
    idempotencyKey?: string;
    price?: number;
}
export declare class BookingActionDto {
    reason?: string;
}
