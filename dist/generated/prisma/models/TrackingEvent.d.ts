import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TrackingEventModel = runtime.Types.Result.DefaultSelection<Prisma.$TrackingEventPayload>;
export type AggregateTrackingEvent = {
    _count: TrackingEventCountAggregateOutputType | null;
    _min: TrackingEventMinAggregateOutputType | null;
    _max: TrackingEventMaxAggregateOutputType | null;
};
export type TrackingEventMinAggregateOutputType = {
    id: string | null;
    containerId: string | null;
    type: $Enums.TrackingEventType | null;
    location: string | null;
    timestamp: Date | null;
};
export type TrackingEventMaxAggregateOutputType = {
    id: string | null;
    containerId: string | null;
    type: $Enums.TrackingEventType | null;
    location: string | null;
    timestamp: Date | null;
};
export type TrackingEventCountAggregateOutputType = {
    id: number;
    containerId: number;
    type: number;
    location: number;
    timestamp: number;
    _all: number;
};
export type TrackingEventMinAggregateInputType = {
    id?: true;
    containerId?: true;
    type?: true;
    location?: true;
    timestamp?: true;
};
export type TrackingEventMaxAggregateInputType = {
    id?: true;
    containerId?: true;
    type?: true;
    location?: true;
    timestamp?: true;
};
export type TrackingEventCountAggregateInputType = {
    id?: true;
    containerId?: true;
    type?: true;
    location?: true;
    timestamp?: true;
    _all?: true;
};
export type TrackingEventAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackingEventWhereInput;
    orderBy?: Prisma.TrackingEventOrderByWithRelationInput | Prisma.TrackingEventOrderByWithRelationInput[];
    cursor?: Prisma.TrackingEventWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TrackingEventCountAggregateInputType;
    _min?: TrackingEventMinAggregateInputType;
    _max?: TrackingEventMaxAggregateInputType;
};
export type GetTrackingEventAggregateType<T extends TrackingEventAggregateArgs> = {
    [P in keyof T & keyof AggregateTrackingEvent]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTrackingEvent[P]> : Prisma.GetScalarType<T[P], AggregateTrackingEvent[P]>;
};
export type TrackingEventGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackingEventWhereInput;
    orderBy?: Prisma.TrackingEventOrderByWithAggregationInput | Prisma.TrackingEventOrderByWithAggregationInput[];
    by: Prisma.TrackingEventScalarFieldEnum[] | Prisma.TrackingEventScalarFieldEnum;
    having?: Prisma.TrackingEventScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TrackingEventCountAggregateInputType | true;
    _min?: TrackingEventMinAggregateInputType;
    _max?: TrackingEventMaxAggregateInputType;
};
export type TrackingEventGroupByOutputType = {
    id: string;
    containerId: string;
    type: $Enums.TrackingEventType;
    location: string;
    timestamp: Date;
    _count: TrackingEventCountAggregateOutputType | null;
    _min: TrackingEventMinAggregateOutputType | null;
    _max: TrackingEventMaxAggregateOutputType | null;
};
type GetTrackingEventGroupByPayload<T extends TrackingEventGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TrackingEventGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TrackingEventGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TrackingEventGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TrackingEventGroupByOutputType[P]>;
}>>;
export type TrackingEventWhereInput = {
    AND?: Prisma.TrackingEventWhereInput | Prisma.TrackingEventWhereInput[];
    OR?: Prisma.TrackingEventWhereInput[];
    NOT?: Prisma.TrackingEventWhereInput | Prisma.TrackingEventWhereInput[];
    id?: Prisma.UuidFilter<"TrackingEvent"> | string;
    containerId?: Prisma.UuidFilter<"TrackingEvent"> | string;
    type?: Prisma.EnumTrackingEventTypeFilter<"TrackingEvent"> | $Enums.TrackingEventType;
    location?: Prisma.StringFilter<"TrackingEvent"> | string;
    timestamp?: Prisma.DateTimeFilter<"TrackingEvent"> | Date | string;
    container?: Prisma.XOR<Prisma.ContainerScalarRelationFilter, Prisma.ContainerWhereInput>;
};
export type TrackingEventOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    container?: Prisma.ContainerOrderByWithRelationInput;
};
export type TrackingEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.TrackingEventWhereInput | Prisma.TrackingEventWhereInput[];
    OR?: Prisma.TrackingEventWhereInput[];
    NOT?: Prisma.TrackingEventWhereInput | Prisma.TrackingEventWhereInput[];
    containerId?: Prisma.UuidFilter<"TrackingEvent"> | string;
    type?: Prisma.EnumTrackingEventTypeFilter<"TrackingEvent"> | $Enums.TrackingEventType;
    location?: Prisma.StringFilter<"TrackingEvent"> | string;
    timestamp?: Prisma.DateTimeFilter<"TrackingEvent"> | Date | string;
    container?: Prisma.XOR<Prisma.ContainerScalarRelationFilter, Prisma.ContainerWhereInput>;
}, "id">;
export type TrackingEventOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
    _count?: Prisma.TrackingEventCountOrderByAggregateInput;
    _max?: Prisma.TrackingEventMaxOrderByAggregateInput;
    _min?: Prisma.TrackingEventMinOrderByAggregateInput;
};
export type TrackingEventScalarWhereWithAggregatesInput = {
    AND?: Prisma.TrackingEventScalarWhereWithAggregatesInput | Prisma.TrackingEventScalarWhereWithAggregatesInput[];
    OR?: Prisma.TrackingEventScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TrackingEventScalarWhereWithAggregatesInput | Prisma.TrackingEventScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"TrackingEvent"> | string;
    containerId?: Prisma.UuidWithAggregatesFilter<"TrackingEvent"> | string;
    type?: Prisma.EnumTrackingEventTypeWithAggregatesFilter<"TrackingEvent"> | $Enums.TrackingEventType;
    location?: Prisma.StringWithAggregatesFilter<"TrackingEvent"> | string;
    timestamp?: Prisma.DateTimeWithAggregatesFilter<"TrackingEvent"> | Date | string;
};
export type TrackingEventCreateInput = {
    id?: string;
    type: $Enums.TrackingEventType;
    location: string;
    timestamp?: Date | string;
    container: Prisma.ContainerCreateNestedOneWithoutTrackingEventsInput;
};
export type TrackingEventUncheckedCreateInput = {
    id?: string;
    containerId: string;
    type: $Enums.TrackingEventType;
    location: string;
    timestamp?: Date | string;
};
export type TrackingEventUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTrackingEventTypeFieldUpdateOperationsInput | $Enums.TrackingEventType;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    container?: Prisma.ContainerUpdateOneRequiredWithoutTrackingEventsNestedInput;
};
export type TrackingEventUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTrackingEventTypeFieldUpdateOperationsInput | $Enums.TrackingEventType;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrackingEventCreateManyInput = {
    id?: string;
    containerId: string;
    type: $Enums.TrackingEventType;
    location: string;
    timestamp?: Date | string;
};
export type TrackingEventUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTrackingEventTypeFieldUpdateOperationsInput | $Enums.TrackingEventType;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrackingEventUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTrackingEventTypeFieldUpdateOperationsInput | $Enums.TrackingEventType;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrackingEventListRelationFilter = {
    every?: Prisma.TrackingEventWhereInput;
    some?: Prisma.TrackingEventWhereInput;
    none?: Prisma.TrackingEventWhereInput;
};
export type TrackingEventOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TrackingEventCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
};
export type TrackingEventMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
};
export type TrackingEventMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    timestamp?: Prisma.SortOrder;
};
export type TrackingEventCreateNestedManyWithoutContainerInput = {
    create?: Prisma.XOR<Prisma.TrackingEventCreateWithoutContainerInput, Prisma.TrackingEventUncheckedCreateWithoutContainerInput> | Prisma.TrackingEventCreateWithoutContainerInput[] | Prisma.TrackingEventUncheckedCreateWithoutContainerInput[];
    connectOrCreate?: Prisma.TrackingEventCreateOrConnectWithoutContainerInput | Prisma.TrackingEventCreateOrConnectWithoutContainerInput[];
    createMany?: Prisma.TrackingEventCreateManyContainerInputEnvelope;
    connect?: Prisma.TrackingEventWhereUniqueInput | Prisma.TrackingEventWhereUniqueInput[];
};
export type TrackingEventUncheckedCreateNestedManyWithoutContainerInput = {
    create?: Prisma.XOR<Prisma.TrackingEventCreateWithoutContainerInput, Prisma.TrackingEventUncheckedCreateWithoutContainerInput> | Prisma.TrackingEventCreateWithoutContainerInput[] | Prisma.TrackingEventUncheckedCreateWithoutContainerInput[];
    connectOrCreate?: Prisma.TrackingEventCreateOrConnectWithoutContainerInput | Prisma.TrackingEventCreateOrConnectWithoutContainerInput[];
    createMany?: Prisma.TrackingEventCreateManyContainerInputEnvelope;
    connect?: Prisma.TrackingEventWhereUniqueInput | Prisma.TrackingEventWhereUniqueInput[];
};
export type TrackingEventUpdateManyWithoutContainerNestedInput = {
    create?: Prisma.XOR<Prisma.TrackingEventCreateWithoutContainerInput, Prisma.TrackingEventUncheckedCreateWithoutContainerInput> | Prisma.TrackingEventCreateWithoutContainerInput[] | Prisma.TrackingEventUncheckedCreateWithoutContainerInput[];
    connectOrCreate?: Prisma.TrackingEventCreateOrConnectWithoutContainerInput | Prisma.TrackingEventCreateOrConnectWithoutContainerInput[];
    upsert?: Prisma.TrackingEventUpsertWithWhereUniqueWithoutContainerInput | Prisma.TrackingEventUpsertWithWhereUniqueWithoutContainerInput[];
    createMany?: Prisma.TrackingEventCreateManyContainerInputEnvelope;
    set?: Prisma.TrackingEventWhereUniqueInput | Prisma.TrackingEventWhereUniqueInput[];
    disconnect?: Prisma.TrackingEventWhereUniqueInput | Prisma.TrackingEventWhereUniqueInput[];
    delete?: Prisma.TrackingEventWhereUniqueInput | Prisma.TrackingEventWhereUniqueInput[];
    connect?: Prisma.TrackingEventWhereUniqueInput | Prisma.TrackingEventWhereUniqueInput[];
    update?: Prisma.TrackingEventUpdateWithWhereUniqueWithoutContainerInput | Prisma.TrackingEventUpdateWithWhereUniqueWithoutContainerInput[];
    updateMany?: Prisma.TrackingEventUpdateManyWithWhereWithoutContainerInput | Prisma.TrackingEventUpdateManyWithWhereWithoutContainerInput[];
    deleteMany?: Prisma.TrackingEventScalarWhereInput | Prisma.TrackingEventScalarWhereInput[];
};
export type TrackingEventUncheckedUpdateManyWithoutContainerNestedInput = {
    create?: Prisma.XOR<Prisma.TrackingEventCreateWithoutContainerInput, Prisma.TrackingEventUncheckedCreateWithoutContainerInput> | Prisma.TrackingEventCreateWithoutContainerInput[] | Prisma.TrackingEventUncheckedCreateWithoutContainerInput[];
    connectOrCreate?: Prisma.TrackingEventCreateOrConnectWithoutContainerInput | Prisma.TrackingEventCreateOrConnectWithoutContainerInput[];
    upsert?: Prisma.TrackingEventUpsertWithWhereUniqueWithoutContainerInput | Prisma.TrackingEventUpsertWithWhereUniqueWithoutContainerInput[];
    createMany?: Prisma.TrackingEventCreateManyContainerInputEnvelope;
    set?: Prisma.TrackingEventWhereUniqueInput | Prisma.TrackingEventWhereUniqueInput[];
    disconnect?: Prisma.TrackingEventWhereUniqueInput | Prisma.TrackingEventWhereUniqueInput[];
    delete?: Prisma.TrackingEventWhereUniqueInput | Prisma.TrackingEventWhereUniqueInput[];
    connect?: Prisma.TrackingEventWhereUniqueInput | Prisma.TrackingEventWhereUniqueInput[];
    update?: Prisma.TrackingEventUpdateWithWhereUniqueWithoutContainerInput | Prisma.TrackingEventUpdateWithWhereUniqueWithoutContainerInput[];
    updateMany?: Prisma.TrackingEventUpdateManyWithWhereWithoutContainerInput | Prisma.TrackingEventUpdateManyWithWhereWithoutContainerInput[];
    deleteMany?: Prisma.TrackingEventScalarWhereInput | Prisma.TrackingEventScalarWhereInput[];
};
export type EnumTrackingEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.TrackingEventType;
};
export type TrackingEventCreateWithoutContainerInput = {
    id?: string;
    type: $Enums.TrackingEventType;
    location: string;
    timestamp?: Date | string;
};
export type TrackingEventUncheckedCreateWithoutContainerInput = {
    id?: string;
    type: $Enums.TrackingEventType;
    location: string;
    timestamp?: Date | string;
};
export type TrackingEventCreateOrConnectWithoutContainerInput = {
    where: Prisma.TrackingEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrackingEventCreateWithoutContainerInput, Prisma.TrackingEventUncheckedCreateWithoutContainerInput>;
};
export type TrackingEventCreateManyContainerInputEnvelope = {
    data: Prisma.TrackingEventCreateManyContainerInput | Prisma.TrackingEventCreateManyContainerInput[];
    skipDuplicates?: boolean;
};
export type TrackingEventUpsertWithWhereUniqueWithoutContainerInput = {
    where: Prisma.TrackingEventWhereUniqueInput;
    update: Prisma.XOR<Prisma.TrackingEventUpdateWithoutContainerInput, Prisma.TrackingEventUncheckedUpdateWithoutContainerInput>;
    create: Prisma.XOR<Prisma.TrackingEventCreateWithoutContainerInput, Prisma.TrackingEventUncheckedCreateWithoutContainerInput>;
};
export type TrackingEventUpdateWithWhereUniqueWithoutContainerInput = {
    where: Prisma.TrackingEventWhereUniqueInput;
    data: Prisma.XOR<Prisma.TrackingEventUpdateWithoutContainerInput, Prisma.TrackingEventUncheckedUpdateWithoutContainerInput>;
};
export type TrackingEventUpdateManyWithWhereWithoutContainerInput = {
    where: Prisma.TrackingEventScalarWhereInput;
    data: Prisma.XOR<Prisma.TrackingEventUpdateManyMutationInput, Prisma.TrackingEventUncheckedUpdateManyWithoutContainerInput>;
};
export type TrackingEventScalarWhereInput = {
    AND?: Prisma.TrackingEventScalarWhereInput | Prisma.TrackingEventScalarWhereInput[];
    OR?: Prisma.TrackingEventScalarWhereInput[];
    NOT?: Prisma.TrackingEventScalarWhereInput | Prisma.TrackingEventScalarWhereInput[];
    id?: Prisma.UuidFilter<"TrackingEvent"> | string;
    containerId?: Prisma.UuidFilter<"TrackingEvent"> | string;
    type?: Prisma.EnumTrackingEventTypeFilter<"TrackingEvent"> | $Enums.TrackingEventType;
    location?: Prisma.StringFilter<"TrackingEvent"> | string;
    timestamp?: Prisma.DateTimeFilter<"TrackingEvent"> | Date | string;
};
export type TrackingEventCreateManyContainerInput = {
    id?: string;
    type: $Enums.TrackingEventType;
    location: string;
    timestamp?: Date | string;
};
export type TrackingEventUpdateWithoutContainerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTrackingEventTypeFieldUpdateOperationsInput | $Enums.TrackingEventType;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrackingEventUncheckedUpdateWithoutContainerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTrackingEventTypeFieldUpdateOperationsInput | $Enums.TrackingEventType;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrackingEventUncheckedUpdateManyWithoutContainerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTrackingEventTypeFieldUpdateOperationsInput | $Enums.TrackingEventType;
    location?: Prisma.StringFieldUpdateOperationsInput | string;
    timestamp?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TrackingEventSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    containerId?: boolean;
    type?: boolean;
    location?: boolean;
    timestamp?: boolean;
    container?: boolean | Prisma.ContainerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trackingEvent"]>;
export type TrackingEventSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    containerId?: boolean;
    type?: boolean;
    location?: boolean;
    timestamp?: boolean;
    container?: boolean | Prisma.ContainerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trackingEvent"]>;
export type TrackingEventSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    containerId?: boolean;
    type?: boolean;
    location?: boolean;
    timestamp?: boolean;
    container?: boolean | Prisma.ContainerDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["trackingEvent"]>;
export type TrackingEventSelectScalar = {
    id?: boolean;
    containerId?: boolean;
    type?: boolean;
    location?: boolean;
    timestamp?: boolean;
};
export type TrackingEventOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "containerId" | "type" | "location" | "timestamp", ExtArgs["result"]["trackingEvent"]>;
export type TrackingEventInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    container?: boolean | Prisma.ContainerDefaultArgs<ExtArgs>;
};
export type TrackingEventIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    container?: boolean | Prisma.ContainerDefaultArgs<ExtArgs>;
};
export type TrackingEventIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    container?: boolean | Prisma.ContainerDefaultArgs<ExtArgs>;
};
export type $TrackingEventPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TrackingEvent";
    objects: {
        container: Prisma.$ContainerPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        containerId: string;
        type: $Enums.TrackingEventType;
        location: string;
        timestamp: Date;
    }, ExtArgs["result"]["trackingEvent"]>;
    composites: {};
};
export type TrackingEventGetPayload<S extends boolean | null | undefined | TrackingEventDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload, S>;
export type TrackingEventCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TrackingEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TrackingEventCountAggregateInputType | true;
};
export interface TrackingEventDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TrackingEvent'];
        meta: {
            name: 'TrackingEvent';
        };
    };
    findUnique<T extends TrackingEventFindUniqueArgs>(args: Prisma.SelectSubset<T, TrackingEventFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TrackingEventClient<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TrackingEventFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TrackingEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TrackingEventClient<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TrackingEventFindFirstArgs>(args?: Prisma.SelectSubset<T, TrackingEventFindFirstArgs<ExtArgs>>): Prisma.Prisma__TrackingEventClient<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TrackingEventFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TrackingEventFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TrackingEventClient<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TrackingEventFindManyArgs>(args?: Prisma.SelectSubset<T, TrackingEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TrackingEventCreateArgs>(args: Prisma.SelectSubset<T, TrackingEventCreateArgs<ExtArgs>>): Prisma.Prisma__TrackingEventClient<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TrackingEventCreateManyArgs>(args?: Prisma.SelectSubset<T, TrackingEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TrackingEventCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TrackingEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TrackingEventDeleteArgs>(args: Prisma.SelectSubset<T, TrackingEventDeleteArgs<ExtArgs>>): Prisma.Prisma__TrackingEventClient<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TrackingEventUpdateArgs>(args: Prisma.SelectSubset<T, TrackingEventUpdateArgs<ExtArgs>>): Prisma.Prisma__TrackingEventClient<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TrackingEventDeleteManyArgs>(args?: Prisma.SelectSubset<T, TrackingEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TrackingEventUpdateManyArgs>(args: Prisma.SelectSubset<T, TrackingEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TrackingEventUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TrackingEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TrackingEventUpsertArgs>(args: Prisma.SelectSubset<T, TrackingEventUpsertArgs<ExtArgs>>): Prisma.Prisma__TrackingEventClient<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TrackingEventCountArgs>(args?: Prisma.Subset<T, TrackingEventCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TrackingEventCountAggregateOutputType> : number>;
    aggregate<T extends TrackingEventAggregateArgs>(args: Prisma.Subset<T, TrackingEventAggregateArgs>): Prisma.PrismaPromise<GetTrackingEventAggregateType<T>>;
    groupBy<T extends TrackingEventGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TrackingEventGroupByArgs['orderBy'];
    } : {
        orderBy?: TrackingEventGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TrackingEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackingEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TrackingEventFieldRefs;
}
export interface Prisma__TrackingEventClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    container<T extends Prisma.ContainerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ContainerDefaultArgs<ExtArgs>>): Prisma.Prisma__ContainerClient<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TrackingEventFieldRefs {
    readonly id: Prisma.FieldRef<"TrackingEvent", 'String'>;
    readonly containerId: Prisma.FieldRef<"TrackingEvent", 'String'>;
    readonly type: Prisma.FieldRef<"TrackingEvent", 'TrackingEventType'>;
    readonly location: Prisma.FieldRef<"TrackingEvent", 'String'>;
    readonly timestamp: Prisma.FieldRef<"TrackingEvent", 'DateTime'>;
}
export type TrackingEventFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackingEventSelect<ExtArgs> | null;
    omit?: Prisma.TrackingEventOmit<ExtArgs> | null;
    include?: Prisma.TrackingEventInclude<ExtArgs> | null;
    where: Prisma.TrackingEventWhereUniqueInput;
};
export type TrackingEventFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackingEventSelect<ExtArgs> | null;
    omit?: Prisma.TrackingEventOmit<ExtArgs> | null;
    include?: Prisma.TrackingEventInclude<ExtArgs> | null;
    where: Prisma.TrackingEventWhereUniqueInput;
};
export type TrackingEventFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackingEventSelect<ExtArgs> | null;
    omit?: Prisma.TrackingEventOmit<ExtArgs> | null;
    include?: Prisma.TrackingEventInclude<ExtArgs> | null;
    where?: Prisma.TrackingEventWhereInput;
    orderBy?: Prisma.TrackingEventOrderByWithRelationInput | Prisma.TrackingEventOrderByWithRelationInput[];
    cursor?: Prisma.TrackingEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TrackingEventScalarFieldEnum | Prisma.TrackingEventScalarFieldEnum[];
};
export type TrackingEventFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackingEventSelect<ExtArgs> | null;
    omit?: Prisma.TrackingEventOmit<ExtArgs> | null;
    include?: Prisma.TrackingEventInclude<ExtArgs> | null;
    where?: Prisma.TrackingEventWhereInput;
    orderBy?: Prisma.TrackingEventOrderByWithRelationInput | Prisma.TrackingEventOrderByWithRelationInput[];
    cursor?: Prisma.TrackingEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TrackingEventScalarFieldEnum | Prisma.TrackingEventScalarFieldEnum[];
};
export type TrackingEventFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackingEventSelect<ExtArgs> | null;
    omit?: Prisma.TrackingEventOmit<ExtArgs> | null;
    include?: Prisma.TrackingEventInclude<ExtArgs> | null;
    where?: Prisma.TrackingEventWhereInput;
    orderBy?: Prisma.TrackingEventOrderByWithRelationInput | Prisma.TrackingEventOrderByWithRelationInput[];
    cursor?: Prisma.TrackingEventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TrackingEventScalarFieldEnum | Prisma.TrackingEventScalarFieldEnum[];
};
export type TrackingEventCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackingEventSelect<ExtArgs> | null;
    omit?: Prisma.TrackingEventOmit<ExtArgs> | null;
    include?: Prisma.TrackingEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrackingEventCreateInput, Prisma.TrackingEventUncheckedCreateInput>;
};
export type TrackingEventCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TrackingEventCreateManyInput | Prisma.TrackingEventCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TrackingEventCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackingEventSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TrackingEventOmit<ExtArgs> | null;
    data: Prisma.TrackingEventCreateManyInput | Prisma.TrackingEventCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.TrackingEventIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type TrackingEventUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackingEventSelect<ExtArgs> | null;
    omit?: Prisma.TrackingEventOmit<ExtArgs> | null;
    include?: Prisma.TrackingEventInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrackingEventUpdateInput, Prisma.TrackingEventUncheckedUpdateInput>;
    where: Prisma.TrackingEventWhereUniqueInput;
};
export type TrackingEventUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TrackingEventUpdateManyMutationInput, Prisma.TrackingEventUncheckedUpdateManyInput>;
    where?: Prisma.TrackingEventWhereInput;
    limit?: number;
};
export type TrackingEventUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackingEventSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TrackingEventOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TrackingEventUpdateManyMutationInput, Prisma.TrackingEventUncheckedUpdateManyInput>;
    where?: Prisma.TrackingEventWhereInput;
    limit?: number;
    include?: Prisma.TrackingEventIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type TrackingEventUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackingEventSelect<ExtArgs> | null;
    omit?: Prisma.TrackingEventOmit<ExtArgs> | null;
    include?: Prisma.TrackingEventInclude<ExtArgs> | null;
    where: Prisma.TrackingEventWhereUniqueInput;
    create: Prisma.XOR<Prisma.TrackingEventCreateInput, Prisma.TrackingEventUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TrackingEventUpdateInput, Prisma.TrackingEventUncheckedUpdateInput>;
};
export type TrackingEventDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackingEventSelect<ExtArgs> | null;
    omit?: Prisma.TrackingEventOmit<ExtArgs> | null;
    include?: Prisma.TrackingEventInclude<ExtArgs> | null;
    where: Prisma.TrackingEventWhereUniqueInput;
};
export type TrackingEventDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackingEventWhereInput;
    limit?: number;
};
export type TrackingEventDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TrackingEventSelect<ExtArgs> | null;
    omit?: Prisma.TrackingEventOmit<ExtArgs> | null;
    include?: Prisma.TrackingEventInclude<ExtArgs> | null;
};
export {};
