import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TerminalModel = runtime.Types.Result.DefaultSelection<Prisma.$TerminalPayload>;
export type AggregateTerminal = {
    _count: TerminalCountAggregateOutputType | null;
    _min: TerminalMinAggregateOutputType | null;
    _max: TerminalMaxAggregateOutputType | null;
};
export type TerminalMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    location: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type TerminalMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    location: string | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type TerminalCountAggregateOutputType = {
    id: number;
    name: number;
    location: number;
    isActive: number;
    createdAt: number;
    _all: number;
};
export type TerminalMinAggregateInputType = {
    id?: true;
    name?: true;
    location?: true;
    isActive?: true;
    createdAt?: true;
};
export type TerminalMaxAggregateInputType = {
    id?: true;
    name?: true;
    location?: true;
    isActive?: true;
    createdAt?: true;
};
export type TerminalCountAggregateInputType = {
    id?: true;
    name?: true;
    location?: true;
    isActive?: true;
    createdAt?: true;
    _all?: true;
};
export type TerminalAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TerminalWhereInput;
    orderBy?: Prisma.TerminalOrderByWithRelationInput | Prisma.TerminalOrderByWithRelationInput[];
    cursor?: Prisma.TerminalWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TerminalCountAggregateInputType;
    _min?: TerminalMinAggregateInputType;
    _max?: TerminalMaxAggregateInputType;
};
export type GetTerminalAggregateType<T extends TerminalAggregateArgs> = {
    [P in keyof T & keyof AggregateTerminal]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTerminal[P]> : Prisma.GetScalarType<T[P], AggregateTerminal[P]>;
};
export type TerminalGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TerminalWhereInput;
    orderBy?: Prisma.TerminalOrderByWithAggregationInput | Prisma.TerminalOrderByWithAggregationInput[];
    by: Prisma.TerminalScalarFieldEnum[] | Prisma.TerminalScalarFieldEnum;
    having?: Prisma.TerminalScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TerminalCountAggregateInputType | true;
    _min?: TerminalMinAggregateInputType;
    _max?: TerminalMaxAggregateInputType;
};
export type TerminalGroupByOutputType = {
    id: string;
    name: string;
    location: string;
    isActive: boolean;
    createdAt: Date;
    _count: TerminalCountAggregateOutputType | null;
    _min: TerminalMinAggregateOutputType | null;
    _max: TerminalMaxAggregateOutputType | null;
};
type GetTerminalGroupByPayload<T extends TerminalGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TerminalGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TerminalGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TerminalGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TerminalGroupByOutputType[P]>;
}>>;
export type TerminalWhereInput = {
    AND?: Prisma.TerminalWhereInput | Prisma.TerminalWhereInput[];
    OR?: Prisma.TerminalWhereInput[];
    NOT?: Prisma.TerminalWhereInput | Prisma.TerminalWhereInput[];
    id?: Prisma.UuidFilter<"Terminal"> | string;
    name?: Prisma.StringFilter<"Terminal"> | string;
    location?: Prisma.StringFilter<"Terminal"> | string;
    isActive?: Prisma.BoolFilter<"Terminal"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Terminal"> | Date | string;
    gates?: Prisma.GateListRelationFilter;
    timeSlots?: Prisma.TimeSlotListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
    metrics?: Prisma.MetricDailyListRelationFilter;
    zones?: Prisma.ZoneListRelationFilter;
    containers?: Prisma.ContainerListRelationFilter;
};
export type TerminalOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    gates?: Prisma.GateOrderByRelationAggregateInput;
    timeSlots?: Prisma.TimeSlotOrderByRelationAggregateInput;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
    metrics?: Prisma.MetricDailyOrderByRelationAggregateInput;
    zones?: Prisma.ZoneOrderByRelationAggregateInput;
    containers?: Prisma.ContainerOrderByRelationAggregateInput;
};
export type TerminalWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TerminalWhereInput | Prisma.TerminalWhereInput[];
    OR?: Prisma.TerminalWhereInput[];
    NOT?: Prisma.TerminalWhereInput | Prisma.TerminalWhereInput[];
    name?: Prisma.StringFilter<"Terminal"> | string;
    location?: Prisma.StringFilter<"Terminal"> | string;
    isActive?: Prisma.BoolFilter<"Terminal"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Terminal"> | Date | string;
    gates?: Prisma.GateListRelationFilter;
    timeSlots?: Prisma.TimeSlotListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
    metrics?: Prisma.MetricDailyListRelationFilter;
    zones?: Prisma.ZoneListRelationFilter;
    containers?: Prisma.ContainerListRelationFilter;
}, "id">;
export type TerminalOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TerminalCountOrderByAggregateInput;
    _max?: Prisma.TerminalMaxOrderByAggregateInput;
    _min?: Prisma.TerminalMinOrderByAggregateInput;
};
export type TerminalScalarWhereWithAggregatesInput = {
    AND?: Prisma.TerminalScalarWhereWithAggregatesInput | Prisma.TerminalScalarWhereWithAggregatesInput[];
    OR?: Prisma.TerminalScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TerminalScalarWhereWithAggregatesInput | Prisma.TerminalScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Terminal"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Terminal"> | string;
    location?: Prisma.StringWithAggregatesFilter<"Terminal"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"Terminal"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Terminal"> | Date | string;
};
export type TerminalCreateInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    gates?: Prisma.GateCreateNestedManyWithoutTerminalInput;
    timeSlots?: Prisma.TimeSlotCreateNestedManyWithoutTerminalInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutTerminalInput;
    metrics?: Prisma.MetricDailyCreateNestedManyWithoutTerminalInput;
    zones?: Prisma.ZoneCreateNestedManyWithoutTerminalInput;
    containers?: Prisma.ContainerCreateNestedManyWithoutTerminalInput;
};
export type TerminalUncheckedCreateInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    gates?: Prisma.GateUncheckedCreateNestedManyWithoutTerminalInput;
    timeSlots?: Prisma.TimeSlotUncheckedCreateNestedManyWithoutTerminalInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutTerminalInput;
    metrics?: Prisma.MetricDailyUncheckedCreateNestedManyWithoutTerminalInput;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutTerminalInput;
    containers?: Prisma.ContainerUncheckedCreateNestedManyWithoutTerminalInput;
};
export type TerminalUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gates?: Prisma.GateUpdateManyWithoutTerminalNestedInput;
    timeSlots?: Prisma.TimeSlotUpdateManyWithoutTerminalNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutTerminalNestedInput;
    metrics?: Prisma.MetricDailyUpdateManyWithoutTerminalNestedInput;
    zones?: Prisma.ZoneUpdateManyWithoutTerminalNestedInput;
    containers?: Prisma.ContainerUpdateManyWithoutTerminalNestedInput;
};
export type TerminalUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gates?: Prisma.GateUncheckedUpdateManyWithoutTerminalNestedInput;
    timeSlots?: Prisma.TimeSlotUncheckedUpdateManyWithoutTerminalNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutTerminalNestedInput;
    metrics?: Prisma.MetricDailyUncheckedUpdateManyWithoutTerminalNestedInput;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutTerminalNestedInput;
    containers?: Prisma.ContainerUncheckedUpdateManyWithoutTerminalNestedInput;
};
export type TerminalCreateManyInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type TerminalUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TerminalUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TerminalCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TerminalMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TerminalMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TerminalScalarRelationFilter = {
    is?: Prisma.TerminalWhereInput;
    isNot?: Prisma.TerminalWhereInput;
};
export type TerminalNullableScalarRelationFilter = {
    is?: Prisma.TerminalWhereInput | null;
    isNot?: Prisma.TerminalWhereInput | null;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type TerminalCreateNestedOneWithoutGatesInput = {
    create?: Prisma.XOR<Prisma.TerminalCreateWithoutGatesInput, Prisma.TerminalUncheckedCreateWithoutGatesInput>;
    connectOrCreate?: Prisma.TerminalCreateOrConnectWithoutGatesInput;
    connect?: Prisma.TerminalWhereUniqueInput;
};
export type TerminalUpdateOneRequiredWithoutGatesNestedInput = {
    create?: Prisma.XOR<Prisma.TerminalCreateWithoutGatesInput, Prisma.TerminalUncheckedCreateWithoutGatesInput>;
    connectOrCreate?: Prisma.TerminalCreateOrConnectWithoutGatesInput;
    upsert?: Prisma.TerminalUpsertWithoutGatesInput;
    connect?: Prisma.TerminalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TerminalUpdateToOneWithWhereWithoutGatesInput, Prisma.TerminalUpdateWithoutGatesInput>, Prisma.TerminalUncheckedUpdateWithoutGatesInput>;
};
export type TerminalCreateNestedOneWithoutTimeSlotsInput = {
    create?: Prisma.XOR<Prisma.TerminalCreateWithoutTimeSlotsInput, Prisma.TerminalUncheckedCreateWithoutTimeSlotsInput>;
    connectOrCreate?: Prisma.TerminalCreateOrConnectWithoutTimeSlotsInput;
    connect?: Prisma.TerminalWhereUniqueInput;
};
export type TerminalUpdateOneRequiredWithoutTimeSlotsNestedInput = {
    create?: Prisma.XOR<Prisma.TerminalCreateWithoutTimeSlotsInput, Prisma.TerminalUncheckedCreateWithoutTimeSlotsInput>;
    connectOrCreate?: Prisma.TerminalCreateOrConnectWithoutTimeSlotsInput;
    upsert?: Prisma.TerminalUpsertWithoutTimeSlotsInput;
    connect?: Prisma.TerminalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TerminalUpdateToOneWithWhereWithoutTimeSlotsInput, Prisma.TerminalUpdateWithoutTimeSlotsInput>, Prisma.TerminalUncheckedUpdateWithoutTimeSlotsInput>;
};
export type TerminalCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.TerminalCreateWithoutBookingsInput, Prisma.TerminalUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.TerminalCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.TerminalWhereUniqueInput;
};
export type TerminalUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.TerminalCreateWithoutBookingsInput, Prisma.TerminalUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.TerminalCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.TerminalUpsertWithoutBookingsInput;
    connect?: Prisma.TerminalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TerminalUpdateToOneWithWhereWithoutBookingsInput, Prisma.TerminalUpdateWithoutBookingsInput>, Prisma.TerminalUncheckedUpdateWithoutBookingsInput>;
};
export type TerminalCreateNestedOneWithoutContainersInput = {
    create?: Prisma.XOR<Prisma.TerminalCreateWithoutContainersInput, Prisma.TerminalUncheckedCreateWithoutContainersInput>;
    connectOrCreate?: Prisma.TerminalCreateOrConnectWithoutContainersInput;
    connect?: Prisma.TerminalWhereUniqueInput;
};
export type TerminalUpdateOneWithoutContainersNestedInput = {
    create?: Prisma.XOR<Prisma.TerminalCreateWithoutContainersInput, Prisma.TerminalUncheckedCreateWithoutContainersInput>;
    connectOrCreate?: Prisma.TerminalCreateOrConnectWithoutContainersInput;
    upsert?: Prisma.TerminalUpsertWithoutContainersInput;
    disconnect?: Prisma.TerminalWhereInput | boolean;
    delete?: Prisma.TerminalWhereInput | boolean;
    connect?: Prisma.TerminalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TerminalUpdateToOneWithWhereWithoutContainersInput, Prisma.TerminalUpdateWithoutContainersInput>, Prisma.TerminalUncheckedUpdateWithoutContainersInput>;
};
export type TerminalCreateNestedOneWithoutZonesInput = {
    create?: Prisma.XOR<Prisma.TerminalCreateWithoutZonesInput, Prisma.TerminalUncheckedCreateWithoutZonesInput>;
    connectOrCreate?: Prisma.TerminalCreateOrConnectWithoutZonesInput;
    connect?: Prisma.TerminalWhereUniqueInput;
};
export type TerminalUpdateOneRequiredWithoutZonesNestedInput = {
    create?: Prisma.XOR<Prisma.TerminalCreateWithoutZonesInput, Prisma.TerminalUncheckedCreateWithoutZonesInput>;
    connectOrCreate?: Prisma.TerminalCreateOrConnectWithoutZonesInput;
    upsert?: Prisma.TerminalUpsertWithoutZonesInput;
    connect?: Prisma.TerminalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TerminalUpdateToOneWithWhereWithoutZonesInput, Prisma.TerminalUpdateWithoutZonesInput>, Prisma.TerminalUncheckedUpdateWithoutZonesInput>;
};
export type TerminalCreateNestedOneWithoutMetricsInput = {
    create?: Prisma.XOR<Prisma.TerminalCreateWithoutMetricsInput, Prisma.TerminalUncheckedCreateWithoutMetricsInput>;
    connectOrCreate?: Prisma.TerminalCreateOrConnectWithoutMetricsInput;
    connect?: Prisma.TerminalWhereUniqueInput;
};
export type TerminalUpdateOneRequiredWithoutMetricsNestedInput = {
    create?: Prisma.XOR<Prisma.TerminalCreateWithoutMetricsInput, Prisma.TerminalUncheckedCreateWithoutMetricsInput>;
    connectOrCreate?: Prisma.TerminalCreateOrConnectWithoutMetricsInput;
    upsert?: Prisma.TerminalUpsertWithoutMetricsInput;
    connect?: Prisma.TerminalWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TerminalUpdateToOneWithWhereWithoutMetricsInput, Prisma.TerminalUpdateWithoutMetricsInput>, Prisma.TerminalUncheckedUpdateWithoutMetricsInput>;
};
export type TerminalCreateWithoutGatesInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    timeSlots?: Prisma.TimeSlotCreateNestedManyWithoutTerminalInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutTerminalInput;
    metrics?: Prisma.MetricDailyCreateNestedManyWithoutTerminalInput;
    zones?: Prisma.ZoneCreateNestedManyWithoutTerminalInput;
    containers?: Prisma.ContainerCreateNestedManyWithoutTerminalInput;
};
export type TerminalUncheckedCreateWithoutGatesInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    timeSlots?: Prisma.TimeSlotUncheckedCreateNestedManyWithoutTerminalInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutTerminalInput;
    metrics?: Prisma.MetricDailyUncheckedCreateNestedManyWithoutTerminalInput;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutTerminalInput;
    containers?: Prisma.ContainerUncheckedCreateNestedManyWithoutTerminalInput;
};
export type TerminalCreateOrConnectWithoutGatesInput = {
    where: Prisma.TerminalWhereUniqueInput;
    create: Prisma.XOR<Prisma.TerminalCreateWithoutGatesInput, Prisma.TerminalUncheckedCreateWithoutGatesInput>;
};
export type TerminalUpsertWithoutGatesInput = {
    update: Prisma.XOR<Prisma.TerminalUpdateWithoutGatesInput, Prisma.TerminalUncheckedUpdateWithoutGatesInput>;
    create: Prisma.XOR<Prisma.TerminalCreateWithoutGatesInput, Prisma.TerminalUncheckedCreateWithoutGatesInput>;
    where?: Prisma.TerminalWhereInput;
};
export type TerminalUpdateToOneWithWhereWithoutGatesInput = {
    where?: Prisma.TerminalWhereInput;
    data: Prisma.XOR<Prisma.TerminalUpdateWithoutGatesInput, Prisma.TerminalUncheckedUpdateWithoutGatesInput>;
};
export type TerminalUpdateWithoutGatesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    timeSlots?: Prisma.TimeSlotUpdateManyWithoutTerminalNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutTerminalNestedInput;
    metrics?: Prisma.MetricDailyUpdateManyWithoutTerminalNestedInput;
    zones?: Prisma.ZoneUpdateManyWithoutTerminalNestedInput;
    containers?: Prisma.ContainerUpdateManyWithoutTerminalNestedInput;
};
export type TerminalUncheckedUpdateWithoutGatesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    timeSlots?: Prisma.TimeSlotUncheckedUpdateManyWithoutTerminalNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutTerminalNestedInput;
    metrics?: Prisma.MetricDailyUncheckedUpdateManyWithoutTerminalNestedInput;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutTerminalNestedInput;
    containers?: Prisma.ContainerUncheckedUpdateManyWithoutTerminalNestedInput;
};
export type TerminalCreateWithoutTimeSlotsInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    gates?: Prisma.GateCreateNestedManyWithoutTerminalInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutTerminalInput;
    metrics?: Prisma.MetricDailyCreateNestedManyWithoutTerminalInput;
    zones?: Prisma.ZoneCreateNestedManyWithoutTerminalInput;
    containers?: Prisma.ContainerCreateNestedManyWithoutTerminalInput;
};
export type TerminalUncheckedCreateWithoutTimeSlotsInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    gates?: Prisma.GateUncheckedCreateNestedManyWithoutTerminalInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutTerminalInput;
    metrics?: Prisma.MetricDailyUncheckedCreateNestedManyWithoutTerminalInput;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutTerminalInput;
    containers?: Prisma.ContainerUncheckedCreateNestedManyWithoutTerminalInput;
};
export type TerminalCreateOrConnectWithoutTimeSlotsInput = {
    where: Prisma.TerminalWhereUniqueInput;
    create: Prisma.XOR<Prisma.TerminalCreateWithoutTimeSlotsInput, Prisma.TerminalUncheckedCreateWithoutTimeSlotsInput>;
};
export type TerminalUpsertWithoutTimeSlotsInput = {
    update: Prisma.XOR<Prisma.TerminalUpdateWithoutTimeSlotsInput, Prisma.TerminalUncheckedUpdateWithoutTimeSlotsInput>;
    create: Prisma.XOR<Prisma.TerminalCreateWithoutTimeSlotsInput, Prisma.TerminalUncheckedCreateWithoutTimeSlotsInput>;
    where?: Prisma.TerminalWhereInput;
};
export type TerminalUpdateToOneWithWhereWithoutTimeSlotsInput = {
    where?: Prisma.TerminalWhereInput;
    data: Prisma.XOR<Prisma.TerminalUpdateWithoutTimeSlotsInput, Prisma.TerminalUncheckedUpdateWithoutTimeSlotsInput>;
};
export type TerminalUpdateWithoutTimeSlotsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gates?: Prisma.GateUpdateManyWithoutTerminalNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutTerminalNestedInput;
    metrics?: Prisma.MetricDailyUpdateManyWithoutTerminalNestedInput;
    zones?: Prisma.ZoneUpdateManyWithoutTerminalNestedInput;
    containers?: Prisma.ContainerUpdateManyWithoutTerminalNestedInput;
};
export type TerminalUncheckedUpdateWithoutTimeSlotsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gates?: Prisma.GateUncheckedUpdateManyWithoutTerminalNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutTerminalNestedInput;
    metrics?: Prisma.MetricDailyUncheckedUpdateManyWithoutTerminalNestedInput;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutTerminalNestedInput;
    containers?: Prisma.ContainerUncheckedUpdateManyWithoutTerminalNestedInput;
};
export type TerminalCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    gates?: Prisma.GateCreateNestedManyWithoutTerminalInput;
    timeSlots?: Prisma.TimeSlotCreateNestedManyWithoutTerminalInput;
    metrics?: Prisma.MetricDailyCreateNestedManyWithoutTerminalInput;
    zones?: Prisma.ZoneCreateNestedManyWithoutTerminalInput;
    containers?: Prisma.ContainerCreateNestedManyWithoutTerminalInput;
};
export type TerminalUncheckedCreateWithoutBookingsInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    gates?: Prisma.GateUncheckedCreateNestedManyWithoutTerminalInput;
    timeSlots?: Prisma.TimeSlotUncheckedCreateNestedManyWithoutTerminalInput;
    metrics?: Prisma.MetricDailyUncheckedCreateNestedManyWithoutTerminalInput;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutTerminalInput;
    containers?: Prisma.ContainerUncheckedCreateNestedManyWithoutTerminalInput;
};
export type TerminalCreateOrConnectWithoutBookingsInput = {
    where: Prisma.TerminalWhereUniqueInput;
    create: Prisma.XOR<Prisma.TerminalCreateWithoutBookingsInput, Prisma.TerminalUncheckedCreateWithoutBookingsInput>;
};
export type TerminalUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.TerminalUpdateWithoutBookingsInput, Prisma.TerminalUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.TerminalCreateWithoutBookingsInput, Prisma.TerminalUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.TerminalWhereInput;
};
export type TerminalUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.TerminalWhereInput;
    data: Prisma.XOR<Prisma.TerminalUpdateWithoutBookingsInput, Prisma.TerminalUncheckedUpdateWithoutBookingsInput>;
};
export type TerminalUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gates?: Prisma.GateUpdateManyWithoutTerminalNestedInput;
    timeSlots?: Prisma.TimeSlotUpdateManyWithoutTerminalNestedInput;
    metrics?: Prisma.MetricDailyUpdateManyWithoutTerminalNestedInput;
    zones?: Prisma.ZoneUpdateManyWithoutTerminalNestedInput;
    containers?: Prisma.ContainerUpdateManyWithoutTerminalNestedInput;
};
export type TerminalUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gates?: Prisma.GateUncheckedUpdateManyWithoutTerminalNestedInput;
    timeSlots?: Prisma.TimeSlotUncheckedUpdateManyWithoutTerminalNestedInput;
    metrics?: Prisma.MetricDailyUncheckedUpdateManyWithoutTerminalNestedInput;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutTerminalNestedInput;
    containers?: Prisma.ContainerUncheckedUpdateManyWithoutTerminalNestedInput;
};
export type TerminalCreateWithoutContainersInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    gates?: Prisma.GateCreateNestedManyWithoutTerminalInput;
    timeSlots?: Prisma.TimeSlotCreateNestedManyWithoutTerminalInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutTerminalInput;
    metrics?: Prisma.MetricDailyCreateNestedManyWithoutTerminalInput;
    zones?: Prisma.ZoneCreateNestedManyWithoutTerminalInput;
};
export type TerminalUncheckedCreateWithoutContainersInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    gates?: Prisma.GateUncheckedCreateNestedManyWithoutTerminalInput;
    timeSlots?: Prisma.TimeSlotUncheckedCreateNestedManyWithoutTerminalInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutTerminalInput;
    metrics?: Prisma.MetricDailyUncheckedCreateNestedManyWithoutTerminalInput;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutTerminalInput;
};
export type TerminalCreateOrConnectWithoutContainersInput = {
    where: Prisma.TerminalWhereUniqueInput;
    create: Prisma.XOR<Prisma.TerminalCreateWithoutContainersInput, Prisma.TerminalUncheckedCreateWithoutContainersInput>;
};
export type TerminalUpsertWithoutContainersInput = {
    update: Prisma.XOR<Prisma.TerminalUpdateWithoutContainersInput, Prisma.TerminalUncheckedUpdateWithoutContainersInput>;
    create: Prisma.XOR<Prisma.TerminalCreateWithoutContainersInput, Prisma.TerminalUncheckedCreateWithoutContainersInput>;
    where?: Prisma.TerminalWhereInput;
};
export type TerminalUpdateToOneWithWhereWithoutContainersInput = {
    where?: Prisma.TerminalWhereInput;
    data: Prisma.XOR<Prisma.TerminalUpdateWithoutContainersInput, Prisma.TerminalUncheckedUpdateWithoutContainersInput>;
};
export type TerminalUpdateWithoutContainersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gates?: Prisma.GateUpdateManyWithoutTerminalNestedInput;
    timeSlots?: Prisma.TimeSlotUpdateManyWithoutTerminalNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutTerminalNestedInput;
    metrics?: Prisma.MetricDailyUpdateManyWithoutTerminalNestedInput;
    zones?: Prisma.ZoneUpdateManyWithoutTerminalNestedInput;
};
export type TerminalUncheckedUpdateWithoutContainersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gates?: Prisma.GateUncheckedUpdateManyWithoutTerminalNestedInput;
    timeSlots?: Prisma.TimeSlotUncheckedUpdateManyWithoutTerminalNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutTerminalNestedInput;
    metrics?: Prisma.MetricDailyUncheckedUpdateManyWithoutTerminalNestedInput;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutTerminalNestedInput;
};
export type TerminalCreateWithoutZonesInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    gates?: Prisma.GateCreateNestedManyWithoutTerminalInput;
    timeSlots?: Prisma.TimeSlotCreateNestedManyWithoutTerminalInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutTerminalInput;
    metrics?: Prisma.MetricDailyCreateNestedManyWithoutTerminalInput;
    containers?: Prisma.ContainerCreateNestedManyWithoutTerminalInput;
};
export type TerminalUncheckedCreateWithoutZonesInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    gates?: Prisma.GateUncheckedCreateNestedManyWithoutTerminalInput;
    timeSlots?: Prisma.TimeSlotUncheckedCreateNestedManyWithoutTerminalInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutTerminalInput;
    metrics?: Prisma.MetricDailyUncheckedCreateNestedManyWithoutTerminalInput;
    containers?: Prisma.ContainerUncheckedCreateNestedManyWithoutTerminalInput;
};
export type TerminalCreateOrConnectWithoutZonesInput = {
    where: Prisma.TerminalWhereUniqueInput;
    create: Prisma.XOR<Prisma.TerminalCreateWithoutZonesInput, Prisma.TerminalUncheckedCreateWithoutZonesInput>;
};
export type TerminalUpsertWithoutZonesInput = {
    update: Prisma.XOR<Prisma.TerminalUpdateWithoutZonesInput, Prisma.TerminalUncheckedUpdateWithoutZonesInput>;
    create: Prisma.XOR<Prisma.TerminalCreateWithoutZonesInput, Prisma.TerminalUncheckedCreateWithoutZonesInput>;
    where?: Prisma.TerminalWhereInput;
};
export type TerminalUpdateToOneWithWhereWithoutZonesInput = {
    where?: Prisma.TerminalWhereInput;
    data: Prisma.XOR<Prisma.TerminalUpdateWithoutZonesInput, Prisma.TerminalUncheckedUpdateWithoutZonesInput>;
};
export type TerminalUpdateWithoutZonesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gates?: Prisma.GateUpdateManyWithoutTerminalNestedInput;
    timeSlots?: Prisma.TimeSlotUpdateManyWithoutTerminalNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutTerminalNestedInput;
    metrics?: Prisma.MetricDailyUpdateManyWithoutTerminalNestedInput;
    containers?: Prisma.ContainerUpdateManyWithoutTerminalNestedInput;
};
export type TerminalUncheckedUpdateWithoutZonesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gates?: Prisma.GateUncheckedUpdateManyWithoutTerminalNestedInput;
    timeSlots?: Prisma.TimeSlotUncheckedUpdateManyWithoutTerminalNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutTerminalNestedInput;
    metrics?: Prisma.MetricDailyUncheckedUpdateManyWithoutTerminalNestedInput;
    containers?: Prisma.ContainerUncheckedUpdateManyWithoutTerminalNestedInput;
};
export type TerminalCreateWithoutMetricsInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    gates?: Prisma.GateCreateNestedManyWithoutTerminalInput;
    timeSlots?: Prisma.TimeSlotCreateNestedManyWithoutTerminalInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutTerminalInput;
    zones?: Prisma.ZoneCreateNestedManyWithoutTerminalInput;
    containers?: Prisma.ContainerCreateNestedManyWithoutTerminalInput;
};
export type TerminalUncheckedCreateWithoutMetricsInput = {
    id?: string;
    name: string;
    location: string;
    isActive?: boolean;
    createdAt?: Date | string;
    gates?: Prisma.GateUncheckedCreateNestedManyWithoutTerminalInput;
    timeSlots?: Prisma.TimeSlotUncheckedCreateNestedManyWithoutTerminalInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutTerminalInput;
    zones?: Prisma.ZoneUncheckedCreateNestedManyWithoutTerminalInput;
    containers?: Prisma.ContainerUncheckedCreateNestedManyWithoutTerminalInput;
};
export type TerminalCreateOrConnectWithoutMetricsInput = {
    where: Prisma.TerminalWhereUniqueInput;
    create: Prisma.XOR<Prisma.TerminalCreateWithoutMetricsInput, Prisma.TerminalUncheckedCreateWithoutMetricsInput>;
};
export type TerminalUpsertWithoutMetricsInput = {
    update: Prisma.XOR<Prisma.TerminalUpdateWithoutMetricsInput, Prisma.TerminalUncheckedUpdateWithoutMetricsInput>;
    create: Prisma.XOR<Prisma.TerminalCreateWithoutMetricsInput, Prisma.TerminalUncheckedCreateWithoutMetricsInput>;
    where?: Prisma.TerminalWhereInput;
};
export type TerminalUpdateToOneWithWhereWithoutMetricsInput = {
    where?: Prisma.TerminalWhereInput;
    data: Prisma.XOR<Prisma.TerminalUpdateWithoutMetricsInput, Prisma.TerminalUncheckedUpdateWithoutMetricsInput>;
};
export type TerminalUpdateWithoutMetricsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gates?: Prisma.GateUpdateManyWithoutTerminalNestedInput;
    timeSlots?: Prisma.TimeSlotUpdateManyWithoutTerminalNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutTerminalNestedInput;
    zones?: Prisma.ZoneUpdateManyWithoutTerminalNestedInput;
    containers?: Prisma.ContainerUpdateManyWithoutTerminalNestedInput;
};
export type TerminalUncheckedUpdateWithoutMetricsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gates?: Prisma.GateUncheckedUpdateManyWithoutTerminalNestedInput;
    timeSlots?: Prisma.TimeSlotUncheckedUpdateManyWithoutTerminalNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutTerminalNestedInput;
    zones?: Prisma.ZoneUncheckedUpdateManyWithoutTerminalNestedInput;
    containers?: Prisma.ContainerUncheckedUpdateManyWithoutTerminalNestedInput;
};
export type TerminalCountOutputType = {
    gates: number;
    timeSlots: number;
    bookings: number;
    metrics: number;
    zones: number;
    containers: number;
};
export type TerminalCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    gates?: boolean | TerminalCountOutputTypeCountGatesArgs;
    timeSlots?: boolean | TerminalCountOutputTypeCountTimeSlotsArgs;
    bookings?: boolean | TerminalCountOutputTypeCountBookingsArgs;
    metrics?: boolean | TerminalCountOutputTypeCountMetricsArgs;
    zones?: boolean | TerminalCountOutputTypeCountZonesArgs;
    containers?: boolean | TerminalCountOutputTypeCountContainersArgs;
};
export type TerminalCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalCountOutputTypeSelect<ExtArgs> | null;
};
export type TerminalCountOutputTypeCountGatesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GateWhereInput;
};
export type TerminalCountOutputTypeCountTimeSlotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeSlotWhereInput;
};
export type TerminalCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type TerminalCountOutputTypeCountMetricsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MetricDailyWhereInput;
};
export type TerminalCountOutputTypeCountZonesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ZoneWhereInput;
};
export type TerminalCountOutputTypeCountContainersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContainerWhereInput;
};
export type TerminalSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    location?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    gates?: boolean | Prisma.Terminal$gatesArgs<ExtArgs>;
    timeSlots?: boolean | Prisma.Terminal$timeSlotsArgs<ExtArgs>;
    bookings?: boolean | Prisma.Terminal$bookingsArgs<ExtArgs>;
    metrics?: boolean | Prisma.Terminal$metricsArgs<ExtArgs>;
    zones?: boolean | Prisma.Terminal$zonesArgs<ExtArgs>;
    containers?: boolean | Prisma.Terminal$containersArgs<ExtArgs>;
    _count?: boolean | Prisma.TerminalCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["terminal"]>;
export type TerminalSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    location?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["terminal"]>;
export type TerminalSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    location?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["terminal"]>;
export type TerminalSelectScalar = {
    id?: boolean;
    name?: boolean;
    location?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
};
export type TerminalOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "location" | "isActive" | "createdAt", ExtArgs["result"]["terminal"]>;
export type TerminalInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    gates?: boolean | Prisma.Terminal$gatesArgs<ExtArgs>;
    timeSlots?: boolean | Prisma.Terminal$timeSlotsArgs<ExtArgs>;
    bookings?: boolean | Prisma.Terminal$bookingsArgs<ExtArgs>;
    metrics?: boolean | Prisma.Terminal$metricsArgs<ExtArgs>;
    zones?: boolean | Prisma.Terminal$zonesArgs<ExtArgs>;
    containers?: boolean | Prisma.Terminal$containersArgs<ExtArgs>;
    _count?: boolean | Prisma.TerminalCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TerminalIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type TerminalIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $TerminalPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Terminal";
    objects: {
        gates: Prisma.$GatePayload<ExtArgs>[];
        timeSlots: Prisma.$TimeSlotPayload<ExtArgs>[];
        bookings: Prisma.$BookingPayload<ExtArgs>[];
        metrics: Prisma.$MetricDailyPayload<ExtArgs>[];
        zones: Prisma.$ZonePayload<ExtArgs>[];
        containers: Prisma.$ContainerPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        location: string;
        isActive: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["terminal"]>;
    composites: {};
};
export type TerminalGetPayload<S extends boolean | null | undefined | TerminalDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TerminalPayload, S>;
export type TerminalCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TerminalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TerminalCountAggregateInputType | true;
};
export interface TerminalDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Terminal'];
        meta: {
            name: 'Terminal';
        };
    };
    findUnique<T extends TerminalFindUniqueArgs>(args: Prisma.SelectSubset<T, TerminalFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TerminalFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TerminalFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TerminalFindFirstArgs>(args?: Prisma.SelectSubset<T, TerminalFindFirstArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TerminalFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TerminalFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TerminalFindManyArgs>(args?: Prisma.SelectSubset<T, TerminalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TerminalCreateArgs>(args: Prisma.SelectSubset<T, TerminalCreateArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TerminalCreateManyArgs>(args?: Prisma.SelectSubset<T, TerminalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TerminalCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TerminalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TerminalDeleteArgs>(args: Prisma.SelectSubset<T, TerminalDeleteArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TerminalUpdateArgs>(args: Prisma.SelectSubset<T, TerminalUpdateArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TerminalDeleteManyArgs>(args?: Prisma.SelectSubset<T, TerminalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TerminalUpdateManyArgs>(args: Prisma.SelectSubset<T, TerminalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TerminalUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TerminalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TerminalUpsertArgs>(args: Prisma.SelectSubset<T, TerminalUpsertArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TerminalCountArgs>(args?: Prisma.Subset<T, TerminalCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TerminalCountAggregateOutputType> : number>;
    aggregate<T extends TerminalAggregateArgs>(args: Prisma.Subset<T, TerminalAggregateArgs>): Prisma.PrismaPromise<GetTerminalAggregateType<T>>;
    groupBy<T extends TerminalGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TerminalGroupByArgs['orderBy'];
    } : {
        orderBy?: TerminalGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TerminalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTerminalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TerminalFieldRefs;
}
export interface Prisma__TerminalClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    gates<T extends Prisma.Terminal$gatesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Terminal$gatesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    timeSlots<T extends Prisma.Terminal$timeSlotsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Terminal$timeSlotsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    bookings<T extends Prisma.Terminal$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Terminal$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    metrics<T extends Prisma.Terminal$metricsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Terminal$metricsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    zones<T extends Prisma.Terminal$zonesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Terminal$zonesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    containers<T extends Prisma.Terminal$containersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Terminal$containersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TerminalFieldRefs {
    readonly id: Prisma.FieldRef<"Terminal", 'String'>;
    readonly name: Prisma.FieldRef<"Terminal", 'String'>;
    readonly location: Prisma.FieldRef<"Terminal", 'String'>;
    readonly isActive: Prisma.FieldRef<"Terminal", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Terminal", 'DateTime'>;
}
export type TerminalFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelect<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    include?: Prisma.TerminalInclude<ExtArgs> | null;
    where: Prisma.TerminalWhereUniqueInput;
};
export type TerminalFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelect<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    include?: Prisma.TerminalInclude<ExtArgs> | null;
    where: Prisma.TerminalWhereUniqueInput;
};
export type TerminalFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelect<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    include?: Prisma.TerminalInclude<ExtArgs> | null;
    where?: Prisma.TerminalWhereInput;
    orderBy?: Prisma.TerminalOrderByWithRelationInput | Prisma.TerminalOrderByWithRelationInput[];
    cursor?: Prisma.TerminalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TerminalScalarFieldEnum | Prisma.TerminalScalarFieldEnum[];
};
export type TerminalFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelect<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    include?: Prisma.TerminalInclude<ExtArgs> | null;
    where?: Prisma.TerminalWhereInput;
    orderBy?: Prisma.TerminalOrderByWithRelationInput | Prisma.TerminalOrderByWithRelationInput[];
    cursor?: Prisma.TerminalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TerminalScalarFieldEnum | Prisma.TerminalScalarFieldEnum[];
};
export type TerminalFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelect<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    include?: Prisma.TerminalInclude<ExtArgs> | null;
    where?: Prisma.TerminalWhereInput;
    orderBy?: Prisma.TerminalOrderByWithRelationInput | Prisma.TerminalOrderByWithRelationInput[];
    cursor?: Prisma.TerminalWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TerminalScalarFieldEnum | Prisma.TerminalScalarFieldEnum[];
};
export type TerminalCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelect<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    include?: Prisma.TerminalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TerminalCreateInput, Prisma.TerminalUncheckedCreateInput>;
};
export type TerminalCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TerminalCreateManyInput | Prisma.TerminalCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TerminalCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    data: Prisma.TerminalCreateManyInput | Prisma.TerminalCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TerminalUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelect<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    include?: Prisma.TerminalInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TerminalUpdateInput, Prisma.TerminalUncheckedUpdateInput>;
    where: Prisma.TerminalWhereUniqueInput;
};
export type TerminalUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TerminalUpdateManyMutationInput, Prisma.TerminalUncheckedUpdateManyInput>;
    where?: Prisma.TerminalWhereInput;
    limit?: number;
};
export type TerminalUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TerminalUpdateManyMutationInput, Prisma.TerminalUncheckedUpdateManyInput>;
    where?: Prisma.TerminalWhereInput;
    limit?: number;
};
export type TerminalUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelect<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    include?: Prisma.TerminalInclude<ExtArgs> | null;
    where: Prisma.TerminalWhereUniqueInput;
    create: Prisma.XOR<Prisma.TerminalCreateInput, Prisma.TerminalUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TerminalUpdateInput, Prisma.TerminalUncheckedUpdateInput>;
};
export type TerminalDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelect<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    include?: Prisma.TerminalInclude<ExtArgs> | null;
    where: Prisma.TerminalWhereUniqueInput;
};
export type TerminalDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TerminalWhereInput;
    limit?: number;
};
export type Terminal$gatesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateSelect<ExtArgs> | null;
    omit?: Prisma.GateOmit<ExtArgs> | null;
    include?: Prisma.GateInclude<ExtArgs> | null;
    where?: Prisma.GateWhereInput;
    orderBy?: Prisma.GateOrderByWithRelationInput | Prisma.GateOrderByWithRelationInput[];
    cursor?: Prisma.GateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GateScalarFieldEnum | Prisma.GateScalarFieldEnum[];
};
export type Terminal$timeSlotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeSlotSelect<ExtArgs> | null;
    omit?: Prisma.TimeSlotOmit<ExtArgs> | null;
    include?: Prisma.TimeSlotInclude<ExtArgs> | null;
    where?: Prisma.TimeSlotWhereInput;
    orderBy?: Prisma.TimeSlotOrderByWithRelationInput | Prisma.TimeSlotOrderByWithRelationInput[];
    cursor?: Prisma.TimeSlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TimeSlotScalarFieldEnum | Prisma.TimeSlotScalarFieldEnum[];
};
export type Terminal$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Terminal$metricsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MetricDailySelect<ExtArgs> | null;
    omit?: Prisma.MetricDailyOmit<ExtArgs> | null;
    include?: Prisma.MetricDailyInclude<ExtArgs> | null;
    where?: Prisma.MetricDailyWhereInput;
    orderBy?: Prisma.MetricDailyOrderByWithRelationInput | Prisma.MetricDailyOrderByWithRelationInput[];
    cursor?: Prisma.MetricDailyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MetricDailyScalarFieldEnum | Prisma.MetricDailyScalarFieldEnum[];
};
export type Terminal$zonesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    where?: Prisma.ZoneWhereInput;
    orderBy?: Prisma.ZoneOrderByWithRelationInput | Prisma.ZoneOrderByWithRelationInput[];
    cursor?: Prisma.ZoneWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ZoneScalarFieldEnum | Prisma.ZoneScalarFieldEnum[];
};
export type Terminal$containersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerSelect<ExtArgs> | null;
    omit?: Prisma.ContainerOmit<ExtArgs> | null;
    include?: Prisma.ContainerInclude<ExtArgs> | null;
    where?: Prisma.ContainerWhereInput;
    orderBy?: Prisma.ContainerOrderByWithRelationInput | Prisma.ContainerOrderByWithRelationInput[];
    cursor?: Prisma.ContainerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ContainerScalarFieldEnum | Prisma.ContainerScalarFieldEnum[];
};
export type TerminalDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelect<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    include?: Prisma.TerminalInclude<ExtArgs> | null;
};
export {};
