import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TruckLocationModel = runtime.Types.Result.DefaultSelection<Prisma.$TruckLocationPayload>;
export type AggregateTruckLocation = {
    _count: TruckLocationCountAggregateOutputType | null;
    _avg: TruckLocationAvgAggregateOutputType | null;
    _sum: TruckLocationSumAggregateOutputType | null;
    _min: TruckLocationMinAggregateOutputType | null;
    _max: TruckLocationMaxAggregateOutputType | null;
};
export type TruckLocationAvgAggregateOutputType = {
    lat: number | null;
    lng: number | null;
};
export type TruckLocationSumAggregateOutputType = {
    lat: number | null;
    lng: number | null;
};
export type TruckLocationMinAggregateOutputType = {
    id: string | null;
    truckId: string | null;
    lat: number | null;
    lng: number | null;
    timestamp: Date | null;
};
export type TruckLocationMaxAggregateOutputType = {
    id: string | null;
    truckId: string | null;
    lat: number | null;
    lng: number | null;
    timestamp: Date | null;
};
export type TruckLocationCountAggregateOutputType = {
    id: number;
    truckId: number;
    lat: number;
    lng: number;
    timestamp: number;
    _all: number;
};
export type TruckLocationAvgAggregateInputType = {
    lat?: true;
    lng?: true;
};
export type TruckLocationSumAggregateInputType = {
    lat?: true;
    lng?: true;
};
export type TruckLocationMinAggregateInputType = {
    id?: true;
    truckId?: true;
    lat?: true;
    lng?: true;
    timestamp?: true;
};
export type TruckLocationMaxAggregateInputType = {
    id?: true;
    truckId?: true;
    lat?: true;
    lng?: true;
    timestamp?: true;
};
export type TruckLocationCountAggregateInputType = {
    id?: true;
    truckId?: true;
    lat?: true;
    lng?: true;
    timestamp?: true;
    _all?: true;
};
export type TruckLocationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TruckLocationWhereInput;
    orderBy?: Prisma.TruckLocationOrderByWithRelationInput | Prisma.TruckLocationOrderByWithRelationInput[];
    cursor?: Prisma.TruckLocationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TruckLocationCountAggregateInputType;
    _avg?: TruckLocationAvgAggregateInputType;
    _sum?: TruckLocationSumAggregateInputType;
    _min?: TruckLocationMinAggregateInputType;
    _max?: TruckLocationMaxAggregateInputType;
};
export type GetTruckLocationAggregateType<T extends TruckLocationAggregateArgs> = {
    [P in keyof T & keyof AggregateTruckLocation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTruckLocation[P]> : Prisma.GetScalarType<T[P], AggregateTruckLocation[P]>;
};
export type TruckLocationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TruckLocationWhereInput;
    orderBy?: Prisma.TruckLocationOrderByWithAggregationInput | Prisma.TruckLocationOrderByWithAggregationInput[];
    by: Prisma.TruckLocationScalarFieldEnum[] | Prisma.TruckLocationScalarFieldEnum;
    having?: Prisma.TruckLocationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TruckLocationCountAggregateInputType | true;
    _avg?: TruckLocationAvgAggregateInputType;
    _sum?: TruckLocationSumAggregateInputType;
    _min?: TruckLocationMinAggregateInputType;
    _max?: TruckLocationMaxAggregateInputType;
};
export type TruckLocationGroupByOutputType = {
    id: string;
    truckId: string;
    lat: number;
    lng: number;
    timestamp: Date;
    _count: TruckLocationCountAggregateOutputType | null;
    _avg: TruckLocationAvgAggregateOutputType | null;
    _sum: TruckLocationSumAggregateOutputType | null;
    _min: TruckLocationMinAggregateOutputType | null;
    _max: TruckLocationMaxAggregateOutputType | null;
};
type GetTruckLocationGroupByPayload<T extends TruckLocationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TruckLocationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TruckLocationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TruckLocationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TruckLocationGroupByOutputType[P]>;
}>>;
export type TruckLocationWhereInput = {
    AND?: Prisma.TruckLocationWhereInput | Prisma.TruckLocationWhereInput[];
    OR?: Prisma.TruckLocationWhereInput[];
    NOT?: Prisma.TruckLocationWhereInput | Prisma.TruckLocationWhereInput[];
    id?: Prisma.UuidFilter<"TruckLocation"> | string;
    truckId?: Prisma.UuidFilter<"TruckLocation"> | string;
    lat?: Prisma.FloatFilter<"TruckLocation"> | number;
    lng?: Prisma.FloatFilter<"TruckLocation"> | number;
    timestamp?: Prisma.DateTimeFilter<"TruckLocation"> | Date | string;
    truck?: Prisma.XOR<Prisma.TruckScalarRelationFilter, Prisma.TruckWhereInput>;
};
export type TruckLocationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    lat?: Prisma.SortOrder;
    lng?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    truck?: Prisma.TruckOrderByWithRelationInput;
};
export type TruckLocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TruckLocationWhereInput | Prisma.TruckLocationWhereInput[];
    OR?: Prisma.TruckLocationWhereInput[];
    NOT?: Prisma.TruckLocationWhereInput | Prisma.TruckLocationWhereInput[];
    truckId?: Prisma.UuidFilter<"TruckLocation"> | string;
    lat?: Prisma.FloatFilter<"TruckLocation"> | number;
    lng?: Prisma.FloatFilter<"TruckLocation"> | number;
    timestamp?: Prisma.DateTimeFilter<"TruckLocation"> | Date | string;
    truck?: Prisma.XOR<Prisma.TruckScalarRelationFilter, Prisma.TruckWhereInput>;
}, "id">;
export type TruckLocationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    lat?: Prisma.SortOrder;
    lng?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    _count?: Prisma.TruckLocationCountOrderByAggregateInput;
    _avg?: Prisma.TruckLocationAvgOrderByAggregateInput;
    _max?: Prisma.TruckLocationMaxOrderByAggregateInput;
    _min?: Prisma.TruckLocationMinOrderByAggregateInput;
    _sum?: Prisma.TruckLocationSumOrderByAggregateInput;
};
export type TruckLocationScalarWhereWithAggregatesInput = {
    AND?: Prisma.TruckLocationScalarWhereWithAggregatesInput | Prisma.TruckLocationScalarWhereWithAggregatesInput[];
    OR?: Prisma.TruckLocationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TruckLocationScalarWhereWithAggregatesInput | Prisma.TruckLocationScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"TruckLocation"> | string;
    truckId?: Prisma.UuidWithAggregatesFilter<"TruckLocation"> | string;
    lat?: Prisma.FloatWithAggregatesFilter<"TruckLocation"> | number;
    lng?: Prisma.FloatWithAggregatesFilter<"TruckLocation"> | number;
    timestamp?: Prisma.DateTimeWithAggregatesFilter<"TruckLocation"> | Date | string;
};
export type TruckLocationCreateInput = {
    id?: string;
    lat: number;
    lng: number;
    timestamp?: Date | string;
    truck: Prisma.TruckCreateNestedOneWithoutLocationsInput;
};
export type TruckLocationUncheckedCreateInput = {
    id?: string;
    truckId: string;
    lat: number;
    lng: number;
    timestamp?: Date | string;
};
export type TruckLocationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lat?: Prisma.FloatFieldUpdateOperationsInput | number;
    lng?: Prisma.FloatFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    truck?: Prisma.TruckUpdateOneRequiredWithoutLocationsNestedInput;
};
export type TruckLocationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    truckId?: Prisma.StringFieldUpdateOperationsInput | string;
    lat?: Prisma.FloatFieldUpdateOperationsInput | number;
    lng?: Prisma.FloatFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TruckLocationCreateManyInput = {
    id?: string;
    truckId: string;
    lat: number;
    lng: number;
    timestamp?: Date | string;
};
export type TruckLocationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lat?: Prisma.FloatFieldUpdateOperationsInput | number;
    lng?: Prisma.FloatFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TruckLocationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    truckId?: Prisma.StringFieldUpdateOperationsInput | string;
    lat?: Prisma.FloatFieldUpdateOperationsInput | number;
    lng?: Prisma.FloatFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TruckLocationListRelationFilter = {
    every?: Prisma.TruckLocationWhereInput;
    some?: Prisma.TruckLocationWhereInput;
    none?: Prisma.TruckLocationWhereInput;
};
export type TruckLocationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TruckLocationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    lat?: Prisma.SortOrder;
    lng?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
};
export type TruckLocationAvgOrderByAggregateInput = {
    lat?: Prisma.SortOrder;
    lng?: Prisma.SortOrder;
};
export type TruckLocationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    lat?: Prisma.SortOrder;
    lng?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
};
export type TruckLocationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    lat?: Prisma.SortOrder;
    lng?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
};
export type TruckLocationSumOrderByAggregateInput = {
    lat?: Prisma.SortOrder;
    lng?: Prisma.SortOrder;
};
export type TruckLocationCreateNestedManyWithoutTruckInput = {
    create?: Prisma.XOR<Prisma.TruckLocationCreateWithoutTruckInput, Prisma.TruckLocationUncheckedCreateWithoutTruckInput> | Prisma.TruckLocationCreateWithoutTruckInput[] | Prisma.TruckLocationUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.TruckLocationCreateOrConnectWithoutTruckInput | Prisma.TruckLocationCreateOrConnectWithoutTruckInput[];
    createMany?: Prisma.TruckLocationCreateManyTruckInputEnvelope;
    connect?: Prisma.TruckLocationWhereUniqueInput | Prisma.TruckLocationWhereUniqueInput[];
};
export type TruckLocationUncheckedCreateNestedManyWithoutTruckInput = {
    create?: Prisma.XOR<Prisma.TruckLocationCreateWithoutTruckInput, Prisma.TruckLocationUncheckedCreateWithoutTruckInput> | Prisma.TruckLocationCreateWithoutTruckInput[] | Prisma.TruckLocationUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.TruckLocationCreateOrConnectWithoutTruckInput | Prisma.TruckLocationCreateOrConnectWithoutTruckInput[];
    createMany?: Prisma.TruckLocationCreateManyTruckInputEnvelope;
    connect?: Prisma.TruckLocationWhereUniqueInput | Prisma.TruckLocationWhereUniqueInput[];
};
export type TruckLocationUpdateManyWithoutTruckNestedInput = {
    create?: Prisma.XOR<Prisma.TruckLocationCreateWithoutTruckInput, Prisma.TruckLocationUncheckedCreateWithoutTruckInput> | Prisma.TruckLocationCreateWithoutTruckInput[] | Prisma.TruckLocationUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.TruckLocationCreateOrConnectWithoutTruckInput | Prisma.TruckLocationCreateOrConnectWithoutTruckInput[];
    upsert?: Prisma.TruckLocationUpsertWithWhereUniqueWithoutTruckInput | Prisma.TruckLocationUpsertWithWhereUniqueWithoutTruckInput[];
    createMany?: Prisma.TruckLocationCreateManyTruckInputEnvelope;
    set?: Prisma.TruckLocationWhereUniqueInput | Prisma.TruckLocationWhereUniqueInput[];
    disconnect?: Prisma.TruckLocationWhereUniqueInput | Prisma.TruckLocationWhereUniqueInput[];
    delete?: Prisma.TruckLocationWhereUniqueInput | Prisma.TruckLocationWhereUniqueInput[];
    connect?: Prisma.TruckLocationWhereUniqueInput | Prisma.TruckLocationWhereUniqueInput[];
    update?: Prisma.TruckLocationUpdateWithWhereUniqueWithoutTruckInput | Prisma.TruckLocationUpdateWithWhereUniqueWithoutTruckInput[];
    updateMany?: Prisma.TruckLocationUpdateManyWithWhereWithoutTruckInput | Prisma.TruckLocationUpdateManyWithWhereWithoutTruckInput[];
    deleteMany?: Prisma.TruckLocationScalarWhereInput | Prisma.TruckLocationScalarWhereInput[];
};
export type TruckLocationUncheckedUpdateManyWithoutTruckNestedInput = {
    create?: Prisma.XOR<Prisma.TruckLocationCreateWithoutTruckInput, Prisma.TruckLocationUncheckedCreateWithoutTruckInput> | Prisma.TruckLocationCreateWithoutTruckInput[] | Prisma.TruckLocationUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.TruckLocationCreateOrConnectWithoutTruckInput | Prisma.TruckLocationCreateOrConnectWithoutTruckInput[];
    upsert?: Prisma.TruckLocationUpsertWithWhereUniqueWithoutTruckInput | Prisma.TruckLocationUpsertWithWhereUniqueWithoutTruckInput[];
    createMany?: Prisma.TruckLocationCreateManyTruckInputEnvelope;
    set?: Prisma.TruckLocationWhereUniqueInput | Prisma.TruckLocationWhereUniqueInput[];
    disconnect?: Prisma.TruckLocationWhereUniqueInput | Prisma.TruckLocationWhereUniqueInput[];
    delete?: Prisma.TruckLocationWhereUniqueInput | Prisma.TruckLocationWhereUniqueInput[];
    connect?: Prisma.TruckLocationWhereUniqueInput | Prisma.TruckLocationWhereUniqueInput[];
    update?: Prisma.TruckLocationUpdateWithWhereUniqueWithoutTruckInput | Prisma.TruckLocationUpdateWithWhereUniqueWithoutTruckInput[];
    updateMany?: Prisma.TruckLocationUpdateManyWithWhereWithoutTruckInput | Prisma.TruckLocationUpdateManyWithWhereWithoutTruckInput[];
    deleteMany?: Prisma.TruckLocationScalarWhereInput | Prisma.TruckLocationScalarWhereInput[];
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type TruckLocationCreateWithoutTruckInput = {
    id?: string;
    lat: number;
    lng: number;
    timestamp?: Date | string;
};
export type TruckLocationUncheckedCreateWithoutTruckInput = {
    id?: string;
    lat: number;
    lng: number;
    timestamp?: Date | string;
};
export type TruckLocationCreateOrConnectWithoutTruckInput = {
    where: Prisma.TruckLocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.TruckLocationCreateWithoutTruckInput, Prisma.TruckLocationUncheckedCreateWithoutTruckInput>;
};
export type TruckLocationCreateManyTruckInputEnvelope = {
    data: Prisma.TruckLocationCreateManyTruckInput | Prisma.TruckLocationCreateManyTruckInput[];
    skipDuplicates?: boolean;
};
export type TruckLocationUpsertWithWhereUniqueWithoutTruckInput = {
    where: Prisma.TruckLocationWhereUniqueInput;
    update: Prisma.XOR<Prisma.TruckLocationUpdateWithoutTruckInput, Prisma.TruckLocationUncheckedUpdateWithoutTruckInput>;
    create: Prisma.XOR<Prisma.TruckLocationCreateWithoutTruckInput, Prisma.TruckLocationUncheckedCreateWithoutTruckInput>;
};
export type TruckLocationUpdateWithWhereUniqueWithoutTruckInput = {
    where: Prisma.TruckLocationWhereUniqueInput;
    data: Prisma.XOR<Prisma.TruckLocationUpdateWithoutTruckInput, Prisma.TruckLocationUncheckedUpdateWithoutTruckInput>;
};
export type TruckLocationUpdateManyWithWhereWithoutTruckInput = {
    where: Prisma.TruckLocationScalarWhereInput;
    data: Prisma.XOR<Prisma.TruckLocationUpdateManyMutationInput, Prisma.TruckLocationUncheckedUpdateManyWithoutTruckInput>;
};
export type TruckLocationScalarWhereInput = {
    AND?: Prisma.TruckLocationScalarWhereInput | Prisma.TruckLocationScalarWhereInput[];
    OR?: Prisma.TruckLocationScalarWhereInput[];
    NOT?: Prisma.TruckLocationScalarWhereInput | Prisma.TruckLocationScalarWhereInput[];
    id?: Prisma.UuidFilter<"TruckLocation"> | string;
    truckId?: Prisma.UuidFilter<"TruckLocation"> | string;
    lat?: Prisma.FloatFilter<"TruckLocation"> | number;
    lng?: Prisma.FloatFilter<"TruckLocation"> | number;
    timestamp?: Prisma.DateTimeFilter<"TruckLocation"> | Date | string;
};
export type TruckLocationCreateManyTruckInput = {
    id?: string;
    lat: number;
    lng: number;
    timestamp?: Date | string;
};
export type TruckLocationUpdateWithoutTruckInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lat?: Prisma.FloatFieldUpdateOperationsInput | number;
    lng?: Prisma.FloatFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TruckLocationUncheckedUpdateWithoutTruckInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lat?: Prisma.FloatFieldUpdateOperationsInput | number;
    lng?: Prisma.FloatFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TruckLocationUncheckedUpdateManyWithoutTruckInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lat?: Prisma.FloatFieldUpdateOperationsInput | number;
    lng?: Prisma.FloatFieldUpdateOperationsInput | number;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TruckLocationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    truckId?: boolean;
    lat?: boolean;
    lng?: boolean;
    timestamp?: boolean;
    truck?: boolean | Prisma.TruckDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["truckLocation"]>;
export type TruckLocationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    truckId?: boolean;
    lat?: boolean;
    lng?: boolean;
    timestamp?: boolean;
    truck?: boolean | Prisma.TruckDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["truckLocation"]>;
export type TruckLocationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    truckId?: boolean;
    lat?: boolean;
    lng?: boolean;
    timestamp?: boolean;
    truck?: boolean | Prisma.TruckDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["truckLocation"]>;
export type TruckLocationSelectScalar = {
    id?: boolean;
    truckId?: boolean;
    lat?: boolean;
    lng?: boolean;
    timestamp?: boolean;
};
export type TruckLocationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "truckId" | "lat" | "lng" | "timestamp", ExtArgs["result"]["truckLocation"]>;
export type TruckLocationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    truck?: boolean | Prisma.TruckDefaultArgs<ExtArgs>;
};
export type TruckLocationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    truck?: boolean | Prisma.TruckDefaultArgs<ExtArgs>;
};
export type TruckLocationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    truck?: boolean | Prisma.TruckDefaultArgs<ExtArgs>;
};
export type $TruckLocationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TruckLocation";
    objects: {
        truck: Prisma.$TruckPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        truckId: string;
        lat: number;
        lng: number;
        timestamp: Date;
    }, ExtArgs["result"]["truckLocation"]>;
    composites: {};
};
export type TruckLocationGetPayload<S extends boolean | null | undefined | TruckLocationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload, S>;
export type TruckLocationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TruckLocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TruckLocationCountAggregateInputType | true;
};
export interface TruckLocationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TruckLocation'];
        meta: {
            name: 'TruckLocation';
        };
    };
    findUnique<T extends TruckLocationFindUniqueArgs>(args: Prisma.SelectSubset<T, TruckLocationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TruckLocationClient<runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TruckLocationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TruckLocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TruckLocationClient<runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TruckLocationFindFirstArgs>(args?: Prisma.SelectSubset<T, TruckLocationFindFirstArgs<ExtArgs>>): Prisma.Prisma__TruckLocationClient<runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TruckLocationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TruckLocationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TruckLocationClient<runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TruckLocationFindManyArgs>(args?: Prisma.SelectSubset<T, TruckLocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TruckLocationCreateArgs>(args: Prisma.SelectSubset<T, TruckLocationCreateArgs<ExtArgs>>): Prisma.Prisma__TruckLocationClient<runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TruckLocationCreateManyArgs>(args?: Prisma.SelectSubset<T, TruckLocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TruckLocationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TruckLocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TruckLocationDeleteArgs>(args: Prisma.SelectSubset<T, TruckLocationDeleteArgs<ExtArgs>>): Prisma.Prisma__TruckLocationClient<runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TruckLocationUpdateArgs>(args: Prisma.SelectSubset<T, TruckLocationUpdateArgs<ExtArgs>>): Prisma.Prisma__TruckLocationClient<runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TruckLocationDeleteManyArgs>(args?: Prisma.SelectSubset<T, TruckLocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TruckLocationUpdateManyArgs>(args: Prisma.SelectSubset<T, TruckLocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TruckLocationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TruckLocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TruckLocationUpsertArgs>(args: Prisma.SelectSubset<T, TruckLocationUpsertArgs<ExtArgs>>): Prisma.Prisma__TruckLocationClient<runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TruckLocationCountArgs>(args?: Prisma.Subset<T, TruckLocationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TruckLocationCountAggregateOutputType> : number>;
    aggregate<T extends TruckLocationAggregateArgs>(args: Prisma.Subset<T, TruckLocationAggregateArgs>): Prisma.PrismaPromise<GetTruckLocationAggregateType<T>>;
    groupBy<T extends TruckLocationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TruckLocationGroupByArgs['orderBy'];
    } : {
        orderBy?: TruckLocationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TruckLocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTruckLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TruckLocationFieldRefs;
}
export interface Prisma__TruckLocationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    truck<T extends Prisma.TruckDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TruckDefaultArgs<ExtArgs>>): Prisma.Prisma__TruckClient<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TruckLocationFieldRefs {
    readonly id: Prisma.FieldRef<"TruckLocation", 'String'>;
    readonly truckId: Prisma.FieldRef<"TruckLocation", 'String'>;
    readonly lat: Prisma.FieldRef<"TruckLocation", 'Float'>;
    readonly lng: Prisma.FieldRef<"TruckLocation", 'Float'>;
    readonly timestamp: Prisma.FieldRef<"TruckLocation", 'DateTime'>;
}
export type TruckLocationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckLocationSelect<ExtArgs> | null;
    omit?: Prisma.TruckLocationOmit<ExtArgs> | null;
    include?: Prisma.TruckLocationInclude<ExtArgs> | null;
    where: Prisma.TruckLocationWhereUniqueInput;
};
export type TruckLocationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckLocationSelect<ExtArgs> | null;
    omit?: Prisma.TruckLocationOmit<ExtArgs> | null;
    include?: Prisma.TruckLocationInclude<ExtArgs> | null;
    where: Prisma.TruckLocationWhereUniqueInput;
};
export type TruckLocationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckLocationSelect<ExtArgs> | null;
    omit?: Prisma.TruckLocationOmit<ExtArgs> | null;
    include?: Prisma.TruckLocationInclude<ExtArgs> | null;
    where?: Prisma.TruckLocationWhereInput;
    orderBy?: Prisma.TruckLocationOrderByWithRelationInput | Prisma.TruckLocationOrderByWithRelationInput[];
    cursor?: Prisma.TruckLocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TruckLocationScalarFieldEnum | Prisma.TruckLocationScalarFieldEnum[];
};
export type TruckLocationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckLocationSelect<ExtArgs> | null;
    omit?: Prisma.TruckLocationOmit<ExtArgs> | null;
    include?: Prisma.TruckLocationInclude<ExtArgs> | null;
    where?: Prisma.TruckLocationWhereInput;
    orderBy?: Prisma.TruckLocationOrderByWithRelationInput | Prisma.TruckLocationOrderByWithRelationInput[];
    cursor?: Prisma.TruckLocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TruckLocationScalarFieldEnum | Prisma.TruckLocationScalarFieldEnum[];
};
export type TruckLocationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckLocationSelect<ExtArgs> | null;
    omit?: Prisma.TruckLocationOmit<ExtArgs> | null;
    include?: Prisma.TruckLocationInclude<ExtArgs> | null;
    where?: Prisma.TruckLocationWhereInput;
    orderBy?: Prisma.TruckLocationOrderByWithRelationInput | Prisma.TruckLocationOrderByWithRelationInput[];
    cursor?: Prisma.TruckLocationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TruckLocationScalarFieldEnum | Prisma.TruckLocationScalarFieldEnum[];
};
export type TruckLocationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckLocationSelect<ExtArgs> | null;
    omit?: Prisma.TruckLocationOmit<ExtArgs> | null;
    include?: Prisma.TruckLocationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TruckLocationCreateInput, Prisma.TruckLocationUncheckedCreateInput>;
};
export type TruckLocationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TruckLocationCreateManyInput | Prisma.TruckLocationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TruckLocationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckLocationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TruckLocationOmit<ExtArgs> | null;
    data: Prisma.TruckLocationCreateManyInput | Prisma.TruckLocationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TruckLocationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TruckLocationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckLocationSelect<ExtArgs> | null;
    omit?: Prisma.TruckLocationOmit<ExtArgs> | null;
    include?: Prisma.TruckLocationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TruckLocationUpdateInput, Prisma.TruckLocationUncheckedUpdateInput>;
    where: Prisma.TruckLocationWhereUniqueInput;
};
export type TruckLocationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TruckLocationUpdateManyMutationInput, Prisma.TruckLocationUncheckedUpdateManyInput>;
    where?: Prisma.TruckLocationWhereInput;
    limit?: number;
};
export type TruckLocationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckLocationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TruckLocationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TruckLocationUpdateManyMutationInput, Prisma.TruckLocationUncheckedUpdateManyInput>;
    where?: Prisma.TruckLocationWhereInput;
    limit?: number;
    include?: Prisma.TruckLocationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TruckLocationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckLocationSelect<ExtArgs> | null;
    omit?: Prisma.TruckLocationOmit<ExtArgs> | null;
    include?: Prisma.TruckLocationInclude<ExtArgs> | null;
    where: Prisma.TruckLocationWhereUniqueInput;
    create: Prisma.XOR<Prisma.TruckLocationCreateInput, Prisma.TruckLocationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TruckLocationUpdateInput, Prisma.TruckLocationUncheckedUpdateInput>;
};
export type TruckLocationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckLocationSelect<ExtArgs> | null;
    omit?: Prisma.TruckLocationOmit<ExtArgs> | null;
    include?: Prisma.TruckLocationInclude<ExtArgs> | null;
    where: Prisma.TruckLocationWhereUniqueInput;
};
export type TruckLocationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TruckLocationWhereInput;
    limit?: number;
};
export type TruckLocationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckLocationSelect<ExtArgs> | null;
    omit?: Prisma.TruckLocationOmit<ExtArgs> | null;
    include?: Prisma.TruckLocationInclude<ExtArgs> | null;
};
export {};
