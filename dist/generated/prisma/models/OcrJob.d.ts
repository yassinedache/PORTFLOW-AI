import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OcrJobModel = runtime.Types.Result.DefaultSelection<Prisma.$OcrJobPayload>;
export type AggregateOcrJob = {
    _count: OcrJobCountAggregateOutputType | null;
    _min: OcrJobMinAggregateOutputType | null;
    _max: OcrJobMaxAggregateOutputType | null;
};
export type OcrJobMinAggregateOutputType = {
    id: string | null;
    documentId: string | null;
    status: $Enums.OcrJobStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OcrJobMaxAggregateOutputType = {
    id: string | null;
    documentId: string | null;
    status: $Enums.OcrJobStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OcrJobCountAggregateOutputType = {
    id: number;
    documentId: number;
    status: number;
    resultJson: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OcrJobMinAggregateInputType = {
    id?: true;
    documentId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OcrJobMaxAggregateInputType = {
    id?: true;
    documentId?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OcrJobCountAggregateInputType = {
    id?: true;
    documentId?: true;
    status?: true;
    resultJson?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OcrJobAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OcrJobWhereInput;
    orderBy?: Prisma.OcrJobOrderByWithRelationInput | Prisma.OcrJobOrderByWithRelationInput[];
    cursor?: Prisma.OcrJobWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OcrJobCountAggregateInputType;
    _min?: OcrJobMinAggregateInputType;
    _max?: OcrJobMaxAggregateInputType;
};
export type GetOcrJobAggregateType<T extends OcrJobAggregateArgs> = {
    [P in keyof T & keyof AggregateOcrJob]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOcrJob[P]> : Prisma.GetScalarType<T[P], AggregateOcrJob[P]>;
};
export type OcrJobGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OcrJobWhereInput;
    orderBy?: Prisma.OcrJobOrderByWithAggregationInput | Prisma.OcrJobOrderByWithAggregationInput[];
    by: Prisma.OcrJobScalarFieldEnum[] | Prisma.OcrJobScalarFieldEnum;
    having?: Prisma.OcrJobScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OcrJobCountAggregateInputType | true;
    _min?: OcrJobMinAggregateInputType;
    _max?: OcrJobMaxAggregateInputType;
};
export type OcrJobGroupByOutputType = {
    id: string;
    documentId: string;
    status: $Enums.OcrJobStatus;
    resultJson: runtime.JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OcrJobCountAggregateOutputType | null;
    _min: OcrJobMinAggregateOutputType | null;
    _max: OcrJobMaxAggregateOutputType | null;
};
type GetOcrJobGroupByPayload<T extends OcrJobGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OcrJobGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OcrJobGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OcrJobGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OcrJobGroupByOutputType[P]>;
}>>;
export type OcrJobWhereInput = {
    AND?: Prisma.OcrJobWhereInput | Prisma.OcrJobWhereInput[];
    OR?: Prisma.OcrJobWhereInput[];
    NOT?: Prisma.OcrJobWhereInput | Prisma.OcrJobWhereInput[];
    id?: Prisma.UuidFilter<"OcrJob"> | string;
    documentId?: Prisma.UuidFilter<"OcrJob"> | string;
    status?: Prisma.EnumOcrJobStatusFilter<"OcrJob"> | $Enums.OcrJobStatus;
    resultJson?: Prisma.JsonNullableFilter<"OcrJob">;
    createdAt?: Prisma.DateTimeFilter<"OcrJob"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OcrJob"> | Date | string;
    document?: Prisma.XOR<Prisma.DocumentScalarRelationFilter, Prisma.DocumentWhereInput>;
};
export type OcrJobOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resultJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    document?: Prisma.DocumentOrderByWithRelationInput;
};
export type OcrJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OcrJobWhereInput | Prisma.OcrJobWhereInput[];
    OR?: Prisma.OcrJobWhereInput[];
    NOT?: Prisma.OcrJobWhereInput | Prisma.OcrJobWhereInput[];
    documentId?: Prisma.UuidFilter<"OcrJob"> | string;
    status?: Prisma.EnumOcrJobStatusFilter<"OcrJob"> | $Enums.OcrJobStatus;
    resultJson?: Prisma.JsonNullableFilter<"OcrJob">;
    createdAt?: Prisma.DateTimeFilter<"OcrJob"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OcrJob"> | Date | string;
    document?: Prisma.XOR<Prisma.DocumentScalarRelationFilter, Prisma.DocumentWhereInput>;
}, "id">;
export type OcrJobOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resultJson?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OcrJobCountOrderByAggregateInput;
    _max?: Prisma.OcrJobMaxOrderByAggregateInput;
    _min?: Prisma.OcrJobMinOrderByAggregateInput;
};
export type OcrJobScalarWhereWithAggregatesInput = {
    AND?: Prisma.OcrJobScalarWhereWithAggregatesInput | Prisma.OcrJobScalarWhereWithAggregatesInput[];
    OR?: Prisma.OcrJobScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OcrJobScalarWhereWithAggregatesInput | Prisma.OcrJobScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"OcrJob"> | string;
    documentId?: Prisma.UuidWithAggregatesFilter<"OcrJob"> | string;
    status?: Prisma.EnumOcrJobStatusWithAggregatesFilter<"OcrJob"> | $Enums.OcrJobStatus;
    resultJson?: Prisma.JsonNullableWithAggregatesFilter<"OcrJob">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OcrJob"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"OcrJob"> | Date | string;
};
export type OcrJobCreateInput = {
    id?: string;
    status?: $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    document: Prisma.DocumentCreateNestedOneWithoutOcrJobsInput;
};
export type OcrJobUncheckedCreateInput = {
    id?: string;
    documentId: string;
    status?: $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OcrJobUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOcrJobStatusFieldUpdateOperationsInput | $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    document?: Prisma.DocumentUpdateOneRequiredWithoutOcrJobsNestedInput;
};
export type OcrJobUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    documentId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOcrJobStatusFieldUpdateOperationsInput | $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OcrJobCreateManyInput = {
    id?: string;
    documentId: string;
    status?: $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OcrJobUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOcrJobStatusFieldUpdateOperationsInput | $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OcrJobUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    documentId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOcrJobStatusFieldUpdateOperationsInput | $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OcrJobListRelationFilter = {
    every?: Prisma.OcrJobWhereInput;
    some?: Prisma.OcrJobWhereInput;
    none?: Prisma.OcrJobWhereInput;
};
export type OcrJobOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OcrJobCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    resultJson?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OcrJobMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OcrJobMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    documentId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OcrJobCreateNestedManyWithoutDocumentInput = {
    create?: Prisma.XOR<Prisma.OcrJobCreateWithoutDocumentInput, Prisma.OcrJobUncheckedCreateWithoutDocumentInput> | Prisma.OcrJobCreateWithoutDocumentInput[] | Prisma.OcrJobUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.OcrJobCreateOrConnectWithoutDocumentInput | Prisma.OcrJobCreateOrConnectWithoutDocumentInput[];
    createMany?: Prisma.OcrJobCreateManyDocumentInputEnvelope;
    connect?: Prisma.OcrJobWhereUniqueInput | Prisma.OcrJobWhereUniqueInput[];
};
export type OcrJobUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: Prisma.XOR<Prisma.OcrJobCreateWithoutDocumentInput, Prisma.OcrJobUncheckedCreateWithoutDocumentInput> | Prisma.OcrJobCreateWithoutDocumentInput[] | Prisma.OcrJobUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.OcrJobCreateOrConnectWithoutDocumentInput | Prisma.OcrJobCreateOrConnectWithoutDocumentInput[];
    createMany?: Prisma.OcrJobCreateManyDocumentInputEnvelope;
    connect?: Prisma.OcrJobWhereUniqueInput | Prisma.OcrJobWhereUniqueInput[];
};
export type OcrJobUpdateManyWithoutDocumentNestedInput = {
    create?: Prisma.XOR<Prisma.OcrJobCreateWithoutDocumentInput, Prisma.OcrJobUncheckedCreateWithoutDocumentInput> | Prisma.OcrJobCreateWithoutDocumentInput[] | Prisma.OcrJobUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.OcrJobCreateOrConnectWithoutDocumentInput | Prisma.OcrJobCreateOrConnectWithoutDocumentInput[];
    upsert?: Prisma.OcrJobUpsertWithWhereUniqueWithoutDocumentInput | Prisma.OcrJobUpsertWithWhereUniqueWithoutDocumentInput[];
    createMany?: Prisma.OcrJobCreateManyDocumentInputEnvelope;
    set?: Prisma.OcrJobWhereUniqueInput | Prisma.OcrJobWhereUniqueInput[];
    disconnect?: Prisma.OcrJobWhereUniqueInput | Prisma.OcrJobWhereUniqueInput[];
    delete?: Prisma.OcrJobWhereUniqueInput | Prisma.OcrJobWhereUniqueInput[];
    connect?: Prisma.OcrJobWhereUniqueInput | Prisma.OcrJobWhereUniqueInput[];
    update?: Prisma.OcrJobUpdateWithWhereUniqueWithoutDocumentInput | Prisma.OcrJobUpdateWithWhereUniqueWithoutDocumentInput[];
    updateMany?: Prisma.OcrJobUpdateManyWithWhereWithoutDocumentInput | Prisma.OcrJobUpdateManyWithWhereWithoutDocumentInput[];
    deleteMany?: Prisma.OcrJobScalarWhereInput | Prisma.OcrJobScalarWhereInput[];
};
export type OcrJobUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: Prisma.XOR<Prisma.OcrJobCreateWithoutDocumentInput, Prisma.OcrJobUncheckedCreateWithoutDocumentInput> | Prisma.OcrJobCreateWithoutDocumentInput[] | Prisma.OcrJobUncheckedCreateWithoutDocumentInput[];
    connectOrCreate?: Prisma.OcrJobCreateOrConnectWithoutDocumentInput | Prisma.OcrJobCreateOrConnectWithoutDocumentInput[];
    upsert?: Prisma.OcrJobUpsertWithWhereUniqueWithoutDocumentInput | Prisma.OcrJobUpsertWithWhereUniqueWithoutDocumentInput[];
    createMany?: Prisma.OcrJobCreateManyDocumentInputEnvelope;
    set?: Prisma.OcrJobWhereUniqueInput | Prisma.OcrJobWhereUniqueInput[];
    disconnect?: Prisma.OcrJobWhereUniqueInput | Prisma.OcrJobWhereUniqueInput[];
    delete?: Prisma.OcrJobWhereUniqueInput | Prisma.OcrJobWhereUniqueInput[];
    connect?: Prisma.OcrJobWhereUniqueInput | Prisma.OcrJobWhereUniqueInput[];
    update?: Prisma.OcrJobUpdateWithWhereUniqueWithoutDocumentInput | Prisma.OcrJobUpdateWithWhereUniqueWithoutDocumentInput[];
    updateMany?: Prisma.OcrJobUpdateManyWithWhereWithoutDocumentInput | Prisma.OcrJobUpdateManyWithWhereWithoutDocumentInput[];
    deleteMany?: Prisma.OcrJobScalarWhereInput | Prisma.OcrJobScalarWhereInput[];
};
export type EnumOcrJobStatusFieldUpdateOperationsInput = {
    set?: $Enums.OcrJobStatus;
};
export type OcrJobCreateWithoutDocumentInput = {
    id?: string;
    status?: $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OcrJobUncheckedCreateWithoutDocumentInput = {
    id?: string;
    status?: $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OcrJobCreateOrConnectWithoutDocumentInput = {
    where: Prisma.OcrJobWhereUniqueInput;
    create: Prisma.XOR<Prisma.OcrJobCreateWithoutDocumentInput, Prisma.OcrJobUncheckedCreateWithoutDocumentInput>;
};
export type OcrJobCreateManyDocumentInputEnvelope = {
    data: Prisma.OcrJobCreateManyDocumentInput | Prisma.OcrJobCreateManyDocumentInput[];
    skipDuplicates?: boolean;
};
export type OcrJobUpsertWithWhereUniqueWithoutDocumentInput = {
    where: Prisma.OcrJobWhereUniqueInput;
    update: Prisma.XOR<Prisma.OcrJobUpdateWithoutDocumentInput, Prisma.OcrJobUncheckedUpdateWithoutDocumentInput>;
    create: Prisma.XOR<Prisma.OcrJobCreateWithoutDocumentInput, Prisma.OcrJobUncheckedCreateWithoutDocumentInput>;
};
export type OcrJobUpdateWithWhereUniqueWithoutDocumentInput = {
    where: Prisma.OcrJobWhereUniqueInput;
    data: Prisma.XOR<Prisma.OcrJobUpdateWithoutDocumentInput, Prisma.OcrJobUncheckedUpdateWithoutDocumentInput>;
};
export type OcrJobUpdateManyWithWhereWithoutDocumentInput = {
    where: Prisma.OcrJobScalarWhereInput;
    data: Prisma.XOR<Prisma.OcrJobUpdateManyMutationInput, Prisma.OcrJobUncheckedUpdateManyWithoutDocumentInput>;
};
export type OcrJobScalarWhereInput = {
    AND?: Prisma.OcrJobScalarWhereInput | Prisma.OcrJobScalarWhereInput[];
    OR?: Prisma.OcrJobScalarWhereInput[];
    NOT?: Prisma.OcrJobScalarWhereInput | Prisma.OcrJobScalarWhereInput[];
    id?: Prisma.UuidFilter<"OcrJob"> | string;
    documentId?: Prisma.UuidFilter<"OcrJob"> | string;
    status?: Prisma.EnumOcrJobStatusFilter<"OcrJob"> | $Enums.OcrJobStatus;
    resultJson?: Prisma.JsonNullableFilter<"OcrJob">;
    createdAt?: Prisma.DateTimeFilter<"OcrJob"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"OcrJob"> | Date | string;
};
export type OcrJobCreateManyDocumentInput = {
    id?: string;
    status?: $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OcrJobUpdateWithoutDocumentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOcrJobStatusFieldUpdateOperationsInput | $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OcrJobUncheckedUpdateWithoutDocumentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOcrJobStatusFieldUpdateOperationsInput | $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OcrJobUncheckedUpdateManyWithoutDocumentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOcrJobStatusFieldUpdateOperationsInput | $Enums.OcrJobStatus;
    resultJson?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OcrJobSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    documentId?: boolean;
    status?: boolean;
    resultJson?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ocrJob"]>;
export type OcrJobSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    documentId?: boolean;
    status?: boolean;
    resultJson?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ocrJob"]>;
export type OcrJobSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    documentId?: boolean;
    status?: boolean;
    resultJson?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ocrJob"]>;
export type OcrJobSelectScalar = {
    id?: boolean;
    documentId?: boolean;
    status?: boolean;
    resultJson?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OcrJobOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "documentId" | "status" | "resultJson" | "createdAt" | "updatedAt", ExtArgs["result"]["ocrJob"]>;
export type OcrJobInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
};
export type OcrJobIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
};
export type OcrJobIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    document?: boolean | Prisma.DocumentDefaultArgs<ExtArgs>;
};
export type $OcrJobPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OcrJob";
    objects: {
        document: Prisma.$DocumentPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        documentId: string;
        status: $Enums.OcrJobStatus;
        resultJson: runtime.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["ocrJob"]>;
    composites: {};
};
export type OcrJobGetPayload<S extends boolean | null | undefined | OcrJobDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OcrJobPayload, S>;
export type OcrJobCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OcrJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OcrJobCountAggregateInputType | true;
};
export interface OcrJobDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OcrJob'];
        meta: {
            name: 'OcrJob';
        };
    };
    findUnique<T extends OcrJobFindUniqueArgs>(args: Prisma.SelectSubset<T, OcrJobFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OcrJobClient<runtime.Types.Result.GetResult<Prisma.$OcrJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OcrJobFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OcrJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OcrJobClient<runtime.Types.Result.GetResult<Prisma.$OcrJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OcrJobFindFirstArgs>(args?: Prisma.SelectSubset<T, OcrJobFindFirstArgs<ExtArgs>>): Prisma.Prisma__OcrJobClient<runtime.Types.Result.GetResult<Prisma.$OcrJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OcrJobFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OcrJobFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OcrJobClient<runtime.Types.Result.GetResult<Prisma.$OcrJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OcrJobFindManyArgs>(args?: Prisma.SelectSubset<T, OcrJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OcrJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OcrJobCreateArgs>(args: Prisma.SelectSubset<T, OcrJobCreateArgs<ExtArgs>>): Prisma.Prisma__OcrJobClient<runtime.Types.Result.GetResult<Prisma.$OcrJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OcrJobCreateManyArgs>(args?: Prisma.SelectSubset<T, OcrJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OcrJobCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OcrJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OcrJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OcrJobDeleteArgs>(args: Prisma.SelectSubset<T, OcrJobDeleteArgs<ExtArgs>>): Prisma.Prisma__OcrJobClient<runtime.Types.Result.GetResult<Prisma.$OcrJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OcrJobUpdateArgs>(args: Prisma.SelectSubset<T, OcrJobUpdateArgs<ExtArgs>>): Prisma.Prisma__OcrJobClient<runtime.Types.Result.GetResult<Prisma.$OcrJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OcrJobDeleteManyArgs>(args?: Prisma.SelectSubset<T, OcrJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OcrJobUpdateManyArgs>(args: Prisma.SelectSubset<T, OcrJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OcrJobUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OcrJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OcrJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OcrJobUpsertArgs>(args: Prisma.SelectSubset<T, OcrJobUpsertArgs<ExtArgs>>): Prisma.Prisma__OcrJobClient<runtime.Types.Result.GetResult<Prisma.$OcrJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OcrJobCountArgs>(args?: Prisma.Subset<T, OcrJobCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OcrJobCountAggregateOutputType> : number>;
    aggregate<T extends OcrJobAggregateArgs>(args: Prisma.Subset<T, OcrJobAggregateArgs>): Prisma.PrismaPromise<GetOcrJobAggregateType<T>>;
    groupBy<T extends OcrJobGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OcrJobGroupByArgs['orderBy'];
    } : {
        orderBy?: OcrJobGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OcrJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOcrJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OcrJobFieldRefs;
}
export interface Prisma__OcrJobClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    document<T extends Prisma.DocumentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DocumentDefaultArgs<ExtArgs>>): Prisma.Prisma__DocumentClient<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OcrJobFieldRefs {
    readonly id: Prisma.FieldRef<"OcrJob", 'String'>;
    readonly documentId: Prisma.FieldRef<"OcrJob", 'String'>;
    readonly status: Prisma.FieldRef<"OcrJob", 'OcrJobStatus'>;
    readonly resultJson: Prisma.FieldRef<"OcrJob", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"OcrJob", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"OcrJob", 'DateTime'>;
}
export type OcrJobFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OcrJobSelect<ExtArgs> | null;
    omit?: Prisma.OcrJobOmit<ExtArgs> | null;
    include?: Prisma.OcrJobInclude<ExtArgs> | null;
    where: Prisma.OcrJobWhereUniqueInput;
};
export type OcrJobFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OcrJobSelect<ExtArgs> | null;
    omit?: Prisma.OcrJobOmit<ExtArgs> | null;
    include?: Prisma.OcrJobInclude<ExtArgs> | null;
    where: Prisma.OcrJobWhereUniqueInput;
};
export type OcrJobFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OcrJobFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OcrJobFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OcrJobCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OcrJobSelect<ExtArgs> | null;
    omit?: Prisma.OcrJobOmit<ExtArgs> | null;
    include?: Prisma.OcrJobInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OcrJobCreateInput, Prisma.OcrJobUncheckedCreateInput>;
};
export type OcrJobCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OcrJobCreateManyInput | Prisma.OcrJobCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OcrJobCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OcrJobSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OcrJobOmit<ExtArgs> | null;
    data: Prisma.OcrJobCreateManyInput | Prisma.OcrJobCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OcrJobIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OcrJobUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OcrJobSelect<ExtArgs> | null;
    omit?: Prisma.OcrJobOmit<ExtArgs> | null;
    include?: Prisma.OcrJobInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OcrJobUpdateInput, Prisma.OcrJobUncheckedUpdateInput>;
    where: Prisma.OcrJobWhereUniqueInput;
};
export type OcrJobUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OcrJobUpdateManyMutationInput, Prisma.OcrJobUncheckedUpdateManyInput>;
    where?: Prisma.OcrJobWhereInput;
    limit?: number;
};
export type OcrJobUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OcrJobSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OcrJobOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OcrJobUpdateManyMutationInput, Prisma.OcrJobUncheckedUpdateManyInput>;
    where?: Prisma.OcrJobWhereInput;
    limit?: number;
    include?: Prisma.OcrJobIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OcrJobUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OcrJobSelect<ExtArgs> | null;
    omit?: Prisma.OcrJobOmit<ExtArgs> | null;
    include?: Prisma.OcrJobInclude<ExtArgs> | null;
    where: Prisma.OcrJobWhereUniqueInput;
    create: Prisma.XOR<Prisma.OcrJobCreateInput, Prisma.OcrJobUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OcrJobUpdateInput, Prisma.OcrJobUncheckedUpdateInput>;
};
export type OcrJobDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OcrJobSelect<ExtArgs> | null;
    omit?: Prisma.OcrJobOmit<ExtArgs> | null;
    include?: Prisma.OcrJobInclude<ExtArgs> | null;
    where: Prisma.OcrJobWhereUniqueInput;
};
export type OcrJobDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OcrJobWhereInput;
    limit?: number;
};
export type OcrJobDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OcrJobSelect<ExtArgs> | null;
    omit?: Prisma.OcrJobOmit<ExtArgs> | null;
    include?: Prisma.OcrJobInclude<ExtArgs> | null;
};
export {};
