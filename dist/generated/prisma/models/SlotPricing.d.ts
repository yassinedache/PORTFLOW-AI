import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SlotPricingModel = runtime.Types.Result.DefaultSelection<Prisma.$SlotPricingPayload>;
export type AggregateSlotPricing = {
    _count: SlotPricingCountAggregateOutputType | null;
    _avg: SlotPricingAvgAggregateOutputType | null;
    _sum: SlotPricingSumAggregateOutputType | null;
    _min: SlotPricingMinAggregateOutputType | null;
    _max: SlotPricingMaxAggregateOutputType | null;
};
export type SlotPricingAvgAggregateOutputType = {
    basePrice: number | null;
    multiplier: number | null;
    finalPrice: number | null;
};
export type SlotPricingSumAggregateOutputType = {
    basePrice: number | null;
    multiplier: number | null;
    finalPrice: number | null;
};
export type SlotPricingMinAggregateOutputType = {
    id: string | null;
    slotId: string | null;
    basePrice: number | null;
    multiplier: number | null;
    finalPrice: number | null;
    reason: string | null;
    isEcoSlot: boolean | null;
    computedAt: Date | null;
};
export type SlotPricingMaxAggregateOutputType = {
    id: string | null;
    slotId: string | null;
    basePrice: number | null;
    multiplier: number | null;
    finalPrice: number | null;
    reason: string | null;
    isEcoSlot: boolean | null;
    computedAt: Date | null;
};
export type SlotPricingCountAggregateOutputType = {
    id: number;
    slotId: number;
    basePrice: number;
    multiplier: number;
    finalPrice: number;
    reason: number;
    isEcoSlot: number;
    computedAt: number;
    _all: number;
};
export type SlotPricingAvgAggregateInputType = {
    basePrice?: true;
    multiplier?: true;
    finalPrice?: true;
};
export type SlotPricingSumAggregateInputType = {
    basePrice?: true;
    multiplier?: true;
    finalPrice?: true;
};
export type SlotPricingMinAggregateInputType = {
    id?: true;
    slotId?: true;
    basePrice?: true;
    multiplier?: true;
    finalPrice?: true;
    reason?: true;
    isEcoSlot?: true;
    computedAt?: true;
};
export type SlotPricingMaxAggregateInputType = {
    id?: true;
    slotId?: true;
    basePrice?: true;
    multiplier?: true;
    finalPrice?: true;
    reason?: true;
    isEcoSlot?: true;
    computedAt?: true;
};
export type SlotPricingCountAggregateInputType = {
    id?: true;
    slotId?: true;
    basePrice?: true;
    multiplier?: true;
    finalPrice?: true;
    reason?: true;
    isEcoSlot?: true;
    computedAt?: true;
    _all?: true;
};
export type SlotPricingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SlotPricingWhereInput;
    orderBy?: Prisma.SlotPricingOrderByWithRelationInput | Prisma.SlotPricingOrderByWithRelationInput[];
    cursor?: Prisma.SlotPricingWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SlotPricingCountAggregateInputType;
    _avg?: SlotPricingAvgAggregateInputType;
    _sum?: SlotPricingSumAggregateInputType;
    _min?: SlotPricingMinAggregateInputType;
    _max?: SlotPricingMaxAggregateInputType;
};
export type GetSlotPricingAggregateType<T extends SlotPricingAggregateArgs> = {
    [P in keyof T & keyof AggregateSlotPricing]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSlotPricing[P]> : Prisma.GetScalarType<T[P], AggregateSlotPricing[P]>;
};
export type SlotPricingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SlotPricingWhereInput;
    orderBy?: Prisma.SlotPricingOrderByWithAggregationInput | Prisma.SlotPricingOrderByWithAggregationInput[];
    by: Prisma.SlotPricingScalarFieldEnum[] | Prisma.SlotPricingScalarFieldEnum;
    having?: Prisma.SlotPricingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SlotPricingCountAggregateInputType | true;
    _avg?: SlotPricingAvgAggregateInputType;
    _sum?: SlotPricingSumAggregateInputType;
    _min?: SlotPricingMinAggregateInputType;
    _max?: SlotPricingMaxAggregateInputType;
};
export type SlotPricingGroupByOutputType = {
    id: string;
    slotId: string;
    basePrice: number;
    multiplier: number;
    finalPrice: number;
    reason: string;
    isEcoSlot: boolean;
    computedAt: Date;
    _count: SlotPricingCountAggregateOutputType | null;
    _avg: SlotPricingAvgAggregateOutputType | null;
    _sum: SlotPricingSumAggregateOutputType | null;
    _min: SlotPricingMinAggregateOutputType | null;
    _max: SlotPricingMaxAggregateOutputType | null;
};
type GetSlotPricingGroupByPayload<T extends SlotPricingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SlotPricingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SlotPricingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SlotPricingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SlotPricingGroupByOutputType[P]>;
}>>;
export type SlotPricingWhereInput = {
    AND?: Prisma.SlotPricingWhereInput | Prisma.SlotPricingWhereInput[];
    OR?: Prisma.SlotPricingWhereInput[];
    NOT?: Prisma.SlotPricingWhereInput | Prisma.SlotPricingWhereInput[];
    id?: Prisma.UuidFilter<"SlotPricing"> | string;
    slotId?: Prisma.UuidFilter<"SlotPricing"> | string;
    basePrice?: Prisma.FloatFilter<"SlotPricing"> | number;
    multiplier?: Prisma.FloatFilter<"SlotPricing"> | number;
    finalPrice?: Prisma.FloatFilter<"SlotPricing"> | number;
    reason?: Prisma.StringFilter<"SlotPricing"> | string;
    isEcoSlot?: Prisma.BoolFilter<"SlotPricing"> | boolean;
    computedAt?: Prisma.DateTimeFilter<"SlotPricing"> | Date | string;
    slot?: Prisma.XOR<Prisma.TimeSlotScalarRelationFilter, Prisma.TimeSlotWhereInput>;
};
export type SlotPricingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    basePrice?: Prisma.SortOrder;
    multiplier?: Prisma.SortOrder;
    finalPrice?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    isEcoSlot?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
    slot?: Prisma.TimeSlotOrderByWithRelationInput;
};
export type SlotPricingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SlotPricingWhereInput | Prisma.SlotPricingWhereInput[];
    OR?: Prisma.SlotPricingWhereInput[];
    NOT?: Prisma.SlotPricingWhereInput | Prisma.SlotPricingWhereInput[];
    slotId?: Prisma.UuidFilter<"SlotPricing"> | string;
    basePrice?: Prisma.FloatFilter<"SlotPricing"> | number;
    multiplier?: Prisma.FloatFilter<"SlotPricing"> | number;
    finalPrice?: Prisma.FloatFilter<"SlotPricing"> | number;
    reason?: Prisma.StringFilter<"SlotPricing"> | string;
    isEcoSlot?: Prisma.BoolFilter<"SlotPricing"> | boolean;
    computedAt?: Prisma.DateTimeFilter<"SlotPricing"> | Date | string;
    slot?: Prisma.XOR<Prisma.TimeSlotScalarRelationFilter, Prisma.TimeSlotWhereInput>;
}, "id">;
export type SlotPricingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    basePrice?: Prisma.SortOrder;
    multiplier?: Prisma.SortOrder;
    finalPrice?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    isEcoSlot?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
    _count?: Prisma.SlotPricingCountOrderByAggregateInput;
    _avg?: Prisma.SlotPricingAvgOrderByAggregateInput;
    _max?: Prisma.SlotPricingMaxOrderByAggregateInput;
    _min?: Prisma.SlotPricingMinOrderByAggregateInput;
    _sum?: Prisma.SlotPricingSumOrderByAggregateInput;
};
export type SlotPricingScalarWhereWithAggregatesInput = {
    AND?: Prisma.SlotPricingScalarWhereWithAggregatesInput | Prisma.SlotPricingScalarWhereWithAggregatesInput[];
    OR?: Prisma.SlotPricingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SlotPricingScalarWhereWithAggregatesInput | Prisma.SlotPricingScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"SlotPricing"> | string;
    slotId?: Prisma.UuidWithAggregatesFilter<"SlotPricing"> | string;
    basePrice?: Prisma.FloatWithAggregatesFilter<"SlotPricing"> | number;
    multiplier?: Prisma.FloatWithAggregatesFilter<"SlotPricing"> | number;
    finalPrice?: Prisma.FloatWithAggregatesFilter<"SlotPricing"> | number;
    reason?: Prisma.StringWithAggregatesFilter<"SlotPricing"> | string;
    isEcoSlot?: Prisma.BoolWithAggregatesFilter<"SlotPricing"> | boolean;
    computedAt?: Prisma.DateTimeWithAggregatesFilter<"SlotPricing"> | Date | string;
};
export type SlotPricingCreateInput = {
    id?: string;
    basePrice: number;
    multiplier?: number;
    finalPrice: number;
    reason: string;
    isEcoSlot?: boolean;
    computedAt?: Date | string;
    slot: Prisma.TimeSlotCreateNestedOneWithoutPricingsInput;
};
export type SlotPricingUncheckedCreateInput = {
    id?: string;
    slotId: string;
    basePrice: number;
    multiplier?: number;
    finalPrice: number;
    reason: string;
    isEcoSlot?: boolean;
    computedAt?: Date | string;
};
export type SlotPricingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    basePrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    multiplier?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    isEcoSlot?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    slot?: Prisma.TimeSlotUpdateOneRequiredWithoutPricingsNestedInput;
};
export type SlotPricingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slotId?: Prisma.StringFieldUpdateOperationsInput | string;
    basePrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    multiplier?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    isEcoSlot?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlotPricingCreateManyInput = {
    id?: string;
    slotId: string;
    basePrice: number;
    multiplier?: number;
    finalPrice: number;
    reason: string;
    isEcoSlot?: boolean;
    computedAt?: Date | string;
};
export type SlotPricingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    basePrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    multiplier?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    isEcoSlot?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlotPricingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    slotId?: Prisma.StringFieldUpdateOperationsInput | string;
    basePrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    multiplier?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    isEcoSlot?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlotPricingListRelationFilter = {
    every?: Prisma.SlotPricingWhereInput;
    some?: Prisma.SlotPricingWhereInput;
    none?: Prisma.SlotPricingWhereInput;
};
export type SlotPricingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SlotPricingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    basePrice?: Prisma.SortOrder;
    multiplier?: Prisma.SortOrder;
    finalPrice?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    isEcoSlot?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
};
export type SlotPricingAvgOrderByAggregateInput = {
    basePrice?: Prisma.SortOrder;
    multiplier?: Prisma.SortOrder;
    finalPrice?: Prisma.SortOrder;
};
export type SlotPricingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    basePrice?: Prisma.SortOrder;
    multiplier?: Prisma.SortOrder;
    finalPrice?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    isEcoSlot?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
};
export type SlotPricingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    slotId?: Prisma.SortOrder;
    basePrice?: Prisma.SortOrder;
    multiplier?: Prisma.SortOrder;
    finalPrice?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    isEcoSlot?: Prisma.SortOrder;
    computedAt?: Prisma.SortOrder;
};
export type SlotPricingSumOrderByAggregateInput = {
    basePrice?: Prisma.SortOrder;
    multiplier?: Prisma.SortOrder;
    finalPrice?: Prisma.SortOrder;
};
export type SlotPricingCreateNestedManyWithoutSlotInput = {
    create?: Prisma.XOR<Prisma.SlotPricingCreateWithoutSlotInput, Prisma.SlotPricingUncheckedCreateWithoutSlotInput> | Prisma.SlotPricingCreateWithoutSlotInput[] | Prisma.SlotPricingUncheckedCreateWithoutSlotInput[];
    connectOrCreate?: Prisma.SlotPricingCreateOrConnectWithoutSlotInput | Prisma.SlotPricingCreateOrConnectWithoutSlotInput[];
    createMany?: Prisma.SlotPricingCreateManySlotInputEnvelope;
    connect?: Prisma.SlotPricingWhereUniqueInput | Prisma.SlotPricingWhereUniqueInput[];
};
export type SlotPricingUncheckedCreateNestedManyWithoutSlotInput = {
    create?: Prisma.XOR<Prisma.SlotPricingCreateWithoutSlotInput, Prisma.SlotPricingUncheckedCreateWithoutSlotInput> | Prisma.SlotPricingCreateWithoutSlotInput[] | Prisma.SlotPricingUncheckedCreateWithoutSlotInput[];
    connectOrCreate?: Prisma.SlotPricingCreateOrConnectWithoutSlotInput | Prisma.SlotPricingCreateOrConnectWithoutSlotInput[];
    createMany?: Prisma.SlotPricingCreateManySlotInputEnvelope;
    connect?: Prisma.SlotPricingWhereUniqueInput | Prisma.SlotPricingWhereUniqueInput[];
};
export type SlotPricingUpdateManyWithoutSlotNestedInput = {
    create?: Prisma.XOR<Prisma.SlotPricingCreateWithoutSlotInput, Prisma.SlotPricingUncheckedCreateWithoutSlotInput> | Prisma.SlotPricingCreateWithoutSlotInput[] | Prisma.SlotPricingUncheckedCreateWithoutSlotInput[];
    connectOrCreate?: Prisma.SlotPricingCreateOrConnectWithoutSlotInput | Prisma.SlotPricingCreateOrConnectWithoutSlotInput[];
    upsert?: Prisma.SlotPricingUpsertWithWhereUniqueWithoutSlotInput | Prisma.SlotPricingUpsertWithWhereUniqueWithoutSlotInput[];
    createMany?: Prisma.SlotPricingCreateManySlotInputEnvelope;
    set?: Prisma.SlotPricingWhereUniqueInput | Prisma.SlotPricingWhereUniqueInput[];
    disconnect?: Prisma.SlotPricingWhereUniqueInput | Prisma.SlotPricingWhereUniqueInput[];
    delete?: Prisma.SlotPricingWhereUniqueInput | Prisma.SlotPricingWhereUniqueInput[];
    connect?: Prisma.SlotPricingWhereUniqueInput | Prisma.SlotPricingWhereUniqueInput[];
    update?: Prisma.SlotPricingUpdateWithWhereUniqueWithoutSlotInput | Prisma.SlotPricingUpdateWithWhereUniqueWithoutSlotInput[];
    updateMany?: Prisma.SlotPricingUpdateManyWithWhereWithoutSlotInput | Prisma.SlotPricingUpdateManyWithWhereWithoutSlotInput[];
    deleteMany?: Prisma.SlotPricingScalarWhereInput | Prisma.SlotPricingScalarWhereInput[];
};
export type SlotPricingUncheckedUpdateManyWithoutSlotNestedInput = {
    create?: Prisma.XOR<Prisma.SlotPricingCreateWithoutSlotInput, Prisma.SlotPricingUncheckedCreateWithoutSlotInput> | Prisma.SlotPricingCreateWithoutSlotInput[] | Prisma.SlotPricingUncheckedCreateWithoutSlotInput[];
    connectOrCreate?: Prisma.SlotPricingCreateOrConnectWithoutSlotInput | Prisma.SlotPricingCreateOrConnectWithoutSlotInput[];
    upsert?: Prisma.SlotPricingUpsertWithWhereUniqueWithoutSlotInput | Prisma.SlotPricingUpsertWithWhereUniqueWithoutSlotInput[];
    createMany?: Prisma.SlotPricingCreateManySlotInputEnvelope;
    set?: Prisma.SlotPricingWhereUniqueInput | Prisma.SlotPricingWhereUniqueInput[];
    disconnect?: Prisma.SlotPricingWhereUniqueInput | Prisma.SlotPricingWhereUniqueInput[];
    delete?: Prisma.SlotPricingWhereUniqueInput | Prisma.SlotPricingWhereUniqueInput[];
    connect?: Prisma.SlotPricingWhereUniqueInput | Prisma.SlotPricingWhereUniqueInput[];
    update?: Prisma.SlotPricingUpdateWithWhereUniqueWithoutSlotInput | Prisma.SlotPricingUpdateWithWhereUniqueWithoutSlotInput[];
    updateMany?: Prisma.SlotPricingUpdateManyWithWhereWithoutSlotInput | Prisma.SlotPricingUpdateManyWithWhereWithoutSlotInput[];
    deleteMany?: Prisma.SlotPricingScalarWhereInput | Prisma.SlotPricingScalarWhereInput[];
};
export type SlotPricingCreateWithoutSlotInput = {
    id?: string;
    basePrice: number;
    multiplier?: number;
    finalPrice: number;
    reason: string;
    isEcoSlot?: boolean;
    computedAt?: Date | string;
};
export type SlotPricingUncheckedCreateWithoutSlotInput = {
    id?: string;
    basePrice: number;
    multiplier?: number;
    finalPrice: number;
    reason: string;
    isEcoSlot?: boolean;
    computedAt?: Date | string;
};
export type SlotPricingCreateOrConnectWithoutSlotInput = {
    where: Prisma.SlotPricingWhereUniqueInput;
    create: Prisma.XOR<Prisma.SlotPricingCreateWithoutSlotInput, Prisma.SlotPricingUncheckedCreateWithoutSlotInput>;
};
export type SlotPricingCreateManySlotInputEnvelope = {
    data: Prisma.SlotPricingCreateManySlotInput | Prisma.SlotPricingCreateManySlotInput[];
    skipDuplicates?: boolean;
};
export type SlotPricingUpsertWithWhereUniqueWithoutSlotInput = {
    where: Prisma.SlotPricingWhereUniqueInput;
    update: Prisma.XOR<Prisma.SlotPricingUpdateWithoutSlotInput, Prisma.SlotPricingUncheckedUpdateWithoutSlotInput>;
    create: Prisma.XOR<Prisma.SlotPricingCreateWithoutSlotInput, Prisma.SlotPricingUncheckedCreateWithoutSlotInput>;
};
export type SlotPricingUpdateWithWhereUniqueWithoutSlotInput = {
    where: Prisma.SlotPricingWhereUniqueInput;
    data: Prisma.XOR<Prisma.SlotPricingUpdateWithoutSlotInput, Prisma.SlotPricingUncheckedUpdateWithoutSlotInput>;
};
export type SlotPricingUpdateManyWithWhereWithoutSlotInput = {
    where: Prisma.SlotPricingScalarWhereInput;
    data: Prisma.XOR<Prisma.SlotPricingUpdateManyMutationInput, Prisma.SlotPricingUncheckedUpdateManyWithoutSlotInput>;
};
export type SlotPricingScalarWhereInput = {
    AND?: Prisma.SlotPricingScalarWhereInput | Prisma.SlotPricingScalarWhereInput[];
    OR?: Prisma.SlotPricingScalarWhereInput[];
    NOT?: Prisma.SlotPricingScalarWhereInput | Prisma.SlotPricingScalarWhereInput[];
    id?: Prisma.UuidFilter<"SlotPricing"> | string;
    slotId?: Prisma.UuidFilter<"SlotPricing"> | string;
    basePrice?: Prisma.FloatFilter<"SlotPricing"> | number;
    multiplier?: Prisma.FloatFilter<"SlotPricing"> | number;
    finalPrice?: Prisma.FloatFilter<"SlotPricing"> | number;
    reason?: Prisma.StringFilter<"SlotPricing"> | string;
    isEcoSlot?: Prisma.BoolFilter<"SlotPricing"> | boolean;
    computedAt?: Prisma.DateTimeFilter<"SlotPricing"> | Date | string;
};
export type SlotPricingCreateManySlotInput = {
    id?: string;
    basePrice: number;
    multiplier?: number;
    finalPrice: number;
    reason: string;
    isEcoSlot?: boolean;
    computedAt?: Date | string;
};
export type SlotPricingUpdateWithoutSlotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    basePrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    multiplier?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    isEcoSlot?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlotPricingUncheckedUpdateWithoutSlotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    basePrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    multiplier?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    isEcoSlot?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlotPricingUncheckedUpdateManyWithoutSlotInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    basePrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    multiplier?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    isEcoSlot?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    computedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlotPricingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slotId?: boolean;
    basePrice?: boolean;
    multiplier?: boolean;
    finalPrice?: boolean;
    reason?: boolean;
    isEcoSlot?: boolean;
    computedAt?: boolean;
    slot?: boolean | Prisma.TimeSlotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["slotPricing"]>;
export type SlotPricingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slotId?: boolean;
    basePrice?: boolean;
    multiplier?: boolean;
    finalPrice?: boolean;
    reason?: boolean;
    isEcoSlot?: boolean;
    computedAt?: boolean;
    slot?: boolean | Prisma.TimeSlotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["slotPricing"]>;
export type SlotPricingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    slotId?: boolean;
    basePrice?: boolean;
    multiplier?: boolean;
    finalPrice?: boolean;
    reason?: boolean;
    isEcoSlot?: boolean;
    computedAt?: boolean;
    slot?: boolean | Prisma.TimeSlotDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["slotPricing"]>;
export type SlotPricingSelectScalar = {
    id?: boolean;
    slotId?: boolean;
    basePrice?: boolean;
    multiplier?: boolean;
    finalPrice?: boolean;
    reason?: boolean;
    isEcoSlot?: boolean;
    computedAt?: boolean;
};
export type SlotPricingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "slotId" | "basePrice" | "multiplier" | "finalPrice" | "reason" | "isEcoSlot" | "computedAt", ExtArgs["result"]["slotPricing"]>;
export type SlotPricingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    slot?: boolean | Prisma.TimeSlotDefaultArgs<ExtArgs>;
};
export type SlotPricingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    slot?: boolean | Prisma.TimeSlotDefaultArgs<ExtArgs>;
};
export type SlotPricingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    slot?: boolean | Prisma.TimeSlotDefaultArgs<ExtArgs>;
};
export type $SlotPricingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SlotPricing";
    objects: {
        slot: Prisma.$TimeSlotPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        slotId: string;
        basePrice: number;
        multiplier: number;
        finalPrice: number;
        reason: string;
        isEcoSlot: boolean;
        computedAt: Date;
    }, ExtArgs["result"]["slotPricing"]>;
    composites: {};
};
export type SlotPricingGetPayload<S extends boolean | null | undefined | SlotPricingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SlotPricingPayload, S>;
export type SlotPricingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SlotPricingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SlotPricingCountAggregateInputType | true;
};
export interface SlotPricingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SlotPricing'];
        meta: {
            name: 'SlotPricing';
        };
    };
    findUnique<T extends SlotPricingFindUniqueArgs>(args: Prisma.SelectSubset<T, SlotPricingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SlotPricingClient<runtime.Types.Result.GetResult<Prisma.$SlotPricingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SlotPricingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SlotPricingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SlotPricingClient<runtime.Types.Result.GetResult<Prisma.$SlotPricingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SlotPricingFindFirstArgs>(args?: Prisma.SelectSubset<T, SlotPricingFindFirstArgs<ExtArgs>>): Prisma.Prisma__SlotPricingClient<runtime.Types.Result.GetResult<Prisma.$SlotPricingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SlotPricingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SlotPricingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SlotPricingClient<runtime.Types.Result.GetResult<Prisma.$SlotPricingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SlotPricingFindManyArgs>(args?: Prisma.SelectSubset<T, SlotPricingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SlotPricingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SlotPricingCreateArgs>(args: Prisma.SelectSubset<T, SlotPricingCreateArgs<ExtArgs>>): Prisma.Prisma__SlotPricingClient<runtime.Types.Result.GetResult<Prisma.$SlotPricingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SlotPricingCreateManyArgs>(args?: Prisma.SelectSubset<T, SlotPricingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SlotPricingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SlotPricingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SlotPricingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SlotPricingDeleteArgs>(args: Prisma.SelectSubset<T, SlotPricingDeleteArgs<ExtArgs>>): Prisma.Prisma__SlotPricingClient<runtime.Types.Result.GetResult<Prisma.$SlotPricingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SlotPricingUpdateArgs>(args: Prisma.SelectSubset<T, SlotPricingUpdateArgs<ExtArgs>>): Prisma.Prisma__SlotPricingClient<runtime.Types.Result.GetResult<Prisma.$SlotPricingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SlotPricingDeleteManyArgs>(args?: Prisma.SelectSubset<T, SlotPricingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SlotPricingUpdateManyArgs>(args: Prisma.SelectSubset<T, SlotPricingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SlotPricingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SlotPricingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SlotPricingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SlotPricingUpsertArgs>(args: Prisma.SelectSubset<T, SlotPricingUpsertArgs<ExtArgs>>): Prisma.Prisma__SlotPricingClient<runtime.Types.Result.GetResult<Prisma.$SlotPricingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SlotPricingCountArgs>(args?: Prisma.Subset<T, SlotPricingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SlotPricingCountAggregateOutputType> : number>;
    aggregate<T extends SlotPricingAggregateArgs>(args: Prisma.Subset<T, SlotPricingAggregateArgs>): Prisma.PrismaPromise<GetSlotPricingAggregateType<T>>;
    groupBy<T extends SlotPricingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SlotPricingGroupByArgs['orderBy'];
    } : {
        orderBy?: SlotPricingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SlotPricingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSlotPricingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SlotPricingFieldRefs;
}
export interface Prisma__SlotPricingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    slot<T extends Prisma.TimeSlotDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TimeSlotDefaultArgs<ExtArgs>>): Prisma.Prisma__TimeSlotClient<runtime.Types.Result.GetResult<Prisma.$TimeSlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SlotPricingFieldRefs {
    readonly id: Prisma.FieldRef<"SlotPricing", 'String'>;
    readonly slotId: Prisma.FieldRef<"SlotPricing", 'String'>;
    readonly basePrice: Prisma.FieldRef<"SlotPricing", 'Float'>;
    readonly multiplier: Prisma.FieldRef<"SlotPricing", 'Float'>;
    readonly finalPrice: Prisma.FieldRef<"SlotPricing", 'Float'>;
    readonly reason: Prisma.FieldRef<"SlotPricing", 'String'>;
    readonly isEcoSlot: Prisma.FieldRef<"SlotPricing", 'Boolean'>;
    readonly computedAt: Prisma.FieldRef<"SlotPricing", 'DateTime'>;
}
export type SlotPricingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlotPricingSelect<ExtArgs> | null;
    omit?: Prisma.SlotPricingOmit<ExtArgs> | null;
    include?: Prisma.SlotPricingInclude<ExtArgs> | null;
    where: Prisma.SlotPricingWhereUniqueInput;
};
export type SlotPricingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlotPricingSelect<ExtArgs> | null;
    omit?: Prisma.SlotPricingOmit<ExtArgs> | null;
    include?: Prisma.SlotPricingInclude<ExtArgs> | null;
    where: Prisma.SlotPricingWhereUniqueInput;
};
export type SlotPricingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlotPricingSelect<ExtArgs> | null;
    omit?: Prisma.SlotPricingOmit<ExtArgs> | null;
    include?: Prisma.SlotPricingInclude<ExtArgs> | null;
    where?: Prisma.SlotPricingWhereInput;
    orderBy?: Prisma.SlotPricingOrderByWithRelationInput | Prisma.SlotPricingOrderByWithRelationInput[];
    cursor?: Prisma.SlotPricingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SlotPricingScalarFieldEnum | Prisma.SlotPricingScalarFieldEnum[];
};
export type SlotPricingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlotPricingSelect<ExtArgs> | null;
    omit?: Prisma.SlotPricingOmit<ExtArgs> | null;
    include?: Prisma.SlotPricingInclude<ExtArgs> | null;
    where?: Prisma.SlotPricingWhereInput;
    orderBy?: Prisma.SlotPricingOrderByWithRelationInput | Prisma.SlotPricingOrderByWithRelationInput[];
    cursor?: Prisma.SlotPricingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SlotPricingScalarFieldEnum | Prisma.SlotPricingScalarFieldEnum[];
};
export type SlotPricingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlotPricingSelect<ExtArgs> | null;
    omit?: Prisma.SlotPricingOmit<ExtArgs> | null;
    include?: Prisma.SlotPricingInclude<ExtArgs> | null;
    where?: Prisma.SlotPricingWhereInput;
    orderBy?: Prisma.SlotPricingOrderByWithRelationInput | Prisma.SlotPricingOrderByWithRelationInput[];
    cursor?: Prisma.SlotPricingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SlotPricingScalarFieldEnum | Prisma.SlotPricingScalarFieldEnum[];
};
export type SlotPricingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlotPricingSelect<ExtArgs> | null;
    omit?: Prisma.SlotPricingOmit<ExtArgs> | null;
    include?: Prisma.SlotPricingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SlotPricingCreateInput, Prisma.SlotPricingUncheckedCreateInput>;
};
export type SlotPricingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SlotPricingCreateManyInput | Prisma.SlotPricingCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SlotPricingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlotPricingSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SlotPricingOmit<ExtArgs> | null;
    data: Prisma.SlotPricingCreateManyInput | Prisma.SlotPricingCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SlotPricingIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SlotPricingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlotPricingSelect<ExtArgs> | null;
    omit?: Prisma.SlotPricingOmit<ExtArgs> | null;
    include?: Prisma.SlotPricingInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SlotPricingUpdateInput, Prisma.SlotPricingUncheckedUpdateInput>;
    where: Prisma.SlotPricingWhereUniqueInput;
};
export type SlotPricingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SlotPricingUpdateManyMutationInput, Prisma.SlotPricingUncheckedUpdateManyInput>;
    where?: Prisma.SlotPricingWhereInput;
    limit?: number;
};
export type SlotPricingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlotPricingSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SlotPricingOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SlotPricingUpdateManyMutationInput, Prisma.SlotPricingUncheckedUpdateManyInput>;
    where?: Prisma.SlotPricingWhereInput;
    limit?: number;
    include?: Prisma.SlotPricingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SlotPricingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlotPricingSelect<ExtArgs> | null;
    omit?: Prisma.SlotPricingOmit<ExtArgs> | null;
    include?: Prisma.SlotPricingInclude<ExtArgs> | null;
    where: Prisma.SlotPricingWhereUniqueInput;
    create: Prisma.XOR<Prisma.SlotPricingCreateInput, Prisma.SlotPricingUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SlotPricingUpdateInput, Prisma.SlotPricingUncheckedUpdateInput>;
};
export type SlotPricingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlotPricingSelect<ExtArgs> | null;
    omit?: Prisma.SlotPricingOmit<ExtArgs> | null;
    include?: Prisma.SlotPricingInclude<ExtArgs> | null;
    where: Prisma.SlotPricingWhereUniqueInput;
};
export type SlotPricingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SlotPricingWhereInput;
    limit?: number;
};
export type SlotPricingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SlotPricingSelect<ExtArgs> | null;
    omit?: Prisma.SlotPricingOmit<ExtArgs> | null;
    include?: Prisma.SlotPricingInclude<ExtArgs> | null;
};
export {};
