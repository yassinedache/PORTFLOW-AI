export declare enum ContainerStatusInput {
    NOT_ARRIVED = "NOT_ARRIVED",
    IN_YARD = "IN_YARD",
    READY = "READY",
    RELEASED = "RELEASED"
}
export declare class UpdateContainerStatusDto {
    status: ContainerStatusInput;
}
