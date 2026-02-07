export declare class CreateZoneDto {
    name: string;
    terminalId: string;
    type?: string;
    maxTrucks?: number;
}
declare const UpdateZoneDto_base: import("@nestjs/common").Type<Partial<CreateZoneDto>>;
export declare class UpdateZoneDto extends UpdateZoneDto_base {
    isActive?: boolean;
}
export {};
