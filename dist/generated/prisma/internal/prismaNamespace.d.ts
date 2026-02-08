import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly Company: "Company";
    readonly User: "User";
    readonly RefreshToken: "RefreshToken";
    readonly Terminal: "Terminal";
    readonly Gate: "Gate";
    readonly TimeSlot: "TimeSlot";
    readonly Booking: "Booking";
    readonly ReadinessPrediction: "ReadinessPrediction";
    readonly ReadinessProof: "ReadinessProof";
    readonly BlockchainProof: "BlockchainProof";
    readonly GateAccessLog: "GateAccessLog";
    readonly Container: "Container";
    readonly TrackingEvent: "TrackingEvent";
    readonly Truck: "Truck";
    readonly TruckLocation: "TruckLocation";
    readonly Document: "Document";
    readonly OcrJob: "OcrJob";
    readonly AiSession: "AiSession";
    readonly AiMessage: "AiMessage";
    readonly Zone: "Zone";
    readonly AuditLog: "AuditLog";
    readonly MetricDaily: "MetricDaily";
    readonly SlotPricing: "SlotPricing";
    readonly PriorityAccess: "PriorityAccess";
    readonly Penalty: "Penalty";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "company" | "user" | "refreshToken" | "terminal" | "gate" | "timeSlot" | "booking" | "readinessPrediction" | "readinessProof" | "blockchainProof" | "gateAccessLog" | "container" | "trackingEvent" | "truck" | "truckLocation" | "document" | "ocrJob" | "aiSession" | "aiMessage" | "zone" | "auditLog" | "metricDaily" | "slotPricing" | "priorityAccess" | "penalty";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        Company: {
            payload: Prisma.$CompanyPayload<ExtArgs>;
            fields: Prisma.CompanyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CompanyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                findFirst: {
                    args: Prisma.CompanyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                findMany: {
                    args: Prisma.CompanyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>[];
                };
                create: {
                    args: Prisma.CompanyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                createMany: {
                    args: Prisma.CompanyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>[];
                };
                delete: {
                    args: Prisma.CompanyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                update: {
                    args: Prisma.CompanyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                deleteMany: {
                    args: Prisma.CompanyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CompanyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>[];
                };
                upsert: {
                    args: Prisma.CompanyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                aggregate: {
                    args: Prisma.CompanyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCompany>;
                };
                groupBy: {
                    args: Prisma.CompanyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CompanyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CompanyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CompanyCountAggregateOutputType> | number;
                };
            };
        };
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        RefreshToken: {
            payload: Prisma.$RefreshTokenPayload<ExtArgs>;
            fields: Prisma.RefreshTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findFirst: {
                    args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findMany: {
                    args: Prisma.RefreshTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                create: {
                    args: Prisma.RefreshTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                createMany: {
                    args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                delete: {
                    args: Prisma.RefreshTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                update: {
                    args: Prisma.RefreshTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                upsert: {
                    args: Prisma.RefreshTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                aggregate: {
                    args: Prisma.RefreshTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRefreshToken>;
                };
                groupBy: {
                    args: Prisma.RefreshTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RefreshTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenCountAggregateOutputType> | number;
                };
            };
        };
        Terminal: {
            payload: Prisma.$TerminalPayload<ExtArgs>;
            fields: Prisma.TerminalFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TerminalFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TerminalPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TerminalFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TerminalPayload>;
                };
                findFirst: {
                    args: Prisma.TerminalFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TerminalPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TerminalFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TerminalPayload>;
                };
                findMany: {
                    args: Prisma.TerminalFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TerminalPayload>[];
                };
                create: {
                    args: Prisma.TerminalCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TerminalPayload>;
                };
                createMany: {
                    args: Prisma.TerminalCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TerminalCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TerminalPayload>[];
                };
                delete: {
                    args: Prisma.TerminalDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TerminalPayload>;
                };
                update: {
                    args: Prisma.TerminalUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TerminalPayload>;
                };
                deleteMany: {
                    args: Prisma.TerminalDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TerminalUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TerminalUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TerminalPayload>[];
                };
                upsert: {
                    args: Prisma.TerminalUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TerminalPayload>;
                };
                aggregate: {
                    args: Prisma.TerminalAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTerminal>;
                };
                groupBy: {
                    args: Prisma.TerminalGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TerminalGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TerminalCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TerminalCountAggregateOutputType> | number;
                };
            };
        };
        Gate: {
            payload: Prisma.$GatePayload<ExtArgs>;
            fields: Prisma.GateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.GateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.GateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GatePayload>;
                };
                findFirst: {
                    args: Prisma.GateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.GateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GatePayload>;
                };
                findMany: {
                    args: Prisma.GateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GatePayload>[];
                };
                create: {
                    args: Prisma.GateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GatePayload>;
                };
                createMany: {
                    args: Prisma.GateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.GateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GatePayload>[];
                };
                delete: {
                    args: Prisma.GateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GatePayload>;
                };
                update: {
                    args: Prisma.GateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GatePayload>;
                };
                deleteMany: {
                    args: Prisma.GateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.GateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.GateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GatePayload>[];
                };
                upsert: {
                    args: Prisma.GateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GatePayload>;
                };
                aggregate: {
                    args: Prisma.GateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGate>;
                };
                groupBy: {
                    args: Prisma.GateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.GateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GateCountAggregateOutputType> | number;
                };
            };
        };
        TimeSlot: {
            payload: Prisma.$TimeSlotPayload<ExtArgs>;
            fields: Prisma.TimeSlotFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TimeSlotFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TimeSlotPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TimeSlotFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TimeSlotPayload>;
                };
                findFirst: {
                    args: Prisma.TimeSlotFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TimeSlotPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TimeSlotFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TimeSlotPayload>;
                };
                findMany: {
                    args: Prisma.TimeSlotFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TimeSlotPayload>[];
                };
                create: {
                    args: Prisma.TimeSlotCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TimeSlotPayload>;
                };
                createMany: {
                    args: Prisma.TimeSlotCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TimeSlotCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TimeSlotPayload>[];
                };
                delete: {
                    args: Prisma.TimeSlotDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TimeSlotPayload>;
                };
                update: {
                    args: Prisma.TimeSlotUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TimeSlotPayload>;
                };
                deleteMany: {
                    args: Prisma.TimeSlotDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TimeSlotUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TimeSlotUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TimeSlotPayload>[];
                };
                upsert: {
                    args: Prisma.TimeSlotUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TimeSlotPayload>;
                };
                aggregate: {
                    args: Prisma.TimeSlotAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTimeSlot>;
                };
                groupBy: {
                    args: Prisma.TimeSlotGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TimeSlotGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TimeSlotCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TimeSlotCountAggregateOutputType> | number;
                };
            };
        };
        Booking: {
            payload: Prisma.$BookingPayload<ExtArgs>;
            fields: Prisma.BookingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BookingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BookingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                findFirst: {
                    args: Prisma.BookingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BookingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                findMany: {
                    args: Prisma.BookingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>[];
                };
                create: {
                    args: Prisma.BookingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                createMany: {
                    args: Prisma.BookingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BookingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>[];
                };
                delete: {
                    args: Prisma.BookingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                update: {
                    args: Prisma.BookingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                deleteMany: {
                    args: Prisma.BookingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BookingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BookingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>[];
                };
                upsert: {
                    args: Prisma.BookingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BookingPayload>;
                };
                aggregate: {
                    args: Prisma.BookingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBooking>;
                };
                groupBy: {
                    args: Prisma.BookingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BookingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BookingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BookingCountAggregateOutputType> | number;
                };
            };
        };
        ReadinessPrediction: {
            payload: Prisma.$ReadinessPredictionPayload<ExtArgs>;
            fields: Prisma.ReadinessPredictionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReadinessPredictionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessPredictionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReadinessPredictionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessPredictionPayload>;
                };
                findFirst: {
                    args: Prisma.ReadinessPredictionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessPredictionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReadinessPredictionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessPredictionPayload>;
                };
                findMany: {
                    args: Prisma.ReadinessPredictionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessPredictionPayload>[];
                };
                create: {
                    args: Prisma.ReadinessPredictionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessPredictionPayload>;
                };
                createMany: {
                    args: Prisma.ReadinessPredictionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReadinessPredictionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessPredictionPayload>[];
                };
                delete: {
                    args: Prisma.ReadinessPredictionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessPredictionPayload>;
                };
                update: {
                    args: Prisma.ReadinessPredictionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessPredictionPayload>;
                };
                deleteMany: {
                    args: Prisma.ReadinessPredictionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReadinessPredictionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReadinessPredictionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessPredictionPayload>[];
                };
                upsert: {
                    args: Prisma.ReadinessPredictionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessPredictionPayload>;
                };
                aggregate: {
                    args: Prisma.ReadinessPredictionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReadinessPrediction>;
                };
                groupBy: {
                    args: Prisma.ReadinessPredictionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReadinessPredictionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReadinessPredictionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReadinessPredictionCountAggregateOutputType> | number;
                };
            };
        };
        ReadinessProof: {
            payload: Prisma.$ReadinessProofPayload<ExtArgs>;
            fields: Prisma.ReadinessProofFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReadinessProofFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessProofPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReadinessProofFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessProofPayload>;
                };
                findFirst: {
                    args: Prisma.ReadinessProofFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessProofPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReadinessProofFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessProofPayload>;
                };
                findMany: {
                    args: Prisma.ReadinessProofFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessProofPayload>[];
                };
                create: {
                    args: Prisma.ReadinessProofCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessProofPayload>;
                };
                createMany: {
                    args: Prisma.ReadinessProofCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReadinessProofCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessProofPayload>[];
                };
                delete: {
                    args: Prisma.ReadinessProofDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessProofPayload>;
                };
                update: {
                    args: Prisma.ReadinessProofUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessProofPayload>;
                };
                deleteMany: {
                    args: Prisma.ReadinessProofDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReadinessProofUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReadinessProofUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessProofPayload>[];
                };
                upsert: {
                    args: Prisma.ReadinessProofUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReadinessProofPayload>;
                };
                aggregate: {
                    args: Prisma.ReadinessProofAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReadinessProof>;
                };
                groupBy: {
                    args: Prisma.ReadinessProofGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReadinessProofGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReadinessProofCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReadinessProofCountAggregateOutputType> | number;
                };
            };
        };
        BlockchainProof: {
            payload: Prisma.$BlockchainProofPayload<ExtArgs>;
            fields: Prisma.BlockchainProofFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BlockchainProofFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockchainProofPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BlockchainProofFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockchainProofPayload>;
                };
                findFirst: {
                    args: Prisma.BlockchainProofFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockchainProofPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BlockchainProofFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockchainProofPayload>;
                };
                findMany: {
                    args: Prisma.BlockchainProofFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockchainProofPayload>[];
                };
                create: {
                    args: Prisma.BlockchainProofCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockchainProofPayload>;
                };
                createMany: {
                    args: Prisma.BlockchainProofCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BlockchainProofCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockchainProofPayload>[];
                };
                delete: {
                    args: Prisma.BlockchainProofDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockchainProofPayload>;
                };
                update: {
                    args: Prisma.BlockchainProofUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockchainProofPayload>;
                };
                deleteMany: {
                    args: Prisma.BlockchainProofDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BlockchainProofUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BlockchainProofUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockchainProofPayload>[];
                };
                upsert: {
                    args: Prisma.BlockchainProofUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BlockchainProofPayload>;
                };
                aggregate: {
                    args: Prisma.BlockchainProofAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBlockchainProof>;
                };
                groupBy: {
                    args: Prisma.BlockchainProofGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BlockchainProofGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BlockchainProofCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BlockchainProofCountAggregateOutputType> | number;
                };
            };
        };
        GateAccessLog: {
            payload: Prisma.$GateAccessLogPayload<ExtArgs>;
            fields: Prisma.GateAccessLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.GateAccessLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GateAccessLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.GateAccessLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GateAccessLogPayload>;
                };
                findFirst: {
                    args: Prisma.GateAccessLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GateAccessLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.GateAccessLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GateAccessLogPayload>;
                };
                findMany: {
                    args: Prisma.GateAccessLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GateAccessLogPayload>[];
                };
                create: {
                    args: Prisma.GateAccessLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GateAccessLogPayload>;
                };
                createMany: {
                    args: Prisma.GateAccessLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.GateAccessLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GateAccessLogPayload>[];
                };
                delete: {
                    args: Prisma.GateAccessLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GateAccessLogPayload>;
                };
                update: {
                    args: Prisma.GateAccessLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GateAccessLogPayload>;
                };
                deleteMany: {
                    args: Prisma.GateAccessLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.GateAccessLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.GateAccessLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GateAccessLogPayload>[];
                };
                upsert: {
                    args: Prisma.GateAccessLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$GateAccessLogPayload>;
                };
                aggregate: {
                    args: Prisma.GateAccessLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGateAccessLog>;
                };
                groupBy: {
                    args: Prisma.GateAccessLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GateAccessLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.GateAccessLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GateAccessLogCountAggregateOutputType> | number;
                };
            };
        };
        Container: {
            payload: Prisma.$ContainerPayload<ExtArgs>;
            fields: Prisma.ContainerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ContainerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContainerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ContainerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContainerPayload>;
                };
                findFirst: {
                    args: Prisma.ContainerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContainerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ContainerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContainerPayload>;
                };
                findMany: {
                    args: Prisma.ContainerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContainerPayload>[];
                };
                create: {
                    args: Prisma.ContainerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContainerPayload>;
                };
                createMany: {
                    args: Prisma.ContainerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ContainerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContainerPayload>[];
                };
                delete: {
                    args: Prisma.ContainerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContainerPayload>;
                };
                update: {
                    args: Prisma.ContainerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContainerPayload>;
                };
                deleteMany: {
                    args: Prisma.ContainerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ContainerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ContainerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContainerPayload>[];
                };
                upsert: {
                    args: Prisma.ContainerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ContainerPayload>;
                };
                aggregate: {
                    args: Prisma.ContainerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateContainer>;
                };
                groupBy: {
                    args: Prisma.ContainerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ContainerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ContainerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ContainerCountAggregateOutputType> | number;
                };
            };
        };
        TrackingEvent: {
            payload: Prisma.$TrackingEventPayload<ExtArgs>;
            fields: Prisma.TrackingEventFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TrackingEventFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackingEventPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TrackingEventFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackingEventPayload>;
                };
                findFirst: {
                    args: Prisma.TrackingEventFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackingEventPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TrackingEventFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackingEventPayload>;
                };
                findMany: {
                    args: Prisma.TrackingEventFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackingEventPayload>[];
                };
                create: {
                    args: Prisma.TrackingEventCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackingEventPayload>;
                };
                createMany: {
                    args: Prisma.TrackingEventCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TrackingEventCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackingEventPayload>[];
                };
                delete: {
                    args: Prisma.TrackingEventDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackingEventPayload>;
                };
                update: {
                    args: Prisma.TrackingEventUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackingEventPayload>;
                };
                deleteMany: {
                    args: Prisma.TrackingEventDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TrackingEventUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TrackingEventUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackingEventPayload>[];
                };
                upsert: {
                    args: Prisma.TrackingEventUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TrackingEventPayload>;
                };
                aggregate: {
                    args: Prisma.TrackingEventAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTrackingEvent>;
                };
                groupBy: {
                    args: Prisma.TrackingEventGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TrackingEventGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TrackingEventCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TrackingEventCountAggregateOutputType> | number;
                };
            };
        };
        Truck: {
            payload: Prisma.$TruckPayload<ExtArgs>;
            fields: Prisma.TruckFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TruckFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TruckFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckPayload>;
                };
                findFirst: {
                    args: Prisma.TruckFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TruckFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckPayload>;
                };
                findMany: {
                    args: Prisma.TruckFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckPayload>[];
                };
                create: {
                    args: Prisma.TruckCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckPayload>;
                };
                createMany: {
                    args: Prisma.TruckCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TruckCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckPayload>[];
                };
                delete: {
                    args: Prisma.TruckDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckPayload>;
                };
                update: {
                    args: Prisma.TruckUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckPayload>;
                };
                deleteMany: {
                    args: Prisma.TruckDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TruckUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TruckUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckPayload>[];
                };
                upsert: {
                    args: Prisma.TruckUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckPayload>;
                };
                aggregate: {
                    args: Prisma.TruckAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTruck>;
                };
                groupBy: {
                    args: Prisma.TruckGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TruckGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TruckCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TruckCountAggregateOutputType> | number;
                };
            };
        };
        TruckLocation: {
            payload: Prisma.$TruckLocationPayload<ExtArgs>;
            fields: Prisma.TruckLocationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TruckLocationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckLocationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TruckLocationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckLocationPayload>;
                };
                findFirst: {
                    args: Prisma.TruckLocationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckLocationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TruckLocationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckLocationPayload>;
                };
                findMany: {
                    args: Prisma.TruckLocationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckLocationPayload>[];
                };
                create: {
                    args: Prisma.TruckLocationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckLocationPayload>;
                };
                createMany: {
                    args: Prisma.TruckLocationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TruckLocationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckLocationPayload>[];
                };
                delete: {
                    args: Prisma.TruckLocationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckLocationPayload>;
                };
                update: {
                    args: Prisma.TruckLocationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckLocationPayload>;
                };
                deleteMany: {
                    args: Prisma.TruckLocationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TruckLocationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TruckLocationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckLocationPayload>[];
                };
                upsert: {
                    args: Prisma.TruckLocationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TruckLocationPayload>;
                };
                aggregate: {
                    args: Prisma.TruckLocationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTruckLocation>;
                };
                groupBy: {
                    args: Prisma.TruckLocationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TruckLocationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TruckLocationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TruckLocationCountAggregateOutputType> | number;
                };
            };
        };
        Document: {
            payload: Prisma.$DocumentPayload<ExtArgs>;
            fields: Prisma.DocumentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DocumentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>;
                };
                findFirst: {
                    args: Prisma.DocumentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>;
                };
                findMany: {
                    args: Prisma.DocumentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>[];
                };
                create: {
                    args: Prisma.DocumentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>;
                };
                createMany: {
                    args: Prisma.DocumentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>[];
                };
                delete: {
                    args: Prisma.DocumentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>;
                };
                update: {
                    args: Prisma.DocumentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>;
                };
                deleteMany: {
                    args: Prisma.DocumentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DocumentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>[];
                };
                upsert: {
                    args: Prisma.DocumentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DocumentPayload>;
                };
                aggregate: {
                    args: Prisma.DocumentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDocument>;
                };
                groupBy: {
                    args: Prisma.DocumentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DocumentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DocumentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DocumentCountAggregateOutputType> | number;
                };
            };
        };
        OcrJob: {
            payload: Prisma.$OcrJobPayload<ExtArgs>;
            fields: Prisma.OcrJobFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OcrJobFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OcrJobPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OcrJobFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OcrJobPayload>;
                };
                findFirst: {
                    args: Prisma.OcrJobFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OcrJobPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OcrJobFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OcrJobPayload>;
                };
                findMany: {
                    args: Prisma.OcrJobFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OcrJobPayload>[];
                };
                create: {
                    args: Prisma.OcrJobCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OcrJobPayload>;
                };
                createMany: {
                    args: Prisma.OcrJobCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OcrJobCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OcrJobPayload>[];
                };
                delete: {
                    args: Prisma.OcrJobDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OcrJobPayload>;
                };
                update: {
                    args: Prisma.OcrJobUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OcrJobPayload>;
                };
                deleteMany: {
                    args: Prisma.OcrJobDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OcrJobUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OcrJobUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OcrJobPayload>[];
                };
                upsert: {
                    args: Prisma.OcrJobUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OcrJobPayload>;
                };
                aggregate: {
                    args: Prisma.OcrJobAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOcrJob>;
                };
                groupBy: {
                    args: Prisma.OcrJobGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OcrJobGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OcrJobCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OcrJobCountAggregateOutputType> | number;
                };
            };
        };
        AiSession: {
            payload: Prisma.$AiSessionPayload<ExtArgs>;
            fields: Prisma.AiSessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AiSessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiSessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AiSessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiSessionPayload>;
                };
                findFirst: {
                    args: Prisma.AiSessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiSessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AiSessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiSessionPayload>;
                };
                findMany: {
                    args: Prisma.AiSessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiSessionPayload>[];
                };
                create: {
                    args: Prisma.AiSessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiSessionPayload>;
                };
                createMany: {
                    args: Prisma.AiSessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AiSessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiSessionPayload>[];
                };
                delete: {
                    args: Prisma.AiSessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiSessionPayload>;
                };
                update: {
                    args: Prisma.AiSessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiSessionPayload>;
                };
                deleteMany: {
                    args: Prisma.AiSessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AiSessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AiSessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiSessionPayload>[];
                };
                upsert: {
                    args: Prisma.AiSessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiSessionPayload>;
                };
                aggregate: {
                    args: Prisma.AiSessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAiSession>;
                };
                groupBy: {
                    args: Prisma.AiSessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AiSessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AiSessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AiSessionCountAggregateOutputType> | number;
                };
            };
        };
        AiMessage: {
            payload: Prisma.$AiMessagePayload<ExtArgs>;
            fields: Prisma.AiMessageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AiMessageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiMessagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AiMessageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiMessagePayload>;
                };
                findFirst: {
                    args: Prisma.AiMessageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiMessagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AiMessageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiMessagePayload>;
                };
                findMany: {
                    args: Prisma.AiMessageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiMessagePayload>[];
                };
                create: {
                    args: Prisma.AiMessageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiMessagePayload>;
                };
                createMany: {
                    args: Prisma.AiMessageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AiMessageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiMessagePayload>[];
                };
                delete: {
                    args: Prisma.AiMessageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiMessagePayload>;
                };
                update: {
                    args: Prisma.AiMessageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiMessagePayload>;
                };
                deleteMany: {
                    args: Prisma.AiMessageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AiMessageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AiMessageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiMessagePayload>[];
                };
                upsert: {
                    args: Prisma.AiMessageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AiMessagePayload>;
                };
                aggregate: {
                    args: Prisma.AiMessageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAiMessage>;
                };
                groupBy: {
                    args: Prisma.AiMessageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AiMessageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AiMessageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AiMessageCountAggregateOutputType> | number;
                };
            };
        };
        Zone: {
            payload: Prisma.$ZonePayload<ExtArgs>;
            fields: Prisma.ZoneFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ZoneFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ZoneFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>;
                };
                findFirst: {
                    args: Prisma.ZoneFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ZoneFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>;
                };
                findMany: {
                    args: Prisma.ZoneFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>[];
                };
                create: {
                    args: Prisma.ZoneCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>;
                };
                createMany: {
                    args: Prisma.ZoneCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ZoneCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>[];
                };
                delete: {
                    args: Prisma.ZoneDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>;
                };
                update: {
                    args: Prisma.ZoneUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>;
                };
                deleteMany: {
                    args: Prisma.ZoneDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ZoneUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ZoneUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>[];
                };
                upsert: {
                    args: Prisma.ZoneUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ZonePayload>;
                };
                aggregate: {
                    args: Prisma.ZoneAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateZone>;
                };
                groupBy: {
                    args: Prisma.ZoneGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ZoneGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ZoneCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ZoneCountAggregateOutputType> | number;
                };
            };
        };
        AuditLog: {
            payload: Prisma.$AuditLogPayload<ExtArgs>;
            fields: Prisma.AuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findMany: {
                    args: Prisma.AuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                create: {
                    args: Prisma.AuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                createMany: {
                    args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                delete: {
                    args: Prisma.AuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                update: {
                    args: Prisma.AuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                upsert: {
                    args: Prisma.AuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.AuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuditLog>;
                };
                groupBy: {
                    args: Prisma.AuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogCountAggregateOutputType> | number;
                };
            };
        };
        MetricDaily: {
            payload: Prisma.$MetricDailyPayload<ExtArgs>;
            fields: Prisma.MetricDailyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MetricDailyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MetricDailyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MetricDailyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MetricDailyPayload>;
                };
                findFirst: {
                    args: Prisma.MetricDailyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MetricDailyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MetricDailyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MetricDailyPayload>;
                };
                findMany: {
                    args: Prisma.MetricDailyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MetricDailyPayload>[];
                };
                create: {
                    args: Prisma.MetricDailyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MetricDailyPayload>;
                };
                createMany: {
                    args: Prisma.MetricDailyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MetricDailyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MetricDailyPayload>[];
                };
                delete: {
                    args: Prisma.MetricDailyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MetricDailyPayload>;
                };
                update: {
                    args: Prisma.MetricDailyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MetricDailyPayload>;
                };
                deleteMany: {
                    args: Prisma.MetricDailyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MetricDailyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MetricDailyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MetricDailyPayload>[];
                };
                upsert: {
                    args: Prisma.MetricDailyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MetricDailyPayload>;
                };
                aggregate: {
                    args: Prisma.MetricDailyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMetricDaily>;
                };
                groupBy: {
                    args: Prisma.MetricDailyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MetricDailyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MetricDailyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MetricDailyCountAggregateOutputType> | number;
                };
            };
        };
        SlotPricing: {
            payload: Prisma.$SlotPricingPayload<ExtArgs>;
            fields: Prisma.SlotPricingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SlotPricingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SlotPricingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SlotPricingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SlotPricingPayload>;
                };
                findFirst: {
                    args: Prisma.SlotPricingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SlotPricingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SlotPricingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SlotPricingPayload>;
                };
                findMany: {
                    args: Prisma.SlotPricingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SlotPricingPayload>[];
                };
                create: {
                    args: Prisma.SlotPricingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SlotPricingPayload>;
                };
                createMany: {
                    args: Prisma.SlotPricingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SlotPricingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SlotPricingPayload>[];
                };
                delete: {
                    args: Prisma.SlotPricingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SlotPricingPayload>;
                };
                update: {
                    args: Prisma.SlotPricingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SlotPricingPayload>;
                };
                deleteMany: {
                    args: Prisma.SlotPricingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SlotPricingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SlotPricingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SlotPricingPayload>[];
                };
                upsert: {
                    args: Prisma.SlotPricingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SlotPricingPayload>;
                };
                aggregate: {
                    args: Prisma.SlotPricingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSlotPricing>;
                };
                groupBy: {
                    args: Prisma.SlotPricingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SlotPricingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SlotPricingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SlotPricingCountAggregateOutputType> | number;
                };
            };
        };
        PriorityAccess: {
            payload: Prisma.$PriorityAccessPayload<ExtArgs>;
            fields: Prisma.PriorityAccessFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PriorityAccessFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriorityAccessPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PriorityAccessFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriorityAccessPayload>;
                };
                findFirst: {
                    args: Prisma.PriorityAccessFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriorityAccessPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PriorityAccessFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriorityAccessPayload>;
                };
                findMany: {
                    args: Prisma.PriorityAccessFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriorityAccessPayload>[];
                };
                create: {
                    args: Prisma.PriorityAccessCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriorityAccessPayload>;
                };
                createMany: {
                    args: Prisma.PriorityAccessCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PriorityAccessCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriorityAccessPayload>[];
                };
                delete: {
                    args: Prisma.PriorityAccessDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriorityAccessPayload>;
                };
                update: {
                    args: Prisma.PriorityAccessUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriorityAccessPayload>;
                };
                deleteMany: {
                    args: Prisma.PriorityAccessDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PriorityAccessUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PriorityAccessUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriorityAccessPayload>[];
                };
                upsert: {
                    args: Prisma.PriorityAccessUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PriorityAccessPayload>;
                };
                aggregate: {
                    args: Prisma.PriorityAccessAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePriorityAccess>;
                };
                groupBy: {
                    args: Prisma.PriorityAccessGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PriorityAccessGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PriorityAccessCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PriorityAccessCountAggregateOutputType> | number;
                };
            };
        };
        Penalty: {
            payload: Prisma.$PenaltyPayload<ExtArgs>;
            fields: Prisma.PenaltyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PenaltyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PenaltyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PenaltyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PenaltyPayload>;
                };
                findFirst: {
                    args: Prisma.PenaltyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PenaltyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PenaltyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PenaltyPayload>;
                };
                findMany: {
                    args: Prisma.PenaltyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PenaltyPayload>[];
                };
                create: {
                    args: Prisma.PenaltyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PenaltyPayload>;
                };
                createMany: {
                    args: Prisma.PenaltyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PenaltyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PenaltyPayload>[];
                };
                delete: {
                    args: Prisma.PenaltyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PenaltyPayload>;
                };
                update: {
                    args: Prisma.PenaltyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PenaltyPayload>;
                };
                deleteMany: {
                    args: Prisma.PenaltyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PenaltyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PenaltyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PenaltyPayload>[];
                };
                upsert: {
                    args: Prisma.PenaltyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PenaltyPayload>;
                };
                aggregate: {
                    args: Prisma.PenaltyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePenalty>;
                };
                groupBy: {
                    args: Prisma.PenaltyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PenaltyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PenaltyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PenaltyCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const CompanyScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly createdAt: "createdAt";
};
export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly role: "role";
    readonly companyId: "companyId";
    readonly deviceId: "deviceId";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly token: "token";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const TerminalScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly location: "location";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type TerminalScalarFieldEnum = (typeof TerminalScalarFieldEnum)[keyof typeof TerminalScalarFieldEnum];
export declare const GateScalarFieldEnum: {
    readonly id: "id";
    readonly terminalId: "terminalId";
    readonly name: "name";
    readonly isActive: "isActive";
};
export type GateScalarFieldEnum = (typeof GateScalarFieldEnum)[keyof typeof GateScalarFieldEnum];
export declare const TimeSlotScalarFieldEnum: {
    readonly id: "id";
    readonly terminalId: "terminalId";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly capacity: "capacity";
};
export type TimeSlotScalarFieldEnum = (typeof TimeSlotScalarFieldEnum)[keyof typeof TimeSlotScalarFieldEnum];
export declare const BookingScalarFieldEnum: {
    readonly id: "id";
    readonly carrierId: "carrierId";
    readonly terminalId: "terminalId";
    readonly timeSlotId: "timeSlotId";
    readonly status: "status";
    readonly readinessScore: "readinessScore";
    readonly price: "price";
    readonly qrToken: "qrToken";
    readonly blockchainHash: "blockchainHash";
    readonly idempotencyKey: "idempotencyKey";
    readonly truckId: "truckId";
    readonly containerId: "containerId";
    readonly createdAt: "createdAt";
    readonly validatedAt: "validatedAt";
};
export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum];
export declare const ReadinessPredictionScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly probability: "probability";
    readonly riskLevel: "riskLevel";
    readonly computedAt: "computedAt";
};
export type ReadinessPredictionScalarFieldEnum = (typeof ReadinessPredictionScalarFieldEnum)[keyof typeof ReadinessPredictionScalarFieldEnum];
export declare const ReadinessProofScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly containerId: "containerId";
    readonly confirmedBy: "confirmedBy";
    readonly confirmedAt: "confirmedAt";
    readonly blockchainHash: "blockchainHash";
};
export type ReadinessProofScalarFieldEnum = (typeof ReadinessProofScalarFieldEnum)[keyof typeof ReadinessProofScalarFieldEnum];
export declare const BlockchainProofScalarFieldEnum: {
    readonly id: "id";
    readonly entityType: "entityType";
    readonly entityId: "entityId";
    readonly hash: "hash";
    readonly payloadHash: "payloadHash";
    readonly createdAt: "createdAt";
};
export type BlockchainProofScalarFieldEnum = (typeof BlockchainProofScalarFieldEnum)[keyof typeof BlockchainProofScalarFieldEnum];
export declare const GateAccessLogScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly gateId: "gateId";
    readonly result: "result";
    readonly reason: "reason";
    readonly scannedAt: "scannedAt";
};
export type GateAccessLogScalarFieldEnum = (typeof GateAccessLogScalarFieldEnum)[keyof typeof GateAccessLogScalarFieldEnum];
export declare const ContainerScalarFieldEnum: {
    readonly id: "id";
    readonly containerNumber: "containerNumber";
    readonly carrierId: "carrierId";
    readonly terminalId: "terminalId";
    readonly status: "status";
    readonly lastUpdatedAt: "lastUpdatedAt";
    readonly createdAt: "createdAt";
};
export type ContainerScalarFieldEnum = (typeof ContainerScalarFieldEnum)[keyof typeof ContainerScalarFieldEnum];
export declare const TrackingEventScalarFieldEnum: {
    readonly id: "id";
    readonly containerId: "containerId";
    readonly type: "type";
    readonly location: "location";
    readonly timestamp: "timestamp";
};
export type TrackingEventScalarFieldEnum = (typeof TrackingEventScalarFieldEnum)[keyof typeof TrackingEventScalarFieldEnum];
export declare const TruckScalarFieldEnum: {
    readonly id: "id";
    readonly plate: "plate";
    readonly carrierId: "carrierId";
    readonly createdAt: "createdAt";
};
export type TruckScalarFieldEnum = (typeof TruckScalarFieldEnum)[keyof typeof TruckScalarFieldEnum];
export declare const TruckLocationScalarFieldEnum: {
    readonly id: "id";
    readonly truckId: "truckId";
    readonly lat: "lat";
    readonly lng: "lng";
    readonly timestamp: "timestamp";
};
export type TruckLocationScalarFieldEnum = (typeof TruckLocationScalarFieldEnum)[keyof typeof TruckLocationScalarFieldEnum];
export declare const DocumentScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly status: "status";
    readonly fileName: "fileName";
    readonly filePath: "filePath";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum];
export declare const OcrJobScalarFieldEnum: {
    readonly id: "id";
    readonly documentId: "documentId";
    readonly status: "status";
    readonly resultJson: "resultJson";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OcrJobScalarFieldEnum = (typeof OcrJobScalarFieldEnum)[keyof typeof OcrJobScalarFieldEnum];
export declare const AiSessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type AiSessionScalarFieldEnum = (typeof AiSessionScalarFieldEnum)[keyof typeof AiSessionScalarFieldEnum];
export declare const AiMessageScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly role: "role";
    readonly content: "content";
    readonly timestamp: "timestamp";
};
export type AiMessageScalarFieldEnum = (typeof AiMessageScalarFieldEnum)[keyof typeof AiMessageScalarFieldEnum];
export declare const ZoneScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly terminalId: "terminalId";
    readonly type: "type";
    readonly maxTrucks: "maxTrucks";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type ZoneScalarFieldEnum = (typeof ZoneScalarFieldEnum)[keyof typeof ZoneScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly action: "action";
    readonly entity: "entity";
    readonly entityId: "entityId";
    readonly meta: "meta";
    readonly timestamp: "timestamp";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const MetricDailyScalarFieldEnum: {
    readonly id: "id";
    readonly date: "date";
    readonly terminalId: "terminalId";
    readonly avgWaitingTime: "avgWaitingTime";
    readonly totalBookings: "totalBookings";
    readonly revenue: "revenue";
};
export type MetricDailyScalarFieldEnum = (typeof MetricDailyScalarFieldEnum)[keyof typeof MetricDailyScalarFieldEnum];
export declare const SlotPricingScalarFieldEnum: {
    readonly id: "id";
    readonly slotId: "slotId";
    readonly basePrice: "basePrice";
    readonly multiplier: "multiplier";
    readonly finalPrice: "finalPrice";
    readonly reason: "reason";
    readonly isEcoSlot: "isEcoSlot";
    readonly computedAt: "computedAt";
};
export type SlotPricingScalarFieldEnum = (typeof SlotPricingScalarFieldEnum)[keyof typeof SlotPricingScalarFieldEnum];
export declare const PriorityAccessScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly level: "level";
    readonly fee: "fee";
    readonly createdAt: "createdAt";
};
export type PriorityAccessScalarFieldEnum = (typeof PriorityAccessScalarFieldEnum)[keyof typeof PriorityAccessScalarFieldEnum];
export declare const PenaltyScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly type: "type";
    readonly amount: "amount";
    readonly reason: "reason";
    readonly appliedAt: "appliedAt";
};
export type PenaltyScalarFieldEnum = (typeof PenaltyScalarFieldEnum)[keyof typeof PenaltyScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type EnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus'>;
export type ListEnumBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BookingStatus[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type EnumGateAccessResultFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GateAccessResult'>;
export type ListEnumGateAccessResultFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GateAccessResult[]'>;
export type EnumContainerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContainerStatus'>;
export type ListEnumContainerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContainerStatus[]'>;
export type EnumTrackingEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrackingEventType'>;
export type ListEnumTrackingEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TrackingEventType[]'>;
export type EnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType'>;
export type ListEnumDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentType[]'>;
export type EnumOcrJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OcrJobStatus'>;
export type ListEnumOcrJobStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OcrJobStatus[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumAiMessageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AiMessageRole'>;
export type ListEnumAiMessageRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AiMessageRole[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    company?: Prisma.CompanyOmit;
    user?: Prisma.UserOmit;
    refreshToken?: Prisma.RefreshTokenOmit;
    terminal?: Prisma.TerminalOmit;
    gate?: Prisma.GateOmit;
    timeSlot?: Prisma.TimeSlotOmit;
    booking?: Prisma.BookingOmit;
    readinessPrediction?: Prisma.ReadinessPredictionOmit;
    readinessProof?: Prisma.ReadinessProofOmit;
    blockchainProof?: Prisma.BlockchainProofOmit;
    gateAccessLog?: Prisma.GateAccessLogOmit;
    container?: Prisma.ContainerOmit;
    trackingEvent?: Prisma.TrackingEventOmit;
    truck?: Prisma.TruckOmit;
    truckLocation?: Prisma.TruckLocationOmit;
    document?: Prisma.DocumentOmit;
    ocrJob?: Prisma.OcrJobOmit;
    aiSession?: Prisma.AiSessionOmit;
    aiMessage?: Prisma.AiMessageOmit;
    zone?: Prisma.ZoneOmit;
    auditLog?: Prisma.AuditLogOmit;
    metricDaily?: Prisma.MetricDailyOmit;
    slotPricing?: Prisma.SlotPricingOmit;
    priorityAccess?: Prisma.PriorityAccessOmit;
    penalty?: Prisma.PenaltyOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
