import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ZoneModel = runtime.Types.Result.DefaultSelection<Prisma.$ZonePayload>;
export type AggregateZone = {
    _count: ZoneCountAggregateOutputType | null;
    _avg: ZoneAvgAggregateOutputType | null;
    _sum: ZoneSumAggregateOutputType | null;
    _min: ZoneMinAggregateOutputType | null;
    _max: ZoneMaxAggregateOutputType | null;
};
export type ZoneAvgAggregateOutputType = {
    maxTrucks: number | null;
};
export type ZoneSumAggregateOutputType = {
    maxTrucks: number | null;
};
export type ZoneMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    terminalId: string | null;
    type: string | null;
    maxTrucks: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type ZoneMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    terminalId: string | null;
    type: string | null;
    maxTrucks: number | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type ZoneCountAggregateOutputType = {
    id: number;
    name: number;
    terminalId: number;
    type: number;
    maxTrucks: number;
    isActive: number;
    createdAt: number;
    _all: number;
};
export type ZoneAvgAggregateInputType = {
    maxTrucks?: true;
};
export type ZoneSumAggregateInputType = {
    maxTrucks?: true;
};
export type ZoneMinAggregateInputType = {
    id?: true;
    name?: true;
    terminalId?: true;
    type?: true;
    maxTrucks?: true;
    isActive?: true;
    createdAt?: true;
};
export type ZoneMaxAggregateInputType = {
    id?: true;
    name?: true;
    terminalId?: true;
    type?: true;
    maxTrucks?: true;
    isActive?: true;
    createdAt?: true;
};
export type ZoneCountAggregateInputType = {
    id?: true;
    name?: true;
    terminalId?: true;
    type?: true;
    maxTrucks?: true;
    isActive?: true;
    createdAt?: true;
    _all?: true;
};
export type ZoneAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ZoneWhereInput;
    orderBy?: Prisma.ZoneOrderByWithRelationInput | Prisma.ZoneOrderByWithRelationInput[];
    cursor?: Prisma.ZoneWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ZoneCountAggregateInputType;
    _avg?: ZoneAvgAggregateInputType;
    _sum?: ZoneSumAggregateInputType;
    _min?: ZoneMinAggregateInputType;
    _max?: ZoneMaxAggregateInputType;
};
export type GetZoneAggregateType<T extends ZoneAggregateArgs> = {
    [P in keyof T & keyof AggregateZone]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateZone[P]> : Prisma.GetScalarType<T[P], AggregateZone[P]>;
};
export type ZoneGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ZoneWhereInput;
    orderBy?: Prisma.ZoneOrderByWithAggregationInput | Prisma.ZoneOrderByWithAggregationInput[];
    by: Prisma.ZoneScalarFieldEnum[] | Prisma.ZoneScalarFieldEnum;
    having?: Prisma.ZoneScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ZoneCountAggregateInputType | true;
    _avg?: ZoneAvgAggregateInputType;
    _sum?: ZoneSumAggregateInputType;
    _min?: ZoneMinAggregateInputType;
    _max?: ZoneMaxAggregateInputType;
};
export type ZoneGroupByOutputType = {
    id: string;
    name: string;
    terminalId: string;
    type: string;
    maxTrucks: number;
    isActive: boolean;
    createdAt: Date;
    _count: ZoneCountAggregateOutputType | null;
    _avg: ZoneAvgAggregateOutputType | null;
    _sum: ZoneSumAggregateOutputType | null;
    _min: ZoneMinAggregateOutputType | null;
    _max: ZoneMaxAggregateOutputType | null;
};
type GetZoneGroupByPayload<T extends ZoneGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ZoneGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ZoneGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ZoneGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ZoneGroupByOutputType[P]>;
}>>;
export type ZoneWhereInput = {
    AND?: Prisma.ZoneWhereInput | Prisma.ZoneWhereInput[];
    OR?: Prisma.ZoneWhereInput[];
    NOT?: Prisma.ZoneWhereInput | Prisma.ZoneWhereInput[];
    id?: Prisma.UuidFilter<"Zone"> | string;
    name?: Prisma.StringFilter<"Zone"> | string;
    terminalId?: Prisma.UuidFilter<"Zone"> | string;
    type?: Prisma.StringFilter<"Zone"> | string;
    maxTrucks?: Prisma.IntFilter<"Zone"> | number;
    isActive?: Prisma.BoolFilter<"Zone"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Zone"> | Date | string;
    terminal?: Prisma.XOR<Prisma.TerminalScalarRelationFilter, Prisma.TerminalWhereInput>;
};
export type ZoneOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    maxTrucks?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    terminal?: Prisma.TerminalOrderByWithRelationInput;
};
export type ZoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ZoneWhereInput | Prisma.ZoneWhereInput[];
    OR?: Prisma.ZoneWhereInput[];
    NOT?: Prisma.ZoneWhereInput | Prisma.ZoneWhereInput[];
    name?: Prisma.StringFilter<"Zone"> | string;
    terminalId?: Prisma.UuidFilter<"Zone"> | string;
    type?: Prisma.StringFilter<"Zone"> | string;
    maxTrucks?: Prisma.IntFilter<"Zone"> | number;
    isActive?: Prisma.BoolFilter<"Zone"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Zone"> | Date | string;
    terminal?: Prisma.XOR<Prisma.TerminalScalarRelationFilter, Prisma.TerminalWhereInput>;
}, "id">;
export type ZoneOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    maxTrucks?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ZoneCountOrderByAggregateInput;
    _avg?: Prisma.ZoneAvgOrderByAggregateInput;
    _max?: Prisma.ZoneMaxOrderByAggregateInput;
    _min?: Prisma.ZoneMinOrderByAggregateInput;
    _sum?: Prisma.ZoneSumOrderByAggregateInput;
};
export type ZoneScalarWhereWithAggregatesInput = {
    AND?: Prisma.ZoneScalarWhereWithAggregatesInput | Prisma.ZoneScalarWhereWithAggregatesInput[];
    OR?: Prisma.ZoneScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ZoneScalarWhereWithAggregatesInput | Prisma.ZoneScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Zone"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Zone"> | string;
    terminalId?: Prisma.UuidWithAggregatesFilter<"Zone"> | string;
    type?: Prisma.StringWithAggregatesFilter<"Zone"> | string;
    maxTrucks?: Prisma.IntWithAggregatesFilter<"Zone"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"Zone"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Zone"> | Date | string;
};
export type ZoneCreateInput = {
    id?: string;
    name: string;
    type?: string;
    maxTrucks?: number;
    isActive?: boolean;
    createdAt?: Date | string;
    terminal: Prisma.TerminalCreateNestedOneWithoutZonesInput;
};
export type ZoneUncheckedCreateInput = {
    id?: string;
    name: string;
    terminalId: string;
    type?: string;
    maxTrucks?: number;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ZoneUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    maxTrucks?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    terminal?: Prisma.TerminalUpdateOneRequiredWithoutZonesNestedInput;
};
export type ZoneUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    maxTrucks?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ZoneCreateManyInput = {
    id?: string;
    name: string;
    terminalId: string;
    type?: string;
    maxTrucks?: number;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ZoneUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    maxTrucks?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ZoneUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    maxTrucks?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ZoneListRelationFilter = {
    every?: Prisma.ZoneWhereInput;
    some?: Prisma.ZoneWhereInput;
    none?: Prisma.ZoneWhereInput;
};
export type ZoneOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ZoneCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    maxTrucks?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ZoneAvgOrderByAggregateInput = {
    maxTrucks?: Prisma.SortOrder;
};
export type ZoneMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    maxTrucks?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ZoneMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    maxTrucks?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ZoneSumOrderByAggregateInput = {
    maxTrucks?: Prisma.SortOrder;
};
export type ZoneCreateNestedManyWithoutTerminalInput = {
    create?: Prisma.XOR<Prisma.ZoneCreateWithoutTerminalInput, Prisma.ZoneUncheckedCreateWithoutTerminalInput> | Prisma.ZoneCreateWithoutTerminalInput[] | Prisma.ZoneUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.ZoneCreateOrConnectWithoutTerminalInput | Prisma.ZoneCreateOrConnectWithoutTerminalInput[];
    createMany?: Prisma.ZoneCreateManyTerminalInputEnvelope;
    connect?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
};
export type ZoneUncheckedCreateNestedManyWithoutTerminalInput = {
    create?: Prisma.XOR<Prisma.ZoneCreateWithoutTerminalInput, Prisma.ZoneUncheckedCreateWithoutTerminalInput> | Prisma.ZoneCreateWithoutTerminalInput[] | Prisma.ZoneUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.ZoneCreateOrConnectWithoutTerminalInput | Prisma.ZoneCreateOrConnectWithoutTerminalInput[];
    createMany?: Prisma.ZoneCreateManyTerminalInputEnvelope;
    connect?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
};
export type ZoneUpdateManyWithoutTerminalNestedInput = {
    create?: Prisma.XOR<Prisma.ZoneCreateWithoutTerminalInput, Prisma.ZoneUncheckedCreateWithoutTerminalInput> | Prisma.ZoneCreateWithoutTerminalInput[] | Prisma.ZoneUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.ZoneCreateOrConnectWithoutTerminalInput | Prisma.ZoneCreateOrConnectWithoutTerminalInput[];
    upsert?: Prisma.ZoneUpsertWithWhereUniqueWithoutTerminalInput | Prisma.ZoneUpsertWithWhereUniqueWithoutTerminalInput[];
    createMany?: Prisma.ZoneCreateManyTerminalInputEnvelope;
    set?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    disconnect?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    delete?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    connect?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    update?: Prisma.ZoneUpdateWithWhereUniqueWithoutTerminalInput | Prisma.ZoneUpdateWithWhereUniqueWithoutTerminalInput[];
    updateMany?: Prisma.ZoneUpdateManyWithWhereWithoutTerminalInput | Prisma.ZoneUpdateManyWithWhereWithoutTerminalInput[];
    deleteMany?: Prisma.ZoneScalarWhereInput | Prisma.ZoneScalarWhereInput[];
};
export type ZoneUncheckedUpdateManyWithoutTerminalNestedInput = {
    create?: Prisma.XOR<Prisma.ZoneCreateWithoutTerminalInput, Prisma.ZoneUncheckedCreateWithoutTerminalInput> | Prisma.ZoneCreateWithoutTerminalInput[] | Prisma.ZoneUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.ZoneCreateOrConnectWithoutTerminalInput | Prisma.ZoneCreateOrConnectWithoutTerminalInput[];
    upsert?: Prisma.ZoneUpsertWithWhereUniqueWithoutTerminalInput | Prisma.ZoneUpsertWithWhereUniqueWithoutTerminalInput[];
    createMany?: Prisma.ZoneCreateManyTerminalInputEnvelope;
    set?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    disconnect?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    delete?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    connect?: Prisma.ZoneWhereUniqueInput | Prisma.ZoneWhereUniqueInput[];
    update?: Prisma.ZoneUpdateWithWhereUniqueWithoutTerminalInput | Prisma.ZoneUpdateWithWhereUniqueWithoutTerminalInput[];
    updateMany?: Prisma.ZoneUpdateManyWithWhereWithoutTerminalInput | Prisma.ZoneUpdateManyWithWhereWithoutTerminalInput[];
    deleteMany?: Prisma.ZoneScalarWhereInput | Prisma.ZoneScalarWhereInput[];
};
export type ZoneCreateWithoutTerminalInput = {
    id?: string;
    name: string;
    type?: string;
    maxTrucks?: number;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ZoneUncheckedCreateWithoutTerminalInput = {
    id?: string;
    name: string;
    type?: string;
    maxTrucks?: number;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ZoneCreateOrConnectWithoutTerminalInput = {
    where: Prisma.ZoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.ZoneCreateWithoutTerminalInput, Prisma.ZoneUncheckedCreateWithoutTerminalInput>;
};
export type ZoneCreateManyTerminalInputEnvelope = {
    data: Prisma.ZoneCreateManyTerminalInput | Prisma.ZoneCreateManyTerminalInput[];
    skipDuplicates?: boolean;
};
export type ZoneUpsertWithWhereUniqueWithoutTerminalInput = {
    where: Prisma.ZoneWhereUniqueInput;
    update: Prisma.XOR<Prisma.ZoneUpdateWithoutTerminalInput, Prisma.ZoneUncheckedUpdateWithoutTerminalInput>;
    create: Prisma.XOR<Prisma.ZoneCreateWithoutTerminalInput, Prisma.ZoneUncheckedCreateWithoutTerminalInput>;
};
export type ZoneUpdateWithWhereUniqueWithoutTerminalInput = {
    where: Prisma.ZoneWhereUniqueInput;
    data: Prisma.XOR<Prisma.ZoneUpdateWithoutTerminalInput, Prisma.ZoneUncheckedUpdateWithoutTerminalInput>;
};
export type ZoneUpdateManyWithWhereWithoutTerminalInput = {
    where: Prisma.ZoneScalarWhereInput;
    data: Prisma.XOR<Prisma.ZoneUpdateManyMutationInput, Prisma.ZoneUncheckedUpdateManyWithoutTerminalInput>;
};
export type ZoneScalarWhereInput = {
    AND?: Prisma.ZoneScalarWhereInput | Prisma.ZoneScalarWhereInput[];
    OR?: Prisma.ZoneScalarWhereInput[];
    NOT?: Prisma.ZoneScalarWhereInput | Prisma.ZoneScalarWhereInput[];
    id?: Prisma.UuidFilter<"Zone"> | string;
    name?: Prisma.StringFilter<"Zone"> | string;
    terminalId?: Prisma.UuidFilter<"Zone"> | string;
    type?: Prisma.StringFilter<"Zone"> | string;
    maxTrucks?: Prisma.IntFilter<"Zone"> | number;
    isActive?: Prisma.BoolFilter<"Zone"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Zone"> | Date | string;
};
export type ZoneCreateManyTerminalInput = {
    id?: string;
    name: string;
    type?: string;
    maxTrucks?: number;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ZoneUpdateWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    maxTrucks?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ZoneUncheckedUpdateWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    maxTrucks?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ZoneUncheckedUpdateManyWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.StringFieldUpdateOperationsInput | string;
    maxTrucks?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ZoneSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    terminalId?: boolean;
    type?: boolean;
    maxTrucks?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["zone"]>;
export type ZoneSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    terminalId?: boolean;
    type?: boolean;
    maxTrucks?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["zone"]>;
export type ZoneSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    terminalId?: boolean;
    type?: boolean;
    maxTrucks?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["zone"]>;
export type ZoneSelectScalar = {
    id?: boolean;
    name?: boolean;
    terminalId?: boolean;
    type?: boolean;
    maxTrucks?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
};
export type ZoneOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "terminalId" | "type" | "maxTrucks" | "isActive" | "createdAt", ExtArgs["result"]["zone"]>;
export type ZoneInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
};
export type ZoneIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
};
export type ZoneIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.TerminalDefaultArgs<ExtArgs>;
};
export type $ZonePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Zone";
    objects: {
        terminal: Prisma.$TerminalPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        terminalId: string;
        type: string;
        maxTrucks: number;
        isActive: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["zone"]>;
    composites: {};
};
export type ZoneGetPayload<S extends boolean | null | undefined | ZoneDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ZonePayload, S>;
export type ZoneCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ZoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ZoneCountAggregateInputType | true;
};
export interface ZoneDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Zone'];
        meta: {
            name: 'Zone';
        };
    };
    findUnique<T extends ZoneFindUniqueArgs>(args: Prisma.SelectSubset<T, ZoneFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ZoneFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ZoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ZoneFindFirstArgs>(args?: Prisma.SelectSubset<T, ZoneFindFirstArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ZoneFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ZoneFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ZoneFindManyArgs>(args?: Prisma.SelectSubset<T, ZoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ZoneCreateArgs>(args: Prisma.SelectSubset<T, ZoneCreateArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ZoneCreateManyArgs>(args?: Prisma.SelectSubset<T, ZoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ZoneCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ZoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ZoneDeleteArgs>(args: Prisma.SelectSubset<T, ZoneDeleteArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ZoneUpdateArgs>(args: Prisma.SelectSubset<T, ZoneUpdateArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ZoneDeleteManyArgs>(args?: Prisma.SelectSubset<T, ZoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ZoneUpdateManyArgs>(args: Prisma.SelectSubset<T, ZoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ZoneUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ZoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ZoneUpsertArgs>(args: Prisma.SelectSubset<T, ZoneUpsertArgs<ExtArgs>>): Prisma.Prisma__ZoneClient<runtime.Types.Result.GetResult<Prisma.$ZonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ZoneCountArgs>(args?: Prisma.Subset<T, ZoneCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ZoneCountAggregateOutputType> : number>;
    aggregate<T extends ZoneAggregateArgs>(args: Prisma.Subset<T, ZoneAggregateArgs>): Prisma.PrismaPromise<GetZoneAggregateType<T>>;
    groupBy<T extends ZoneGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ZoneGroupByArgs['orderBy'];
    } : {
        orderBy?: ZoneGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ZoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetZoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ZoneFieldRefs;
}
export interface Prisma__ZoneClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    terminal<T extends Prisma.TerminalDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TerminalDefaultArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ZoneFieldRefs {
    readonly id: Prisma.FieldRef<"Zone", 'String'>;
    readonly name: Prisma.FieldRef<"Zone", 'String'>;
    readonly terminalId: Prisma.FieldRef<"Zone", 'String'>;
    readonly type: Prisma.FieldRef<"Zone", 'String'>;
    readonly maxTrucks: Prisma.FieldRef<"Zone", 'Int'>;
    readonly isActive: Prisma.FieldRef<"Zone", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Zone", 'DateTime'>;
}
export type ZoneFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    where: Prisma.ZoneWhereUniqueInput;
};
export type ZoneFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    where: Prisma.ZoneWhereUniqueInput;
};
export type ZoneFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ZoneFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ZoneFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ZoneCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ZoneCreateInput, Prisma.ZoneUncheckedCreateInput>;
};
export type ZoneCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ZoneCreateManyInput | Prisma.ZoneCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ZoneCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    data: Prisma.ZoneCreateManyInput | Prisma.ZoneCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ZoneIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ZoneUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ZoneUpdateInput, Prisma.ZoneUncheckedUpdateInput>;
    where: Prisma.ZoneWhereUniqueInput;
};
export type ZoneUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ZoneUpdateManyMutationInput, Prisma.ZoneUncheckedUpdateManyInput>;
    where?: Prisma.ZoneWhereInput;
    limit?: number;
};
export type ZoneUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ZoneUpdateManyMutationInput, Prisma.ZoneUncheckedUpdateManyInput>;
    where?: Prisma.ZoneWhereInput;
    limit?: number;
    include?: Prisma.ZoneIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ZoneUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    where: Prisma.ZoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.ZoneCreateInput, Prisma.ZoneUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ZoneUpdateInput, Prisma.ZoneUncheckedUpdateInput>;
};
export type ZoneDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
    where: Prisma.ZoneWhereUniqueInput;
};
export type ZoneDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ZoneWhereInput;
    limit?: number;
};
export type ZoneDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ZoneSelect<ExtArgs> | null;
    omit?: Prisma.ZoneOmit<ExtArgs> | null;
    include?: Prisma.ZoneInclude<ExtArgs> | null;
};
export {};
