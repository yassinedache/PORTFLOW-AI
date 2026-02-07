import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type GateModel = runtime.Types.Result.DefaultSelection<Prisma.$GatePayload>;
export type AggregateGate = {
    _count: GateCountAggregateOutputType | null;
    _min: GateMinAggregateOutputType | null;
    _max: GateMaxAggregateOutputType | null;
};
export type GateMinAggregateOutputType = {
    id: string | null;
    terminalId: string | null;
    name: string | null;
    isActive: boolean | null;
};
export type GateMaxAggregateOutputType = {
    id: string | null;
    terminalId: string | null;
    name: string | null;
    isActive: boolean | null;
};
export type GateCountAggregateOutputType = {
    id: number;
    terminalId: number;
    name: number;
    isActive: number;
    _all: number;
};
export type GateMinAggregateInputType = {
    id?: true;
    terminalId?: true;
    name?: true;
    isActive?: true;
};
export type GateMaxAggregateInputType = {
    id?: true;
    terminalId?: true;
    name?: true;
    isActive?: true;
};
export type GateCountAggregateInputType = {
    id?: true;
    terminalId?: true;
    name?: true;
    isActive?: true;
    _all?: true;
};
export type GateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GateWhereInput;
    orderBy?: Prisma.GateOrderByWithRelationInput | Prisma.GateOrderByWithRelationInput[];
    cursor?: Prisma.GateWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | GateCountAggregateInputType;
    _min?: GateMinAggregateInputType;
    _max?: GateMaxAggregateInputType;
};
export type GetGateAggregateType<T extends GateAggregateArgs> = {
    [P in keyof T & keyof AggregateGate]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGate[P]> : Prisma.GetScalarType<T[P], AggregateGate[P]>;
};
export type GateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GateWhereInput;
    orderBy?: Prisma.GateOrderByWithAggregationInput | Prisma.GateOrderByWithAggregationInput[];
    by: Prisma.GateScalarFieldEnum[] | Prisma.GateScalarFieldEnum;
    having?: Prisma.GateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GateCountAggregateInputType | true;
    _min?: GateMinAggregateInputType;
    _max?: GateMaxAggregateInputType;
};
export type GateGroupByOutputType = {
    id: string;
    terminalId: string;
    name: string;
    isActive: boolean;
    _count: GateCountAggregateOutputType | null;
    _min: GateMinAggregateOutputType | null;
    _max: GateMaxAggregateOutputType | null;
};
type GetGateGroupByPayload<T extends GateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GateGroupByOutputType[P]>;
}>>;
export type GateWhereInput = {
    AND?: Prisma.GateWhereInput | Prisma.GateWhereInput[];
    OR?: Prisma.GateWhereInput[];
    NOT?: Prisma.GateWhereInput | Prisma.GateWhereInput[];
    id?: Prisma.UuidFilter<"Gate"> | string;
    terminalId?: Prisma.UuidFilter<"Gate"> | string;
    name?: Prisma.StringFilter<"Gate"> | string;
    isActive?: Prisma.BoolFilter<"Gate"> | boolean;
    terminal?: Prisma.XOR<Prisma.TerminalScalarRelationFilter, Prisma.TerminalWhereInput>;
    gateAccessLogs?: Prisma.GateAccessLogListRelationFilter;
};
export type GateOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    terminal?: Prisma.TerminalOrderByWithRelationInput;
    gateAccessLogs?: Prisma.GateAccessLogOrderByRelationAggregateInput;
};
export type GateWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.GateWhereInput | Prisma.GateWhereInput[];
    OR?: Prisma.GateWhereInput[];
    NOT?: Prisma.GateWhereInput | Prisma.GateWhereInput[];
    terminalId?: Prisma.UuidFilter<"Gate"> | string;
    name?: Prisma.StringFilter<"Gate"> | string;
    isActive?: Prisma.BoolFilter<"Gate"> | boolean;
    terminal?: Prisma.XOR<Prisma.TerminalScalarRelationFilter, Prisma.TerminalWhereInput>;
    gateAccessLogs?: Prisma.GateAccessLogListRelationFilter;
}, "id">;
export type GateOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    _count?: Prisma.GateCountOrderByAggregateInput;
    _max?: Prisma.GateMaxOrderByAggregateInput;
    _min?: Prisma.GateMinOrderByAggregateInput;
};
export type GateScalarWhereWithAggregatesInput = {
    AND?: Prisma.GateScalarWhereWithAggregatesInput | Prisma.GateScalarWhereWithAggregatesInput[];
    OR?: Prisma.GateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.GateScalarWhereWithAggregatesInput | Prisma.GateScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Gate"> | string;
    terminalId?: Prisma.UuidWithAggregatesFilter<"Gate"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Gate"> | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"Gate"> | boolean;
};
export type GateCreateInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    terminal: Prisma.TerminalCreateNestedOneWithoutGatesInput;
    gateAccessLogs?: Prisma.GateAccessLogCreateNestedManyWithoutGateInput;
};
export type GateUncheckedCreateInput = {
    id?: string;
    terminalId: string;
    name: string;
    isActive?: boolean;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedCreateNestedManyWithoutGateInput;
};
export type GateUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    terminal?: Prisma.TerminalUpdateOneRequiredWithoutGatesNestedInput;
    gateAccessLogs?: Prisma.GateAccessLogUpdateManyWithoutGateNestedInput;
};
export type GateUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedUpdateManyWithoutGateNestedInput;
};
export type GateCreateManyInput = {
    id?: string;
    terminalId: string;
    name: string;
    isActive?: boolean;
};
export type GateUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type GateUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type GateListRelationFilter = {
    every?: Prisma.GateWhereInput;
    some?: Prisma.GateWhereInput;
    none?: Prisma.GateWhereInput;
};
export type GateOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type GateCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type GateMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type GateMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
};
export type GateScalarRelationFilter = {
    is?: Prisma.GateWhereInput;
    isNot?: Prisma.GateWhereInput;
};
export type GateCreateNestedManyWithoutTerminalInput = {
    create?: Prisma.XOR<Prisma.GateCreateWithoutTerminalInput, Prisma.GateUncheckedCreateWithoutTerminalInput> | Prisma.GateCreateWithoutTerminalInput[] | Prisma.GateUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.GateCreateOrConnectWithoutTerminalInput | Prisma.GateCreateOrConnectWithoutTerminalInput[];
    createMany?: Prisma.GateCreateManyTerminalInputEnvelope;
    connect?: Prisma.GateWhereUniqueInput | Prisma.GateWhereUniqueInput[];
};
export type GateUncheckedCreateNestedManyWithoutTerminalInput = {
    create?: Prisma.XOR<Prisma.GateCreateWithoutTerminalInput, Prisma.GateUncheckedCreateWithoutTerminalInput> | Prisma.GateCreateWithoutTerminalInput[] | Prisma.GateUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.GateCreateOrConnectWithoutTerminalInput | Prisma.GateCreateOrConnectWithoutTerminalInput[];
    createMany?: Prisma.GateCreateManyTerminalInputEnvelope;
    connect?: Prisma.GateWhereUniqueInput | Prisma.GateWhereUniqueInput[];
};
export type GateUpdateManyWithoutTerminalNestedInput = {
    create?: Prisma.XOR<Prisma.GateCreateWithoutTerminalInput, Prisma.GateUncheckedCreateWithoutTerminalInput> | Prisma.GateCreateWithoutTerminalInput[] | Prisma.GateUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.GateCreateOrConnectWithoutTerminalInput | Prisma.GateCreateOrConnectWithoutTerminalInput[];
    upsert?: Prisma.GateUpsertWithWhereUniqueWithoutTerminalInput | Prisma.GateUpsertWithWhereUniqueWithoutTerminalInput[];
    createMany?: Prisma.GateCreateManyTerminalInputEnvelope;
    set?: Prisma.GateWhereUniqueInput | Prisma.GateWhereUniqueInput[];
    disconnect?: Prisma.GateWhereUniqueInput | Prisma.GateWhereUniqueInput[];
    delete?: Prisma.GateWhereUniqueInput | Prisma.GateWhereUniqueInput[];
    connect?: Prisma.GateWhereUniqueInput | Prisma.GateWhereUniqueInput[];
    update?: Prisma.GateUpdateWithWhereUniqueWithoutTerminalInput | Prisma.GateUpdateWithWhereUniqueWithoutTerminalInput[];
    updateMany?: Prisma.GateUpdateManyWithWhereWithoutTerminalInput | Prisma.GateUpdateManyWithWhereWithoutTerminalInput[];
    deleteMany?: Prisma.GateScalarWhereInput | Prisma.GateScalarWhereInput[];
};
export type GateUncheckedUpdateManyWithoutTerminalNestedInput = {
    create?: Prisma.XOR<Prisma.GateCreateWithoutTerminalInput, Prisma.GateUncheckedCreateWithoutTerminalInput> | Prisma.GateCreateWithoutTerminalInput[] | Prisma.GateUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.GateCreateOrConnectWithoutTerminalInput | Prisma.GateCreateOrConnectWithoutTerminalInput[];
    upsert?: Prisma.GateUpsertWithWhereUniqueWithoutTerminalInput | Prisma.GateUpsertWithWhereUniqueWithoutTerminalInput[];
    createMany?: Prisma.GateCreateManyTerminalInputEnvelope;
    set?: Prisma.GateWhereUniqueInput | Prisma.GateWhereUniqueInput[];
    disconnect?: Prisma.GateWhereUniqueInput | Prisma.GateWhereUniqueInput[];
    delete?: Prisma.GateWhereUniqueInput | Prisma.GateWhereUniqueInput[];
    connect?: Prisma.GateWhereUniqueInput | Prisma.GateWhereUniqueInput[];
    update?: Prisma.GateUpdateWithWhereUniqueWithoutTerminalInput | Prisma.GateUpdateWithWhereUniqueWithoutTerminalInput[];
    updateMany?: Prisma.GateUpdateManyWithWhereWithoutTerminalInput | Prisma.GateUpdateManyWithWhereWithoutTerminalInput[];
    deleteMany?: Prisma.GateScalarWhereInput | Prisma.GateScalarWhereInput[];
};
export type GateCreateNestedOneWithoutGateAccessLogsInput = {
    create?: Prisma.XOR<Prisma.GateCreateWithoutGateAccessLogsInput, Prisma.GateUncheckedCreateWithoutGateAccessLogsInput>;
    connectOrCreate?: Prisma.GateCreateOrConnectWithoutGateAccessLogsInput;
    connect?: Prisma.GateWhereUniqueInput;
};
export type GateUpdateOneRequiredWithoutGateAccessLogsNestedInput = {
    create?: Prisma.XOR<Prisma.GateCreateWithoutGateAccessLogsInput, Prisma.GateUncheckedCreateWithoutGateAccessLogsInput>;
    connectOrCreate?: Prisma.GateCreateOrConnectWithoutGateAccessLogsInput;
    upsert?: Prisma.GateUpsertWithoutGateAccessLogsInput;
    connect?: Prisma.GateWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.GateUpdateToOneWithWhereWithoutGateAccessLogsInput, Prisma.GateUpdateWithoutGateAccessLogsInput>, Prisma.GateUncheckedUpdateWithoutGateAccessLogsInput>;
};
export type GateCreateWithoutTerminalInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    gateAccessLogs?: Prisma.GateAccessLogCreateNestedManyWithoutGateInput;
};
export type GateUncheckedCreateWithoutTerminalInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedCreateNestedManyWithoutGateInput;
};
export type GateCreateOrConnectWithoutTerminalInput = {
    where: Prisma.GateWhereUniqueInput;
    create: Prisma.XOR<Prisma.GateCreateWithoutTerminalInput, Prisma.GateUncheckedCreateWithoutTerminalInput>;
};
export type GateCreateManyTerminalInputEnvelope = {
    data: Prisma.GateCreateManyTerminalInput | Prisma.GateCreateManyTerminalInput[];
    skipDuplicates?: boolean;
};
export type GateUpsertWithWhereUniqueWithoutTerminalInput = {
    where: Prisma.GateWhereUniqueInput;
    update: Prisma.XOR<Prisma.GateUpdateWithoutTerminalInput, Prisma.GateUncheckedUpdateWithoutTerminalInput>;
    create: Prisma.XOR<Prisma.GateCreateWithoutTerminalInput, Prisma.GateUncheckedCreateWithoutTerminalInput>;
};
export type GateUpdateWithWhereUniqueWithoutTerminalInput = {
    where: Prisma.GateWhereUniqueInput;
    data: Prisma.XOR<Prisma.GateUpdateWithoutTerminalInput, Prisma.GateUncheckedUpdateWithoutTerminalInput>;
};
export type GateUpdateManyWithWhereWithoutTerminalInput = {
    where: Prisma.GateScalarWhereInput;
    data: Prisma.XOR<Prisma.GateUpdateManyMutationInput, Prisma.GateUncheckedUpdateManyWithoutTerminalInput>;
};
export type GateScalarWhereInput = {
    AND?: Prisma.GateScalarWhereInput | Prisma.GateScalarWhereInput[];
    OR?: Prisma.GateScalarWhereInput[];
    NOT?: Prisma.GateScalarWhereInput | Prisma.GateScalarWhereInput[];
    id?: Prisma.UuidFilter<"Gate"> | string;
    terminalId?: Prisma.UuidFilter<"Gate"> | string;
    name?: Prisma.StringFilter<"Gate"> | string;
    isActive?: Prisma.BoolFilter<"Gate"> | boolean;
};
export type GateCreateWithoutGateAccessLogsInput = {
    id?: string;
    name: string;
    isActive?: boolean;
    terminal: Prisma.TerminalCreateNestedOneWithoutGatesInput;
};
export type GateUncheckedCreateWithoutGateAccessLogsInput = {
    id?: string;
    terminalId: string;
    name: string;
    isActive?: boolean;
};
export type GateCreateOrConnectWithoutGateAccessLogsInput = {
    where: Prisma.GateWhereUniqueInput;
    create: Prisma.XOR<Prisma.GateCreateWithoutGateAccessLogsInput, Prisma.GateUncheckedCreateWithoutGateAccessLogsInput>;
};
export type GateUpsertWithoutGateAccessLogsInput = {
    update: Prisma.XOR<Prisma.GateUpdateWithoutGateAccessLogsInput, Prisma.GateUncheckedUpdateWithoutGateAccessLogsInput>;
    create: Prisma.XOR<Prisma.GateCreateWithoutGateAccessLogsInput, Prisma.GateUncheckedCreateWithoutGateAccessLogsInput>;
    where?: Prisma.GateWhereInput;
};
export type GateUpdateToOneWithWhereWithoutGateAccessLogsInput = {
    where?: Prisma.GateWhereInput;
    data: Prisma.XOR<Prisma.GateUpdateWithoutGateAccessLogsInput, Prisma.GateUncheckedUpdateWithoutGateAccessLogsInput>;
};
export type GateUpdateWithoutGateAccessLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    terminal?: Prisma.TerminalUpdateOneRequiredWithoutGatesNestedInput;
};
export type GateUncheckedUpdateWithoutGateAccessLogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type GateCreateManyTerminalInput = {
    id?: string;
    name: string;
    isActive?: boolean;
};
export type GateUpdateWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    gateAccessLogs?: Prisma.GateAccessLogUpdateManyWithoutGateNestedInput;
};
export type GateUncheckedUpdateWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    gateAccessLogs?: Prisma.GateAccessLogUncheckedUpdateManyWithoutGateNestedInput;
};
export type GateUncheckedUpdateManyWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
};
export type GateCountOutputType = {
    gateAccessLogs: number;
};
export type GateCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    gateAccessLogs?: boolean | GateCountOutputTypeCountGateAccessLogsArgs;
};
export type GateCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateCountOutputTypeSelect<ExtArgs> | null;
};
export type GateCountOutputTypeCountGateAccessLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GateAccessLogWhereInput;
};
export type GateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    terminalId?: boolean;
    name?: boolean;
    isActive?: boolean;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
    gateAccessLogs?: boolean | Prisma.Gate$gateAccessLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.GateCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["gate"]>;
export type GateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    terminalId?: boolean;
    name?: boolean;
    isActive?: boolean;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["gate"]>;
export type GateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    terminalId?: boolean;
    name?: boolean;
    isActive?: boolean;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["gate"]>;
export type GateSelectScalar = {
    id?: boolean;
    terminalId?: boolean;
    name?: boolean;
    isActive?: boolean;
};
export type GateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "terminalId" | "name" | "isActive", ExtArgs["result"]["gate"]>;
export type GateInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
    gateAccessLogs?: boolean | Prisma.Gate$gateAccessLogsArgs<ExtArgs>;
    _count?: boolean | Prisma.GateCountOutputTypeDefaultArgs<ExtArgs>;
};
export type GateIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
};
export type GateIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
};
export type $GatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Gate";
    objects: {
        terminal: Prisma.$TerminalPayload<ExtArgs>;
        gateAccessLogs: Prisma.$GateAccessLogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        terminalId: string;
        name: string;
        isActive: boolean;
    }, ExtArgs["result"]["gate"]>;
    composites: {};
};
export type GateGetPayload<S extends boolean | null | undefined | GateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$GatePayload, S>;
export type GateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<GateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GateCountAggregateInputType | true;
};
export interface GateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Gate'];
        meta: {
            name: 'Gate';
        };
    };
    findUnique<T extends GateFindUniqueArgs>(args: Prisma.SelectSubset<T, GateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__GateClient<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends GateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, GateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__GateClient<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends GateFindFirstArgs>(args?: Prisma.SelectSubset<T, GateFindFirstArgs<ExtArgs>>): Prisma.Prisma__GateClient<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends GateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, GateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__GateClient<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends GateFindManyArgs>(args?: Prisma.SelectSubset<T, GateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends GateCreateArgs>(args: Prisma.SelectSubset<T, GateCreateArgs<ExtArgs>>): Prisma.Prisma__GateClient<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends GateCreateManyArgs>(args?: Prisma.SelectSubset<T, GateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends GateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, GateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends GateDeleteArgs>(args: Prisma.SelectSubset<T, GateDeleteArgs<ExtArgs>>): Prisma.Prisma__GateClient<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends GateUpdateArgs>(args: Prisma.SelectSubset<T, GateUpdateArgs<ExtArgs>>): Prisma.Prisma__GateClient<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends GateDeleteManyArgs>(args?: Prisma.SelectSubset<T, GateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends GateUpdateManyArgs>(args: Prisma.SelectSubset<T, GateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends GateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, GateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends GateUpsertArgs>(args: Prisma.SelectSubset<T, GateUpsertArgs<ExtArgs>>): Prisma.Prisma__GateClient<runtime.Types.Result.GetResult<Prisma.$GatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends GateCountArgs>(args?: Prisma.Subset<T, GateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GateCountAggregateOutputType> : number>;
    aggregate<T extends GateAggregateArgs>(args: Prisma.Subset<T, GateAggregateArgs>): Prisma.PrismaPromise<GetGateAggregateType<T>>;
    groupBy<T extends GateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: GateGroupByArgs['orderBy'];
    } : {
        orderBy?: GateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, GateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: GateFieldRefs;
}
export interface Prisma__GateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    terminal<T extends Prisma.TerminalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TerminalDefaultArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    gateAccessLogs<T extends Prisma.Gate$gateAccessLogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Gate$gateAccessLogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$GateAccessLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface GateFieldRefs {
    readonly id: Prisma.FieldRef<"Gate", 'String'>;
    readonly terminalId: Prisma.FieldRef<"Gate", 'String'>;
    readonly name: Prisma.FieldRef<"Gate", 'String'>;
    readonly isActive: Prisma.FieldRef<"Gate", 'Boolean'>;
}
export type GateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateSelect<ExtArgs> | null;
    omit?: Prisma.GateOmit<ExtArgs> | null;
    include?: Prisma.GateInclude<ExtArgs> | null;
    where: Prisma.GateWhereUniqueInput;
};
export type GateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateSelect<ExtArgs> | null;
    omit?: Prisma.GateOmit<ExtArgs> | null;
    include?: Prisma.GateInclude<ExtArgs> | null;
    where: Prisma.GateWhereUniqueInput;
};
export type GateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateSelect<ExtArgs> | null;
    omit?: Prisma.GateOmit<ExtArgs> | null;
    include?: Prisma.GateInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GateCreateInput, Prisma.GateUncheckedCreateInput>;
};
export type GateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.GateCreateManyInput | Prisma.GateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type GateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GateOmit<ExtArgs> | null;
    data: Prisma.GateCreateManyInput | Prisma.GateCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.GateIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type GateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateSelect<ExtArgs> | null;
    omit?: Prisma.GateOmit<ExtArgs> | null;
    include?: Prisma.GateInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GateUpdateInput, Prisma.GateUncheckedUpdateInput>;
    where: Prisma.GateWhereUniqueInput;
};
export type GateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.GateUpdateManyMutationInput, Prisma.GateUncheckedUpdateManyInput>;
    where?: Prisma.GateWhereInput;
    limit?: number;
};
export type GateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.GateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.GateUpdateManyMutationInput, Prisma.GateUncheckedUpdateManyInput>;
    where?: Prisma.GateWhereInput;
    limit?: number;
    include?: Prisma.GateIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type GateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateSelect<ExtArgs> | null;
    omit?: Prisma.GateOmit<ExtArgs> | null;
    include?: Prisma.GateInclude<ExtArgs> | null;
    where: Prisma.GateWhereUniqueInput;
    create: Prisma.XOR<Prisma.GateCreateInput, Prisma.GateUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.GateUpdateInput, Prisma.GateUncheckedUpdateInput>;
};
export type GateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateSelect<ExtArgs> | null;
    omit?: Prisma.GateOmit<ExtArgs> | null;
    include?: Prisma.GateInclude<ExtArgs> | null;
    where: Prisma.GateWhereUniqueInput;
};
export type GateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.GateWhereInput;
    limit?: number;
};
export type Gate$gateAccessLogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type GateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.GateSelect<ExtArgs> | null;
    omit?: Prisma.GateOmit<ExtArgs> | null;
    include?: Prisma.GateInclude<ExtArgs> | null;
};
export {};
