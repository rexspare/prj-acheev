import { ApolloContext, Wrapper } from "../types/types";
import { Application, Router } from "express";
import { readFileSync } from "fs";
import chalk from 'chalk';
import { BaseModelClass } from "../models/baseModel";
import { UserModel } from "../models/userModel";
import Objection, { ColumnRefOrOrderByDescriptor, ModelClass, QueryBuilder } from "objection";
import { Pagination } from "../types/gqlTypings.generated";
import { compact } from "lodash";
import { getSignedImageUrl } from "../vendor/s3router";

export const isDevEnvironment = (): boolean => {
  return process.env.NODE_ENV === 'development';
}
export const isTestEnvironment = (): boolean => process.env.NODE_ENV === 'test';
export const isStagingEnvironment = (): boolean => process.env.NODE_ENV === 'staging';
export const isProdEnviroment = (): boolean => process.env.NODE_ENV === 'production';

export const applyMiddleware = (
  middlewareWrappers: Wrapper[],
  app: Router | Application,
) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(app);
  }
};

export function getGraphqlSchema() {
  const pathToSchema = './dist/src/gqlTypes/schema.graphql';
  return readFileSync(pathToSchema).toString();
}

export const consoleLog = (o: any) => console.info(`${chalk.yellow(`[${new Date().toISOString()}]`)} ${o}`);
export const startupLog = (o: any) => consoleLog(`${chalk.cyan('[Startup]')} ${o}`);


export const random6DigitNumberNonZeroLeading = () => {
  return Math.floor(100000 + (Math.random() * 900000));
}

export const sortUserIds = (inputUserIdOne: string, inputUserIdTwo: string): { userIdOne: string; userIdTwo: string } => {
  const userIds = [inputUserIdOne, inputUserIdTwo].sort();
  return { userIdOne: userIds[0], userIdTwo: userIds[1] };
}

export const requireAdmin = (ctx: ApolloContext, superAdmin?: boolean): void => {
  if (!ctx.isCurrentUserAdmin || (superAdmin && !ctx.isCurrentUserSuperAdmin)) {
    throw new Error('Admin rights required');
  }
};

export const requireAdminOrSelf = (ctx: ApolloContext, userId?: string) => {
  const currentUserId = ctx.currentUser?.id;
  const imitated = !!userId && userId !== currentUserId;
  const userDne = currentUserId === undefined;

  if (!ctx.isCurrentUserAdmin && (userDne || imitated)) {
    throw new Error(userDne ? 'User not provided.' : 'Access to this operation for this user is denied');
  }
};

export const secureTargetUserId = (ctx: ApolloContext, userId?: string): string => {
  requireAdminOrSelf(ctx, userId ?? ctx.currentUser?.id);
  // We can explicit cast here because requireAdminOrSelf checks to make sure at least one user type exists
  return userId ?? ctx.currentUser?.id as string;
};

export const secureTargetUser = (ctx: ApolloContext, userId?: string): QueryBuilder<UserModel, UserModel> => {
  return UserModel.query().findById(secureTargetUserId(ctx, userId)).throwIfNotFound(new Error(`Could not find user by userId ${userId}`)) as QueryBuilder<UserModel, UserModel>;
};

export const insecureTargetUserId = (ctx: ApolloContext, userId?: string): string => {
  if (userId == null && ctx.currentUser?.id == null) {
    throw Error("No user provided");
  }
  return userId ?? ctx.currentUser?.id as string;
};

export const insecureTargetUser = (ctx: ApolloContext, userId?: string): QueryBuilder<UserModel, UserModel> => {
  if (userId == null && ctx.currentUser?.id == null) {
    throw Error("No user provided");
  }
  const resolvedUserId = userId ?? ctx.currentUser?.id as string;
  return UserModel.query().findById(resolvedUserId).throwIfNotFound(new Error(`Could not find user by userId ${userId}`)) as QueryBuilder<UserModel, UserModel>;
};

export const getAppUrl = () => {
  return isDevEnvironment() ? 'http://localhost:3120' : "https://acheevapp.io";
}

export const recordCount = async <T extends BaseModelClass>(model: ModelClass<T>): Promise<number> => {
  return (await model.query().count('id').first() as any).count
};

export const queryRecordCount = async <T extends BaseModelClass>(query: Objection.QueryBuilderType<T>): Promise<number> => {
  return (await query.count('id').first() as any).count
};

export const paginate = <T extends BaseModelClass>(query: QueryBuilder<T, T[]>, pagination:
  Pagination | undefined, limit: number = 50): QueryBuilder<T, T[]> => {
  const resolvedLimit = pagination?.limit ?? limit;

  if (pagination == null) {
    return query.limit(resolvedLimit);
  }

  const { orderBy, page } = pagination;
  const ordering: ColumnRefOrOrderByDescriptor[] =
    compact(orderBy).map(item => ({ column: item.column, order: item.direction }));
  return query.orderBy(ordering).limit(resolvedLimit).offset((page ?? 0) * resolvedLimit);
};

type ExtractKeys<T extends { [k: string]: any }> = T extends infer G ? `${(string & keyof G)}` : never;
type CamelToSnake<T extends string, P extends string = ""> = string extends T ? string :
  T extends `${infer C0}${infer R}` ?
  CamelToSnake<R, `${P}${C0 extends Lowercase<C0> ? "" : "_"}${Lowercase<C0>}`> : P
type ColumnKey<T extends BaseModelClass> = CamelToSnake<ExtractKeys<T>>;

export const searchColumn = <T extends BaseModelClass>(query: QueryBuilder<T, T[]>, column: ColumnKey<T>, search?: string, isOrQuery?: boolean): QueryBuilder<T, T[]> => {
  if (search == null) {
    return query;
  }
  const rawQuery = `LOWER(${column}) LIKE '%' || LOWER(?) || '%' `;
  return !!isOrQuery ? query.orWhereRaw(rawQuery, search) : query.whereRaw(rawQuery, search);
};

export const searchColumns = <T extends BaseModelClass>(query: QueryBuilder<T, T[]>, columns: ColumnKey<T>[], search?: string, orQuery?: boolean): QueryBuilder<T, T[]> => {
  if (search == null) {
    return query;
  }

  const reduced = (q: any) => columns.reduce<QueryBuilder<T, T[]>>((curr, next) => searchColumn(curr, next, search, true), q);

  return !!orQuery ? query.orWhere(reduced) : query.andWhere(reduced);
};

export const getS3Image = (imageUrl?: string): string | undefined => {
  if (imageUrl?.includes('acheev.s3')) {
    const key = imageUrl.substring(imageUrl.indexOf('uploads'));
    console.log('key', key);
    return getSignedImageUrl(key);
  }

  return imageUrl;
}
