import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TruckModel = runtime.Types.Result.DefaultSelection<Prisma.$TruckPayload>;
export type AggregateTruck = {
    _count: TruckCountAggregateOutputType | null;
    _min: TruckMinAggregateOutputType | null;
    _max: TruckMaxAggregateOutputType | null;
};
export type TruckMinAggregateOutputType = {
    id: string | null;
    plate: string | null;
    carrierId: string | null;
    createdAt: Date | null;
};
export type TruckMaxAggregateOutputType = {
    id: string | null;
    plate: string | null;
    carrierId: string | null;
    createdAt: Date | null;
};
export type TruckCountAggregateOutputType = {
    id: number;
    plate: number;
    carrierId: number;
    createdAt: number;
    _all: number;
};
export type TruckMinAggregateInputType = {
    id?: true;
    plate?: true;
    carrierId?: true;
    createdAt?: true;
};
export type TruckMaxAggregateInputType = {
    id?: true;
    plate?: true;
    carrierId?: true;
    createdAt?: true;
};
export type TruckCountAggregateInputType = {
    id?: true;
    plate?: true;
    carrierId?: true;
    createdAt?: true;
    _all?: true;
};
export type TruckAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TruckWhereInput;
    orderBy?: Prisma.TruckOrderByWithRelationInput | Prisma.TruckOrderByWithRelationInput[];
    cursor?: Prisma.TruckWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TruckCountAggregateInputType;
    _min?: TruckMinAggregateInputType;
    _max?: TruckMaxAggregateInputType;
};
export type GetTruckAggregateType<T extends TruckAggregateArgs> = {
    [P in keyof T & keyof AggregateTruck]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTruck[P]> : Prisma.GetScalarType<T[P], AggregateTruck[P]>;
};
export type TruckGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TruckWhereInput;
    orderBy?: Prisma.TruckOrderByWithAggregationInput | Prisma.TruckOrderByWithAggregationInput[];
    by: Prisma.TruckScalarFieldEnum[] | Prisma.TruckScalarFieldEnum;
    having?: Prisma.TruckScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TruckCountAggregateInputType | true;
    _min?: TruckMinAggregateInputType;
    _max?: TruckMaxAggregateInputType;
};
export type TruckGroupByOutputType = {
    id: string;
    plate: string;
    carrierId: string;
    createdAt: Date;
    _count: TruckCountAggregateOutputType | null;
    _min: TruckMinAggregateOutputType | null;
    _max: TruckMaxAggregateOutputType | null;
};
type GetTruckGroupByPayload<T extends TruckGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TruckGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TruckGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TruckGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TruckGroupByOutputType[P]>;
}>>;
export type TruckWhereInput = {
    AND?: Prisma.TruckWhereInput | Prisma.TruckWhereInput[];
    OR?: Prisma.TruckWhereInput[];
    NOT?: Prisma.TruckWhereInput | Prisma.TruckWhereInput[];
    id?: Prisma.UuidFilter<"Truck"> | string;
    plate?: Prisma.StringFilter<"Truck"> | string;
    carrierId?: Prisma.UuidFilter<"Truck"> | string;
    createdAt?: Prisma.DateTimeFilter<"Truck"> | Date | string;
    locations?: Prisma.TruckLocationListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
};
export type TruckOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    plate?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    locations?: Prisma.TruckLocationOrderByRelationAggregateInput;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
};
export type TruckWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    plate?: string;
    AND?: Prisma.TruckWhereInput | Prisma.TruckWhereInput[];
    OR?: Prisma.TruckWhereInput[];
    NOT?: Prisma.TruckWhereInput | Prisma.TruckWhereInput[];
    carrierId?: Prisma.UuidFilter<"Truck"> | string;
    createdAt?: Prisma.DateTimeFilter<"Truck"> | Date | string;
    locations?: Prisma.TruckLocationListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
}, "id" | "plate">;
export type TruckOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    plate?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TruckCountOrderByAggregateInput;
    _max?: Prisma.TruckMaxOrderByAggregateInput;
    _min?: Prisma.TruckMinOrderByAggregateInput;
};
export type TruckScalarWhereWithAggregatesInput = {
    AND?: Prisma.TruckScalarWhereWithAggregatesInput | Prisma.TruckScalarWhereWithAggregatesInput[];
    OR?: Prisma.TruckScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TruckScalarWhereWithAggregatesInput | Prisma.TruckScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Truck"> | string;
    plate?: Prisma.StringWithAggregatesFilter<"Truck"> | string;
    carrierId?: Prisma.UuidWithAggregatesFilter<"Truck"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Truck"> | Date | string;
};
export type TruckCreateInput = {
    id?: string;
    plate: string;
    carrierId: string;
    createdAt?: Date | string;
    locations?: Prisma.TruckLocationCreateNestedManyWithoutTruckInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutTruckInput;
};
export type TruckUncheckedCreateInput = {
    id?: string;
    plate: string;
    carrierId: string;
    createdAt?: Date | string;
    locations?: Prisma.TruckLocationUncheckedCreateNestedManyWithoutTruckInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutTruckInput;
};
export type TruckUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locations?: Prisma.TruckLocationUpdateManyWithoutTruckNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutTruckNestedInput;
};
export type TruckUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locations?: Prisma.TruckLocationUncheckedUpdateManyWithoutTruckNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutTruckNestedInput;
};
export type TruckCreateManyInput = {
    id?: string;
    plate: string;
    carrierId: string;
    createdAt?: Date | string;
};
export type TruckUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TruckUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TruckNullableScalarRelationFilter = {
    is?: Prisma.TruckWhereInput | null;
    isNot?: Prisma.TruckWhereInput | null;
};
export type TruckCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    plate?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TruckMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    plate?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TruckMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    plate?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TruckScalarRelationFilter = {
    is?: Prisma.TruckWhereInput;
    isNot?: Prisma.TruckWhereInput;
};
export type TruckCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.TruckCreateWithoutBookingsInput, Prisma.TruckUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.TruckCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.TruckWhereUniqueInput;
};
export type TruckUpdateOneWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.TruckCreateWithoutBookingsInput, Prisma.TruckUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.TruckCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.TruckUpsertWithoutBookingsInput;
    disconnect?: Prisma.TruckWhereInput | boolean;
    delete?: Prisma.TruckWhereInput | boolean;
    connect?: Prisma.TruckWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TruckUpdateToOneWithWhereWithoutBookingsInput, Prisma.TruckUpdateWithoutBookingsInput>, Prisma.TruckUncheckedUpdateWithoutBookingsInput>;
};
export type TruckCreateNestedOneWithoutLocationsInput = {
    create?: Prisma.XOR<Prisma.TruckCreateWithoutLocationsInput, Prisma.TruckUncheckedCreateWithoutLocationsInput>;
    connectOrCreate?: Prisma.TruckCreateOrConnectWithoutLocationsInput;
    connect?: Prisma.TruckWhereUniqueInput;
};
export type TruckUpdateOneRequiredWithoutLocationsNestedInput = {
    create?: Prisma.XOR<Prisma.TruckCreateWithoutLocationsInput, Prisma.TruckUncheckedCreateWithoutLocationsInput>;
    connectOrCreate?: Prisma.TruckCreateOrConnectWithoutLocationsInput;
    upsert?: Prisma.TruckUpsertWithoutLocationsInput;
    connect?: Prisma.TruckWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TruckUpdateToOneWithWhereWithoutLocationsInput, Prisma.TruckUpdateWithoutLocationsInput>, Prisma.TruckUncheckedUpdateWithoutLocationsInput>;
};
export type TruckCreateWithoutBookingsInput = {
    id?: string;
    plate: string;
    carrierId: string;
    createdAt?: Date | string;
    locations?: Prisma.TruckLocationCreateNestedManyWithoutTruckInput;
};
export type TruckUncheckedCreateWithoutBookingsInput = {
    id?: string;
    plate: string;
    carrierId: string;
    createdAt?: Date | string;
    locations?: Prisma.TruckLocationUncheckedCreateNestedManyWithoutTruckInput;
};
export type TruckCreateOrConnectWithoutBookingsInput = {
    where: Prisma.TruckWhereUniqueInput;
    create: Prisma.XOR<Prisma.TruckCreateWithoutBookingsInput, Prisma.TruckUncheckedCreateWithoutBookingsInput>;
};
export type TruckUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.TruckUpdateWithoutBookingsInput, Prisma.TruckUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.TruckCreateWithoutBookingsInput, Prisma.TruckUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.TruckWhereInput;
};
export type TruckUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.TruckWhereInput;
    data: Prisma.XOR<Prisma.TruckUpdateWithoutBookingsInput, Prisma.TruckUncheckedUpdateWithoutBookingsInput>;
};
export type TruckUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locations?: Prisma.TruckLocationUpdateManyWithoutTruckNestedInput;
};
export type TruckUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locations?: Prisma.TruckLocationUncheckedUpdateManyWithoutTruckNestedInput;
};
export type TruckCreateWithoutLocationsInput = {
    id?: string;
    plate: string;
    carrierId: string;
    createdAt?: Date | string;
    bookings?: Prisma.BookingCreateNestedManyWithoutTruckInput;
};
export type TruckUncheckedCreateWithoutLocationsInput = {
    id?: string;
    plate: string;
    carrierId: string;
    createdAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutTruckInput;
};
export type TruckCreateOrConnectWithoutLocationsInput = {
    where: Prisma.TruckWhereUniqueInput;
    create: Prisma.XOR<Prisma.TruckCreateWithoutLocationsInput, Prisma.TruckUncheckedCreateWithoutLocationsInput>;
};
export type TruckUpsertWithoutLocationsInput = {
    update: Prisma.XOR<Prisma.TruckUpdateWithoutLocationsInput, Prisma.TruckUncheckedUpdateWithoutLocationsInput>;
    create: Prisma.XOR<Prisma.TruckCreateWithoutLocationsInput, Prisma.TruckUncheckedCreateWithoutLocationsInput>;
    where?: Prisma.TruckWhereInput;
};
export type TruckUpdateToOneWithWhereWithoutLocationsInput = {
    where?: Prisma.TruckWhereInput;
    data: Prisma.XOR<Prisma.TruckUpdateWithoutLocationsInput, Prisma.TruckUncheckedUpdateWithoutLocationsInput>;
};
export type TruckUpdateWithoutLocationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUpdateManyWithoutTruckNestedInput;
};
export type TruckUncheckedUpdateWithoutLocationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutTruckNestedInput;
};
export type TruckCountOutputType = {
    locations: number;
    bookings: number;
};
export type TruckCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    locations?: boolean | TruckCountOutputTypeCountLocationsArgs;
    bookings?: boolean | TruckCountOutputTypeCountBookingsArgs;
};
export type TruckCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckCountOutputTypeSelect<ExtArgs> | null;
};
export type TruckCountOutputTypeCountLocationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TruckLocationWhereInput;
};
export type TruckCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type TruckSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    plate?: boolean;
    carrierId?: boolean;
    createdAt?: boolean;
    locations?: boolean | Prisma.Truck$locationsArgs<ExtArgs>;
    bookings?: boolean | Prisma.Truck$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.TruckCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["truck"]>;
export type TruckSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    plate?: boolean;
    carrierId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["truck"]>;
export type TruckSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    plate?: boolean;
    carrierId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["truck"]>;
export type TruckSelectScalar = {
    id?: boolean;
    plate?: boolean;
    carrierId?: boolean;
    createdAt?: boolean;
};
export type TruckOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "plate" | "carrierId" | "createdAt", ExtArgs["result"]["truck"]>;
export type TruckInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    locations?: boolean | Prisma.Truck$locationsArgs<ExtArgs>;
    bookings?: boolean | Prisma.Truck$bookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.TruckCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TruckIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type TruckIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $TruckPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Truck";
    objects: {
        locations: Prisma.$TruckLocationPayload<ExtArgs>[];
        bookings: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        plate: string;
        carrierId: string;
        createdAt: Date;
    }, ExtArgs["result"]["truck"]>;
    composites: {};
};
export type TruckGetPayload<S extends boolean | null | undefined | TruckDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TruckPayload, S>;
export type TruckCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TruckFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TruckCountAggregateInputType | true;
};
export interface TruckDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Truck'];
        meta: {
            name: 'Truck';
        };
    };
    findUnique<T extends TruckFindUniqueArgs>(args: Prisma.SelectSubset<T, TruckFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TruckClient<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TruckFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TruckFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TruckClient<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TruckFindFirstArgs>(args?: Prisma.SelectSubset<T, TruckFindFirstArgs<ExtArgs>>): Prisma.Prisma__TruckClient<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TruckFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TruckFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TruckClient<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TruckFindManyArgs>(args?: Prisma.SelectSubset<T, TruckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TruckCreateArgs>(args: Prisma.SelectSubset<T, TruckCreateArgs<ExtArgs>>): Prisma.Prisma__TruckClient<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TruckCreateManyArgs>(args?: Prisma.SelectSubset<T, TruckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TruckCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TruckCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TruckDeleteArgs>(args: Prisma.SelectSubset<T, TruckDeleteArgs<ExtArgs>>): Prisma.Prisma__TruckClient<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TruckUpdateArgs>(args: Prisma.SelectSubset<T, TruckUpdateArgs<ExtArgs>>): Prisma.Prisma__TruckClient<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TruckDeleteManyArgs>(args?: Prisma.SelectSubset<T, TruckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TruckUpdateManyArgs>(args: Prisma.SelectSubset<T, TruckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TruckUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TruckUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TruckUpsertArgs>(args: Prisma.SelectSubset<T, TruckUpsertArgs<ExtArgs>>): Prisma.Prisma__TruckClient<runtime.Types.Result.GetResult<Prisma.$TruckPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TruckCountArgs>(args?: Prisma.Subset<T, TruckCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TruckCountAggregateOutputType> : number>;
    aggregate<T extends TruckAggregateArgs>(args: Prisma.Subset<T, TruckAggregateArgs>): Prisma.PrismaPromise<GetTruckAggregateType<T>>;
    groupBy<T extends TruckGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TruckGroupByArgs['orderBy'];
    } : {
        orderBy?: TruckGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TruckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTruckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TruckFieldRefs;
}
export interface Prisma__TruckClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    locations<T extends Prisma.Truck$locationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Truck$locationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TruckLocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    bookings<T extends Prisma.Truck$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Truck$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TruckFieldRefs {
    readonly id: Prisma.FieldRef<"Truck", 'String'>;
    readonly plate: Prisma.FieldRef<"Truck", 'String'>;
    readonly carrierId: Prisma.FieldRef<"Truck", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Truck", 'DateTime'>;
}
export type TruckFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelect<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    include?: Prisma.TruckInclude<ExtArgs> | null;
    where: Prisma.TruckWhereUniqueInput;
};
export type TruckFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelect<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    include?: Prisma.TruckInclude<ExtArgs> | null;
    where: Prisma.TruckWhereUniqueInput;
};
export type TruckFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelect<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    include?: Prisma.TruckInclude<ExtArgs> | null;
    where?: Prisma.TruckWhereInput;
    orderBy?: Prisma.TruckOrderByWithRelationInput | Prisma.TruckOrderByWithRelationInput[];
    cursor?: Prisma.TruckWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TruckScalarFieldEnum | Prisma.TruckScalarFieldEnum[];
};
export type TruckFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelect<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    include?: Prisma.TruckInclude<ExtArgs> | null;
    where?: Prisma.TruckWhereInput;
    orderBy?: Prisma.TruckOrderByWithRelationInput | Prisma.TruckOrderByWithRelationInput[];
    cursor?: Prisma.TruckWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TruckScalarFieldEnum | Prisma.TruckScalarFieldEnum[];
};
export type TruckFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelect<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    include?: Prisma.TruckInclude<ExtArgs> | null;
    where?: Prisma.TruckWhereInput;
    orderBy?: Prisma.TruckOrderByWithRelationInput | Prisma.TruckOrderByWithRelationInput[];
    cursor?: Prisma.TruckWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TruckScalarFieldEnum | Prisma.TruckScalarFieldEnum[];
};
export type TruckCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelect<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    include?: Prisma.TruckInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TruckCreateInput, Prisma.TruckUncheckedCreateInput>;
};
export type TruckCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TruckCreateManyInput | Prisma.TruckCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TruckCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    data: Prisma.TruckCreateManyInput | Prisma.TruckCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TruckUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelect<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    include?: Prisma.TruckInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TruckUpdateInput, Prisma.TruckUncheckedUpdateInput>;
    where: Prisma.TruckWhereUniqueInput;
};
export type TruckUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TruckUpdateManyMutationInput, Prisma.TruckUncheckedUpdateManyInput>;
    where?: Prisma.TruckWhereInput;
    limit?: number;
};
export type TruckUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TruckUpdateManyMutationInput, Prisma.TruckUncheckedUpdateManyInput>;
    where?: Prisma.TruckWhereInput;
    limit?: number;
};
export type TruckUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelect<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    include?: Prisma.TruckInclude<ExtArgs> | null;
    where: Prisma.TruckWhereUniqueInput;
    create: Prisma.XOR<Prisma.TruckCreateInput, Prisma.TruckUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TruckUpdateInput, Prisma.TruckUncheckedUpdateInput>;
};
export type TruckDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelect<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    include?: Prisma.TruckInclude<ExtArgs> | null;
    where: Prisma.TruckWhereUniqueInput;
};
export type TruckDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TruckWhereInput;
    limit?: number;
};
export type Truck$locationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Truck$bookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TruckDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TruckSelect<ExtArgs> | null;
    omit?: Prisma.TruckOmit<ExtArgs> | null;
    include?: Prisma.TruckInclude<ExtArgs> | null;
};
export {};
