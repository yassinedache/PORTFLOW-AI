import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReadinessPredictionModel = runtime.Types.Result.DefaultSelection<Prisma.$ReadinessPredictionPayload>;
export type AggregateReadinessPrediction = {
    _count: ReadinessPredictionCountAggregateOutputType | null;
    _avg: ReadinessPredictionAvgAggregateOutputType | null;
    _sum: ReadinessPredictionSumAggregateOutputType | null;
    _min: ReadinessPredictionMinAggregateOutputType | null;
    _max: ReadinessPredictionMaxAggregateOutputType | null;
};
export type ReadinessPredictionAvgAggregateOutputType = {
    probability: number | null;
};
export type ReadinessPredictionSumAggregateOutputType = {
    probability: number | null;
};
export type ReadinessPredictionMinAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    probability: number | null;
    riskLevel: string | null;
    computedAt: Date | null;
};
export type ReadinessPredictionMaxAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    probability: number | null;
    riskLevel: string | null;
    computedAt: Date | null;
};
export type ReadinessPredictionCountAggregateOutputType = {
    id: number;
    bookingId: number;
    probability: number;
    riskLevel: number;
    computedAt: number;
    _all: number;
};
export type ReadinessPredictionAvgAggregateInputType = {
    probability?: true;
};
export type ReadinessPredictionSumAggregateInputType = {
    probability?: true;
};
export type ReadinessPredictionMinAggregateInputType = {
    id?: true;
    bookingId?: true;
    probability?: true;
    riskLevel?: true;
    computedAt?: true;
};
export type ReadinessPredictionMaxAggregateInputType = {
    id?: true;
    bookingId?: true;
    probability?: true;
    riskLevel?: true;
    computedAt?: true;
};
export type ReadinessPredictionCountAggregateInputType = {
    id?: true;
    bookingId?: true;
    probability?: true;
    riskLevel?: true;
    computedAt?: true;
    _all?: true;
};
export type ReadinessPredictionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReadinessPredictionWhereInput;
    orderBy?: Prisma.ReadinessPredictionOrderByWithRelationInput | Prisma.ReadinessPredictionOrderByWithRelationInput[];
    cursor?: Prisma.ReadinessPredictionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReadinessPredictionCountAggregateInputType;
    _avg?: ReadinessPredictionAvgAggregateInputType;
    _sum?: ReadinessPredictionSumAggregateInputType;
    _min?: ReadinessPredictionMinAggregateInputType;
    _max?: ReadinessPredictionMaxAggregateInputType;
};
export type GetReadinessPredictionAggregateType<T extends ReadinessPredictionAggregateArgs> = {
    [P in keyof T & keyof AggregateReadinessPrediction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReadinessPrediction[P]> : Prisma.GetScalarType<T[P], AggregateReadinessPrediction[P]>;
};
export type ReadinessPredictionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReadinessPredictionWhereInput;
    orderBy?: Prisma.ReadinessPredictionOrderByWithAggregationInput | Prisma.ReadinessPredictionOrderByWithAggregationInput[];
    by: Prisma.ReadinessPredictionScalarFieldEnum[] | Prisma.ReadinessPredictionScalarFieldEnum;
    having?: Prisma.ReadinessPredictionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReadinessPredictionCountAggregateInputType | true;
    _avg?: ReadinessPredictionAvgAggregateInputType;
    _sum?: ReadinessPredictionSumAggregateInputType;
    _min?: ReadinessPredictionMinAggregateInputType;
    _max?: ReadinessPredictionMaxAggregateInputType;
};
export type ReadinessPredictionGroupByOutputType = {
    id: string;
    bookingId: string;
    probability: number;
    riskLevel: string;
    computedAt: Date;
    _count: ReadinessPredictionCountAggregateOutputType | null;
    _avg: ReadinessPredictionAvgAggregateOutputType | null;
    _sum: ReadinessPredictionSumAggregateOutputType | null;
    _min: ReadinessPredictionMinAggregateOutputType | null;
    _max: ReadinessPredictionMaxAggregateOutputType | null;
};
type GetReadinessPredictionGroupByPayload<T extends ReadinessPredictionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReadinessPredictionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReadinessPredictionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReadinessPredictionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReadinessPredictionGroupByOutputType[P]>;
}>>;
export type ReadinessPredictionWhereInput = {
    AND?: Prisma.ReadinessPredictionWhereInput | Prisma.ReadinessPredictionWhereInput[];
    OR?: Prisma.ReadinessPredictionWhereInput[];
    NOT?: Prisma.ReadinessPredictionWhereInput | Prisma.ReadinessPredictionWhereInput[];
    id?: Prisma.UuidFilter<"ReadinessPrediction"> | string;
    bookingId?: Prisma.UuidFilter<"ReadinessPrediction"> | string;
    probability?: Prisma.IntFilter<"ReadinessPrediction"> | number;
    riskLevel?: Prisma.StringFilter<"ReadinessPrediction"> | string;
    computedAt?: Prisma.DateTimeFilter<"ReadinessPrediction"> | Date | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
};
export type ReadinessPredictionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    probability?: Prisma.SortOrder;
    riskLevel?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
    booking?: Prisma.BookingOrderByWithRelationInput;
};
export type ReadinessPredictionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReadinessPredictionWhereInput | Prisma.ReadinessPredictionWhereInput[];
    OR?: Prisma.ReadinessPredictionWhereInput[];
    NOT?: Prisma.ReadinessPredictionWhereInput | Prisma.ReadinessPredictionWhereInput[];
    bookingId?: Prisma.UuidFilter<"ReadinessPrediction"> | string;
    probability?: Prisma.IntFilter<"ReadinessPrediction"> | number;
    riskLevel?: Prisma.StringFilter<"ReadinessPrediction"> | string;
    computedAt?: Prisma.DateTimeFilter<"ReadinessPrediction"> | Date | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
}, "id">;
export type ReadinessPredictionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    probability?: Prisma.SortOrder;
    riskLevel?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
    _count?: Prisma.ReadinessPredictionCountOrderByAggregateInput;
    _avg?: Prisma.ReadinessPredictionAvgOrderByAggregateInput;
    _max?: Prisma.ReadinessPredictionMaxOrderByAggregateInput;
    _min?: Prisma.ReadinessPredictionMinOrderByAggregateInput;
    _sum?: Prisma.ReadinessPredictionSumOrderByAggregateInput;
};
export type ReadinessPredictionScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReadinessPredictionScalarWhereWithAggregatesInput | Prisma.ReadinessPredictionScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReadinessPredictionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReadinessPredictionScalarWhereWithAggregatesInput | Prisma.ReadinessPredictionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ReadinessPrediction"> | string;
    bookingId?: Prisma.UuidWithAggregatesFilter<"ReadinessPrediction"> | string;
    probability?: Prisma.IntWithAggregatesFilter<"ReadinessPrediction"> | number;
    riskLevel?: Prisma.StringWithAggregatesFilter<"ReadinessPrediction"> | string;
    computedAt?: Prisma.DateTimeWithAggregatesFilter<"ReadinessPrediction"> | Date | string;
};
export type ReadinessPredictionCreateInput = {
    id?: string;
    probability: number;
    riskLevel: string;
    computedAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutReadinessPredictionsInput;
};
export type ReadinessPredictionUncheckedCreateInput = {
    id?: string;
    bookingId: string;
    probability: number;
    riskLevel: string;
    computedAt?: Date | string;
};
export type ReadinessPredictionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    probability?: Prisma.IntFieldUpdateOperationsInput | number;
    riskLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutReadinessPredictionsNestedInput;
};
export type ReadinessPredictionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    probability?: Prisma.IntFieldUpdateOperationsInput | number;
    riskLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReadinessPredictionCreateManyInput = {
    id?: string;
    bookingId: string;
    probability: number;
    riskLevel: string;
    computedAt?: Date | string;
};
export type ReadinessPredictionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    probability?: Prisma.IntFieldUpdateOperationsInput | number;
    riskLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReadinessPredictionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    probability?: Prisma.IntFieldUpdateOperationsInput | number;
    riskLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReadinessPredictionListRelationFilter = {
    every?: Prisma.ReadinessPredictionWhereInput;
    some?: Prisma.ReadinessPredictionWhereInput;
    none?: Prisma.ReadinessPredictionWhereInput;
};
export type ReadinessPredictionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReadinessPredictionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    probability?: Prisma.SortOrder;
    riskLevel?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
};
export type ReadinessPredictionAvgOrderByAggregateInput = {
    probability?: Prisma.SortOrder;
};
export type ReadinessPredictionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    probability?: Prisma.SortOrder;
    riskLevel?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
};
export type ReadinessPredictionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    probability?: Prisma.SortOrder;
    riskLevel?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
};
export type ReadinessPredictionSumOrderByAggregateInput = {
    probability?: Prisma.SortOrder;
};
export type ReadinessPredictionCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.ReadinessPredictionCreateWithoutBookingInput, Prisma.ReadinessPredictionUncheckedCreateWithoutBookingInput> | Prisma.ReadinessPredictionCreateWithoutBookingInput[] | Prisma.ReadinessPredictionUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ReadinessPredictionCreateOrConnectWithoutBookingInput | Prisma.ReadinessPredictionCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.ReadinessPredictionCreateManyBookingInputEnvelope;
    connect?: Prisma.ReadinessPredictionWhereUniqueInput | Prisma.ReadinessPredictionWhereUniqueInput[];
};
export type ReadinessPredictionUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.ReadinessPredictionCreateWithoutBookingInput, Prisma.ReadinessPredictionUncheckedCreateWithoutBookingInput> | Prisma.ReadinessPredictionCreateWithoutBookingInput[] | Prisma.ReadinessPredictionUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ReadinessPredictionCreateOrConnectWithoutBookingInput | Prisma.ReadinessPredictionCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.ReadinessPredictionCreateManyBookingInputEnvelope;
    connect?: Prisma.ReadinessPredictionWhereUniqueInput | Prisma.ReadinessPredictionWhereUniqueInput[];
};
export type ReadinessPredictionUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.ReadinessPredictionCreateWithoutBookingInput, Prisma.ReadinessPredictionUncheckedCreateWithoutBookingInput> | Prisma.ReadinessPredictionCreateWithoutBookingInput[] | Prisma.ReadinessPredictionUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ReadinessPredictionCreateOrConnectWithoutBookingInput | Prisma.ReadinessPredictionCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.ReadinessPredictionUpsertWithWhereUniqueWithoutBookingInput | Prisma.ReadinessPredictionUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.ReadinessPredictionCreateManyBookingInputEnvelope;
    set?: Prisma.ReadinessPredictionWhereUniqueInput | Prisma.ReadinessPredictionWhereUniqueInput[];
    disconnect?: Prisma.ReadinessPredictionWhereUniqueInput | Prisma.ReadinessPredictionWhereUniqueInput[];
    delete?: Prisma.ReadinessPredictionWhereUniqueInput | Prisma.ReadinessPredictionWhereUniqueInput[];
    connect?: Prisma.ReadinessPredictionWhereUniqueInput | Prisma.ReadinessPredictionWhereUniqueInput[];
    update?: Prisma.ReadinessPredictionUpdateWithWhereUniqueWithoutBookingInput | Prisma.ReadinessPredictionUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.ReadinessPredictionUpdateManyWithWhereWithoutBookingInput | Prisma.ReadinessPredictionUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.ReadinessPredictionScalarWhereInput | Prisma.ReadinessPredictionScalarWhereInput[];
};
export type ReadinessPredictionUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.ReadinessPredictionCreateWithoutBookingInput, Prisma.ReadinessPredictionUncheckedCreateWithoutBookingInput> | Prisma.ReadinessPredictionCreateWithoutBookingInput[] | Prisma.ReadinessPredictionUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ReadinessPredictionCreateOrConnectWithoutBookingInput | Prisma.ReadinessPredictionCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.ReadinessPredictionUpsertWithWhereUniqueWithoutBookingInput | Prisma.ReadinessPredictionUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.ReadinessPredictionCreateManyBookingInputEnvelope;
    set?: Prisma.ReadinessPredictionWhereUniqueInput | Prisma.ReadinessPredictionWhereUniqueInput[];
    disconnect?: Prisma.ReadinessPredictionWhereUniqueInput | Prisma.ReadinessPredictionWhereUniqueInput[];
    delete?: Prisma.ReadinessPredictionWhereUniqueInput | Prisma.ReadinessPredictionWhereUniqueInput[];
    connect?: Prisma.ReadinessPredictionWhereUniqueInput | Prisma.ReadinessPredictionWhereUniqueInput[];
    update?: Prisma.ReadinessPredictionUpdateWithWhereUniqueWithoutBookingInput | Prisma.ReadinessPredictionUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.ReadinessPredictionUpdateManyWithWhereWithoutBookingInput | Prisma.ReadinessPredictionUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.ReadinessPredictionScalarWhereInput | Prisma.ReadinessPredictionScalarWhereInput[];
};
export type ReadinessPredictionCreateWithoutBookingInput = {
    id?: string;
    probability: number;
    riskLevel: string;
    computedAt?: Date | string;
};
export type ReadinessPredictionUncheckedCreateWithoutBookingInput = {
    id?: string;
    probability: number;
    riskLevel: string;
    computedAt?: Date | string;
};
export type ReadinessPredictionCreateOrConnectWithoutBookingInput = {
    where: Prisma.ReadinessPredictionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReadinessPredictionCreateWithoutBookingInput, Prisma.ReadinessPredictionUncheckedCreateWithoutBookingInput>;
};
export type ReadinessPredictionCreateManyBookingInputEnvelope = {
    data: Prisma.ReadinessPredictionCreateManyBookingInput | Prisma.ReadinessPredictionCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type ReadinessPredictionUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.ReadinessPredictionWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReadinessPredictionUpdateWithoutBookingInput, Prisma.ReadinessPredictionUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.ReadinessPredictionCreateWithoutBookingInput, Prisma.ReadinessPredictionUncheckedCreateWithoutBookingInput>;
};
export type ReadinessPredictionUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.ReadinessPredictionWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReadinessPredictionUpdateWithoutBookingInput, Prisma.ReadinessPredictionUncheckedUpdateWithoutBookingInput>;
};
export type ReadinessPredictionUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.ReadinessPredictionScalarWhereInput;
    data: Prisma.XOR<Prisma.ReadinessPredictionUpdateManyMutationInput, Prisma.ReadinessPredictionUncheckedUpdateManyWithoutBookingInput>;
};
export type ReadinessPredictionScalarWhereInput = {
    AND?: Prisma.ReadinessPredictionScalarWhereInput | Prisma.ReadinessPredictionScalarWhereInput[];
    OR?: Prisma.ReadinessPredictionScalarWhereInput[];
    NOT?: Prisma.ReadinessPredictionScalarWhereInput | Prisma.ReadinessPredictionScalarWhereInput[];
    id?: Prisma.UuidFilter<"ReadinessPrediction"> | string;
    bookingId?: Prisma.UuidFilter<"ReadinessPrediction"> | string;
    probability?: Prisma.IntFilter<"ReadinessPrediction"> | number;
    riskLevel?: Prisma.StringFilter<"ReadinessPrediction"> | string;
    computedAt?: Prisma.DateTimeFilter<"ReadinessPrediction"> | Date | string;
};
export type ReadinessPredictionCreateManyBookingInput = {
    id?: string;
    probability: number;
    riskLevel: string;
    computedAt?: Date | string;
};
export type ReadinessPredictionUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    probability?: Prisma.IntFieldUpdateOperationsInput | number;
    riskLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReadinessPredictionUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    probability?: Prisma.IntFieldUpdateOperationsInput | number;
    riskLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReadinessPredictionUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    probability?: Prisma.IntFieldUpdateOperationsInput | number;
    riskLevel?: Prisma.StringFieldUpdateOperationsInput | string;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReadinessPredictionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    probability?: boolean;
    riskLevel?: boolean;
    computedAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["readinessPrediction"]>;
export type ReadinessPredictionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    probability?: boolean;
    riskLevel?: boolean;
    computedAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["readinessPrediction"]>;
export type ReadinessPredictionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    probability?: boolean;
    riskLevel?: boolean;
    computedAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["readinessPrediction"]>;
export type ReadinessPredictionSelectScalar = {
    id?: boolean;
    bookingId?: boolean;
    probability?: boolean;
    riskLevel?: boolean;
    computedAt?: boolean;
};
export type ReadinessPredictionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bookingId" | "probability" | "riskLevel" | "computedAt", ExtArgs["result"]["readinessPrediction"]>;
export type ReadinessPredictionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
};
export type ReadinessPredictionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
};
export type ReadinessPredictionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
};
export type $ReadinessPredictionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ReadinessPrediction";
    objects: {
        booking: Prisma.$BookingPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bookingId: string;
        probability: number;
        riskLevel: string;
        computedAt: Date;
    }, ExtArgs["result"]["readinessPrediction"]>;
    composites: {};
};
export type ReadinessPredictionGetPayload<S extends boolean | null | undefined | ReadinessPredictionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReadinessPredictionPayload, S>;
export type ReadinessPredictionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReadinessPredictionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReadinessPredictionCountAggregateInputType | true;
};
export interface ReadinessPredictionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ReadinessPrediction'];
        meta: {
            name: 'ReadinessPrediction';
        };
    };
    findUnique<T extends ReadinessPredictionFindUniqueArgs>(args: Prisma.SelectSubset<T, ReadinessPredictionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReadinessPredictionClient<runtime.Types.Result.GetResult<Prisma.$ReadinessPredictionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReadinessPredictionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReadinessPredictionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReadinessPredictionClient<runtime.Types.Result.GetResult<Prisma.$ReadinessPredictionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReadinessPredictionFindFirstArgs>(args?: Prisma.SelectSubset<T, ReadinessPredictionFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReadinessPredictionClient<runtime.Types.Result.GetResult<Prisma.$ReadinessPredictionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReadinessPredictionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReadinessPredictionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReadinessPredictionClient<runtime.Types.Result.GetResult<Prisma.$ReadinessPredictionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReadinessPredictionFindManyArgs>(args?: Prisma.SelectSubset<T, ReadinessPredictionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReadinessPredictionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReadinessPredictionCreateArgs>(args: Prisma.SelectSubset<T, ReadinessPredictionCreateArgs<ExtArgs>>): Prisma.Prisma__ReadinessPredictionClient<runtime.Types.Result.GetResult<Prisma.$ReadinessPredictionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReadinessPredictionCreateManyArgs>(args?: Prisma.SelectSubset<T, ReadinessPredictionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReadinessPredictionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReadinessPredictionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReadinessPredictionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReadinessPredictionDeleteArgs>(args: Prisma.SelectSubset<T, ReadinessPredictionDeleteArgs<ExtArgs>>): Prisma.Prisma__ReadinessPredictionClient<runtime.Types.Result.GetResult<Prisma.$ReadinessPredictionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReadinessPredictionUpdateArgs>(args: Prisma.SelectSubset<T, ReadinessPredictionUpdateArgs<ExtArgs>>): Prisma.Prisma__ReadinessPredictionClient<runtime.Types.Result.GetResult<Prisma.$ReadinessPredictionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReadinessPredictionDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReadinessPredictionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReadinessPredictionUpdateManyArgs>(args: Prisma.SelectSubset<T, ReadinessPredictionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReadinessPredictionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReadinessPredictionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReadinessPredictionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReadinessPredictionUpsertArgs>(args: Prisma.SelectSubset<T, ReadinessPredictionUpsertArgs<ExtArgs>>): Prisma.Prisma__ReadinessPredictionClient<runtime.Types.Result.GetResult<Prisma.$ReadinessPredictionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReadinessPredictionCountArgs>(args?: Prisma.Subset<T, ReadinessPredictionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReadinessPredictionCountAggregateOutputType> : number>;
    aggregate<T extends ReadinessPredictionAggregateArgs>(args: Prisma.Subset<T, ReadinessPredictionAggregateArgs>): Prisma.PrismaPromise<GetReadinessPredictionAggregateType<T>>;
    groupBy<T extends ReadinessPredictionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReadinessPredictionGroupByArgs['orderBy'];
    } : {
        orderBy?: ReadinessPredictionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReadinessPredictionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReadinessPredictionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReadinessPredictionFieldRefs;
}
export interface Prisma__ReadinessPredictionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    booking<T extends Prisma.BookingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookingDefaultArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReadinessPredictionFieldRefs {
    readonly id: Prisma.FieldRef<"ReadinessPrediction", 'String'>;
    readonly bookingId: Prisma.FieldRef<"ReadinessPrediction", 'String'>;
    readonly probability: Prisma.FieldRef<"ReadinessPrediction", 'Int'>;
    readonly riskLevel: Prisma.FieldRef<"ReadinessPrediction", 'String'>;
    readonly computedAt: Prisma.FieldRef<"ReadinessPrediction", 'DateTime'>;
}
export type ReadinessPredictionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessPredictionSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessPredictionOmit<ExtArgs> | null;
    include?: Prisma.ReadinessPredictionInclude<ExtArgs> | null;
    where: Prisma.ReadinessPredictionWhereUniqueInput;
};
export type ReadinessPredictionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessPredictionSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessPredictionOmit<ExtArgs> | null;
    include?: Prisma.ReadinessPredictionInclude<ExtArgs> | null;
    where: Prisma.ReadinessPredictionWhereUniqueInput;
};
export type ReadinessPredictionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessPredictionSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessPredictionOmit<ExtArgs> | null;
    include?: Prisma.ReadinessPredictionInclude<ExtArgs> | null;
    where?: Prisma.ReadinessPredictionWhereInput;
    orderBy?: Prisma.ReadinessPredictionOrderByWithRelationInput | Prisma.ReadinessPredictionOrderByWithRelationInput[];
    cursor?: Prisma.ReadinessPredictionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReadinessPredictionScalarFieldEnum | Prisma.ReadinessPredictionScalarFieldEnum[];
};
export type ReadinessPredictionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessPredictionSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessPredictionOmit<ExtArgs> | null;
    include?: Prisma.ReadinessPredictionInclude<ExtArgs> | null;
    where?: Prisma.ReadinessPredictionWhereInput;
    orderBy?: Prisma.ReadinessPredictionOrderByWithRelationInput | Prisma.ReadinessPredictionOrderByWithRelationInput[];
    cursor?: Prisma.ReadinessPredictionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReadinessPredictionScalarFieldEnum | Prisma.ReadinessPredictionScalarFieldEnum[];
};
export type ReadinessPredictionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessPredictionSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessPredictionOmit<ExtArgs> | null;
    include?: Prisma.ReadinessPredictionInclude<ExtArgs> | null;
    where?: Prisma.ReadinessPredictionWhereInput;
    orderBy?: Prisma.ReadinessPredictionOrderByWithRelationInput | Prisma.ReadinessPredictionOrderByWithRelationInput[];
    cursor?: Prisma.ReadinessPredictionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReadinessPredictionScalarFieldEnum | Prisma.ReadinessPredictionScalarFieldEnum[];
};
export type ReadinessPredictionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessPredictionSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessPredictionOmit<ExtArgs> | null;
    include?: Prisma.ReadinessPredictionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReadinessPredictionCreateInput, Prisma.ReadinessPredictionUncheckedCreateInput>;
};
export type ReadinessPredictionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReadinessPredictionCreateManyInput | Prisma.ReadinessPredictionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReadinessPredictionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessPredictionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReadinessPredictionOmit<ExtArgs> | null;
    data: Prisma.ReadinessPredictionCreateManyInput | Prisma.ReadinessPredictionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReadinessPredictionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReadinessPredictionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessPredictionSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessPredictionOmit<ExtArgs> | null;
    include?: Prisma.ReadinessPredictionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReadinessPredictionUpdateInput, Prisma.ReadinessPredictionUncheckedUpdateInput>;
    where: Prisma.ReadinessPredictionWhereUniqueInput;
};
export type ReadinessPredictionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReadinessPredictionUpdateManyMutationInput, Prisma.ReadinessPredictionUncheckedUpdateManyInput>;
    where?: Prisma.ReadinessPredictionWhereInput;
    limit?: number;
};
export type ReadinessPredictionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessPredictionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReadinessPredictionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReadinessPredictionUpdateManyMutationInput, Prisma.ReadinessPredictionUncheckedUpdateManyInput>;
    where?: Prisma.ReadinessPredictionWhereInput;
    limit?: number;
    include?: Prisma.ReadinessPredictionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReadinessPredictionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessPredictionSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessPredictionOmit<ExtArgs> | null;
    include?: Prisma.ReadinessPredictionInclude<ExtArgs> | null;
    where: Prisma.ReadinessPredictionWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReadinessPredictionCreateInput, Prisma.ReadinessPredictionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReadinessPredictionUpdateInput, Prisma.ReadinessPredictionUncheckedUpdateInput>;
};
export type ReadinessPredictionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessPredictionSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessPredictionOmit<ExtArgs> | null;
    include?: Prisma.ReadinessPredictionInclude<ExtArgs> | null;
    where: Prisma.ReadinessPredictionWhereUniqueInput;
};
export type ReadinessPredictionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReadinessPredictionWhereInput;
    limit?: number;
};
export type ReadinessPredictionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessPredictionSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessPredictionOmit<ExtArgs> | null;
    include?: Prisma.ReadinessPredictionInclude<ExtArgs> | null;
};
export {};
