import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BlockchainProofModel = runtime.Types.Result.DefaultSelection<Prisma.$BlockchainProofPayload>;
export type AggregateBlockchainProof = {
    _count: BlockchainProofCountAggregateOutputType | null;
    _min: BlockchainProofMinAggregateOutputType | null;
    _max: BlockchainProofMaxAggregateOutputType | null;
};
export type BlockchainProofMinAggregateOutputType = {
    id: string | null;
    entityType: string | null;
    entityId: string | null;
    hash: string | null;
    payloadHash: string | null;
    createdAt: Date | null;
};
export type BlockchainProofMaxAggregateOutputType = {
    id: string | null;
    entityType: string | null;
    entityId: string | null;
    hash: string | null;
    payloadHash: string | null;
    createdAt: Date | null;
};
export type BlockchainProofCountAggregateOutputType = {
    id: number;
    entityType: number;
    entityId: number;
    hash: number;
    payloadHash: number;
    createdAt: number;
    _all: number;
};
export type BlockchainProofMinAggregateInputType = {
    id?: true;
    entityType?: true;
    entityId?: true;
    hash?: true;
    payloadHash?: true;
    createdAt?: true;
};
export type BlockchainProofMaxAggregateInputType = {
    id?: true;
    entityType?: true;
    entityId?: true;
    hash?: true;
    payloadHash?: true;
    createdAt?: true;
};
export type BlockchainProofCountAggregateInputType = {
    id?: true;
    entityType?: true;
    entityId?: true;
    hash?: true;
    payloadHash?: true;
    createdAt?: true;
    _all?: true;
};
export type BlockchainProofAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BlockchainProofWhereInput;
    orderBy?: Prisma.BlockchainProofOrderByWithRelationInput | Prisma.BlockchainProofOrderByWithRelationInput[];
    cursor?: Prisma.BlockchainProofWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BlockchainProofCountAggregateInputType;
    _min?: BlockchainProofMinAggregateInputType;
    _max?: BlockchainProofMaxAggregateInputType;
};
export type GetBlockchainProofAggregateType<T extends BlockchainProofAggregateArgs> = {
    [P in keyof T & keyof AggregateBlockchainProof]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBlockchainProof[P]> : Prisma.GetScalarType<T[P], AggregateBlockchainProof[P]>;
};
export type BlockchainProofGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BlockchainProofWhereInput;
    orderBy?: Prisma.BlockchainProofOrderByWithAggregationInput | Prisma.BlockchainProofOrderByWithAggregationInput[];
    by: Prisma.BlockchainProofScalarFieldEnum[] | Prisma.BlockchainProofScalarFieldEnum;
    having?: Prisma.BlockchainProofScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BlockchainProofCountAggregateInputType | true;
    _min?: BlockchainProofMinAggregateInputType;
    _max?: BlockchainProofMaxAggregateInputType;
};
export type BlockchainProofGroupByOutputType = {
    id: string;
    entityType: string;
    entityId: string;
    hash: string;
    payloadHash: string;
    createdAt: Date;
    _count: BlockchainProofCountAggregateOutputType | null;
    _min: BlockchainProofMinAggregateOutputType | null;
    _max: BlockchainProofMaxAggregateOutputType | null;
};
type GetBlockchainProofGroupByPayload<T extends BlockchainProofGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BlockchainProofGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BlockchainProofGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BlockchainProofGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BlockchainProofGroupByOutputType[P]>;
}>>;
export type BlockchainProofWhereInput = {
    AND?: Prisma.BlockchainProofWhereInput | Prisma.BlockchainProofWhereInput[];
    OR?: Prisma.BlockchainProofWhereInput[];
    NOT?: Prisma.BlockchainProofWhereInput | Prisma.BlockchainProofWhereInput[];
    id?: Prisma.UuidFilter<"BlockchainProof"> | string;
    entityType?: Prisma.StringFilter<"BlockchainProof"> | string;
    entityId?: Prisma.UuidFilter<"BlockchainProof"> | string;
    hash?: Prisma.StringFilter<"BlockchainProof"> | string;
    payloadHash?: Prisma.StringFilter<"BlockchainProof"> | string;
    createdAt?: Prisma.DateTimeFilter<"BlockchainProof"> | Date | string;
};
export type BlockchainProofOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    payloadHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BlockchainProofWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.BlockchainProofWhereInput | Prisma.BlockchainProofWhereInput[];
    OR?: Prisma.BlockchainProofWhereInput[];
    NOT?: Prisma.BlockchainProofWhereInput | Prisma.BlockchainProofWhereInput[];
    entityType?: Prisma.StringFilter<"BlockchainProof"> | string;
    entityId?: Prisma.UuidFilter<"BlockchainProof"> | string;
    hash?: Prisma.StringFilter<"BlockchainProof"> | string;
    payloadHash?: Prisma.StringFilter<"BlockchainProof"> | string;
    createdAt?: Prisma.DateTimeFilter<"BlockchainProof"> | Date | string;
}, "id">;
export type BlockchainProofOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    payloadHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.BlockchainProofCountOrderByAggregateInput;
    _max?: Prisma.BlockchainProofMaxOrderByAggregateInput;
    _min?: Prisma.BlockchainProofMinOrderByAggregateInput;
};
export type BlockchainProofScalarWhereWithAggregatesInput = {
    AND?: Prisma.BlockchainProofScalarWhereWithAggregatesInput | Prisma.BlockchainProofScalarWhereWithAggregatesInput[];
    OR?: Prisma.BlockchainProofScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BlockchainProofScalarWhereWithAggregatesInput | Prisma.BlockchainProofScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"BlockchainProof"> | string;
    entityType?: Prisma.StringWithAggregatesFilter<"BlockchainProof"> | string;
    entityId?: Prisma.UuidWithAggregatesFilter<"BlockchainProof"> | string;
    hash?: Prisma.StringWithAggregatesFilter<"BlockchainProof"> | string;
    payloadHash?: Prisma.StringWithAggregatesFilter<"BlockchainProof"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"BlockchainProof"> | Date | string;
};
export type BlockchainProofCreateInput = {
    id?: string;
    entityType: string;
    entityId: string;
    hash: string;
    payloadHash: string;
    createdAt?: Date | string;
};
export type BlockchainProofUncheckedCreateInput = {
    id?: string;
    entityType: string;
    entityId: string;
    hash: string;
    payloadHash: string;
    createdAt?: Date | string;
};
export type BlockchainProofUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    payloadHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlockchainProofUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    payloadHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlockchainProofCreateManyInput = {
    id?: string;
    entityType: string;
    entityId: string;
    hash: string;
    payloadHash: string;
    createdAt?: Date | string;
};
export type BlockchainProofUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    payloadHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlockchainProofUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    entityType?: Prisma.StringFieldUpdateOperationsInput | string;
    entityId?: Prisma.StringFieldUpdateOperationsInput | string;
    hash?: Prisma.StringFieldUpdateOperationsInput | string;
    payloadHash?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BlockchainProofCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    payloadHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BlockchainProofMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    payloadHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BlockchainProofMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    entityType?: Prisma.SortOrder;
    entityId?: Prisma.SortOrder;
    hash?: Prisma.SortOrder;
    payloadHash?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type BlockchainProofSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    hash?: boolean;
    payloadHash?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["blockchainProof"]>;
export type BlockchainProofSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    hash?: boolean;
    payloadHash?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["blockchainProof"]>;
export type BlockchainProofSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    hash?: boolean;
    payloadHash?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["blockchainProof"]>;
export type BlockchainProofSelectScalar = {
    id?: boolean;
    entityType?: boolean;
    entityId?: boolean;
    hash?: boolean;
    payloadHash?: boolean;
    createdAt?: boolean;
};
export type BlockchainProofOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "entityType" | "entityId" | "hash" | "payloadHash" | "createdAt", ExtArgs["result"]["blockchainProof"]>;
export type $BlockchainProofPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "BlockchainProof";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        entityType: string;
        entityId: string;
        hash: string;
        payloadHash: string;
        createdAt: Date;
    }, ExtArgs["result"]["blockchainProof"]>;
    composites: {};
};
export type BlockchainProofGetPayload<S extends boolean | null | undefined | BlockchainProofDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BlockchainProofPayload, S>;
export type BlockchainProofCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BlockchainProofFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BlockchainProofCountAggregateInputType | true;
};
export interface BlockchainProofDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['BlockchainProof'];
        meta: {
            name: 'BlockchainProof';
        };
    };
    findUnique<T extends BlockchainProofFindUniqueArgs>(args: Prisma.SelectSubset<T, BlockchainProofFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BlockchainProofClient<runtime.Types.Result.GetResult<Prisma.$BlockchainProofPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BlockchainProofFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BlockchainProofFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BlockchainProofClient<runtime.Types.Result.GetResult<Prisma.$BlockchainProofPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BlockchainProofFindFirstArgs>(args?: Prisma.SelectSubset<T, BlockchainProofFindFirstArgs<ExtArgs>>): Prisma.Prisma__BlockchainProofClient<runtime.Types.Result.GetResult<Prisma.$BlockchainProofPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BlockchainProofFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BlockchainProofFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BlockchainProofClient<runtime.Types.Result.GetResult<Prisma.$BlockchainProofPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BlockchainProofFindManyArgs>(args?: Prisma.SelectSubset<T, BlockchainProofFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BlockchainProofPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BlockchainProofCreateArgs>(args: Prisma.SelectSubset<T, BlockchainProofCreateArgs<ExtArgs>>): Prisma.Prisma__BlockchainProofClient<runtime.Types.Result.GetResult<Prisma.$BlockchainProofPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BlockchainProofCreateManyArgs>(args?: Prisma.SelectSubset<T, BlockchainProofCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BlockchainProofCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BlockchainProofCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BlockchainProofPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BlockchainProofDeleteArgs>(args: Prisma.SelectSubset<T, BlockchainProofDeleteArgs<ExtArgs>>): Prisma.Prisma__BlockchainProofClient<runtime.Types.Result.GetResult<Prisma.$BlockchainProofPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BlockchainProofUpdateArgs>(args: Prisma.SelectSubset<T, BlockchainProofUpdateArgs<ExtArgs>>): Prisma.Prisma__BlockchainProofClient<runtime.Types.Result.GetResult<Prisma.$BlockchainProofPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BlockchainProofDeleteManyArgs>(args?: Prisma.SelectSubset<T, BlockchainProofDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BlockchainProofUpdateManyArgs>(args: Prisma.SelectSubset<T, BlockchainProofUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BlockchainProofUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BlockchainProofUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BlockchainProofPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BlockchainProofUpsertArgs>(args: Prisma.SelectSubset<T, BlockchainProofUpsertArgs<ExtArgs>>): Prisma.Prisma__BlockchainProofClient<runtime.Types.Result.GetResult<Prisma.$BlockchainProofPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BlockchainProofCountArgs>(args?: Prisma.Subset<T, BlockchainProofCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BlockchainProofCountAggregateOutputType> : number>;
    aggregate<T extends BlockchainProofAggregateArgs>(args: Prisma.Subset<T, BlockchainProofAggregateArgs>): Prisma.PrismaPromise<GetBlockchainProofAggregateType<T>>;
    groupBy<T extends BlockchainProofGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BlockchainProofGroupByArgs['orderBy'];
    } : {
        orderBy?: BlockchainProofGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BlockchainProofGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlockchainProofGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BlockchainProofFieldRefs;
}
export interface Prisma__BlockchainProofClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BlockchainProofFieldRefs {
    readonly id: Prisma.FieldRef<"BlockchainProof", 'String'>;
    readonly entityType: Prisma.FieldRef<"BlockchainProof", 'String'>;
    readonly entityId: Prisma.FieldRef<"BlockchainProof", 'String'>;
    readonly hash: Prisma.FieldRef<"BlockchainProof", 'String'>;
    readonly payloadHash: Prisma.FieldRef<"BlockchainProof", 'String'>;
    readonly createdAt: Prisma.FieldRef<"BlockchainProof", 'DateTime'>;
}
export type BlockchainProofFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlockchainProofSelect<ExtArgs> | null;
    omit?: Prisma.BlockchainProofOmit<ExtArgs> | null;
    where: Prisma.BlockchainProofWhereUniqueInput;
};
export type BlockchainProofFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlockchainProofSelect<ExtArgs> | null;
    omit?: Prisma.BlockchainProofOmit<ExtArgs> | null;
    where: Prisma.BlockchainProofWhereUniqueInput;
};
export type BlockchainProofFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlockchainProofSelect<ExtArgs> | null;
    omit?: Prisma.BlockchainProofOmit<ExtArgs> | null;
    where?: Prisma.BlockchainProofWhereInput;
    orderBy?: Prisma.BlockchainProofOrderByWithRelationInput | Prisma.BlockchainProofOrderByWithRelationInput[];
    cursor?: Prisma.BlockchainProofWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BlockchainProofScalarFieldEnum | Prisma.BlockchainProofScalarFieldEnum[];
};
export type BlockchainProofFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlockchainProofSelect<ExtArgs> | null;
    omit?: Prisma.BlockchainProofOmit<ExtArgs> | null;
    where?: Prisma.BlockchainProofWhereInput;
    orderBy?: Prisma.BlockchainProofOrderByWithRelationInput | Prisma.BlockchainProofOrderByWithRelationInput[];
    cursor?: Prisma.BlockchainProofWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BlockchainProofScalarFieldEnum | Prisma.BlockchainProofScalarFieldEnum[];
};
export type BlockchainProofFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlockchainProofSelect<ExtArgs> | null;
    omit?: Prisma.BlockchainProofOmit<ExtArgs> | null;
    where?: Prisma.BlockchainProofWhereInput;
    orderBy?: Prisma.BlockchainProofOrderByWithRelationInput | Prisma.BlockchainProofOrderByWithRelationInput[];
    cursor?: Prisma.BlockchainProofWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BlockchainProofScalarFieldEnum | Prisma.BlockchainProofScalarFieldEnum[];
};
export type BlockchainProofCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlockchainProofSelect<ExtArgs> | null;
    omit?: Prisma.BlockchainProofOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BlockchainProofCreateInput, Prisma.BlockchainProofUncheckedCreateInput>;
};
export type BlockchainProofCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BlockchainProofCreateManyInput | Prisma.BlockchainProofCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BlockchainProofCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlockchainProofSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BlockchainProofOmit<ExtArgs> | null;
    data: Prisma.BlockchainProofCreateManyInput | Prisma.BlockchainProofCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BlockchainProofUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlockchainProofSelect<ExtArgs> | null;
    omit?: Prisma.BlockchainProofOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BlockchainProofUpdateInput, Prisma.BlockchainProofUncheckedUpdateInput>;
    where: Prisma.BlockchainProofWhereUniqueInput;
};
export type BlockchainProofUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BlockchainProofUpdateManyMutationInput, Prisma.BlockchainProofUncheckedUpdateManyInput>;
    where?: Prisma.BlockchainProofWhereInput;
    limit?: number;
};
export type BlockchainProofUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlockchainProofSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BlockchainProofOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BlockchainProofUpdateManyMutationInput, Prisma.BlockchainProofUncheckedUpdateManyInput>;
    where?: Prisma.BlockchainProofWhereInput;
    limit?: number;
};
export type BlockchainProofUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlockchainProofSelect<ExtArgs> | null;
    omit?: Prisma.BlockchainProofOmit<ExtArgs> | null;
    where: Prisma.BlockchainProofWhereUniqueInput;
    create: Prisma.XOR<Prisma.BlockchainProofCreateInput, Prisma.BlockchainProofUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BlockchainProofUpdateInput, Prisma.BlockchainProofUncheckedUpdateInput>;
};
export type BlockchainProofDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlockchainProofSelect<ExtArgs> | null;
    omit?: Prisma.BlockchainProofOmit<ExtArgs> | null;
    where: Prisma.BlockchainProofWhereUniqueInput;
};
export type BlockchainProofDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BlockchainProofWhereInput;
    limit?: number;
};
export type BlockchainProofDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BlockchainProofSelect<ExtArgs> | null;
    omit?: Prisma.BlockchainProofOmit<ExtArgs> | null;
};
export {};
