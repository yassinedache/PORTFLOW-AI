import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TimeSlotModel = runtime.Types.Result.DefaultSelection<Prisma.$TimeSlotPayload>;
export type AggregateTimeSlot = {
    _count: TimeSlotCountAggregateOutputType | null;
    _avg: TimeSlotAvgAggregateOutputType | null;
    _sum: TimeSlotSumAggregateOutputType | null;
    _min: TimeSlotMinAggregateOutputType | null;
    _max: TimeSlotMaxAggregateOutputType | null;
};
export type TimeSlotAvgAggregateOutputType = {
    capacity: number | null;
};
export type TimeSlotSumAggregateOutputType = {
    capacity: number | null;
};
export type TimeSlotMinAggregateOutputType = {
    id: string | null;
    terminalId: string | null;
    startTime: Date | null;
    endTime: Date | null;
    capacity: number | null;
};
export type TimeSlotMaxAggregateOutputType = {
    id: string | null;
    terminalId: string | null;
    startTime: Date | null;
    endTime: Date | null;
    capacity: number | null;
};
export type TimeSlotCountAggregateOutputType = {
    id: number;
    terminalId: number;
    startTime: number;
    endTime: number;
    capacity: number;
    _all: number;
};
export type TimeSlotAvgAggregateInputType = {
    capacity?: true;
};
export type TimeSlotSumAggregateInputType = {
    capacity?: true;
};
export type TimeSlotMinAggregateInputType = {
    id?: true;
    terminalId?: true;
    startTime?: true;
    endTime?: true;
    capacity?: true;
};
export type TimeSlotMaxAggregateInputType = {
    id?: true;
    terminalId?: true;
    startTime?: true;
    endTime?: true;
    capacity?: true;
};
export type TimeSlotCountAggregateInputType = {
    id?: true;
    terminalId?: true;
    startTime?: true;
    endTime?: true;
    capacity?: true;
    _all?: true;
};
export type TimeSlotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeSlotWhereInput;
    orderBy?: Prisma.TimeSlotOrderByWithRelationInput | Prisma.TimeSlotOrderByWithRelationInput[];
    cursor?: Prisma.TimeSlotWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TimeSlotCountAggregateInputType;
    _avg?: TimeSlotAvgAggregateInputType;
    _sum?: TimeSlotSumAggregateInputType;
    _min?: TimeSlotMinAggregateInputType;
    _max?: TimeSlotMaxAggregateInputType;
};
export type GetTimeSlotAggregateType<T extends TimeSlotAggregateArgs> = {
    [P in keyof T & keyof AggregateTimeSlot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTimeSlot[P]> : Prisma.GetScalarType<T[P], AggregateTimeSlot[P]>;
};
export type TimeSlotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeSlotWhereInput;
    orderBy?: Prisma.TimeSlotOrderByWithAggregationInput | Prisma.TimeSlotOrderByWithAggregationInput[];
    by: Prisma.TimeSlotScalarFieldEnum[] | Prisma.TimeSlotScalarFieldEnum;
    having?: Prisma.TimeSlotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TimeSlotCountAggregateInputType | true;
    _avg?: TimeSlotAvgAggregateInputType;
    _sum?: TimeSlotSumAggregateInputType;
    _min?: TimeSlotMinAggregateInputType;
    _max?: TimeSlotMaxAggregateInputType;
};
export type TimeSlotGroupByOutputType = {
    id: string;
    terminalId: string;
    startTime: Date;
    endTime: Date;
    capacity: number;
    _count: TimeSlotCountAggregateOutputType | null;
    _avg: TimeSlotAvgAggregateOutputType | null;
    _sum: TimeSlotSumAggregateOutputType | null;
    _min: TimeSlotMinAggregateOutputType | null;
    _max: TimeSlotMaxAggregateOutputType | null;
};
type GetTimeSlotGroupByPayload<T extends TimeSlotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TimeSlotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TimeSlotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TimeSlotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TimeSlotGroupByOutputType[P]>;
}>>;
export type TimeSlotWhereInput = {
    AND?: Prisma.TimeSlotWhereInput | Prisma.TimeSlotWhereInput[];
    OR?: Prisma.TimeSlotWhereInput[];
    NOT?: Prisma.TimeSlotWhereInput | Prisma.TimeSlotWhereInput[];
    id?: Prisma.UuidFilter<"TimeSlot"> | string;
    terminalId?: Prisma.UuidFilter<"TimeSlot"> | string;
    startTime?: Prisma.DateTimeFilter<"TimeSlot"> | Date | string;
    endTime?: Prisma.DateTimeFilter<"TimeSlot"> | Date | string;
    capacity?: Prisma.IntFilter<"TimeSlot"> | number;
    terminal?: Prisma.XOR<Prisma.TerminalScalarRelationFilter, Prisma.TerminalWhereInput>;
    bookings?: Prisma.BookingListRelationFilter;
};
export type TimeSlotOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    terminal?: Prisma.TerminalOrderByWithRelationInput;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
};
export type TimeSlotWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TimeSlotWhereInput | Prisma.TimeSlotWhereInput[];
    OR?: Prisma.TimeSlotWhereInput[];
    NOT?: Prisma.TimeSlotWhereInput | Prisma.TimeSlotWhereInput[];
    terminalId?: Prisma.UuidFilter<"TimeSlot"> | string;
    startTime?: Prisma.DateTimeFilter<"TimeSlot"> | Date | string;
    endTime?: Prisma.DateTimeFilter<"TimeSlot"> | Date | string;
    capacity?: Prisma.IntFilter<"TimeSlot"> | number;
    terminal?: Prisma.XOR<Prisma.TerminalScalarRelationFilter, Prisma.TerminalWhereInput>;
    bookings?: Prisma.BookingListRelationFilter;
}, "id">;
export type TimeSlotOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
    _count?: Prisma.TimeSlotCountOrderByAggregateInput;
    _avg?: Prisma.TimeSlotAvgOrderByAggregateInput;
    _max?: Prisma.TimeSlotMaxOrderByAggregateInput;
    _min?: Prisma.TimeSlotMinOrderByAggregateInput;
    _sum?: Prisma.TimeSlotSumOrderByAggregateInput;
};
export type TimeSlotScalarWhereWithAggregatesInput = {
    AND?: Prisma.TimeSlotScalarWhereWithAggregatesInput | Prisma.TimeSlotScalarWhereWithAggregatesInput[];
    OR?: Prisma.TimeSlotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TimeSlotScalarWhereWithAggregatesInput | Prisma.TimeSlotScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"TimeSlot"> | string;
    terminalId?: Prisma.UuidWithAggregatesFilter<"TimeSlot"> | string;
    startTime?: Prisma.DateTimeWithAggregatesFilter<"TimeSlot"> | Date | string;
    endTime?: Prisma.DateTimeWithAggregatesFilter<"TimeSlot"> | Date | string;
    capacity?: Prisma.IntWithAggregatesFilter<"TimeSlot"> | number;
};
export type TimeSlotCreateInput = {
    id?: string;
    startTime: Date | string;
    endTime: Date | string;
    capacity: number;
    terminal: Prisma.TerminalCreateNestedOneWithoutTimeSlotsInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutTimeSlotInput;
};
export type TimeSlotUncheckedCreateInput = {
    id?: string;
    terminalId: string;
    startTime: Date | string;
    endTime: Date | string;
    capacity: number;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutTimeSlotInput;
};
export type TimeSlotUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    terminal?: Prisma.TerminalUpdateOneRequiredWithoutTimeSlotsNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutTimeSlotNestedInput;
};
export type TimeSlotUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutTimeSlotNestedInput;
};
export type TimeSlotCreateManyInput = {
    id?: string;
    terminalId: string;
    startTime: Date | string;
    endTime: Date | string;
    capacity: number;
};
export type TimeSlotUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TimeSlotUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TimeSlotListRelationFilter = {
    every?: Prisma.TimeSlotWhereInput;
    some?: Prisma.TimeSlotWhereInput;
    none?: Prisma.TimeSlotWhereInput;
};
export type TimeSlotOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TimeSlotCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
};
export type TimeSlotAvgOrderByAggregateInput = {
    capacity?: Prisma.SortOrder;
};
export type TimeSlotMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
};
export type TimeSlotMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    startTime?: Prisma.SortOrder;
    endTime?: Prisma.SortOrder;
    capacity?: Prisma.SortOrder;
};
export type TimeSlotSumOrderByAggregateInput = {
    capacity?: Prisma.SortOrder;
};
export type TimeSlotScalarRelationFilter = {
    is?: Prisma.TimeSlotWhereInput;
    isNot?: Prisma.TimeSlotWhereInput;
};
export type TimeSlotCreateNestedManyWithoutTerminalInput = {
    create?: Prisma.XOR<Prisma.TimeSlotCreateWithoutTerminalInput, Prisma.TimeSlotUncheckedCreateWithoutTerminalInput> | Prisma.TimeSlotCreateWithoutTerminalInput[] | Prisma.TimeSlotUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.TimeSlotCreateOrConnectWithoutTerminalInput | Prisma.TimeSlotCreateOrConnectWithoutTerminalInput[];
    createMany?: Prisma.TimeSlotCreateManyTerminalInputEnvelope;
    connect?: Prisma.TimeSlotWhereUniqueInput | Prisma.TimeSlotWhereUniqueInput[];
};
export type TimeSlotUncheckedCreateNestedManyWithoutTerminalInput = {
    create?: Prisma.XOR<Prisma.TimeSlotCreateWithoutTerminalInput, Prisma.TimeSlotUncheckedCreateWithoutTerminalInput> | Prisma.TimeSlotCreateWithoutTerminalInput[] | Prisma.TimeSlotUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.TimeSlotCreateOrConnectWithoutTerminalInput | Prisma.TimeSlotCreateOrConnectWithoutTerminalInput[];
    createMany?: Prisma.TimeSlotCreateManyTerminalInputEnvelope;
    connect?: Prisma.TimeSlotWhereUniqueInput | Prisma.TimeSlotWhereUniqueInput[];
};
export type TimeSlotUpdateManyWithoutTerminalNestedInput = {
    create?: Prisma.XOR<Prisma.TimeSlotCreateWithoutTerminalInput, Prisma.TimeSlotUncheckedCreateWithoutTerminalInput> | Prisma.TimeSlotCreateWithoutTerminalInput[] | Prisma.TimeSlotUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.TimeSlotCreateOrConnectWithoutTerminalInput | Prisma.TimeSlotCreateOrConnectWithoutTerminalInput[];
    upsert?: Prisma.TimeSlotUpsertWithWhereUniqueWithoutTerminalInput | Prisma.TimeSlotUpsertWithWhereUniqueWithoutTerminalInput[];
    createMany?: Prisma.TimeSlotCreateManyTerminalInputEnvelope;
    set?: Prisma.TimeSlotWhereUniqueInput | Prisma.TimeSlotWhereUniqueInput[];
    disconnect?: Prisma.TimeSlotWhereUniqueInput | Prisma.TimeSlotWhereUniqueInput[];
    delete?: Prisma.TimeSlotWhereUniqueInput | Prisma.TimeSlotWhereUniqueInput[];
    connect?: Prisma.TimeSlotWhereUniqueInput | Prisma.TimeSlotWhereUniqueInput[];
    update?: Prisma.TimeSlotUpdateWithWhereUniqueWithoutTerminalInput | Prisma.TimeSlotUpdateWithWhereUniqueWithoutTerminalInput[];
    updateMany?: Prisma.TimeSlotUpdateManyWithWhereWithoutTerminalInput | Prisma.TimeSlotUpdateManyWithWhereWithoutTerminalInput[];
    deleteMany?: Prisma.TimeSlotScalarWhereInput | Prisma.TimeSlotScalarWhereInput[];
};
export type TimeSlotUncheckedUpdateManyWithoutTerminalNestedInput = {
    create?: Prisma.XOR<Prisma.TimeSlotCreateWithoutTerminalInput, Prisma.TimeSlotUncheckedCreateWithoutTerminalInput> | Prisma.TimeSlotCreateWithoutTerminalInput[] | Prisma.TimeSlotUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.TimeSlotCreateOrConnectWithoutTerminalInput | Prisma.TimeSlotCreateOrConnectWithoutTerminalInput[];
    upsert?: Prisma.TimeSlotUpsertWithWhereUniqueWithoutTerminalInput | Prisma.TimeSlotUpsertWithWhereUniqueWithoutTerminalInput[];
    createMany?: Prisma.TimeSlotCreateManyTerminalInputEnvelope;
    set?: Prisma.TimeSlotWhereUniqueInput | Prisma.TimeSlotWhereUniqueInput[];
    disconnect?: Prisma.TimeSlotWhereUniqueInput | Prisma.TimeSlotWhereUniqueInput[];
    delete?: Prisma.TimeSlotWhereUniqueInput | Prisma.TimeSlotWhereUniqueInput[];
    connect?: Prisma.TimeSlotWhereUniqueInput | Prisma.TimeSlotWhereUniqueInput[];
    update?: Prisma.TimeSlotUpdateWithWhereUniqueWithoutTerminalInput | Prisma.TimeSlotUpdateWithWhereUniqueWithoutTerminalInput[];
    updateMany?: Prisma.TimeSlotUpdateManyWithWhereWithoutTerminalInput | Prisma.TimeSlotUpdateManyWithWhereWithoutTerminalInput[];
    deleteMany?: Prisma.TimeSlotScalarWhereInput | Prisma.TimeSlotScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type TimeSlotCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.TimeSlotCreateWithoutBookingsInput, Prisma.TimeSlotUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.TimeSlotCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.TimeSlotWhereUniqueInput;
};
export type TimeSlotUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.TimeSlotCreateWithoutBookingsInput, Prisma.TimeSlotUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.TimeSlotCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.TimeSlotUpsertWithoutBookingsInput;
    connect?: Prisma.TimeSlotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TimeSlotUpdateToOneWithWhereWithoutBookingsInput, Prisma.TimeSlotUpdateWithoutBookingsInput>, Prisma.TimeSlotUncheckedUpdateWithoutBookingsInput>;
};
export type TimeSlotCreateWithoutTerminalInput = {
    id?: string;
    startTime: Date | string;
    endTime: Date | string;
    capacity: number;
    bookings?: Prisma.BookingCreateNestedManyWithoutTimeSlotInput;
};
export type TimeSlotUncheckedCreateWithoutTerminalInput = {
    id?: string;
    startTime: Date | string;
    endTime: Date | string;
    capacity: number;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutTimeSlotInput;
};
export type TimeSlotCreateOrConnectWithoutTerminalInput = {
    where: Prisma.TimeSlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.TimeSlotCreateWithoutTerminalInput, Prisma.TimeSlotUncheckedCreateWithoutTerminalInput>;
};
export type TimeSlotCreateManyTerminalInputEnvelope = {
    data: Prisma.TimeSlotCreateManyTerminalInput | Prisma.TimeSlotCreateManyTerminalInput[];
    skipDuplicates?: boolean;
};
export type TimeSlotUpsertWithWhereUniqueWithoutTerminalInput = {
    where: Prisma.TimeSlotWhereUniqueInput;
    update: Prisma.XOR<Prisma.TimeSlotUpdateWithoutTerminalInput, Prisma.TimeSlotUncheckedUpdateWithoutTerminalInput>;
    create: Prisma.XOR<Prisma.TimeSlotCreateWithoutTerminalInput, Prisma.TimeSlotUncheckedCreateWithoutTerminalInput>;
};
export type TimeSlotUpdateWithWhereUniqueWithoutTerminalInput = {
    where: Prisma.TimeSlotWhereUniqueInput;
    data: Prisma.XOR<Prisma.TimeSlotUpdateWithoutTerminalInput, Prisma.TimeSlotUncheckedUpdateWithoutTerminalInput>;
};
export type TimeSlotUpdateManyWithWhereWithoutTerminalInput = {
    where: Prisma.TimeSlotScalarWhereInput;
    data: Prisma.XOR<Prisma.TimeSlotUpdateManyMutationInput, Prisma.TimeSlotUncheckedUpdateManyWithoutTerminalInput>;
};
export type TimeSlotScalarWhereInput = {
    AND?: Prisma.TimeSlotScalarWhereInput | Prisma.TimeSlotScalarWhereInput[];
    OR?: Prisma.TimeSlotScalarWhereInput[];
    NOT?: Prisma.TimeSlotScalarWhereInput | Prisma.TimeSlotScalarWhereInput[];
    id?: Prisma.UuidFilter<"TimeSlot"> | string;
    terminalId?: Prisma.UuidFilter<"TimeSlot"> | string;
    startTime?: Prisma.DateTimeFilter<"TimeSlot"> | Date | string;
    endTime?: Prisma.DateTimeFilter<"TimeSlot"> | Date | string;
    capacity?: Prisma.IntFilter<"TimeSlot"> | number;
};
export type TimeSlotCreateWithoutBookingsInput = {
    id?: string;
    startTime: Date | string;
    endTime: Date | string;
    capacity: number;
    terminal: Prisma.TerminalCreateNestedOneWithoutTimeSlotsInput;
};
export type TimeSlotUncheckedCreateWithoutBookingsInput = {
    id?: string;
    terminalId: string;
    startTime: Date | string;
    endTime: Date | string;
    capacity: number;
};
export type TimeSlotCreateOrConnectWithoutBookingsInput = {
    where: Prisma.TimeSlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.TimeSlotCreateWithoutBookingsInput, Prisma.TimeSlotUncheckedCreateWithoutBookingsInput>;
};
export type TimeSlotUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.TimeSlotUpdateWithoutBookingsInput, Prisma.TimeSlotUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.TimeSlotCreateWithoutBookingsInput, Prisma.TimeSlotUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.TimeSlotWhereInput;
};
export type TimeSlotUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.TimeSlotWhereInput;
    data: Prisma.XOR<Prisma.TimeSlotUpdateWithoutBookingsInput, Prisma.TimeSlotUncheckedUpdateWithoutBookingsInput>;
};
export type TimeSlotUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    terminal?: Prisma.TerminalUpdateOneRequiredWithoutTimeSlotsNestedInput;
};
export type TimeSlotUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TimeSlotCreateManyTerminalInput = {
    id?: string;
    startTime: Date | string;
    endTime: Date | string;
    capacity: number;
};
export type TimeSlotUpdateWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    bookings?: Prisma.BookingUpdateManyWithoutTimeSlotNestedInput;
};
export type TimeSlotUncheckedUpdateWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutTimeSlotNestedInput;
};
export type TimeSlotUncheckedUpdateManyWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endTime?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    capacity?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TimeSlotCountOutputType = {
    bookings: number;
};
export type TimeSlotCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bookings?: boolean | TimeSlotCountOutputTypeCountBookingsArgs;
};
export type TimeSlotCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeSlotCountOutputTypeSelect<ExtArgs> | null;
};
export type TimeSlotCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type TimeSlotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    terminalId?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    capacity?: boolean;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
    bookings?: boolean | Prisma.TimeSlot$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.TimeSlotCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["timeSlot"]>;
export type TimeSlotSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    terminalId?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    capacity?: boolean;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["timeSlot"]>;
export type TimeSlotSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    terminalId?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    capacity?: boolean;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["timeSlot"]>;
export type TimeSlotSelectScalar = {
    id?: boolean;
    terminalId?: boolean;
    startTime?: boolean;
    endTime?: boolean;
    capacity?: boolean;
};
export type TimeSlotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "terminalId" | "startTime" | "endTime" | "capacity", ExtArgs["result"]["timeSlot"]>;
export type TimeSlotInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
    bookings?: boolean | Prisma.TimeSlot$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.TimeSlotCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TimeSlotIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
};
export type TimeSlotIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
};
export type $TimeSlotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TimeSlot";
    objects: {
        terminal: Prisma.$TerminalPayload<ExtArgs>;
        bookings: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        terminalId: string;
        startTime: Date;
        endTime: Date;
        capacity: number;
    }, ExtArgs["result"]["timeSlot"]>;
    composites: {};
};
export type TimeSlotGetPayload<S extends boolean | null | undefined | TimeSlotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload, S>;
export type TimeSlotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TimeSlotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TimeSlotCountAggregateInputType | true;
};
export interface TimeSlotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TimeSlot'];
        meta: {
            name: 'TimeSlot';
        };
    };
    findUnique<T extends TimeSlotFindUniqueArgs>(args: Prisma.SelectSubset<T, TimeSlotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TimeSlotClient<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TimeSlotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TimeSlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TimeSlotClient<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TimeSlotFindFirstArgs>(args?: Prisma.SelectSubset<T, TimeSlotFindFirstArgs<ExtArgs>>): Prisma.Prisma__TimeSlotClient<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TimeSlotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TimeSlotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TimeSlotClient<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TimeSlotFindManyArgs>(args?: Prisma.SelectSubset<T, TimeSlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TimeSlotCreateArgs>(args: Prisma.SelectSubset<T, TimeSlotCreateArgs<ExtArgs>>): Prisma.Prisma__TimeSlotClient<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TimeSlotCreateManyArgs>(args?: Prisma.SelectSubset<T, TimeSlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TimeSlotCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TimeSlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TimeSlotDeleteArgs>(args: Prisma.SelectSubset<T, TimeSlotDeleteArgs<ExtArgs>>): Prisma.Prisma__TimeSlotClient<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TimeSlotUpdateArgs>(args: Prisma.SelectSubset<T, TimeSlotUpdateArgs<ExtArgs>>): Prisma.Prisma__TimeSlotClient<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TimeSlotDeleteManyArgs>(args?: Prisma.SelectSubset<T, TimeSlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TimeSlotUpdateManyArgs>(args: Prisma.SelectSubset<T, TimeSlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TimeSlotUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TimeSlotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TimeSlotUpsertArgs>(args: Prisma.SelectSubset<T, TimeSlotUpsertArgs<ExtArgs>>): Prisma.Prisma__TimeSlotClient<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TimeSlotCountArgs>(args?: Prisma.Subset<T, TimeSlotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TimeSlotCountAggregateOutputType> : number>;
    aggregate<T extends TimeSlotAggregateArgs>(args: Prisma.Subset<T, TimeSlotAggregateArgs>): Prisma.PrismaPromise<GetTimeSlotAggregateType<T>>;
    groupBy<T extends TimeSlotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TimeSlotGroupByArgs['orderBy'];
    } : {
        orderBy?: TimeSlotGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TimeSlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimeSlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TimeSlotFieldRefs;
}
export interface Prisma__TimeSlotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    terminal<T extends Prisma.TerminalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TerminalDefaultArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    bookings<T extends Prisma.TimeSlot$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TimeSlot$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TimeSlotFieldRefs {
    readonly id: Prisma.FieldRef<"TimeSlot", 'String'>;
    readonly terminalId: Prisma.FieldRef<"TimeSlot", 'String'>;
    readonly startTime: Prisma.FieldRef<"TimeSlot", 'DateTime'>;
    readonly endTime: Prisma.FieldRef<"TimeSlot", 'DateTime'>;
    readonly capacity: Prisma.FieldRef<"TimeSlot", 'Int'>;
}
export type TimeSlotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeSlotSelect<ExtArgs> | null;
    omit?: Prisma.TimeSlotOmit<ExtArgs> | null;
    include?: Prisma.TimeSlotInclude<ExtArgs> | null;
    where: Prisma.TimeSlotWhereUniqueInput;
};
export type TimeSlotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeSlotSelect<ExtArgs> | null;
    omit?: Prisma.TimeSlotOmit<ExtArgs> | null;
    include?: Prisma.TimeSlotInclude<ExtArgs> | null;
    where: Prisma.TimeSlotWhereUniqueInput;
};
export type TimeSlotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TimeSlotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TimeSlotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TimeSlotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeSlotSelect<ExtArgs> | null;
    omit?: Prisma.TimeSlotOmit<ExtArgs> | null;
    include?: Prisma.TimeSlotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TimeSlotCreateInput, Prisma.TimeSlotUncheckedCreateInput>;
};
export type TimeSlotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TimeSlotCreateManyInput | Prisma.TimeSlotCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TimeSlotCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeSlotSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TimeSlotOmit<ExtArgs> | null;
    data: Prisma.TimeSlotCreateManyInput | Prisma.TimeSlotCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TimeSlotIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TimeSlotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeSlotSelect<ExtArgs> | null;
    omit?: Prisma.TimeSlotOmit<ExtArgs> | null;
    include?: Prisma.TimeSlotInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TimeSlotUpdateInput, Prisma.TimeSlotUncheckedUpdateInput>;
    where: Prisma.TimeSlotWhereUniqueInput;
};
export type TimeSlotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TimeSlotUpdateManyMutationInput, Prisma.TimeSlotUncheckedUpdateManyInput>;
    where?: Prisma.TimeSlotWhereInput;
    limit?: number;
};
export type TimeSlotUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeSlotSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TimeSlotOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TimeSlotUpdateManyMutationInput, Prisma.TimeSlotUncheckedUpdateManyInput>;
    where?: Prisma.TimeSlotWhereInput;
    limit?: number;
    include?: Prisma.TimeSlotIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TimeSlotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeSlotSelect<ExtArgs> | null;
    omit?: Prisma.TimeSlotOmit<ExtArgs> | null;
    include?: Prisma.TimeSlotInclude<ExtArgs> | null;
    where: Prisma.TimeSlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.TimeSlotCreateInput, Prisma.TimeSlotUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TimeSlotUpdateInput, Prisma.TimeSlotUncheckedUpdateInput>;
};
export type TimeSlotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeSlotSelect<ExtArgs> | null;
    omit?: Prisma.TimeSlotOmit<ExtArgs> | null;
    include?: Prisma.TimeSlotInclude<ExtArgs> | null;
    where: Prisma.TimeSlotWhereUniqueInput;
};
export type TimeSlotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TimeSlotWhereInput;
    limit?: number;
};
export type TimeSlot$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TimeSlotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TimeSlotSelect<ExtArgs> | null;
    omit?: Prisma.TimeSlotOmit<ExtArgs> | null;
    include?: Prisma.TimeSlotInclude<ExtArgs> | null;
};
export {};
