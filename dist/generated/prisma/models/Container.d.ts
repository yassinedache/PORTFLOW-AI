import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
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
    terminalId: string | null;
    status: $Enums.ContainerStatus | null;
    lastUpdatedAt: Date | null;
    createdAt: Date | null;
};
export type ContainerMaxAggregateOutputType = {
    id: string | null;
    containerNumber: string | null;
    carrierId: string | null;
    terminalId: string | null;
    status: $Enums.ContainerStatus | null;
    lastUpdatedAt: Date | null;
    createdAt: Date | null;
};
export type ContainerCountAggregateOutputType = {
    id: number;
    containerNumber: number;
    carrierId: number;
    terminalId: number;
    status: number;
    lastUpdatedAt: number;
    createdAt: number;
    _all: number;
};
export type ContainerMinAggregateInputType = {
    id?: true;
    containerNumber?: true;
    carrierId?: true;
    terminalId?: true;
    status?: true;
    lastUpdatedAt?: true;
    createdAt?: true;
};
export type ContainerMaxAggregateInputType = {
    id?: true;
    containerNumber?: true;
    carrierId?: true;
    terminalId?: true;
    status?: true;
    lastUpdatedAt?: true;
    createdAt?: true;
};
export type ContainerCountAggregateInputType = {
    id?: true;
    containerNumber?: true;
    carrierId?: true;
    terminalId?: true;
    status?: true;
    lastUpdatedAt?: true;
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
    terminalId: string | null;
    status: $Enums.ContainerStatus;
    lastUpdatedAt: Date | null;
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
    terminalId?: Prisma.UuidNullableFilter<"Container"> | string | null;
    status?: Prisma.EnumContainerStatusFilter<"Container"> | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.DateTimeNullableFilter<"Container"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Container"> | Date | string;
    terminal?: Prisma.XOR<Prisma.TerminalNullableScalarRelationFilter, Prisma.TerminalWhereInput> | null;
    trackingEvents?: Prisma.TrackingEventListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
    readinessProofs?: Prisma.ReadinessProofListRelationFilter;
};
export type ContainerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    containerNumber?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lastUpdatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    terminal?: Prisma.TerminalOrderByWithRelationInput;
    trackingEvents?: Prisma.TrackingEventOrderByRelationAggregateInput;
    bookings?: Prisma.BookingOrderByRelationAggregateInput;
    readinessProofs?: Prisma.ReadinessProofOrderByRelationAggregateInput;
};
export type ContainerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    containerNumber?: string;
    AND?: Prisma.ContainerWhereInput | Prisma.ContainerWhereInput[];
    OR?: Prisma.ContainerWhereInput[];
    NOT?: Prisma.ContainerWhereInput | Prisma.ContainerWhereInput[];
    carrierId?: Prisma.UuidFilter<"Container"> | string;
    terminalId?: Prisma.UuidNullableFilter<"Container"> | string | null;
    status?: Prisma.EnumContainerStatusFilter<"Container"> | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.DateTimeNullableFilter<"Container"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Container"> | Date | string;
    terminal?: Prisma.XOR<Prisma.TerminalNullableScalarRelationFilter, Prisma.TerminalWhereInput> | null;
    trackingEvents?: Prisma.TrackingEventListRelationFilter;
    bookings?: Prisma.BookingListRelationFilter;
    readinessProofs?: Prisma.ReadinessProofListRelationFilter;
}, "id" | "containerNumber">;
export type ContainerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    containerNumber?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lastUpdatedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
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
    terminalId?: Prisma.UuidNullableWithAggregatesFilter<"Container"> | string | null;
    status?: Prisma.EnumContainerStatusWithAggregatesFilter<"Container"> | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Container"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Container"> | Date | string;
};
export type ContainerCreateInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    status?: $Enums.ContainerStatus;
    lastUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    terminal?: Prisma.TerminalCreateNestedOneWithoutContainersInput;
    trackingEvents?: Prisma.TrackingEventCreateNestedManyWithoutContainerInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutContainerInput;
    readinessProofs?: Prisma.ReadinessProofCreateNestedManyWithoutContainerInput;
};
export type ContainerUncheckedCreateInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    terminalId?: string | null;
    status?: $Enums.ContainerStatus;
    lastUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    trackingEvents?: Prisma.TrackingEventUncheckedCreateNestedManyWithoutContainerInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutContainerInput;
    readinessProofs?: Prisma.ReadinessProofUncheckedCreateNestedManyWithoutContainerInput;
};
export type ContainerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    terminal?: Prisma.TerminalUpdateOneWithoutContainersNestedInput;
    trackingEvents?: Prisma.TrackingEventUpdateManyWithoutContainerNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutContainerNestedInput;
    readinessProofs?: Prisma.ReadinessProofUpdateManyWithoutContainerNestedInput;
};
export type ContainerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    trackingEvents?: Prisma.TrackingEventUncheckedUpdateManyWithoutContainerNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutContainerNestedInput;
    readinessProofs?: Prisma.ReadinessProofUncheckedUpdateManyWithoutContainerNestedInput;
};
export type ContainerCreateManyInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    terminalId?: string | null;
    status?: $Enums.ContainerStatus;
    lastUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ContainerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContainerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContainerListRelationFilter = {
    every?: Prisma.ContainerWhereInput;
    some?: Prisma.ContainerWhereInput;
    none?: Prisma.ContainerWhereInput;
};
export type ContainerOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ContainerScalarRelationFilter = {
    is?: Prisma.ContainerWhereInput;
    isNot?: Prisma.ContainerWhereInput;
};
export type ContainerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    containerNumber?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lastUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ContainerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    containerNumber?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lastUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ContainerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    containerNumber?: Prisma.SortOrder;
    carrierId?: Prisma.SortOrder;
    terminalId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    lastUpdatedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ContainerCreateNestedManyWithoutTerminalInput = {
    create?: Prisma.XOR<Prisma.ContainerCreateWithoutTerminalInput, Prisma.ContainerUncheckedCreateWithoutTerminalInput> | Prisma.ContainerCreateWithoutTerminalInput[] | Prisma.ContainerUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.ContainerCreateOrConnectWithoutTerminalInput | Prisma.ContainerCreateOrConnectWithoutTerminalInput[];
    createMany?: Prisma.ContainerCreateManyTerminalInputEnvelope;
    connect?: Prisma.ContainerWhereUniqueInput | Prisma.ContainerWhereUniqueInput[];
};
export type ContainerUncheckedCreateNestedManyWithoutTerminalInput = {
    create?: Prisma.XOR<Prisma.ContainerCreateWithoutTerminalInput, Prisma.ContainerUncheckedCreateWithoutTerminalInput> | Prisma.ContainerCreateWithoutTerminalInput[] | Prisma.ContainerUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.ContainerCreateOrConnectWithoutTerminalInput | Prisma.ContainerCreateOrConnectWithoutTerminalInput[];
    createMany?: Prisma.ContainerCreateManyTerminalInputEnvelope;
    connect?: Prisma.ContainerWhereUniqueInput | Prisma.ContainerWhereUniqueInput[];
};
export type ContainerUpdateManyWithoutTerminalNestedInput = {
    create?: Prisma.XOR<Prisma.ContainerCreateWithoutTerminalInput, Prisma.ContainerUncheckedCreateWithoutTerminalInput> | Prisma.ContainerCreateWithoutTerminalInput[] | Prisma.ContainerUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.ContainerCreateOrConnectWithoutTerminalInput | Prisma.ContainerCreateOrConnectWithoutTerminalInput[];
    upsert?: Prisma.ContainerUpsertWithWhereUniqueWithoutTerminalInput | Prisma.ContainerUpsertWithWhereUniqueWithoutTerminalInput[];
    createMany?: Prisma.ContainerCreateManyTerminalInputEnvelope;
    set?: Prisma.ContainerWhereUniqueInput | Prisma.ContainerWhereUniqueInput[];
    disconnect?: Prisma.ContainerWhereUniqueInput | Prisma.ContainerWhereUniqueInput[];
    delete?: Prisma.ContainerWhereUniqueInput | Prisma.ContainerWhereUniqueInput[];
    connect?: Prisma.ContainerWhereUniqueInput | Prisma.ContainerWhereUniqueInput[];
    update?: Prisma.ContainerUpdateWithWhereUniqueWithoutTerminalInput | Prisma.ContainerUpdateWithWhereUniqueWithoutTerminalInput[];
    updateMany?: Prisma.ContainerUpdateManyWithWhereWithoutTerminalInput | Prisma.ContainerUpdateManyWithWhereWithoutTerminalInput[];
    deleteMany?: Prisma.ContainerScalarWhereInput | Prisma.ContainerScalarWhereInput[];
};
export type ContainerUncheckedUpdateManyWithoutTerminalNestedInput = {
    create?: Prisma.XOR<Prisma.ContainerCreateWithoutTerminalInput, Prisma.ContainerUncheckedCreateWithoutTerminalInput> | Prisma.ContainerCreateWithoutTerminalInput[] | Prisma.ContainerUncheckedCreateWithoutTerminalInput[];
    connectOrCreate?: Prisma.ContainerCreateOrConnectWithoutTerminalInput | Prisma.ContainerCreateOrConnectWithoutTerminalInput[];
    upsert?: Prisma.ContainerUpsertWithWhereUniqueWithoutTerminalInput | Prisma.ContainerUpsertWithWhereUniqueWithoutTerminalInput[];
    createMany?: Prisma.ContainerCreateManyTerminalInputEnvelope;
    set?: Prisma.ContainerWhereUniqueInput | Prisma.ContainerWhereUniqueInput[];
    disconnect?: Prisma.ContainerWhereUniqueInput | Prisma.ContainerWhereUniqueInput[];
    delete?: Prisma.ContainerWhereUniqueInput | Prisma.ContainerWhereUniqueInput[];
    connect?: Prisma.ContainerWhereUniqueInput | Prisma.ContainerWhereUniqueInput[];
    update?: Prisma.ContainerUpdateWithWhereUniqueWithoutTerminalInput | Prisma.ContainerUpdateWithWhereUniqueWithoutTerminalInput[];
    updateMany?: Prisma.ContainerUpdateManyWithWhereWithoutTerminalInput | Prisma.ContainerUpdateManyWithWhereWithoutTerminalInput[];
    deleteMany?: Prisma.ContainerScalarWhereInput | Prisma.ContainerScalarWhereInput[];
};
export type ContainerCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.ContainerCreateWithoutBookingsInput, Prisma.ContainerUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ContainerCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.ContainerWhereUniqueInput;
};
export type ContainerUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.ContainerCreateWithoutBookingsInput, Prisma.ContainerUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.ContainerCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.ContainerUpsertWithoutBookingsInput;
    connect?: Prisma.ContainerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ContainerUpdateToOneWithWhereWithoutBookingsInput, Prisma.ContainerUpdateWithoutBookingsInput>, Prisma.ContainerUncheckedUpdateWithoutBookingsInput>;
};
export type ContainerCreateNestedOneWithoutReadinessProofsInput = {
    create?: Prisma.XOR<Prisma.ContainerCreateWithoutReadinessProofsInput, Prisma.ContainerUncheckedCreateWithoutReadinessProofsInput>;
    connectOrCreate?: Prisma.ContainerCreateOrConnectWithoutReadinessProofsInput;
    connect?: Prisma.ContainerWhereUniqueInput;
};
export type ContainerUpdateOneRequiredWithoutReadinessProofsNestedInput = {
    create?: Prisma.XOR<Prisma.ContainerCreateWithoutReadinessProofsInput, Prisma.ContainerUncheckedCreateWithoutReadinessProofsInput>;
    connectOrCreate?: Prisma.ContainerCreateOrConnectWithoutReadinessProofsInput;
    upsert?: Prisma.ContainerUpsertWithoutReadinessProofsInput;
    connect?: Prisma.ContainerWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ContainerUpdateToOneWithWhereWithoutReadinessProofsInput, Prisma.ContainerUpdateWithoutReadinessProofsInput>, Prisma.ContainerUncheckedUpdateWithoutReadinessProofsInput>;
};
export type EnumContainerStatusFieldUpdateOperationsInput = {
    set?: $Enums.ContainerStatus;
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
export type ContainerCreateWithoutTerminalInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    status?: $Enums.ContainerStatus;
    lastUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    trackingEvents?: Prisma.TrackingEventCreateNestedManyWithoutContainerInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutContainerInput;
    readinessProofs?: Prisma.ReadinessProofCreateNestedManyWithoutContainerInput;
};
export type ContainerUncheckedCreateWithoutTerminalInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    status?: $Enums.ContainerStatus;
    lastUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    trackingEvents?: Prisma.TrackingEventUncheckedCreateNestedManyWithoutContainerInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutContainerInput;
    readinessProofs?: Prisma.ReadinessProofUncheckedCreateNestedManyWithoutContainerInput;
};
export type ContainerCreateOrConnectWithoutTerminalInput = {
    where: Prisma.ContainerWhereUniqueInput;
    create: Prisma.XOR<Prisma.ContainerCreateWithoutTerminalInput, Prisma.ContainerUncheckedCreateWithoutTerminalInput>;
};
export type ContainerCreateManyTerminalInputEnvelope = {
    data: Prisma.ContainerCreateManyTerminalInput | Prisma.ContainerCreateManyTerminalInput[];
    skipDuplicates?: boolean;
};
export type ContainerUpsertWithWhereUniqueWithoutTerminalInput = {
    where: Prisma.ContainerWhereUniqueInput;
    update: Prisma.XOR<Prisma.ContainerUpdateWithoutTerminalInput, Prisma.ContainerUncheckedUpdateWithoutTerminalInput>;
    create: Prisma.XOR<Prisma.ContainerCreateWithoutTerminalInput, Prisma.ContainerUncheckedCreateWithoutTerminalInput>;
};
export type ContainerUpdateWithWhereUniqueWithoutTerminalInput = {
    where: Prisma.ContainerWhereUniqueInput;
    data: Prisma.XOR<Prisma.ContainerUpdateWithoutTerminalInput, Prisma.ContainerUncheckedUpdateWithoutTerminalInput>;
};
export type ContainerUpdateManyWithWhereWithoutTerminalInput = {
    where: Prisma.ContainerScalarWhereInput;
    data: Prisma.XOR<Prisma.ContainerUpdateManyMutationInput, Prisma.ContainerUncheckedUpdateManyWithoutTerminalInput>;
};
export type ContainerScalarWhereInput = {
    AND?: Prisma.ContainerScalarWhereInput | Prisma.ContainerScalarWhereInput[];
    OR?: Prisma.ContainerScalarWhereInput[];
    NOT?: Prisma.ContainerScalarWhereInput | Prisma.ContainerScalarWhereInput[];
    id?: Prisma.UuidFilter<"Container"> | string;
    containerNumber?: Prisma.StringFilter<"Container"> | string;
    carrierId?: Prisma.UuidFilter<"Container"> | string;
    terminalId?: Prisma.UuidNullableFilter<"Container"> | string | null;
    status?: Prisma.EnumContainerStatusFilter<"Container"> | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.DateTimeNullableFilter<"Container"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Container"> | Date | string;
};
export type ContainerCreateWithoutBookingsInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    status?: $Enums.ContainerStatus;
    lastUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    terminal?: Prisma.TerminalCreateNestedOneWithoutContainersInput;
    trackingEvents?: Prisma.TrackingEventCreateNestedManyWithoutContainerInput;
    readinessProofs?: Prisma.ReadinessProofCreateNestedManyWithoutContainerInput;
};
export type ContainerUncheckedCreateWithoutBookingsInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    terminalId?: string | null;
    status?: $Enums.ContainerStatus;
    lastUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    trackingEvents?: Prisma.TrackingEventUncheckedCreateNestedManyWithoutContainerInput;
    readinessProofs?: Prisma.ReadinessProofUncheckedCreateNestedManyWithoutContainerInput;
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
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    terminal?: Prisma.TerminalUpdateOneWithoutContainersNestedInput;
    trackingEvents?: Prisma.TrackingEventUpdateManyWithoutContainerNestedInput;
    readinessProofs?: Prisma.ReadinessProofUpdateManyWithoutContainerNestedInput;
};
export type ContainerUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    trackingEvents?: Prisma.TrackingEventUncheckedUpdateManyWithoutContainerNestedInput;
    readinessProofs?: Prisma.ReadinessProofUncheckedUpdateManyWithoutContainerNestedInput;
};
export type ContainerCreateWithoutReadinessProofsInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    status?: $Enums.ContainerStatus;
    lastUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    terminal?: Prisma.TerminalCreateNestedOneWithoutContainersInput;
    trackingEvents?: Prisma.TrackingEventCreateNestedManyWithoutContainerInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutContainerInput;
};
export type ContainerUncheckedCreateWithoutReadinessProofsInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    terminalId?: string | null;
    status?: $Enums.ContainerStatus;
    lastUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    trackingEvents?: Prisma.TrackingEventUncheckedCreateNestedManyWithoutContainerInput;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutContainerInput;
};
export type ContainerCreateOrConnectWithoutReadinessProofsInput = {
    where: Prisma.ContainerWhereUniqueInput;
    create: Prisma.XOR<Prisma.ContainerCreateWithoutReadinessProofsInput, Prisma.ContainerUncheckedCreateWithoutReadinessProofsInput>;
};
export type ContainerUpsertWithoutReadinessProofsInput = {
    update: Prisma.XOR<Prisma.ContainerUpdateWithoutReadinessProofsInput, Prisma.ContainerUncheckedUpdateWithoutReadinessProofsInput>;
    create: Prisma.XOR<Prisma.ContainerCreateWithoutReadinessProofsInput, Prisma.ContainerUncheckedCreateWithoutReadinessProofsInput>;
    where?: Prisma.ContainerWhereInput;
};
export type ContainerUpdateToOneWithWhereWithoutReadinessProofsInput = {
    where?: Prisma.ContainerWhereInput;
    data: Prisma.XOR<Prisma.ContainerUpdateWithoutReadinessProofsInput, Prisma.ContainerUncheckedUpdateWithoutReadinessProofsInput>;
};
export type ContainerUpdateWithoutReadinessProofsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    terminal?: Prisma.TerminalUpdateOneWithoutContainersNestedInput;
    trackingEvents?: Prisma.TrackingEventUpdateManyWithoutContainerNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutContainerNestedInput;
};
export type ContainerUncheckedUpdateWithoutReadinessProofsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    trackingEvents?: Prisma.TrackingEventUncheckedUpdateManyWithoutContainerNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutContainerNestedInput;
};
export type ContainerCreateWithoutTrackingEventsInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    status?: $Enums.ContainerStatus;
    lastUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    terminal?: Prisma.TerminalCreateNestedOneWithoutContainersInput;
    bookings?: Prisma.BookingCreateNestedManyWithoutContainerInput;
    readinessProofs?: Prisma.ReadinessProofCreateNestedManyWithoutContainerInput;
};
export type ContainerUncheckedCreateWithoutTrackingEventsInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    terminalId?: string | null;
    status?: $Enums.ContainerStatus;
    lastUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
    bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutContainerInput;
    readinessProofs?: Prisma.ReadinessProofUncheckedCreateNestedManyWithoutContainerInput;
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
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    terminal?: Prisma.TerminalUpdateOneWithoutContainersNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutContainerNestedInput;
    readinessProofs?: Prisma.ReadinessProofUpdateManyWithoutContainerNestedInput;
};
export type ContainerUncheckedUpdateWithoutTrackingEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    terminalId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutContainerNestedInput;
    readinessProofs?: Prisma.ReadinessProofUncheckedUpdateManyWithoutContainerNestedInput;
};
export type ContainerCreateManyTerminalInput = {
    id?: string;
    containerNumber: string;
    carrierId: string;
    status?: $Enums.ContainerStatus;
    lastUpdatedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ContainerUpdateWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    trackingEvents?: Prisma.TrackingEventUpdateManyWithoutContainerNestedInput;
    bookings?: Prisma.BookingUpdateManyWithoutContainerNestedInput;
    readinessProofs?: Prisma.ReadinessProofUpdateManyWithoutContainerNestedInput;
};
export type ContainerUncheckedUpdateWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    trackingEvents?: Prisma.TrackingEventUncheckedUpdateManyWithoutContainerNestedInput;
    bookings?: Prisma.BookingUncheckedUpdateManyWithoutContainerNestedInput;
    readinessProofs?: Prisma.ReadinessProofUncheckedUpdateManyWithoutContainerNestedInput;
};
export type ContainerUncheckedUpdateManyWithoutTerminalInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerNumber?: Prisma.StringFieldUpdateOperationsInput | string;
    carrierId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumContainerStatusFieldUpdateOperationsInput | $Enums.ContainerStatus;
    lastUpdatedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ContainerCountOutputType = {
    trackingEvents: number;
    bookings: number;
    readinessProofs: number;
};
export type ContainerCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    trackingEvents?: boolean | ContainerCountOutputTypeCountTrackingEventsArgs;
    bookings?: boolean | ContainerCountOutputTypeCountBookingsArgs;
    readinessProofs?: boolean | ContainerCountOutputTypeCountReadinessProofsArgs;
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
export type ContainerCountOutputTypeCountReadinessProofsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReadinessProofWhereInput;
};
export type ContainerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    containerNumber?: boolean;
    carrierId?: boolean;
    terminalId?: boolean;
    status?: boolean;
    lastUpdatedAt?: boolean;
    createdAt?: boolean;
    terminal?: boolean | Prisma.Container$terminalArgs<ExtArgs>;
    trackingEvents?: boolean | Prisma.Container$trackingEventsArgs<ExtArgs>;
    bookings?: boolean | Prisma.Container$bookingsArgs<ExtArgs>;
    readinessProofs?: boolean | Prisma.Container$readinessProofsArgs<ExtArgs>;
    _count?: boolean | Prisma.ContainerCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["container"]>;
export type ContainerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    containerNumber?: boolean;
    carrierId?: boolean;
    terminalId?: boolean;
    status?: boolean;
    lastUpdatedAt?: boolean;
    createdAt?: boolean;
    terminal?: boolean | Prisma.Container$terminalArgs<ExtArgs>;
}, ExtArgs["result"]["container"]>;
export type ContainerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    containerNumber?: boolean;
    carrierId?: boolean;
    terminalId?: boolean;
    status?: boolean;
    lastUpdatedAt?: boolean;
    createdAt?: boolean;
    terminal?: boolean | Prisma.Container$terminalArgs<ExtArgs>;
}, ExtArgs["result"]["container"]>;
export type ContainerSelectScalar = {
    id?: boolean;
    containerNumber?: boolean;
    carrierId?: boolean;
    terminalId?: boolean;
    status?: boolean;
    lastUpdatedAt?: boolean;
    createdAt?: boolean;
};
export type ContainerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "containerNumber" | "carrierId" | "terminalId" | "status" | "lastUpdatedAt" | "createdAt", ExtArgs["result"]["container"]>;
export type ContainerInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.Container$terminalArgs<ExtArgs>;
    trackingEvents?: boolean | Prisma.Container$trackingEventsArgs<ExtArgs>;
    bookings?: boolean | Prisma.Container$bookingsArgs<ExtArgs>;
    readinessProofs?: boolean | Prisma.Container$readinessProofsArgs<ExtArgs>;
    _count?: boolean | Prisma.ContainerCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ContainerIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.Container$terminalArgs<ExtArgs>;
};
export type ContainerIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    terminal?: boolean | Prisma.Container$terminalArgs<ExtArgs>;
};
export type $ContainerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Container";
    objects: {
        terminal: Prisma.$TerminalPayload<ExtArgs> | null;
        trackingEvents: Prisma.$TrackingEventPayload<ExtArgs>[];
        bookings: Prisma.$BookingPayload<ExtArgs>[];
        readinessProofs: Prisma.$ReadinessProofPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        containerNumber: string;
        carrierId: string;
        terminalId: string | null;
        status: $Enums.ContainerStatus;
        lastUpdatedAt: Date | null;
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
    terminal<T extends Prisma.Container$terminalArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Container$terminalArgs<ExtArgs>>): Prisma.Prisma__TerminalClient<runtime.Types.Result.GetResult<Prisma.$TerminalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    trackingEvents<T extends Prisma.Container$trackingEventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Container$trackingEventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TrackingEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    bookings<T extends Prisma.Container$bookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Container$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    readinessProofs<T extends Prisma.Container$readinessProofsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Container$readinessProofsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ContainerFieldRefs {
    readonly id: Prisma.FieldRef<"Container", 'String'>;
    readonly containerNumber: Prisma.FieldRef<"Container", 'String'>;
    readonly carrierId: Prisma.FieldRef<"Container", 'String'>;
    readonly terminalId: Prisma.FieldRef<"Container", 'String'>;
    readonly status: Prisma.FieldRef<"Container", 'ContainerStatus'>;
    readonly lastUpdatedAt: Prisma.FieldRef<"Container", 'DateTime'>;
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
    include?: Prisma.ContainerIncludeCreateManyAndReturn<ExtArgs> | null;
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
    include?: Prisma.ContainerIncludeUpdateManyAndReturn<ExtArgs> | null;
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
export type Container$terminalArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TerminalSelect<ExtArgs> | null;
    omit?: Prisma.TerminalOmit<ExtArgs> | null;
    include?: Prisma.TerminalInclude<ExtArgs> | null;
    where?: Prisma.TerminalWhereInput;
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
export type Container$readinessProofsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessProofSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessProofOmit<ExtArgs> | null;
    include?: Prisma.ReadinessProofInclude<ExtArgs> | null;
    where?: Prisma.ReadinessProofWhereInput;
    orderBy?: Prisma.ReadinessProofOrderByWithRelationInput | Prisma.ReadinessProofOrderByWithRelationInput[];
    cursor?: Prisma.ReadinessProofWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReadinessProofScalarFieldEnum | Prisma.ReadinessProofScalarFieldEnum[];
};
export type ContainerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContainerSelect<ExtArgs> | null;
    omit?: Prisma.ContainerOmit<ExtArgs> | null;
    include?: Prisma.ContainerInclude<ExtArgs> | null;
};
export {};
