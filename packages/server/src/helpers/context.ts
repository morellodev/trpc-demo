import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { prisma } from "../lib/prisma";

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  return {
    req,
    res,
    prisma,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
