import { Request } from "express";
import { PrismaClient } from "@prisma/client";

export const client = new PrismaClient();
export type ReqBody<T> = Request<{}, {}, T>;
export type ReqParams<T> = Request<T>;
export type ReqParamsBody<T, K> = Request<T, {}, K>;
export type ReqQuery<T> = Request<{}, {}, {}, T>;
export type ReqParamsQuery<T, K> = Request<T, {}, {}, K>;
