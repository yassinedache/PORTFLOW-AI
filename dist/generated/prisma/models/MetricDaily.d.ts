import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MetricDailyModel = runtime.Types.Result.DefaultSelection<Prisma.$MetricDailyPayload>;
export type AggregateMetricDaily = {
    _count: MetricDailyCountAggregateOutputType | null;
    _avg: MetricDailyAvgAggregateOutputType | null;
    _sum: MetricDailySumAggregateOutputType | null;
    _min: MetricDailyMinAggregateOutputType | null;
    _max: MetricDailyMaxAggregateOutputType | null;
};
export type MetricDailyAvgAggregateOutputType = {
    avgWaitingTime: number | null;
    totalBookings: number | null;
    revenue: number | null;
};
export type MetricDailySumAggregateOutputType = {
    avgWaitingTime: number | null;
    totalBookings: number | null;
    revenue: number | null;
};
export type MetricDailyMinAggregateOutputType = {
    id: string | null;
    date: Date | null;
    terminalId: string | null;
    avgWaitingTime: number | null;
    totalBookings: number | null;
    revenue: number | null;
};
export type MetricDailyMaxAggregateOutputType = {
    id: string | null;
    date: Date | null;
    terminalId: string | null;
    avgWaitingTime: number | null;
    totalBookings: number | null;
    revenue: number | null;
};
export type MetricDailyCountAggregateOutputType = {
    id: number;
    date: number;
    terminalId: number;
    avgWaitingTime: number;
    totalBookings: number;
    revenue: number;
    _all: number;
};
export type MetricDailyAvgAggregateInputType = {
    avgWaitingTime?: true;
    totalBookings?: true;
    revenue?: true;
};
export type MetricDailySumAggregateInputType = {
    avgWaitingTime?: true;
    totalBookings?: true;
    revenue?: true;
};
export type MetricDailyMinAggregateInputType = {
    id?: true;
    date?: true;
    terminalId?: true;
    avgWaitingTime?: true;
    totalBookings?: true;
    revenue?: true;
};
export type MetricDailyMaxAggregateInputType = {
    id?: true;
    date?: true;
    terminalId?: true;
    avgWaitingTime?: true;
    totalBookings?: true;
    revenue?: true;
};
export type MetricDailyCountAggregateInputType = {
    id?: true;
    date?: true;
    terminalId?: true;
    avgWaitingTime?: true;
    totalBookings?: true;
    revenue?: true;
    _all?: true;
};
export type MetricDailyAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MetricDailyWhereInput;
    orderBy?: Prisma.MetricDailyOrderByWithRelationInput | Prisma.MetricDailyOrderByWithRelationInput[];
    cursor?: Prisma.MetricDailyWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MetricDailyCountAggregateInputType;
    _avg?: MetricDailyAvgAggregateInputType;
    _sum?: MetricDailySumAggregateInputType;
    _min?: MetricDailyMinAggregateInputType;
    _max?: MetricDailyMaxAggregateInputType;
};
export type GetMetricDailyAggregateType<T extends MetricDailyAggregateArgs> = {
    [P in keyof T & keyof AggregateMetricDaily]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMetricDaily[P]> : Prisma.GetScalarType<T[P], AggregateMetricDaily[P]>;
};
export type MetricDailyGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MetricDailyWhereInput;
    orderBy?: Prisma.MetricDailyOrderByWithAggregationInput | Prisma.MetricDailyOrderByWithAggregationInput[];
    by: Prisma.MetricDailyScalarFieldEnum[] | Prisma.MetricDailyScalarFieldEnum;
    having?: Prisma.MetricDailyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MetricDailyCountAggregateInputType | true;
    _avg?: MetricDailyAvgAggregateInputType;
    _sum?: MetricDailySumAggregateInputType;
    _min?: MetricDailyMinAggregateInputType;
    _max?: MetricDailyMaxAggregateInputType;
};
export type MetricDailyGroupByOutputType = {
    id: string;
    date: Date;
    terminalId: string;
    avgWaitingTime: number;
    totalBookings: number;
    revenue: number;
    _count: MetricDailyCountAggregateOutputType | null;
    _avg: MetricDailyAvgAggregateOutputType | null;
    _sum: MetricDailySumAggregateOutputType | null;
    _min: MetricDailyMinAggregateOutputType | null;
    _max: MetricDailyMaxAggregateOutputType | null;
};
type GetMetricDailyGroupByPayload<T extends MetricDailyGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MetricDailyGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MetricDailyGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MetricDailyGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MetricDailyGroupByOutputType[P]>;
}>>;
export type MetricDailyWhereInput = {
    AND?: Prisma.MetricDailyWhereInput | Prisma.MetricDailyWhereInput[];
    OR?: Prisma.MetricDailyWhereInput[];
    NOT?: Prisma.MetricDailyWhereInput | Prisma.MetricDailyWhereInput[];
    id?: Prisma.UuidFilter<"MetricDaily"> | string;
    date?: Prisma.DateTimeFilter<"MetricDaily"> | Date | string;
    terminalId?: Prisma.UuidFilter<"MetricDaily"> | string;
    avgWaitingTime?: Prisma.FloatFilter<"MetricDaily"> | number;
    totalBookings?: Prisma.IntFilter<"MetricDaily"> | number;
    revenue?: Prisma.FloatFilter<"MetricDaily"> | number;
    terminal?: Prisma.XOR<Prisma.TerminalScalarRelationFilter, Prisma.TerminalWhereInput>;
};
export type MetricDailyOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    avgWaitingTime?: Prisma.SortOrder;
    totalBookings?: Prisma.SortOrder;
    revenue?: Prisma.SortOrder;
    terminal?: Prisma.TerminalOrderByWithRelationInput;
};
export type MetricDailyWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    date_terminalId?: Prisma.MetricDailyDateTerminalIdCompoundUniqueInput;
    AND?: Prisma.MetricDailyWhereInput | Prisma.MetricDailyWhereInput[];
    OR?: Prisma.MetricDailyWhereInput[];
    NOT?: Prisma.MetricDailyWhereInput | Prisma.MetricDailyWhereInput[];
    date?: Prisma.DateTimeFilter<"MetricDaily"> | Date | string;
    terminalId?: Prisma.UuidFilter<"MetricDaily"> | string;
    avgWaitingTime?: Prisma.FloatFilter<"MetricDaily"> | number;
    totalBookings?: Prisma.IntFilter<"MetricDaily"> | number;
    revenue?: Prisma.FloatFilter<"MetricDaily"> | number;
    terminal?: Prisma.XOR<Prisma.TerminalScalarRelationFilter, Prisma.TerminalWhereInput>;
}, "id" | "date_terminalId">;
export type MetricDailyOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    avgWaitingTime?: Prisma.SortOrder;
    totalBookings?: Prisma.SortOrder;
    revenue?: Prisma.SortOrder;
    _count?: Prisma.MetricDailyCountOrderByAggregateInput;
    _avg?: Prisma.MetricDailyAvgOrderByAggregateInput;
    _max?: Prisma.MetricDailyMaxOrderByAggregateInput;
    _min?: Prisma.MetricDailyMinOrderByAggregateInput;
    _sum?: Prisma.MetricDailySumOrderByAggregateInput;
};
export type MetricDailyScalarWhereWithAggregatesInput = {
    AND?: Prisma.MetricDailyScalarWhereWithAggregatesInput | Prisma.MetricDailyScalarWhereWithAggregatesInput[];
    OR?: Prisma.MetricDailyScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MetricDailyScalarWhereWithAggregatesInput | Prisma.MetricDailyScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"MetricDaily"> | string;
    date?: Prisma.DateTimeWithAggregatesFilter<"MetricDaily"> | Date | string;
    terminalId?: Prisma.UuidWithAggregatesFilter<"MetricDaily"> | string;
    avgWaitingTime?: Prisma.FloatWithAggregatesFilter<"MetricDaily"> | number;
    totalBookings?: Prisma.IntWithAggregatesFilter<"MetricDaily"> | number;
    revenue?: Prisma.FloatWithAggregatesFilter<"MetricDaily"> | number;
};
export type MetricDailyCreateInput = {
    id?: string;
    date: Date | string;
    avgWaitingTime?: number;
    totalBookings?: number;
    revenue?: number;
    terminal: Prisma.TerminalCreateNestedOneWithoutMetricsInput;
};
export type MetricDailyUncheckedCreateInput = {
    id?: string;
    date: Date | string;
    terminalId: string;
    avgWaitingTime?: number;
    totalBookings?: number;
    revenue?: number;
};
export type MetricDailyUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    avgWaitingTime?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalBookings?: Prisma.IntFieldUpdateOperationsInput | number;
    revenue?: Prisma.FloatFieldUpdateOperationsInput | number;
    terminal?: Prisma.TerminalUpdateOneRequiredWithoutMetricsNestedInput;
};
export type MetricDailyUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    avgWaitingTime?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalBookings?: Prisma.IntFieldUpdateOperationsInput | number;
    revenue?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type MetricDailyCreateManyInput = {
    id?: string;
    date: Date | string;
    terminalId: string;
    avgWaitingTime?: number;
    totalBookings?: number;
    revenue?: number;
};
export type MetricDailyUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    avgWaitingTime?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalBookings?: Prisma.IntFieldUpdateOperationsInput | number;
    revenue?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type MetricDailyUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    avgWaitingTime?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalBookings?: Prisma.IntFieldUpdateOperationsInput | number;
    revenue?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type MetricDailyListRelationFilter = {
    every?: Prisma.MetricDailyWhereInput;
    some?: Prisma.MetricDailyWhereInput;
    none?: Prisma.MetricDailyWhereInput;
};
export type MetricDailyOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MetricDailyDateTerminalIdCompoundUniqueInput = {
    date: Date | string;
    terminalId: string;
};
export type MetricDailyCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    avgWaitingTime?: Prisma.SortOrder;
    totalBookings?: Prisma.SortOrder;
    revenue?: Prisma.SortOrder;
};
export type MetricDailyAvgOrderByAggregateInput = {
    avgWaitingTime?: Prisma.SortOrder;
    totalBookings?: Prisma.SortOrder;
    revenue?: Prisma.SortOrder;
};
export type MetricDailyMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    avgWaitingTime?: Prisma.SortOrder;
    totalBookings?: Prisma.SortOrder;
    revenue?: Prisma.SortOrder;
};
export type MetricDailyMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    date?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    avgWaitingTime?: Prisma.SortOrder;
    totalBookings?: Prisma.SortOrder;
    revenue?: Prisma.SortOrder;
};
export type MetricDailySumOrderByAggregateInput = {
    avgWaitingTime?: Prisma.SortOrder;
    totalBookings?: Prisma.SortOrder;
    revenue?: Prisma.SortOrder;
};
export type MetricDailyCreateNestedManyWithoutTerminalInput = {
    create?: Prisma.XOR<Prisma.MetricDailyCreateWithoutTerminalInput, Prisma.MetricDailyUncheckedCreateWithoutTerminalInput> | Prisma.MetricDailyCreateWithoutTerminalInput[] | Prisma.MetricDailyUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.MetricDailyCreateOrConnectWithoutTerminalInput | Prisma.MetricDailyCreateOrConnectWithoutTerminalInput[];
    createMany?: Prisma.MetricDailyCreateManyTerminalInputEnvelope;
    connect?: Prisma.MetricDailyWhereUniqueInput | Prisma.MetricDailyWhereUniqueInput[];
};
export type MetricDailyUncheckedCreateNestedManyWithoutTerminalInput = {
    create?: Prisma.XOR<Prisma.MetricDailyCreateWithoutTerminalInput, Prisma.MetricDailyUncheckedCreateWithoutTerminalInput> | Prisma.MetricDailyCreateWithoutTerminalInput[] | Prisma.MetricDailyUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.MetricDailyCreateOrConnectWithoutTerminalInput | Prisma.MetricDailyCreateOrConnectWithoutTerminalInput[];
    createMany?: Prisma.MetricDailyCreateManyTerminalInputEnvelope;
    connect?: Prisma.MetricDailyWhereUniqueInput | Prisma.MetricDailyWhereUniqueInput[];
};
export type MetricDailyUpdateManyWithoutTerminalNestedInput = {
    create?: Prisma.XOR<Prisma.MetricDailyCreateWithoutTerminalInput, Prisma.MetricDailyUncheckedCreateWithoutTerminalInput> | Prisma.MetricDailyCreateWithoutTerminalInput[] | Prisma.MetricDailyUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.MetricDailyCreateOrConnectWithoutTerminalInput | Prisma.MetricDailyCreateOrConnectWithoutTerminalInput[];
    upsert?: Prisma.MetricDailyUpsertWithWhereUniqueWithoutTerminalInput | Prisma.MetricDailyUpsertWithWhereUniqueWithoutTerminalInput[];
    createMany?: Prisma.MetricDailyCreateManyTerminalInputEnvelope;
    set?: Prisma.MetricDailyWhereUniqueInput | Prisma.MetricDailyWhereUniqueInput[];
    disconnect?: Prisma.MetricDailyWhereUniqueInput | Prisma.MetricDailyWhereUniqueInput[];
    delete?: Prisma.MetricDailyWhereUniqueInput | Prisma.MetricDailyWhereUniqueInput[];
    connect?: Prisma.MetricDailyWhereUniqueInput | Prisma.MetricDailyWhereUniqueInput[];
    update?: Prisma.MetricDailyUpdateWithWhereUniqueWithoutTerminalInput | Prisma.MetricDailyUpdateWithWhereUniqueWithoutTerminalInput[];
    updateMany?: Prisma.MetricDailyUpdateManyWithWhereWithoutTerminalInput | Prisma.MetricDailyUpdateManyWithWhereWithoutTerminalInput[];
    deleteMany?: Prisma.MetricDailyScalarWhereInput | Prisma.MetricDailyScalarWhereInput[];
};
export type MetricDailyUncheckedUpdateManyWithoutTerminalNestedInput = {
    create?: Prisma.XOR<Prisma.MetricDailyCreateWithoutTerminalInput, Prisma.MetricDailyUncheckedCreateWithoutTerminalInput> | Prisma.MetricDailyCreateWithoutTerminalInput[] | Prisma.MetricDailyUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.MetricDailyCreateOrConnectWithoutTerminalInput | Prisma.MetricDailyCreateOrConnectWithoutTerminalInput[];
    upsert?: Prisma.MetricDailyUpsertWithWhereUniqueWithoutTerminalInput | Prisma.MetricDailyUpsertWithWhereUniqueWithoutTerminalInput[];
    createMany?: Prisma.MetricDailyCreateManyTerminalInputEnvelope;
    set?: Prisma.MetricDailyWhereUniqueInput | Prisma.MetricDailyWhereUniqueInput[];
    disconnect?: Prisma.MetricDailyWhereUniqueInput | Prisma.MetricDailyWhereUniqueInput[];
    delete?: Prisma.MetricDailyWhereUniqueInput | Prisma.MetricDailyWhereUniqueInput[];
    connect?: Prisma.MetricDailyWhereUniqueInput | Prisma.MetricDailyWhereUniqueInput[];
    update?: Prisma.MetricDailyUpdateWithWhereUniqueWithoutTerminalInput | Prisma.MetricDailyUpdateWithWhereUniqueWithoutTerminalInput[];
    updateMany?: Prisma.MetricDailyUpdateManyWithWhereWithoutTerminalInput | Prisma.MetricDailyUpdateManyWithWhereWithoutTerminalInput[];
    deleteMany?: Prisma.MetricDailyScalarWhereInput | Prisma.MetricDailyScalarWhereInput[];
};
export type MetricDailyCreateWithoutTerminalInput = {
    id?: string;
    date: Date | string;
    avgWaitingTime?: number;
    totalBookings?: number;
    revenue?: number;
};
export type MetricDailyUncheckedCreateWithoutTerminalInput = {
    id?: string;
    date: Date | string;
    avgWaitingTime?: number;
    totalBookings?: number;
    revenue?: number;
};
export type MetricDailyCreateOrConnectWithoutTerminalInput = {
    where: Prisma.MetricDailyWhereUniqueInput;
    create: Prisma.XOR<Prisma.MetricDailyCreateWithoutTerminalInput, Prisma.MetricDailyUncheckedCreateWithoutTerminalInput>;
};
export type MetricDailyCreateManyTerminalInputEnvelope = {
    data: Prisma.MetricDailyCreateManyTerminalInput | Prisma.MetricDailyCreateManyTerminalInput[];
    skipDuplicates?: boolean;
};
export type MetricDailyUpsertWithWhereUniqueWithoutTerminalInput = {
    where: Prisma.MetricDailyWhereUniqueInput;
    update: Prisma.XOR<Prisma.MetricDailyUpdateWithoutTerminalInput, Prisma.MetricDailyUncheckedUpdateWithoutTerminalInput>;
    create: Prisma.XOR<Prisma.MetricDailyCreateWithoutTerminalInput, Prisma.MetricDailyUncheckedCreateWithoutTerminalInput>;
};
export type MetricDailyUpdateWithWhereUniqueWithoutTerminalInput = {
    where: Prisma.MetricDailyWhereUniqueInput;
    data: Prisma.XOR<Prisma.MetricDailyUpdateWithoutTerminalInput, Prisma.MetricDailyUncheckedUpdateWithoutTerminalInput>;
};
export type MetricDailyUpdateManyWithWhereWithoutTerminalInput = {
    where: Prisma.MetricDailyScalarWhereInput;
    data: Prisma.XOR<Prisma.MetricDailyUpdateManyMutationInput, Prisma.MetricDailyUncheckedUpdateManyWithoutTerminalInput>;
};
export type MetricDailyScalarWhereInput = {
    AND?: Prisma.MetricDailyScalarWhereInput | Prisma.MetricDailyScalarWhereInput[];
    OR?: Prisma.MetricDailyScalarWhereInput[];
    NOT?: Prisma.MetricDailyScalarWhereInput | Prisma.MetricDailyScalarWhereInput[];
    id?: Prisma.UuidFilter<"MetricDaily"> | string;
    date?: Prisma.DateTimeFilter<"MetricDaily"> | Date | string;
    terminalId?: Prisma.UuidFilter<"MetricDaily"> | string;
    avgWaitingTime?: Prisma.FloatFilter<"MetricDaily"> | number;
    totalBookings?: Prisma.IntFilter<"MetricDaily"> | number;
    revenue?: Prisma.FloatFilter<"MetricDaily"> | number;
};
export type MetricDailyCreateManyTerminalInput = {
    id?: string;
    date: Date | string;
    avgWaitingTime?: number;
    totalBookings?: number;
    revenue?: number;
};
export type MetricDailyUpdateWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    avgWaitingTime?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalBookings?: Prisma.IntFieldUpdateOperationsInput | number;
    revenue?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type MetricDailyUncheckedUpdateWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    avgWaitingTime?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalBookings?: Prisma.IntFieldUpdateOperationsInput | number;
    revenue?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type MetricDailyUncheckedUpdateManyWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    date?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    avgWaitingTime?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalBookings?: Prisma.IntFieldUpdateOperationsInput | number;
    revenue?: Prisma.FloatFieldUpdateOperationsInput | number;
};
export type MetricDailySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    date?: boolean;
    terminalId?: boolean;
    avgWaitingTime?: boolean;
    totalBookings?: boolean;
    revenue?: boolean;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["metricDaily"]>;
export type MetricDailySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    date?: boolean;
    terminalId?: boolean;
    avgWaitingTime?: boolean;
    totalBookings?: boolean;
    revenue?: boolean;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["metricDaily"]>;
export type MetricDailySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    date?: boolean;
    terminalId?: boolean;
    avgWaitingTime?: boolean;
    totalBookings?: boolean;
    revenue?: boolean;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["metricDaily"]>;
export type MetricDailySelectScalar = {
    id?: boolean;
    date?: boolean;
    terminalId?: boolean;
    avgWaitingTime?: boolean;
    totalBookings?: boolean;
    revenue?: boolean;
};
export type MetricDailyOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "date" | "terminalId" | "avgWaitingTime" | "totalBookings" | "revenue", ExtArgs["result"]["metricDaily"]>;
export type MetricDailyInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
};
export type MetricDailyIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
};
export type MetricDailyIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
};
export type $MetricDailyPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MetricDaily";
    objects: {
        terminal: Prisma.$TerminalPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        date: Date;
        terminalId: string;
        avgWaitingTime: number;
        totalBookings: number;
        revenue: number;
    }, ExtArgs["result"]["metricDaily"]>;
    composites: {};
};
export type MetricDailyGetPayload<S extends boolean | null | undefined | MetricDailyDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload, S>;
export type MetricDailyCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MetricDailyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MetricDailyCountAggregateInputType | true;
};
export interface MetricDailyDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MetricDaily'];
        meta: {
            name: 'MetricDaily';
        };
    };
    findUnique<T extends MetricDailyFindUniqueArgs>(args: Prisma.SelectSubset<T, MetricDailyFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MetricDailyClient<runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MetricDailyFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MetricDailyFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MetricDailyClient<runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MetricDailyFindFirstArgs>(args?: Prisma.SelectSubset<T, MetricDailyFindFirstArgs<ExtArgs>>): Prisma.Prisma__MetricDailyClient<runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MetricDailyFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MetricDailyFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MetricDailyClient<runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MetricDailyFindManyArgs>(args?: Prisma.SelectSubset<T, MetricDailyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MetricDailyCreateArgs>(args: Prisma.SelectSubset<T, MetricDailyCreateArgs<ExtArgs>>): Prisma.Prisma__MetricDailyClient<runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MetricDailyCreateManyArgs>(args?: Prisma.SelectSubset<T, MetricDailyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MetricDailyCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MetricDailyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MetricDailyDeleteArgs>(args: Prisma.SelectSubset<T, MetricDailyDeleteArgs<ExtArgs>>): Prisma.Prisma__MetricDailyClient<runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MetricDailyUpdateArgs>(args: Prisma.SelectSubset<T, MetricDailyUpdateArgs<ExtArgs>>): Prisma.Prisma__MetricDailyClient<runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MetricDailyDeleteManyArgs>(args?: Prisma.SelectSubset<T, MetricDailyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MetricDailyUpdateManyArgs>(args: Prisma.SelectSubset<T, MetricDailyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MetricDailyUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MetricDailyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MetricDailyUpsertArgs>(args: Prisma.SelectSubset<T, MetricDailyUpsertArgs<ExtArgs>>): Prisma.Prisma__MetricDailyClient<runtime.Types.Result.GetResult<Prisma.$MetricDailyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MetricDailyCountArgs>(args?: Prisma.Subset<T, MetricDailyCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MetricDailyCountAggregateOutputType> : number>;
    aggregate<T extends MetricDailyAggregateArgs>(args: Prisma.Subset<T, MetricDailyAggregateArgs>): Prisma.PrismaPromise<GetMetricDailyAggregateType<T>>;
    groupBy<T extends MetricDailyGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MetricDailyGroupByArgs['orderBy'];
    } : {
        orderBy?: MetricDailyGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MetricDailyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMetricDailyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MetricDailyFieldRefs;
}
export interface Prisma__MetricDailyClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    terminal<T extends Prisma.TerminalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TerminalDefaultArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MetricDailyFieldRefs {
    readonly id: Prisma.FieldRef<"MetricDaily", 'String'>;
    readonly date: Prisma.FieldRef<"MetricDaily", 'DateTime'>;
    readonly terminalId: Prisma.FieldRef<"MetricDaily", 'String'>;
    readonly avgWaitingTime: Prisma.FieldRef<"MetricDaily", 'Float'>;
    readonly totalBookings: Prisma.FieldRef<"MetricDaily", 'Int'>;
    readonly revenue: Prisma.FieldRef<"MetricDaily", 'Float'>;
}
export type MetricDailyFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MetricDailySelect<ExtArgs> | null;
    omit?: Prisma.MetricDailyOmit<ExtArgs> | null;
    include?: Prisma.MetricDailyInclude<ExtArgs> | null;
    where: Prisma.MetricDailyWhereUniqueInput;
};
export type MetricDailyFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MetricDailySelect<ExtArgs> | null;
    omit?: Prisma.MetricDailyOmit<ExtArgs> | null;
    include?: Prisma.MetricDailyInclude<ExtArgs> | null;
    where: Prisma.MetricDailyWhereUniqueInput;
};
export type MetricDailyFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MetricDailyFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MetricDailyFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MetricDailyCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MetricDailySelect<ExtArgs> | null;
    omit?: Prisma.MetricDailyOmit<ExtArgs> | null;
    include?: Prisma.MetricDailyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MetricDailyCreateInput, Prisma.MetricDailyUncheckedCreateInput>;
};
export type MetricDailyCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MetricDailyCreateManyInput | Prisma.MetricDailyCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MetricDailyCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MetricDailySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MetricDailyOmit<ExtArgs> | null;
    data: Prisma.MetricDailyCreateManyInput | Prisma.MetricDailyCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MetricDailyIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MetricDailyUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MetricDailySelect<ExtArgs> | null;
    omit?: Prisma.MetricDailyOmit<ExtArgs> | null;
    include?: Prisma.MetricDailyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MetricDailyUpdateInput, Prisma.MetricDailyUncheckedUpdateInput>;
    where: Prisma.MetricDailyWhereUniqueInput;
};
export type MetricDailyUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MetricDailyUpdateManyMutationInput, Prisma.MetricDailyUncheckedUpdateManyInput>;
    where?: Prisma.MetricDailyWhereInput;
    limit?: number;
};
export type MetricDailyUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MetricDailySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MetricDailyOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MetricDailyUpdateManyMutationInput, Prisma.MetricDailyUncheckedUpdateManyInput>;
    where?: Prisma.MetricDailyWhereInput;
    limit?: number;
    include?: Prisma.MetricDailyIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MetricDailyUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MetricDailySelect<ExtArgs> | null;
    omit?: Prisma.MetricDailyOmit<ExtArgs> | null;
    include?: Prisma.MetricDailyInclude<ExtArgs> | null;
    where: Prisma.MetricDailyWhereUniqueInput;
    create: Prisma.XOR<Prisma.MetricDailyCreateInput, Prisma.MetricDailyUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MetricDailyUpdateInput, Prisma.MetricDailyUncheckedUpdateInput>;
};
export type MetricDailyDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MetricDailySelect<ExtArgs> | null;
    omit?: Prisma.MetricDailyOmit<ExtArgs> | null;
    include?: Prisma.MetricDailyInclude<ExtArgs> | null;
    where: Prisma.MetricDailyWhereUniqueInput;
};
export type MetricDailyDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MetricDailyWhereInput;
    limit?: number;
};
export type MetricDailyDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MetricDailySelect<ExtArgs> | null;
    omit?: Prisma.MetricDailyOmit<ExtArgs> | null;
    include?: Prisma.MetricDailyInclude<ExtArgs> | null;
};
export {};
