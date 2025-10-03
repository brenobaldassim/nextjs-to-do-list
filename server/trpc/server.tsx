import "server-only"; // ensure this file cannot be imported from the client
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { createCallerFactory } from "./";
import { createInnerTRPCContext } from "./context";
import { makeQueryClient } from "./query-client";
import { appRouter } from "../routers/_app";

export const getQueryClient = cache(makeQueryClient);
const caller = createCallerFactory(appRouter)(createInnerTRPCContext);
export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient
);
