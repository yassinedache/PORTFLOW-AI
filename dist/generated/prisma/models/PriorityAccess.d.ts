import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PriorityAccessModel = runtime.Types.Result.DefaultSelection<Prisma.$PriorityAccessPayload>;
export type AggregatePriorityAccess = {
    _count: PriorityAccessCountAggregateOutputType | null;
    _avg: PriorityAccessAvgAggregateOutputType | null;
    _sum: PriorityAccessSumAggregateOutputType | null;
    _min: PriorityAccessMinAggregateOutputType | null;
    _max: PriorityAccessMaxAggregateOutputType | null;
};
export type PriorityAccessAvgAggregateOutputType = {
    fee: number | null;
};
export type PriorityAccessSumAggregateOutputType = {
    fee: number | null;
};
export type PriorityAccessMinAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    level: string | null;
    fee: number | null;
    createdAt: Date | null;
};
export type PriorityAccessMaxAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    level: string | null;
    fee: number | null;
    createdAt: Date | null;
};
export type PriorityAccessCountAggregateOutputType = {
    id: number;
    bookingId: number;
    level: number;
    fee: number;
    createdAt: number;
    _all: number;
};
export type PriorityAccessAvgAggregateInputType = {
    fee?: true;
};
export type PriorityAccessSumAggregateInputType = {
    fee?: true;
};
export type PriorityAccessMinAggregateInputType = {
    id?: true;
    bookingId?: true;
    level?: true;
    fee?: true;
    createdAt?: true;
};
export type PriorityAccessMaxAggregateInputType = {
    id?: true;
    bookingId?: true;
    level?: true;
    fee?: true;
    createdAt?: true;
};
export type PriorityAccessCountAggregateInputType = {
    id?: true;
    bookingId?: true;
    level?: true;
    fee?: true;
    createdAt?: true;
    _all?: true;
};
export type PriorityAccessAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PriorityAccessWhereInput;
    orderBy?: Prisma.PriorityAccessOrderByWithRelationInput | Prisma.PriorityAccessOrderByWithRelationInput[];
    cursor?: Prisma.PriorityAccessWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PriorityAccessCountAggregateInputType;
    _avg?: PriorityAccessAvgAggregateInputType;
    _sum?: PriorityAccessSumAggregateInputType;
    _min?: PriorityAccessMinAggregateInputType;
    _max?: PriorityAccessMaxAggregateInputType;
};
export type GetPriorityAccessAggregateType<T extends PriorityAccessAggregateArgs> = {
    [P in keyof T & keyof AggregatePriorityAccess]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePriorityAccess[P]> : Prisma.GetScalarType<T[P], AggregatePriorityAccess[P]>;
};
export type PriorityAccessGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PriorityAccessWhereInput;
    orderBy?: Prisma.PriorityAccessOrderByWithAggregationInput | Prisma.PriorityAccessOrderByWithAggregationInput[];
    by: Prisma.PriorityAccessScalarFieldEnum[] | Prisma.PriorityAccessScalarFieldEnum;
    having?: Prisma.PriorityAccessScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PriorityAccessCountAggregateInputType | true;
    _avg?: PriorityAccessAvgAggregateInputType;
    _sum?: PriorityAccessSumAggregateInputType;
    _min?: PriorityAccessMinAggregateInputType;
    _max?: PriorityAccessMaxAggregateInputType;
};
export type PriorityAccessGroupByOutputType = {
    id: string;
    bookingId: string;
    level: string;
    fee: number;
    createdAt: Date;
    _count: PriorityAccessCountAggregateOutputType | null;
    _avg: PriorityAccessAvgAggregateOutputType | null;
    _sum: PriorityAccessSumAggregateOutputType | null;
    _min: PriorityAccessMinAggregateOutputType | null;
    _max: PriorityAccessMaxAggregateOutputType | null;
};
type GetPriorityAccessGroupByPayload<T extends PriorityAccessGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PriorityAccessGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PriorityAccessGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PriorityAccessGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PriorityAccessGroupByOutputType[P]>;
}>>;
export type PriorityAccessWhereInput = {
    AND?: Prisma.PriorityAccessWhereInput | Prisma.PriorityAccessWhereInput[];
    OR?: Prisma.PriorityAccessWhereInput[];
    NOT?: Prisma.PriorityAccessWhereInput | Prisma.PriorityAccessWhereInput[];
    id?: Prisma.UuidFilter<"PriorityAccess"> | string;
    bookingId?: Prisma.UuidFilter<"PriorityAccess"> | string;
    level?: Prisma.StringFilter<"PriorityAccess"> | string;
    fee?: Prisma.FloatFilter<"PriorityAccess"> | number;
    createdAt?: Prisma.DateTimeFilter<"PriorityAccess"> | Date | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
};
export type PriorityAccessOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    booking?: Prisma.BookingOrderByWithRelationInput;
};
export type PriorityAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    bookingId?: string;
    AND?: Prisma.PriorityAccessWhereInput | Prisma.PriorityAccessWhereInput[];
    OR?: Prisma.PriorityAccessWhereInput[];
    NOT?: Prisma.PriorityAccessWhereInput | Prisma.PriorityAccessWhereInput[];
    level?: Prisma.StringFilter<"PriorityAccess"> | string;
    fee?: Prisma.FloatFilter<"PriorityAccess"> | number;
    createdAt?: Prisma.DateTimeFilter<"PriorityAccess"> | Date | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
}, "id" | "bookingId">;
export type PriorityAccessOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PriorityAccessCountOrderByAggregateInput;
    _avg?: Prisma.PriorityAccessAvgOrderByAggregateInput;
    _max?: Prisma.PriorityAccessMaxOrderByAggregateInput;
    _min?: Prisma.PriorityAccessMinOrderByAggregateInput;
    _sum?: Prisma.PriorityAccessSumOrderByAggregateInput;
};
export type PriorityAccessScalarWhereWithAggregatesInput = {
    AND?: Prisma.PriorityAccessScalarWhereWithAggregatesInput | Prisma.PriorityAccessScalarWhereWithAggregatesInput[];
    OR?: Prisma.PriorityAccessScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PriorityAccessScalarWhereWithAggregatesInput | Prisma.PriorityAccessScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"PriorityAccess"> | string;
    bookingId?: Prisma.UuidWithAggregatesFilter<"PriorityAccess"> | string;
    level?: Prisma.StringWithAggregatesFilter<"PriorityAccess"> | string;
    fee?: Prisma.FloatWithAggregatesFilter<"PriorityAccess"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PriorityAccess"> | Date | string;
};
export type PriorityAccessCreateInput = {
    id?: string;
    level?: string;
    fee?: number;
    createdAt?: Date | string;
    booking: Prisma.BookingCreateNestedOneWithoutPriorityAccessInput;
};
export type PriorityAccessUncheckedCreateInput = {
    id?: string;
    bookingId: string;
    level?: string;
    fee?: number;
    createdAt?: Date | string;
};
export type PriorityAccessUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.StringFieldUpdateOperationsInput | string;
    fee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutPriorityAccessNestedInput;
};
export type PriorityAccessUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.StringFieldUpdateOperationsInput | string;
    fee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PriorityAccessCreateManyInput = {
    id?: string;
    bookingId: string;
    level?: string;
    fee?: number;
    createdAt?: Date | string;
};
export type PriorityAccessUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.StringFieldUpdateOperationsInput | string;
    fee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PriorityAccessUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.StringFieldUpdateOperationsInput | string;
    fee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PriorityAccessNullableScalarRelationFilter = {
    is?: Prisma.PriorityAccessWhereInput | null;
    isNot?: Prisma.PriorityAccessWhereInput | null;
};
export type PriorityAccessCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PriorityAccessAvgOrderByAggregateInput = {
    fee?: Prisma.SortOrder;
};
export type PriorityAccessMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PriorityAccessMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    level?: Prisma.SortOrder;
    fee?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PriorityAccessSumOrderByAggregateInput = {
    fee?: Prisma.SortOrder;
};
export type PriorityAccessCreateNestedOneWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.PriorityAccessCreateWithoutBookingInput, Prisma.PriorityAccessUncheckedCreateWithoutBookingInput>;
    connectOrCreate?: Prisma.PriorityAccessCreateOrConnectWithoutBookingInput;
    connect?: Prisma.PriorityAccessWhereUniqueInput;
};
export type PriorityAccessUncheckedCreateNestedOneWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.PriorityAccessCreateWithoutBookingInput, Prisma.PriorityAccessUncheckedCreateWithoutBookingInput>;
    connectOrCreate?: Prisma.PriorityAccessCreateOrConnectWithoutBookingInput;
    connect?: Prisma.PriorityAccessWhereUniqueInput;
};
export type PriorityAccessUpdateOneWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.PriorityAccessCreateWithoutBookingInput, Prisma.PriorityAccessUncheckedCreateWithoutBookingInput>;
    connectOrCreate?: Prisma.PriorityAccessCreateOrConnectWithoutBookingInput;
    upsert?: Prisma.PriorityAccessUpsertWithoutBookingInput;
    disconnect?: Prisma.PriorityAccessWhereInput | boolean;
    delete?: Prisma.PriorityAccessWhereInput | boolean;
    connect?: Prisma.PriorityAccessWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PriorityAccessUpdateToOneWithWhereWithoutBookingInput, Prisma.PriorityAccessUpdateWithoutBookingInput>, Prisma.PriorityAccessUncheckedUpdateWithoutBookingInput>;
};
export type PriorityAccessUncheckedUpdateOneWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.PriorityAccessCreateWithoutBookingInput, Prisma.PriorityAccessUncheckedCreateWithoutBookingInput>;
    connectOrCreate?: Prisma.PriorityAccessCreateOrConnectWithoutBookingInput;
    upsert?: Prisma.PriorityAccessUpsertWithoutBookingInput;
    disconnect?: Prisma.PriorityAccessWhereInput | boolean;
    delete?: Prisma.PriorityAccessWhereInput | boolean;
    connect?: Prisma.PriorityAccessWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PriorityAccessUpdateToOneWithWhereWithoutBookingInput, Prisma.PriorityAccessUpdateWithoutBookingInput>, Prisma.PriorityAccessUncheckedUpdateWithoutBookingInput>;
};
export type PriorityAccessCreateWithoutBookingInput = {
    id?: string;
    level?: string;
    fee?: number;
    createdAt?: Date | string;
};
export type PriorityAccessUncheckedCreateWithoutBookingInput = {
    id?: string;
    level?: string;
    fee?: number;
    createdAt?: Date | string;
};
export type PriorityAccessCreateOrConnectWithoutBookingInput = {
    where: Prisma.PriorityAccessWhereUniqueInput;
    create: Prisma.XOR<Prisma.PriorityAccessCreateWithoutBookingInput, Prisma.PriorityAccessUncheckedCreateWithoutBookingInput>;
};
export type PriorityAccessUpsertWithoutBookingInput = {
    update: Prisma.XOR<Prisma.PriorityAccessUpdateWithoutBookingInput, Prisma.PriorityAccessUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.PriorityAccessCreateWithoutBookingInput, Prisma.PriorityAccessUncheckedCreateWithoutBookingInput>;
    where?: Prisma.PriorityAccessWhereInput;
};
export type PriorityAccessUpdateToOneWithWhereWithoutBookingInput = {
    where?: Prisma.PriorityAccessWhereInput;
    data: Prisma.XOR<Prisma.PriorityAccessUpdateWithoutBookingInput, Prisma.PriorityAccessUncheckedUpdateWithoutBookingInput>;
};
export type PriorityAccessUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.StringFieldUpdateOperationsInput | string;
    fee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PriorityAccessUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    level?: Prisma.StringFieldUpdateOperationsInput | string;
    fee?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PriorityAccessSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    level?: boolean;
    fee?: boolean;
    createdAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["priorityAccess"]>;
export type PriorityAccessSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    level?: boolean;
    fee?: boolean;
    createdAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["priorityAccess"]>;
export type PriorityAccessSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    level?: boolean;
    fee?: boolean;
    createdAt?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["priorityAccess"]>;
export type PriorityAccessSelectScalar = {
    id?: boolean;
    bookingId?: boolean;
    level?: boolean;
    fee?: boolean;
    createdAt?: boolean;
};
export type PriorityAccessOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bookingId" | "level" | "fee" | "createdAt", ExtArgs["result"]["priorityAccess"]>;
export type PriorityAccessInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
};
export type PriorityAccessIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
};
export type PriorityAccessIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
};
export type $PriorityAccessPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PriorityAccess";
    objects: {
        booking: Prisma.$BookingPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bookingId: string;
        level: string;
        fee: number;
        createdAt: Date;
    }, ExtArgs["result"]["priorityAccess"]>;
    composites: {};
};
export type PriorityAccessGetPayload<S extends boolean | null | undefined | PriorityAccessDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PriorityAccessPayload, S>;
export type PriorityAccessCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PriorityAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PriorityAccessCountAggregateInputType | true;
};
export interface PriorityAccessDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PriorityAccess'];
        meta: {
            name: 'PriorityAccess';
        };
    };
    findUnique<T extends PriorityAccessFindUniqueArgs>(args: Prisma.SelectSubset<T, PriorityAccessFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PriorityAccessClient<runtime.Types.Result.GetResult<Prisma.$PriorityAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PriorityAccessFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PriorityAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PriorityAccessClient<runtime.Types.Result.GetResult<Prisma.$PriorityAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PriorityAccessFindFirstArgs>(args?: Prisma.SelectSubset<T, PriorityAccessFindFirstArgs<ExtArgs>>): Prisma.Prisma__PriorityAccessClient<runtime.Types.Result.GetResult<Prisma.$PriorityAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PriorityAccessFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PriorityAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PriorityAccessClient<runtime.Types.Result.GetResult<Prisma.$PriorityAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PriorityAccessFindManyArgs>(args?: Prisma.SelectSubset<T, PriorityAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PriorityAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PriorityAccessCreateArgs>(args: Prisma.SelectSubset<T, PriorityAccessCreateArgs<ExtArgs>>): Prisma.Prisma__PriorityAccessClient<runtime.Types.Result.GetResult<Prisma.$PriorityAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PriorityAccessCreateManyArgs>(args?: Prisma.SelectSubset<T, PriorityAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PriorityAccessCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PriorityAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PriorityAccessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PriorityAccessDeleteArgs>(args: Prisma.SelectSubset<T, PriorityAccessDeleteArgs<ExtArgs>>): Prisma.Prisma__PriorityAccessClient<runtime.Types.Result.GetResult<Prisma.$PriorityAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PriorityAccessUpdateArgs>(args: Prisma.SelectSubset<T, PriorityAccessUpdateArgs<ExtArgs>>): Prisma.Prisma__PriorityAccessClient<runtime.Types.Result.GetResult<Prisma.$PriorityAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PriorityAccessDeleteManyArgs>(args?: Prisma.SelectSubset<T, PriorityAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PriorityAccessUpdateManyArgs>(args: Prisma.SelectSubset<T, PriorityAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PriorityAccessUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PriorityAccessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PriorityAccessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PriorityAccessUpsertArgs>(args: Prisma.SelectSubset<T, PriorityAccessUpsertArgs<ExtArgs>>): Prisma.Prisma__PriorityAccessClient<runtime.Types.Result.GetResult<Prisma.$PriorityAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PriorityAccessCountArgs>(args?: Prisma.Subset<T, PriorityAccessCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PriorityAccessCountAggregateOutputType> : number>;
    aggregate<T extends PriorityAccessAggregateArgs>(args: Prisma.Subset<T, PriorityAccessAggregateArgs>): Prisma.PrismaPromise<GetPriorityAccessAggregateType<T>>;
    groupBy<T extends PriorityAccessGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PriorityAccessGroupByArgs['orderBy'];
    } : {
        orderBy?: PriorityAccessGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PriorityAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPriorityAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PriorityAccessFieldRefs;
}
export interface Prisma__PriorityAccessClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    booking<T extends Prisma.BookingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookingDefaultArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PriorityAccessFieldRefs {
    readonly id: Prisma.FieldRef<"PriorityAccess", 'String'>;
    readonly bookingId: Prisma.FieldRef<"PriorityAccess", 'String'>;
    readonly level: Prisma.FieldRef<"PriorityAccess", 'String'>;
    readonly fee: Prisma.FieldRef<"PriorityAccess", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"PriorityAccess", 'DateTime'>;
}
export type PriorityAccessFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriorityAccessSelect<ExtArgs> | null;
    omit?: Prisma.PriorityAccessOmit<ExtArgs> | null;
    include?: Prisma.PriorityAccessInclude<ExtArgs> | null;
    where: Prisma.PriorityAccessWhereUniqueInput;
};
export type PriorityAccessFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriorityAccessSelect<ExtArgs> | null;
    omit?: Prisma.PriorityAccessOmit<ExtArgs> | null;
    include?: Prisma.PriorityAccessInclude<ExtArgs> | null;
    where: Prisma.PriorityAccessWhereUniqueInput;
};
export type PriorityAccessFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriorityAccessSelect<ExtArgs> | null;
    omit?: Prisma.PriorityAccessOmit<ExtArgs> | null;
    include?: Prisma.PriorityAccessInclude<ExtArgs> | null;
    where?: Prisma.PriorityAccessWhereInput;
    orderBy?: Prisma.PriorityAccessOrderByWithRelationInput | Prisma.PriorityAccessOrderByWithRelationInput[];
    cursor?: Prisma.PriorityAccessWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PriorityAccessScalarFieldEnum | Prisma.PriorityAccessScalarFieldEnum[];
};
export type PriorityAccessFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriorityAccessSelect<ExtArgs> | null;
    omit?: Prisma.PriorityAccessOmit<ExtArgs> | null;
    include?: Prisma.PriorityAccessInclude<ExtArgs> | null;
    where?: Prisma.PriorityAccessWhereInput;
    orderBy?: Prisma.PriorityAccessOrderByWithRelationInput | Prisma.PriorityAccessOrderByWithRelationInput[];
    cursor?: Prisma.PriorityAccessWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PriorityAccessScalarFieldEnum | Prisma.PriorityAccessScalarFieldEnum[];
};
export type PriorityAccessFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriorityAccessSelect<ExtArgs> | null;
    omit?: Prisma.PriorityAccessOmit<ExtArgs> | null;
    include?: Prisma.PriorityAccessInclude<ExtArgs> | null;
    where?: Prisma.PriorityAccessWhereInput;
    orderBy?: Prisma.PriorityAccessOrderByWithRelationInput | Prisma.PriorityAccessOrderByWithRelationInput[];
    cursor?: Prisma.PriorityAccessWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PriorityAccessScalarFieldEnum | Prisma.PriorityAccessScalarFieldEnum[];
};
export type PriorityAccessCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriorityAccessSelect<ExtArgs> | null;
    omit?: Prisma.PriorityAccessOmit<ExtArgs> | null;
    include?: Prisma.PriorityAccessInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PriorityAccessCreateInput, Prisma.PriorityAccessUncheckedCreateInput>;
};
export type PriorityAccessCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PriorityAccessCreateManyInput | Prisma.PriorityAccessCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PriorityAccessCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriorityAccessSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PriorityAccessOmit<ExtArgs> | null;
    data: Prisma.PriorityAccessCreateManyInput | Prisma.PriorityAccessCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PriorityAccessIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PriorityAccessUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriorityAccessSelect<ExtArgs> | null;
    omit?: Prisma.PriorityAccessOmit<ExtArgs> | null;
    include?: Prisma.PriorityAccessInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PriorityAccessUpdateInput, Prisma.PriorityAccessUncheckedUpdateInput>;
    where: Prisma.PriorityAccessWhereUniqueInput;
};
export type PriorityAccessUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PriorityAccessUpdateManyMutationInput, Prisma.PriorityAccessUncheckedUpdateManyInput>;
    where?: Prisma.PriorityAccessWhereInput;
    limit?: number;
};
export type PriorityAccessUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriorityAccessSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PriorityAccessOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PriorityAccessUpdateManyMutationInput, Prisma.PriorityAccessUncheckedUpdateManyInput>;
    where?: Prisma.PriorityAccessWhereInput;
    limit?: number;
    include?: Prisma.PriorityAccessIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PriorityAccessUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriorityAccessSelect<ExtArgs> | null;
    omit?: Prisma.PriorityAccessOmit<ExtArgs> | null;
    include?: Prisma.PriorityAccessInclude<ExtArgs> | null;
    where: Prisma.PriorityAccessWhereUniqueInput;
    create: Prisma.XOR<Prisma.PriorityAccessCreateInput, Prisma.PriorityAccessUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PriorityAccessUpdateInput, Prisma.PriorityAccessUncheckedUpdateInput>;
};
export type PriorityAccessDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriorityAccessSelect<ExtArgs> | null;
    omit?: Prisma.PriorityAccessOmit<ExtArgs> | null;
    include?: Prisma.PriorityAccessInclude<ExtArgs> | null;
    where: Prisma.PriorityAccessWhereUniqueInput;
};
export type PriorityAccessDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PriorityAccessWhereInput;
    limit?: number;
};
export type PriorityAccessDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PriorityAccessSelect<ExtArgs> | null;
    omit?: Prisma.PriorityAccessOmit<ExtArgs> | null;
    include?: Prisma.PriorityAccessInclude<ExtArgs> | null;
};
export {};
