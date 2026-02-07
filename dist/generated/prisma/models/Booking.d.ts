import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BookingModel = runtime.Types.Result.DefaultSelection<Prisma.$BookingPayload>;
export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null;
    _avg: BookingAvgAggregateOutputType | null;
    _sum: BookingSumAggregateOutputType | null;
    _min: BookingMinAggregateOutputType | null;
    _max: BookingMaxAggregateOutputType | null;
};
export type BookingAvgAggregateOutputType = {
    price: number | null;
};
export type BookingSumAggregateOutputType = {
    price: number | null;
};
export type BookingMinAggregateOutputType = {
    id: string | null;
    carrierId: string | null;
    terminalId: string | null;
    timeSlotId: string | null;
    status: $Enums.BookingStatus | null;
    price: number | null;
    qrToken: string | null;
    blockchainHash: string | null;
    idempotencyKey: string | null;
    truckId: string | null;
    containerId: string | null;
    createdAt: Date | null;
    validatedAt: Date | null;
};
export type BookingMaxAggregateOutputType = {
    id: string | null;
    carrierId: string | null;
    terminalId: string | null;
    timeSlotId: string | null;
    status: $Enums.BookingStatus | null;
    price: number | null;
    qrToken: string | null;
    blockchainHash: string | null;
    idempotencyKey: string | null;
    truckId: string | null;
    containerId: string | null;
    createdAt: Date | null;
    validatedAt: Date | null;
};
export type BookingCountAggregateOutputType = {
    id: number;
    carrierId: number;
    terminalId: number;
    timeSlotId: number;
    status: number;
    price: number;
    qrToken: number;
    blockchainHash: number;
    idempotencyKey: number;
    truckId: number;
    containerId: number;
    createdAt: number;
    validatedAt: number;
    _all: number;
};
export type BookingAvgAggregateInputType = {
    price?: true;
};
export type BookingSumAggregateInputType = {
    price?: true;
};
export type BookingMinAggregateInputType = {
    id?: true;
    carrierId?: true;
    terminalId?: true;
    timeSlotId?: true;
    status?: true;
    price?: true;
    qrToken?: true;
    blockchainHash?: true;
    idempotencyKey?: true;
    truckId?: true;
    containerId?: true;
    createdAt?: true;
    validatedAt?: true;
};
export type BookingMaxAggregateInputType = {
    id?: true;
    carrierId?: true;
    terminalId?: true;
    timeSlotId?: true;
    status?: true;
    price?: true;
    qrToken?: true;
    blockchainHash?: true;
    idempotencyKey?: true;
    truckId?: true;
    containerId?: true;
    createdAt?: true;
    validatedAt?: true;
};
export type BookingCountAggregateInputType = {
    id?: true;
    carrierId?: true;
    terminalId?: true;
    timeSlotId?: true;
    status?: true;
    price?: true;
    qrToken?: true;
    blockchainHash?: true;
    idempotencyKey?: true;
    truckId?: true;
    containerId?: true;
    createdAt?: true;
    validatedAt?: true;
    _all?: true;
};
export type BookingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BookingCountAggregateInputType;
    _avg?: BookingAvgAggregateInputType;
    _sum?: BookingSumAggregateInputType;
    _min?: BookingMinAggregateInputType;
    _max?: BookingMaxAggregateInputType;
};
export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
    [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBooking[P]> : Prisma.GetScalarType<T[P], AggregateBooking[P]>;
};
export type BookingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithAggregationInput | Prisma.BookingOrderByWithAggregationInput[];
    by: Prisma.BookingScalarFieldEnum[] | Prisma.BookingScalarFieldEnum;
    having?: Prisma.BookingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BookingCountAggregateInputType | true;
    _avg?: BookingAvgAggregateInputType;
    _sum?: BookingSumAggregateInputType;
    _min?: BookingMinAggregateInputType;
    _max?: BookingMaxAggregateInputType;
};
export type BookingGroupByOutputType = {
    id: string;
    carrierId: string;
    terminalId: string;
    timeSlotId: string;
    status: $Enums.BookingStatus;
    price: number | null;
    qrToken: string | null;
    blockchainHash: string | null;
    idempotencyKey: string | null;
    truckId: string | null;
    containerId: string | null;
    createdAt: Date;
    validatedAt: Date | null;
    _count: BookingCountAggregateOutputType | null;
    _avg: BookingAvgAggregateOutputType | null;
    _sum: BookingSumAggregateOutputType | null;
    _min: BookingMinAggregateOutputType | null;
    _max: BookingMaxAggregateOutputType | null;
};
type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BookingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BookingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BookingGroupByOutputType[P]>;
}>>;
export type BookingWhereInput = {
    AND?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    OR?: Prisma.BookingWhereInput[];
    NOT?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    id?: Prisma.UuidFilter<"Booking"> | string;
    carrierId?: Prisma.UuidFilter<"Booking"> | string;
    terminalId?: Prisma.UuidFilter<"Booking"> | string;
    timeSlotId?: Prisma.UuidFilter<"Booking"> | string;
    status?: Prisma.EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus;
    price?: Prisma.FloatNullableFilter<"Booking"> | number | null;
    qrToken?: Prisma.StringNullableFilter<"Booking"> | string | null;
    blockchainHash?: Prisma.StringNullableFilter<"Booking"> | string | null;
    idempotencyKey?: Prisma.StringNullableFilter<"Booking"> | string | null;
    truckId?: Prisma.UuidNullableFilter<"Booking"> | string | null;
    containerId?: Prisma.UuidNullableFilter<"Booking"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    validatedAt?: Prisma.DateTimeNullableFilter<"Booking"> | Date | string | null;
    carrier?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    terminal?: Prisma.XOR<Prisma.TerminalScalarRelationFilter, Prisma.TerminalWhereInput>;
    timeSlot?: Prisma.XOR<Prisma.TimeSlotScalarRelationFilter, Prisma.TimeSlotWhereInput>;
    truck?: Prisma.XOR<Prisma.TruckNullableScalarRelationFilter, Prisma.TruckWhereInput> | null;
    container?: Prisma.XOR<Prisma.ContainerNullableScalarRelationFilter, Prisma.ContainerWhereInput> | null;
    gateAccessLogs?: Prisma.GateAccessLogListRelationFilter;
};
export type BookingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    timeSlotId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    price?: Prisma.SortOrderInput | Prisma.SortOrder;
    qrToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    blockchainHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    truckId?: Prisma.SortOrderInput | Prisma.SortOrder;
    containerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    carrier?: Prisma.UserOrderByWithRelationInput;
    terminal?: Prisma.TerminalOrderByWithRelationInput;
    timeSlot?: Prisma.TimeSlotOrderByWithRelationInput;
    truck?: Prisma.TruckOrderByWithRelationInput;
    container?: Prisma.ContainerOrderByWithRelationInput;
    gateAccessLogs?: Prisma.GateAccessLogOrderByRelationAggregateInput;
};
export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    idempotencyKey?: string;
    AND?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    OR?: Prisma.BookingWhereInput[];
    NOT?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    carrierId?: Prisma.UuidFilter<"Booking"> | string;
    terminalId?: Prisma.UuidFilter<"Booking"> | string;
    timeSlotId?: Prisma.UuidFilter<"Booking"> | string;
    status?: Prisma.EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus;
    price?: Prisma.FloatNullableFilter<"Booking"> | number | null;
    qrToken?: Prisma.StringNullableFilter<"Booking"> | string | null;
    blockchainHash?: Prisma.StringNullableFilter<"Booking"> | string | null;
    truckId?: Prisma.UuidNullableFilter<"Booking"> | string | null;
    containerId?: Prisma.UuidNullableFilter<"Booking"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    validatedAt?: Prisma.DateTimeNullableFilter<"Booking"> | Date | string | null;
    carrier?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    terminal?: Prisma.XOR<Prisma.TerminalScalarRelationFilter, Prisma.TerminalWhereInput>;
    timeSlot?: Prisma.XOR<Prisma.TimeSlotScalarRelationFilter, Prisma.TimeSlotWhereInput>;
    truck?: Prisma.XOR<Prisma.TruckNullableScalarRelationFilter, Prisma.TruckWhereInput> | null;
    container?: Prisma.XOR<Prisma.ContainerNullableScalarRelationFilter, Prisma.ContainerWhereInput> | null;
    gateAccessLogs?: Prisma.GateAccessLogListRelationFilter;
}, "id" | "idempotencyKey">;
export type BookingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    timeSlotId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    price?: Prisma.SortOrderInput | Prisma.SortOrder;
    qrToken?: Prisma.SortOrderInput | Prisma.SortOrder;
    blockchainHash?: Prisma.SortOrderInput | Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    truckId?: Prisma.SortOrderInput | Prisma.SortOrder;
    containerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.BookingCountOrderByAggregateInput;
    _avg?: Prisma.BookingAvgOrderByAggregateInput;
    _max?: Prisma.BookingMaxOrderByAggregateInput;
    _min?: Prisma.BookingMinOrderByAggregateInput;
    _sum?: Prisma.BookingSumOrderByAggregateInput;
};
export type BookingScalarWhereWithAggregatesInput = {
    AND?: Prisma.BookingScalarWhereWithAggregatesInput | Prisma.BookingScalarWhereWithAggregatesInput[];
    OR?: Prisma.BookingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BookingScalarWhereWithAggregatesInput | Prisma.BookingScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Booking"> | string;
    carrierId?: Prisma.UuidWithAggregatesFilter<"Booking"> | string;
    terminalId?: Prisma.UuidWithAggregatesFilter<"Booking"> | string;
    timeSlotId?: Prisma.UuidWithAggregatesFilter<"Booking"> | string;
    status?: Prisma.EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus;
    price?: Prisma.FloatNullableWithAggregatesFilter<"Booking"> | number | null;
    qrToken?: Prisma.StringNullableWithAggregatesFilter<"Booking"> | string | null;
    blockchainHash?: Prisma.StringNullableWithAggregatesFilter<"Booking"> | string | null;
    idempotencyKey?: Prisma.StringNullableWithAggregatesFilter<"Booking"> | string | null;
    truckId?: Prisma.UuidNullableWithAggregatesFilter<"Booking"> | string | null;
    containerId?: Prisma.UuidNullableWithAggregatesFilter<"Booking"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Booking"> | Date | string;
    validatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null;
};
export type BookingCreateInput = {
    id?: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    carrier: Prisma.UserCreateNestedOneWithoutBookingsInput;
    terminal: Prisma.TerminalCreateNestedOneWithoutBookingsInput;
    timeSlot: Prisma.TimeSlotCreateNestedOneWithoutBookingsInput;
    truck?: Prisma.TruckCreateNestedOneWithoutBookingsInput;
    container?: Prisma.ContainerCreateNestedOneWithoutBookingsInput;
    gateAccessLogs?: Prisma.GateAccessLogCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateInput = {
    id?: string;
    carrierId: string;
    terminalId: string;
    timeSlotId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    truckId?: string | null;
    containerId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carrier?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    terminal?: Prisma.TerminalUpdateOneRequiredWithoutBookingsNestedInput;
    timeSlot?: Prisma.TimeSlotUpdateOneRequiredWithoutBookingsNestedInput;
    truck?: Prisma.TruckUpdateOneWithoutBookingsNestedInput;
    container?: Prisma.ContainerUpdateOneWithoutBookingsNestedInput;
    gateAccessLogs?: Prisma.GateAccessLogUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSlotId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    truckId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    containerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingCreateManyInput = {
    id?: string;
    carrierId: string;
    terminalId: string;
    timeSlotId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    truckId?: string | null;
    containerId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
};
export type BookingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BookingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSlotId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    truckId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    containerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BookingListRelationFilter = {
    every?: Prisma.BookingWhereInput;
    some?: Prisma.BookingWhereInput;
    none?: Prisma.BookingWhereInput;
};
export type BookingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BookingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    timeSlotId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    qrToken?: Prisma.SortOrder;
    blockchainHash?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrder;
};
export type BookingAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type BookingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    timeSlotId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    qrToken?: Prisma.SortOrder;
    blockchainHash?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrder;
};
export type BookingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    timeSlotId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    qrToken?: Prisma.SortOrder;
    blockchainHash?: Prisma.SortOrder;
    idempotencyKey?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    validatedAt?: Prisma.SortOrder;
};
export type BookingSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type BookingScalarRelationFilter = {
    is?: Prisma.BookingWhereInput;
    isNot?: Prisma.BookingWhereInput;
};
export type BookingCreateNestedManyWithoutCarrierInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutCarrierInput, Prisma.BookingUncheckedCreateWithoutCarrierInput> | Prisma.BookingCreateWithoutCarrierInput[] | Prisma.BookingUncheckedCreateWithoutCarrierInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutCarrierInput | Prisma.BookingCreateOrConnectWithoutCarrierInput[];
    createMany?: Prisma.BookingCreateManyCarrierInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutCarrierInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutCarrierInput, Prisma.BookingUncheckedCreateWithoutCarrierInput> | Prisma.BookingCreateWithoutCarrierInput[] | Prisma.BookingUncheckedCreateWithoutCarrierInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutCarrierInput | Prisma.BookingCreateOrConnectWithoutCarrierInput[];
    createMany?: Prisma.BookingCreateManyCarrierInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUpdateManyWithoutCarrierNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutCarrierInput, Prisma.BookingUncheckedCreateWithoutCarrierInput> | Prisma.BookingCreateWithoutCarrierInput[] | Prisma.BookingUncheckedCreateWithoutCarrierInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutCarrierInput | Prisma.BookingCreateOrConnectWithoutCarrierInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutCarrierInput | Prisma.BookingUpsertWithWhereUniqueWithoutCarrierInput[];
    createMany?: Prisma.BookingCreateManyCarrierInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutCarrierInput | Prisma.BookingUpdateWithWhereUniqueWithoutCarrierInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutCarrierInput | Prisma.BookingUpdateManyWithWhereWithoutCarrierInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutCarrierNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutCarrierInput, Prisma.BookingUncheckedCreateWithoutCarrierInput> | Prisma.BookingCreateWithoutCarrierInput[] | Prisma.BookingUncheckedCreateWithoutCarrierInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutCarrierInput | Prisma.BookingCreateOrConnectWithoutCarrierInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutCarrierInput | Prisma.BookingUpsertWithWhereUniqueWithoutCarrierInput[];
    createMany?: Prisma.BookingCreateManyCarrierInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutCarrierInput | Prisma.BookingUpdateWithWhereUniqueWithoutCarrierInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutCarrierInput | Prisma.BookingUpdateManyWithWhereWithoutCarrierInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingCreateNestedManyWithoutTerminalInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTerminalInput, Prisma.BookingUncheckedCreateWithoutTerminalInput> | Prisma.BookingCreateWithoutTerminalInput[] | Prisma.BookingUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTerminalInput | Prisma.BookingCreateOrConnectWithoutTerminalInput[];
    createMany?: Prisma.BookingCreateManyTerminalInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutTerminalInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTerminalInput, Prisma.BookingUncheckedCreateWithoutTerminalInput> | Prisma.BookingCreateWithoutTerminalInput[] | Prisma.BookingUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTerminalInput | Prisma.BookingCreateOrConnectWithoutTerminalInput[];
    createMany?: Prisma.BookingCreateManyTerminalInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUpdateManyWithoutTerminalNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTerminalInput, Prisma.BookingUncheckedCreateWithoutTerminalInput> | Prisma.BookingCreateWithoutTerminalInput[] | Prisma.BookingUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTerminalInput | Prisma.BookingCreateOrConnectWithoutTerminalInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutTerminalInput | Prisma.BookingUpsertWithWhereUniqueWithoutTerminalInput[];
    createMany?: Prisma.BookingCreateManyTerminalInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutTerminalInput | Prisma.BookingUpdateWithWhereUniqueWithoutTerminalInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutTerminalInput | Prisma.BookingUpdateManyWithWhereWithoutTerminalInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutTerminalNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTerminalInput, Prisma.BookingUncheckedCreateWithoutTerminalInput> | Prisma.BookingCreateWithoutTerminalInput[] | Prisma.BookingUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTerminalInput | Prisma.BookingCreateOrConnectWithoutTerminalInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutTerminalInput | Prisma.BookingUpsertWithWhereUniqueWithoutTerminalInput[];
    createMany?: Prisma.BookingCreateManyTerminalInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutTerminalInput | Prisma.BookingUpdateWithWhereUniqueWithoutTerminalInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutTerminalInput | Prisma.BookingUpdateManyWithWhereWithoutTerminalInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingCreateNestedManyWithoutTimeSlotInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTimeSlotInput, Prisma.BookingUncheckedCreateWithoutTimeSlotInput> | Prisma.BookingCreateWithoutTimeSlotInput[] | Prisma.BookingUncheckedCreateWithoutTimeSlotInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTimeSlotInput | Prisma.BookingCreateOrConnectWithoutTimeSlotInput[];
    createMany?: Prisma.BookingCreateManyTimeSlotInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutTimeSlotInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTimeSlotInput, Prisma.BookingUncheckedCreateWithoutTimeSlotInput> | Prisma.BookingCreateWithoutTimeSlotInput[] | Prisma.BookingUncheckedCreateWithoutTimeSlotInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTimeSlotInput | Prisma.BookingCreateOrConnectWithoutTimeSlotInput[];
    createMany?: Prisma.BookingCreateManyTimeSlotInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUpdateManyWithoutTimeSlotNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTimeSlotInput, Prisma.BookingUncheckedCreateWithoutTimeSlotInput> | Prisma.BookingCreateWithoutTimeSlotInput[] | Prisma.BookingUncheckedCreateWithoutTimeSlotInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTimeSlotInput | Prisma.BookingCreateOrConnectWithoutTimeSlotInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutTimeSlotInput | Prisma.BookingUpsertWithWhereUniqueWithoutTimeSlotInput[];
    createMany?: Prisma.BookingCreateManyTimeSlotInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutTimeSlotInput | Prisma.BookingUpdateWithWhereUniqueWithoutTimeSlotInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutTimeSlotInput | Prisma.BookingUpdateManyWithWhereWithoutTimeSlotInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutTimeSlotNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTimeSlotInput, Prisma.BookingUncheckedCreateWithoutTimeSlotInput> | Prisma.BookingCreateWithoutTimeSlotInput[] | Prisma.BookingUncheckedCreateWithoutTimeSlotInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTimeSlotInput | Prisma.BookingCreateOrConnectWithoutTimeSlotInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutTimeSlotInput | Prisma.BookingUpsertWithWhereUniqueWithoutTimeSlotInput[];
    createMany?: Prisma.BookingCreateManyTimeSlotInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutTimeSlotInput | Prisma.BookingUpdateWithWhereUniqueWithoutTimeSlotInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutTimeSlotInput | Prisma.BookingUpdateManyWithWhereWithoutTimeSlotInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type BookingCreateNestedOneWithoutGateAccessLogsInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutGateAccessLogsInput, Prisma.BookingUncheckedCreateWithoutGateAccessLogsInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutGateAccessLogsInput;
    connect?: Prisma.BookingWhereUniqueInput;
};
export type BookingUpdateOneRequiredWithoutGateAccessLogsNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutGateAccessLogsInput, Prisma.BookingUncheckedCreateWithoutGateAccessLogsInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutGateAccessLogsInput;
    upsert?: Prisma.BookingUpsertWithoutGateAccessLogsInput;
    connect?: Prisma.BookingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BookingUpdateToOneWithWhereWithoutGateAccessLogsInput, Prisma.BookingUpdateWithoutGateAccessLogsInput>, Prisma.BookingUncheckedUpdateWithoutGateAccessLogsInput>;
};
export type BookingCreateNestedManyWithoutContainerInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutContainerInput, Prisma.BookingUncheckedCreateWithoutContainerInput> | Prisma.BookingCreateWithoutContainerInput[] | Prisma.BookingUncheckedCreateWithoutContainerInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutContainerInput | Prisma.BookingCreateOrConnectWithoutContainerInput[];
    createMany?: Prisma.BookingCreateManyContainerInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutContainerInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutContainerInput, Prisma.BookingUncheckedCreateWithoutContainerInput> | Prisma.BookingCreateWithoutContainerInput[] | Prisma.BookingUncheckedCreateWithoutContainerInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutContainerInput | Prisma.BookingCreateOrConnectWithoutContainerInput[];
    createMany?: Prisma.BookingCreateManyContainerInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUpdateManyWithoutContainerNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutContainerInput, Prisma.BookingUncheckedCreateWithoutContainerInput> | Prisma.BookingCreateWithoutContainerInput[] | Prisma.BookingUncheckedCreateWithoutContainerInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutContainerInput | Prisma.BookingCreateOrConnectWithoutContainerInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutContainerInput | Prisma.BookingUpsertWithWhereUniqueWithoutContainerInput[];
    createMany?: Prisma.BookingCreateManyContainerInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutContainerInput | Prisma.BookingUpdateWithWhereUniqueWithoutContainerInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutContainerInput | Prisma.BookingUpdateManyWithWhereWithoutContainerInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutContainerNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutContainerInput, Prisma.BookingUncheckedCreateWithoutContainerInput> | Prisma.BookingCreateWithoutContainerInput[] | Prisma.BookingUncheckedCreateWithoutContainerInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutContainerInput | Prisma.BookingCreateOrConnectWithoutContainerInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutContainerInput | Prisma.BookingUpsertWithWhereUniqueWithoutContainerInput[];
    createMany?: Prisma.BookingCreateManyContainerInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutContainerInput | Prisma.BookingUpdateWithWhereUniqueWithoutContainerInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutContainerInput | Prisma.BookingUpdateManyWithWhereWithoutContainerInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingCreateNestedManyWithoutTruckInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTruckInput, Prisma.BookingUncheckedCreateWithoutTruckInput> | Prisma.BookingCreateWithoutTruckInput[] | Prisma.BookingUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTruckInput | Prisma.BookingCreateOrConnectWithoutTruckInput[];
    createMany?: Prisma.BookingCreateManyTruckInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutTruckInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTruckInput, Prisma.BookingUncheckedCreateWithoutTruckInput> | Prisma.BookingCreateWithoutTruckInput[] | Prisma.BookingUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTruckInput | Prisma.BookingCreateOrConnectWithoutTruckInput[];
    createMany?: Prisma.BookingCreateManyTruckInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUpdateManyWithoutTruckNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTruckInput, Prisma.BookingUncheckedCreateWithoutTruckInput> | Prisma.BookingCreateWithoutTruckInput[] | Prisma.BookingUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTruckInput | Prisma.BookingCreateOrConnectWithoutTruckInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutTruckInput | Prisma.BookingUpsertWithWhereUniqueWithoutTruckInput[];
    createMany?: Prisma.BookingCreateManyTruckInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutTruckInput | Prisma.BookingUpdateWithWhereUniqueWithoutTruckInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutTruckInput | Prisma.BookingUpdateManyWithWhereWithoutTruckInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutTruckNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTruckInput, Prisma.BookingUncheckedCreateWithoutTruckInput> | Prisma.BookingCreateWithoutTruckInput[] | Prisma.BookingUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTruckInput | Prisma.BookingCreateOrConnectWithoutTruckInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutTruckInput | Prisma.BookingUpsertWithWhereUniqueWithoutTruckInput[];
    createMany?: Prisma.BookingCreateManyTruckInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutTruckInput | Prisma.BookingUpdateWithWhereUniqueWithoutTruckInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutTruckInput | Prisma.BookingUpdateManyWithWhereWithoutTruckInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingCreateWithoutCarrierInput = {
    id?: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    terminal: Prisma.TerminalCreateNestedOneWithoutBookingsInput;
    timeSlot: Prisma.TimeSlotCreateNestedOneWithoutBookingsInput;
    truck?: Prisma.TruckCreateNestedOneWithoutBookingsInput;
    container?: Prisma.ContainerCreateNestedOneWithoutBookingsInput;
    gateAccessLogs?: Prisma.GateAccessLogCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutCarrierInput = {
    id?: string;
    terminalId: string;
    timeSlotId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    truckId?: string | null;
    containerId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutCarrierInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutCarrierInput, Prisma.BookingUncheckedCreateWithoutCarrierInput>;
};
export type BookingCreateManyCarrierInputEnvelope = {
    data: Prisma.BookingCreateManyCarrierInput | Prisma.BookingCreateManyCarrierInput[];
    skipDuplicates?: boolean;
};
export type BookingUpsertWithWhereUniqueWithoutCarrierInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutCarrierInput, Prisma.BookingUncheckedUpdateWithoutCarrierInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutCarrierInput, Prisma.BookingUncheckedCreateWithoutCarrierInput>;
};
export type BookingUpdateWithWhereUniqueWithoutCarrierInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutCarrierInput, Prisma.BookingUncheckedUpdateWithoutCarrierInput>;
};
export type BookingUpdateManyWithWhereWithoutCarrierInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutCarrierInput>;
};
export type BookingScalarWhereInput = {
    AND?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
    OR?: Prisma.BookingScalarWhereInput[];
    NOT?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
    id?: Prisma.UuidFilter<"Booking"> | string;
    carrierId?: Prisma.UuidFilter<"Booking"> | string;
    terminalId?: Prisma.UuidFilter<"Booking"> | string;
    timeSlotId?: Prisma.UuidFilter<"Booking"> | string;
    status?: Prisma.EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus;
    price?: Prisma.FloatNullableFilter<"Booking"> | number | null;
    qrToken?: Prisma.StringNullableFilter<"Booking"> | string | null;
    blockchainHash?: Prisma.StringNullableFilter<"Booking"> | string | null;
    idempotencyKey?: Prisma.StringNullableFilter<"Booking"> | string | null;
    truckId?: Prisma.UuidNullableFilter<"Booking"> | string | null;
    containerId?: Prisma.UuidNullableFilter<"Booking"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    validatedAt?: Prisma.DateTimeNullableFilter<"Booking"> | Date | string | null;
};
export type BookingCreateWithoutTerminalInput = {
    id?: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    carrier: Prisma.UserCreateNestedOneWithoutBookingsInput;
    timeSlot: Prisma.TimeSlotCreateNestedOneWithoutBookingsInput;
    truck?: Prisma.TruckCreateNestedOneWithoutBookingsInput;
    container?: Prisma.ContainerCreateNestedOneWithoutBookingsInput;
    gateAccessLogs?: Prisma.GateAccessLogCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutTerminalInput = {
    id?: string;
    carrierId: string;
    timeSlotId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    truckId?: string | null;
    containerId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutTerminalInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutTerminalInput, Prisma.BookingUncheckedCreateWithoutTerminalInput>;
};
export type BookingCreateManyTerminalInputEnvelope = {
    data: Prisma.BookingCreateManyTerminalInput | Prisma.BookingCreateManyTerminalInput[];
    skipDuplicates?: boolean;
};
export type BookingUpsertWithWhereUniqueWithoutTerminalInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutTerminalInput, Prisma.BookingUncheckedUpdateWithoutTerminalInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutTerminalInput, Prisma.BookingUncheckedCreateWithoutTerminalInput>;
};
export type BookingUpdateWithWhereUniqueWithoutTerminalInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutTerminalInput, Prisma.BookingUncheckedUpdateWithoutTerminalInput>;
};
export type BookingUpdateManyWithWhereWithoutTerminalInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutTerminalInput>;
};
export type BookingCreateWithoutTimeSlotInput = {
    id?: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    carrier: Prisma.UserCreateNestedOneWithoutBookingsInput;
    terminal: Prisma.TerminalCreateNestedOneWithoutBookingsInput;
    truck?: Prisma.TruckCreateNestedOneWithoutBookingsInput;
    container?: Prisma.ContainerCreateNestedOneWithoutBookingsInput;
    gateAccessLogs?: Prisma.GateAccessLogCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutTimeSlotInput = {
    id?: string;
    carrierId: string;
    terminalId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    truckId?: string | null;
    containerId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutTimeSlotInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutTimeSlotInput, Prisma.BookingUncheckedCreateWithoutTimeSlotInput>;
};
export type BookingCreateManyTimeSlotInputEnvelope = {
    data: Prisma.BookingCreateManyTimeSlotInput | Prisma.BookingCreateManyTimeSlotInput[];
    skipDuplicates?: boolean;
};
export type BookingUpsertWithWhereUniqueWithoutTimeSlotInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutTimeSlotInput, Prisma.BookingUncheckedUpdateWithoutTimeSlotInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutTimeSlotInput, Prisma.BookingUncheckedCreateWithoutTimeSlotInput>;
};
export type BookingUpdateWithWhereUniqueWithoutTimeSlotInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutTimeSlotInput, Prisma.BookingUncheckedUpdateWithoutTimeSlotInput>;
};
export type BookingUpdateManyWithWhereWithoutTimeSlotInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutTimeSlotInput>;
};
export type BookingCreateWithoutGateAccessLogsInput = {
    id?: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    carrier: Prisma.UserCreateNestedOneWithoutBookingsInput;
    terminal: Prisma.TerminalCreateNestedOneWithoutBookingsInput;
    timeSlot: Prisma.TimeSlotCreateNestedOneWithoutBookingsInput;
    truck?: Prisma.TruckCreateNestedOneWithoutBookingsInput;
    container?: Prisma.ContainerCreateNestedOneWithoutBookingsInput;
};
export type BookingUncheckedCreateWithoutGateAccessLogsInput = {
    id?: string;
    carrierId: string;
    terminalId: string;
    timeSlotId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    truckId?: string | null;
    containerId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
};
export type BookingCreateOrConnectWithoutGateAccessLogsInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutGateAccessLogsInput, Prisma.BookingUncheckedCreateWithoutGateAccessLogsInput>;
};
export type BookingUpsertWithoutGateAccessLogsInput = {
    update: Prisma.XOR<Prisma.BookingUpdateWithoutGateAccessLogsInput, Prisma.BookingUncheckedUpdateWithoutGateAccessLogsInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutGateAccessLogsInput, Prisma.BookingUncheckedCreateWithoutGateAccessLogsInput>;
    where?: Prisma.BookingWhereInput;
};
export type BookingUpdateToOneWithWhereWithoutGateAccessLogsInput = {
    where?: Prisma.BookingWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutGateAccessLogsInput, Prisma.BookingUncheckedUpdateWithoutGateAccessLogsInput>;
};
export type BookingUpdateWithoutGateAccessLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carrier?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    terminal?: Prisma.TerminalUpdateOneRequiredWithoutBookingsNestedInput;
    timeSlot?: Prisma.TimeSlotUpdateOneRequiredWithoutBookingsNestedInput;
    truck?: Prisma.TruckUpdateOneWithoutBookingsNestedInput;
    container?: Prisma.ContainerUpdateOneWithoutBookingsNestedInput;
};
export type BookingUncheckedUpdateWithoutGateAccessLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSlotId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    truckId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    containerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BookingCreateWithoutContainerInput = {
    id?: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    carrier: Prisma.UserCreateNestedOneWithoutBookingsInput;
    terminal: Prisma.TerminalCreateNestedOneWithoutBookingsInput;
    timeSlot: Prisma.TimeSlotCreateNestedOneWithoutBookingsInput;
    truck?: Prisma.TruckCreateNestedOneWithoutBookingsInput;
    gateAccessLogs?: Prisma.GateAccessLogCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutContainerInput = {
    id?: string;
    carrierId: string;
    terminalId: string;
    timeSlotId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    truckId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutContainerInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutContainerInput, Prisma.BookingUncheckedCreateWithoutContainerInput>;
};
export type BookingCreateManyContainerInputEnvelope = {
    data: Prisma.BookingCreateManyContainerInput | Prisma.BookingCreateManyContainerInput[];
    skipDuplicates?: boolean;
};
export type BookingUpsertWithWhereUniqueWithoutContainerInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutContainerInput, Prisma.BookingUncheckedUpdateWithoutContainerInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutContainerInput, Prisma.BookingUncheckedCreateWithoutContainerInput>;
};
export type BookingUpdateWithWhereUniqueWithoutContainerInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutContainerInput, Prisma.BookingUncheckedUpdateWithoutContainerInput>;
};
export type BookingUpdateManyWithWhereWithoutContainerInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutContainerInput>;
};
export type BookingCreateWithoutTruckInput = {
    id?: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    carrier: Prisma.UserCreateNestedOneWithoutBookingsInput;
    terminal: Prisma.TerminalCreateNestedOneWithoutBookingsInput;
    timeSlot: Prisma.TimeSlotCreateNestedOneWithoutBookingsInput;
    container?: Prisma.ContainerCreateNestedOneWithoutBookingsInput;
    gateAccessLogs?: Prisma.GateAccessLogCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutTruckInput = {
    id?: string;
    carrierId: string;
    terminalId: string;
    timeSlotId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    containerId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutTruckInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutTruckInput, Prisma.BookingUncheckedCreateWithoutTruckInput>;
};
export type BookingCreateManyTruckInputEnvelope = {
    data: Prisma.BookingCreateManyTruckInput | Prisma.BookingCreateManyTruckInput[];
    skipDuplicates?: boolean;
};
export type BookingUpsertWithWhereUniqueWithoutTruckInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutTruckInput, Prisma.BookingUncheckedUpdateWithoutTruckInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutTruckInput, Prisma.BookingUncheckedCreateWithoutTruckInput>;
};
export type BookingUpdateWithWhereUniqueWithoutTruckInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutTruckInput, Prisma.BookingUncheckedUpdateWithoutTruckInput>;
};
export type BookingUpdateManyWithWhereWithoutTruckInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutTruckInput>;
};
export type BookingCreateManyCarrierInput = {
    id?: string;
    terminalId: string;
    timeSlotId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    truckId?: string | null;
    containerId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
};
export type BookingUpdateWithoutCarrierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    terminal?: Prisma.TerminalUpdateOneRequiredWithoutBookingsNestedInput;
    timeSlot?: Prisma.TimeSlotUpdateOneRequiredWithoutBookingsNestedInput;
    truck?: Prisma.TruckUpdateOneWithoutBookingsNestedInput;
    container?: Prisma.ContainerUpdateOneWithoutBookingsNestedInput;
    gateAccessLogs?: Prisma.GateAccessLogUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutCarrierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSlotId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    truckId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    containerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateManyWithoutCarrierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSlotId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    truckId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    containerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BookingCreateManyTerminalInput = {
    id?: string;
    carrierId: string;
    timeSlotId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    truckId?: string | null;
    containerId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
};
export type BookingUpdateWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carrier?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    timeSlot?: Prisma.TimeSlotUpdateOneRequiredWithoutBookingsNestedInput;
    truck?: Prisma.TruckUpdateOneWithoutBookingsNestedInput;
    container?: Prisma.ContainerUpdateOneWithoutBookingsNestedInput;
    gateAccessLogs?: Prisma.GateAccessLogUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSlotId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    truckId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    containerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateManyWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSlotId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    truckId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    containerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BookingCreateManyTimeSlotInput = {
    id?: string;
    carrierId: string;
    terminalId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    truckId?: string | null;
    containerId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
};
export type BookingUpdateWithoutTimeSlotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carrier?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    terminal?: Prisma.TerminalUpdateOneRequiredWithoutBookingsNestedInput;
    truck?: Prisma.TruckUpdateOneWithoutBookingsNestedInput;
    container?: Prisma.ContainerUpdateOneWithoutBookingsNestedInput;
    gateAccessLogs?: Prisma.GateAccessLogUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutTimeSlotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    truckId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    containerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateManyWithoutTimeSlotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    truckId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    containerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BookingCreateManyContainerInput = {
    id?: string;
    carrierId: string;
    terminalId: string;
    timeSlotId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    truckId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
};
export type BookingUpdateWithoutContainerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carrier?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    terminal?: Prisma.TerminalUpdateOneRequiredWithoutBookingsNestedInput;
    timeSlot?: Prisma.TimeSlotUpdateOneRequiredWithoutBookingsNestedInput;
    truck?: Prisma.TruckUpdateOneWithoutBookingsNestedInput;
    gateAccessLogs?: Prisma.GateAccessLogUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutContainerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSlotId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    truckId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateManyWithoutContainerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSlotId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    truckId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BookingCreateManyTruckInput = {
    id?: string;
    carrierId: string;
    terminalId: string;
    timeSlotId: string;
    status?: $Enums.BookingStatus;
    price?: number | null;
    qrToken?: string | null;
    blockchainHash?: string | null;
    idempotencyKey?: string | null;
    containerId?: string | null;
    createdAt?: Date | string;
    validatedAt?: Date | string | null;
};
export type BookingUpdateWithoutTruckInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    carrier?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    terminal?: Prisma.TerminalUpdateOneRequiredWithoutBookingsNestedInput;
    timeSlot?: Prisma.TimeSlotUpdateOneRequiredWithoutBookingsNestedInput;
    container?: Prisma.ContainerUpdateOneWithoutBookingsNestedInput;
    gateAccessLogs?: Prisma.GateAccessLogUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutTruckInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSlotId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    containerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateManyWithoutTruckInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    timeSlotId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    price?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    qrToken?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    blockchainHash?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    idempotencyKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    containerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    validatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BookingCountOutputType = {
    gateAccessLogs: number;
};
export type BookingCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    gateAccessLogs?: boolean | BookingCountOutputTypeCountGateAccessLogsArgs;
};
export type BookingCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingCountOutputTypeSelect<ExtArgs> | null;
};
export type BookingCountOutputTypeCountGateAccessLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GateAccessLogWhereInput;
};
export type BookingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    carrierId?: boolean;
    terminalId?: boolean;
    timeSlotId?: boolean;
    status?: boolean;
    price?: boolean;
    qrToken?: boolean;
    blockchainHash?: boolean;
    idempotencyKey?: boolean;
    truckId?: boolean;
    containerId?: boolean;
    createdAt?: boolean;
    validatedAt?: boolean;
    carrier?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
    timeSlot?: boolean | Prisma.TimeSlotDefaultArgs<ExtArgs>;
    truck?: boolean | Prisma.Booking$truckArgs<ExtArgs>;
    container?: boolean | Prisma.Booking$containerArgs<ExtArgs>;
    gateAccessLogs?: boolean | Prisma.Booking$gateAccessLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.BookingCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["booking"]>;
export type BookingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    carrierId?: boolean;
    terminalId?: boolean;
    timeSlotId?: boolean;
    status?: boolean;
    price?: boolean;
    qrToken?: boolean;
    blockchainHash?: boolean;
    idempotencyKey?: boolean;
    truckId?: boolean;
    containerId?: boolean;
    createdAt?: boolean;
    validatedAt?: boolean;
    carrier?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
    timeSlot?: boolean | Prisma.TimeSlotDefaultArgs<ExtArgs>;
    truck?: boolean | Prisma.Booking$truckArgs<ExtArgs>;
    container?: boolean | Prisma.Booking$containerArgs<ExtArgs>;
}, ExtArgs["result"]["booking"]>;
export type BookingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    carrierId?: boolean;
    terminalId?: boolean;
    timeSlotId?: boolean;
    status?: boolean;
    price?: boolean;
    qrToken?: boolean;
    blockchainHash?: boolean;
    idempotencyKey?: boolean;
    truckId?: boolean;
    containerId?: boolean;
    createdAt?: boolean;
    validatedAt?: boolean;
    carrier?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
    timeSlot?: boolean | Prisma.TimeSlotDefaultArgs<ExtArgs>;
    truck?: boolean | Prisma.Booking$truckArgs<ExtArgs>;
    container?: boolean | Prisma.Booking$containerArgs<ExtArgs>;
}, ExtArgs["result"]["booking"]>;
export type BookingSelectScalar = {
    id?: boolean;
    carrierId?: boolean;
    terminalId?: boolean;
    timeSlotId?: boolean;
    status?: boolean;
    price?: boolean;
    qrToken?: boolean;
    blockchainHash?: boolean;
    idempotencyKey?: boolean;
    truckId?: boolean;
    containerId?: boolean;
    createdAt?: boolean;
    validatedAt?: boolean;
};
export type BookingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "carrierId" | "terminalId" | "timeSlotId" | "status" | "price" | "qrToken" | "blockchainHash" | "idempotencyKey" | "truckId" | "containerId" | "createdAt" | "validatedAt", ExtArgs["result"]["booking"]>;
export type BookingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    carrier?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
    timeSlot?: boolean | Prisma.TimeSlotDefaultArgs<ExtArgs>;
    truck?: boolean | Prisma.Booking$truckArgs<ExtArgs>;
    container?: boolean | Prisma.Booking$containerArgs<ExtArgs>;
    gateAccessLogs?: boolean | Prisma.Booking$gateAccessLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.BookingCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BookingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    carrier?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
    timeSlot?: boolean | Prisma.TimeSlotDefaultArgs<ExtArgs>;
    truck?: boolean | Prisma.Booking$truckArgs<ExtArgs>;
    container?: boolean | Prisma.Booking$containerArgs<ExtArgs>;
};
export type BookingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    carrier?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
    timeSlot?: boolean | Prisma.TimeSlotDefaultArgs<ExtArgs>;
    truck?: boolean | Prisma.Booking$truckArgs<ExtArgs>;
    container?: boolean | Prisma.Booking$containerArgs<ExtArgs>;
};
export type $BookingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Booking";
    objects: {
        carrier: Prisma.$UserPayload<ExtArgs>;
        terminal: Prisma.$TerminalPayload<ExtArgs>;
        timeSlot: Prisma.$TimeSlotPayload<ExtArgs>;
        truck: Prisma.$TruckPayload<ExtArgs> | null;
        container: Prisma.$ContainerPayload<ExtArgs> | null;
        gateAccessLogs: Prisma.$GateAccessLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        carrierId: string;
        terminalId: string;
        timeSlotId: string;
        status: $Enums.BookingStatus;
        price: number | null;
        qrToken: string | null;
        blockchainHash: string | null;
        idempotencyKey: string | null;
        truckId: string | null;
        containerId: string | null;
        createdAt: Date;
        validatedAt: Date | null;
    }, ExtArgs["result"]["booking"]>;
    composites: {};
};
export type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BookingPayload, S>;
export type BookingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BookingCountAggregateInputType | true;
};
export interface BookingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Booking'];
        meta: {
            name: 'Booking';
        };
    };
    findUnique<T extends BookingFindUniqueArgs>(args: Prisma.SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BookingFindFirstArgs>(args?: Prisma.SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BookingFindManyArgs>(args?: Prisma.SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BookingCreateArgs>(args: Prisma.SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BookingCreateManyArgs>(args?: Prisma.SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BookingDeleteArgs>(args: Prisma.SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BookingUpdateArgs>(args: Prisma.SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BookingDeleteManyArgs>(args?: Prisma.SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BookingUpdateManyArgs>(args: Prisma.SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BookingUpsertArgs>(args: Prisma.SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BookingCountArgs>(args?: Prisma.Subset<T, BookingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BookingCountAggregateOutputType> : number>;
    aggregate<T extends BookingAggregateArgs>(args: Prisma.Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>;
    groupBy<T extends BookingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BookingGroupByArgs['orderBy'];
    } : {
        orderBy?: BookingGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BookingFieldRefs;
}
export interface Prisma__BookingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    carrier<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    terminal<T extends Prisma.TerminalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TerminalDefaultArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    timeSlot<T extends Prisma.TimeSlotDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TimeSlotDefaultArgs<ExtArgs>>): Prisma.Prisma__TimeSlotClient<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    truck<T extends Prisma.Booking$truckArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Booking$truckArgs<ExtArgs>>): Prisma.Prisma__TruckClient<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    container<T extends Prisma.Booking$containerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Booking$containerArgs<ExtArgs>>): Prisma.Prisma__ContainerClient<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    gateAccessLogs<T extends Prisma.Booking$gateAccessLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Booking$gateAccessLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BookingFieldRefs {
    readonly id: Prisma.FieldRef<"Booking", 'String'>;
    readonly carrierId: Prisma.FieldRef<"Booking", 'String'>;
    readonly terminalId: Prisma.FieldRef<"Booking", 'String'>;
    readonly timeSlotId: Prisma.FieldRef<"Booking", 'String'>;
    readonly status: Prisma.FieldRef<"Booking", 'BookingStatus'>;
    readonly price: Prisma.FieldRef<"Booking", 'Float'>;
    readonly qrToken: Prisma.FieldRef<"Booking", 'String'>;
    readonly blockchainHash: Prisma.FieldRef<"Booking", 'String'>;
    readonly idempotencyKey: Prisma.FieldRef<"Booking", 'String'>;
    readonly truckId: Prisma.FieldRef<"Booking", 'String'>;
    readonly containerId: Prisma.FieldRef<"Booking", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Booking", 'DateTime'>;
    readonly validatedAt: Prisma.FieldRef<"Booking", 'DateTime'>;
}
export type BookingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where: Prisma.BookingWhereUniqueInput;
};
export type BookingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where: Prisma.BookingWhereUniqueInput;
};
export type BookingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type BookingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type BookingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
export type BookingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingCreateInput, Prisma.BookingUncheckedCreateInput>;
};
export type BookingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BookingCreateManyInput | Prisma.BookingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BookingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    data: Prisma.BookingCreateManyInput | Prisma.BookingCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BookingIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BookingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingUpdateInput, Prisma.BookingUncheckedUpdateInput>;
    where: Prisma.BookingWhereUniqueInput;
};
export type BookingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyInput>;
    where?: Prisma.BookingWhereInput;
    limit?: number;
};
export type BookingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyInput>;
    where?: Prisma.BookingWhereInput;
    limit?: number;
    include?: Prisma.BookingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BookingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateInput, Prisma.BookingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BookingUpdateInput, Prisma.BookingUncheckedUpdateInput>;
};
export type BookingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where: Prisma.BookingWhereUniqueInput;
};
export type BookingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
    limit?: number;
};
export type Booking$truckArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelect<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    include?: Prisma.TruckInclude<ExtArgs> | null;
    where?: Prisma.TruckWhereInput;
};
export type Booking$containerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerSelect<ExtArgs> | null;
    omit?: Prisma.ContainerOmit<ExtArgs> | null;
    include?: Prisma.ContainerInclude<ExtArgs> | null;
    where?: Prisma.ContainerWhereInput;
};
export type Booking$gateAccessLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.GateAccessLogOmit<ExtArgs> | null;
    include?: Prisma.GateAccessLogInclude<ExtArgs> | null;
    where?: Prisma.GateAccessLogWhereInput;
    orderBy?: Prisma.GateAccessLogOrderByWithRelationInput | Prisma.GateAccessLogOrderByWithRelationInput[];
    cursor?: Prisma.GateAccessLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GateAccessLogScalarFieldEnum | Prisma.GateAccessLogScalarFieldEnum[];
};
export type BookingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BookingSelect<ExtArgs> | null;
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    include?: Prisma.BookingInclude<ExtArgs> | null;
};
export {};
