import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
  _FieldSet: any;
};






export type File = {
  __typename?: 'File';
  id: Scalars['ID'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  path: Scalars['String'];
};

export type GeneralError = {
  __typename?: 'GeneralError';
  message: Scalars['String'];
};

export type LoginRespone = {
  __typename?: 'LoginRespone';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<UserEntity>;
};

export type MatchEntity = {
  __typename?: 'MatchEntity';
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signUpUser?: Maybe<SignUpUserResult>;
  imageUpload: File;
};


export type MutationSignUpUserArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


export type MutationImageUploadArgs = {
  file: Scalars['Upload'];
};

export type PhoneEntity = {
  __typename?: 'PhoneEntity';
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<UserEntity>;
  user?: Maybe<UserEntity>;
  users?: Maybe<Array<Maybe<UserEntity>>>;
  loginUser?: Maybe<LoginRespone>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryLoginUserArgs = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type SignUpUserResult = {
  __typename?: 'SignUpUserResult';
  token?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  error?: Maybe<GeneralError>;
};


export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
  phone?: Maybe<PhoneEntity>;
  matches?: Maybe<Array<MatchEntity>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  UserEntity: ResolverTypeWrapper<UserEntity>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  PhoneEntity: ResolverTypeWrapper<PhoneEntity>;
  MatchEntity: ResolverTypeWrapper<MatchEntity>;
  LoginRespone: ResolverTypeWrapper<LoginRespone>;
  Mutation: ResolverTypeWrapper<{}>;
  SignUpUserResult: ResolverTypeWrapper<SignUpUserResult>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  GeneralError: ResolverTypeWrapper<GeneralError>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  File: ResolverTypeWrapper<File>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  UserEntity: UserEntity;
  ID: Scalars['ID'];
  String: Scalars['String'];
  PhoneEntity: PhoneEntity;
  MatchEntity: MatchEntity;
  LoginRespone: LoginRespone;
  Mutation: {};
  SignUpUserResult: SignUpUserResult;
  Boolean: Scalars['Boolean'];
  GeneralError: GeneralError;
  Upload: Scalars['Upload'];
  File: File;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<Maybe<ResolversTypes['UserEntity']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserEntity']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserEntity']>>>, ParentType, ContextType>;
  loginUser?: Resolver<Maybe<ResolversTypes['LoginRespone']>, ParentType, ContextType, RequireFields<QueryLoginUserArgs, never>>;
}>;

export type UserEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserEntity'] = ResolversParentTypes['UserEntity']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['UserEntity']>, { __typename: 'UserEntity' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['PhoneEntity']>, ParentType, ContextType>;
  matches?: Resolver<Maybe<Array<ResolversTypes['MatchEntity']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type PhoneEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['PhoneEntity'] = ResolversParentTypes['PhoneEntity']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['PhoneEntity']>, { __typename: 'PhoneEntity' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;

  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MatchEntityResolvers<ContextType = any, ParentType extends ResolversParentTypes['MatchEntity'] = ResolversParentTypes['MatchEntity']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['MatchEntity']>, { __typename: 'MatchEntity' } & GraphQLRecursivePick<ParentType, {"id":true}>, ContextType>;

  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type LoginResponeResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginRespone'] = ResolversParentTypes['LoginRespone']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['UserEntity']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  signUpUser?: Resolver<Maybe<ResolversTypes['SignUpUserResult']>, ParentType, ContextType, RequireFields<MutationSignUpUserArgs, never>>;
  imageUpload?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<MutationImageUploadArgs, 'file'>>;
}>;

export type SignUpUserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignUpUserResult'] = ResolversParentTypes['SignUpUserResult']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['GeneralError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type GeneralErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['GeneralError'] = ResolversParentTypes['GeneralError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  UserEntity?: UserEntityResolvers<ContextType>;
  PhoneEntity?: PhoneEntityResolvers<ContextType>;
  MatchEntity?: MatchEntityResolvers<ContextType>;
  LoginRespone?: LoginResponeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  SignUpUserResult?: SignUpUserResultResolvers<ContextType>;
  GeneralError?: GeneralErrorResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
