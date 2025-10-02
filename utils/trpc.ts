import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";
import type { AppRouter } from "@/server/routers/_app";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { ssrPrepass } from "@trpc/next/ssrPrepass";

// @see https://trpc.io/docs/v11/react#3-create-trpc-hooks
export const trpc = createTRPCNext<AppRouter>({
  transformer: superjson,
  ssr: true,
  ssrPrepass,
  config(opts) {
    const { ctx } = opts;
    if (typeof window !== "undefined") {
      // during client requests
      return {
        links: [
          loggerLink({
            enabled: (opts) =>
              process.env.NODE_ENV === "development" ||
              (opts.direction === "down" && opts.result instanceof Error),
          }),
          httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
            transformer: superjson,
          }),
        ],
      };
    }
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (!ctx?.req?.headers) {
              return {};
            }
            return {
              cookie: ctx.req.headers.cookie,
            };
          },
          transformer: superjson,
        }),
      ],
    };
  },
});
