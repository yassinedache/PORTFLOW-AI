import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PenaltyModel = runtime.Types.Result.DefaultSelection<Prisma.$PenaltyPayload>;
export type AggregatePenalty = {
    _count: PenaltyCountAggregateOutputType | null;
    _avg: PenaltyAvgAggregateOutputType | null;
    _sum: PenaltySumAggregateOutputType | null;
    _min: PenaltyMinAggregateOutputType | null;
    _max: PenaltyMaxAggregateOutputType | null;
};
export type PenaltyAvgAggregateOutputType = {
    amount: number | null;
};
export type PenaltySumAggregateOutputType = {
    amount: number | null;
};
export type PenaltyMinAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    type: string | null;
    amount: number | null;
    reason: string | null;
    appliedAt: Date | null;
};
export type PenaltyMaxAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    type: string | null;
    amount: number | null;
    reason: string | null;
    appliedAt: Date | null;
};
export type PenaltyCountAggregateOutputType = {
    id: number;
    bookingId: number;
    type: number;
    amount: number;
    reason: number;
    appliedAt: number;
    _all: number;
};
export type PenaltyAvgAggregateInputType = {
    amount?: true;
};
export type PenaltySumAggregateInputType = {
    amount?: true;
};
export type PenaltyMinAggregateInputType = {
    id?: true;
    bookingId?: true;
    type?: true;
    amount?: true;
    reason?: true;
    appliedAt?: true;
};
export type PenaltyMaxAggregateInputType = {
    id?: true;
    bookingId?: true;
    type?: true;
    amount?: true;
    reason?: true;
    appliedAt?: true;
};
export type PenaltyCountAggregateInputType = {
    id?: true;
    bookingId?: true;
    type?: true;
    amount?: true;
    reason?: true;
    appliedAt?: true;
    _all?: true;
};
export type PenaltyAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PenaltyWhereInput;
    orderBy?: Prisma.PenaltyOrderByWithRelationInput | Prisma.PenaltyOrderByWithRelationInput[];
    cursor?: Prisma.PenaltyWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PenaltyCountAggregateInputType;
    _avg?: PenaltyAvgAggregateInputType;
    _sum?: PenaltySumAggregateInputType;
    _min?: PenaltyMinAggregateInputType;
    _max?: PenaltyMaxAggregateInputType;
};
export type GetPenaltyAggregateType<T extends PenaltyAggregateArgs> = {
    [P in keyof T & keyof AggregatePenalty]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePenalty[P]> : Prisma.GetScalarType<T[P], AggregatePenalty[P]>;
};
export type PenaltyGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PenaltyWhereInput;
    orderBy?: Prisma.PenaltyOrderByWithAggregationInput | Prisma.PenaltyOrderByWithAggregationInput[];
    by: Prisma.PenaltyScalarFieldEnum[] | Prisma.PenaltyScalarFieldEnum;
    having?: Prisma.PenaltyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PenaltyCountAggregateInputType | true;
    _avg?: PenaltyAvgAggregateInputType;
    _sum?: PenaltySumAggregateInputType;
    _min?: PenaltyMinAggregateInputType;
    _max?: PenaltyMaxAggregateInputType;
};
export type PenaltyGroupByOutputType = {
    id: string;
    bookingId: string;
    type: string;
    amount: number;
    reason: string | null;
    appliedAt: Date;
    _count: PenaltyCountAggregateOutputType | null;
    _avg: PenaltyAvgAggregateOutputType | null;
    _sum: PenaltySumAggregateOutputType | null;
    _min: PenaltyMinAggregateOutputType | null;
    _max: PenaltyMaxAggregateOutputType | null;
};
type GetPenaltyGroupByPayload<T extends PenaltyGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PenaltyGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PenaltyGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PenaltyGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PenaltyGroupByOutputType[P]>;
}>>;
export type PenaltyWhereInput = {
    AND?: Prisma.PenaltyWhereInput | Prisma.PenaltyWhereInput[];
    OR?: Prisma.PenaltyWhereInput[];
    NOT?: Prisma.PenaltyWhereInput | Prisma.PenaltyWhereInput[];
    id?: Prisma.UuidFilter<"Penalty"> | string;
    bookingId?: Prisma.UuidFilter<"Penalty"> | string;
    type?: Prisma.StringFilter<"Penalty"> | string;
    amount?: Prisma.FloatFilter<"Penalty"> | number;
    reason?: Prisma.StringNullableFilter<"Penalty"> | string | null;
    appliedAt?: Prisma.DateTimeFilter<"Penalty"> | Date | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
};
export type PenaltyOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    appliedAt?: Prisma.SortOrder;
    booking?: Prisma.BookingOrderByWithRelationInput;
};
export type PenaltyWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PenaltyWhereInput | Prisma.PenaltyWhereInput[];
    OR?: Prisma.PenaltyWhereInput[];
    NOT?: Prisma.PenaltyWhereInput | Prisma.PenaltyWhereInput[];
    bookingId?: Prisma.UuidFilter<"Penalty"> | string;
    type?: Prisma.StringFilter<"Penalty"> | string;
    amount?: Prisma.FloatFilter<"Penalty"> | number;
    reason?: Prisma.StringNullableFilter<"Penalty"> | string | null;
    appliedAt?: Prisma.DateTimeFilter<"Penalty"> | Date | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
}, "id">;
export type PenaltyOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    appliedAt?: Prisma.SortOrder;
    _count?: Prisma.PenaltyCountOrderByAggregateInput;
    _avg?: Prisma.PenaltyAvgOrderByAggregateInput;
    _max?: Prisma.PenaltyMaxOrderByAggregateInput;
    _min?: Prisma.PenaltyMinOrderByAggregateInput;
    _sum?: Prisma.PenaltySumOrderByAggregateInput;
};
export type PenaltyScalarWhereWithAggregatesInput = {
    AND?: Prisma.PenaltyScalarWhereWithAggregatesInput | Prisma.PenaltyScalarWhereWithAggregatesInput[];
    OR?: Prisma.PenaltyScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PenaltyScalarWhereWithAggregatesInput | Prisma.PenaltyScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Penalty"> | string;
    bookingId?: Prisma.UuidWithAggregatesFilter<"Penalty"> | string;
    type?: Prisma.StringWithAggregatesFilter<"Penalty"> | string;
    amount?: Prisma.FloatWithAggregatesFilter<"Penalty"> | number;
    reason?: Prisma.StringNullableWithAggregatesFilter<"Penalty"> | string | null;
    appliedAt?: Prisma.DateTimeWithAggregatesFilter<"Penalty"> | Date | string;
};
export type PenaltyCreateInput = {
    id?: string;
    type: string;
    amount: number;
    reason?: string | null;
    appliedAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutPenaltiesInput;
};
export type PenaltyUncheckedCreateInput = {
    id?: string;
    bookingId: string;
    type: string;
    amount: number;
    reason?: string | null;
    appliedAt?: Date | string;
};
export type PenaltyUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    appliedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutPenaltiesNestedInput;
};
export type PenaltyUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    appliedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PenaltyCreateManyInput = {
    id?: string;
    bookingId: string;
    type: string;
    amount: number;
    reason?: string | null;
    appliedAt?: Date | string;
};
export type PenaltyUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    appliedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PenaltyUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    appliedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PenaltyListRelationFilter = {
    every?: Prisma.PenaltyWhereInput;
    some?: Prisma.PenaltyWhereInput;
    none?: Prisma.PenaltyWhereInput;
};
export type PenaltyOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PenaltyCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    appliedAt?: Prisma.SortOrder;
};
export type PenaltyAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type PenaltyMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    appliedAt?: Prisma.SortOrder;
};
export type PenaltyMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    appliedAt?: Prisma.SortOrder;
};
export type PenaltySumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type PenaltyCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.PenaltyCreateWithoutBookingInput, Prisma.PenaltyUncheckedCreateWithoutBookingInput> | Prisma.PenaltyCreateWithoutBookingInput[] | Prisma.PenaltyUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.PenaltyCreateOrConnectWithoutBookingInput | Prisma.PenaltyCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.PenaltyCreateManyBookingInputEnvelope;
    connect?: Prisma.PenaltyWhereUniqueInput | Prisma.PenaltyWhereUniqueInput[];
};
export type PenaltyUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.PenaltyCreateWithoutBookingInput, Prisma.PenaltyUncheckedCreateWithoutBookingInput> | Prisma.PenaltyCreateWithoutBookingInput[] | Prisma.PenaltyUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.PenaltyCreateOrConnectWithoutBookingInput | Prisma.PenaltyCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.PenaltyCreateManyBookingInputEnvelope;
    connect?: Prisma.PenaltyWhereUniqueInput | Prisma.PenaltyWhereUniqueInput[];
};
export type PenaltyUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.PenaltyCreateWithoutBookingInput, Prisma.PenaltyUncheckedCreateWithoutBookingInput> | Prisma.PenaltyCreateWithoutBookingInput[] | Prisma.PenaltyUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.PenaltyCreateOrConnectWithoutBookingInput | Prisma.PenaltyCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.PenaltyUpsertWithWhereUniqueWithoutBookingInput | Prisma.PenaltyUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.PenaltyCreateManyBookingInputEnvelope;
    set?: Prisma.PenaltyWhereUniqueInput | Prisma.PenaltyWhereUniqueInput[];
    disconnect?: Prisma.PenaltyWhereUniqueInput | Prisma.PenaltyWhereUniqueInput[];
    delete?: Prisma.PenaltyWhereUniqueInput | Prisma.PenaltyWhereUniqueInput[];
    connect?: Prisma.PenaltyWhereUniqueInput | Prisma.PenaltyWhereUniqueInput[];
    update?: Prisma.PenaltyUpdateWithWhereUniqueWithoutBookingInput | Prisma.PenaltyUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.PenaltyUpdateManyWithWhereWithoutBookingInput | Prisma.PenaltyUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.PenaltyScalarWhereInput | Prisma.PenaltyScalarWhereInput[];
};
export type PenaltyUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.PenaltyCreateWithoutBookingInput, Prisma.PenaltyUncheckedCreateWithoutBookingInput> | Prisma.PenaltyCreateWithoutBookingInput[] | Prisma.PenaltyUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.PenaltyCreateOrConnectWithoutBookingInput | Prisma.PenaltyCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.PenaltyUpsertWithWhereUniqueWithoutBookingInput | Prisma.PenaltyUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.PenaltyCreateManyBookingInputEnvelope;
    set?: Prisma.PenaltyWhereUniqueInput | Prisma.PenaltyWhereUniqueInput[];
    disconnect?: Prisma.PenaltyWhereUniqueInput | Prisma.PenaltyWhereUniqueInput[];
    delete?: Prisma.PenaltyWhereUniqueInput | Prisma.PenaltyWhereUniqueInput[];
    connect?: Prisma.PenaltyWhereUniqueInput | Prisma.PenaltyWhereUniqueInput[];
    update?: Prisma.PenaltyUpdateWithWhereUniqueWithoutBookingInput | Prisma.PenaltyUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.PenaltyUpdateManyWithWhereWithoutBookingInput | Prisma.PenaltyUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.PenaltyScalarWhereInput | Prisma.PenaltyScalarWhereInput[];
};
export type PenaltyCreateWithoutBookingInput = {
    id?: string;
    type: string;
    amount: number;
    reason?: string | null;
    appliedAt?: Date | string;
};
export type PenaltyUncheckedCreateWithoutBookingInput = {
    id?: string;
    type: string;
    amount: number;
    reason?: string | null;
    appliedAt?: Date | string;
};
export type PenaltyCreateOrConnectWithoutBookingInput = {
    where: Prisma.PenaltyWhereUniqueInput;
    create: Prisma.XOR<Prisma.PenaltyCreateWithoutBookingInput, Prisma.PenaltyUncheckedCreateWithoutBookingInput>;
};
export type PenaltyCreateManyBookingInputEnvelope = {
    data: Prisma.PenaltyCreateManyBookingInput | Prisma.PenaltyCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type PenaltyUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.PenaltyWhereUniqueInput;
    update: Prisma.XOR<Prisma.PenaltyUpdateWithoutBookingInput, Prisma.PenaltyUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.PenaltyCreateWithoutBookingInput, Prisma.PenaltyUncheckedCreateWithoutBookingInput>;
};
export type PenaltyUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.PenaltyWhereUniqueInput;
    data: Prisma.XOR<Prisma.PenaltyUpdateWithoutBookingInput, Prisma.PenaltyUncheckedUpdateWithoutBookingInput>;
};
export type PenaltyUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.PenaltyScalarWhereInput;
    data: Prisma.XOR<Prisma.PenaltyUpdateManyMutationInput, Prisma.PenaltyUncheckedUpdateManyWithoutBookingInput>;
};
export type PenaltyScalarWhereInput = {
    AND?: Prisma.PenaltyScalarWhereInput | Prisma.PenaltyScalarWhereInput[];
    OR?: Prisma.PenaltyScalarWhereInput[];
    NOT?: Prisma.PenaltyScalarWhereInput | Prisma.PenaltyScalarWhereInput[];
    id?: Prisma.UuidFilter<"Penalty"> | string;
    bookingId?: Prisma.UuidFilter<"Penalty"> | string;
    type?: Prisma.StringFilter<"Penalty"> | string;
    amount?: Prisma.FloatFilter<"Penalty"> | number;
    reason?: Prisma.StringNullableFilter<"Penalty"> | string | null;
    appliedAt?: Prisma.DateTimeFilter<"Penalty"> | Date | string;
};
export type PenaltyCreateManyBookingInput = {
    id?: string;
    type: string;
    amount: number;
    reason?: string | null;
    appliedAt?: Date | string;
};
export type PenaltyUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    appliedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PenaltyUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    appliedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PenaltyUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    appliedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PenaltySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    type?: boolean;
    amount?: boolean;
    reason?: boolean;
    appliedAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["penalty"]>;
export type PenaltySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    type?: boolean;
    amount?: boolean;
    reason?: boolean;
    appliedAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["penalty"]>;
export type PenaltySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    type?: boolean;
    amount?: boolean;
    reason?: boolean;
    appliedAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["penalty"]>;
export type PenaltySelectScalar = {
    id?: boolean;
    bookingId?: boolean;
    type?: boolean;
    amount?: boolean;
    reason?: boolean;
    appliedAt?: boolean;
};
export type PenaltyOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bookingId" | "type" | "amount" | "reason" | "appliedAt", ExtArgs["result"]["penalty"]>;
export type PenaltyInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
};
export type PenaltyIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
};
export type PenaltyIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
};
export type $PenaltyPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Penalty";
    objects: {
        booking: Prisma.$BookingPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bookingId: string;
        type: string;
        amount: number;
        reason: string | null;
        appliedAt: Date;
    }, ExtArgs["result"]["penalty"]>;
    composites: {};
};
export type PenaltyGetPayload<S extends boolean | null | undefined | PenaltyDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PenaltyPayload, S>;
export type PenaltyCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PenaltyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PenaltyCountAggregateInputType | true;
};
export interface PenaltyDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Penalty'];
        meta: {
            name: 'Penalty';
        };
    };
    findUnique<T extends PenaltyFindUniqueArgs>(args: Prisma.SelectSubset<T, PenaltyFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PenaltyClient<runtime.Types.Result.GetResult<Prisma.$PenaltyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PenaltyFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PenaltyFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PenaltyClient<runtime.Types.Result.GetResult<Prisma.$PenaltyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PenaltyFindFirstArgs>(args?: Prisma.SelectSubset<T, PenaltyFindFirstArgs<ExtArgs>>): Prisma.Prisma__PenaltyClient<runtime.Types.Result.GetResult<Prisma.$PenaltyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PenaltyFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PenaltyFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PenaltyClient<runtime.Types.Result.GetResult<Prisma.$PenaltyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PenaltyFindManyArgs>(args?: Prisma.SelectSubset<T, PenaltyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PenaltyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PenaltyCreateArgs>(args: Prisma.SelectSubset<T, PenaltyCreateArgs<ExtArgs>>): Prisma.Prisma__PenaltyClient<runtime.Types.Result.GetResult<Prisma.$PenaltyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PenaltyCreateManyArgs>(args?: Prisma.SelectSubset<T, PenaltyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PenaltyCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PenaltyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PenaltyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PenaltyDeleteArgs>(args: Prisma.SelectSubset<T, PenaltyDeleteArgs<ExtArgs>>): Prisma.Prisma__PenaltyClient<runtime.Types.Result.GetResult<Prisma.$PenaltyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PenaltyUpdateArgs>(args: Prisma.SelectSubset<T, PenaltyUpdateArgs<ExtArgs>>): Prisma.Prisma__PenaltyClient<runtime.Types.Result.GetResult<Prisma.$PenaltyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PenaltyDeleteManyArgs>(args?: Prisma.SelectSubset<T, PenaltyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PenaltyUpdateManyArgs>(args: Prisma.SelectSubset<T, PenaltyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PenaltyUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PenaltyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PenaltyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PenaltyUpsertArgs>(args: Prisma.SelectSubset<T, PenaltyUpsertArgs<ExtArgs>>): Prisma.Prisma__PenaltyClient<runtime.Types.Result.GetResult<Prisma.$PenaltyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PenaltyCountArgs>(args?: Prisma.Subset<T, PenaltyCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PenaltyCountAggregateOutputType> : number>;
    aggregate<T extends PenaltyAggregateArgs>(args: Prisma.Subset<T, PenaltyAggregateArgs>): Prisma.PrismaPromise<GetPenaltyAggregateType<T>>;
    groupBy<T extends PenaltyGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PenaltyGroupByArgs['orderBy'];
    } : {
        orderBy?: PenaltyGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PenaltyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPenaltyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PenaltyFieldRefs;
}
export interface Prisma__PenaltyClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    booking<T extends Prisma.BookingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookingDefaultArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PenaltyFieldRefs {
    readonly id: Prisma.FieldRef<"Penalty", 'String'>;
    readonly bookingId: Prisma.FieldRef<"Penalty", 'String'>;
    readonly type: Prisma.FieldRef<"Penalty", 'String'>;
    readonly amount: Prisma.FieldRef<"Penalty", 'Float'>;
    readonly reason: Prisma.FieldRef<"Penalty", 'String'>;
    readonly appliedAt: Prisma.FieldRef<"Penalty", 'DateTime'>;
}
export type PenaltyFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PenaltySelect<ExtArgs> | null;
    omit?: Prisma.PenaltyOmit<ExtArgs> | null;
    include?: Prisma.PenaltyInclude<ExtArgs> | null;
    where: Prisma.PenaltyWhereUniqueInput;
};
export type PenaltyFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PenaltySelect<ExtArgs> | null;
    omit?: Prisma.PenaltyOmit<ExtArgs> | null;
    include?: Prisma.PenaltyInclude<ExtArgs> | null;
    where: Prisma.PenaltyWhereUniqueInput;
};
export type PenaltyFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PenaltySelect<ExtArgs> | null;
    omit?: Prisma.PenaltyOmit<ExtArgs> | null;
    include?: Prisma.PenaltyInclude<ExtArgs> | null;
    where?: Prisma.PenaltyWhereInput;
    orderBy?: Prisma.PenaltyOrderByWithRelationInput | Prisma.PenaltyOrderByWithRelationInput[];
    cursor?: Prisma.PenaltyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PenaltyScalarFieldEnum | Prisma.PenaltyScalarFieldEnum[];
};
export type PenaltyFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PenaltySelect<ExtArgs> | null;
    omit?: Prisma.PenaltyOmit<ExtArgs> | null;
    include?: Prisma.PenaltyInclude<ExtArgs> | null;
    where?: Prisma.PenaltyWhereInput;
    orderBy?: Prisma.PenaltyOrderByWithRelationInput | Prisma.PenaltyOrderByWithRelationInput[];
    cursor?: Prisma.PenaltyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PenaltyScalarFieldEnum | Prisma.PenaltyScalarFieldEnum[];
};
export type PenaltyFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PenaltySelect<ExtArgs> | null;
    omit?: Prisma.PenaltyOmit<ExtArgs> | null;
    include?: Prisma.PenaltyInclude<ExtArgs> | null;
    where?: Prisma.PenaltyWhereInput;
    orderBy?: Prisma.PenaltyOrderByWithRelationInput | Prisma.PenaltyOrderByWithRelationInput[];
    cursor?: Prisma.PenaltyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PenaltyScalarFieldEnum | Prisma.PenaltyScalarFieldEnum[];
};
export type PenaltyCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PenaltySelect<ExtArgs> | null;
    omit?: Prisma.PenaltyOmit<ExtArgs> | null;
    include?: Prisma.PenaltyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PenaltyCreateInput, Prisma.PenaltyUncheckedCreateInput>;
};
export type PenaltyCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PenaltyCreateManyInput | Prisma.PenaltyCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PenaltyCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PenaltySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PenaltyOmit<ExtArgs> | null;
    data: Prisma.PenaltyCreateManyInput | Prisma.PenaltyCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PenaltyIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PenaltyUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PenaltySelect<ExtArgs> | null;
    omit?: Prisma.PenaltyOmit<ExtArgs> | null;
    include?: Prisma.PenaltyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PenaltyUpdateInput, Prisma.PenaltyUncheckedUpdateInput>;
    where: Prisma.PenaltyWhereUniqueInput;
};
export type PenaltyUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PenaltyUpdateManyMutationInput, Prisma.PenaltyUncheckedUpdateManyInput>;
    where?: Prisma.PenaltyWhereInput;
    limit?: number;
};
export type PenaltyUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PenaltySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PenaltyOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PenaltyUpdateManyMutationInput, Prisma.PenaltyUncheckedUpdateManyInput>;
    where?: Prisma.PenaltyWhereInput;
    limit?: number;
    include?: Prisma.PenaltyIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PenaltyUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PenaltySelect<ExtArgs> | null;
    omit?: Prisma.PenaltyOmit<ExtArgs> | null;
    include?: Prisma.PenaltyInclude<ExtArgs> | null;
    where: Prisma.PenaltyWhereUniqueInput;
    create: Prisma.XOR<Prisma.PenaltyCreateInput, Prisma.PenaltyUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PenaltyUpdateInput, Prisma.PenaltyUncheckedUpdateInput>;
};
export type PenaltyDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PenaltySelect<ExtArgs> | null;
    omit?: Prisma.PenaltyOmit<ExtArgs> | null;
    include?: Prisma.PenaltyInclude<ExtArgs> | null;
    where: Prisma.PenaltyWhereUniqueInput;
};
export type PenaltyDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PenaltyWhereInput;
    limit?: number;
};
export type PenaltyDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PenaltySelect<ExtArgs> | null;
    omit?: Prisma.PenaltyOmit<ExtArgs> | null;
    include?: Prisma.PenaltyInclude<ExtArgs> | null;
};
export {};
