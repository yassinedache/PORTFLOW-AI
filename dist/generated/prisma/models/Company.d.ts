import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CompanyModel = runtime.Types.Result.DefaultSelection<Prisma.$CompanyPayload>;
export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null;
    _min: CompanyMinAggregateOutputType | null;
    _max: CompanyMaxAggregateOutputType | null;
};
export type CompanyMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
};
export type CompanyMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
};
export type CompanyCountAggregateOutputType = {
    id: number;
    name: number;
    createdAt: number;
    _all: number;
};
export type CompanyMinAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
};
export type CompanyMaxAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
};
export type CompanyCountAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    _all?: true;
};
export type CompanyAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput | Prisma.CompanyOrderByWithRelationInput[];
    cursor?: Prisma.CompanyWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CompanyCountAggregateInputType;
    _min?: CompanyMinAggregateInputType;
    _max?: CompanyMaxAggregateInputType;
};
export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
    [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCompany[P]> : Prisma.GetScalarType<T[P], AggregateCompany[P]>;
};
export type CompanyGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithAggregationInput | Prisma.CompanyOrderByWithAggregationInput[];
    by: Prisma.CompanyScalarFieldEnum[] | Prisma.CompanyScalarFieldEnum;
    having?: Prisma.CompanyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CompanyCountAggregateInputType | true;
    _min?: CompanyMinAggregateInputType;
    _max?: CompanyMaxAggregateInputType;
};
export type CompanyGroupByOutputType = {
    id: string;
    name: string;
    createdAt: Date;
    _count: CompanyCountAggregateOutputType | null;
    _min: CompanyMinAggregateOutputType | null;
    _max: CompanyMaxAggregateOutputType | null;
};
type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CompanyGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CompanyGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CompanyGroupByOutputType[P]>;
}>>;
export type CompanyWhereInput = {
    AND?: Prisma.CompanyWhereInput | Prisma.CompanyWhereInput[];
    OR?: Prisma.CompanyWhereInput[];
    NOT?: Prisma.CompanyWhereInput | Prisma.CompanyWhereInput[];
    id?: Prisma.UuidFilter<"Company"> | string;
    name?: Prisma.StringFilter<"Company"> | string;
    createdAt?: Prisma.DateTimeFilter<"Company"> | Date | string;
    users?: Prisma.UserListRelationFilter;
};
export type CompanyOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    users?: Prisma.UserOrderByRelationAggregateInput;
};
export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CompanyWhereInput | Prisma.CompanyWhereInput[];
    OR?: Prisma.CompanyWhereInput[];
    NOT?: Prisma.CompanyWhereInput | Prisma.CompanyWhereInput[];
    name?: Prisma.StringFilter<"Company"> | string;
    createdAt?: Prisma.DateTimeFilter<"Company"> | Date | string;
    users?: Prisma.UserListRelationFilter;
}, "id">;
export type CompanyOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CompanyCountOrderByAggregateInput;
    _max?: Prisma.CompanyMaxOrderByAggregateInput;
    _min?: Prisma.CompanyMinOrderByAggregateInput;
};
export type CompanyScalarWhereWithAggregatesInput = {
    AND?: Prisma.CompanyScalarWhereWithAggregatesInput | Prisma.CompanyScalarWhereWithAggregatesInput[];
    OR?: Prisma.CompanyScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CompanyScalarWhereWithAggregatesInput | Prisma.CompanyScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Company"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Company"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Company"> | Date | string;
};
export type CompanyCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutCompanyInput;
};
export type CompanyUncheckedCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutCompanyInput;
};
export type CompanyUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutCompanyNestedInput;
};
export type CompanyUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutCompanyNestedInput;
};
export type CompanyCreateManyInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
};
export type CompanyUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CompanyMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CompanyMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CompanyNullableScalarRelationFilter = {
    is?: Prisma.CompanyWhereInput | null;
    isNot?: Prisma.CompanyWhereInput | null;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type CompanyCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.CompanyCreateWithoutUsersInput, Prisma.CompanyUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.CompanyCreateOrConnectWithoutUsersInput;
    connect?: Prisma.CompanyWhereUniqueInput;
};
export type CompanyUpdateOneWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.CompanyCreateWithoutUsersInput, Prisma.CompanyUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.CompanyCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.CompanyUpsertWithoutUsersInput;
    disconnect?: Prisma.CompanyWhereInput | boolean;
    delete?: Prisma.CompanyWhereInput | boolean;
    connect?: Prisma.CompanyWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CompanyUpdateToOneWithWhereWithoutUsersInput, Prisma.CompanyUpdateWithoutUsersInput>, Prisma.CompanyUncheckedUpdateWithoutUsersInput>;
};
export type CompanyCreateWithoutUsersInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
};
export type CompanyUncheckedCreateWithoutUsersInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
};
export type CompanyCreateOrConnectWithoutUsersInput = {
    where: Prisma.CompanyWhereUniqueInput;
    create: Prisma.XOR<Prisma.CompanyCreateWithoutUsersInput, Prisma.CompanyUncheckedCreateWithoutUsersInput>;
};
export type CompanyUpsertWithoutUsersInput = {
    update: Prisma.XOR<Prisma.CompanyUpdateWithoutUsersInput, Prisma.CompanyUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.CompanyCreateWithoutUsersInput, Prisma.CompanyUncheckedCreateWithoutUsersInput>;
    where?: Prisma.CompanyWhereInput;
};
export type CompanyUpdateToOneWithWhereWithoutUsersInput = {
    where?: Prisma.CompanyWhereInput;
    data: Prisma.XOR<Prisma.CompanyUpdateWithoutUsersInput, Prisma.CompanyUncheckedUpdateWithoutUsersInput>;
};
export type CompanyUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CompanyCountOutputType = {
    users: number;
};
export type CompanyCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | CompanyCountOutputTypeCountUsersArgs;
};
export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanyCountOutputTypeSelect<ExtArgs> | null;
};
export type CompanyCountOutputTypeCountUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
export type CompanySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    users?: boolean | Prisma.Company$usersArgs<ExtArgs>;
    _count?: boolean | Prisma.CompanyCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["company"]>;
export type CompanySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["company"]>;
export type CompanySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["company"]>;
export type CompanySelectScalar = {
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
};
export type CompanyOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["company"]>;
export type CompanyInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.Company$usersArgs<ExtArgs>;
    _count?: boolean | Prisma.CompanyCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CompanyIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type CompanyIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $CompanyPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Company";
    objects: {
        users: Prisma.$UserPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        createdAt: Date;
    }, ExtArgs["result"]["company"]>;
    composites: {};
};
export type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CompanyPayload, S>;
export type CompanyCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CompanyCountAggregateInputType | true;
};
export interface CompanyDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Company'];
        meta: {
            name: 'Company';
        };
    };
    findUnique<T extends CompanyFindUniqueArgs>(args: Prisma.SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CompanyFindFirstArgs>(args?: Prisma.SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CompanyFindManyArgs>(args?: Prisma.SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CompanyCreateArgs>(args: Prisma.SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CompanyCreateManyArgs>(args?: Prisma.SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CompanyCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CompanyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CompanyDeleteArgs>(args: Prisma.SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CompanyUpdateArgs>(args: Prisma.SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CompanyDeleteManyArgs>(args?: Prisma.SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CompanyUpdateManyArgs>(args: Prisma.SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CompanyUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CompanyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CompanyUpsertArgs>(args: Prisma.SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma.Prisma__CompanyClient<runtime.Types.Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CompanyCountArgs>(args?: Prisma.Subset<T, CompanyCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CompanyCountAggregateOutputType> : number>;
    aggregate<T extends CompanyAggregateArgs>(args: Prisma.Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>;
    groupBy<T extends CompanyGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CompanyGroupByArgs['orderBy'];
    } : {
        orderBy?: CompanyGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CompanyFieldRefs;
}
export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.Company$usersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Company$usersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CompanyFieldRefs {
    readonly id: Prisma.FieldRef<"Company", 'String'>;
    readonly name: Prisma.FieldRef<"Company", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Company", 'DateTime'>;
}
export type CompanyFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where: Prisma.CompanyWhereUniqueInput;
};
export type CompanyFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where: Prisma.CompanyWhereUniqueInput;
};
export type CompanyFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput | Prisma.CompanyOrderByWithRelationInput[];
    cursor?: Prisma.CompanyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompanyScalarFieldEnum | Prisma.CompanyScalarFieldEnum[];
};
export type CompanyFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput | Prisma.CompanyOrderByWithRelationInput[];
    cursor?: Prisma.CompanyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompanyScalarFieldEnum | Prisma.CompanyScalarFieldEnum[];
};
export type CompanyFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByWithRelationInput | Prisma.CompanyOrderByWithRelationInput[];
    cursor?: Prisma.CompanyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CompanyScalarFieldEnum | Prisma.CompanyScalarFieldEnum[];
};
export type CompanyCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CompanyCreateInput, Prisma.CompanyUncheckedCreateInput>;
};
export type CompanyCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CompanyCreateManyInput | Prisma.CompanyCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CompanyCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    data: Prisma.CompanyCreateManyInput | Prisma.CompanyCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CompanyUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CompanyUpdateInput, Prisma.CompanyUncheckedUpdateInput>;
    where: Prisma.CompanyWhereUniqueInput;
};
export type CompanyUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CompanyUpdateManyMutationInput, Prisma.CompanyUncheckedUpdateManyInput>;
    where?: Prisma.CompanyWhereInput;
    limit?: number;
};
export type CompanyUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CompanyUpdateManyMutationInput, Prisma.CompanyUncheckedUpdateManyInput>;
    where?: Prisma.CompanyWhereInput;
    limit?: number;
};
export type CompanyUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where: Prisma.CompanyWhereUniqueInput;
    create: Prisma.XOR<Prisma.CompanyCreateInput, Prisma.CompanyUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CompanyUpdateInput, Prisma.CompanyUncheckedUpdateInput>;
};
export type CompanyDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
    where: Prisma.CompanyWhereUniqueInput;
};
export type CompanyDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CompanyWhereInput;
    limit?: number;
};
export type Company$usersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type CompanyDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CompanySelect<ExtArgs> | null;
    omit?: Prisma.CompanyOmit<ExtArgs> | null;
    include?: Prisma.CompanyInclude<ExtArgs> | null;
};
export {};
