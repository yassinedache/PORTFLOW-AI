import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ContainerModel = runtime.Types.Result.DefaultSelection<Prisma.$ContainerPayload>;
export type AggregateContainer = {
    _count: ContainerCountAggregateOutputType | null;
    _min: ContainerMinAggregateOutputType | null;
    _max: ContainerMaxAggregateOutputType | null;
};
export type ContainerMinAggregateOutputType = {
    id: string | null;
    containerNumber: string | null;
    carrierId: string | null;
    createdAt: Date | null;
};
export type ContainerMaxAggregateOutputType = {
    id: string | null;
    containerNumber: string | null;
    carrierId: string | null;
    createdAt: Date | null;
};
export type ContainerCountAggregateOutputType = {
    id: number;
    containerNumber: number;
    carrierId: number;
    createdAt: number;
    _all: number;
};
export type ContainerMinAggregateInputType = {
    id?: true;
    containerNumber?: true;
    carrierId?: true;
    createdAt?: true;
};
export type ContainerMaxAggregateInputType = {
    id?: true;
    containerNumber?: true;
    carrierId?: true;
    createdAt?: true;
};
export type ContainerCountAggregateInputType = {
    id?: true;
    containerNumber?: true;
    carrierId?: true;
    createdAt?: true;
    _all?: true;
};
export type ContainerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContainerWhereInput;
    orderBy?: Prisma.ContainerOrderByWithRelationInput | Prisma.ContainerOrderByWithRelationInput[];
    cursor?: Prisma.ContainerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ContainerCountAggregateInputType;
    _min?: ContainerMinAggregateInputType;
    _max?: ContainerMaxAggregateInputType;
};
export type GetContainerAggregateType<T extends ContainerAggregateArgs> = {
    [P in keyof T & keyof AggregateContainer]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateContainer[P]> : Prisma.GetScalarType<T[P], AggregateContainer[P]>;
};
export type ContainerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContainerWhereInput;
    orderBy?: Prisma.ContainerOrderByWithAggregationInput | Prisma.ContainerOrderByWithAggregationInput[];
    by: Prisma.ContainerScalarFieldEnum[] | Prisma.ContainerScalarFieldEnum;
    having?: Prisma.ContainerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ContainerCountAggregateInputType | true;
    _min?: ContainerMinAggregateInputType;
    _max?: ContainerMaxAggregateInputType;
};
export type ContainerGroupByOutputType = {
    id: string;
    containerNumber: string;
    carrierId: string;
    createdAt: Date;
    _count: ContainerCountAggregateOutputType | null;
    _min: ContainerMinAggregateOutputType | null;
    _max: ContainerMaxAggregateOutputType | null;
};
type GetContainerGroupByPayload<T extends ContainerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ContainerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ContainerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ContainerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ContainerGroupByOutputType[P]>;
}>>;
export type ContainerWhereInput = {
    AND?: Prisma.ContainerWhereInput | Prisma.ContainerWhereInput[];
    OR?: Prisma.ContainerWhereInput[];
    NOT?: Prisma.ContainerWhereInput | Prisma.ContainerWhereInput[];
    id?: Prisma.UuidFilter<"Container"> | string;
    containerNumber?: Prisma.StringFilter<"Container"> | string;
    carrierId?: Prisma.UuidFilter<"Container"> | string;
    createdAt?: Prisma.DateTimeFilter<"Container"> | Date | string;
    trackingEvents?: Prisma.TrackingEventListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
};
export type ContainerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    containerNumber?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    trackingEvents?: Prisma.TrackingEventOrderByRelationAggregateInput;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
};
export type ContainerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    containerNumber?: string;
    AND?: Prisma.ContainerWhereInput | Prisma.ContainerWhereInput[];
    OR?: Prisma.ContainerWhereInput[];
    NOT?: Prisma.ContainerWhereInput | Prisma.ContainerWhereInput[];
    carrierId?: Prisma.UuidFilter<"Container"> | string;
    createdAt?: Prisma.DateTimeFilter<"Container"> | Date | string;
    trackingEvents?: Prisma.TrackingEventListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
}, "id" | "containerNumber">;
export type ContainerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    containerNumber?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ContainerCountOrderByAggregateInput;
    _max?: Prisma.ContainerMaxOrderByAggregateInput;
    _min?: Prisma.ContainerMinOrderByAggregateInput;
};
export type ContainerScalarWhereWithAggregatesInput = {
    AND?: Prisma.ContainerScalarWhereWithAggregatesInput | Prisma.ContainerScalarWhereWithAggregatesInput[];
    OR?: Prisma.ContainerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ContainerScalarWhereWithAggregatesInput | Prisma.ContainerScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Container"> | string;
    containerNumber?: Prisma.StringWithAggregatesFilter<"Container"> | string;
    carrierId?: Prisma.UuidWithAggregatesFilter<"Container"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Container"> | Date | string;
};
export type ContainerCreateInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    createdAt?: Date | string;
    trackingEvents?: Prisma.TrackingEventCreateNestedManyWithoutContainerInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutContainerInput;
};
export type ContainerUncheckedCreateInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    createdAt?: Date | string;
    trackingEvents?: Prisma.TrackingEventUncheckedCreateNestedManyWithoutContainerInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutContainerInput;
};
export type ContainerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    trackingEvents?: Prisma.TrackingEventUpdateManyWithoutContainerNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutContainerNestedInput;
};
export type ContainerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    trackingEvents?: Prisma.TrackingEventUncheckedUpdateManyWithoutContainerNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutContainerNestedInput;
};
export type ContainerCreateManyInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    createdAt?: Date | string;
};
export type ContainerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContainerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContainerNullableScalarRelationFilter = {
    is?: Prisma.ContainerWhereInput | null;
    isNot?: Prisma.ContainerWhereInput | null;
};
export type ContainerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    containerNumber?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ContainerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    containerNumber?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ContainerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    containerNumber?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ContainerScalarRelationFilter = {
    is?: Prisma.ContainerWhereInput;
    isNot?: Prisma.ContainerWhereInput;
};
export type ContainerCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.ContainerCreateWithoutBookingsInput, Prisma.ContainerUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ContainerCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.ContainerWhereUniqueInput;
};
export type ContainerUpdateOneWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.ContainerCreateWithoutBookingsInput, Prisma.ContainerUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ContainerCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.ContainerUpsertWithoutBookingsInput;
    disconnect?: Prisma.ContainerWhereInput | boolean;
    delete?: Prisma.ContainerWhereInput | boolean;
    connect?: Prisma.ContainerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ContainerUpdateToOneWithWhereWithoutBookingsInput, Prisma.ContainerUpdateWithoutBookingsInput>, Prisma.ContainerUncheckedUpdateWithoutBookingsInput>;
};
export type ContainerCreateNestedOneWithoutTrackingEventsInput = {
    create?: Prisma.XOR<Prisma.ContainerCreateWithoutTrackingEventsInput, Prisma.ContainerUncheckedCreateWithoutTrackingEventsInput>;
    connectOrCreate?: Prisma.ContainerCreateOrConnectWithoutTrackingEventsInput;
    connect?: Prisma.ContainerWhereUniqueInput;
};
export type ContainerUpdateOneRequiredWithoutTrackingEventsNestedInput = {
    create?: Prisma.XOR<Prisma.ContainerCreateWithoutTrackingEventsInput, Prisma.ContainerUncheckedCreateWithoutTrackingEventsInput>;
    connectOrCreate?: Prisma.ContainerCreateOrConnectWithoutTrackingEventsInput;
    upsert?: Prisma.ContainerUpsertWithoutTrackingEventsInput;
    connect?: Prisma.ContainerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ContainerUpdateToOneWithWhereWithoutTrackingEventsInput, Prisma.ContainerUpdateWithoutTrackingEventsInput>, Prisma.ContainerUncheckedUpdateWithoutTrackingEventsInput>;
};
export type ContainerCreateWithoutBookingsInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    createdAt?: Date | string;
    trackingEvents?: Prisma.TrackingEventCreateNestedManyWithoutContainerInput;
};
export type ContainerUncheckedCreateWithoutBookingsInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    createdAt?: Date | string;
    trackingEvents?: Prisma.TrackingEventUncheckedCreateNestedManyWithoutContainerInput;
};
export type ContainerCreateOrConnectWithoutBookingsInput = {
    where: Prisma.ContainerWhereUniqueInput;
    create: Prisma.XOR<Prisma.ContainerCreateWithoutBookingsInput, Prisma.ContainerUncheckedCreateWithoutBookingsInput>;
};
export type ContainerUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.ContainerUpdateWithoutBookingsInput, Prisma.ContainerUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.ContainerCreateWithoutBookingsInput, Prisma.ContainerUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.ContainerWhereInput;
};
export type ContainerUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.ContainerWhereInput;
    data: Prisma.XOR<Prisma.ContainerUpdateWithoutBookingsInput, Prisma.ContainerUncheckedUpdateWithoutBookingsInput>;
};
export type ContainerUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    trackingEvents?: Prisma.TrackingEventUpdateManyWithoutContainerNestedInput;
};
export type ContainerUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    trackingEvents?: Prisma.TrackingEventUncheckedUpdateManyWithoutContainerNestedInput;
};
export type ContainerCreateWithoutTrackingEventsInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    createdAt?: Date | string;
    bookings?: Prisma.BookingCreateNestedManyWithoutContainerInput;
};
export type ContainerUncheckedCreateWithoutTrackingEventsInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    createdAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutContainerInput;
};
export type ContainerCreateOrConnectWithoutTrackingEventsInput = {
    where: Prisma.ContainerWhereUniqueInput;
    create: Prisma.XOR<Prisma.ContainerCreateWithoutTrackingEventsInput, Prisma.ContainerUncheckedCreateWithoutTrackingEventsInput>;
};
export type ContainerUpsertWithoutTrackingEventsInput = {
    update: Prisma.XOR<Prisma.ContainerUpdateWithoutTrackingEventsInput, Prisma.ContainerUncheckedUpdateWithoutTrackingEventsInput>;
    create: Prisma.XOR<Prisma.ContainerCreateWithoutTrackingEventsInput, Prisma.ContainerUncheckedCreateWithoutTrackingEventsInput>;
    where?: Prisma.ContainerWhereInput;
};
export type ContainerUpdateToOneWithWhereWithoutTrackingEventsInput = {
    where?: Prisma.ContainerWhereInput;
    data: Prisma.XOR<Prisma.ContainerUpdateWithoutTrackingEventsInput, Prisma.ContainerUncheckedUpdateWithoutTrackingEventsInput>;
};
export type ContainerUpdateWithoutTrackingEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUpdateManyWithoutContainerNestedInput;
};
export type ContainerUncheckedUpdateWithoutTrackingEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutContainerNestedInput;
};
export type ContainerCountOutputType = {
    trackingEvents: number;
    bookings: number;
};
export type ContainerCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    trackingEvents?: boolean | ContainerCountOutputTypeCountTrackingEventsArgs;
    bookings?: boolean | ContainerCountOutputTypeCountBookingsArgs;
};
export type ContainerCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerCountOutputTypeSelect<ExtArgs> | null;
};
export type ContainerCountOutputTypeCountTrackingEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TrackingEventWhereInput;
};
export type ContainerCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type ContainerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    containerNumber?: boolean;
    carrierId?: boolean;
    createdAt?: boolean;
    trackingEvents?: boolean | Prisma.Container$trackingEventsArgs<ExtArgs>;
    bookings?: boolean | Prisma.Container$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.ContainerCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["container"]>;
export type ContainerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    containerNumber?: boolean;
    carrierId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["container"]>;
export type ContainerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    containerNumber?: boolean;
    carrierId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["container"]>;
export type ContainerSelectScalar = {
    id?: boolean;
    containerNumber?: boolean;
    carrierId?: boolean;
    createdAt?: boolean;
};
export type ContainerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "containerNumber" | "carrierId" | "createdAt", ExtArgs["result"]["container"]>;
export type ContainerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    trackingEvents?: boolean | Prisma.Container$trackingEventsArgs<ExtArgs>;
    bookings?: boolean | Prisma.Container$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.ContainerCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ContainerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ContainerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ContainerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Container";
    objects: {
        trackingEvents: Prisma.$TrackingEventPayload<ExtArgs>[];
        bookings: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        containerNumber: string;
        carrierId: string;
        createdAt: Date;
    }, ExtArgs["result"]["container"]>;
    composites: {};
};
export type ContainerGetPayload<S extends boolean | null | undefined | ContainerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ContainerPayload, S>;
export type ContainerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ContainerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ContainerCountAggregateInputType | true;
};
export interface ContainerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Container'];
        meta: {
            name: 'Container';
        };
    };
    findUnique<T extends ContainerFindUniqueArgs>(args: Prisma.SelectSubset<T, ContainerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ContainerClient<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ContainerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ContainerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ContainerClient<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ContainerFindFirstArgs>(args?: Prisma.SelectSubset<T, ContainerFindFirstArgs<ExtArgs>>): Prisma.Prisma__ContainerClient<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ContainerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ContainerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ContainerClient<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ContainerFindManyArgs>(args?: Prisma.SelectSubset<T, ContainerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ContainerCreateArgs>(args: Prisma.SelectSubset<T, ContainerCreateArgs<ExtArgs>>): Prisma.Prisma__ContainerClient<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ContainerCreateManyArgs>(args?: Prisma.SelectSubset<T, ContainerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ContainerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ContainerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ContainerDeleteArgs>(args: Prisma.SelectSubset<T, ContainerDeleteArgs<ExtArgs>>): Prisma.Prisma__ContainerClient<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ContainerUpdateArgs>(args: Prisma.SelectSubset<T, ContainerUpdateArgs<ExtArgs>>): Prisma.Prisma__ContainerClient<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ContainerDeleteManyArgs>(args?: Prisma.SelectSubset<T, ContainerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ContainerUpdateManyArgs>(args: Prisma.SelectSubset<T, ContainerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ContainerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ContainerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ContainerUpsertArgs>(args: Prisma.SelectSubset<T, ContainerUpsertArgs<ExtArgs>>): Prisma.Prisma__ContainerClient<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ContainerCountArgs>(args?: Prisma.Subset<T, ContainerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ContainerCountAggregateOutputType> : number>;
    aggregate<T extends ContainerAggregateArgs>(args: Prisma.Subset<T, ContainerAggregateArgs>): Prisma.PrismaPromise<GetContainerAggregateType<T>>;
    groupBy<T extends ContainerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ContainerGroupByArgs['orderBy'];
    } : {
        orderBy?: ContainerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ContainerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContainerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ContainerFieldRefs;
}
export interface Prisma__ContainerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    trackingEvents<T extends Prisma.Container$trackingEventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Container$trackingEventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    bookings<T extends Prisma.Container$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Container$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ContainerFieldRefs {
    readonly id: Prisma.FieldRef<"Container", 'String'>;
    readonly containerNumber: Prisma.FieldRef<"Container", 'String'>;
    readonly carrierId: Prisma.FieldRef<"Container", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Container", 'DateTime'>;
}
export type ContainerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerSelect<ExtArgs> | null;
    omit?: Prisma.ContainerOmit<ExtArgs> | null;
    include?: Prisma.ContainerInclude<ExtArgs> | null;
    where: Prisma.ContainerWhereUniqueInput;
};
export type ContainerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerSelect<ExtArgs> | null;
    omit?: Prisma.ContainerOmit<ExtArgs> | null;
    include?: Prisma.ContainerInclude<ExtArgs> | null;
    where: Prisma.ContainerWhereUniqueInput;
};
export type ContainerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ContainerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ContainerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ContainerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerSelect<ExtArgs> | null;
    omit?: Prisma.ContainerOmit<ExtArgs> | null;
    include?: Prisma.ContainerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ContainerCreateInput, Prisma.ContainerUncheckedCreateInput>;
};
export type ContainerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ContainerCreateManyInput | Prisma.ContainerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ContainerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ContainerOmit<ExtArgs> | null;
    data: Prisma.ContainerCreateManyInput | Prisma.ContainerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ContainerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerSelect<ExtArgs> | null;
    omit?: Prisma.ContainerOmit<ExtArgs> | null;
    include?: Prisma.ContainerInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ContainerUpdateInput, Prisma.ContainerUncheckedUpdateInput>;
    where: Prisma.ContainerWhereUniqueInput;
};
export type ContainerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ContainerUpdateManyMutationInput, Prisma.ContainerUncheckedUpdateManyInput>;
    where?: Prisma.ContainerWhereInput;
    limit?: number;
};
export type ContainerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ContainerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ContainerUpdateManyMutationInput, Prisma.ContainerUncheckedUpdateManyInput>;
    where?: Prisma.ContainerWhereInput;
    limit?: number;
};
export type ContainerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerSelect<ExtArgs> | null;
    omit?: Prisma.ContainerOmit<ExtArgs> | null;
    include?: Prisma.ContainerInclude<ExtArgs> | null;
    where: Prisma.ContainerWhereUniqueInput;
    create: Prisma.XOR<Prisma.ContainerCreateInput, Prisma.ContainerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ContainerUpdateInput, Prisma.ContainerUncheckedUpdateInput>;
};
export type ContainerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerSelect<ExtArgs> | null;
    omit?: Prisma.ContainerOmit<ExtArgs> | null;
    include?: Prisma.ContainerInclude<ExtArgs> | null;
    where: Prisma.ContainerWhereUniqueInput;
};
export type ContainerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ContainerWhereInput;
    limit?: number;
};
export type Container$trackingEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Container$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ContainerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerSelect<ExtArgs> | null;
    omit?: Prisma.ContainerOmit<ExtArgs> | null;
    include?: Prisma.ContainerInclude<ExtArgs> | null;
};
export {};
