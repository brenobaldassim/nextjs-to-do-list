import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
export interface CreateInnerContextOptions
  extends Partial<FetchCreateContextFnOptions> {}

/**
 * inner context, will always be available in procedures, in contrast to the outer context.
 * also useful for:
 * - testing, so we don't have to mock Next.js' `req`/`res`
 * - tRPC's `createSSGHelpers` where we don't have `req`/`res`
 *
 * @see https://trpc.io/docs/v11/context#inner-and-outer-context
 */
export async function createInnerTRPCContext(opts?: CreateInnerContextOptions) {
  return {
    ...opts,
  };
}

/**
 * outer context, used in the routers and will bring `req` & `res` to the context as "not `undefined`".
 * @see https://trpc.io/docs/v11/context#inner-and-outer-context
 */
export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const innerContext = await createInnerTRPCContext({
    req: opts.req,
    info: opts.info,
  });

  return {
    ...innerContext,
  };
};
