import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type DocumentModel = runtime.Types.Result.DefaultSelection<Prisma.$DocumentPayload>;
export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null;
    _min: DocumentMinAggregateOutputType | null;
    _max: DocumentMaxAggregateOutputType | null;
};
export type DocumentMinAggregateOutputType = {
    id: string | null;
    type: $Enums.DocumentType | null;
    status: string | null;
    fileName: string | null;
    filePath: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type DocumentMaxAggregateOutputType = {
    id: string | null;
    type: $Enums.DocumentType | null;
    status: string | null;
    fileName: string | null;
    filePath: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type DocumentCountAggregateOutputType = {
    id: number;
    type: number;
    status: number;
    fileName: number;
    filePath: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type DocumentMinAggregateInputType = {
    id?: true;
    type?: true;
    status?: true;
    fileName?: true;
    filePath?: true;
    userId?: true;
    createdAt?: true;
};
export type DocumentMaxAggregateInputType = {
    id?: true;
    type?: true;
    status?: true;
    fileName?: true;
    filePath?: true;
    userId?: true;
    createdAt?: true;
};
export type DocumentCountAggregateInputType = {
    id?: true;
    type?: true;
    status?: true;
    fileName?: true;
    filePath?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type DocumentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocumentWhereInput;
    orderBy?: Prisma.DocumentOrderByWithRelationInput | Prisma.DocumentOrderByWithRelationInput[];
    cursor?: Prisma.DocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DocumentCountAggregateInputType;
    _min?: DocumentMinAggregateInputType;
    _max?: DocumentMaxAggregateInputType;
};
export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
    [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDocument[P]> : Prisma.GetScalarType<T[P], AggregateDocument[P]>;
};
export type DocumentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocumentWhereInput;
    orderBy?: Prisma.DocumentOrderByWithAggregationInput | Prisma.DocumentOrderByWithAggregationInput[];
    by: Prisma.DocumentScalarFieldEnum[] | Prisma.DocumentScalarFieldEnum;
    having?: Prisma.DocumentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DocumentCountAggregateInputType | true;
    _min?: DocumentMinAggregateInputType;
    _max?: DocumentMaxAggregateInputType;
};
export type DocumentGroupByOutputType = {
    id: string;
    type: $Enums.DocumentType;
    status: string;
    fileName: string;
    filePath: string;
    userId: string;
    createdAt: Date;
    _count: DocumentCountAggregateOutputType | null;
    _min: DocumentMinAggregateOutputType | null;
    _max: DocumentMaxAggregateOutputType | null;
};
type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DocumentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DocumentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DocumentGroupByOutputType[P]>;
}>>;
export type DocumentWhereInput = {
    AND?: Prisma.DocumentWhereInput | Prisma.DocumentWhereInput[];
    OR?: Prisma.DocumentWhereInput[];
    NOT?: Prisma.DocumentWhereInput | Prisma.DocumentWhereInput[];
    id?: Prisma.UuidFilter<"Document"> | string;
    type?: Prisma.EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType;
    status?: Prisma.StringFilter<"Document"> | string;
    fileName?: Prisma.StringFilter<"Document"> | string;
    filePath?: Prisma.StringFilter<"Document"> | string;
    userId?: Prisma.UuidFilter<"Document"> | string;
    createdAt?: Prisma.DateTimeFilter<"Document"> | Date | string;
    ocrJobs?: Prisma.OcrJobListRelationFilter;
};
export type DocumentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    ocrJobs?: Prisma.OcrJobOrderByRelationAggregateInput;
};
export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DocumentWhereInput | Prisma.DocumentWhereInput[];
    OR?: Prisma.DocumentWhereInput[];
    NOT?: Prisma.DocumentWhereInput | Prisma.DocumentWhereInput[];
    type?: Prisma.EnumDocumentTypeFilter<"Document"> | $Enums.DocumentType;
    status?: Prisma.StringFilter<"Document"> | string;
    fileName?: Prisma.StringFilter<"Document"> | string;
    filePath?: Prisma.StringFilter<"Document"> | string;
    userId?: Prisma.UuidFilter<"Document"> | string;
    createdAt?: Prisma.DateTimeFilter<"Document"> | Date | string;
    ocrJobs?: Prisma.OcrJobListRelationFilter;
}, "id">;
export type DocumentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DocumentCountOrderByAggregateInput;
    _max?: Prisma.DocumentMaxOrderByAggregateInput;
    _min?: Prisma.DocumentMinOrderByAggregateInput;
};
export type DocumentScalarWhereWithAggregatesInput = {
    AND?: Prisma.DocumentScalarWhereWithAggregatesInput | Prisma.DocumentScalarWhereWithAggregatesInput[];
    OR?: Prisma.DocumentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DocumentScalarWhereWithAggregatesInput | Prisma.DocumentScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Document"> | string;
    type?: Prisma.EnumDocumentTypeWithAggregatesFilter<"Document"> | $Enums.DocumentType;
    status?: Prisma.StringWithAggregatesFilter<"Document"> | string;
    fileName?: Prisma.StringWithAggregatesFilter<"Document"> | string;
    filePath?: Prisma.StringWithAggregatesFilter<"Document"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"Document"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Document"> | Date | string;
};
export type DocumentCreateInput = {
    id?: string;
    type: $Enums.DocumentType;
    status?: string;
    fileName: string;
    filePath: string;
    userId: string;
    createdAt?: Date | string;
    ocrJobs?: Prisma.OcrJobCreateNestedManyWithoutDocumentInput;
};
export type DocumentUncheckedCreateInput = {
    id?: string;
    type: $Enums.DocumentType;
    status?: string;
    fileName: string;
    filePath: string;
    userId: string;
    createdAt?: Date | string;
    ocrJobs?: Prisma.OcrJobUncheckedCreateNestedManyWithoutDocumentInput;
};
export type DocumentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ocrJobs?: Prisma.OcrJobUpdateManyWithoutDocumentNestedInput;
};
export type DocumentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ocrJobs?: Prisma.OcrJobUncheckedUpdateManyWithoutDocumentNestedInput;
};
export type DocumentCreateManyInput = {
    id?: string;
    type: $Enums.DocumentType;
    status?: string;
    fileName: string;
    filePath: string;
    userId: string;
    createdAt?: Date | string;
};
export type DocumentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DocumentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DocumentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    filePath?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DocumentScalarRelationFilter = {
    is?: Prisma.DocumentWhereInput;
    isNot?: Prisma.DocumentWhereInput;
};
export type EnumDocumentTypeFieldUpdateOperationsInput = {
    set?: $Enums.DocumentType;
};
export type DocumentCreateNestedOneWithoutOcrJobsInput = {
    create?: Prisma.XOR<Prisma.DocumentCreateWithoutOcrJobsInput, Prisma.DocumentUncheckedCreateWithoutOcrJobsInput>;
    connectOrCreate?: Prisma.DocumentCreateOrConnectWithoutOcrJobsInput;
    connect?: Prisma.DocumentWhereUniqueInput;
};
export type DocumentUpdateOneRequiredWithoutOcrJobsNestedInput = {
    create?: Prisma.XOR<Prisma.DocumentCreateWithoutOcrJobsInput, Prisma.DocumentUncheckedCreateWithoutOcrJobsInput>;
    connectOrCreate?: Prisma.DocumentCreateOrConnectWithoutOcrJobsInput;
    upsert?: Prisma.DocumentUpsertWithoutOcrJobsInput;
    connect?: Prisma.DocumentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DocumentUpdateToOneWithWhereWithoutOcrJobsInput, Prisma.DocumentUpdateWithoutOcrJobsInput>, Prisma.DocumentUncheckedUpdateWithoutOcrJobsInput>;
};
export type DocumentCreateWithoutOcrJobsInput = {
    id?: string;
    type: $Enums.DocumentType;
    status?: string;
    fileName: string;
    filePath: string;
    userId: string;
    createdAt?: Date | string;
};
export type DocumentUncheckedCreateWithoutOcrJobsInput = {
    id?: string;
    type: $Enums.DocumentType;
    status?: string;
    fileName: string;
    filePath: string;
    userId: string;
    createdAt?: Date | string;
};
export type DocumentCreateOrConnectWithoutOcrJobsInput = {
    where: Prisma.DocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DocumentCreateWithoutOcrJobsInput, Prisma.DocumentUncheckedCreateWithoutOcrJobsInput>;
};
export type DocumentUpsertWithoutOcrJobsInput = {
    update: Prisma.XOR<Prisma.DocumentUpdateWithoutOcrJobsInput, Prisma.DocumentUncheckedUpdateWithoutOcrJobsInput>;
    create: Prisma.XOR<Prisma.DocumentCreateWithoutOcrJobsInput, Prisma.DocumentUncheckedCreateWithoutOcrJobsInput>;
    where?: Prisma.DocumentWhereInput;
};
export type DocumentUpdateToOneWithWhereWithoutOcrJobsInput = {
    where?: Prisma.DocumentWhereInput;
    data: Prisma.XOR<Prisma.DocumentUpdateWithoutOcrJobsInput, Prisma.DocumentUncheckedUpdateWithoutOcrJobsInput>;
};
export type DocumentUpdateWithoutOcrJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentUncheckedUpdateWithoutOcrJobsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumDocumentTypeFieldUpdateOperationsInput | $Enums.DocumentType;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    fileName?: Prisma.StringFieldUpdateOperationsInput | string;
    filePath?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DocumentCountOutputType = {
    ocrJobs: number;
};
export type DocumentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ocrJobs?: boolean | DocumentCountOutputTypeCountOcrJobsArgs;
};
export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentCountOutputTypeSelect<ExtArgs> | null;
};
export type DocumentCountOutputTypeCountOcrJobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OcrJobWhereInput;
};
export type DocumentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    status?: boolean;
    fileName?: boolean;
    filePath?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    ocrJobs?: boolean | Prisma.Document$ocrJobsArgs<ExtArgs>;
    _count?: boolean | Prisma.DocumentCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["document"]>;
export type DocumentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    status?: boolean;
    fileName?: boolean;
    filePath?: boolean;
    userId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["document"]>;
export type DocumentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    status?: boolean;
    fileName?: boolean;
    filePath?: boolean;
    userId?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["document"]>;
export type DocumentSelectScalar = {
    id?: boolean;
    type?: boolean;
    status?: boolean;
    fileName?: boolean;
    filePath?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type DocumentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "status" | "fileName" | "filePath" | "userId" | "createdAt", ExtArgs["result"]["document"]>;
export type DocumentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    ocrJobs?: boolean | Prisma.Document$ocrJobsArgs<ExtArgs>;
    _count?: boolean | Prisma.DocumentCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DocumentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type DocumentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $DocumentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Document";
    objects: {
        ocrJobs: Prisma.$OcrJobPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: $Enums.DocumentType;
        status: string;
        fileName: string;
        filePath: string;
        userId: string;
        createdAt: Date;
    }, ExtArgs["result"]["document"]>;
    composites: {};
};
export type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DocumentPayload, S>;
export type DocumentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DocumentCountAggregateInputType | true;
};
export interface DocumentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Document'];
        meta: {
            name: 'Document';
        };
    };
    findUnique<T extends DocumentFindUniqueArgs>(args: Prisma.SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DocumentClient<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DocumentClient<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DocumentFindFirstArgs>(args?: Prisma.SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma.Prisma__DocumentClient<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DocumentClient<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DocumentFindManyArgs>(args?: Prisma.SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DocumentCreateArgs>(args: Prisma.SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma.Prisma__DocumentClient<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DocumentCreateManyArgs>(args?: Prisma.SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DocumentDeleteArgs>(args: Prisma.SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma.Prisma__DocumentClient<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DocumentUpdateArgs>(args: Prisma.SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma.Prisma__DocumentClient<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DocumentDeleteManyArgs>(args?: Prisma.SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DocumentUpdateManyArgs>(args: Prisma.SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DocumentUpsertArgs>(args: Prisma.SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma.Prisma__DocumentClient<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DocumentCountArgs>(args?: Prisma.Subset<T, DocumentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DocumentCountAggregateOutputType> : number>;
    aggregate<T extends DocumentAggregateArgs>(args: Prisma.Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>;
    groupBy<T extends DocumentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DocumentGroupByArgs['orderBy'];
    } : {
        orderBy?: DocumentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DocumentFieldRefs;
}
export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    ocrJobs<T extends Prisma.Document$ocrJobsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Document$ocrJobsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OcrJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DocumentFieldRefs {
    readonly id: Prisma.FieldRef<"Document", 'String'>;
    readonly type: Prisma.FieldRef<"Document", 'DocumentType'>;
    readonly status: Prisma.FieldRef<"Document", 'String'>;
    readonly fileName: Prisma.FieldRef<"Document", 'String'>;
    readonly filePath: Prisma.FieldRef<"Document", 'String'>;
    readonly userId: Prisma.FieldRef<"Document", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Document", 'DateTime'>;
}
export type DocumentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentSelect<ExtArgs> | null;
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    include?: Prisma.DocumentInclude<ExtArgs> | null;
    where: Prisma.DocumentWhereUniqueInput;
};
export type DocumentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentSelect<ExtArgs> | null;
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    include?: Prisma.DocumentInclude<ExtArgs> | null;
    where: Prisma.DocumentWhereUniqueInput;
};
export type DocumentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentSelect<ExtArgs> | null;
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    include?: Prisma.DocumentInclude<ExtArgs> | null;
    where?: Prisma.DocumentWhereInput;
    orderBy?: Prisma.DocumentOrderByWithRelationInput | Prisma.DocumentOrderByWithRelationInput[];
    cursor?: Prisma.DocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DocumentScalarFieldEnum | Prisma.DocumentScalarFieldEnum[];
};
export type DocumentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentSelect<ExtArgs> | null;
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    include?: Prisma.DocumentInclude<ExtArgs> | null;
    where?: Prisma.DocumentWhereInput;
    orderBy?: Prisma.DocumentOrderByWithRelationInput | Prisma.DocumentOrderByWithRelationInput[];
    cursor?: Prisma.DocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DocumentScalarFieldEnum | Prisma.DocumentScalarFieldEnum[];
};
export type DocumentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentSelect<ExtArgs> | null;
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    include?: Prisma.DocumentInclude<ExtArgs> | null;
    where?: Prisma.DocumentWhereInput;
    orderBy?: Prisma.DocumentOrderByWithRelationInput | Prisma.DocumentOrderByWithRelationInput[];
    cursor?: Prisma.DocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DocumentScalarFieldEnum | Prisma.DocumentScalarFieldEnum[];
};
export type DocumentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentSelect<ExtArgs> | null;
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    include?: Prisma.DocumentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DocumentCreateInput, Prisma.DocumentUncheckedCreateInput>;
};
export type DocumentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DocumentCreateManyInput | Prisma.DocumentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DocumentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    data: Prisma.DocumentCreateManyInput | Prisma.DocumentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DocumentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentSelect<ExtArgs> | null;
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    include?: Prisma.DocumentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DocumentUpdateInput, Prisma.DocumentUncheckedUpdateInput>;
    where: Prisma.DocumentWhereUniqueInput;
};
export type DocumentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DocumentUpdateManyMutationInput, Prisma.DocumentUncheckedUpdateManyInput>;
    where?: Prisma.DocumentWhereInput;
    limit?: number;
};
export type DocumentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DocumentUpdateManyMutationInput, Prisma.DocumentUncheckedUpdateManyInput>;
    where?: Prisma.DocumentWhereInput;
    limit?: number;
};
export type DocumentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentSelect<ExtArgs> | null;
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    include?: Prisma.DocumentInclude<ExtArgs> | null;
    where: Prisma.DocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.DocumentCreateInput, Prisma.DocumentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DocumentUpdateInput, Prisma.DocumentUncheckedUpdateInput>;
};
export type DocumentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentSelect<ExtArgs> | null;
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    include?: Prisma.DocumentInclude<ExtArgs> | null;
    where: Prisma.DocumentWhereUniqueInput;
};
export type DocumentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocumentWhereInput;
    limit?: number;
};
export type Document$ocrJobsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OcrJobSelect<ExtArgs> | null;
    omit?: Prisma.OcrJobOmit<ExtArgs> | null;
    include?: Prisma.OcrJobInclude<ExtArgs> | null;
    where?: Prisma.OcrJobWhereInput;
    orderBy?: Prisma.OcrJobOrderByWithRelationInput | Prisma.OcrJobOrderByWithRelationInput[];
    cursor?: Prisma.OcrJobWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OcrJobScalarFieldEnum | Prisma.OcrJobScalarFieldEnum[];
};
export type DocumentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DocumentSelect<ExtArgs> | null;
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    include?: Prisma.DocumentInclude<ExtArgs> | null;
};
export {};
