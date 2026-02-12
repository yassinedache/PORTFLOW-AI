import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type AiSessionModel = runtime.Types.Result.DefaultSelection<Prisma.$AiSessionPayload>;
export type AggregateAiSession = {
    _count: AiSessionCountAggregateOutputType | null;
    _min: AiSessionMinAggregateOutputType | null;
    _max: AiSessionMaxAggregateOutputType | null;
};
export type AiSessionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    createdAt: Date | null;
    currentIntent: string | null;
    status: string | null;
    lastQuestionType: string | null;
};
export type AiSessionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    createdAt: Date | null;
    currentIntent: string | null;
    status: string | null;
    lastQuestionType: string | null;
};
export type AiSessionCountAggregateOutputType = {
    id: number;
    userId: number;
    createdAt: number;
    currentIntent: number;
    status: number;
    lastQuestionType: number;
    context: number;
    _all: number;
};
export type AiSessionMinAggregateInputType = {
    id?: true;
    userId?: true;
    createdAt?: true;
    currentIntent?: true;
    status?: true;
    lastQuestionType?: true;
};
export type AiSessionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    createdAt?: true;
    currentIntent?: true;
    status?: true;
    lastQuestionType?: true;
};
export type AiSessionCountAggregateInputType = {
    id?: true;
    userId?: true;
    createdAt?: true;
    currentIntent?: true;
    status?: true;
    lastQuestionType?: true;
    context?: true;
    _all?: true;
};
export type AiSessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiSessionWhereInput;
    orderBy?: Prisma.AiSessionOrderByWithRelationInput | Prisma.AiSessionOrderByWithRelationInput[];
    cursor?: Prisma.AiSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AiSessionCountAggregateInputType;
    _min?: AiSessionMinAggregateInputType;
    _max?: AiSessionMaxAggregateInputType;
};
export type GetAiSessionAggregateType<T extends AiSessionAggregateArgs> = {
    [P in keyof T & keyof AggregateAiSession]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAiSession[P]> : Prisma.GetScalarType<T[P], AggregateAiSession[P]>;
};
export type AiSessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiSessionWhereInput;
    orderBy?: Prisma.AiSessionOrderByWithAggregationInput | Prisma.AiSessionOrderByWithAggregationInput[];
    by: Prisma.AiSessionScalarFieldEnum[] | Prisma.AiSessionScalarFieldEnum;
    having?: Prisma.AiSessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AiSessionCountAggregateInputType | true;
    _min?: AiSessionMinAggregateInputType;
    _max?: AiSessionMaxAggregateInputType;
};
export type AiSessionGroupByOutputType = {
    id: string;
    userId: string;
    createdAt: Date;
    currentIntent: string | null;
    status: string;
    lastQuestionType: string | null;
    context: runtime.JsonValue | null;
    _count: AiSessionCountAggregateOutputType | null;
    _min: AiSessionMinAggregateOutputType | null;
    _max: AiSessionMaxAggregateOutputType | null;
};
type GetAiSessionGroupByPayload<T extends AiSessionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AiSessionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AiSessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AiSessionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AiSessionGroupByOutputType[P]>;
}>>;
export type AiSessionWhereInput = {
    AND?: Prisma.AiSessionWhereInput | Prisma.AiSessionWhereInput[];
    OR?: Prisma.AiSessionWhereInput[];
    NOT?: Prisma.AiSessionWhereInput | Prisma.AiSessionWhereInput[];
    id?: Prisma.UuidFilter<"AiSession"> | string;
    userId?: Prisma.UuidFilter<"AiSession"> | string;
    createdAt?: Prisma.DateTimeFilter<"AiSession"> | Date | string;
    currentIntent?: Prisma.StringNullableFilter<"AiSession"> | string | null;
    status?: Prisma.StringFilter<"AiSession"> | string;
    lastQuestionType?: Prisma.StringNullableFilter<"AiSession"> | string | null;
    context?: Prisma.JsonNullableFilter<"AiSession">;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    messages?: Prisma.AiMessageListRelationFilter;
};
export type AiSessionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    currentIntent?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lastQuestionType?: Prisma.SortOrderInput | Prisma.SortOrder;
    context?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    messages?: Prisma.AiMessageOrderByRelationAggregateInput;
};
export type AiSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AiSessionWhereInput | Prisma.AiSessionWhereInput[];
    OR?: Prisma.AiSessionWhereInput[];
    NOT?: Prisma.AiSessionWhereInput | Prisma.AiSessionWhereInput[];
    userId?: Prisma.UuidFilter<"AiSession"> | string;
    createdAt?: Prisma.DateTimeFilter<"AiSession"> | Date | string;
    currentIntent?: Prisma.StringNullableFilter<"AiSession"> | string | null;
    status?: Prisma.StringFilter<"AiSession"> | string;
    lastQuestionType?: Prisma.StringNullableFilter<"AiSession"> | string | null;
    context?: Prisma.JsonNullableFilter<"AiSession">;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    messages?: Prisma.AiMessageListRelationFilter;
}, "id">;
export type AiSessionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    currentIntent?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lastQuestionType?: Prisma.SortOrderInput | Prisma.SortOrder;
    context?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.AiSessionCountOrderByAggregateInput;
    _max?: Prisma.AiSessionMaxOrderByAggregateInput;
    _min?: Prisma.AiSessionMinOrderByAggregateInput;
};
export type AiSessionScalarWhereWithAggregatesInput = {
    AND?: Prisma.AiSessionScalarWhereWithAggregatesInput | Prisma.AiSessionScalarWhereWithAggregatesInput[];
    OR?: Prisma.AiSessionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AiSessionScalarWhereWithAggregatesInput | Prisma.AiSessionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"AiSession"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"AiSession"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AiSession"> | Date | string;
    currentIntent?: Prisma.StringNullableWithAggregatesFilter<"AiSession"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"AiSession"> | string;
    lastQuestionType?: Prisma.StringNullableWithAggregatesFilter<"AiSession"> | string | null;
    context?: Prisma.JsonNullableWithAggregatesFilter<"AiSession">;
};
export type AiSessionCreateInput = {
    id?: string;
    createdAt?: Date | string;
    currentIntent?: string | null;
    status?: string;
    lastQuestionType?: string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    user: Prisma.UserCreateNestedOneWithoutAiSessionsInput;
    messages?: Prisma.AiMessageCreateNestedManyWithoutSessionInput;
};
export type AiSessionUncheckedCreateInput = {
    id?: string;
    userId: string;
    createdAt?: Date | string;
    currentIntent?: string | null;
    status?: string;
    lastQuestionType?: string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    messages?: Prisma.AiMessageUncheckedCreateNestedManyWithoutSessionInput;
};
export type AiSessionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentIntent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lastQuestionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    user?: Prisma.UserUpdateOneRequiredWithoutAiSessionsNestedInput;
    messages?: Prisma.AiMessageUpdateManyWithoutSessionNestedInput;
};
export type AiSessionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentIntent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lastQuestionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    messages?: Prisma.AiMessageUncheckedUpdateManyWithoutSessionNestedInput;
};
export type AiSessionCreateManyInput = {
    id?: string;
    userId: string;
    createdAt?: Date | string;
    currentIntent?: string | null;
    status?: string;
    lastQuestionType?: string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type AiSessionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentIntent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lastQuestionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type AiSessionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentIntent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lastQuestionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type AiSessionListRelationFilter = {
    every?: Prisma.AiSessionWhereInput;
    some?: Prisma.AiSessionWhereInput;
    none?: Prisma.AiSessionWhereInput;
};
export type AiSessionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AiSessionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    currentIntent?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lastQuestionType?: Prisma.SortOrder;
    context?: Prisma.SortOrder;
};
export type AiSessionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    currentIntent?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lastQuestionType?: Prisma.SortOrder;
};
export type AiSessionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    currentIntent?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lastQuestionType?: Prisma.SortOrder;
};
export type AiSessionScalarRelationFilter = {
    is?: Prisma.AiSessionWhereInput;
    isNot?: Prisma.AiSessionWhereInput;
};
export type AiSessionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AiSessionCreateWithoutUserInput, Prisma.AiSessionUncheckedCreateWithoutUserInput> | Prisma.AiSessionCreateWithoutUserInput[] | Prisma.AiSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AiSessionCreateOrConnectWithoutUserInput | Prisma.AiSessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AiSessionCreateManyUserInputEnvelope;
    connect?: Prisma.AiSessionWhereUniqueInput | Prisma.AiSessionWhereUniqueInput[];
};
export type AiSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.AiSessionCreateWithoutUserInput, Prisma.AiSessionUncheckedCreateWithoutUserInput> | Prisma.AiSessionCreateWithoutUserInput[] | Prisma.AiSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AiSessionCreateOrConnectWithoutUserInput | Prisma.AiSessionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.AiSessionCreateManyUserInputEnvelope;
    connect?: Prisma.AiSessionWhereUniqueInput | Prisma.AiSessionWhereUniqueInput[];
};
export type AiSessionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AiSessionCreateWithoutUserInput, Prisma.AiSessionUncheckedCreateWithoutUserInput> | Prisma.AiSessionCreateWithoutUserInput[] | Prisma.AiSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AiSessionCreateOrConnectWithoutUserInput | Prisma.AiSessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AiSessionUpsertWithWhereUniqueWithoutUserInput | Prisma.AiSessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AiSessionCreateManyUserInputEnvelope;
    set?: Prisma.AiSessionWhereUniqueInput | Prisma.AiSessionWhereUniqueInput[];
    disconnect?: Prisma.AiSessionWhereUniqueInput | Prisma.AiSessionWhereUniqueInput[];
    delete?: Prisma.AiSessionWhereUniqueInput | Prisma.AiSessionWhereUniqueInput[];
    connect?: Prisma.AiSessionWhereUniqueInput | Prisma.AiSessionWhereUniqueInput[];
    update?: Prisma.AiSessionUpdateWithWhereUniqueWithoutUserInput | Prisma.AiSessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AiSessionUpdateManyWithWhereWithoutUserInput | Prisma.AiSessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AiSessionScalarWhereInput | Prisma.AiSessionScalarWhereInput[];
};
export type AiSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.AiSessionCreateWithoutUserInput, Prisma.AiSessionUncheckedCreateWithoutUserInput> | Prisma.AiSessionCreateWithoutUserInput[] | Prisma.AiSessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.AiSessionCreateOrConnectWithoutUserInput | Prisma.AiSessionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.AiSessionUpsertWithWhereUniqueWithoutUserInput | Prisma.AiSessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.AiSessionCreateManyUserInputEnvelope;
    set?: Prisma.AiSessionWhereUniqueInput | Prisma.AiSessionWhereUniqueInput[];
    disconnect?: Prisma.AiSessionWhereUniqueInput | Prisma.AiSessionWhereUniqueInput[];
    delete?: Prisma.AiSessionWhereUniqueInput | Prisma.AiSessionWhereUniqueInput[];
    connect?: Prisma.AiSessionWhereUniqueInput | Prisma.AiSessionWhereUniqueInput[];
    update?: Prisma.AiSessionUpdateWithWhereUniqueWithoutUserInput | Prisma.AiSessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.AiSessionUpdateManyWithWhereWithoutUserInput | Prisma.AiSessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.AiSessionScalarWhereInput | Prisma.AiSessionScalarWhereInput[];
};
export type AiSessionCreateNestedOneWithoutMessagesInput = {
    create?: Prisma.XOR<Prisma.AiSessionCreateWithoutMessagesInput, Prisma.AiSessionUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.AiSessionCreateOrConnectWithoutMessagesInput;
    connect?: Prisma.AiSessionWhereUniqueInput;
};
export type AiSessionUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.AiSessionCreateWithoutMessagesInput, Prisma.AiSessionUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.AiSessionCreateOrConnectWithoutMessagesInput;
    upsert?: Prisma.AiSessionUpsertWithoutMessagesInput;
    connect?: Prisma.AiSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AiSessionUpdateToOneWithWhereWithoutMessagesInput, Prisma.AiSessionUpdateWithoutMessagesInput>, Prisma.AiSessionUncheckedUpdateWithoutMessagesInput>;
};
export type AiSessionCreateWithoutUserInput = {
    id?: string;
    createdAt?: Date | string;
    currentIntent?: string | null;
    status?: string;
    lastQuestionType?: string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    messages?: Prisma.AiMessageCreateNestedManyWithoutSessionInput;
};
export type AiSessionUncheckedCreateWithoutUserInput = {
    id?: string;
    createdAt?: Date | string;
    currentIntent?: string | null;
    status?: string;
    lastQuestionType?: string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    messages?: Prisma.AiMessageUncheckedCreateNestedManyWithoutSessionInput;
};
export type AiSessionCreateOrConnectWithoutUserInput = {
    where: Prisma.AiSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AiSessionCreateWithoutUserInput, Prisma.AiSessionUncheckedCreateWithoutUserInput>;
};
export type AiSessionCreateManyUserInputEnvelope = {
    data: Prisma.AiSessionCreateManyUserInput | Prisma.AiSessionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type AiSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.AiSessionWhereUniqueInput;
    update: Prisma.XOR<Prisma.AiSessionUpdateWithoutUserInput, Prisma.AiSessionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.AiSessionCreateWithoutUserInput, Prisma.AiSessionUncheckedCreateWithoutUserInput>;
};
export type AiSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.AiSessionWhereUniqueInput;
    data: Prisma.XOR<Prisma.AiSessionUpdateWithoutUserInput, Prisma.AiSessionUncheckedUpdateWithoutUserInput>;
};
export type AiSessionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.AiSessionScalarWhereInput;
    data: Prisma.XOR<Prisma.AiSessionUpdateManyMutationInput, Prisma.AiSessionUncheckedUpdateManyWithoutUserInput>;
};
export type AiSessionScalarWhereInput = {
    AND?: Prisma.AiSessionScalarWhereInput | Prisma.AiSessionScalarWhereInput[];
    OR?: Prisma.AiSessionScalarWhereInput[];
    NOT?: Prisma.AiSessionScalarWhereInput | Prisma.AiSessionScalarWhereInput[];
    id?: Prisma.UuidFilter<"AiSession"> | string;
    userId?: Prisma.UuidFilter<"AiSession"> | string;
    createdAt?: Prisma.DateTimeFilter<"AiSession"> | Date | string;
    currentIntent?: Prisma.StringNullableFilter<"AiSession"> | string | null;
    status?: Prisma.StringFilter<"AiSession"> | string;
    lastQuestionType?: Prisma.StringNullableFilter<"AiSession"> | string | null;
    context?: Prisma.JsonNullableFilter<"AiSession">;
};
export type AiSessionCreateWithoutMessagesInput = {
    id?: string;
    createdAt?: Date | string;
    currentIntent?: string | null;
    status?: string;
    lastQuestionType?: string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    user: Prisma.UserCreateNestedOneWithoutAiSessionsInput;
};
export type AiSessionUncheckedCreateWithoutMessagesInput = {
    id?: string;
    userId: string;
    createdAt?: Date | string;
    currentIntent?: string | null;
    status?: string;
    lastQuestionType?: string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type AiSessionCreateOrConnectWithoutMessagesInput = {
    where: Prisma.AiSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AiSessionCreateWithoutMessagesInput, Prisma.AiSessionUncheckedCreateWithoutMessagesInput>;
};
export type AiSessionUpsertWithoutMessagesInput = {
    update: Prisma.XOR<Prisma.AiSessionUpdateWithoutMessagesInput, Prisma.AiSessionUncheckedUpdateWithoutMessagesInput>;
    create: Prisma.XOR<Prisma.AiSessionCreateWithoutMessagesInput, Prisma.AiSessionUncheckedCreateWithoutMessagesInput>;
    where?: Prisma.AiSessionWhereInput;
};
export type AiSessionUpdateToOneWithWhereWithoutMessagesInput = {
    where?: Prisma.AiSessionWhereInput;
    data: Prisma.XOR<Prisma.AiSessionUpdateWithoutMessagesInput, Prisma.AiSessionUncheckedUpdateWithoutMessagesInput>;
};
export type AiSessionUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentIntent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lastQuestionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    user?: Prisma.UserUpdateOneRequiredWithoutAiSessionsNestedInput;
};
export type AiSessionUncheckedUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentIntent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lastQuestionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type AiSessionCreateManyUserInput = {
    id?: string;
    createdAt?: Date | string;
    currentIntent?: string | null;
    status?: string;
    lastQuestionType?: string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type AiSessionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentIntent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lastQuestionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    messages?: Prisma.AiMessageUpdateManyWithoutSessionNestedInput;
};
export type AiSessionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentIntent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lastQuestionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    messages?: Prisma.AiMessageUncheckedUpdateManyWithoutSessionNestedInput;
};
export type AiSessionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    currentIntent?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    lastQuestionType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    context?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
};
export type AiSessionCountOutputType = {
    messages: number;
};
export type AiSessionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    messages?: boolean | AiSessionCountOutputTypeCountMessagesArgs;
};
export type AiSessionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionCountOutputTypeSelect<ExtArgs> | null;
};
export type AiSessionCountOutputTypeCountMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiMessageWhereInput;
};
export type AiSessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    currentIntent?: boolean;
    status?: boolean;
    lastQuestionType?: boolean;
    context?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.AiSession$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.AiSessionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aiSession"]>;
export type AiSessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    currentIntent?: boolean;
    status?: boolean;
    lastQuestionType?: boolean;
    context?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aiSession"]>;
export type AiSessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    currentIntent?: boolean;
    status?: boolean;
    lastQuestionType?: boolean;
    context?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["aiSession"]>;
export type AiSessionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    currentIntent?: boolean;
    status?: boolean;
    lastQuestionType?: boolean;
    context?: boolean;
};
export type AiSessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "createdAt" | "currentIntent" | "status" | "lastQuestionType" | "context", ExtArgs["result"]["aiSession"]>;
export type AiSessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.AiSession$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.AiSessionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AiSessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type AiSessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $AiSessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AiSession";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        messages: Prisma.$AiMessagePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        createdAt: Date;
        currentIntent: string | null;
        status: string;
        lastQuestionType: string | null;
        context: runtime.JsonValue | null;
    }, ExtArgs["result"]["aiSession"]>;
    composites: {};
};
export type AiSessionGetPayload<S extends boolean | null | undefined | AiSessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AiSessionPayload, S>;
export type AiSessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AiSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AiSessionCountAggregateInputType | true;
};
export interface AiSessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AiSession'];
        meta: {
            name: 'AiSession';
        };
    };
    findUnique<T extends AiSessionFindUniqueArgs>(args: Prisma.SelectSubset<T, AiSessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AiSessionClient<runtime.Types.Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AiSessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AiSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AiSessionClient<runtime.Types.Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AiSessionFindFirstArgs>(args?: Prisma.SelectSubset<T, AiSessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__AiSessionClient<runtime.Types.Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AiSessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AiSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AiSessionClient<runtime.Types.Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AiSessionFindManyArgs>(args?: Prisma.SelectSubset<T, AiSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AiSessionCreateArgs>(args: Prisma.SelectSubset<T, AiSessionCreateArgs<ExtArgs>>): Prisma.Prisma__AiSessionClient<runtime.Types.Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AiSessionCreateManyArgs>(args?: Prisma.SelectSubset<T, AiSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AiSessionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AiSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AiSessionDeleteArgs>(args: Prisma.SelectSubset<T, AiSessionDeleteArgs<ExtArgs>>): Prisma.Prisma__AiSessionClient<runtime.Types.Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AiSessionUpdateArgs>(args: Prisma.SelectSubset<T, AiSessionUpdateArgs<ExtArgs>>): Prisma.Prisma__AiSessionClient<runtime.Types.Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AiSessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, AiSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AiSessionUpdateManyArgs>(args: Prisma.SelectSubset<T, AiSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AiSessionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AiSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AiSessionUpsertArgs>(args: Prisma.SelectSubset<T, AiSessionUpsertArgs<ExtArgs>>): Prisma.Prisma__AiSessionClient<runtime.Types.Result.GetResult<Prisma.$AiSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AiSessionCountArgs>(args?: Prisma.Subset<T, AiSessionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AiSessionCountAggregateOutputType> : number>;
    aggregate<T extends AiSessionAggregateArgs>(args: Prisma.Subset<T, AiSessionAggregateArgs>): Prisma.PrismaPromise<GetAiSessionAggregateType<T>>;
    groupBy<T extends AiSessionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AiSessionGroupByArgs['orderBy'];
    } : {
        orderBy?: AiSessionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AiSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AiSessionFieldRefs;
}
export interface Prisma__AiSessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    messages<T extends Prisma.AiSession$messagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.AiSession$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AiMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AiSessionFieldRefs {
    readonly id: Prisma.FieldRef<"AiSession", 'String'>;
    readonly userId: Prisma.FieldRef<"AiSession", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AiSession", 'DateTime'>;
    readonly currentIntent: Prisma.FieldRef<"AiSession", 'String'>;
    readonly status: Prisma.FieldRef<"AiSession", 'String'>;
    readonly lastQuestionType: Prisma.FieldRef<"AiSession", 'String'>;
    readonly context: Prisma.FieldRef<"AiSession", 'Json'>;
}
export type AiSessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionSelect<ExtArgs> | null;
    omit?: Prisma.AiSessionOmit<ExtArgs> | null;
    include?: Prisma.AiSessionInclude<ExtArgs> | null;
    where: Prisma.AiSessionWhereUniqueInput;
};
export type AiSessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionSelect<ExtArgs> | null;
    omit?: Prisma.AiSessionOmit<ExtArgs> | null;
    include?: Prisma.AiSessionInclude<ExtArgs> | null;
    where: Prisma.AiSessionWhereUniqueInput;
};
export type AiSessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionSelect<ExtArgs> | null;
    omit?: Prisma.AiSessionOmit<ExtArgs> | null;
    include?: Prisma.AiSessionInclude<ExtArgs> | null;
    where?: Prisma.AiSessionWhereInput;
    orderBy?: Prisma.AiSessionOrderByWithRelationInput | Prisma.AiSessionOrderByWithRelationInput[];
    cursor?: Prisma.AiSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AiSessionScalarFieldEnum | Prisma.AiSessionScalarFieldEnum[];
};
export type AiSessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionSelect<ExtArgs> | null;
    omit?: Prisma.AiSessionOmit<ExtArgs> | null;
    include?: Prisma.AiSessionInclude<ExtArgs> | null;
    where?: Prisma.AiSessionWhereInput;
    orderBy?: Prisma.AiSessionOrderByWithRelationInput | Prisma.AiSessionOrderByWithRelationInput[];
    cursor?: Prisma.AiSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AiSessionScalarFieldEnum | Prisma.AiSessionScalarFieldEnum[];
};
export type AiSessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionSelect<ExtArgs> | null;
    omit?: Prisma.AiSessionOmit<ExtArgs> | null;
    include?: Prisma.AiSessionInclude<ExtArgs> | null;
    where?: Prisma.AiSessionWhereInput;
    orderBy?: Prisma.AiSessionOrderByWithRelationInput | Prisma.AiSessionOrderByWithRelationInput[];
    cursor?: Prisma.AiSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AiSessionScalarFieldEnum | Prisma.AiSessionScalarFieldEnum[];
};
export type AiSessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionSelect<ExtArgs> | null;
    omit?: Prisma.AiSessionOmit<ExtArgs> | null;
    include?: Prisma.AiSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AiSessionCreateInput, Prisma.AiSessionUncheckedCreateInput>;
};
export type AiSessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AiSessionCreateManyInput | Prisma.AiSessionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AiSessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AiSessionOmit<ExtArgs> | null;
    data: Prisma.AiSessionCreateManyInput | Prisma.AiSessionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AiSessionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AiSessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionSelect<ExtArgs> | null;
    omit?: Prisma.AiSessionOmit<ExtArgs> | null;
    include?: Prisma.AiSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AiSessionUpdateInput, Prisma.AiSessionUncheckedUpdateInput>;
    where: Prisma.AiSessionWhereUniqueInput;
};
export type AiSessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AiSessionUpdateManyMutationInput, Prisma.AiSessionUncheckedUpdateManyInput>;
    where?: Prisma.AiSessionWhereInput;
    limit?: number;
};
export type AiSessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AiSessionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AiSessionUpdateManyMutationInput, Prisma.AiSessionUncheckedUpdateManyInput>;
    where?: Prisma.AiSessionWhereInput;
    limit?: number;
    include?: Prisma.AiSessionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AiSessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionSelect<ExtArgs> | null;
    omit?: Prisma.AiSessionOmit<ExtArgs> | null;
    include?: Prisma.AiSessionInclude<ExtArgs> | null;
    where: Prisma.AiSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.AiSessionCreateInput, Prisma.AiSessionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AiSessionUpdateInput, Prisma.AiSessionUncheckedUpdateInput>;
};
export type AiSessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionSelect<ExtArgs> | null;
    omit?: Prisma.AiSessionOmit<ExtArgs> | null;
    include?: Prisma.AiSessionInclude<ExtArgs> | null;
    where: Prisma.AiSessionWhereUniqueInput;
};
export type AiSessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AiSessionWhereInput;
    limit?: number;
};
export type AiSession$messagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiMessageSelect<ExtArgs> | null;
    omit?: Prisma.AiMessageOmit<ExtArgs> | null;
    include?: Prisma.AiMessageInclude<ExtArgs> | null;
    where?: Prisma.AiMessageWhereInput;
    orderBy?: Prisma.AiMessageOrderByWithRelationInput | Prisma.AiMessageOrderByWithRelationInput[];
    cursor?: Prisma.AiMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AiMessageScalarFieldEnum | Prisma.AiMessageScalarFieldEnum[];
};
export type AiSessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AiSessionSelect<ExtArgs> | null;
    omit?: Prisma.AiSessionOmit<ExtArgs> | null;
    include?: Prisma.AiSessionInclude<ExtArgs> | null;
};
export {};
