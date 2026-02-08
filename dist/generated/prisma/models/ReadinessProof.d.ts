import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReadinessProofModel = runtime.Types.Result.DefaultSelection<Prisma.$ReadinessProofPayload>;
export type AggregateReadinessProof = {
    _count: ReadinessProofCountAggregateOutputType | null;
    _min: ReadinessProofMinAggregateOutputType | null;
    _max: ReadinessProofMaxAggregateOutputType | null;
};
export type ReadinessProofMinAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    containerId: string | null;
    confirmedBy: string | null;
    confirmedAt: Date | null;
    blockchainHash: string | null;
};
export type ReadinessProofMaxAggregateOutputType = {
    id: string | null;
    bookingId: string | null;
    containerId: string | null;
    confirmedBy: string | null;
    confirmedAt: Date | null;
    blockchainHash: string | null;
};
export type ReadinessProofCountAggregateOutputType = {
    id: number;
    bookingId: number;
    containerId: number;
    confirmedBy: number;
    confirmedAt: number;
    blockchainHash: number;
    _all: number;
};
export type ReadinessProofMinAggregateInputType = {
    id?: true;
    bookingId?: true;
    containerId?: true;
    confirmedBy?: true;
    confirmedAt?: true;
    blockchainHash?: true;
};
export type ReadinessProofMaxAggregateInputType = {
    id?: true;
    bookingId?: true;
    containerId?: true;
    confirmedBy?: true;
    confirmedAt?: true;
    blockchainHash?: true;
};
export type ReadinessProofCountAggregateInputType = {
    id?: true;
    bookingId?: true;
    containerId?: true;
    confirmedBy?: true;
    confirmedAt?: true;
    blockchainHash?: true;
    _all?: true;
};
export type ReadinessProofAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReadinessProofWhereInput;
    orderBy?: Prisma.ReadinessProofOrderByWithRelationInput | Prisma.ReadinessProofOrderByWithRelationInput[];
    cursor?: Prisma.ReadinessProofWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReadinessProofCountAggregateInputType;
    _min?: ReadinessProofMinAggregateInputType;
    _max?: ReadinessProofMaxAggregateInputType;
};
export type GetReadinessProofAggregateType<T extends ReadinessProofAggregateArgs> = {
    [P in keyof T & keyof AggregateReadinessProof]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReadinessProof[P]> : Prisma.GetScalarType<T[P], AggregateReadinessProof[P]>;
};
export type ReadinessProofGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReadinessProofWhereInput;
    orderBy?: Prisma.ReadinessProofOrderByWithAggregationInput | Prisma.ReadinessProofOrderByWithAggregationInput[];
    by: Prisma.ReadinessProofScalarFieldEnum[] | Prisma.ReadinessProofScalarFieldEnum;
    having?: Prisma.ReadinessProofScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReadinessProofCountAggregateInputType | true;
    _min?: ReadinessProofMinAggregateInputType;
    _max?: ReadinessProofMaxAggregateInputType;
};
export type ReadinessProofGroupByOutputType = {
    id: string;
    bookingId: string;
    containerId: string;
    confirmedBy: string;
    confirmedAt: Date;
    blockchainHash: string;
    _count: ReadinessProofCountAggregateOutputType | null;
    _min: ReadinessProofMinAggregateOutputType | null;
    _max: ReadinessProofMaxAggregateOutputType | null;
};
type GetReadinessProofGroupByPayload<T extends ReadinessProofGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReadinessProofGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReadinessProofGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReadinessProofGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReadinessProofGroupByOutputType[P]>;
}>>;
export type ReadinessProofWhereInput = {
    AND?: Prisma.ReadinessProofWhereInput | Prisma.ReadinessProofWhereInput[];
    OR?: Prisma.ReadinessProofWhereInput[];
    NOT?: Prisma.ReadinessProofWhereInput | Prisma.ReadinessProofWhereInput[];
    id?: Prisma.UuidFilter<"ReadinessProof"> | string;
    bookingId?: Prisma.UuidFilter<"ReadinessProof"> | string;
    containerId?: Prisma.UuidFilter<"ReadinessProof"> | string;
    confirmedBy?: Prisma.UuidFilter<"ReadinessProof"> | string;
    confirmedAt?: Prisma.DateTimeFilter<"ReadinessProof"> | Date | string;
    blockchainHash?: Prisma.StringFilter<"ReadinessProof"> | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    container?: Prisma.XOR<Prisma.ContainerScalarRelationFilter, Prisma.ContainerWhereInput>;
    confirmedByUser?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ReadinessProofOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    confirmedBy?: Prisma.SortOrder;
    confirmedAt?: Prisma.SortOrder;
    blockchainHash?: Prisma.SortOrder;
    booking?: Prisma.BookingOrderByWithRelationInput;
    container?: Prisma.ContainerOrderByWithRelationInput;
    confirmedByUser?: Prisma.UserOrderByWithRelationInput;
};
export type ReadinessProofWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReadinessProofWhereInput | Prisma.ReadinessProofWhereInput[];
    OR?: Prisma.ReadinessProofWhereInput[];
    NOT?: Prisma.ReadinessProofWhereInput | Prisma.ReadinessProofWhereInput[];
    bookingId?: Prisma.UuidFilter<"ReadinessProof"> | string;
    containerId?: Prisma.UuidFilter<"ReadinessProof"> | string;
    confirmedBy?: Prisma.UuidFilter<"ReadinessProof"> | string;
    confirmedAt?: Prisma.DateTimeFilter<"ReadinessProof"> | Date | string;
    blockchainHash?: Prisma.StringFilter<"ReadinessProof"> | string;
    booking?: Prisma.XOR<Prisma.BookingScalarRelationFilter, Prisma.BookingWhereInput>;
    container?: Prisma.XOR<Prisma.ContainerScalarRelationFilter, Prisma.ContainerWhereInput>;
    confirmedByUser?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type ReadinessProofOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    confirmedBy?: Prisma.SortOrder;
    confirmedAt?: Prisma.SortOrder;
    blockchainHash?: Prisma.SortOrder;
    _count?: Prisma.ReadinessProofCountOrderByAggregateInput;
    _max?: Prisma.ReadinessProofMaxOrderByAggregateInput;
    _min?: Prisma.ReadinessProofMinOrderByAggregateInput;
};
export type ReadinessProofScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReadinessProofScalarWhereWithAggregatesInput | Prisma.ReadinessProofScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReadinessProofScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReadinessProofScalarWhereWithAggregatesInput | Prisma.ReadinessProofScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ReadinessProof"> | string;
    bookingId?: Prisma.UuidWithAggregatesFilter<"ReadinessProof"> | string;
    containerId?: Prisma.UuidWithAggregatesFilter<"ReadinessProof"> | string;
    confirmedBy?: Prisma.UuidWithAggregatesFilter<"ReadinessProof"> | string;
    confirmedAt?: Prisma.DateTimeWithAggregatesFilter<"ReadinessProof"> | Date | string;
    blockchainHash?: Prisma.StringWithAggregatesFilter<"ReadinessProof"> | string;
};
export type ReadinessProofCreateInput = {
    id?: string;
    confirmedAt?: Date | string;
    blockchainHash: string;
    booking: Prisma.BookingCreateNestedOneWithoutReadinessProofsInput;
    container: Prisma.ContainerCreateNestedOneWithoutReadinessProofsInput;
    confirmedByUser: Prisma.UserCreateNestedOneWithoutReadinessProofsInput;
};
export type ReadinessProofUncheckedCreateInput = {
    id?: string;
    bookingId: string;
    containerId: string;
    confirmedBy: string;
    confirmedAt?: Date | string;
    blockchainHash: string;
};
export type ReadinessProofUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutReadinessProofsNestedInput;
    container?: Prisma.ContainerUpdateOneRequiredWithoutReadinessProofsNestedInput;
    confirmedByUser?: Prisma.UserUpdateOneRequiredWithoutReadinessProofsNestedInput;
};
export type ReadinessProofUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    containerId?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReadinessProofCreateManyInput = {
    id?: string;
    bookingId: string;
    containerId: string;
    confirmedBy: string;
    confirmedAt?: Date | string;
    blockchainHash: string;
};
export type ReadinessProofUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReadinessProofUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    containerId?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReadinessProofListRelationFilter = {
    every?: Prisma.ReadinessProofWhereInput;
    some?: Prisma.ReadinessProofWhereInput;
    none?: Prisma.ReadinessProofWhereInput;
};
export type ReadinessProofOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReadinessProofCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    confirmedBy?: Prisma.SortOrder;
    confirmedAt?: Prisma.SortOrder;
    blockchainHash?: Prisma.SortOrder;
};
export type ReadinessProofMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    confirmedBy?: Prisma.SortOrder;
    confirmedAt?: Prisma.SortOrder;
    blockchainHash?: Prisma.SortOrder;
};
export type ReadinessProofMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingId?: Prisma.SortOrder;
    containerId?: Prisma.SortOrder;
    confirmedBy?: Prisma.SortOrder;
    confirmedAt?: Prisma.SortOrder;
    blockchainHash?: Prisma.SortOrder;
};
export type ReadinessProofCreateNestedManyWithoutConfirmedByUserInput = {
    create?: Prisma.XOR<Prisma.ReadinessProofCreateWithoutConfirmedByUserInput, Prisma.ReadinessProofUncheckedCreateWithoutConfirmedByUserInput> | Prisma.ReadinessProofCreateWithoutConfirmedByUserInput[] | Prisma.ReadinessProofUncheckedCreateWithoutConfirmedByUserInput[];
    connectOrCreate?: Prisma.ReadinessProofCreateOrConnectWithoutConfirmedByUserInput | Prisma.ReadinessProofCreateOrConnectWithoutConfirmedByUserInput[];
    createMany?: Prisma.ReadinessProofCreateManyConfirmedByUserInputEnvelope;
    connect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
};
export type ReadinessProofUncheckedCreateNestedManyWithoutConfirmedByUserInput = {
    create?: Prisma.XOR<Prisma.ReadinessProofCreateWithoutConfirmedByUserInput, Prisma.ReadinessProofUncheckedCreateWithoutConfirmedByUserInput> | Prisma.ReadinessProofCreateWithoutConfirmedByUserInput[] | Prisma.ReadinessProofUncheckedCreateWithoutConfirmedByUserInput[];
    connectOrCreate?: Prisma.ReadinessProofCreateOrConnectWithoutConfirmedByUserInput | Prisma.ReadinessProofCreateOrConnectWithoutConfirmedByUserInput[];
    createMany?: Prisma.ReadinessProofCreateManyConfirmedByUserInputEnvelope;
    connect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
};
export type ReadinessProofUpdateManyWithoutConfirmedByUserNestedInput = {
    create?: Prisma.XOR<Prisma.ReadinessProofCreateWithoutConfirmedByUserInput, Prisma.ReadinessProofUncheckedCreateWithoutConfirmedByUserInput> | Prisma.ReadinessProofCreateWithoutConfirmedByUserInput[] | Prisma.ReadinessProofUncheckedCreateWithoutConfirmedByUserInput[];
    connectOrCreate?: Prisma.ReadinessProofCreateOrConnectWithoutConfirmedByUserInput | Prisma.ReadinessProofCreateOrConnectWithoutConfirmedByUserInput[];
    upsert?: Prisma.ReadinessProofUpsertWithWhereUniqueWithoutConfirmedByUserInput | Prisma.ReadinessProofUpsertWithWhereUniqueWithoutConfirmedByUserInput[];
    createMany?: Prisma.ReadinessProofCreateManyConfirmedByUserInputEnvelope;
    set?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    disconnect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    delete?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    connect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    update?: Prisma.ReadinessProofUpdateWithWhereUniqueWithoutConfirmedByUserInput | Prisma.ReadinessProofUpdateWithWhereUniqueWithoutConfirmedByUserInput[];
    updateMany?: Prisma.ReadinessProofUpdateManyWithWhereWithoutConfirmedByUserInput | Prisma.ReadinessProofUpdateManyWithWhereWithoutConfirmedByUserInput[];
    deleteMany?: Prisma.ReadinessProofScalarWhereInput | Prisma.ReadinessProofScalarWhereInput[];
};
export type ReadinessProofUncheckedUpdateManyWithoutConfirmedByUserNestedInput = {
    create?: Prisma.XOR<Prisma.ReadinessProofCreateWithoutConfirmedByUserInput, Prisma.ReadinessProofUncheckedCreateWithoutConfirmedByUserInput> | Prisma.ReadinessProofCreateWithoutConfirmedByUserInput[] | Prisma.ReadinessProofUncheckedCreateWithoutConfirmedByUserInput[];
    connectOrCreate?: Prisma.ReadinessProofCreateOrConnectWithoutConfirmedByUserInput | Prisma.ReadinessProofCreateOrConnectWithoutConfirmedByUserInput[];
    upsert?: Prisma.ReadinessProofUpsertWithWhereUniqueWithoutConfirmedByUserInput | Prisma.ReadinessProofUpsertWithWhereUniqueWithoutConfirmedByUserInput[];
    createMany?: Prisma.ReadinessProofCreateManyConfirmedByUserInputEnvelope;
    set?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    disconnect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    delete?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    connect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    update?: Prisma.ReadinessProofUpdateWithWhereUniqueWithoutConfirmedByUserInput | Prisma.ReadinessProofUpdateWithWhereUniqueWithoutConfirmedByUserInput[];
    updateMany?: Prisma.ReadinessProofUpdateManyWithWhereWithoutConfirmedByUserInput | Prisma.ReadinessProofUpdateManyWithWhereWithoutConfirmedByUserInput[];
    deleteMany?: Prisma.ReadinessProofScalarWhereInput | Prisma.ReadinessProofScalarWhereInput[];
};
export type ReadinessProofCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.ReadinessProofCreateWithoutBookingInput, Prisma.ReadinessProofUncheckedCreateWithoutBookingInput> | Prisma.ReadinessProofCreateWithoutBookingInput[] | Prisma.ReadinessProofUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ReadinessProofCreateOrConnectWithoutBookingInput | Prisma.ReadinessProofCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.ReadinessProofCreateManyBookingInputEnvelope;
    connect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
};
export type ReadinessProofUncheckedCreateNestedManyWithoutBookingInput = {
    create?: Prisma.XOR<Prisma.ReadinessProofCreateWithoutBookingInput, Prisma.ReadinessProofUncheckedCreateWithoutBookingInput> | Prisma.ReadinessProofCreateWithoutBookingInput[] | Prisma.ReadinessProofUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ReadinessProofCreateOrConnectWithoutBookingInput | Prisma.ReadinessProofCreateOrConnectWithoutBookingInput[];
    createMany?: Prisma.ReadinessProofCreateManyBookingInputEnvelope;
    connect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
};
export type ReadinessProofUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.ReadinessProofCreateWithoutBookingInput, Prisma.ReadinessProofUncheckedCreateWithoutBookingInput> | Prisma.ReadinessProofCreateWithoutBookingInput[] | Prisma.ReadinessProofUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ReadinessProofCreateOrConnectWithoutBookingInput | Prisma.ReadinessProofCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.ReadinessProofUpsertWithWhereUniqueWithoutBookingInput | Prisma.ReadinessProofUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.ReadinessProofCreateManyBookingInputEnvelope;
    set?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    disconnect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    delete?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    connect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    update?: Prisma.ReadinessProofUpdateWithWhereUniqueWithoutBookingInput | Prisma.ReadinessProofUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.ReadinessProofUpdateManyWithWhereWithoutBookingInput | Prisma.ReadinessProofUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.ReadinessProofScalarWhereInput | Prisma.ReadinessProofScalarWhereInput[];
};
export type ReadinessProofUncheckedUpdateManyWithoutBookingNestedInput = {
    create?: Prisma.XOR<Prisma.ReadinessProofCreateWithoutBookingInput, Prisma.ReadinessProofUncheckedCreateWithoutBookingInput> | Prisma.ReadinessProofCreateWithoutBookingInput[] | Prisma.ReadinessProofUncheckedCreateWithoutBookingInput[];
    connectOrCreate?: Prisma.ReadinessProofCreateOrConnectWithoutBookingInput | Prisma.ReadinessProofCreateOrConnectWithoutBookingInput[];
    upsert?: Prisma.ReadinessProofUpsertWithWhereUniqueWithoutBookingInput | Prisma.ReadinessProofUpsertWithWhereUniqueWithoutBookingInput[];
    createMany?: Prisma.ReadinessProofCreateManyBookingInputEnvelope;
    set?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    disconnect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    delete?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    connect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    update?: Prisma.ReadinessProofUpdateWithWhereUniqueWithoutBookingInput | Prisma.ReadinessProofUpdateWithWhereUniqueWithoutBookingInput[];
    updateMany?: Prisma.ReadinessProofUpdateManyWithWhereWithoutBookingInput | Prisma.ReadinessProofUpdateManyWithWhereWithoutBookingInput[];
    deleteMany?: Prisma.ReadinessProofScalarWhereInput | Prisma.ReadinessProofScalarWhereInput[];
};
export type ReadinessProofCreateNestedManyWithoutContainerInput = {
    create?: Prisma.XOR<Prisma.ReadinessProofCreateWithoutContainerInput, Prisma.ReadinessProofUncheckedCreateWithoutContainerInput> | Prisma.ReadinessProofCreateWithoutContainerInput[] | Prisma.ReadinessProofUncheckedCreateWithoutContainerInput[];
    connectOrCreate?: Prisma.ReadinessProofCreateOrConnectWithoutContainerInput | Prisma.ReadinessProofCreateOrConnectWithoutContainerInput[];
    createMany?: Prisma.ReadinessProofCreateManyContainerInputEnvelope;
    connect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
};
export type ReadinessProofUncheckedCreateNestedManyWithoutContainerInput = {
    create?: Prisma.XOR<Prisma.ReadinessProofCreateWithoutContainerInput, Prisma.ReadinessProofUncheckedCreateWithoutContainerInput> | Prisma.ReadinessProofCreateWithoutContainerInput[] | Prisma.ReadinessProofUncheckedCreateWithoutContainerInput[];
    connectOrCreate?: Prisma.ReadinessProofCreateOrConnectWithoutContainerInput | Prisma.ReadinessProofCreateOrConnectWithoutContainerInput[];
    createMany?: Prisma.ReadinessProofCreateManyContainerInputEnvelope;
    connect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
};
export type ReadinessProofUpdateManyWithoutContainerNestedInput = {
    create?: Prisma.XOR<Prisma.ReadinessProofCreateWithoutContainerInput, Prisma.ReadinessProofUncheckedCreateWithoutContainerInput> | Prisma.ReadinessProofCreateWithoutContainerInput[] | Prisma.ReadinessProofUncheckedCreateWithoutContainerInput[];
    connectOrCreate?: Prisma.ReadinessProofCreateOrConnectWithoutContainerInput | Prisma.ReadinessProofCreateOrConnectWithoutContainerInput[];
    upsert?: Prisma.ReadinessProofUpsertWithWhereUniqueWithoutContainerInput | Prisma.ReadinessProofUpsertWithWhereUniqueWithoutContainerInput[];
    createMany?: Prisma.ReadinessProofCreateManyContainerInputEnvelope;
    set?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    disconnect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    delete?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    connect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    update?: Prisma.ReadinessProofUpdateWithWhereUniqueWithoutContainerInput | Prisma.ReadinessProofUpdateWithWhereUniqueWithoutContainerInput[];
    updateMany?: Prisma.ReadinessProofUpdateManyWithWhereWithoutContainerInput | Prisma.ReadinessProofUpdateManyWithWhereWithoutContainerInput[];
    deleteMany?: Prisma.ReadinessProofScalarWhereInput | Prisma.ReadinessProofScalarWhereInput[];
};
export type ReadinessProofUncheckedUpdateManyWithoutContainerNestedInput = {
    create?: Prisma.XOR<Prisma.ReadinessProofCreateWithoutContainerInput, Prisma.ReadinessProofUncheckedCreateWithoutContainerInput> | Prisma.ReadinessProofCreateWithoutContainerInput[] | Prisma.ReadinessProofUncheckedCreateWithoutContainerInput[];
    connectOrCreate?: Prisma.ReadinessProofCreateOrConnectWithoutContainerInput | Prisma.ReadinessProofCreateOrConnectWithoutContainerInput[];
    upsert?: Prisma.ReadinessProofUpsertWithWhereUniqueWithoutContainerInput | Prisma.ReadinessProofUpsertWithWhereUniqueWithoutContainerInput[];
    createMany?: Prisma.ReadinessProofCreateManyContainerInputEnvelope;
    set?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    disconnect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    delete?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    connect?: Prisma.ReadinessProofWhereUniqueInput | Prisma.ReadinessProofWhereUniqueInput[];
    update?: Prisma.ReadinessProofUpdateWithWhereUniqueWithoutContainerInput | Prisma.ReadinessProofUpdateWithWhereUniqueWithoutContainerInput[];
    updateMany?: Prisma.ReadinessProofUpdateManyWithWhereWithoutContainerInput | Prisma.ReadinessProofUpdateManyWithWhereWithoutContainerInput[];
    deleteMany?: Prisma.ReadinessProofScalarWhereInput | Prisma.ReadinessProofScalarWhereInput[];
};
export type ReadinessProofCreateWithoutConfirmedByUserInput = {
    id?: string;
    confirmedAt?: Date | string;
    blockchainHash: string;
    booking: Prisma.BookingCreateNestedOneWithoutReadinessProofsInput;
    container: Prisma.ContainerCreateNestedOneWithoutReadinessProofsInput;
};
export type ReadinessProofUncheckedCreateWithoutConfirmedByUserInput = {
    id?: string;
    bookingId: string;
    containerId: string;
    confirmedAt?: Date | string;
    blockchainHash: string;
};
export type ReadinessProofCreateOrConnectWithoutConfirmedByUserInput = {
    where: Prisma.ReadinessProofWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReadinessProofCreateWithoutConfirmedByUserInput, Prisma.ReadinessProofUncheckedCreateWithoutConfirmedByUserInput>;
};
export type ReadinessProofCreateManyConfirmedByUserInputEnvelope = {
    data: Prisma.ReadinessProofCreateManyConfirmedByUserInput | Prisma.ReadinessProofCreateManyConfirmedByUserInput[];
    skipDuplicates?: boolean;
};
export type ReadinessProofUpsertWithWhereUniqueWithoutConfirmedByUserInput = {
    where: Prisma.ReadinessProofWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReadinessProofUpdateWithoutConfirmedByUserInput, Prisma.ReadinessProofUncheckedUpdateWithoutConfirmedByUserInput>;
    create: Prisma.XOR<Prisma.ReadinessProofCreateWithoutConfirmedByUserInput, Prisma.ReadinessProofUncheckedCreateWithoutConfirmedByUserInput>;
};
export type ReadinessProofUpdateWithWhereUniqueWithoutConfirmedByUserInput = {
    where: Prisma.ReadinessProofWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReadinessProofUpdateWithoutConfirmedByUserInput, Prisma.ReadinessProofUncheckedUpdateWithoutConfirmedByUserInput>;
};
export type ReadinessProofUpdateManyWithWhereWithoutConfirmedByUserInput = {
    where: Prisma.ReadinessProofScalarWhereInput;
    data: Prisma.XOR<Prisma.ReadinessProofUpdateManyMutationInput, Prisma.ReadinessProofUncheckedUpdateManyWithoutConfirmedByUserInput>;
};
export type ReadinessProofScalarWhereInput = {
    AND?: Prisma.ReadinessProofScalarWhereInput | Prisma.ReadinessProofScalarWhereInput[];
    OR?: Prisma.ReadinessProofScalarWhereInput[];
    NOT?: Prisma.ReadinessProofScalarWhereInput | Prisma.ReadinessProofScalarWhereInput[];
    id?: Prisma.UuidFilter<"ReadinessProof"> | string;
    bookingId?: Prisma.UuidFilter<"ReadinessProof"> | string;
    containerId?: Prisma.UuidFilter<"ReadinessProof"> | string;
    confirmedBy?: Prisma.UuidFilter<"ReadinessProof"> | string;
    confirmedAt?: Prisma.DateTimeFilter<"ReadinessProof"> | Date | string;
    blockchainHash?: Prisma.StringFilter<"ReadinessProof"> | string;
};
export type ReadinessProofCreateWithoutBookingInput = {
    id?: string;
    confirmedAt?: Date | string;
    blockchainHash: string;
    container: Prisma.ContainerCreateNestedOneWithoutReadinessProofsInput;
    confirmedByUser: Prisma.UserCreateNestedOneWithoutReadinessProofsInput;
};
export type ReadinessProofUncheckedCreateWithoutBookingInput = {
    id?: string;
    containerId: string;
    confirmedBy: string;
    confirmedAt?: Date | string;
    blockchainHash: string;
};
export type ReadinessProofCreateOrConnectWithoutBookingInput = {
    where: Prisma.ReadinessProofWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReadinessProofCreateWithoutBookingInput, Prisma.ReadinessProofUncheckedCreateWithoutBookingInput>;
};
export type ReadinessProofCreateManyBookingInputEnvelope = {
    data: Prisma.ReadinessProofCreateManyBookingInput | Prisma.ReadinessProofCreateManyBookingInput[];
    skipDuplicates?: boolean;
};
export type ReadinessProofUpsertWithWhereUniqueWithoutBookingInput = {
    where: Prisma.ReadinessProofWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReadinessProofUpdateWithoutBookingInput, Prisma.ReadinessProofUncheckedUpdateWithoutBookingInput>;
    create: Prisma.XOR<Prisma.ReadinessProofCreateWithoutBookingInput, Prisma.ReadinessProofUncheckedCreateWithoutBookingInput>;
};
export type ReadinessProofUpdateWithWhereUniqueWithoutBookingInput = {
    where: Prisma.ReadinessProofWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReadinessProofUpdateWithoutBookingInput, Prisma.ReadinessProofUncheckedUpdateWithoutBookingInput>;
};
export type ReadinessProofUpdateManyWithWhereWithoutBookingInput = {
    where: Prisma.ReadinessProofScalarWhereInput;
    data: Prisma.XOR<Prisma.ReadinessProofUpdateManyMutationInput, Prisma.ReadinessProofUncheckedUpdateManyWithoutBookingInput>;
};
export type ReadinessProofCreateWithoutContainerInput = {
    id?: string;
    confirmedAt?: Date | string;
    blockchainHash: string;
    booking: Prisma.BookingCreateNestedOneWithoutReadinessProofsInput;
    confirmedByUser: Prisma.UserCreateNestedOneWithoutReadinessProofsInput;
};
export type ReadinessProofUncheckedCreateWithoutContainerInput = {
    id?: string;
    bookingId: string;
    confirmedBy: string;
    confirmedAt?: Date | string;
    blockchainHash: string;
};
export type ReadinessProofCreateOrConnectWithoutContainerInput = {
    where: Prisma.ReadinessProofWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReadinessProofCreateWithoutContainerInput, Prisma.ReadinessProofUncheckedCreateWithoutContainerInput>;
};
export type ReadinessProofCreateManyContainerInputEnvelope = {
    data: Prisma.ReadinessProofCreateManyContainerInput | Prisma.ReadinessProofCreateManyContainerInput[];
    skipDuplicates?: boolean;
};
export type ReadinessProofUpsertWithWhereUniqueWithoutContainerInput = {
    where: Prisma.ReadinessProofWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReadinessProofUpdateWithoutContainerInput, Prisma.ReadinessProofUncheckedUpdateWithoutContainerInput>;
    create: Prisma.XOR<Prisma.ReadinessProofCreateWithoutContainerInput, Prisma.ReadinessProofUncheckedCreateWithoutContainerInput>;
};
export type ReadinessProofUpdateWithWhereUniqueWithoutContainerInput = {
    where: Prisma.ReadinessProofWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReadinessProofUpdateWithoutContainerInput, Prisma.ReadinessProofUncheckedUpdateWithoutContainerInput>;
};
export type ReadinessProofUpdateManyWithWhereWithoutContainerInput = {
    where: Prisma.ReadinessProofScalarWhereInput;
    data: Prisma.XOR<Prisma.ReadinessProofUpdateManyMutationInput, Prisma.ReadinessProofUncheckedUpdateManyWithoutContainerInput>;
};
export type ReadinessProofCreateManyConfirmedByUserInput = {
    id?: string;
    bookingId: string;
    containerId: string;
    confirmedAt?: Date | string;
    blockchainHash: string;
};
export type ReadinessProofUpdateWithoutConfirmedByUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutReadinessProofsNestedInput;
    container?: Prisma.ContainerUpdateOneRequiredWithoutReadinessProofsNestedInput;
};
export type ReadinessProofUncheckedUpdateWithoutConfirmedByUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    containerId?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReadinessProofUncheckedUpdateManyWithoutConfirmedByUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    containerId?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReadinessProofCreateManyBookingInput = {
    id?: string;
    containerId: string;
    confirmedBy: string;
    confirmedAt?: Date | string;
    blockchainHash: string;
};
export type ReadinessProofUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
    container?: Prisma.ContainerUpdateOneRequiredWithoutReadinessProofsNestedInput;
    confirmedByUser?: Prisma.UserUpdateOneRequiredWithoutReadinessProofsNestedInput;
};
export type ReadinessProofUncheckedUpdateWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerId?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReadinessProofUncheckedUpdateManyWithoutBookingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    containerId?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReadinessProofCreateManyContainerInput = {
    id?: string;
    bookingId: string;
    confirmedBy: string;
    confirmedAt?: Date | string;
    blockchainHash: string;
};
export type ReadinessProofUpdateWithoutContainerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
    booking?: Prisma.BookingUpdateOneRequiredWithoutReadinessProofsNestedInput;
    confirmedByUser?: Prisma.UserUpdateOneRequiredWithoutReadinessProofsNestedInput;
};
export type ReadinessProofUncheckedUpdateWithoutContainerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReadinessProofUncheckedUpdateManyWithoutContainerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingId?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedBy?: Prisma.StringFieldUpdateOperationsInput | string;
    confirmedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    blockchainHash?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type ReadinessProofSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    containerId?: boolean;
    confirmedBy?: boolean;
    confirmedAt?: boolean;
    blockchainHash?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    container?: boolean | Prisma.ContainerDefaultArgs<ExtArgs>;
    confirmedByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["readinessProof"]>;
export type ReadinessProofSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    containerId?: boolean;
    confirmedBy?: boolean;
    confirmedAt?: boolean;
    blockchainHash?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    container?: boolean | Prisma.ContainerDefaultArgs<ExtArgs>;
    confirmedByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["readinessProof"]>;
export type ReadinessProofSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingId?: boolean;
    containerId?: boolean;
    confirmedBy?: boolean;
    confirmedAt?: boolean;
    blockchainHash?: boolean;
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    container?: boolean | Prisma.ContainerDefaultArgs<ExtArgs>;
    confirmedByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["readinessProof"]>;
export type ReadinessProofSelectScalar = {
    id?: boolean;
    bookingId?: boolean;
    containerId?: boolean;
    confirmedBy?: boolean;
    confirmedAt?: boolean;
    blockchainHash?: boolean;
};
export type ReadinessProofOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bookingId" | "containerId" | "confirmedBy" | "confirmedAt" | "blockchainHash", ExtArgs["result"]["readinessProof"]>;
export type ReadinessProofInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    container?: boolean | Prisma.ContainerDefaultArgs<ExtArgs>;
    confirmedByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ReadinessProofIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    container?: boolean | Prisma.ContainerDefaultArgs<ExtArgs>;
    confirmedByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ReadinessProofIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    booking?: boolean | Prisma.BookingDefaultArgs<ExtArgs>;
    container?: boolean | Prisma.ContainerDefaultArgs<ExtArgs>;
    confirmedByUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ReadinessProofPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ReadinessProof";
    objects: {
        booking: Prisma.$BookingPayload<ExtArgs>;
        container: Prisma.$ContainerPayload<ExtArgs>;
        confirmedByUser: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bookingId: string;
        containerId: string;
        confirmedBy: string;
        confirmedAt: Date;
        blockchainHash: string;
    }, ExtArgs["result"]["readinessProof"]>;
    composites: {};
};
export type ReadinessProofGetPayload<S extends boolean | null | undefined | ReadinessProofDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload, S>;
export type ReadinessProofCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReadinessProofFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReadinessProofCountAggregateInputType | true;
};
export interface ReadinessProofDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ReadinessProof'];
        meta: {
            name: 'ReadinessProof';
        };
    };
    findUnique<T extends ReadinessProofFindUniqueArgs>(args: Prisma.SelectSubset<T, ReadinessProofFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReadinessProofClient<runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReadinessProofFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReadinessProofFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReadinessProofClient<runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReadinessProofFindFirstArgs>(args?: Prisma.SelectSubset<T, ReadinessProofFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReadinessProofClient<runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReadinessProofFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReadinessProofFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReadinessProofClient<runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReadinessProofFindManyArgs>(args?: Prisma.SelectSubset<T, ReadinessProofFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReadinessProofCreateArgs>(args: Prisma.SelectSubset<T, ReadinessProofCreateArgs<ExtArgs>>): Prisma.Prisma__ReadinessProofClient<runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReadinessProofCreateManyArgs>(args?: Prisma.SelectSubset<T, ReadinessProofCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReadinessProofCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReadinessProofCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReadinessProofDeleteArgs>(args: Prisma.SelectSubset<T, ReadinessProofDeleteArgs<ExtArgs>>): Prisma.Prisma__ReadinessProofClient<runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReadinessProofUpdateArgs>(args: Prisma.SelectSubset<T, ReadinessProofUpdateArgs<ExtArgs>>): Prisma.Prisma__ReadinessProofClient<runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReadinessProofDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReadinessProofDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReadinessProofUpdateManyArgs>(args: Prisma.SelectSubset<T, ReadinessProofUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReadinessProofUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReadinessProofUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReadinessProofUpsertArgs>(args: Prisma.SelectSubset<T, ReadinessProofUpsertArgs<ExtArgs>>): Prisma.Prisma__ReadinessProofClient<runtime.Types.Result.GetResult<Prisma.$ReadinessProofPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReadinessProofCountArgs>(args?: Prisma.Subset<T, ReadinessProofCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReadinessProofCountAggregateOutputType> : number>;
    aggregate<T extends ReadinessProofAggregateArgs>(args: Prisma.Subset<T, ReadinessProofAggregateArgs>): Prisma.PrismaPromise<GetReadinessProofAggregateType<T>>;
    groupBy<T extends ReadinessProofGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReadinessProofGroupByArgs['orderBy'];
    } : {
        orderBy?: ReadinessProofGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReadinessProofGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReadinessProofGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReadinessProofFieldRefs;
}
export interface Prisma__ReadinessProofClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    booking<T extends Prisma.BookingDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BookingDefaultArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    container<T extends Prisma.ContainerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ContainerDefaultArgs<ExtArgs>>): Prisma.Prisma__ContainerClient<runtime.Types.Result.GetResult<Prisma.$ContainerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    confirmedByUser<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReadinessProofFieldRefs {
    readonly id: Prisma.FieldRef<"ReadinessProof", 'String'>;
    readonly bookingId: Prisma.FieldRef<"ReadinessProof", 'String'>;
    readonly containerId: Prisma.FieldRef<"ReadinessProof", 'String'>;
    readonly confirmedBy: Prisma.FieldRef<"ReadinessProof", 'String'>;
    readonly confirmedAt: Prisma.FieldRef<"ReadinessProof", 'DateTime'>;
    readonly blockchainHash: Prisma.FieldRef<"ReadinessProof", 'String'>;
}
export type ReadinessProofFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessProofSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessProofOmit<ExtArgs> | null;
    include?: Prisma.ReadinessProofInclude<ExtArgs> | null;
    where: Prisma.ReadinessProofWhereUniqueInput;
};
export type ReadinessProofFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessProofSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessProofOmit<ExtArgs> | null;
    include?: Prisma.ReadinessProofInclude<ExtArgs> | null;
    where: Prisma.ReadinessProofWhereUniqueInput;
};
export type ReadinessProofFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReadinessProofFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReadinessProofFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReadinessProofCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessProofSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessProofOmit<ExtArgs> | null;
    include?: Prisma.ReadinessProofInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReadinessProofCreateInput, Prisma.ReadinessProofUncheckedCreateInput>;
};
export type ReadinessProofCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReadinessProofCreateManyInput | Prisma.ReadinessProofCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReadinessProofCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessProofSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReadinessProofOmit<ExtArgs> | null;
    data: Prisma.ReadinessProofCreateManyInput | Prisma.ReadinessProofCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReadinessProofIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReadinessProofUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessProofSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessProofOmit<ExtArgs> | null;
    include?: Prisma.ReadinessProofInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReadinessProofUpdateInput, Prisma.ReadinessProofUncheckedUpdateInput>;
    where: Prisma.ReadinessProofWhereUniqueInput;
};
export type ReadinessProofUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReadinessProofUpdateManyMutationInput, Prisma.ReadinessProofUncheckedUpdateManyInput>;
    where?: Prisma.ReadinessProofWhereInput;
    limit?: number;
};
export type ReadinessProofUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessProofSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReadinessProofOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReadinessProofUpdateManyMutationInput, Prisma.ReadinessProofUncheckedUpdateManyInput>;
    where?: Prisma.ReadinessProofWhereInput;
    limit?: number;
    include?: Prisma.ReadinessProofIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReadinessProofUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessProofSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessProofOmit<ExtArgs> | null;
    include?: Prisma.ReadinessProofInclude<ExtArgs> | null;
    where: Prisma.ReadinessProofWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReadinessProofCreateInput, Prisma.ReadinessProofUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReadinessProofUpdateInput, Prisma.ReadinessProofUncheckedUpdateInput>;
};
export type ReadinessProofDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessProofSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessProofOmit<ExtArgs> | null;
    include?: Prisma.ReadinessProofInclude<ExtArgs> | null;
    where: Prisma.ReadinessProofWhereUniqueInput;
};
export type ReadinessProofDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReadinessProofWhereInput;
    limit?: number;
};
export type ReadinessProofDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReadinessProofSelect<ExtArgs> | null;
    omit?: Prisma.ReadinessProofOmit<ExtArgs> | null;
    include?: Prisma.ReadinessProofInclude<ExtArgs> | null;
};
export {};
