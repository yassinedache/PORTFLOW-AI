import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get company(): Prisma.CompanyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get terminal(): Prisma.TerminalDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get gate(): Prisma.GateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get timeSlot(): Prisma.TimeSlotDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get booking(): Prisma.BookingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get readinessPrediction(): Prisma.ReadinessPredictionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get readinessProof(): Prisma.ReadinessProofDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get blockchainProof(): Prisma.BlockchainProofDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get gateAccessLog(): Prisma.GateAccessLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get container(): Prisma.ContainerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get trackingEvent(): Prisma.TrackingEventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get truck(): Prisma.TruckDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get truckLocation(): Prisma.TruckLocationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get document(): Prisma.DocumentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ocrJob(): Prisma.OcrJobDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get aiSession(): Prisma.AiSessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get aiMessage(): Prisma.AiMessageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get zone(): Prisma.ZoneDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get auditLog(): Prisma.AuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get metricDaily(): Prisma.MetricDailyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get slotPricing(): Prisma.SlotPricingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get priorityAccess(): Prisma.PriorityAccessDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get penalty(): Prisma.PenaltyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
