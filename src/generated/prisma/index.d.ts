
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Person
 * 
 */
export type Person = $Result.DefaultSelection<Prisma.$PersonPayload>
/**
 * Model SpouseRelationship
 * 
 */
export type SpouseRelationship = $Result.DefaultSelection<Prisma.$SpouseRelationshipPayload>
/**
 * Model ChangeRequest
 * 
 */
export type ChangeRequest = $Result.DefaultSelection<Prisma.$ChangeRequestPayload>
/**
 * Model Family
 * 
 */
export type Family = $Result.DefaultSelection<Prisma.$FamilyPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Gender: {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
};

export type Gender = (typeof Gender)[keyof typeof Gender]


export const ChangeRequestAction: {
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE'
};

export type ChangeRequestAction = (typeof ChangeRequestAction)[keyof typeof ChangeRequestAction]


export const ChangeRequestStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
};

export type ChangeRequestStatus = (typeof ChangeRequestStatus)[keyof typeof ChangeRequestStatus]


export const ChangeRequestTargetModel: {
  PERSON: 'PERSON',
  SPOUSERELATIONSHIP: 'SPOUSERELATIONSHIP'
};

export type ChangeRequestTargetModel = (typeof ChangeRequestTargetModel)[keyof typeof ChangeRequestTargetModel]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

export type ChangeRequestAction = $Enums.ChangeRequestAction

export const ChangeRequestAction: typeof $Enums.ChangeRequestAction

export type ChangeRequestStatus = $Enums.ChangeRequestStatus

export const ChangeRequestStatus: typeof $Enums.ChangeRequestStatus

export type ChangeRequestTargetModel = $Enums.ChangeRequestTargetModel

export const ChangeRequestTargetModel: typeof $Enums.ChangeRequestTargetModel

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.person`: Exposes CRUD operations for the **Person** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more People
    * const people = await prisma.person.findMany()
    * ```
    */
  get person(): Prisma.PersonDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.spouseRelationship`: Exposes CRUD operations for the **SpouseRelationship** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SpouseRelationships
    * const spouseRelationships = await prisma.spouseRelationship.findMany()
    * ```
    */
  get spouseRelationship(): Prisma.SpouseRelationshipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.changeRequest`: Exposes CRUD operations for the **ChangeRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChangeRequests
    * const changeRequests = await prisma.changeRequest.findMany()
    * ```
    */
  get changeRequest(): Prisma.ChangeRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.family`: Exposes CRUD operations for the **Family** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Families
    * const families = await prisma.family.findMany()
    * ```
    */
  get family(): Prisma.FamilyDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
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

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Person: 'Person',
    SpouseRelationship: 'SpouseRelationship',
    ChangeRequest: 'ChangeRequest',
    Family: 'Family'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "person" | "spouseRelationship" | "changeRequest" | "family"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Person: {
        payload: Prisma.$PersonPayload<ExtArgs>
        fields: Prisma.PersonFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PersonFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PersonFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          findFirst: {
            args: Prisma.PersonFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PersonFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          findMany: {
            args: Prisma.PersonFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          create: {
            args: Prisma.PersonCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          createMany: {
            args: Prisma.PersonCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PersonCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          delete: {
            args: Prisma.PersonDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          update: {
            args: Prisma.PersonUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          deleteMany: {
            args: Prisma.PersonDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PersonUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PersonUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>[]
          }
          upsert: {
            args: Prisma.PersonUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PersonPayload>
          }
          aggregate: {
            args: Prisma.PersonAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePerson>
          }
          groupBy: {
            args: Prisma.PersonGroupByArgs<ExtArgs>
            result: $Utils.Optional<PersonGroupByOutputType>[]
          }
          count: {
            args: Prisma.PersonCountArgs<ExtArgs>
            result: $Utils.Optional<PersonCountAggregateOutputType> | number
          }
        }
      }
      SpouseRelationship: {
        payload: Prisma.$SpouseRelationshipPayload<ExtArgs>
        fields: Prisma.SpouseRelationshipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SpouseRelationshipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpouseRelationshipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SpouseRelationshipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpouseRelationshipPayload>
          }
          findFirst: {
            args: Prisma.SpouseRelationshipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpouseRelationshipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SpouseRelationshipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpouseRelationshipPayload>
          }
          findMany: {
            args: Prisma.SpouseRelationshipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpouseRelationshipPayload>[]
          }
          create: {
            args: Prisma.SpouseRelationshipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpouseRelationshipPayload>
          }
          createMany: {
            args: Prisma.SpouseRelationshipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SpouseRelationshipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpouseRelationshipPayload>[]
          }
          delete: {
            args: Prisma.SpouseRelationshipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpouseRelationshipPayload>
          }
          update: {
            args: Prisma.SpouseRelationshipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpouseRelationshipPayload>
          }
          deleteMany: {
            args: Prisma.SpouseRelationshipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SpouseRelationshipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SpouseRelationshipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpouseRelationshipPayload>[]
          }
          upsert: {
            args: Prisma.SpouseRelationshipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SpouseRelationshipPayload>
          }
          aggregate: {
            args: Prisma.SpouseRelationshipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSpouseRelationship>
          }
          groupBy: {
            args: Prisma.SpouseRelationshipGroupByArgs<ExtArgs>
            result: $Utils.Optional<SpouseRelationshipGroupByOutputType>[]
          }
          count: {
            args: Prisma.SpouseRelationshipCountArgs<ExtArgs>
            result: $Utils.Optional<SpouseRelationshipCountAggregateOutputType> | number
          }
        }
      }
      ChangeRequest: {
        payload: Prisma.$ChangeRequestPayload<ExtArgs>
        fields: Prisma.ChangeRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChangeRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChangeRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>
          }
          findFirst: {
            args: Prisma.ChangeRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChangeRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>
          }
          findMany: {
            args: Prisma.ChangeRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>[]
          }
          create: {
            args: Prisma.ChangeRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>
          }
          createMany: {
            args: Prisma.ChangeRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChangeRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>[]
          }
          delete: {
            args: Prisma.ChangeRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>
          }
          update: {
            args: Prisma.ChangeRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>
          }
          deleteMany: {
            args: Prisma.ChangeRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChangeRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChangeRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>[]
          }
          upsert: {
            args: Prisma.ChangeRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChangeRequestPayload>
          }
          aggregate: {
            args: Prisma.ChangeRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChangeRequest>
          }
          groupBy: {
            args: Prisma.ChangeRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChangeRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChangeRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ChangeRequestCountAggregateOutputType> | number
          }
        }
      }
      Family: {
        payload: Prisma.$FamilyPayload<ExtArgs>
        fields: Prisma.FamilyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FamilyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FamilyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          findFirst: {
            args: Prisma.FamilyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FamilyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          findMany: {
            args: Prisma.FamilyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>[]
          }
          create: {
            args: Prisma.FamilyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          createMany: {
            args: Prisma.FamilyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FamilyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>[]
          }
          delete: {
            args: Prisma.FamilyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          update: {
            args: Prisma.FamilyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          deleteMany: {
            args: Prisma.FamilyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FamilyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FamilyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>[]
          }
          upsert: {
            args: Prisma.FamilyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FamilyPayload>
          }
          aggregate: {
            args: Prisma.FamilyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFamily>
          }
          groupBy: {
            args: Prisma.FamilyGroupByArgs<ExtArgs>
            result: $Utils.Optional<FamilyGroupByOutputType>[]
          }
          count: {
            args: Prisma.FamilyCountArgs<ExtArgs>
            result: $Utils.Optional<FamilyCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    person?: PersonOmit
    spouseRelationship?: SpouseRelationshipOmit
    changeRequest?: ChangeRequestOmit
    family?: FamilyOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    changeRequests: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    changeRequests?: boolean | UserCountOutputTypeCountChangeRequestsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChangeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChangeRequestWhereInput
  }


  /**
   * Count Type PersonCountOutputType
   */

  export type PersonCountOutputType = {
    fatherChildren: number
    motherChildren: number
    spouseConnections: number
    spousedByConnections: number
  }

  export type PersonCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    fatherChildren?: boolean | PersonCountOutputTypeCountFatherChildrenArgs
    motherChildren?: boolean | PersonCountOutputTypeCountMotherChildrenArgs
    spouseConnections?: boolean | PersonCountOutputTypeCountSpouseConnectionsArgs
    spousedByConnections?: boolean | PersonCountOutputTypeCountSpousedByConnectionsArgs
  }

  // Custom InputTypes
  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PersonCountOutputType
     */
    select?: PersonCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountFatherChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountMotherChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountSpouseConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpouseRelationshipWhereInput
  }

  /**
   * PersonCountOutputType without action
   */
  export type PersonCountOutputTypeCountSpousedByConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpouseRelationshipWhereInput
  }


  /**
   * Count Type FamilyCountOutputType
   */

  export type FamilyCountOutputType = {
    members: number
  }

  export type FamilyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | FamilyCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FamilyCountOutputType
     */
    select?: FamilyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FamilyCountOutputType without action
   */
  export type FamilyCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    password: string | null
    role: $Enums.Role | null
    name: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    phone: string | null
    password: string | null
    role: $Enums.Role | null
    name: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    phone: number
    password: number
    role: number
    name: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    name?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    name?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    name?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string | null
    phone: string | null
    password: string
    role: $Enums.Role
    name: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
    changeRequests?: boolean | User$changeRequestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    name?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "phone" | "password" | "role" | "name", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    changeRequests?: boolean | User$changeRequestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      changeRequests: Prisma.$ChangeRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string | null
      phone: string | null
      password: string
      role: $Enums.Role
      name: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    changeRequests<T extends User$changeRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$changeRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly name: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.changeRequests
   */
  export type User$changeRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    where?: ChangeRequestWhereInput
    orderBy?: ChangeRequestOrderByWithRelationInput | ChangeRequestOrderByWithRelationInput[]
    cursor?: ChangeRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChangeRequestScalarFieldEnum | ChangeRequestScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Person
   */

  export type AggregatePerson = {
    _count: PersonCountAggregateOutputType | null
    _avg: PersonAvgAggregateOutputType | null
    _sum: PersonSumAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  export type PersonAvgAggregateOutputType = {
    id: number | null
    familyId: number | null
    fatherId: number | null
    motherId: number | null
  }

  export type PersonSumAggregateOutputType = {
    id: number | null
    familyId: number | null
    fatherId: number | null
    motherId: number | null
  }

  export type PersonMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    gender: $Enums.Gender | null
    birthDate: Date | null
    deathDate: Date | null
    phone: string | null
    familyId: number | null
    fatherId: number | null
    motherId: number | null
  }

  export type PersonMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    gender: $Enums.Gender | null
    birthDate: Date | null
    deathDate: Date | null
    phone: string | null
    familyId: number | null
    fatherId: number | null
    motherId: number | null
  }

  export type PersonCountAggregateOutputType = {
    id: number
    firstName: number
    gender: number
    birthDate: number
    deathDate: number
    phone: number
    familyId: number
    fatherId: number
    motherId: number
    _all: number
  }


  export type PersonAvgAggregateInputType = {
    id?: true
    familyId?: true
    fatherId?: true
    motherId?: true
  }

  export type PersonSumAggregateInputType = {
    id?: true
    familyId?: true
    fatherId?: true
    motherId?: true
  }

  export type PersonMinAggregateInputType = {
    id?: true
    firstName?: true
    gender?: true
    birthDate?: true
    deathDate?: true
    phone?: true
    familyId?: true
    fatherId?: true
    motherId?: true
  }

  export type PersonMaxAggregateInputType = {
    id?: true
    firstName?: true
    gender?: true
    birthDate?: true
    deathDate?: true
    phone?: true
    familyId?: true
    fatherId?: true
    motherId?: true
  }

  export type PersonCountAggregateInputType = {
    id?: true
    firstName?: true
    gender?: true
    birthDate?: true
    deathDate?: true
    phone?: true
    familyId?: true
    fatherId?: true
    motherId?: true
    _all?: true
  }

  export type PersonAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Person to aggregate.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned People
    **/
    _count?: true | PersonCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PersonAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PersonSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PersonMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PersonMaxAggregateInputType
  }

  export type GetPersonAggregateType<T extends PersonAggregateArgs> = {
        [P in keyof T & keyof AggregatePerson]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePerson[P]>
      : GetScalarType<T[P], AggregatePerson[P]>
  }




  export type PersonGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithAggregationInput | PersonOrderByWithAggregationInput[]
    by: PersonScalarFieldEnum[] | PersonScalarFieldEnum
    having?: PersonScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PersonCountAggregateInputType | true
    _avg?: PersonAvgAggregateInputType
    _sum?: PersonSumAggregateInputType
    _min?: PersonMinAggregateInputType
    _max?: PersonMaxAggregateInputType
  }

  export type PersonGroupByOutputType = {
    id: number
    firstName: string
    gender: $Enums.Gender
    birthDate: Date | null
    deathDate: Date | null
    phone: string | null
    familyId: number
    fatherId: number | null
    motherId: number | null
    _count: PersonCountAggregateOutputType | null
    _avg: PersonAvgAggregateOutputType | null
    _sum: PersonSumAggregateOutputType | null
    _min: PersonMinAggregateOutputType | null
    _max: PersonMaxAggregateOutputType | null
  }

  type GetPersonGroupByPayload<T extends PersonGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PersonGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PersonGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PersonGroupByOutputType[P]>
            : GetScalarType<T[P], PersonGroupByOutputType[P]>
        }
      >
    >


  export type PersonSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    gender?: boolean
    birthDate?: boolean
    deathDate?: boolean
    phone?: boolean
    familyId?: boolean
    fatherId?: boolean
    motherId?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    father?: boolean | Person$fatherArgs<ExtArgs>
    mother?: boolean | Person$motherArgs<ExtArgs>
    fatherChildren?: boolean | Person$fatherChildrenArgs<ExtArgs>
    motherChildren?: boolean | Person$motherChildrenArgs<ExtArgs>
    spouseConnections?: boolean | Person$spouseConnectionsArgs<ExtArgs>
    spousedByConnections?: boolean | Person$spousedByConnectionsArgs<ExtArgs>
    rootOfFamily?: boolean | Person$rootOfFamilyArgs<ExtArgs>
    _count?: boolean | PersonCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["person"]>

  export type PersonSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    gender?: boolean
    birthDate?: boolean
    deathDate?: boolean
    phone?: boolean
    familyId?: boolean
    fatherId?: boolean
    motherId?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    father?: boolean | Person$fatherArgs<ExtArgs>
    mother?: boolean | Person$motherArgs<ExtArgs>
  }, ExtArgs["result"]["person"]>

  export type PersonSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    gender?: boolean
    birthDate?: boolean
    deathDate?: boolean
    phone?: boolean
    familyId?: boolean
    fatherId?: boolean
    motherId?: boolean
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    father?: boolean | Person$fatherArgs<ExtArgs>
    mother?: boolean | Person$motherArgs<ExtArgs>
  }, ExtArgs["result"]["person"]>

  export type PersonSelectScalar = {
    id?: boolean
    firstName?: boolean
    gender?: boolean
    birthDate?: boolean
    deathDate?: boolean
    phone?: boolean
    familyId?: boolean
    fatherId?: boolean
    motherId?: boolean
  }

  export type PersonOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "gender" | "birthDate" | "deathDate" | "phone" | "familyId" | "fatherId" | "motherId", ExtArgs["result"]["person"]>
  export type PersonInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    father?: boolean | Person$fatherArgs<ExtArgs>
    mother?: boolean | Person$motherArgs<ExtArgs>
    fatherChildren?: boolean | Person$fatherChildrenArgs<ExtArgs>
    motherChildren?: boolean | Person$motherChildrenArgs<ExtArgs>
    spouseConnections?: boolean | Person$spouseConnectionsArgs<ExtArgs>
    spousedByConnections?: boolean | Person$spousedByConnectionsArgs<ExtArgs>
    rootOfFamily?: boolean | Person$rootOfFamilyArgs<ExtArgs>
    _count?: boolean | PersonCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PersonIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    father?: boolean | Person$fatherArgs<ExtArgs>
    mother?: boolean | Person$motherArgs<ExtArgs>
  }
  export type PersonIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    family?: boolean | FamilyDefaultArgs<ExtArgs>
    father?: boolean | Person$fatherArgs<ExtArgs>
    mother?: boolean | Person$motherArgs<ExtArgs>
  }

  export type $PersonPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Person"
    objects: {
      family: Prisma.$FamilyPayload<ExtArgs>
      father: Prisma.$PersonPayload<ExtArgs> | null
      mother: Prisma.$PersonPayload<ExtArgs> | null
      fatherChildren: Prisma.$PersonPayload<ExtArgs>[]
      motherChildren: Prisma.$PersonPayload<ExtArgs>[]
      spouseConnections: Prisma.$SpouseRelationshipPayload<ExtArgs>[]
      spousedByConnections: Prisma.$SpouseRelationshipPayload<ExtArgs>[]
      rootOfFamily: Prisma.$FamilyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string
      gender: $Enums.Gender
      birthDate: Date | null
      deathDate: Date | null
      phone: string | null
      familyId: number
      fatherId: number | null
      motherId: number | null
    }, ExtArgs["result"]["person"]>
    composites: {}
  }

  type PersonGetPayload<S extends boolean | null | undefined | PersonDefaultArgs> = $Result.GetResult<Prisma.$PersonPayload, S>

  type PersonCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PersonFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PersonCountAggregateInputType | true
    }

  export interface PersonDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Person'], meta: { name: 'Person' } }
    /**
     * Find zero or one Person that matches the filter.
     * @param {PersonFindUniqueArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PersonFindUniqueArgs>(args: SelectSubset<T, PersonFindUniqueArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Person that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PersonFindUniqueOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PersonFindUniqueOrThrowArgs>(args: SelectSubset<T, PersonFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Person that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PersonFindFirstArgs>(args?: SelectSubset<T, PersonFindFirstArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Person that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindFirstOrThrowArgs} args - Arguments to find a Person
     * @example
     * // Get one Person
     * const person = await prisma.person.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PersonFindFirstOrThrowArgs>(args?: SelectSubset<T, PersonFindFirstOrThrowArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more People that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all People
     * const people = await prisma.person.findMany()
     * 
     * // Get first 10 People
     * const people = await prisma.person.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const personWithIdOnly = await prisma.person.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PersonFindManyArgs>(args?: SelectSubset<T, PersonFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Person.
     * @param {PersonCreateArgs} args - Arguments to create a Person.
     * @example
     * // Create one Person
     * const Person = await prisma.person.create({
     *   data: {
     *     // ... data to create a Person
     *   }
     * })
     * 
     */
    create<T extends PersonCreateArgs>(args: SelectSubset<T, PersonCreateArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many People.
     * @param {PersonCreateManyArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PersonCreateManyArgs>(args?: SelectSubset<T, PersonCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many People and returns the data saved in the database.
     * @param {PersonCreateManyAndReturnArgs} args - Arguments to create many People.
     * @example
     * // Create many People
     * const person = await prisma.person.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many People and only return the `id`
     * const personWithIdOnly = await prisma.person.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PersonCreateManyAndReturnArgs>(args?: SelectSubset<T, PersonCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Person.
     * @param {PersonDeleteArgs} args - Arguments to delete one Person.
     * @example
     * // Delete one Person
     * const Person = await prisma.person.delete({
     *   where: {
     *     // ... filter to delete one Person
     *   }
     * })
     * 
     */
    delete<T extends PersonDeleteArgs>(args: SelectSubset<T, PersonDeleteArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Person.
     * @param {PersonUpdateArgs} args - Arguments to update one Person.
     * @example
     * // Update one Person
     * const person = await prisma.person.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PersonUpdateArgs>(args: SelectSubset<T, PersonUpdateArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more People.
     * @param {PersonDeleteManyArgs} args - Arguments to filter People to delete.
     * @example
     * // Delete a few People
     * const { count } = await prisma.person.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PersonDeleteManyArgs>(args?: SelectSubset<T, PersonDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many People
     * const person = await prisma.person.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PersonUpdateManyArgs>(args: SelectSubset<T, PersonUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more People and returns the data updated in the database.
     * @param {PersonUpdateManyAndReturnArgs} args - Arguments to update many People.
     * @example
     * // Update many People
     * const person = await prisma.person.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more People and only return the `id`
     * const personWithIdOnly = await prisma.person.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PersonUpdateManyAndReturnArgs>(args: SelectSubset<T, PersonUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Person.
     * @param {PersonUpsertArgs} args - Arguments to update or create a Person.
     * @example
     * // Update or create a Person
     * const person = await prisma.person.upsert({
     *   create: {
     *     // ... data to create a Person
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Person we want to update
     *   }
     * })
     */
    upsert<T extends PersonUpsertArgs>(args: SelectSubset<T, PersonUpsertArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of People.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonCountArgs} args - Arguments to filter People to count.
     * @example
     * // Count the number of People
     * const count = await prisma.person.count({
     *   where: {
     *     // ... the filter for the People we want to count
     *   }
     * })
    **/
    count<T extends PersonCountArgs>(
      args?: Subset<T, PersonCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PersonCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PersonAggregateArgs>(args: Subset<T, PersonAggregateArgs>): Prisma.PrismaPromise<GetPersonAggregateType<T>>

    /**
     * Group by Person.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PersonGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PersonGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PersonGroupByArgs['orderBy'] }
        : { orderBy?: PersonGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PersonGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPersonGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Person model
   */
  readonly fields: PersonFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Person.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PersonClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    family<T extends FamilyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FamilyDefaultArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    father<T extends Person$fatherArgs<ExtArgs> = {}>(args?: Subset<T, Person$fatherArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    mother<T extends Person$motherArgs<ExtArgs> = {}>(args?: Subset<T, Person$motherArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    fatherChildren<T extends Person$fatherChildrenArgs<ExtArgs> = {}>(args?: Subset<T, Person$fatherChildrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    motherChildren<T extends Person$motherChildrenArgs<ExtArgs> = {}>(args?: Subset<T, Person$motherChildrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    spouseConnections<T extends Person$spouseConnectionsArgs<ExtArgs> = {}>(args?: Subset<T, Person$spouseConnectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    spousedByConnections<T extends Person$spousedByConnectionsArgs<ExtArgs> = {}>(args?: Subset<T, Person$spousedByConnectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rootOfFamily<T extends Person$rootOfFamilyArgs<ExtArgs> = {}>(args?: Subset<T, Person$rootOfFamilyArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Person model
   */
  interface PersonFieldRefs {
    readonly id: FieldRef<"Person", 'Int'>
    readonly firstName: FieldRef<"Person", 'String'>
    readonly gender: FieldRef<"Person", 'Gender'>
    readonly birthDate: FieldRef<"Person", 'DateTime'>
    readonly deathDate: FieldRef<"Person", 'DateTime'>
    readonly phone: FieldRef<"Person", 'String'>
    readonly familyId: FieldRef<"Person", 'Int'>
    readonly fatherId: FieldRef<"Person", 'Int'>
    readonly motherId: FieldRef<"Person", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Person findUnique
   */
  export type PersonFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person findUniqueOrThrow
   */
  export type PersonFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person findFirst
   */
  export type PersonFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person findFirstOrThrow
   */
  export type PersonFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which Person to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of People.
     */
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person findMany
   */
  export type PersonFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter, which People to fetch.
     */
    where?: PersonWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of People to fetch.
     */
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing People.
     */
    cursor?: PersonWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` People from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` People.
     */
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person create
   */
  export type PersonCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The data needed to create a Person.
     */
    data: XOR<PersonCreateInput, PersonUncheckedCreateInput>
  }

  /**
   * Person createMany
   */
  export type PersonCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many People.
     */
    data: PersonCreateManyInput | PersonCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Person createManyAndReturn
   */
  export type PersonCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * The data used to create many People.
     */
    data: PersonCreateManyInput | PersonCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Person update
   */
  export type PersonUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The data needed to update a Person.
     */
    data: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
    /**
     * Choose, which Person to update.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person updateMany
   */
  export type PersonUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update People.
     */
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
  }

  /**
   * Person updateManyAndReturn
   */
  export type PersonUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * The data used to update People.
     */
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyInput>
    /**
     * Filter which People to update
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Person upsert
   */
  export type PersonUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * The filter to search for the Person to update in case it exists.
     */
    where: PersonWhereUniqueInput
    /**
     * In case the Person found by the `where` argument doesn't exist, create a new Person with this data.
     */
    create: XOR<PersonCreateInput, PersonUncheckedCreateInput>
    /**
     * In case the Person was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PersonUpdateInput, PersonUncheckedUpdateInput>
  }

  /**
   * Person delete
   */
  export type PersonDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    /**
     * Filter which Person to delete.
     */
    where: PersonWhereUniqueInput
  }

  /**
   * Person deleteMany
   */
  export type PersonDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which People to delete
     */
    where?: PersonWhereInput
    /**
     * Limit how many People to delete.
     */
    limit?: number
  }

  /**
   * Person.father
   */
  export type Person$fatherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
  }

  /**
   * Person.mother
   */
  export type Person$motherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
  }

  /**
   * Person.fatherChildren
   */
  export type Person$fatherChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    cursor?: PersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person.motherChildren
   */
  export type Person$motherChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    cursor?: PersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Person.spouseConnections
   */
  export type Person$spouseConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipInclude<ExtArgs> | null
    where?: SpouseRelationshipWhereInput
    orderBy?: SpouseRelationshipOrderByWithRelationInput | SpouseRelationshipOrderByWithRelationInput[]
    cursor?: SpouseRelationshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpouseRelationshipScalarFieldEnum | SpouseRelationshipScalarFieldEnum[]
  }

  /**
   * Person.spousedByConnections
   */
  export type Person$spousedByConnectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipInclude<ExtArgs> | null
    where?: SpouseRelationshipWhereInput
    orderBy?: SpouseRelationshipOrderByWithRelationInput | SpouseRelationshipOrderByWithRelationInput[]
    cursor?: SpouseRelationshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SpouseRelationshipScalarFieldEnum | SpouseRelationshipScalarFieldEnum[]
  }

  /**
   * Person.rootOfFamily
   */
  export type Person$rootOfFamilyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    where?: FamilyWhereInput
  }

  /**
   * Person without action
   */
  export type PersonDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
  }


  /**
   * Model SpouseRelationship
   */

  export type AggregateSpouseRelationship = {
    _count: SpouseRelationshipCountAggregateOutputType | null
    _avg: SpouseRelationshipAvgAggregateOutputType | null
    _sum: SpouseRelationshipSumAggregateOutputType | null
    _min: SpouseRelationshipMinAggregateOutputType | null
    _max: SpouseRelationshipMaxAggregateOutputType | null
  }

  export type SpouseRelationshipAvgAggregateOutputType = {
    id: number | null
    personId: number | null
    spouseId: number | null
  }

  export type SpouseRelationshipSumAggregateOutputType = {
    id: number | null
    personId: number | null
    spouseId: number | null
  }

  export type SpouseRelationshipMinAggregateOutputType = {
    id: number | null
    personId: number | null
    spouseId: number | null
    startDate: Date | null
    endDate: Date | null
    isActive: boolean | null
  }

  export type SpouseRelationshipMaxAggregateOutputType = {
    id: number | null
    personId: number | null
    spouseId: number | null
    startDate: Date | null
    endDate: Date | null
    isActive: boolean | null
  }

  export type SpouseRelationshipCountAggregateOutputType = {
    id: number
    personId: number
    spouseId: number
    startDate: number
    endDate: number
    isActive: number
    _all: number
  }


  export type SpouseRelationshipAvgAggregateInputType = {
    id?: true
    personId?: true
    spouseId?: true
  }

  export type SpouseRelationshipSumAggregateInputType = {
    id?: true
    personId?: true
    spouseId?: true
  }

  export type SpouseRelationshipMinAggregateInputType = {
    id?: true
    personId?: true
    spouseId?: true
    startDate?: true
    endDate?: true
    isActive?: true
  }

  export type SpouseRelationshipMaxAggregateInputType = {
    id?: true
    personId?: true
    spouseId?: true
    startDate?: true
    endDate?: true
    isActive?: true
  }

  export type SpouseRelationshipCountAggregateInputType = {
    id?: true
    personId?: true
    spouseId?: true
    startDate?: true
    endDate?: true
    isActive?: true
    _all?: true
  }

  export type SpouseRelationshipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpouseRelationship to aggregate.
     */
    where?: SpouseRelationshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpouseRelationships to fetch.
     */
    orderBy?: SpouseRelationshipOrderByWithRelationInput | SpouseRelationshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SpouseRelationshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpouseRelationships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpouseRelationships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SpouseRelationships
    **/
    _count?: true | SpouseRelationshipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SpouseRelationshipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SpouseRelationshipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SpouseRelationshipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SpouseRelationshipMaxAggregateInputType
  }

  export type GetSpouseRelationshipAggregateType<T extends SpouseRelationshipAggregateArgs> = {
        [P in keyof T & keyof AggregateSpouseRelationship]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSpouseRelationship[P]>
      : GetScalarType<T[P], AggregateSpouseRelationship[P]>
  }




  export type SpouseRelationshipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SpouseRelationshipWhereInput
    orderBy?: SpouseRelationshipOrderByWithAggregationInput | SpouseRelationshipOrderByWithAggregationInput[]
    by: SpouseRelationshipScalarFieldEnum[] | SpouseRelationshipScalarFieldEnum
    having?: SpouseRelationshipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SpouseRelationshipCountAggregateInputType | true
    _avg?: SpouseRelationshipAvgAggregateInputType
    _sum?: SpouseRelationshipSumAggregateInputType
    _min?: SpouseRelationshipMinAggregateInputType
    _max?: SpouseRelationshipMaxAggregateInputType
  }

  export type SpouseRelationshipGroupByOutputType = {
    id: number
    personId: number
    spouseId: number
    startDate: Date | null
    endDate: Date | null
    isActive: boolean
    _count: SpouseRelationshipCountAggregateOutputType | null
    _avg: SpouseRelationshipAvgAggregateOutputType | null
    _sum: SpouseRelationshipSumAggregateOutputType | null
    _min: SpouseRelationshipMinAggregateOutputType | null
    _max: SpouseRelationshipMaxAggregateOutputType | null
  }

  type GetSpouseRelationshipGroupByPayload<T extends SpouseRelationshipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SpouseRelationshipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SpouseRelationshipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SpouseRelationshipGroupByOutputType[P]>
            : GetScalarType<T[P], SpouseRelationshipGroupByOutputType[P]>
        }
      >
    >


  export type SpouseRelationshipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    personId?: boolean
    spouseId?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
    spouse?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spouseRelationship"]>

  export type SpouseRelationshipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    personId?: boolean
    spouseId?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
    spouse?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spouseRelationship"]>

  export type SpouseRelationshipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    personId?: boolean
    spouseId?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
    person?: boolean | PersonDefaultArgs<ExtArgs>
    spouse?: boolean | PersonDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["spouseRelationship"]>

  export type SpouseRelationshipSelectScalar = {
    id?: boolean
    personId?: boolean
    spouseId?: boolean
    startDate?: boolean
    endDate?: boolean
    isActive?: boolean
  }

  export type SpouseRelationshipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "personId" | "spouseId" | "startDate" | "endDate" | "isActive", ExtArgs["result"]["spouseRelationship"]>
  export type SpouseRelationshipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
    spouse?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type SpouseRelationshipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
    spouse?: boolean | PersonDefaultArgs<ExtArgs>
  }
  export type SpouseRelationshipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    person?: boolean | PersonDefaultArgs<ExtArgs>
    spouse?: boolean | PersonDefaultArgs<ExtArgs>
  }

  export type $SpouseRelationshipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SpouseRelationship"
    objects: {
      person: Prisma.$PersonPayload<ExtArgs>
      spouse: Prisma.$PersonPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      personId: number
      spouseId: number
      startDate: Date | null
      endDate: Date | null
      isActive: boolean
    }, ExtArgs["result"]["spouseRelationship"]>
    composites: {}
  }

  type SpouseRelationshipGetPayload<S extends boolean | null | undefined | SpouseRelationshipDefaultArgs> = $Result.GetResult<Prisma.$SpouseRelationshipPayload, S>

  type SpouseRelationshipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SpouseRelationshipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SpouseRelationshipCountAggregateInputType | true
    }

  export interface SpouseRelationshipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SpouseRelationship'], meta: { name: 'SpouseRelationship' } }
    /**
     * Find zero or one SpouseRelationship that matches the filter.
     * @param {SpouseRelationshipFindUniqueArgs} args - Arguments to find a SpouseRelationship
     * @example
     * // Get one SpouseRelationship
     * const spouseRelationship = await prisma.spouseRelationship.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SpouseRelationshipFindUniqueArgs>(args: SelectSubset<T, SpouseRelationshipFindUniqueArgs<ExtArgs>>): Prisma__SpouseRelationshipClient<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SpouseRelationship that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SpouseRelationshipFindUniqueOrThrowArgs} args - Arguments to find a SpouseRelationship
     * @example
     * // Get one SpouseRelationship
     * const spouseRelationship = await prisma.spouseRelationship.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SpouseRelationshipFindUniqueOrThrowArgs>(args: SelectSubset<T, SpouseRelationshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SpouseRelationshipClient<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SpouseRelationship that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpouseRelationshipFindFirstArgs} args - Arguments to find a SpouseRelationship
     * @example
     * // Get one SpouseRelationship
     * const spouseRelationship = await prisma.spouseRelationship.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SpouseRelationshipFindFirstArgs>(args?: SelectSubset<T, SpouseRelationshipFindFirstArgs<ExtArgs>>): Prisma__SpouseRelationshipClient<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SpouseRelationship that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpouseRelationshipFindFirstOrThrowArgs} args - Arguments to find a SpouseRelationship
     * @example
     * // Get one SpouseRelationship
     * const spouseRelationship = await prisma.spouseRelationship.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SpouseRelationshipFindFirstOrThrowArgs>(args?: SelectSubset<T, SpouseRelationshipFindFirstOrThrowArgs<ExtArgs>>): Prisma__SpouseRelationshipClient<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SpouseRelationships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpouseRelationshipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SpouseRelationships
     * const spouseRelationships = await prisma.spouseRelationship.findMany()
     * 
     * // Get first 10 SpouseRelationships
     * const spouseRelationships = await prisma.spouseRelationship.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const spouseRelationshipWithIdOnly = await prisma.spouseRelationship.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SpouseRelationshipFindManyArgs>(args?: SelectSubset<T, SpouseRelationshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SpouseRelationship.
     * @param {SpouseRelationshipCreateArgs} args - Arguments to create a SpouseRelationship.
     * @example
     * // Create one SpouseRelationship
     * const SpouseRelationship = await prisma.spouseRelationship.create({
     *   data: {
     *     // ... data to create a SpouseRelationship
     *   }
     * })
     * 
     */
    create<T extends SpouseRelationshipCreateArgs>(args: SelectSubset<T, SpouseRelationshipCreateArgs<ExtArgs>>): Prisma__SpouseRelationshipClient<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SpouseRelationships.
     * @param {SpouseRelationshipCreateManyArgs} args - Arguments to create many SpouseRelationships.
     * @example
     * // Create many SpouseRelationships
     * const spouseRelationship = await prisma.spouseRelationship.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SpouseRelationshipCreateManyArgs>(args?: SelectSubset<T, SpouseRelationshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SpouseRelationships and returns the data saved in the database.
     * @param {SpouseRelationshipCreateManyAndReturnArgs} args - Arguments to create many SpouseRelationships.
     * @example
     * // Create many SpouseRelationships
     * const spouseRelationship = await prisma.spouseRelationship.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SpouseRelationships and only return the `id`
     * const spouseRelationshipWithIdOnly = await prisma.spouseRelationship.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SpouseRelationshipCreateManyAndReturnArgs>(args?: SelectSubset<T, SpouseRelationshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SpouseRelationship.
     * @param {SpouseRelationshipDeleteArgs} args - Arguments to delete one SpouseRelationship.
     * @example
     * // Delete one SpouseRelationship
     * const SpouseRelationship = await prisma.spouseRelationship.delete({
     *   where: {
     *     // ... filter to delete one SpouseRelationship
     *   }
     * })
     * 
     */
    delete<T extends SpouseRelationshipDeleteArgs>(args: SelectSubset<T, SpouseRelationshipDeleteArgs<ExtArgs>>): Prisma__SpouseRelationshipClient<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SpouseRelationship.
     * @param {SpouseRelationshipUpdateArgs} args - Arguments to update one SpouseRelationship.
     * @example
     * // Update one SpouseRelationship
     * const spouseRelationship = await prisma.spouseRelationship.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SpouseRelationshipUpdateArgs>(args: SelectSubset<T, SpouseRelationshipUpdateArgs<ExtArgs>>): Prisma__SpouseRelationshipClient<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SpouseRelationships.
     * @param {SpouseRelationshipDeleteManyArgs} args - Arguments to filter SpouseRelationships to delete.
     * @example
     * // Delete a few SpouseRelationships
     * const { count } = await prisma.spouseRelationship.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SpouseRelationshipDeleteManyArgs>(args?: SelectSubset<T, SpouseRelationshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SpouseRelationships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpouseRelationshipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SpouseRelationships
     * const spouseRelationship = await prisma.spouseRelationship.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SpouseRelationshipUpdateManyArgs>(args: SelectSubset<T, SpouseRelationshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SpouseRelationships and returns the data updated in the database.
     * @param {SpouseRelationshipUpdateManyAndReturnArgs} args - Arguments to update many SpouseRelationships.
     * @example
     * // Update many SpouseRelationships
     * const spouseRelationship = await prisma.spouseRelationship.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SpouseRelationships and only return the `id`
     * const spouseRelationshipWithIdOnly = await prisma.spouseRelationship.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SpouseRelationshipUpdateManyAndReturnArgs>(args: SelectSubset<T, SpouseRelationshipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SpouseRelationship.
     * @param {SpouseRelationshipUpsertArgs} args - Arguments to update or create a SpouseRelationship.
     * @example
     * // Update or create a SpouseRelationship
     * const spouseRelationship = await prisma.spouseRelationship.upsert({
     *   create: {
     *     // ... data to create a SpouseRelationship
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SpouseRelationship we want to update
     *   }
     * })
     */
    upsert<T extends SpouseRelationshipUpsertArgs>(args: SelectSubset<T, SpouseRelationshipUpsertArgs<ExtArgs>>): Prisma__SpouseRelationshipClient<$Result.GetResult<Prisma.$SpouseRelationshipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SpouseRelationships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpouseRelationshipCountArgs} args - Arguments to filter SpouseRelationships to count.
     * @example
     * // Count the number of SpouseRelationships
     * const count = await prisma.spouseRelationship.count({
     *   where: {
     *     // ... the filter for the SpouseRelationships we want to count
     *   }
     * })
    **/
    count<T extends SpouseRelationshipCountArgs>(
      args?: Subset<T, SpouseRelationshipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SpouseRelationshipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SpouseRelationship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpouseRelationshipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SpouseRelationshipAggregateArgs>(args: Subset<T, SpouseRelationshipAggregateArgs>): Prisma.PrismaPromise<GetSpouseRelationshipAggregateType<T>>

    /**
     * Group by SpouseRelationship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SpouseRelationshipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SpouseRelationshipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SpouseRelationshipGroupByArgs['orderBy'] }
        : { orderBy?: SpouseRelationshipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SpouseRelationshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSpouseRelationshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SpouseRelationship model
   */
  readonly fields: SpouseRelationshipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SpouseRelationship.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SpouseRelationshipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    person<T extends PersonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonDefaultArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    spouse<T extends PersonDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PersonDefaultArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SpouseRelationship model
   */
  interface SpouseRelationshipFieldRefs {
    readonly id: FieldRef<"SpouseRelationship", 'Int'>
    readonly personId: FieldRef<"SpouseRelationship", 'Int'>
    readonly spouseId: FieldRef<"SpouseRelationship", 'Int'>
    readonly startDate: FieldRef<"SpouseRelationship", 'DateTime'>
    readonly endDate: FieldRef<"SpouseRelationship", 'DateTime'>
    readonly isActive: FieldRef<"SpouseRelationship", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * SpouseRelationship findUnique
   */
  export type SpouseRelationshipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which SpouseRelationship to fetch.
     */
    where: SpouseRelationshipWhereUniqueInput
  }

  /**
   * SpouseRelationship findUniqueOrThrow
   */
  export type SpouseRelationshipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which SpouseRelationship to fetch.
     */
    where: SpouseRelationshipWhereUniqueInput
  }

  /**
   * SpouseRelationship findFirst
   */
  export type SpouseRelationshipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which SpouseRelationship to fetch.
     */
    where?: SpouseRelationshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpouseRelationships to fetch.
     */
    orderBy?: SpouseRelationshipOrderByWithRelationInput | SpouseRelationshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpouseRelationships.
     */
    cursor?: SpouseRelationshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpouseRelationships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpouseRelationships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpouseRelationships.
     */
    distinct?: SpouseRelationshipScalarFieldEnum | SpouseRelationshipScalarFieldEnum[]
  }

  /**
   * SpouseRelationship findFirstOrThrow
   */
  export type SpouseRelationshipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which SpouseRelationship to fetch.
     */
    where?: SpouseRelationshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpouseRelationships to fetch.
     */
    orderBy?: SpouseRelationshipOrderByWithRelationInput | SpouseRelationshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SpouseRelationships.
     */
    cursor?: SpouseRelationshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpouseRelationships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpouseRelationships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SpouseRelationships.
     */
    distinct?: SpouseRelationshipScalarFieldEnum | SpouseRelationshipScalarFieldEnum[]
  }

  /**
   * SpouseRelationship findMany
   */
  export type SpouseRelationshipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipInclude<ExtArgs> | null
    /**
     * Filter, which SpouseRelationships to fetch.
     */
    where?: SpouseRelationshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SpouseRelationships to fetch.
     */
    orderBy?: SpouseRelationshipOrderByWithRelationInput | SpouseRelationshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SpouseRelationships.
     */
    cursor?: SpouseRelationshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SpouseRelationships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SpouseRelationships.
     */
    skip?: number
    distinct?: SpouseRelationshipScalarFieldEnum | SpouseRelationshipScalarFieldEnum[]
  }

  /**
   * SpouseRelationship create
   */
  export type SpouseRelationshipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipInclude<ExtArgs> | null
    /**
     * The data needed to create a SpouseRelationship.
     */
    data: XOR<SpouseRelationshipCreateInput, SpouseRelationshipUncheckedCreateInput>
  }

  /**
   * SpouseRelationship createMany
   */
  export type SpouseRelationshipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SpouseRelationships.
     */
    data: SpouseRelationshipCreateManyInput | SpouseRelationshipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SpouseRelationship createManyAndReturn
   */
  export type SpouseRelationshipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * The data used to create many SpouseRelationships.
     */
    data: SpouseRelationshipCreateManyInput | SpouseRelationshipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SpouseRelationship update
   */
  export type SpouseRelationshipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipInclude<ExtArgs> | null
    /**
     * The data needed to update a SpouseRelationship.
     */
    data: XOR<SpouseRelationshipUpdateInput, SpouseRelationshipUncheckedUpdateInput>
    /**
     * Choose, which SpouseRelationship to update.
     */
    where: SpouseRelationshipWhereUniqueInput
  }

  /**
   * SpouseRelationship updateMany
   */
  export type SpouseRelationshipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SpouseRelationships.
     */
    data: XOR<SpouseRelationshipUpdateManyMutationInput, SpouseRelationshipUncheckedUpdateManyInput>
    /**
     * Filter which SpouseRelationships to update
     */
    where?: SpouseRelationshipWhereInput
    /**
     * Limit how many SpouseRelationships to update.
     */
    limit?: number
  }

  /**
   * SpouseRelationship updateManyAndReturn
   */
  export type SpouseRelationshipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * The data used to update SpouseRelationships.
     */
    data: XOR<SpouseRelationshipUpdateManyMutationInput, SpouseRelationshipUncheckedUpdateManyInput>
    /**
     * Filter which SpouseRelationships to update
     */
    where?: SpouseRelationshipWhereInput
    /**
     * Limit how many SpouseRelationships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SpouseRelationship upsert
   */
  export type SpouseRelationshipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipInclude<ExtArgs> | null
    /**
     * The filter to search for the SpouseRelationship to update in case it exists.
     */
    where: SpouseRelationshipWhereUniqueInput
    /**
     * In case the SpouseRelationship found by the `where` argument doesn't exist, create a new SpouseRelationship with this data.
     */
    create: XOR<SpouseRelationshipCreateInput, SpouseRelationshipUncheckedCreateInput>
    /**
     * In case the SpouseRelationship was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SpouseRelationshipUpdateInput, SpouseRelationshipUncheckedUpdateInput>
  }

  /**
   * SpouseRelationship delete
   */
  export type SpouseRelationshipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipInclude<ExtArgs> | null
    /**
     * Filter which SpouseRelationship to delete.
     */
    where: SpouseRelationshipWhereUniqueInput
  }

  /**
   * SpouseRelationship deleteMany
   */
  export type SpouseRelationshipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SpouseRelationships to delete
     */
    where?: SpouseRelationshipWhereInput
    /**
     * Limit how many SpouseRelationships to delete.
     */
    limit?: number
  }

  /**
   * SpouseRelationship without action
   */
  export type SpouseRelationshipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SpouseRelationship
     */
    select?: SpouseRelationshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SpouseRelationship
     */
    omit?: SpouseRelationshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SpouseRelationshipInclude<ExtArgs> | null
  }


  /**
   * Model ChangeRequest
   */

  export type AggregateChangeRequest = {
    _count: ChangeRequestCountAggregateOutputType | null
    _avg: ChangeRequestAvgAggregateOutputType | null
    _sum: ChangeRequestSumAggregateOutputType | null
    _min: ChangeRequestMinAggregateOutputType | null
    _max: ChangeRequestMaxAggregateOutputType | null
  }

  export type ChangeRequestAvgAggregateOutputType = {
    id: number | null
  }

  export type ChangeRequestSumAggregateOutputType = {
    id: number | null
  }

  export type ChangeRequestMinAggregateOutputType = {
    id: number | null
    action: $Enums.ChangeRequestAction | null
    status: $Enums.ChangeRequestStatus | null
    targetModel: $Enums.ChangeRequestTargetModel | null
    targetId: string | null
    requesterId: string | null
    requesterName: string | null
    requesterPhone: string | null
    createdAt: Date | null
  }

  export type ChangeRequestMaxAggregateOutputType = {
    id: number | null
    action: $Enums.ChangeRequestAction | null
    status: $Enums.ChangeRequestStatus | null
    targetModel: $Enums.ChangeRequestTargetModel | null
    targetId: string | null
    requesterId: string | null
    requesterName: string | null
    requesterPhone: string | null
    createdAt: Date | null
  }

  export type ChangeRequestCountAggregateOutputType = {
    id: number
    action: number
    status: number
    targetModel: number
    targetId: number
    data: number
    requesterId: number
    requesterName: number
    requesterPhone: number
    createdAt: number
    _all: number
  }


  export type ChangeRequestAvgAggregateInputType = {
    id?: true
  }

  export type ChangeRequestSumAggregateInputType = {
    id?: true
  }

  export type ChangeRequestMinAggregateInputType = {
    id?: true
    action?: true
    status?: true
    targetModel?: true
    targetId?: true
    requesterId?: true
    requesterName?: true
    requesterPhone?: true
    createdAt?: true
  }

  export type ChangeRequestMaxAggregateInputType = {
    id?: true
    action?: true
    status?: true
    targetModel?: true
    targetId?: true
    requesterId?: true
    requesterName?: true
    requesterPhone?: true
    createdAt?: true
  }

  export type ChangeRequestCountAggregateInputType = {
    id?: true
    action?: true
    status?: true
    targetModel?: true
    targetId?: true
    data?: true
    requesterId?: true
    requesterName?: true
    requesterPhone?: true
    createdAt?: true
    _all?: true
  }

  export type ChangeRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChangeRequest to aggregate.
     */
    where?: ChangeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChangeRequests to fetch.
     */
    orderBy?: ChangeRequestOrderByWithRelationInput | ChangeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChangeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChangeRequests
    **/
    _count?: true | ChangeRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChangeRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChangeRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChangeRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChangeRequestMaxAggregateInputType
  }

  export type GetChangeRequestAggregateType<T extends ChangeRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateChangeRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChangeRequest[P]>
      : GetScalarType<T[P], AggregateChangeRequest[P]>
  }




  export type ChangeRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChangeRequestWhereInput
    orderBy?: ChangeRequestOrderByWithAggregationInput | ChangeRequestOrderByWithAggregationInput[]
    by: ChangeRequestScalarFieldEnum[] | ChangeRequestScalarFieldEnum
    having?: ChangeRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChangeRequestCountAggregateInputType | true
    _avg?: ChangeRequestAvgAggregateInputType
    _sum?: ChangeRequestSumAggregateInputType
    _min?: ChangeRequestMinAggregateInputType
    _max?: ChangeRequestMaxAggregateInputType
  }

  export type ChangeRequestGroupByOutputType = {
    id: number
    action: $Enums.ChangeRequestAction
    status: $Enums.ChangeRequestStatus
    targetModel: $Enums.ChangeRequestTargetModel
    targetId: string | null
    data: JsonValue | null
    requesterId: string | null
    requesterName: string | null
    requesterPhone: string | null
    createdAt: Date
    _count: ChangeRequestCountAggregateOutputType | null
    _avg: ChangeRequestAvgAggregateOutputType | null
    _sum: ChangeRequestSumAggregateOutputType | null
    _min: ChangeRequestMinAggregateOutputType | null
    _max: ChangeRequestMaxAggregateOutputType | null
  }

  type GetChangeRequestGroupByPayload<T extends ChangeRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChangeRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChangeRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChangeRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ChangeRequestGroupByOutputType[P]>
        }
      >
    >


  export type ChangeRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    status?: boolean
    targetModel?: boolean
    targetId?: boolean
    data?: boolean
    requesterId?: boolean
    requesterName?: boolean
    requesterPhone?: boolean
    createdAt?: boolean
    requester?: boolean | ChangeRequest$requesterArgs<ExtArgs>
  }, ExtArgs["result"]["changeRequest"]>

  export type ChangeRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    status?: boolean
    targetModel?: boolean
    targetId?: boolean
    data?: boolean
    requesterId?: boolean
    requesterName?: boolean
    requesterPhone?: boolean
    createdAt?: boolean
    requester?: boolean | ChangeRequest$requesterArgs<ExtArgs>
  }, ExtArgs["result"]["changeRequest"]>

  export type ChangeRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    status?: boolean
    targetModel?: boolean
    targetId?: boolean
    data?: boolean
    requesterId?: boolean
    requesterName?: boolean
    requesterPhone?: boolean
    createdAt?: boolean
    requester?: boolean | ChangeRequest$requesterArgs<ExtArgs>
  }, ExtArgs["result"]["changeRequest"]>

  export type ChangeRequestSelectScalar = {
    id?: boolean
    action?: boolean
    status?: boolean
    targetModel?: boolean
    targetId?: boolean
    data?: boolean
    requesterId?: boolean
    requesterName?: boolean
    requesterPhone?: boolean
    createdAt?: boolean
  }

  export type ChangeRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "status" | "targetModel" | "targetId" | "data" | "requesterId" | "requesterName" | "requesterPhone" | "createdAt", ExtArgs["result"]["changeRequest"]>
  export type ChangeRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | ChangeRequest$requesterArgs<ExtArgs>
  }
  export type ChangeRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | ChangeRequest$requesterArgs<ExtArgs>
  }
  export type ChangeRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requester?: boolean | ChangeRequest$requesterArgs<ExtArgs>
  }

  export type $ChangeRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChangeRequest"
    objects: {
      requester: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      action: $Enums.ChangeRequestAction
      status: $Enums.ChangeRequestStatus
      targetModel: $Enums.ChangeRequestTargetModel
      targetId: string | null
      data: Prisma.JsonValue | null
      requesterId: string | null
      requesterName: string | null
      requesterPhone: string | null
      createdAt: Date
    }, ExtArgs["result"]["changeRequest"]>
    composites: {}
  }

  type ChangeRequestGetPayload<S extends boolean | null | undefined | ChangeRequestDefaultArgs> = $Result.GetResult<Prisma.$ChangeRequestPayload, S>

  type ChangeRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChangeRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChangeRequestCountAggregateInputType | true
    }

  export interface ChangeRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChangeRequest'], meta: { name: 'ChangeRequest' } }
    /**
     * Find zero or one ChangeRequest that matches the filter.
     * @param {ChangeRequestFindUniqueArgs} args - Arguments to find a ChangeRequest
     * @example
     * // Get one ChangeRequest
     * const changeRequest = await prisma.changeRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChangeRequestFindUniqueArgs>(args: SelectSubset<T, ChangeRequestFindUniqueArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChangeRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChangeRequestFindUniqueOrThrowArgs} args - Arguments to find a ChangeRequest
     * @example
     * // Get one ChangeRequest
     * const changeRequest = await prisma.changeRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChangeRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ChangeRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChangeRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestFindFirstArgs} args - Arguments to find a ChangeRequest
     * @example
     * // Get one ChangeRequest
     * const changeRequest = await prisma.changeRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChangeRequestFindFirstArgs>(args?: SelectSubset<T, ChangeRequestFindFirstArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChangeRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestFindFirstOrThrowArgs} args - Arguments to find a ChangeRequest
     * @example
     * // Get one ChangeRequest
     * const changeRequest = await prisma.changeRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChangeRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ChangeRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChangeRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChangeRequests
     * const changeRequests = await prisma.changeRequest.findMany()
     * 
     * // Get first 10 ChangeRequests
     * const changeRequests = await prisma.changeRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const changeRequestWithIdOnly = await prisma.changeRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChangeRequestFindManyArgs>(args?: SelectSubset<T, ChangeRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChangeRequest.
     * @param {ChangeRequestCreateArgs} args - Arguments to create a ChangeRequest.
     * @example
     * // Create one ChangeRequest
     * const ChangeRequest = await prisma.changeRequest.create({
     *   data: {
     *     // ... data to create a ChangeRequest
     *   }
     * })
     * 
     */
    create<T extends ChangeRequestCreateArgs>(args: SelectSubset<T, ChangeRequestCreateArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChangeRequests.
     * @param {ChangeRequestCreateManyArgs} args - Arguments to create many ChangeRequests.
     * @example
     * // Create many ChangeRequests
     * const changeRequest = await prisma.changeRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChangeRequestCreateManyArgs>(args?: SelectSubset<T, ChangeRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChangeRequests and returns the data saved in the database.
     * @param {ChangeRequestCreateManyAndReturnArgs} args - Arguments to create many ChangeRequests.
     * @example
     * // Create many ChangeRequests
     * const changeRequest = await prisma.changeRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChangeRequests and only return the `id`
     * const changeRequestWithIdOnly = await prisma.changeRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChangeRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ChangeRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChangeRequest.
     * @param {ChangeRequestDeleteArgs} args - Arguments to delete one ChangeRequest.
     * @example
     * // Delete one ChangeRequest
     * const ChangeRequest = await prisma.changeRequest.delete({
     *   where: {
     *     // ... filter to delete one ChangeRequest
     *   }
     * })
     * 
     */
    delete<T extends ChangeRequestDeleteArgs>(args: SelectSubset<T, ChangeRequestDeleteArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChangeRequest.
     * @param {ChangeRequestUpdateArgs} args - Arguments to update one ChangeRequest.
     * @example
     * // Update one ChangeRequest
     * const changeRequest = await prisma.changeRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChangeRequestUpdateArgs>(args: SelectSubset<T, ChangeRequestUpdateArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChangeRequests.
     * @param {ChangeRequestDeleteManyArgs} args - Arguments to filter ChangeRequests to delete.
     * @example
     * // Delete a few ChangeRequests
     * const { count } = await prisma.changeRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChangeRequestDeleteManyArgs>(args?: SelectSubset<T, ChangeRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChangeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChangeRequests
     * const changeRequest = await prisma.changeRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChangeRequestUpdateManyArgs>(args: SelectSubset<T, ChangeRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChangeRequests and returns the data updated in the database.
     * @param {ChangeRequestUpdateManyAndReturnArgs} args - Arguments to update many ChangeRequests.
     * @example
     * // Update many ChangeRequests
     * const changeRequest = await prisma.changeRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChangeRequests and only return the `id`
     * const changeRequestWithIdOnly = await prisma.changeRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChangeRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ChangeRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChangeRequest.
     * @param {ChangeRequestUpsertArgs} args - Arguments to update or create a ChangeRequest.
     * @example
     * // Update or create a ChangeRequest
     * const changeRequest = await prisma.changeRequest.upsert({
     *   create: {
     *     // ... data to create a ChangeRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChangeRequest we want to update
     *   }
     * })
     */
    upsert<T extends ChangeRequestUpsertArgs>(args: SelectSubset<T, ChangeRequestUpsertArgs<ExtArgs>>): Prisma__ChangeRequestClient<$Result.GetResult<Prisma.$ChangeRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChangeRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestCountArgs} args - Arguments to filter ChangeRequests to count.
     * @example
     * // Count the number of ChangeRequests
     * const count = await prisma.changeRequest.count({
     *   where: {
     *     // ... the filter for the ChangeRequests we want to count
     *   }
     * })
    **/
    count<T extends ChangeRequestCountArgs>(
      args?: Subset<T, ChangeRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChangeRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChangeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChangeRequestAggregateArgs>(args: Subset<T, ChangeRequestAggregateArgs>): Prisma.PrismaPromise<GetChangeRequestAggregateType<T>>

    /**
     * Group by ChangeRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChangeRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChangeRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChangeRequestGroupByArgs['orderBy'] }
        : { orderBy?: ChangeRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChangeRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChangeRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChangeRequest model
   */
  readonly fields: ChangeRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChangeRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChangeRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requester<T extends ChangeRequest$requesterArgs<ExtArgs> = {}>(args?: Subset<T, ChangeRequest$requesterArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ChangeRequest model
   */
  interface ChangeRequestFieldRefs {
    readonly id: FieldRef<"ChangeRequest", 'Int'>
    readonly action: FieldRef<"ChangeRequest", 'ChangeRequestAction'>
    readonly status: FieldRef<"ChangeRequest", 'ChangeRequestStatus'>
    readonly targetModel: FieldRef<"ChangeRequest", 'ChangeRequestTargetModel'>
    readonly targetId: FieldRef<"ChangeRequest", 'String'>
    readonly data: FieldRef<"ChangeRequest", 'Json'>
    readonly requesterId: FieldRef<"ChangeRequest", 'String'>
    readonly requesterName: FieldRef<"ChangeRequest", 'String'>
    readonly requesterPhone: FieldRef<"ChangeRequest", 'String'>
    readonly createdAt: FieldRef<"ChangeRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ChangeRequest findUnique
   */
  export type ChangeRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ChangeRequest to fetch.
     */
    where: ChangeRequestWhereUniqueInput
  }

  /**
   * ChangeRequest findUniqueOrThrow
   */
  export type ChangeRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ChangeRequest to fetch.
     */
    where: ChangeRequestWhereUniqueInput
  }

  /**
   * ChangeRequest findFirst
   */
  export type ChangeRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ChangeRequest to fetch.
     */
    where?: ChangeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChangeRequests to fetch.
     */
    orderBy?: ChangeRequestOrderByWithRelationInput | ChangeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChangeRequests.
     */
    cursor?: ChangeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChangeRequests.
     */
    distinct?: ChangeRequestScalarFieldEnum | ChangeRequestScalarFieldEnum[]
  }

  /**
   * ChangeRequest findFirstOrThrow
   */
  export type ChangeRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ChangeRequest to fetch.
     */
    where?: ChangeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChangeRequests to fetch.
     */
    orderBy?: ChangeRequestOrderByWithRelationInput | ChangeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChangeRequests.
     */
    cursor?: ChangeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangeRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChangeRequests.
     */
    distinct?: ChangeRequestScalarFieldEnum | ChangeRequestScalarFieldEnum[]
  }

  /**
   * ChangeRequest findMany
   */
  export type ChangeRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * Filter, which ChangeRequests to fetch.
     */
    where?: ChangeRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChangeRequests to fetch.
     */
    orderBy?: ChangeRequestOrderByWithRelationInput | ChangeRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChangeRequests.
     */
    cursor?: ChangeRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChangeRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChangeRequests.
     */
    skip?: number
    distinct?: ChangeRequestScalarFieldEnum | ChangeRequestScalarFieldEnum[]
  }

  /**
   * ChangeRequest create
   */
  export type ChangeRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ChangeRequest.
     */
    data: XOR<ChangeRequestCreateInput, ChangeRequestUncheckedCreateInput>
  }

  /**
   * ChangeRequest createMany
   */
  export type ChangeRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChangeRequests.
     */
    data: ChangeRequestCreateManyInput | ChangeRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChangeRequest createManyAndReturn
   */
  export type ChangeRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ChangeRequests.
     */
    data: ChangeRequestCreateManyInput | ChangeRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChangeRequest update
   */
  export type ChangeRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ChangeRequest.
     */
    data: XOR<ChangeRequestUpdateInput, ChangeRequestUncheckedUpdateInput>
    /**
     * Choose, which ChangeRequest to update.
     */
    where: ChangeRequestWhereUniqueInput
  }

  /**
   * ChangeRequest updateMany
   */
  export type ChangeRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChangeRequests.
     */
    data: XOR<ChangeRequestUpdateManyMutationInput, ChangeRequestUncheckedUpdateManyInput>
    /**
     * Filter which ChangeRequests to update
     */
    where?: ChangeRequestWhereInput
    /**
     * Limit how many ChangeRequests to update.
     */
    limit?: number
  }

  /**
   * ChangeRequest updateManyAndReturn
   */
  export type ChangeRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * The data used to update ChangeRequests.
     */
    data: XOR<ChangeRequestUpdateManyMutationInput, ChangeRequestUncheckedUpdateManyInput>
    /**
     * Filter which ChangeRequests to update
     */
    where?: ChangeRequestWhereInput
    /**
     * Limit how many ChangeRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChangeRequest upsert
   */
  export type ChangeRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ChangeRequest to update in case it exists.
     */
    where: ChangeRequestWhereUniqueInput
    /**
     * In case the ChangeRequest found by the `where` argument doesn't exist, create a new ChangeRequest with this data.
     */
    create: XOR<ChangeRequestCreateInput, ChangeRequestUncheckedCreateInput>
    /**
     * In case the ChangeRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChangeRequestUpdateInput, ChangeRequestUncheckedUpdateInput>
  }

  /**
   * ChangeRequest delete
   */
  export type ChangeRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
    /**
     * Filter which ChangeRequest to delete.
     */
    where: ChangeRequestWhereUniqueInput
  }

  /**
   * ChangeRequest deleteMany
   */
  export type ChangeRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChangeRequests to delete
     */
    where?: ChangeRequestWhereInput
    /**
     * Limit how many ChangeRequests to delete.
     */
    limit?: number
  }

  /**
   * ChangeRequest.requester
   */
  export type ChangeRequest$requesterArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ChangeRequest without action
   */
  export type ChangeRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChangeRequest
     */
    select?: ChangeRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChangeRequest
     */
    omit?: ChangeRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChangeRequestInclude<ExtArgs> | null
  }


  /**
   * Model Family
   */

  export type AggregateFamily = {
    _count: FamilyCountAggregateOutputType | null
    _avg: FamilyAvgAggregateOutputType | null
    _sum: FamilySumAggregateOutputType | null
    _min: FamilyMinAggregateOutputType | null
    _max: FamilyMaxAggregateOutputType | null
  }

  export type FamilyAvgAggregateOutputType = {
    id: number | null
    rootPersonId: number | null
  }

  export type FamilySumAggregateOutputType = {
    id: number | null
    rootPersonId: number | null
  }

  export type FamilyMinAggregateOutputType = {
    id: number | null
    name: string | null
    rootPersonId: number | null
  }

  export type FamilyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    rootPersonId: number | null
  }

  export type FamilyCountAggregateOutputType = {
    id: number
    name: number
    rootPersonId: number
    _all: number
  }


  export type FamilyAvgAggregateInputType = {
    id?: true
    rootPersonId?: true
  }

  export type FamilySumAggregateInputType = {
    id?: true
    rootPersonId?: true
  }

  export type FamilyMinAggregateInputType = {
    id?: true
    name?: true
    rootPersonId?: true
  }

  export type FamilyMaxAggregateInputType = {
    id?: true
    name?: true
    rootPersonId?: true
  }

  export type FamilyCountAggregateInputType = {
    id?: true
    name?: true
    rootPersonId?: true
    _all?: true
  }

  export type FamilyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Family to aggregate.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Families
    **/
    _count?: true | FamilyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FamilyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FamilySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FamilyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FamilyMaxAggregateInputType
  }

  export type GetFamilyAggregateType<T extends FamilyAggregateArgs> = {
        [P in keyof T & keyof AggregateFamily]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFamily[P]>
      : GetScalarType<T[P], AggregateFamily[P]>
  }




  export type FamilyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FamilyWhereInput
    orderBy?: FamilyOrderByWithAggregationInput | FamilyOrderByWithAggregationInput[]
    by: FamilyScalarFieldEnum[] | FamilyScalarFieldEnum
    having?: FamilyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FamilyCountAggregateInputType | true
    _avg?: FamilyAvgAggregateInputType
    _sum?: FamilySumAggregateInputType
    _min?: FamilyMinAggregateInputType
    _max?: FamilyMaxAggregateInputType
  }

  export type FamilyGroupByOutputType = {
    id: number
    name: string
    rootPersonId: number | null
    _count: FamilyCountAggregateOutputType | null
    _avg: FamilyAvgAggregateOutputType | null
    _sum: FamilySumAggregateOutputType | null
    _min: FamilyMinAggregateOutputType | null
    _max: FamilyMaxAggregateOutputType | null
  }

  type GetFamilyGroupByPayload<T extends FamilyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FamilyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FamilyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FamilyGroupByOutputType[P]>
            : GetScalarType<T[P], FamilyGroupByOutputType[P]>
        }
      >
    >


  export type FamilySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rootPersonId?: boolean
    rootPerson?: boolean | Family$rootPersonArgs<ExtArgs>
    members?: boolean | Family$membersArgs<ExtArgs>
    _count?: boolean | FamilyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["family"]>

  export type FamilySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rootPersonId?: boolean
    rootPerson?: boolean | Family$rootPersonArgs<ExtArgs>
  }, ExtArgs["result"]["family"]>

  export type FamilySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    rootPersonId?: boolean
    rootPerson?: boolean | Family$rootPersonArgs<ExtArgs>
  }, ExtArgs["result"]["family"]>

  export type FamilySelectScalar = {
    id?: boolean
    name?: boolean
    rootPersonId?: boolean
  }

  export type FamilyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "rootPersonId", ExtArgs["result"]["family"]>
  export type FamilyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rootPerson?: boolean | Family$rootPersonArgs<ExtArgs>
    members?: boolean | Family$membersArgs<ExtArgs>
    _count?: boolean | FamilyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FamilyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rootPerson?: boolean | Family$rootPersonArgs<ExtArgs>
  }
  export type FamilyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rootPerson?: boolean | Family$rootPersonArgs<ExtArgs>
  }

  export type $FamilyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Family"
    objects: {
      rootPerson: Prisma.$PersonPayload<ExtArgs> | null
      members: Prisma.$PersonPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      rootPersonId: number | null
    }, ExtArgs["result"]["family"]>
    composites: {}
  }

  type FamilyGetPayload<S extends boolean | null | undefined | FamilyDefaultArgs> = $Result.GetResult<Prisma.$FamilyPayload, S>

  type FamilyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FamilyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FamilyCountAggregateInputType | true
    }

  export interface FamilyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Family'], meta: { name: 'Family' } }
    /**
     * Find zero or one Family that matches the filter.
     * @param {FamilyFindUniqueArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FamilyFindUniqueArgs>(args: SelectSubset<T, FamilyFindUniqueArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Family that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FamilyFindUniqueOrThrowArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FamilyFindUniqueOrThrowArgs>(args: SelectSubset<T, FamilyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Family that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyFindFirstArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FamilyFindFirstArgs>(args?: SelectSubset<T, FamilyFindFirstArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Family that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyFindFirstOrThrowArgs} args - Arguments to find a Family
     * @example
     * // Get one Family
     * const family = await prisma.family.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FamilyFindFirstOrThrowArgs>(args?: SelectSubset<T, FamilyFindFirstOrThrowArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Families that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Families
     * const families = await prisma.family.findMany()
     * 
     * // Get first 10 Families
     * const families = await prisma.family.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const familyWithIdOnly = await prisma.family.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FamilyFindManyArgs>(args?: SelectSubset<T, FamilyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Family.
     * @param {FamilyCreateArgs} args - Arguments to create a Family.
     * @example
     * // Create one Family
     * const Family = await prisma.family.create({
     *   data: {
     *     // ... data to create a Family
     *   }
     * })
     * 
     */
    create<T extends FamilyCreateArgs>(args: SelectSubset<T, FamilyCreateArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Families.
     * @param {FamilyCreateManyArgs} args - Arguments to create many Families.
     * @example
     * // Create many Families
     * const family = await prisma.family.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FamilyCreateManyArgs>(args?: SelectSubset<T, FamilyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Families and returns the data saved in the database.
     * @param {FamilyCreateManyAndReturnArgs} args - Arguments to create many Families.
     * @example
     * // Create many Families
     * const family = await prisma.family.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Families and only return the `id`
     * const familyWithIdOnly = await prisma.family.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FamilyCreateManyAndReturnArgs>(args?: SelectSubset<T, FamilyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Family.
     * @param {FamilyDeleteArgs} args - Arguments to delete one Family.
     * @example
     * // Delete one Family
     * const Family = await prisma.family.delete({
     *   where: {
     *     // ... filter to delete one Family
     *   }
     * })
     * 
     */
    delete<T extends FamilyDeleteArgs>(args: SelectSubset<T, FamilyDeleteArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Family.
     * @param {FamilyUpdateArgs} args - Arguments to update one Family.
     * @example
     * // Update one Family
     * const family = await prisma.family.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FamilyUpdateArgs>(args: SelectSubset<T, FamilyUpdateArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Families.
     * @param {FamilyDeleteManyArgs} args - Arguments to filter Families to delete.
     * @example
     * // Delete a few Families
     * const { count } = await prisma.family.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FamilyDeleteManyArgs>(args?: SelectSubset<T, FamilyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Families.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Families
     * const family = await prisma.family.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FamilyUpdateManyArgs>(args: SelectSubset<T, FamilyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Families and returns the data updated in the database.
     * @param {FamilyUpdateManyAndReturnArgs} args - Arguments to update many Families.
     * @example
     * // Update many Families
     * const family = await prisma.family.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Families and only return the `id`
     * const familyWithIdOnly = await prisma.family.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FamilyUpdateManyAndReturnArgs>(args: SelectSubset<T, FamilyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Family.
     * @param {FamilyUpsertArgs} args - Arguments to update or create a Family.
     * @example
     * // Update or create a Family
     * const family = await prisma.family.upsert({
     *   create: {
     *     // ... data to create a Family
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Family we want to update
     *   }
     * })
     */
    upsert<T extends FamilyUpsertArgs>(args: SelectSubset<T, FamilyUpsertArgs<ExtArgs>>): Prisma__FamilyClient<$Result.GetResult<Prisma.$FamilyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Families.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyCountArgs} args - Arguments to filter Families to count.
     * @example
     * // Count the number of Families
     * const count = await prisma.family.count({
     *   where: {
     *     // ... the filter for the Families we want to count
     *   }
     * })
    **/
    count<T extends FamilyCountArgs>(
      args?: Subset<T, FamilyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FamilyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Family.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FamilyAggregateArgs>(args: Subset<T, FamilyAggregateArgs>): Prisma.PrismaPromise<GetFamilyAggregateType<T>>

    /**
     * Group by Family.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FamilyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FamilyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FamilyGroupByArgs['orderBy'] }
        : { orderBy?: FamilyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FamilyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFamilyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Family model
   */
  readonly fields: FamilyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Family.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FamilyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rootPerson<T extends Family$rootPersonArgs<ExtArgs> = {}>(args?: Subset<T, Family$rootPersonArgs<ExtArgs>>): Prisma__PersonClient<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    members<T extends Family$membersArgs<ExtArgs> = {}>(args?: Subset<T, Family$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PersonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Family model
   */
  interface FamilyFieldRefs {
    readonly id: FieldRef<"Family", 'Int'>
    readonly name: FieldRef<"Family", 'String'>
    readonly rootPersonId: FieldRef<"Family", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Family findUnique
   */
  export type FamilyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family findUniqueOrThrow
   */
  export type FamilyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family findFirst
   */
  export type FamilyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Families.
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Families.
     */
    distinct?: FamilyScalarFieldEnum | FamilyScalarFieldEnum[]
  }

  /**
   * Family findFirstOrThrow
   */
  export type FamilyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Family to fetch.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Families.
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Families.
     */
    distinct?: FamilyScalarFieldEnum | FamilyScalarFieldEnum[]
  }

  /**
   * Family findMany
   */
  export type FamilyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter, which Families to fetch.
     */
    where?: FamilyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Families to fetch.
     */
    orderBy?: FamilyOrderByWithRelationInput | FamilyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Families.
     */
    cursor?: FamilyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Families from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Families.
     */
    skip?: number
    distinct?: FamilyScalarFieldEnum | FamilyScalarFieldEnum[]
  }

  /**
   * Family create
   */
  export type FamilyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * The data needed to create a Family.
     */
    data: XOR<FamilyCreateInput, FamilyUncheckedCreateInput>
  }

  /**
   * Family createMany
   */
  export type FamilyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Families.
     */
    data: FamilyCreateManyInput | FamilyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Family createManyAndReturn
   */
  export type FamilyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * The data used to create many Families.
     */
    data: FamilyCreateManyInput | FamilyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Family update
   */
  export type FamilyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * The data needed to update a Family.
     */
    data: XOR<FamilyUpdateInput, FamilyUncheckedUpdateInput>
    /**
     * Choose, which Family to update.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family updateMany
   */
  export type FamilyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Families.
     */
    data: XOR<FamilyUpdateManyMutationInput, FamilyUncheckedUpdateManyInput>
    /**
     * Filter which Families to update
     */
    where?: FamilyWhereInput
    /**
     * Limit how many Families to update.
     */
    limit?: number
  }

  /**
   * Family updateManyAndReturn
   */
  export type FamilyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * The data used to update Families.
     */
    data: XOR<FamilyUpdateManyMutationInput, FamilyUncheckedUpdateManyInput>
    /**
     * Filter which Families to update
     */
    where?: FamilyWhereInput
    /**
     * Limit how many Families to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Family upsert
   */
  export type FamilyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * The filter to search for the Family to update in case it exists.
     */
    where: FamilyWhereUniqueInput
    /**
     * In case the Family found by the `where` argument doesn't exist, create a new Family with this data.
     */
    create: XOR<FamilyCreateInput, FamilyUncheckedCreateInput>
    /**
     * In case the Family was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FamilyUpdateInput, FamilyUncheckedUpdateInput>
  }

  /**
   * Family delete
   */
  export type FamilyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
    /**
     * Filter which Family to delete.
     */
    where: FamilyWhereUniqueInput
  }

  /**
   * Family deleteMany
   */
  export type FamilyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Families to delete
     */
    where?: FamilyWhereInput
    /**
     * Limit how many Families to delete.
     */
    limit?: number
  }

  /**
   * Family.rootPerson
   */
  export type Family$rootPersonArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
  }

  /**
   * Family.members
   */
  export type Family$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Person
     */
    select?: PersonSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Person
     */
    omit?: PersonOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PersonInclude<ExtArgs> | null
    where?: PersonWhereInput
    orderBy?: PersonOrderByWithRelationInput | PersonOrderByWithRelationInput[]
    cursor?: PersonWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PersonScalarFieldEnum | PersonScalarFieldEnum[]
  }

  /**
   * Family without action
   */
  export type FamilyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Family
     */
    select?: FamilySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Family
     */
    omit?: FamilyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FamilyInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    phone: 'phone',
    password: 'password',
    role: 'role',
    name: 'name'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PersonScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    gender: 'gender',
    birthDate: 'birthDate',
    deathDate: 'deathDate',
    phone: 'phone',
    familyId: 'familyId',
    fatherId: 'fatherId',
    motherId: 'motherId'
  };

  export type PersonScalarFieldEnum = (typeof PersonScalarFieldEnum)[keyof typeof PersonScalarFieldEnum]


  export const SpouseRelationshipScalarFieldEnum: {
    id: 'id',
    personId: 'personId',
    spouseId: 'spouseId',
    startDate: 'startDate',
    endDate: 'endDate',
    isActive: 'isActive'
  };

  export type SpouseRelationshipScalarFieldEnum = (typeof SpouseRelationshipScalarFieldEnum)[keyof typeof SpouseRelationshipScalarFieldEnum]


  export const ChangeRequestScalarFieldEnum: {
    id: 'id',
    action: 'action',
    status: 'status',
    targetModel: 'targetModel',
    targetId: 'targetId',
    data: 'data',
    requesterId: 'requesterId',
    requesterName: 'requesterName',
    requesterPhone: 'requesterPhone',
    createdAt: 'createdAt'
  };

  export type ChangeRequestScalarFieldEnum = (typeof ChangeRequestScalarFieldEnum)[keyof typeof ChangeRequestScalarFieldEnum]


  export const FamilyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    rootPersonId: 'rootPersonId'
  };

  export type FamilyScalarFieldEnum = (typeof FamilyScalarFieldEnum)[keyof typeof FamilyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Gender[]'
   */
  export type ListEnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ChangeRequestAction'
   */
  export type EnumChangeRequestActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChangeRequestAction'>
    


  /**
   * Reference to a field of type 'ChangeRequestAction[]'
   */
  export type ListEnumChangeRequestActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChangeRequestAction[]'>
    


  /**
   * Reference to a field of type 'ChangeRequestStatus'
   */
  export type EnumChangeRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChangeRequestStatus'>
    


  /**
   * Reference to a field of type 'ChangeRequestStatus[]'
   */
  export type ListEnumChangeRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChangeRequestStatus[]'>
    


  /**
   * Reference to a field of type 'ChangeRequestTargetModel'
   */
  export type EnumChangeRequestTargetModelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChangeRequestTargetModel'>
    


  /**
   * Reference to a field of type 'ChangeRequestTargetModel[]'
   */
  export type ListEnumChangeRequestTargetModelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChangeRequestTargetModel[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    name?: StringNullableFilter<"User"> | string | null
    changeRequests?: ChangeRequestListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrderInput | SortOrder
    changeRequests?: ChangeRequestOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    name?: StringNullableFilter<"User"> | string | null
    changeRequests?: ChangeRequestListRelationFilter
  }, "id" | "email" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type PersonWhereInput = {
    AND?: PersonWhereInput | PersonWhereInput[]
    OR?: PersonWhereInput[]
    NOT?: PersonWhereInput | PersonWhereInput[]
    id?: IntFilter<"Person"> | number
    firstName?: StringFilter<"Person"> | string
    gender?: EnumGenderFilter<"Person"> | $Enums.Gender
    birthDate?: DateTimeNullableFilter<"Person"> | Date | string | null
    deathDate?: DateTimeNullableFilter<"Person"> | Date | string | null
    phone?: StringNullableFilter<"Person"> | string | null
    familyId?: IntFilter<"Person"> | number
    fatherId?: IntNullableFilter<"Person"> | number | null
    motherId?: IntNullableFilter<"Person"> | number | null
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
    father?: XOR<PersonNullableScalarRelationFilter, PersonWhereInput> | null
    mother?: XOR<PersonNullableScalarRelationFilter, PersonWhereInput> | null
    fatherChildren?: PersonListRelationFilter
    motherChildren?: PersonListRelationFilter
    spouseConnections?: SpouseRelationshipListRelationFilter
    spousedByConnections?: SpouseRelationshipListRelationFilter
    rootOfFamily?: XOR<FamilyNullableScalarRelationFilter, FamilyWhereInput> | null
  }

  export type PersonOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    deathDate?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    familyId?: SortOrder
    fatherId?: SortOrderInput | SortOrder
    motherId?: SortOrderInput | SortOrder
    family?: FamilyOrderByWithRelationInput
    father?: PersonOrderByWithRelationInput
    mother?: PersonOrderByWithRelationInput
    fatherChildren?: PersonOrderByRelationAggregateInput
    motherChildren?: PersonOrderByRelationAggregateInput
    spouseConnections?: SpouseRelationshipOrderByRelationAggregateInput
    spousedByConnections?: SpouseRelationshipOrderByRelationAggregateInput
    rootOfFamily?: FamilyOrderByWithRelationInput
  }

  export type PersonWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PersonWhereInput | PersonWhereInput[]
    OR?: PersonWhereInput[]
    NOT?: PersonWhereInput | PersonWhereInput[]
    firstName?: StringFilter<"Person"> | string
    gender?: EnumGenderFilter<"Person"> | $Enums.Gender
    birthDate?: DateTimeNullableFilter<"Person"> | Date | string | null
    deathDate?: DateTimeNullableFilter<"Person"> | Date | string | null
    phone?: StringNullableFilter<"Person"> | string | null
    familyId?: IntFilter<"Person"> | number
    fatherId?: IntNullableFilter<"Person"> | number | null
    motherId?: IntNullableFilter<"Person"> | number | null
    family?: XOR<FamilyScalarRelationFilter, FamilyWhereInput>
    father?: XOR<PersonNullableScalarRelationFilter, PersonWhereInput> | null
    mother?: XOR<PersonNullableScalarRelationFilter, PersonWhereInput> | null
    fatherChildren?: PersonListRelationFilter
    motherChildren?: PersonListRelationFilter
    spouseConnections?: SpouseRelationshipListRelationFilter
    spousedByConnections?: SpouseRelationshipListRelationFilter
    rootOfFamily?: XOR<FamilyNullableScalarRelationFilter, FamilyWhereInput> | null
  }, "id">

  export type PersonOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    deathDate?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    familyId?: SortOrder
    fatherId?: SortOrderInput | SortOrder
    motherId?: SortOrderInput | SortOrder
    _count?: PersonCountOrderByAggregateInput
    _avg?: PersonAvgOrderByAggregateInput
    _max?: PersonMaxOrderByAggregateInput
    _min?: PersonMinOrderByAggregateInput
    _sum?: PersonSumOrderByAggregateInput
  }

  export type PersonScalarWhereWithAggregatesInput = {
    AND?: PersonScalarWhereWithAggregatesInput | PersonScalarWhereWithAggregatesInput[]
    OR?: PersonScalarWhereWithAggregatesInput[]
    NOT?: PersonScalarWhereWithAggregatesInput | PersonScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Person"> | number
    firstName?: StringWithAggregatesFilter<"Person"> | string
    gender?: EnumGenderWithAggregatesFilter<"Person"> | $Enums.Gender
    birthDate?: DateTimeNullableWithAggregatesFilter<"Person"> | Date | string | null
    deathDate?: DateTimeNullableWithAggregatesFilter<"Person"> | Date | string | null
    phone?: StringNullableWithAggregatesFilter<"Person"> | string | null
    familyId?: IntWithAggregatesFilter<"Person"> | number
    fatherId?: IntNullableWithAggregatesFilter<"Person"> | number | null
    motherId?: IntNullableWithAggregatesFilter<"Person"> | number | null
  }

  export type SpouseRelationshipWhereInput = {
    AND?: SpouseRelationshipWhereInput | SpouseRelationshipWhereInput[]
    OR?: SpouseRelationshipWhereInput[]
    NOT?: SpouseRelationshipWhereInput | SpouseRelationshipWhereInput[]
    id?: IntFilter<"SpouseRelationship"> | number
    personId?: IntFilter<"SpouseRelationship"> | number
    spouseId?: IntFilter<"SpouseRelationship"> | number
    startDate?: DateTimeNullableFilter<"SpouseRelationship"> | Date | string | null
    endDate?: DateTimeNullableFilter<"SpouseRelationship"> | Date | string | null
    isActive?: BoolFilter<"SpouseRelationship"> | boolean
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
    spouse?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }

  export type SpouseRelationshipOrderByWithRelationInput = {
    id?: SortOrder
    personId?: SortOrder
    spouseId?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    person?: PersonOrderByWithRelationInput
    spouse?: PersonOrderByWithRelationInput
  }

  export type SpouseRelationshipWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    personId_spouseId?: SpouseRelationshipPersonIdSpouseIdCompoundUniqueInput
    AND?: SpouseRelationshipWhereInput | SpouseRelationshipWhereInput[]
    OR?: SpouseRelationshipWhereInput[]
    NOT?: SpouseRelationshipWhereInput | SpouseRelationshipWhereInput[]
    personId?: IntFilter<"SpouseRelationship"> | number
    spouseId?: IntFilter<"SpouseRelationship"> | number
    startDate?: DateTimeNullableFilter<"SpouseRelationship"> | Date | string | null
    endDate?: DateTimeNullableFilter<"SpouseRelationship"> | Date | string | null
    isActive?: BoolFilter<"SpouseRelationship"> | boolean
    person?: XOR<PersonScalarRelationFilter, PersonWhereInput>
    spouse?: XOR<PersonScalarRelationFilter, PersonWhereInput>
  }, "id" | "personId_spouseId">

  export type SpouseRelationshipOrderByWithAggregationInput = {
    id?: SortOrder
    personId?: SortOrder
    spouseId?: SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    isActive?: SortOrder
    _count?: SpouseRelationshipCountOrderByAggregateInput
    _avg?: SpouseRelationshipAvgOrderByAggregateInput
    _max?: SpouseRelationshipMaxOrderByAggregateInput
    _min?: SpouseRelationshipMinOrderByAggregateInput
    _sum?: SpouseRelationshipSumOrderByAggregateInput
  }

  export type SpouseRelationshipScalarWhereWithAggregatesInput = {
    AND?: SpouseRelationshipScalarWhereWithAggregatesInput | SpouseRelationshipScalarWhereWithAggregatesInput[]
    OR?: SpouseRelationshipScalarWhereWithAggregatesInput[]
    NOT?: SpouseRelationshipScalarWhereWithAggregatesInput | SpouseRelationshipScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SpouseRelationship"> | number
    personId?: IntWithAggregatesFilter<"SpouseRelationship"> | number
    spouseId?: IntWithAggregatesFilter<"SpouseRelationship"> | number
    startDate?: DateTimeNullableWithAggregatesFilter<"SpouseRelationship"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"SpouseRelationship"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"SpouseRelationship"> | boolean
  }

  export type ChangeRequestWhereInput = {
    AND?: ChangeRequestWhereInput | ChangeRequestWhereInput[]
    OR?: ChangeRequestWhereInput[]
    NOT?: ChangeRequestWhereInput | ChangeRequestWhereInput[]
    id?: IntFilter<"ChangeRequest"> | number
    action?: EnumChangeRequestActionFilter<"ChangeRequest"> | $Enums.ChangeRequestAction
    status?: EnumChangeRequestStatusFilter<"ChangeRequest"> | $Enums.ChangeRequestStatus
    targetModel?: EnumChangeRequestTargetModelFilter<"ChangeRequest"> | $Enums.ChangeRequestTargetModel
    targetId?: StringNullableFilter<"ChangeRequest"> | string | null
    data?: JsonNullableFilter<"ChangeRequest">
    requesterId?: StringNullableFilter<"ChangeRequest"> | string | null
    requesterName?: StringNullableFilter<"ChangeRequest"> | string | null
    requesterPhone?: StringNullableFilter<"ChangeRequest"> | string | null
    createdAt?: DateTimeFilter<"ChangeRequest"> | Date | string
    requester?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ChangeRequestOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    status?: SortOrder
    targetModel?: SortOrder
    targetId?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    requesterId?: SortOrderInput | SortOrder
    requesterName?: SortOrderInput | SortOrder
    requesterPhone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    requester?: UserOrderByWithRelationInput
  }

  export type ChangeRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChangeRequestWhereInput | ChangeRequestWhereInput[]
    OR?: ChangeRequestWhereInput[]
    NOT?: ChangeRequestWhereInput | ChangeRequestWhereInput[]
    action?: EnumChangeRequestActionFilter<"ChangeRequest"> | $Enums.ChangeRequestAction
    status?: EnumChangeRequestStatusFilter<"ChangeRequest"> | $Enums.ChangeRequestStatus
    targetModel?: EnumChangeRequestTargetModelFilter<"ChangeRequest"> | $Enums.ChangeRequestTargetModel
    targetId?: StringNullableFilter<"ChangeRequest"> | string | null
    data?: JsonNullableFilter<"ChangeRequest">
    requesterId?: StringNullableFilter<"ChangeRequest"> | string | null
    requesterName?: StringNullableFilter<"ChangeRequest"> | string | null
    requesterPhone?: StringNullableFilter<"ChangeRequest"> | string | null
    createdAt?: DateTimeFilter<"ChangeRequest"> | Date | string
    requester?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type ChangeRequestOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    status?: SortOrder
    targetModel?: SortOrder
    targetId?: SortOrderInput | SortOrder
    data?: SortOrderInput | SortOrder
    requesterId?: SortOrderInput | SortOrder
    requesterName?: SortOrderInput | SortOrder
    requesterPhone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ChangeRequestCountOrderByAggregateInput
    _avg?: ChangeRequestAvgOrderByAggregateInput
    _max?: ChangeRequestMaxOrderByAggregateInput
    _min?: ChangeRequestMinOrderByAggregateInput
    _sum?: ChangeRequestSumOrderByAggregateInput
  }

  export type ChangeRequestScalarWhereWithAggregatesInput = {
    AND?: ChangeRequestScalarWhereWithAggregatesInput | ChangeRequestScalarWhereWithAggregatesInput[]
    OR?: ChangeRequestScalarWhereWithAggregatesInput[]
    NOT?: ChangeRequestScalarWhereWithAggregatesInput | ChangeRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ChangeRequest"> | number
    action?: EnumChangeRequestActionWithAggregatesFilter<"ChangeRequest"> | $Enums.ChangeRequestAction
    status?: EnumChangeRequestStatusWithAggregatesFilter<"ChangeRequest"> | $Enums.ChangeRequestStatus
    targetModel?: EnumChangeRequestTargetModelWithAggregatesFilter<"ChangeRequest"> | $Enums.ChangeRequestTargetModel
    targetId?: StringNullableWithAggregatesFilter<"ChangeRequest"> | string | null
    data?: JsonNullableWithAggregatesFilter<"ChangeRequest">
    requesterId?: StringNullableWithAggregatesFilter<"ChangeRequest"> | string | null
    requesterName?: StringNullableWithAggregatesFilter<"ChangeRequest"> | string | null
    requesterPhone?: StringNullableWithAggregatesFilter<"ChangeRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ChangeRequest"> | Date | string
  }

  export type FamilyWhereInput = {
    AND?: FamilyWhereInput | FamilyWhereInput[]
    OR?: FamilyWhereInput[]
    NOT?: FamilyWhereInput | FamilyWhereInput[]
    id?: IntFilter<"Family"> | number
    name?: StringFilter<"Family"> | string
    rootPersonId?: IntNullableFilter<"Family"> | number | null
    rootPerson?: XOR<PersonNullableScalarRelationFilter, PersonWhereInput> | null
    members?: PersonListRelationFilter
  }

  export type FamilyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    rootPersonId?: SortOrderInput | SortOrder
    rootPerson?: PersonOrderByWithRelationInput
    members?: PersonOrderByRelationAggregateInput
  }

  export type FamilyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    rootPersonId?: number
    AND?: FamilyWhereInput | FamilyWhereInput[]
    OR?: FamilyWhereInput[]
    NOT?: FamilyWhereInput | FamilyWhereInput[]
    name?: StringFilter<"Family"> | string
    rootPerson?: XOR<PersonNullableScalarRelationFilter, PersonWhereInput> | null
    members?: PersonListRelationFilter
  }, "id" | "rootPersonId">

  export type FamilyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    rootPersonId?: SortOrderInput | SortOrder
    _count?: FamilyCountOrderByAggregateInput
    _avg?: FamilyAvgOrderByAggregateInput
    _max?: FamilyMaxOrderByAggregateInput
    _min?: FamilyMinOrderByAggregateInput
    _sum?: FamilySumOrderByAggregateInput
  }

  export type FamilyScalarWhereWithAggregatesInput = {
    AND?: FamilyScalarWhereWithAggregatesInput | FamilyScalarWhereWithAggregatesInput[]
    OR?: FamilyScalarWhereWithAggregatesInput[]
    NOT?: FamilyScalarWhereWithAggregatesInput | FamilyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Family"> | number
    name?: StringWithAggregatesFilter<"Family"> | string
    rootPersonId?: IntNullableWithAggregatesFilter<"Family"> | number | null
  }

  export type UserCreateInput = {
    id?: string
    email?: string | null
    phone?: string | null
    password: string
    role?: $Enums.Role
    name?: string | null
    changeRequests?: ChangeRequestCreateNestedManyWithoutRequesterInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email?: string | null
    phone?: string | null
    password: string
    role?: $Enums.Role
    name?: string | null
    changeRequests?: ChangeRequestUncheckedCreateNestedManyWithoutRequesterInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    changeRequests?: ChangeRequestUpdateManyWithoutRequesterNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
    changeRequests?: ChangeRequestUncheckedUpdateManyWithoutRequesterNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email?: string | null
    phone?: string | null
    password: string
    role?: $Enums.Role
    name?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PersonCreateInput = {
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    family: FamilyCreateNestedOneWithoutMembersInput
    father?: PersonCreateNestedOneWithoutFatherChildrenInput
    mother?: PersonCreateNestedOneWithoutMotherChildrenInput
    fatherChildren?: PersonCreateNestedManyWithoutFatherInput
    motherChildren?: PersonCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyCreateNestedOneWithoutRootPersonInput
  }

  export type PersonUncheckedCreateInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    familyId: number
    fatherId?: number | null
    motherId?: number | null
    fatherChildren?: PersonUncheckedCreateNestedManyWithoutFatherInput
    motherChildren?: PersonUncheckedCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyUncheckedCreateNestedOneWithoutRootPersonInput
  }

  export type PersonUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    family?: FamilyUpdateOneRequiredWithoutMembersNestedInput
    father?: PersonUpdateOneWithoutFatherChildrenNestedInput
    mother?: PersonUpdateOneWithoutMotherChildrenNestedInput
    fatherChildren?: PersonUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: IntFieldUpdateOperationsInput | number
    fatherId?: NullableIntFieldUpdateOperationsInput | number | null
    motherId?: NullableIntFieldUpdateOperationsInput | number | null
    fatherChildren?: PersonUncheckedUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUncheckedUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUncheckedUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUncheckedUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUncheckedUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonCreateManyInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    familyId: number
    fatherId?: number | null
    motherId?: number | null
  }

  export type PersonUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PersonUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: IntFieldUpdateOperationsInput | number
    fatherId?: NullableIntFieldUpdateOperationsInput | number | null
    motherId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SpouseRelationshipCreateInput = {
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean
    person: PersonCreateNestedOneWithoutSpouseConnectionsInput
    spouse: PersonCreateNestedOneWithoutSpousedByConnectionsInput
  }

  export type SpouseRelationshipUncheckedCreateInput = {
    id?: number
    personId: number
    spouseId: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean
  }

  export type SpouseRelationshipUpdateInput = {
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    person?: PersonUpdateOneRequiredWithoutSpouseConnectionsNestedInput
    spouse?: PersonUpdateOneRequiredWithoutSpousedByConnectionsNestedInput
  }

  export type SpouseRelationshipUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    personId?: IntFieldUpdateOperationsInput | number
    spouseId?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SpouseRelationshipCreateManyInput = {
    id?: number
    personId: number
    spouseId: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean
  }

  export type SpouseRelationshipUpdateManyMutationInput = {
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SpouseRelationshipUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    personId?: IntFieldUpdateOperationsInput | number
    spouseId?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ChangeRequestCreateInput = {
    action: $Enums.ChangeRequestAction
    status?: $Enums.ChangeRequestStatus
    targetModel: $Enums.ChangeRequestTargetModel
    targetId?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterName?: string | null
    requesterPhone?: string | null
    createdAt?: Date | string
    requester?: UserCreateNestedOneWithoutChangeRequestsInput
  }

  export type ChangeRequestUncheckedCreateInput = {
    id?: number
    action: $Enums.ChangeRequestAction
    status?: $Enums.ChangeRequestStatus
    targetModel: $Enums.ChangeRequestTargetModel
    targetId?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterId?: string | null
    requesterName?: string | null
    requesterPhone?: string | null
    createdAt?: Date | string
  }

  export type ChangeRequestUpdateInput = {
    action?: EnumChangeRequestActionFieldUpdateOperationsInput | $Enums.ChangeRequestAction
    status?: EnumChangeRequestStatusFieldUpdateOperationsInput | $Enums.ChangeRequestStatus
    targetModel?: EnumChangeRequestTargetModelFieldUpdateOperationsInput | $Enums.ChangeRequestTargetModel
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterName?: NullableStringFieldUpdateOperationsInput | string | null
    requesterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requester?: UserUpdateOneWithoutChangeRequestsNestedInput
  }

  export type ChangeRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: EnumChangeRequestActionFieldUpdateOperationsInput | $Enums.ChangeRequestAction
    status?: EnumChangeRequestStatusFieldUpdateOperationsInput | $Enums.ChangeRequestStatus
    targetModel?: EnumChangeRequestTargetModelFieldUpdateOperationsInput | $Enums.ChangeRequestTargetModel
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterId?: NullableStringFieldUpdateOperationsInput | string | null
    requesterName?: NullableStringFieldUpdateOperationsInput | string | null
    requesterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeRequestCreateManyInput = {
    id?: number
    action: $Enums.ChangeRequestAction
    status?: $Enums.ChangeRequestStatus
    targetModel: $Enums.ChangeRequestTargetModel
    targetId?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterId?: string | null
    requesterName?: string | null
    requesterPhone?: string | null
    createdAt?: Date | string
  }

  export type ChangeRequestUpdateManyMutationInput = {
    action?: EnumChangeRequestActionFieldUpdateOperationsInput | $Enums.ChangeRequestAction
    status?: EnumChangeRequestStatusFieldUpdateOperationsInput | $Enums.ChangeRequestStatus
    targetModel?: EnumChangeRequestTargetModelFieldUpdateOperationsInput | $Enums.ChangeRequestTargetModel
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterName?: NullableStringFieldUpdateOperationsInput | string | null
    requesterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: EnumChangeRequestActionFieldUpdateOperationsInput | $Enums.ChangeRequestAction
    status?: EnumChangeRequestStatusFieldUpdateOperationsInput | $Enums.ChangeRequestStatus
    targetModel?: EnumChangeRequestTargetModelFieldUpdateOperationsInput | $Enums.ChangeRequestTargetModel
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterId?: NullableStringFieldUpdateOperationsInput | string | null
    requesterName?: NullableStringFieldUpdateOperationsInput | string | null
    requesterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FamilyCreateInput = {
    name: string
    rootPerson?: PersonCreateNestedOneWithoutRootOfFamilyInput
    members?: PersonCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateInput = {
    id?: number
    name: string
    rootPersonId?: number | null
    members?: PersonUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    rootPerson?: PersonUpdateOneWithoutRootOfFamilyNestedInput
    members?: PersonUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    rootPersonId?: NullableIntFieldUpdateOperationsInput | number | null
    members?: PersonUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyCreateManyInput = {
    id?: number
    name: string
    rootPersonId?: number | null
  }

  export type FamilyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type FamilyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    rootPersonId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type ChangeRequestListRelationFilter = {
    every?: ChangeRequestWhereInput
    some?: ChangeRequestWhereInput
    none?: ChangeRequestWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ChangeRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    name?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FamilyScalarRelationFilter = {
    is?: FamilyWhereInput
    isNot?: FamilyWhereInput
  }

  export type PersonNullableScalarRelationFilter = {
    is?: PersonWhereInput | null
    isNot?: PersonWhereInput | null
  }

  export type PersonListRelationFilter = {
    every?: PersonWhereInput
    some?: PersonWhereInput
    none?: PersonWhereInput
  }

  export type SpouseRelationshipListRelationFilter = {
    every?: SpouseRelationshipWhereInput
    some?: SpouseRelationshipWhereInput
    none?: SpouseRelationshipWhereInput
  }

  export type FamilyNullableScalarRelationFilter = {
    is?: FamilyWhereInput | null
    isNot?: FamilyWhereInput | null
  }

  export type PersonOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SpouseRelationshipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PersonCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    deathDate?: SortOrder
    phone?: SortOrder
    familyId?: SortOrder
    fatherId?: SortOrder
    motherId?: SortOrder
  }

  export type PersonAvgOrderByAggregateInput = {
    id?: SortOrder
    familyId?: SortOrder
    fatherId?: SortOrder
    motherId?: SortOrder
  }

  export type PersonMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    deathDate?: SortOrder
    phone?: SortOrder
    familyId?: SortOrder
    fatherId?: SortOrder
    motherId?: SortOrder
  }

  export type PersonMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    gender?: SortOrder
    birthDate?: SortOrder
    deathDate?: SortOrder
    phone?: SortOrder
    familyId?: SortOrder
    fatherId?: SortOrder
    motherId?: SortOrder
  }

  export type PersonSumOrderByAggregateInput = {
    id?: SortOrder
    familyId?: SortOrder
    fatherId?: SortOrder
    motherId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PersonScalarRelationFilter = {
    is?: PersonWhereInput
    isNot?: PersonWhereInput
  }

  export type SpouseRelationshipPersonIdSpouseIdCompoundUniqueInput = {
    personId: number
    spouseId: number
  }

  export type SpouseRelationshipCountOrderByAggregateInput = {
    id?: SortOrder
    personId?: SortOrder
    spouseId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
  }

  export type SpouseRelationshipAvgOrderByAggregateInput = {
    id?: SortOrder
    personId?: SortOrder
    spouseId?: SortOrder
  }

  export type SpouseRelationshipMaxOrderByAggregateInput = {
    id?: SortOrder
    personId?: SortOrder
    spouseId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
  }

  export type SpouseRelationshipMinOrderByAggregateInput = {
    id?: SortOrder
    personId?: SortOrder
    spouseId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    isActive?: SortOrder
  }

  export type SpouseRelationshipSumOrderByAggregateInput = {
    id?: SortOrder
    personId?: SortOrder
    spouseId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumChangeRequestActionFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeRequestAction | EnumChangeRequestActionFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeRequestAction[] | ListEnumChangeRequestActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeRequestAction[] | ListEnumChangeRequestActionFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeRequestActionFilter<$PrismaModel> | $Enums.ChangeRequestAction
  }

  export type EnumChangeRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeRequestStatus | EnumChangeRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeRequestStatus[] | ListEnumChangeRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeRequestStatus[] | ListEnumChangeRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeRequestStatusFilter<$PrismaModel> | $Enums.ChangeRequestStatus
  }

  export type EnumChangeRequestTargetModelFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeRequestTargetModel | EnumChangeRequestTargetModelFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeRequestTargetModel[] | ListEnumChangeRequestTargetModelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeRequestTargetModel[] | ListEnumChangeRequestTargetModelFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeRequestTargetModelFilter<$PrismaModel> | $Enums.ChangeRequestTargetModel
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ChangeRequestCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    status?: SortOrder
    targetModel?: SortOrder
    targetId?: SortOrder
    data?: SortOrder
    requesterId?: SortOrder
    requesterName?: SortOrder
    requesterPhone?: SortOrder
    createdAt?: SortOrder
  }

  export type ChangeRequestAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ChangeRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    status?: SortOrder
    targetModel?: SortOrder
    targetId?: SortOrder
    requesterId?: SortOrder
    requesterName?: SortOrder
    requesterPhone?: SortOrder
    createdAt?: SortOrder
  }

  export type ChangeRequestMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    status?: SortOrder
    targetModel?: SortOrder
    targetId?: SortOrder
    requesterId?: SortOrder
    requesterName?: SortOrder
    requesterPhone?: SortOrder
    createdAt?: SortOrder
  }

  export type ChangeRequestSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumChangeRequestActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeRequestAction | EnumChangeRequestActionFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeRequestAction[] | ListEnumChangeRequestActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeRequestAction[] | ListEnumChangeRequestActionFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeRequestActionWithAggregatesFilter<$PrismaModel> | $Enums.ChangeRequestAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChangeRequestActionFilter<$PrismaModel>
    _max?: NestedEnumChangeRequestActionFilter<$PrismaModel>
  }

  export type EnumChangeRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeRequestStatus | EnumChangeRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeRequestStatus[] | ListEnumChangeRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeRequestStatus[] | ListEnumChangeRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.ChangeRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChangeRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumChangeRequestStatusFilter<$PrismaModel>
  }

  export type EnumChangeRequestTargetModelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeRequestTargetModel | EnumChangeRequestTargetModelFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeRequestTargetModel[] | ListEnumChangeRequestTargetModelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeRequestTargetModel[] | ListEnumChangeRequestTargetModelFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeRequestTargetModelWithAggregatesFilter<$PrismaModel> | $Enums.ChangeRequestTargetModel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChangeRequestTargetModelFilter<$PrismaModel>
    _max?: NestedEnumChangeRequestTargetModelFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FamilyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rootPersonId?: SortOrder
  }

  export type FamilyAvgOrderByAggregateInput = {
    id?: SortOrder
    rootPersonId?: SortOrder
  }

  export type FamilyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rootPersonId?: SortOrder
  }

  export type FamilyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    rootPersonId?: SortOrder
  }

  export type FamilySumOrderByAggregateInput = {
    id?: SortOrder
    rootPersonId?: SortOrder
  }

  export type ChangeRequestCreateNestedManyWithoutRequesterInput = {
    create?: XOR<ChangeRequestCreateWithoutRequesterInput, ChangeRequestUncheckedCreateWithoutRequesterInput> | ChangeRequestCreateWithoutRequesterInput[] | ChangeRequestUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: ChangeRequestCreateOrConnectWithoutRequesterInput | ChangeRequestCreateOrConnectWithoutRequesterInput[]
    createMany?: ChangeRequestCreateManyRequesterInputEnvelope
    connect?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
  }

  export type ChangeRequestUncheckedCreateNestedManyWithoutRequesterInput = {
    create?: XOR<ChangeRequestCreateWithoutRequesterInput, ChangeRequestUncheckedCreateWithoutRequesterInput> | ChangeRequestCreateWithoutRequesterInput[] | ChangeRequestUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: ChangeRequestCreateOrConnectWithoutRequesterInput | ChangeRequestCreateOrConnectWithoutRequesterInput[]
    createMany?: ChangeRequestCreateManyRequesterInputEnvelope
    connect?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type ChangeRequestUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<ChangeRequestCreateWithoutRequesterInput, ChangeRequestUncheckedCreateWithoutRequesterInput> | ChangeRequestCreateWithoutRequesterInput[] | ChangeRequestUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: ChangeRequestCreateOrConnectWithoutRequesterInput | ChangeRequestCreateOrConnectWithoutRequesterInput[]
    upsert?: ChangeRequestUpsertWithWhereUniqueWithoutRequesterInput | ChangeRequestUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: ChangeRequestCreateManyRequesterInputEnvelope
    set?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    disconnect?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    delete?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    connect?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    update?: ChangeRequestUpdateWithWhereUniqueWithoutRequesterInput | ChangeRequestUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: ChangeRequestUpdateManyWithWhereWithoutRequesterInput | ChangeRequestUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: ChangeRequestScalarWhereInput | ChangeRequestScalarWhereInput[]
  }

  export type ChangeRequestUncheckedUpdateManyWithoutRequesterNestedInput = {
    create?: XOR<ChangeRequestCreateWithoutRequesterInput, ChangeRequestUncheckedCreateWithoutRequesterInput> | ChangeRequestCreateWithoutRequesterInput[] | ChangeRequestUncheckedCreateWithoutRequesterInput[]
    connectOrCreate?: ChangeRequestCreateOrConnectWithoutRequesterInput | ChangeRequestCreateOrConnectWithoutRequesterInput[]
    upsert?: ChangeRequestUpsertWithWhereUniqueWithoutRequesterInput | ChangeRequestUpsertWithWhereUniqueWithoutRequesterInput[]
    createMany?: ChangeRequestCreateManyRequesterInputEnvelope
    set?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    disconnect?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    delete?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    connect?: ChangeRequestWhereUniqueInput | ChangeRequestWhereUniqueInput[]
    update?: ChangeRequestUpdateWithWhereUniqueWithoutRequesterInput | ChangeRequestUpdateWithWhereUniqueWithoutRequesterInput[]
    updateMany?: ChangeRequestUpdateManyWithWhereWithoutRequesterInput | ChangeRequestUpdateManyWithWhereWithoutRequesterInput[]
    deleteMany?: ChangeRequestScalarWhereInput | ChangeRequestScalarWhereInput[]
  }

  export type FamilyCreateNestedOneWithoutMembersInput = {
    create?: XOR<FamilyCreateWithoutMembersInput, FamilyUncheckedCreateWithoutMembersInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutMembersInput
    connect?: FamilyWhereUniqueInput
  }

  export type PersonCreateNestedOneWithoutFatherChildrenInput = {
    create?: XOR<PersonCreateWithoutFatherChildrenInput, PersonUncheckedCreateWithoutFatherChildrenInput>
    connectOrCreate?: PersonCreateOrConnectWithoutFatherChildrenInput
    connect?: PersonWhereUniqueInput
  }

  export type PersonCreateNestedOneWithoutMotherChildrenInput = {
    create?: XOR<PersonCreateWithoutMotherChildrenInput, PersonUncheckedCreateWithoutMotherChildrenInput>
    connectOrCreate?: PersonCreateOrConnectWithoutMotherChildrenInput
    connect?: PersonWhereUniqueInput
  }

  export type PersonCreateNestedManyWithoutFatherInput = {
    create?: XOR<PersonCreateWithoutFatherInput, PersonUncheckedCreateWithoutFatherInput> | PersonCreateWithoutFatherInput[] | PersonUncheckedCreateWithoutFatherInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutFatherInput | PersonCreateOrConnectWithoutFatherInput[]
    createMany?: PersonCreateManyFatherInputEnvelope
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonCreateNestedManyWithoutMotherInput = {
    create?: XOR<PersonCreateWithoutMotherInput, PersonUncheckedCreateWithoutMotherInput> | PersonCreateWithoutMotherInput[] | PersonUncheckedCreateWithoutMotherInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutMotherInput | PersonCreateOrConnectWithoutMotherInput[]
    createMany?: PersonCreateManyMotherInputEnvelope
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type SpouseRelationshipCreateNestedManyWithoutPersonInput = {
    create?: XOR<SpouseRelationshipCreateWithoutPersonInput, SpouseRelationshipUncheckedCreateWithoutPersonInput> | SpouseRelationshipCreateWithoutPersonInput[] | SpouseRelationshipUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: SpouseRelationshipCreateOrConnectWithoutPersonInput | SpouseRelationshipCreateOrConnectWithoutPersonInput[]
    createMany?: SpouseRelationshipCreateManyPersonInputEnvelope
    connect?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
  }

  export type SpouseRelationshipCreateNestedManyWithoutSpouseInput = {
    create?: XOR<SpouseRelationshipCreateWithoutSpouseInput, SpouseRelationshipUncheckedCreateWithoutSpouseInput> | SpouseRelationshipCreateWithoutSpouseInput[] | SpouseRelationshipUncheckedCreateWithoutSpouseInput[]
    connectOrCreate?: SpouseRelationshipCreateOrConnectWithoutSpouseInput | SpouseRelationshipCreateOrConnectWithoutSpouseInput[]
    createMany?: SpouseRelationshipCreateManySpouseInputEnvelope
    connect?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
  }

  export type FamilyCreateNestedOneWithoutRootPersonInput = {
    create?: XOR<FamilyCreateWithoutRootPersonInput, FamilyUncheckedCreateWithoutRootPersonInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutRootPersonInput
    connect?: FamilyWhereUniqueInput
  }

  export type PersonUncheckedCreateNestedManyWithoutFatherInput = {
    create?: XOR<PersonCreateWithoutFatherInput, PersonUncheckedCreateWithoutFatherInput> | PersonCreateWithoutFatherInput[] | PersonUncheckedCreateWithoutFatherInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutFatherInput | PersonCreateOrConnectWithoutFatherInput[]
    createMany?: PersonCreateManyFatherInputEnvelope
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonUncheckedCreateNestedManyWithoutMotherInput = {
    create?: XOR<PersonCreateWithoutMotherInput, PersonUncheckedCreateWithoutMotherInput> | PersonCreateWithoutMotherInput[] | PersonUncheckedCreateWithoutMotherInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutMotherInput | PersonCreateOrConnectWithoutMotherInput[]
    createMany?: PersonCreateManyMotherInputEnvelope
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type SpouseRelationshipUncheckedCreateNestedManyWithoutPersonInput = {
    create?: XOR<SpouseRelationshipCreateWithoutPersonInput, SpouseRelationshipUncheckedCreateWithoutPersonInput> | SpouseRelationshipCreateWithoutPersonInput[] | SpouseRelationshipUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: SpouseRelationshipCreateOrConnectWithoutPersonInput | SpouseRelationshipCreateOrConnectWithoutPersonInput[]
    createMany?: SpouseRelationshipCreateManyPersonInputEnvelope
    connect?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
  }

  export type SpouseRelationshipUncheckedCreateNestedManyWithoutSpouseInput = {
    create?: XOR<SpouseRelationshipCreateWithoutSpouseInput, SpouseRelationshipUncheckedCreateWithoutSpouseInput> | SpouseRelationshipCreateWithoutSpouseInput[] | SpouseRelationshipUncheckedCreateWithoutSpouseInput[]
    connectOrCreate?: SpouseRelationshipCreateOrConnectWithoutSpouseInput | SpouseRelationshipCreateOrConnectWithoutSpouseInput[]
    createMany?: SpouseRelationshipCreateManySpouseInputEnvelope
    connect?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
  }

  export type FamilyUncheckedCreateNestedOneWithoutRootPersonInput = {
    create?: XOR<FamilyCreateWithoutRootPersonInput, FamilyUncheckedCreateWithoutRootPersonInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutRootPersonInput
    connect?: FamilyWhereUniqueInput
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type FamilyUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<FamilyCreateWithoutMembersInput, FamilyUncheckedCreateWithoutMembersInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutMembersInput
    upsert?: FamilyUpsertWithoutMembersInput
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutMembersInput, FamilyUpdateWithoutMembersInput>, FamilyUncheckedUpdateWithoutMembersInput>
  }

  export type PersonUpdateOneWithoutFatherChildrenNestedInput = {
    create?: XOR<PersonCreateWithoutFatherChildrenInput, PersonUncheckedCreateWithoutFatherChildrenInput>
    connectOrCreate?: PersonCreateOrConnectWithoutFatherChildrenInput
    upsert?: PersonUpsertWithoutFatherChildrenInput
    disconnect?: PersonWhereInput | boolean
    delete?: PersonWhereInput | boolean
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutFatherChildrenInput, PersonUpdateWithoutFatherChildrenInput>, PersonUncheckedUpdateWithoutFatherChildrenInput>
  }

  export type PersonUpdateOneWithoutMotherChildrenNestedInput = {
    create?: XOR<PersonCreateWithoutMotherChildrenInput, PersonUncheckedCreateWithoutMotherChildrenInput>
    connectOrCreate?: PersonCreateOrConnectWithoutMotherChildrenInput
    upsert?: PersonUpsertWithoutMotherChildrenInput
    disconnect?: PersonWhereInput | boolean
    delete?: PersonWhereInput | boolean
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutMotherChildrenInput, PersonUpdateWithoutMotherChildrenInput>, PersonUncheckedUpdateWithoutMotherChildrenInput>
  }

  export type PersonUpdateManyWithoutFatherNestedInput = {
    create?: XOR<PersonCreateWithoutFatherInput, PersonUncheckedCreateWithoutFatherInput> | PersonCreateWithoutFatherInput[] | PersonUncheckedCreateWithoutFatherInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutFatherInput | PersonCreateOrConnectWithoutFatherInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutFatherInput | PersonUpsertWithWhereUniqueWithoutFatherInput[]
    createMany?: PersonCreateManyFatherInputEnvelope
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutFatherInput | PersonUpdateWithWhereUniqueWithoutFatherInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutFatherInput | PersonUpdateManyWithWhereWithoutFatherInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUpdateManyWithoutMotherNestedInput = {
    create?: XOR<PersonCreateWithoutMotherInput, PersonUncheckedCreateWithoutMotherInput> | PersonCreateWithoutMotherInput[] | PersonUncheckedCreateWithoutMotherInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutMotherInput | PersonCreateOrConnectWithoutMotherInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutMotherInput | PersonUpsertWithWhereUniqueWithoutMotherInput[]
    createMany?: PersonCreateManyMotherInputEnvelope
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutMotherInput | PersonUpdateWithWhereUniqueWithoutMotherInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutMotherInput | PersonUpdateManyWithWhereWithoutMotherInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type SpouseRelationshipUpdateManyWithoutPersonNestedInput = {
    create?: XOR<SpouseRelationshipCreateWithoutPersonInput, SpouseRelationshipUncheckedCreateWithoutPersonInput> | SpouseRelationshipCreateWithoutPersonInput[] | SpouseRelationshipUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: SpouseRelationshipCreateOrConnectWithoutPersonInput | SpouseRelationshipCreateOrConnectWithoutPersonInput[]
    upsert?: SpouseRelationshipUpsertWithWhereUniqueWithoutPersonInput | SpouseRelationshipUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: SpouseRelationshipCreateManyPersonInputEnvelope
    set?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    disconnect?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    delete?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    connect?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    update?: SpouseRelationshipUpdateWithWhereUniqueWithoutPersonInput | SpouseRelationshipUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: SpouseRelationshipUpdateManyWithWhereWithoutPersonInput | SpouseRelationshipUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: SpouseRelationshipScalarWhereInput | SpouseRelationshipScalarWhereInput[]
  }

  export type SpouseRelationshipUpdateManyWithoutSpouseNestedInput = {
    create?: XOR<SpouseRelationshipCreateWithoutSpouseInput, SpouseRelationshipUncheckedCreateWithoutSpouseInput> | SpouseRelationshipCreateWithoutSpouseInput[] | SpouseRelationshipUncheckedCreateWithoutSpouseInput[]
    connectOrCreate?: SpouseRelationshipCreateOrConnectWithoutSpouseInput | SpouseRelationshipCreateOrConnectWithoutSpouseInput[]
    upsert?: SpouseRelationshipUpsertWithWhereUniqueWithoutSpouseInput | SpouseRelationshipUpsertWithWhereUniqueWithoutSpouseInput[]
    createMany?: SpouseRelationshipCreateManySpouseInputEnvelope
    set?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    disconnect?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    delete?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    connect?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    update?: SpouseRelationshipUpdateWithWhereUniqueWithoutSpouseInput | SpouseRelationshipUpdateWithWhereUniqueWithoutSpouseInput[]
    updateMany?: SpouseRelationshipUpdateManyWithWhereWithoutSpouseInput | SpouseRelationshipUpdateManyWithWhereWithoutSpouseInput[]
    deleteMany?: SpouseRelationshipScalarWhereInput | SpouseRelationshipScalarWhereInput[]
  }

  export type FamilyUpdateOneWithoutRootPersonNestedInput = {
    create?: XOR<FamilyCreateWithoutRootPersonInput, FamilyUncheckedCreateWithoutRootPersonInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutRootPersonInput
    upsert?: FamilyUpsertWithoutRootPersonInput
    disconnect?: FamilyWhereInput | boolean
    delete?: FamilyWhereInput | boolean
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutRootPersonInput, FamilyUpdateWithoutRootPersonInput>, FamilyUncheckedUpdateWithoutRootPersonInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PersonUncheckedUpdateManyWithoutFatherNestedInput = {
    create?: XOR<PersonCreateWithoutFatherInput, PersonUncheckedCreateWithoutFatherInput> | PersonCreateWithoutFatherInput[] | PersonUncheckedCreateWithoutFatherInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutFatherInput | PersonCreateOrConnectWithoutFatherInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutFatherInput | PersonUpsertWithWhereUniqueWithoutFatherInput[]
    createMany?: PersonCreateManyFatherInputEnvelope
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutFatherInput | PersonUpdateWithWhereUniqueWithoutFatherInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutFatherInput | PersonUpdateManyWithWhereWithoutFatherInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUncheckedUpdateManyWithoutMotherNestedInput = {
    create?: XOR<PersonCreateWithoutMotherInput, PersonUncheckedCreateWithoutMotherInput> | PersonCreateWithoutMotherInput[] | PersonUncheckedCreateWithoutMotherInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutMotherInput | PersonCreateOrConnectWithoutMotherInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutMotherInput | PersonUpsertWithWhereUniqueWithoutMotherInput[]
    createMany?: PersonCreateManyMotherInputEnvelope
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutMotherInput | PersonUpdateWithWhereUniqueWithoutMotherInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutMotherInput | PersonUpdateManyWithWhereWithoutMotherInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type SpouseRelationshipUncheckedUpdateManyWithoutPersonNestedInput = {
    create?: XOR<SpouseRelationshipCreateWithoutPersonInput, SpouseRelationshipUncheckedCreateWithoutPersonInput> | SpouseRelationshipCreateWithoutPersonInput[] | SpouseRelationshipUncheckedCreateWithoutPersonInput[]
    connectOrCreate?: SpouseRelationshipCreateOrConnectWithoutPersonInput | SpouseRelationshipCreateOrConnectWithoutPersonInput[]
    upsert?: SpouseRelationshipUpsertWithWhereUniqueWithoutPersonInput | SpouseRelationshipUpsertWithWhereUniqueWithoutPersonInput[]
    createMany?: SpouseRelationshipCreateManyPersonInputEnvelope
    set?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    disconnect?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    delete?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    connect?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    update?: SpouseRelationshipUpdateWithWhereUniqueWithoutPersonInput | SpouseRelationshipUpdateWithWhereUniqueWithoutPersonInput[]
    updateMany?: SpouseRelationshipUpdateManyWithWhereWithoutPersonInput | SpouseRelationshipUpdateManyWithWhereWithoutPersonInput[]
    deleteMany?: SpouseRelationshipScalarWhereInput | SpouseRelationshipScalarWhereInput[]
  }

  export type SpouseRelationshipUncheckedUpdateManyWithoutSpouseNestedInput = {
    create?: XOR<SpouseRelationshipCreateWithoutSpouseInput, SpouseRelationshipUncheckedCreateWithoutSpouseInput> | SpouseRelationshipCreateWithoutSpouseInput[] | SpouseRelationshipUncheckedCreateWithoutSpouseInput[]
    connectOrCreate?: SpouseRelationshipCreateOrConnectWithoutSpouseInput | SpouseRelationshipCreateOrConnectWithoutSpouseInput[]
    upsert?: SpouseRelationshipUpsertWithWhereUniqueWithoutSpouseInput | SpouseRelationshipUpsertWithWhereUniqueWithoutSpouseInput[]
    createMany?: SpouseRelationshipCreateManySpouseInputEnvelope
    set?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    disconnect?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    delete?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    connect?: SpouseRelationshipWhereUniqueInput | SpouseRelationshipWhereUniqueInput[]
    update?: SpouseRelationshipUpdateWithWhereUniqueWithoutSpouseInput | SpouseRelationshipUpdateWithWhereUniqueWithoutSpouseInput[]
    updateMany?: SpouseRelationshipUpdateManyWithWhereWithoutSpouseInput | SpouseRelationshipUpdateManyWithWhereWithoutSpouseInput[]
    deleteMany?: SpouseRelationshipScalarWhereInput | SpouseRelationshipScalarWhereInput[]
  }

  export type FamilyUncheckedUpdateOneWithoutRootPersonNestedInput = {
    create?: XOR<FamilyCreateWithoutRootPersonInput, FamilyUncheckedCreateWithoutRootPersonInput>
    connectOrCreate?: FamilyCreateOrConnectWithoutRootPersonInput
    upsert?: FamilyUpsertWithoutRootPersonInput
    disconnect?: FamilyWhereInput | boolean
    delete?: FamilyWhereInput | boolean
    connect?: FamilyWhereUniqueInput
    update?: XOR<XOR<FamilyUpdateToOneWithWhereWithoutRootPersonInput, FamilyUpdateWithoutRootPersonInput>, FamilyUncheckedUpdateWithoutRootPersonInput>
  }

  export type PersonCreateNestedOneWithoutSpouseConnectionsInput = {
    create?: XOR<PersonCreateWithoutSpouseConnectionsInput, PersonUncheckedCreateWithoutSpouseConnectionsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutSpouseConnectionsInput
    connect?: PersonWhereUniqueInput
  }

  export type PersonCreateNestedOneWithoutSpousedByConnectionsInput = {
    create?: XOR<PersonCreateWithoutSpousedByConnectionsInput, PersonUncheckedCreateWithoutSpousedByConnectionsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutSpousedByConnectionsInput
    connect?: PersonWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PersonUpdateOneRequiredWithoutSpouseConnectionsNestedInput = {
    create?: XOR<PersonCreateWithoutSpouseConnectionsInput, PersonUncheckedCreateWithoutSpouseConnectionsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutSpouseConnectionsInput
    upsert?: PersonUpsertWithoutSpouseConnectionsInput
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutSpouseConnectionsInput, PersonUpdateWithoutSpouseConnectionsInput>, PersonUncheckedUpdateWithoutSpouseConnectionsInput>
  }

  export type PersonUpdateOneRequiredWithoutSpousedByConnectionsNestedInput = {
    create?: XOR<PersonCreateWithoutSpousedByConnectionsInput, PersonUncheckedCreateWithoutSpousedByConnectionsInput>
    connectOrCreate?: PersonCreateOrConnectWithoutSpousedByConnectionsInput
    upsert?: PersonUpsertWithoutSpousedByConnectionsInput
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutSpousedByConnectionsInput, PersonUpdateWithoutSpousedByConnectionsInput>, PersonUncheckedUpdateWithoutSpousedByConnectionsInput>
  }

  export type UserCreateNestedOneWithoutChangeRequestsInput = {
    create?: XOR<UserCreateWithoutChangeRequestsInput, UserUncheckedCreateWithoutChangeRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChangeRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumChangeRequestActionFieldUpdateOperationsInput = {
    set?: $Enums.ChangeRequestAction
  }

  export type EnumChangeRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.ChangeRequestStatus
  }

  export type EnumChangeRequestTargetModelFieldUpdateOperationsInput = {
    set?: $Enums.ChangeRequestTargetModel
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneWithoutChangeRequestsNestedInput = {
    create?: XOR<UserCreateWithoutChangeRequestsInput, UserUncheckedCreateWithoutChangeRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChangeRequestsInput
    upsert?: UserUpsertWithoutChangeRequestsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChangeRequestsInput, UserUpdateWithoutChangeRequestsInput>, UserUncheckedUpdateWithoutChangeRequestsInput>
  }

  export type PersonCreateNestedOneWithoutRootOfFamilyInput = {
    create?: XOR<PersonCreateWithoutRootOfFamilyInput, PersonUncheckedCreateWithoutRootOfFamilyInput>
    connectOrCreate?: PersonCreateOrConnectWithoutRootOfFamilyInput
    connect?: PersonWhereUniqueInput
  }

  export type PersonCreateNestedManyWithoutFamilyInput = {
    create?: XOR<PersonCreateWithoutFamilyInput, PersonUncheckedCreateWithoutFamilyInput> | PersonCreateWithoutFamilyInput[] | PersonUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutFamilyInput | PersonCreateOrConnectWithoutFamilyInput[]
    createMany?: PersonCreateManyFamilyInputEnvelope
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonUncheckedCreateNestedManyWithoutFamilyInput = {
    create?: XOR<PersonCreateWithoutFamilyInput, PersonUncheckedCreateWithoutFamilyInput> | PersonCreateWithoutFamilyInput[] | PersonUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutFamilyInput | PersonCreateOrConnectWithoutFamilyInput[]
    createMany?: PersonCreateManyFamilyInputEnvelope
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
  }

  export type PersonUpdateOneWithoutRootOfFamilyNestedInput = {
    create?: XOR<PersonCreateWithoutRootOfFamilyInput, PersonUncheckedCreateWithoutRootOfFamilyInput>
    connectOrCreate?: PersonCreateOrConnectWithoutRootOfFamilyInput
    upsert?: PersonUpsertWithoutRootOfFamilyInput
    disconnect?: PersonWhereInput | boolean
    delete?: PersonWhereInput | boolean
    connect?: PersonWhereUniqueInput
    update?: XOR<XOR<PersonUpdateToOneWithWhereWithoutRootOfFamilyInput, PersonUpdateWithoutRootOfFamilyInput>, PersonUncheckedUpdateWithoutRootOfFamilyInput>
  }

  export type PersonUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<PersonCreateWithoutFamilyInput, PersonUncheckedCreateWithoutFamilyInput> | PersonCreateWithoutFamilyInput[] | PersonUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutFamilyInput | PersonCreateOrConnectWithoutFamilyInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutFamilyInput | PersonUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: PersonCreateManyFamilyInputEnvelope
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutFamilyInput | PersonUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutFamilyInput | PersonUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type PersonUncheckedUpdateManyWithoutFamilyNestedInput = {
    create?: XOR<PersonCreateWithoutFamilyInput, PersonUncheckedCreateWithoutFamilyInput> | PersonCreateWithoutFamilyInput[] | PersonUncheckedCreateWithoutFamilyInput[]
    connectOrCreate?: PersonCreateOrConnectWithoutFamilyInput | PersonCreateOrConnectWithoutFamilyInput[]
    upsert?: PersonUpsertWithWhereUniqueWithoutFamilyInput | PersonUpsertWithWhereUniqueWithoutFamilyInput[]
    createMany?: PersonCreateManyFamilyInputEnvelope
    set?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    disconnect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    delete?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    connect?: PersonWhereUniqueInput | PersonWhereUniqueInput[]
    update?: PersonUpdateWithWhereUniqueWithoutFamilyInput | PersonUpdateWithWhereUniqueWithoutFamilyInput[]
    updateMany?: PersonUpdateManyWithWhereWithoutFamilyInput | PersonUpdateManyWithWhereWithoutFamilyInput[]
    deleteMany?: PersonScalarWhereInput | PersonScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Gender[] | ListEnumGenderFieldRefInput<$PrismaModel>
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumChangeRequestActionFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeRequestAction | EnumChangeRequestActionFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeRequestAction[] | ListEnumChangeRequestActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeRequestAction[] | ListEnumChangeRequestActionFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeRequestActionFilter<$PrismaModel> | $Enums.ChangeRequestAction
  }

  export type NestedEnumChangeRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeRequestStatus | EnumChangeRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeRequestStatus[] | ListEnumChangeRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeRequestStatus[] | ListEnumChangeRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeRequestStatusFilter<$PrismaModel> | $Enums.ChangeRequestStatus
  }

  export type NestedEnumChangeRequestTargetModelFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeRequestTargetModel | EnumChangeRequestTargetModelFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeRequestTargetModel[] | ListEnumChangeRequestTargetModelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeRequestTargetModel[] | ListEnumChangeRequestTargetModelFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeRequestTargetModelFilter<$PrismaModel> | $Enums.ChangeRequestTargetModel
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumChangeRequestActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeRequestAction | EnumChangeRequestActionFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeRequestAction[] | ListEnumChangeRequestActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeRequestAction[] | ListEnumChangeRequestActionFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeRequestActionWithAggregatesFilter<$PrismaModel> | $Enums.ChangeRequestAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChangeRequestActionFilter<$PrismaModel>
    _max?: NestedEnumChangeRequestActionFilter<$PrismaModel>
  }

  export type NestedEnumChangeRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeRequestStatus | EnumChangeRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeRequestStatus[] | ListEnumChangeRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeRequestStatus[] | ListEnumChangeRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.ChangeRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChangeRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumChangeRequestStatusFilter<$PrismaModel>
  }

  export type NestedEnumChangeRequestTargetModelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChangeRequestTargetModel | EnumChangeRequestTargetModelFieldRefInput<$PrismaModel>
    in?: $Enums.ChangeRequestTargetModel[] | ListEnumChangeRequestTargetModelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChangeRequestTargetModel[] | ListEnumChangeRequestTargetModelFieldRefInput<$PrismaModel>
    not?: NestedEnumChangeRequestTargetModelWithAggregatesFilter<$PrismaModel> | $Enums.ChangeRequestTargetModel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChangeRequestTargetModelFilter<$PrismaModel>
    _max?: NestedEnumChangeRequestTargetModelFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ChangeRequestCreateWithoutRequesterInput = {
    action: $Enums.ChangeRequestAction
    status?: $Enums.ChangeRequestStatus
    targetModel: $Enums.ChangeRequestTargetModel
    targetId?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterName?: string | null
    requesterPhone?: string | null
    createdAt?: Date | string
  }

  export type ChangeRequestUncheckedCreateWithoutRequesterInput = {
    id?: number
    action: $Enums.ChangeRequestAction
    status?: $Enums.ChangeRequestStatus
    targetModel: $Enums.ChangeRequestTargetModel
    targetId?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterName?: string | null
    requesterPhone?: string | null
    createdAt?: Date | string
  }

  export type ChangeRequestCreateOrConnectWithoutRequesterInput = {
    where: ChangeRequestWhereUniqueInput
    create: XOR<ChangeRequestCreateWithoutRequesterInput, ChangeRequestUncheckedCreateWithoutRequesterInput>
  }

  export type ChangeRequestCreateManyRequesterInputEnvelope = {
    data: ChangeRequestCreateManyRequesterInput | ChangeRequestCreateManyRequesterInput[]
    skipDuplicates?: boolean
  }

  export type ChangeRequestUpsertWithWhereUniqueWithoutRequesterInput = {
    where: ChangeRequestWhereUniqueInput
    update: XOR<ChangeRequestUpdateWithoutRequesterInput, ChangeRequestUncheckedUpdateWithoutRequesterInput>
    create: XOR<ChangeRequestCreateWithoutRequesterInput, ChangeRequestUncheckedCreateWithoutRequesterInput>
  }

  export type ChangeRequestUpdateWithWhereUniqueWithoutRequesterInput = {
    where: ChangeRequestWhereUniqueInput
    data: XOR<ChangeRequestUpdateWithoutRequesterInput, ChangeRequestUncheckedUpdateWithoutRequesterInput>
  }

  export type ChangeRequestUpdateManyWithWhereWithoutRequesterInput = {
    where: ChangeRequestScalarWhereInput
    data: XOR<ChangeRequestUpdateManyMutationInput, ChangeRequestUncheckedUpdateManyWithoutRequesterInput>
  }

  export type ChangeRequestScalarWhereInput = {
    AND?: ChangeRequestScalarWhereInput | ChangeRequestScalarWhereInput[]
    OR?: ChangeRequestScalarWhereInput[]
    NOT?: ChangeRequestScalarWhereInput | ChangeRequestScalarWhereInput[]
    id?: IntFilter<"ChangeRequest"> | number
    action?: EnumChangeRequestActionFilter<"ChangeRequest"> | $Enums.ChangeRequestAction
    status?: EnumChangeRequestStatusFilter<"ChangeRequest"> | $Enums.ChangeRequestStatus
    targetModel?: EnumChangeRequestTargetModelFilter<"ChangeRequest"> | $Enums.ChangeRequestTargetModel
    targetId?: StringNullableFilter<"ChangeRequest"> | string | null
    data?: JsonNullableFilter<"ChangeRequest">
    requesterId?: StringNullableFilter<"ChangeRequest"> | string | null
    requesterName?: StringNullableFilter<"ChangeRequest"> | string | null
    requesterPhone?: StringNullableFilter<"ChangeRequest"> | string | null
    createdAt?: DateTimeFilter<"ChangeRequest"> | Date | string
  }

  export type FamilyCreateWithoutMembersInput = {
    name: string
    rootPerson?: PersonCreateNestedOneWithoutRootOfFamilyInput
  }

  export type FamilyUncheckedCreateWithoutMembersInput = {
    id?: number
    name: string
    rootPersonId?: number | null
  }

  export type FamilyCreateOrConnectWithoutMembersInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutMembersInput, FamilyUncheckedCreateWithoutMembersInput>
  }

  export type PersonCreateWithoutFatherChildrenInput = {
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    family: FamilyCreateNestedOneWithoutMembersInput
    father?: PersonCreateNestedOneWithoutFatherChildrenInput
    mother?: PersonCreateNestedOneWithoutMotherChildrenInput
    motherChildren?: PersonCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyCreateNestedOneWithoutRootPersonInput
  }

  export type PersonUncheckedCreateWithoutFatherChildrenInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    familyId: number
    fatherId?: number | null
    motherId?: number | null
    motherChildren?: PersonUncheckedCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyUncheckedCreateNestedOneWithoutRootPersonInput
  }

  export type PersonCreateOrConnectWithoutFatherChildrenInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutFatherChildrenInput, PersonUncheckedCreateWithoutFatherChildrenInput>
  }

  export type PersonCreateWithoutMotherChildrenInput = {
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    family: FamilyCreateNestedOneWithoutMembersInput
    father?: PersonCreateNestedOneWithoutFatherChildrenInput
    mother?: PersonCreateNestedOneWithoutMotherChildrenInput
    fatherChildren?: PersonCreateNestedManyWithoutFatherInput
    spouseConnections?: SpouseRelationshipCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyCreateNestedOneWithoutRootPersonInput
  }

  export type PersonUncheckedCreateWithoutMotherChildrenInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    familyId: number
    fatherId?: number | null
    motherId?: number | null
    fatherChildren?: PersonUncheckedCreateNestedManyWithoutFatherInput
    spouseConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyUncheckedCreateNestedOneWithoutRootPersonInput
  }

  export type PersonCreateOrConnectWithoutMotherChildrenInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutMotherChildrenInput, PersonUncheckedCreateWithoutMotherChildrenInput>
  }

  export type PersonCreateWithoutFatherInput = {
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    family: FamilyCreateNestedOneWithoutMembersInput
    mother?: PersonCreateNestedOneWithoutMotherChildrenInput
    fatherChildren?: PersonCreateNestedManyWithoutFatherInput
    motherChildren?: PersonCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyCreateNestedOneWithoutRootPersonInput
  }

  export type PersonUncheckedCreateWithoutFatherInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    familyId: number
    motherId?: number | null
    fatherChildren?: PersonUncheckedCreateNestedManyWithoutFatherInput
    motherChildren?: PersonUncheckedCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyUncheckedCreateNestedOneWithoutRootPersonInput
  }

  export type PersonCreateOrConnectWithoutFatherInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutFatherInput, PersonUncheckedCreateWithoutFatherInput>
  }

  export type PersonCreateManyFatherInputEnvelope = {
    data: PersonCreateManyFatherInput | PersonCreateManyFatherInput[]
    skipDuplicates?: boolean
  }

  export type PersonCreateWithoutMotherInput = {
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    family: FamilyCreateNestedOneWithoutMembersInput
    father?: PersonCreateNestedOneWithoutFatherChildrenInput
    fatherChildren?: PersonCreateNestedManyWithoutFatherInput
    motherChildren?: PersonCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyCreateNestedOneWithoutRootPersonInput
  }

  export type PersonUncheckedCreateWithoutMotherInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    familyId: number
    fatherId?: number | null
    fatherChildren?: PersonUncheckedCreateNestedManyWithoutFatherInput
    motherChildren?: PersonUncheckedCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyUncheckedCreateNestedOneWithoutRootPersonInput
  }

  export type PersonCreateOrConnectWithoutMotherInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutMotherInput, PersonUncheckedCreateWithoutMotherInput>
  }

  export type PersonCreateManyMotherInputEnvelope = {
    data: PersonCreateManyMotherInput | PersonCreateManyMotherInput[]
    skipDuplicates?: boolean
  }

  export type SpouseRelationshipCreateWithoutPersonInput = {
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean
    spouse: PersonCreateNestedOneWithoutSpousedByConnectionsInput
  }

  export type SpouseRelationshipUncheckedCreateWithoutPersonInput = {
    id?: number
    spouseId: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean
  }

  export type SpouseRelationshipCreateOrConnectWithoutPersonInput = {
    where: SpouseRelationshipWhereUniqueInput
    create: XOR<SpouseRelationshipCreateWithoutPersonInput, SpouseRelationshipUncheckedCreateWithoutPersonInput>
  }

  export type SpouseRelationshipCreateManyPersonInputEnvelope = {
    data: SpouseRelationshipCreateManyPersonInput | SpouseRelationshipCreateManyPersonInput[]
    skipDuplicates?: boolean
  }

  export type SpouseRelationshipCreateWithoutSpouseInput = {
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean
    person: PersonCreateNestedOneWithoutSpouseConnectionsInput
  }

  export type SpouseRelationshipUncheckedCreateWithoutSpouseInput = {
    id?: number
    personId: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean
  }

  export type SpouseRelationshipCreateOrConnectWithoutSpouseInput = {
    where: SpouseRelationshipWhereUniqueInput
    create: XOR<SpouseRelationshipCreateWithoutSpouseInput, SpouseRelationshipUncheckedCreateWithoutSpouseInput>
  }

  export type SpouseRelationshipCreateManySpouseInputEnvelope = {
    data: SpouseRelationshipCreateManySpouseInput | SpouseRelationshipCreateManySpouseInput[]
    skipDuplicates?: boolean
  }

  export type FamilyCreateWithoutRootPersonInput = {
    name: string
    members?: PersonCreateNestedManyWithoutFamilyInput
  }

  export type FamilyUncheckedCreateWithoutRootPersonInput = {
    id?: number
    name: string
    members?: PersonUncheckedCreateNestedManyWithoutFamilyInput
  }

  export type FamilyCreateOrConnectWithoutRootPersonInput = {
    where: FamilyWhereUniqueInput
    create: XOR<FamilyCreateWithoutRootPersonInput, FamilyUncheckedCreateWithoutRootPersonInput>
  }

  export type FamilyUpsertWithoutMembersInput = {
    update: XOR<FamilyUpdateWithoutMembersInput, FamilyUncheckedUpdateWithoutMembersInput>
    create: XOR<FamilyCreateWithoutMembersInput, FamilyUncheckedCreateWithoutMembersInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutMembersInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutMembersInput, FamilyUncheckedUpdateWithoutMembersInput>
  }

  export type FamilyUpdateWithoutMembersInput = {
    name?: StringFieldUpdateOperationsInput | string
    rootPerson?: PersonUpdateOneWithoutRootOfFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    rootPersonId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PersonUpsertWithoutFatherChildrenInput = {
    update: XOR<PersonUpdateWithoutFatherChildrenInput, PersonUncheckedUpdateWithoutFatherChildrenInput>
    create: XOR<PersonCreateWithoutFatherChildrenInput, PersonUncheckedCreateWithoutFatherChildrenInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutFatherChildrenInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutFatherChildrenInput, PersonUncheckedUpdateWithoutFatherChildrenInput>
  }

  export type PersonUpdateWithoutFatherChildrenInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    family?: FamilyUpdateOneRequiredWithoutMembersNestedInput
    father?: PersonUpdateOneWithoutFatherChildrenNestedInput
    mother?: PersonUpdateOneWithoutMotherChildrenNestedInput
    motherChildren?: PersonUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutFatherChildrenInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: IntFieldUpdateOperationsInput | number
    fatherId?: NullableIntFieldUpdateOperationsInput | number | null
    motherId?: NullableIntFieldUpdateOperationsInput | number | null
    motherChildren?: PersonUncheckedUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUncheckedUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUncheckedUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUncheckedUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUpsertWithoutMotherChildrenInput = {
    update: XOR<PersonUpdateWithoutMotherChildrenInput, PersonUncheckedUpdateWithoutMotherChildrenInput>
    create: XOR<PersonCreateWithoutMotherChildrenInput, PersonUncheckedCreateWithoutMotherChildrenInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutMotherChildrenInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutMotherChildrenInput, PersonUncheckedUpdateWithoutMotherChildrenInput>
  }

  export type PersonUpdateWithoutMotherChildrenInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    family?: FamilyUpdateOneRequiredWithoutMembersNestedInput
    father?: PersonUpdateOneWithoutFatherChildrenNestedInput
    mother?: PersonUpdateOneWithoutMotherChildrenNestedInput
    fatherChildren?: PersonUpdateManyWithoutFatherNestedInput
    spouseConnections?: SpouseRelationshipUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutMotherChildrenInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: IntFieldUpdateOperationsInput | number
    fatherId?: NullableIntFieldUpdateOperationsInput | number | null
    motherId?: NullableIntFieldUpdateOperationsInput | number | null
    fatherChildren?: PersonUncheckedUpdateManyWithoutFatherNestedInput
    spouseConnections?: SpouseRelationshipUncheckedUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUncheckedUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUncheckedUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUpsertWithWhereUniqueWithoutFatherInput = {
    where: PersonWhereUniqueInput
    update: XOR<PersonUpdateWithoutFatherInput, PersonUncheckedUpdateWithoutFatherInput>
    create: XOR<PersonCreateWithoutFatherInput, PersonUncheckedCreateWithoutFatherInput>
  }

  export type PersonUpdateWithWhereUniqueWithoutFatherInput = {
    where: PersonWhereUniqueInput
    data: XOR<PersonUpdateWithoutFatherInput, PersonUncheckedUpdateWithoutFatherInput>
  }

  export type PersonUpdateManyWithWhereWithoutFatherInput = {
    where: PersonScalarWhereInput
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyWithoutFatherInput>
  }

  export type PersonScalarWhereInput = {
    AND?: PersonScalarWhereInput | PersonScalarWhereInput[]
    OR?: PersonScalarWhereInput[]
    NOT?: PersonScalarWhereInput | PersonScalarWhereInput[]
    id?: IntFilter<"Person"> | number
    firstName?: StringFilter<"Person"> | string
    gender?: EnumGenderFilter<"Person"> | $Enums.Gender
    birthDate?: DateTimeNullableFilter<"Person"> | Date | string | null
    deathDate?: DateTimeNullableFilter<"Person"> | Date | string | null
    phone?: StringNullableFilter<"Person"> | string | null
    familyId?: IntFilter<"Person"> | number
    fatherId?: IntNullableFilter<"Person"> | number | null
    motherId?: IntNullableFilter<"Person"> | number | null
  }

  export type PersonUpsertWithWhereUniqueWithoutMotherInput = {
    where: PersonWhereUniqueInput
    update: XOR<PersonUpdateWithoutMotherInput, PersonUncheckedUpdateWithoutMotherInput>
    create: XOR<PersonCreateWithoutMotherInput, PersonUncheckedCreateWithoutMotherInput>
  }

  export type PersonUpdateWithWhereUniqueWithoutMotherInput = {
    where: PersonWhereUniqueInput
    data: XOR<PersonUpdateWithoutMotherInput, PersonUncheckedUpdateWithoutMotherInput>
  }

  export type PersonUpdateManyWithWhereWithoutMotherInput = {
    where: PersonScalarWhereInput
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyWithoutMotherInput>
  }

  export type SpouseRelationshipUpsertWithWhereUniqueWithoutPersonInput = {
    where: SpouseRelationshipWhereUniqueInput
    update: XOR<SpouseRelationshipUpdateWithoutPersonInput, SpouseRelationshipUncheckedUpdateWithoutPersonInput>
    create: XOR<SpouseRelationshipCreateWithoutPersonInput, SpouseRelationshipUncheckedCreateWithoutPersonInput>
  }

  export type SpouseRelationshipUpdateWithWhereUniqueWithoutPersonInput = {
    where: SpouseRelationshipWhereUniqueInput
    data: XOR<SpouseRelationshipUpdateWithoutPersonInput, SpouseRelationshipUncheckedUpdateWithoutPersonInput>
  }

  export type SpouseRelationshipUpdateManyWithWhereWithoutPersonInput = {
    where: SpouseRelationshipScalarWhereInput
    data: XOR<SpouseRelationshipUpdateManyMutationInput, SpouseRelationshipUncheckedUpdateManyWithoutPersonInput>
  }

  export type SpouseRelationshipScalarWhereInput = {
    AND?: SpouseRelationshipScalarWhereInput | SpouseRelationshipScalarWhereInput[]
    OR?: SpouseRelationshipScalarWhereInput[]
    NOT?: SpouseRelationshipScalarWhereInput | SpouseRelationshipScalarWhereInput[]
    id?: IntFilter<"SpouseRelationship"> | number
    personId?: IntFilter<"SpouseRelationship"> | number
    spouseId?: IntFilter<"SpouseRelationship"> | number
    startDate?: DateTimeNullableFilter<"SpouseRelationship"> | Date | string | null
    endDate?: DateTimeNullableFilter<"SpouseRelationship"> | Date | string | null
    isActive?: BoolFilter<"SpouseRelationship"> | boolean
  }

  export type SpouseRelationshipUpsertWithWhereUniqueWithoutSpouseInput = {
    where: SpouseRelationshipWhereUniqueInput
    update: XOR<SpouseRelationshipUpdateWithoutSpouseInput, SpouseRelationshipUncheckedUpdateWithoutSpouseInput>
    create: XOR<SpouseRelationshipCreateWithoutSpouseInput, SpouseRelationshipUncheckedCreateWithoutSpouseInput>
  }

  export type SpouseRelationshipUpdateWithWhereUniqueWithoutSpouseInput = {
    where: SpouseRelationshipWhereUniqueInput
    data: XOR<SpouseRelationshipUpdateWithoutSpouseInput, SpouseRelationshipUncheckedUpdateWithoutSpouseInput>
  }

  export type SpouseRelationshipUpdateManyWithWhereWithoutSpouseInput = {
    where: SpouseRelationshipScalarWhereInput
    data: XOR<SpouseRelationshipUpdateManyMutationInput, SpouseRelationshipUncheckedUpdateManyWithoutSpouseInput>
  }

  export type FamilyUpsertWithoutRootPersonInput = {
    update: XOR<FamilyUpdateWithoutRootPersonInput, FamilyUncheckedUpdateWithoutRootPersonInput>
    create: XOR<FamilyCreateWithoutRootPersonInput, FamilyUncheckedCreateWithoutRootPersonInput>
    where?: FamilyWhereInput
  }

  export type FamilyUpdateToOneWithWhereWithoutRootPersonInput = {
    where?: FamilyWhereInput
    data: XOR<FamilyUpdateWithoutRootPersonInput, FamilyUncheckedUpdateWithoutRootPersonInput>
  }

  export type FamilyUpdateWithoutRootPersonInput = {
    name?: StringFieldUpdateOperationsInput | string
    members?: PersonUpdateManyWithoutFamilyNestedInput
  }

  export type FamilyUncheckedUpdateWithoutRootPersonInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    members?: PersonUncheckedUpdateManyWithoutFamilyNestedInput
  }

  export type PersonCreateWithoutSpouseConnectionsInput = {
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    family: FamilyCreateNestedOneWithoutMembersInput
    father?: PersonCreateNestedOneWithoutFatherChildrenInput
    mother?: PersonCreateNestedOneWithoutMotherChildrenInput
    fatherChildren?: PersonCreateNestedManyWithoutFatherInput
    motherChildren?: PersonCreateNestedManyWithoutMotherInput
    spousedByConnections?: SpouseRelationshipCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyCreateNestedOneWithoutRootPersonInput
  }

  export type PersonUncheckedCreateWithoutSpouseConnectionsInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    familyId: number
    fatherId?: number | null
    motherId?: number | null
    fatherChildren?: PersonUncheckedCreateNestedManyWithoutFatherInput
    motherChildren?: PersonUncheckedCreateNestedManyWithoutMotherInput
    spousedByConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyUncheckedCreateNestedOneWithoutRootPersonInput
  }

  export type PersonCreateOrConnectWithoutSpouseConnectionsInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutSpouseConnectionsInput, PersonUncheckedCreateWithoutSpouseConnectionsInput>
  }

  export type PersonCreateWithoutSpousedByConnectionsInput = {
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    family: FamilyCreateNestedOneWithoutMembersInput
    father?: PersonCreateNestedOneWithoutFatherChildrenInput
    mother?: PersonCreateNestedOneWithoutMotherChildrenInput
    fatherChildren?: PersonCreateNestedManyWithoutFatherInput
    motherChildren?: PersonCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipCreateNestedManyWithoutPersonInput
    rootOfFamily?: FamilyCreateNestedOneWithoutRootPersonInput
  }

  export type PersonUncheckedCreateWithoutSpousedByConnectionsInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    familyId: number
    fatherId?: number | null
    motherId?: number | null
    fatherChildren?: PersonUncheckedCreateNestedManyWithoutFatherInput
    motherChildren?: PersonUncheckedCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutPersonInput
    rootOfFamily?: FamilyUncheckedCreateNestedOneWithoutRootPersonInput
  }

  export type PersonCreateOrConnectWithoutSpousedByConnectionsInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutSpousedByConnectionsInput, PersonUncheckedCreateWithoutSpousedByConnectionsInput>
  }

  export type PersonUpsertWithoutSpouseConnectionsInput = {
    update: XOR<PersonUpdateWithoutSpouseConnectionsInput, PersonUncheckedUpdateWithoutSpouseConnectionsInput>
    create: XOR<PersonCreateWithoutSpouseConnectionsInput, PersonUncheckedCreateWithoutSpouseConnectionsInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutSpouseConnectionsInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutSpouseConnectionsInput, PersonUncheckedUpdateWithoutSpouseConnectionsInput>
  }

  export type PersonUpdateWithoutSpouseConnectionsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    family?: FamilyUpdateOneRequiredWithoutMembersNestedInput
    father?: PersonUpdateOneWithoutFatherChildrenNestedInput
    mother?: PersonUpdateOneWithoutMotherChildrenNestedInput
    fatherChildren?: PersonUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUpdateManyWithoutMotherNestedInput
    spousedByConnections?: SpouseRelationshipUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutSpouseConnectionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: IntFieldUpdateOperationsInput | number
    fatherId?: NullableIntFieldUpdateOperationsInput | number | null
    motherId?: NullableIntFieldUpdateOperationsInput | number | null
    fatherChildren?: PersonUncheckedUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUncheckedUpdateManyWithoutMotherNestedInput
    spousedByConnections?: SpouseRelationshipUncheckedUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUncheckedUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUpsertWithoutSpousedByConnectionsInput = {
    update: XOR<PersonUpdateWithoutSpousedByConnectionsInput, PersonUncheckedUpdateWithoutSpousedByConnectionsInput>
    create: XOR<PersonCreateWithoutSpousedByConnectionsInput, PersonUncheckedCreateWithoutSpousedByConnectionsInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutSpousedByConnectionsInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutSpousedByConnectionsInput, PersonUncheckedUpdateWithoutSpousedByConnectionsInput>
  }

  export type PersonUpdateWithoutSpousedByConnectionsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    family?: FamilyUpdateOneRequiredWithoutMembersNestedInput
    father?: PersonUpdateOneWithoutFatherChildrenNestedInput
    mother?: PersonUpdateOneWithoutMotherChildrenNestedInput
    fatherChildren?: PersonUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUpdateManyWithoutPersonNestedInput
    rootOfFamily?: FamilyUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutSpousedByConnectionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: IntFieldUpdateOperationsInput | number
    fatherId?: NullableIntFieldUpdateOperationsInput | number | null
    motherId?: NullableIntFieldUpdateOperationsInput | number | null
    fatherChildren?: PersonUncheckedUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUncheckedUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUncheckedUpdateManyWithoutPersonNestedInput
    rootOfFamily?: FamilyUncheckedUpdateOneWithoutRootPersonNestedInput
  }

  export type UserCreateWithoutChangeRequestsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    password: string
    role?: $Enums.Role
    name?: string | null
  }

  export type UserUncheckedCreateWithoutChangeRequestsInput = {
    id?: string
    email?: string | null
    phone?: string | null
    password: string
    role?: $Enums.Role
    name?: string | null
  }

  export type UserCreateOrConnectWithoutChangeRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChangeRequestsInput, UserUncheckedCreateWithoutChangeRequestsInput>
  }

  export type UserUpsertWithoutChangeRequestsInput = {
    update: XOR<UserUpdateWithoutChangeRequestsInput, UserUncheckedUpdateWithoutChangeRequestsInput>
    create: XOR<UserCreateWithoutChangeRequestsInput, UserUncheckedCreateWithoutChangeRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChangeRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChangeRequestsInput, UserUncheckedUpdateWithoutChangeRequestsInput>
  }

  export type UserUpdateWithoutChangeRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateWithoutChangeRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PersonCreateWithoutRootOfFamilyInput = {
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    family: FamilyCreateNestedOneWithoutMembersInput
    father?: PersonCreateNestedOneWithoutFatherChildrenInput
    mother?: PersonCreateNestedOneWithoutMotherChildrenInput
    fatherChildren?: PersonCreateNestedManyWithoutFatherInput
    motherChildren?: PersonCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipCreateNestedManyWithoutSpouseInput
  }

  export type PersonUncheckedCreateWithoutRootOfFamilyInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    familyId: number
    fatherId?: number | null
    motherId?: number | null
    fatherChildren?: PersonUncheckedCreateNestedManyWithoutFatherInput
    motherChildren?: PersonUncheckedCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutSpouseInput
  }

  export type PersonCreateOrConnectWithoutRootOfFamilyInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutRootOfFamilyInput, PersonUncheckedCreateWithoutRootOfFamilyInput>
  }

  export type PersonCreateWithoutFamilyInput = {
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    father?: PersonCreateNestedOneWithoutFatherChildrenInput
    mother?: PersonCreateNestedOneWithoutMotherChildrenInput
    fatherChildren?: PersonCreateNestedManyWithoutFatherInput
    motherChildren?: PersonCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyCreateNestedOneWithoutRootPersonInput
  }

  export type PersonUncheckedCreateWithoutFamilyInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    fatherId?: number | null
    motherId?: number | null
    fatherChildren?: PersonUncheckedCreateNestedManyWithoutFatherInput
    motherChildren?: PersonUncheckedCreateNestedManyWithoutMotherInput
    spouseConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutPersonInput
    spousedByConnections?: SpouseRelationshipUncheckedCreateNestedManyWithoutSpouseInput
    rootOfFamily?: FamilyUncheckedCreateNestedOneWithoutRootPersonInput
  }

  export type PersonCreateOrConnectWithoutFamilyInput = {
    where: PersonWhereUniqueInput
    create: XOR<PersonCreateWithoutFamilyInput, PersonUncheckedCreateWithoutFamilyInput>
  }

  export type PersonCreateManyFamilyInputEnvelope = {
    data: PersonCreateManyFamilyInput | PersonCreateManyFamilyInput[]
    skipDuplicates?: boolean
  }

  export type PersonUpsertWithoutRootOfFamilyInput = {
    update: XOR<PersonUpdateWithoutRootOfFamilyInput, PersonUncheckedUpdateWithoutRootOfFamilyInput>
    create: XOR<PersonCreateWithoutRootOfFamilyInput, PersonUncheckedCreateWithoutRootOfFamilyInput>
    where?: PersonWhereInput
  }

  export type PersonUpdateToOneWithWhereWithoutRootOfFamilyInput = {
    where?: PersonWhereInput
    data: XOR<PersonUpdateWithoutRootOfFamilyInput, PersonUncheckedUpdateWithoutRootOfFamilyInput>
  }

  export type PersonUpdateWithoutRootOfFamilyInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    family?: FamilyUpdateOneRequiredWithoutMembersNestedInput
    father?: PersonUpdateOneWithoutFatherChildrenNestedInput
    mother?: PersonUpdateOneWithoutMotherChildrenNestedInput
    fatherChildren?: PersonUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUpdateManyWithoutSpouseNestedInput
  }

  export type PersonUncheckedUpdateWithoutRootOfFamilyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: IntFieldUpdateOperationsInput | number
    fatherId?: NullableIntFieldUpdateOperationsInput | number | null
    motherId?: NullableIntFieldUpdateOperationsInput | number | null
    fatherChildren?: PersonUncheckedUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUncheckedUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUncheckedUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUncheckedUpdateManyWithoutSpouseNestedInput
  }

  export type PersonUpsertWithWhereUniqueWithoutFamilyInput = {
    where: PersonWhereUniqueInput
    update: XOR<PersonUpdateWithoutFamilyInput, PersonUncheckedUpdateWithoutFamilyInput>
    create: XOR<PersonCreateWithoutFamilyInput, PersonUncheckedCreateWithoutFamilyInput>
  }

  export type PersonUpdateWithWhereUniqueWithoutFamilyInput = {
    where: PersonWhereUniqueInput
    data: XOR<PersonUpdateWithoutFamilyInput, PersonUncheckedUpdateWithoutFamilyInput>
  }

  export type PersonUpdateManyWithWhereWithoutFamilyInput = {
    where: PersonScalarWhereInput
    data: XOR<PersonUpdateManyMutationInput, PersonUncheckedUpdateManyWithoutFamilyInput>
  }

  export type ChangeRequestCreateManyRequesterInput = {
    id?: number
    action: $Enums.ChangeRequestAction
    status?: $Enums.ChangeRequestStatus
    targetModel: $Enums.ChangeRequestTargetModel
    targetId?: string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterName?: string | null
    requesterPhone?: string | null
    createdAt?: Date | string
  }

  export type ChangeRequestUpdateWithoutRequesterInput = {
    action?: EnumChangeRequestActionFieldUpdateOperationsInput | $Enums.ChangeRequestAction
    status?: EnumChangeRequestStatusFieldUpdateOperationsInput | $Enums.ChangeRequestStatus
    targetModel?: EnumChangeRequestTargetModelFieldUpdateOperationsInput | $Enums.ChangeRequestTargetModel
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterName?: NullableStringFieldUpdateOperationsInput | string | null
    requesterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeRequestUncheckedUpdateWithoutRequesterInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: EnumChangeRequestActionFieldUpdateOperationsInput | $Enums.ChangeRequestAction
    status?: EnumChangeRequestStatusFieldUpdateOperationsInput | $Enums.ChangeRequestStatus
    targetModel?: EnumChangeRequestTargetModelFieldUpdateOperationsInput | $Enums.ChangeRequestTargetModel
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterName?: NullableStringFieldUpdateOperationsInput | string | null
    requesterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChangeRequestUncheckedUpdateManyWithoutRequesterInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: EnumChangeRequestActionFieldUpdateOperationsInput | $Enums.ChangeRequestAction
    status?: EnumChangeRequestStatusFieldUpdateOperationsInput | $Enums.ChangeRequestStatus
    targetModel?: EnumChangeRequestTargetModelFieldUpdateOperationsInput | $Enums.ChangeRequestTargetModel
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    data?: NullableJsonNullValueInput | InputJsonValue
    requesterName?: NullableStringFieldUpdateOperationsInput | string | null
    requesterPhone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PersonCreateManyFatherInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    familyId: number
    motherId?: number | null
  }

  export type PersonCreateManyMotherInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    familyId: number
    fatherId?: number | null
  }

  export type SpouseRelationshipCreateManyPersonInput = {
    id?: number
    spouseId: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean
  }

  export type SpouseRelationshipCreateManySpouseInput = {
    id?: number
    personId: number
    startDate?: Date | string | null
    endDate?: Date | string | null
    isActive?: boolean
  }

  export type PersonUpdateWithoutFatherInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    family?: FamilyUpdateOneRequiredWithoutMembersNestedInput
    mother?: PersonUpdateOneWithoutMotherChildrenNestedInput
    fatherChildren?: PersonUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutFatherInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: IntFieldUpdateOperationsInput | number
    motherId?: NullableIntFieldUpdateOperationsInput | number | null
    fatherChildren?: PersonUncheckedUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUncheckedUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUncheckedUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUncheckedUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUncheckedUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUncheckedUpdateManyWithoutFatherInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: IntFieldUpdateOperationsInput | number
    motherId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PersonUpdateWithoutMotherInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    family?: FamilyUpdateOneRequiredWithoutMembersNestedInput
    father?: PersonUpdateOneWithoutFatherChildrenNestedInput
    fatherChildren?: PersonUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutMotherInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: IntFieldUpdateOperationsInput | number
    fatherId?: NullableIntFieldUpdateOperationsInput | number | null
    fatherChildren?: PersonUncheckedUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUncheckedUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUncheckedUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUncheckedUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUncheckedUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUncheckedUpdateManyWithoutMotherInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    familyId?: IntFieldUpdateOperationsInput | number
    fatherId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SpouseRelationshipUpdateWithoutPersonInput = {
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    spouse?: PersonUpdateOneRequiredWithoutSpousedByConnectionsNestedInput
  }

  export type SpouseRelationshipUncheckedUpdateWithoutPersonInput = {
    id?: IntFieldUpdateOperationsInput | number
    spouseId?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SpouseRelationshipUncheckedUpdateManyWithoutPersonInput = {
    id?: IntFieldUpdateOperationsInput | number
    spouseId?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SpouseRelationshipUpdateWithoutSpouseInput = {
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    person?: PersonUpdateOneRequiredWithoutSpouseConnectionsNestedInput
  }

  export type SpouseRelationshipUncheckedUpdateWithoutSpouseInput = {
    id?: IntFieldUpdateOperationsInput | number
    personId?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SpouseRelationshipUncheckedUpdateManyWithoutSpouseInput = {
    id?: IntFieldUpdateOperationsInput | number
    personId?: IntFieldUpdateOperationsInput | number
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PersonCreateManyFamilyInput = {
    id?: number
    firstName: string
    gender: $Enums.Gender
    birthDate?: Date | string | null
    deathDate?: Date | string | null
    phone?: string | null
    fatherId?: number | null
    motherId?: number | null
  }

  export type PersonUpdateWithoutFamilyInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    father?: PersonUpdateOneWithoutFatherChildrenNestedInput
    mother?: PersonUpdateOneWithoutMotherChildrenNestedInput
    fatherChildren?: PersonUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUncheckedUpdateWithoutFamilyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableIntFieldUpdateOperationsInput | number | null
    motherId?: NullableIntFieldUpdateOperationsInput | number | null
    fatherChildren?: PersonUncheckedUpdateManyWithoutFatherNestedInput
    motherChildren?: PersonUncheckedUpdateManyWithoutMotherNestedInput
    spouseConnections?: SpouseRelationshipUncheckedUpdateManyWithoutPersonNestedInput
    spousedByConnections?: SpouseRelationshipUncheckedUpdateManyWithoutSpouseNestedInput
    rootOfFamily?: FamilyUncheckedUpdateOneWithoutRootPersonNestedInput
  }

  export type PersonUncheckedUpdateManyWithoutFamilyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    gender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deathDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    fatherId?: NullableIntFieldUpdateOperationsInput | number | null
    motherId?: NullableIntFieldUpdateOperationsInput | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}