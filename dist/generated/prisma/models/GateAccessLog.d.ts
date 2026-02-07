import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type GateAccessLogModel = runtime.Types.Result.DefaultSelection<Prisma.$GateAccessLogPayload>;
export type AggregateGateAccessLog = {
    _count: GateAccessLogCountAggregateOutputType | null;
    _min: GateAccessLogMinAggregateOutputType | null;
    _max: GateAccessLogMaxAggregateOutputType | null;
};
export type GateAccessLogMinAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    gateId: string | null;
    result: $Enums.GateAccessResult | null;
    reason: string | null;
    scannedAt: Date | null;
};
export type GateAccessLogMaxAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    gateId: string | null;
    result: $Enums.GateAccessResult | null;
    reason: string | null;
    scannedAt: Date | null;
};
export type GateAccessLogCountAggregateOutputType = {
    id: number;
    bookingId: number;
    gateId: number;
    result: number;
    reason: number;
    scannedAt: number;
    _all: number;
};
export type GateAccessLogMinAggregateInputType = {
    id?: true;
    bookingId?: true;
    gateId?: true;
    result?: true;
    reason?: true;
    scannedAt?: true;
};
export type GateAccessLogMaxAggregateInputType = {
    id?: true;
    bookingId?: true;
    gateId?: true;
    result?: true;
    reason?: true;
    scannedAt?: true;
};
export type GateAccessLogCountAggregateInputType = {
    id?: true;
    bookingId?: true;
    gateId?: true;
    result?: true;
    reason?: true;
    scannedAt?: true;
    _all?: true;
};
export type GateAccessLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GateAccessLogWhereInput;
    orderBy?: Prisma.GateAccessLogOrderByWithRelationInput | Prisma.GateAccessLogOrderByWithRelationInput[];
    cursor?: Prisma.GateAccessLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GateAccessLogCountAggregateInputType;
    _min?: GateAccessLogMinAggregateInputType;
    _max?: GateAccessLogMaxAggregateInputType;
};
export type GetGateAccessLogAggregateType<T extends GateAccessLogAggregateArgs> = {
    [P in keyof T & keyof AggregateGateAccessLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGateAccessLog[P]> : Prisma.GetScalarType<T[P], AggregateGateAccessLog[P]>;
};
export type GateAccessLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GateAccessLogWhereInput;
    orderBy?: Prisma.GateAccessLogOrderByWithAggregationInput | Prisma.GateAccessLogOrderByWithAggregationInput[];
    by: Prisma.GateAccessLogScalarFieldEnum[] | Prisma.GateAccessLogScalarFieldEnum;
    having?: Prisma.GateAccessLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GateAccessLogCountAggregateInputType | true;
    _min?: GateAccessLogMinAggregateInputType;
    _max?: GateAccessLogMaxAggregateInputType;
};
export type GateAccessLogGroupByOutputType = {
    id: string;
    bookingId: string;
    gateId: string;
    result: $Enums.GateAccessResult;
    reason: string | null;
    scannedAt: Date;
    _count: GateAccessLogCountAggregateOutputType | null;
    _min: GateAccessLogMinAggregateOutputType | null;
    _max: GateAccessLogMaxAggregateOutputType | null;
};
type GetGateAccessLogGroupByPayload<T extends GateAccessLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GateAccessLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GateAccessLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GateAccessLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GateAccessLogGroupByOutputType[P]>;
}>>;
export type GateAccessLogWhereInput = {
    AND?: Prisma.GateAccessLogWhereInput | Prisma.GateAccessLogWhereInput[];
    OR?: Prisma.GateAccessLogWhereInput[];
    NOT?: Prisma.GateAccessLogWhereInput | Prisma.GateAccessLogWhereInput[];
    id?: Prisma.UuidFilter<"GateAccessLog"> | string;
    bookingId?: Prisma.UuidFilter<"GateAccessLog"> | string;
    gateId?: Prisma.UuidFilter<"GateAccessLog"> | string;
    result?: Prisma.EnumGateAccessResultFilter<"GateAccessLog"> | $Enums.GateAccessResult;
    reason?: Prisma.StringNullableFilter<"GateAccessLog"> | string | null;
    scannedAt?: Prisma.DateTimeFilter<"GateAccessLog"> | Date | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    gate?: Prisma.XOR<Prisma.GateScalarRelationFilter, Prisma.GateWhereInput>;
};
export type GateAccessLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    gateId?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
    booking?: Prisma.BookingOrderByWithRelationInput;
    gate?: Prisma.GateOrderByWithRelationInput;
};
export type GateAccessLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.GateAccessLogWhereInput | Prisma.GateAccessLogWhereInput[];
    OR?: Prisma.GateAccessLogWhereInput[];
    NOT?: Prisma.GateAccessLogWhereInput | Prisma.GateAccessLogWhereInput[];
    bookingId?: Prisma.UuidFilter<"GateAccessLog"> | string;
    gateId?: Prisma.UuidFilter<"GateAccessLog"> | string;
    result?: Prisma.EnumGateAccessResultFilter<"GateAccessLog"> | $Enums.GateAccessResult;
    reason?: Prisma.StringNullableFilter<"GateAccessLog"> | string | null;
    scannedAt?: Prisma.DateTimeFilter<"GateAccessLog"> | Date | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    gate?: Prisma.XOR<Prisma.GateScalarRelationFilter, Prisma.GateWhereInput>;
}, "id">;
export type GateAccessLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    gateId?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
    _count?: Prisma.GateAccessLogCountOrderByAggregateInput;
    _max?: Prisma.GateAccessLogMaxOrderByAggregateInput;
    _min?: Prisma.GateAccessLogMinOrderByAggregateInput;
};
export type GateAccessLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.GateAccessLogScalarWhereWithAggregatesInput | Prisma.GateAccessLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.GateAccessLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.GateAccessLogScalarWhereWithAggregatesInput | Prisma.GateAccessLogScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"GateAccessLog"> | string;
    bookingId?: Prisma.UuidWithAggregatesFilter<"GateAccessLog"> | string;
    gateId?: Prisma.UuidWithAggregatesFilter<"GateAccessLog"> | string;
    result?: Prisma.EnumGateAccessResultWithAggregatesFilter<"GateAccessLog"> | $Enums.GateAccessResult;
    reason?: Prisma.StringNullableWithAggregatesFilter<"GateAccessLog"> | string | null;
    scannedAt?: Prisma.DateTimeWithAggregatesFilter<"GateAccessLog"> | Date | string;
};
export type GateAccessLogCreateInput = {
    id?: string;
    result: $Enums.GateAccessResult;
    reason?: string | null;
    scannedAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutGateAccessLogsInput;
    gate: Prisma.GateCreateNestedOneWithoutGateAccessLogsInput;
};
export type GateAccessLogUncheckedCreateInput = {
    id?: string;
    bookingId: string;
    gateId: string;
    result: $Enums.GateAccessResult;
    reason?: string | null;
    scannedAt?: Date | string;
};
export type GateAccessLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.EnumGateAccessResultFieldUpdateOperationsInput | $Enums.GateAccessResult;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutGateAccessLogsNestedInput;
    gate?: Prisma.GateUpdateOneRequiredWithoutGateAccessLogsNestedInput;
};
export type GateAccessLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    gateId?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.EnumGateAccessResultFieldUpdateOperationsInput | $Enums.GateAccessResult;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GateAccessLogCreateManyInput = {
    id?: string;
    bookingId: string;
    gateId: string;
    result: $Enums.GateAccessResult;
    reason?: string | null;
    scannedAt?: Date | string;
};
export type GateAccessLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.EnumGateAccessResultFieldUpdateOperationsInput | $Enums.GateAccessResult;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GateAccessLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    gateId?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.EnumGateAccessResultFieldUpdateOperationsInput | $Enums.GateAccessResult;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GateAccessLogListRelationFilter = {
    every?: Prisma.GateAccessLogWhereInput;
    some?: Prisma.GateAccessLogWhereInput;
    none?: Prisma.GateAccessLogWhereInput;
};
export type GateAccessLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type GateAccessLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    gateId?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
};
export type GateAccessLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    gateId?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
};
export type GateAccessLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    gateId?: Prisma.SortOrder;
    result?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
};
export type GateAccessLogCreateNestedManyWithoutGateInput = {
    create?: Prisma.XOR<Prisma.GateAccessLogCreateWithoutGateInput, Prisma.GateAccessLogUncheckedCreateWithoutGateInput> | Prisma.GateAccessLogCreateWithoutGateInput[] | Prisma.GateAccessLogUncheckedCreateWithoutGateInput[];
    connectOrCreate?: Prisma.GateAccessLogCreateOrConnectWithoutGateInput | Prisma.GateAccessLogCreateOrConnectWithoutGateInput[];
    createMany?: Prisma.GateAccessLogCreateManyGateInputEnvelope;
    connect?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
};
export type GateAccessLogUncheckedCreateNestedManyWithoutGateInput = {
    create?: Prisma.XOR<Prisma.GateAccessLogCreateWithoutGateInput, Prisma.GateAccessLogUncheckedCreateWithoutGateInput> | Prisma.GateAccessLogCreateWithoutGateInput[] | Prisma.GateAccessLogUncheckedCreateWithoutGateInput[];
    connectOrCreate?: Prisma.GateAccessLogCreateOrConnectWithoutGateInput | Prisma.GateAccessLogCreateOrConnectWithoutGateInput[];
    createMany?: Prisma.GateAccessLogCreateManyGateInputEnvelope;
    connect?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
};
export type GateAccessLogUpdateManyWithoutGateNestedInput = {
    create?: Prisma.XOR<Prisma.GateAccessLogCreateWithoutGateInput, Prisma.GateAccessLogUncheckedCreateWithoutGateInput> | Prisma.GateAccessLogCreateWithoutGateInput[] | Prisma.GateAccessLogUncheckedCreateWithoutGateInput[];
    connectOrCreate?: Prisma.GateAccessLogCreateOrConnectWithoutGateInput | Prisma.GateAccessLogCreateOrConnectWithoutGateInput[];
    upsert?: Prisma.GateAccessLogUpsertWithWhereUniqueWithoutGateInput | Prisma.GateAccessLogUpsertWithWhereUniqueWithoutGateInput[];
    createMany?: Prisma.GateAccessLogCreateManyGateInputEnvelope;
    set?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    disconnect?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    delete?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    connect?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    update?: Prisma.GateAccessLogUpdateWithWhereUniqueWithoutGateInput | Prisma.GateAccessLogUpdateWithWhereUniqueWithoutGateInput[];
    updateMany?: Prisma.GateAccessLogUpdateManyWithWhereWithoutGateInput | Prisma.GateAccessLogUpdateManyWithWhereWithoutGateInput[];
    deleteMany?: Prisma.GateAccessLogScalarWhereInput | Prisma.GateAccessLogScalarWhereInput[];
};
export type GateAccessLogUncheckedUpdateManyWithoutGateNestedInput = {
    create?: Prisma.XOR<Prisma.GateAccessLogCreateWithoutGateInput, Prisma.GateAccessLogUncheckedCreateWithoutGateInput> | Prisma.GateAccessLogCreateWithoutGateInput[] | Prisma.GateAccessLogUncheckedCreateWithoutGateInput[];
    connectOrCreate?: Prisma.GateAccessLogCreateOrConnectWithoutGateInput | Prisma.GateAccessLogCreateOrConnectWithoutGateInput[];
    upsert?: Prisma.GateAccessLogUpsertWithWhereUniqueWithoutGateInput | Prisma.GateAccessLogUpsertWithWhereUniqueWithoutGateInput[];
    createMany?: Prisma.GateAccessLogCreateManyGateInputEnvelope;
    set?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    disconnect?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    delete?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    connect?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    update?: Prisma.GateAccessLogUpdateWithWhereUniqueWithoutGateInput | Prisma.GateAccessLogUpdateWithWhereUniqueWithoutGateInput[];
    updateMany?: Prisma.GateAccessLogUpdateManyWithWhereWithoutGateInput | Prisma.GateAccessLogUpdateManyWithWhereWithoutGateInput[];
    deleteMany?: Prisma.GateAccessLogScalarWhereInput | Prisma.GateAccessLogScalarWhereInput[];
};
export type GateAccessLogCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.GateAccessLogCreateWithoutBookingInput, Prisma.GateAccessLogUncheckedCreateWithoutBookingInput> | Prisma.GateAccessLogCreateWithoutBookingInput[] | Prisma.GateAccessLogUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.GateAccessLogCreateOrConnectWithoutBookingInput | Prisma.GateAccessLogCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.GateAccessLogCreateManyBookingInputEnvelope;
    connect?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
};
export type GateAccessLogUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.GateAccessLogCreateWithoutBookingInput, Prisma.GateAccessLogUncheckedCreateWithoutBookingInput> | Prisma.GateAccessLogCreateWithoutBookingInput[] | Prisma.GateAccessLogUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.GateAccessLogCreateOrConnectWithoutBookingInput | Prisma.GateAccessLogCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.GateAccessLogCreateManyBookingInputEnvelope;
    connect?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
};
export type GateAccessLogUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.GateAccessLogCreateWithoutBookingInput, Prisma.GateAccessLogUncheckedCreateWithoutBookingInput> | Prisma.GateAccessLogCreateWithoutBookingInput[] | Prisma.GateAccessLogUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.GateAccessLogCreateOrConnectWithoutBookingInput | Prisma.GateAccessLogCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.GateAccessLogUpsertWithWhereUniqueWithoutBookingInput | Prisma.GateAccessLogUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.GateAccessLogCreateManyBookingInputEnvelope;
    set?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    disconnect?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    delete?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    connect?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    update?: Prisma.GateAccessLogUpdateWithWhereUniqueWithoutBookingInput | Prisma.GateAccessLogUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.GateAccessLogUpdateManyWithWhereWithoutBookingInput | Prisma.GateAccessLogUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.GateAccessLogScalarWhereInput | Prisma.GateAccessLogScalarWhereInput[];
};
export type GateAccessLogUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.GateAccessLogCreateWithoutBookingInput, Prisma.GateAccessLogUncheckedCreateWithoutBookingInput> | Prisma.GateAccessLogCreateWithoutBookingInput[] | Prisma.GateAccessLogUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.GateAccessLogCreateOrConnectWithoutBookingInput | Prisma.GateAccessLogCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.GateAccessLogUpsertWithWhereUniqueWithoutBookingInput | Prisma.GateAccessLogUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.GateAccessLogCreateManyBookingInputEnvelope;
    set?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    disconnect?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    delete?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    connect?: Prisma.GateAccessLogWhereUniqueInput | Prisma.GateAccessLogWhereUniqueInput[];
    update?: Prisma.GateAccessLogUpdateWithWhereUniqueWithoutBookingInput | Prisma.GateAccessLogUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.GateAccessLogUpdateManyWithWhereWithoutBookingInput | Prisma.GateAccessLogUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.GateAccessLogScalarWhereInput | Prisma.GateAccessLogScalarWhereInput[];
};
export type EnumGateAccessResultFieldUpdateOperationsInput = {
    set?: $Enums.GateAccessResult;
};
export type GateAccessLogCreateWithoutGateInput = {
    id?: string;
    result: $Enums.GateAccessResult;
    reason?: string | null;
    scannedAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutGateAccessLogsInput;
};
export type GateAccessLogUncheckedCreateWithoutGateInput = {
    id?: string;
    bookingId: string;
    result: $Enums.GateAccessResult;
    reason?: string | null;
    scannedAt?: Date | string;
};
export type GateAccessLogCreateOrConnectWithoutGateInput = {
    where: Prisma.GateAccessLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.GateAccessLogCreateWithoutGateInput, Prisma.GateAccessLogUncheckedCreateWithoutGateInput>;
};
export type GateAccessLogCreateManyGateInputEnvelope = {
    data: Prisma.GateAccessLogCreateManyGateInput | Prisma.GateAccessLogCreateManyGateInput[];
    skipDuplicates?: boolean;
};
export type GateAccessLogUpsertWithWhereUniqueWithoutGateInput = {
    where: Prisma.GateAccessLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.GateAccessLogUpdateWithoutGateInput, Prisma.GateAccessLogUncheckedUpdateWithoutGateInput>;
    create: Prisma.XOR<Prisma.GateAccessLogCreateWithoutGateInput, Prisma.GateAccessLogUncheckedCreateWithoutGateInput>;
};
export type GateAccessLogUpdateWithWhereUniqueWithoutGateInput = {
    where: Prisma.GateAccessLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.GateAccessLogUpdateWithoutGateInput, Prisma.GateAccessLogUncheckedUpdateWithoutGateInput>;
};
export type GateAccessLogUpdateManyWithWhereWithoutGateInput = {
    where: Prisma.GateAccessLogScalarWhereInput;
    data: Prisma.XOR<Prisma.GateAccessLogUpdateManyMutationInput, Prisma.GateAccessLogUncheckedUpdateManyWithoutGateInput>;
};
export type GateAccessLogScalarWhereInput = {
    AND?: Prisma.GateAccessLogScalarWhereInput | Prisma.GateAccessLogScalarWhereInput[];
    OR?: Prisma.GateAccessLogScalarWhereInput[];
    NOT?: Prisma.GateAccessLogScalarWhereInput | Prisma.GateAccessLogScalarWhereInput[];
    id?: Prisma.UuidFilter<"GateAccessLog"> | string;
    bookingId?: Prisma.UuidFilter<"GateAccessLog"> | string;
    gateId?: Prisma.UuidFilter<"GateAccessLog"> | string;
    result?: Prisma.EnumGateAccessResultFilter<"GateAccessLog"> | $Enums.GateAccessResult;
    reason?: Prisma.StringNullableFilter<"GateAccessLog"> | string | null;
    scannedAt?: Prisma.DateTimeFilter<"GateAccessLog"> | Date | string;
};
export type GateAccessLogCreateWithoutBookingInput = {
    id?: string;
    result: $Enums.GateAccessResult;
    reason?: string | null;
    scannedAt?: Date | string;
    gate: Prisma.GateCreateNestedOneWithoutGateAccessLogsInput;
};
export type GateAccessLogUncheckedCreateWithoutBookingInput = {
    id?: string;
    gateId: string;
    result: $Enums.GateAccessResult;
    reason?: string | null;
    scannedAt?: Date | string;
};
export type GateAccessLogCreateOrConnectWithoutBookingInput = {
    where: Prisma.GateAccessLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.GateAccessLogCreateWithoutBookingInput, Prisma.GateAccessLogUncheckedCreateWithoutBookingInput>;
};
export type GateAccessLogCreateManyBookingInputEnvelope = {
    data: Prisma.GateAccessLogCreateManyBookingInput | Prisma.GateAccessLogCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type GateAccessLogUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.GateAccessLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.GateAccessLogUpdateWithoutBookingInput, Prisma.GateAccessLogUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.GateAccessLogCreateWithoutBookingInput, Prisma.GateAccessLogUncheckedCreateWithoutBookingInput>;
};
export type GateAccessLogUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.GateAccessLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.GateAccessLogUpdateWithoutBookingInput, Prisma.GateAccessLogUncheckedUpdateWithoutBookingInput>;
};
export type GateAccessLogUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.GateAccessLogScalarWhereInput;
    data: Prisma.XOR<Prisma.GateAccessLogUpdateManyMutationInput, Prisma.GateAccessLogUncheckedUpdateManyWithoutBookingInput>;
};
export type GateAccessLogCreateManyGateInput = {
    id?: string;
    bookingId: string;
    result: $Enums.GateAccessResult;
    reason?: string | null;
    scannedAt?: Date | string;
};
export type GateAccessLogUpdateWithoutGateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.EnumGateAccessResultFieldUpdateOperationsInput | $Enums.GateAccessResult;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutGateAccessLogsNestedInput;
};
export type GateAccessLogUncheckedUpdateWithoutGateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.EnumGateAccessResultFieldUpdateOperationsInput | $Enums.GateAccessResult;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GateAccessLogUncheckedUpdateManyWithoutGateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.EnumGateAccessResultFieldUpdateOperationsInput | $Enums.GateAccessResult;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GateAccessLogCreateManyBookingInput = {
    id?: string;
    gateId: string;
    result: $Enums.GateAccessResult;
    reason?: string | null;
    scannedAt?: Date | string;
};
export type GateAccessLogUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.EnumGateAccessResultFieldUpdateOperationsInput | $Enums.GateAccessResult;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gate?: Prisma.GateUpdateOneRequiredWithoutGateAccessLogsNestedInput;
};
export type GateAccessLogUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    gateId?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.EnumGateAccessResultFieldUpdateOperationsInput | $Enums.GateAccessResult;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GateAccessLogUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    gateId?: Prisma.StringFieldUpdateOperationsInput | string;
    result?: Prisma.EnumGateAccessResultFieldUpdateOperationsInput | $Enums.GateAccessResult;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type GateAccessLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    gateId?: boolean;
    result?: boolean;
    reason?: boolean;
    scannedAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    gate?: boolean | Prisma.GateDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["gateAccessLog"]>;
export type GateAccessLogSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    gateId?: boolean;
    result?: boolean;
    reason?: boolean;
    scannedAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    gate?: boolean | Prisma.GateDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["gateAccessLog"]>;
export type GateAccessLogSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    gateId?: boolean;
    result?: boolean;
    reason?: boolean;
    scannedAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    gate?: boolean | Prisma.GateDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["gateAccessLog"]>;
export type GateAccessLogSelectScalar = {
    id?: boolean;
    bookingId?: boolean;
    gateId?: boolean;
    result?: boolean;
    reason?: boolean;
    scannedAt?: boolean;
};
export type GateAccessLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bookingId" | "gateId" | "result" | "reason" | "scannedAt", ExtArgs["result"]["gateAccessLog"]>;
export type GateAccessLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    gate?: boolean | Prisma.GateDefaultArgs<ExtArgs>;
};
export type GateAccessLogIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    gate?: boolean | Prisma.GateDefaultArgs<ExtArgs>;
};
export type GateAccessLogIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    gate?: boolean | Prisma.GateDefaultArgs<ExtArgs>;
};
export type $GateAccessLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "GateAccessLog";
    objects: {
        booking: Prisma.$BookingPayload<ExtArgs>;
        gate: Prisma.$GatePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bookingId: string;
        gateId: string;
        result: $Enums.GateAccessResult;
        reason: string | null;
        scannedAt: Date;
    }, ExtArgs["result"]["gateAccessLog"]>;
    composites: {};
};
export type GateAccessLogGetPayload<S extends boolean | null | undefined | GateAccessLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload, S>;
export type GateAccessLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<GateAccessLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GateAccessLogCountAggregateInputType | true;
};
export interface GateAccessLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['GateAccessLog'];
        meta: {
            name: 'GateAccessLog';
        };
    };
    findUnique<T extends GateAccessLogFindUniqueArgs>(args: Prisma.SelectSubset<T, GateAccessLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__GateAccessLogClient<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends GateAccessLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, GateAccessLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__GateAccessLogClient<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends GateAccessLogFindFirstArgs>(args?: Prisma.SelectSubset<T, GateAccessLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__GateAccessLogClient<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends GateAccessLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, GateAccessLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__GateAccessLogClient<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends GateAccessLogFindManyArgs>(args?: Prisma.SelectSubset<T, GateAccessLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends GateAccessLogCreateArgs>(args: Prisma.SelectSubset<T, GateAccessLogCreateArgs<ExtArgs>>): Prisma.Prisma__GateAccessLogClient<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends GateAccessLogCreateManyArgs>(args?: Prisma.SelectSubset<T, GateAccessLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends GateAccessLogCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, GateAccessLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends GateAccessLogDeleteArgs>(args: Prisma.SelectSubset<T, GateAccessLogDeleteArgs<ExtArgs>>): Prisma.Prisma__GateAccessLogClient<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends GateAccessLogUpdateArgs>(args: Prisma.SelectSubset<T, GateAccessLogUpdateArgs<ExtArgs>>): Prisma.Prisma__GateAccessLogClient<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends GateAccessLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, GateAccessLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends GateAccessLogUpdateManyArgs>(args: Prisma.SelectSubset<T, GateAccessLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends GateAccessLogUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, GateAccessLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends GateAccessLogUpsertArgs>(args: Prisma.SelectSubset<T, GateAccessLogUpsertArgs<ExtArgs>>): Prisma.Prisma__GateAccessLogClient<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends GateAccessLogCountArgs>(args?: Prisma.Subset<T, GateAccessLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GateAccessLogCountAggregateOutputType> : number>;
    aggregate<T extends GateAccessLogAggregateArgs>(args: Prisma.Subset<T, GateAccessLogAggregateArgs>): Prisma.PrismaPromise<GetGateAccessLogAggregateType<T>>;
    groupBy<T extends GateAccessLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: GateAccessLogGroupByArgs['orderBy'];
    } : {
        orderBy?: GateAccessLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, GateAccessLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGateAccessLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: GateAccessLogFieldRefs;
}
export interface Prisma__GateAccessLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    booking<T extends Prisma.BookingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookingDefaultArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    gate<T extends Prisma.GateDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.GateDefaultArgs<ExtArgs>>): Prisma.Prisma__GateClient<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface GateAccessLogFieldRefs {
    readonly id: Prisma.FieldRef<"GateAccessLog", 'String'>;
    readonly bookingId: Prisma.FieldRef<"GateAccessLog", 'String'>;
    readonly gateId: Prisma.FieldRef<"GateAccessLog", 'String'>;
    readonly result: Prisma.FieldRef<"GateAccessLog", 'GateAccessResult'>;
    readonly reason: Prisma.FieldRef<"GateAccessLog", 'String'>;
    readonly scannedAt: Prisma.FieldRef<"GateAccessLog", 'DateTime'>;
}
export type GateAccessLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.GateAccessLogOmit<ExtArgs> | null;
    include?: Prisma.GateAccessLogInclude<ExtArgs> | null;
    where: Prisma.GateAccessLogWhereUniqueInput;
};
export type GateAccessLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.GateAccessLogOmit<ExtArgs> | null;
    include?: Prisma.GateAccessLogInclude<ExtArgs> | null;
    where: Prisma.GateAccessLogWhereUniqueInput;
};
export type GateAccessLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GateAccessLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GateAccessLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GateAccessLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.GateAccessLogOmit<ExtArgs> | null;
    include?: Prisma.GateAccessLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GateAccessLogCreateInput, Prisma.GateAccessLogUncheckedCreateInput>;
};
export type GateAccessLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.GateAccessLogCreateManyInput | Prisma.GateAccessLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GateAccessLogCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateAccessLogSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GateAccessLogOmit<ExtArgs> | null;
    data: Prisma.GateAccessLogCreateManyInput | Prisma.GateAccessLogCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.GateAccessLogIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type GateAccessLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.GateAccessLogOmit<ExtArgs> | null;
    include?: Prisma.GateAccessLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GateAccessLogUpdateInput, Prisma.GateAccessLogUncheckedUpdateInput>;
    where: Prisma.GateAccessLogWhereUniqueInput;
};
export type GateAccessLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.GateAccessLogUpdateManyMutationInput, Prisma.GateAccessLogUncheckedUpdateManyInput>;
    where?: Prisma.GateAccessLogWhereInput;
    limit?: number;
};
export type GateAccessLogUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateAccessLogSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GateAccessLogOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GateAccessLogUpdateManyMutationInput, Prisma.GateAccessLogUncheckedUpdateManyInput>;
    where?: Prisma.GateAccessLogWhereInput;
    limit?: number;
    include?: Prisma.GateAccessLogIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type GateAccessLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.GateAccessLogOmit<ExtArgs> | null;
    include?: Prisma.GateAccessLogInclude<ExtArgs> | null;
    where: Prisma.GateAccessLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.GateAccessLogCreateInput, Prisma.GateAccessLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.GateAccessLogUpdateInput, Prisma.GateAccessLogUncheckedUpdateInput>;
};
export type GateAccessLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.GateAccessLogOmit<ExtArgs> | null;
    include?: Prisma.GateAccessLogInclude<ExtArgs> | null;
    where: Prisma.GateAccessLogWhereUniqueInput;
};
export type GateAccessLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GateAccessLogWhereInput;
    limit?: number;
};
export type GateAccessLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateAccessLogSelect<ExtArgs> | null;
    omit?: Prisma.GateAccessLogOmit<ExtArgs> | null;
    include?: Prisma.GateAccessLogInclude<ExtArgs> | null;
};
export {};
