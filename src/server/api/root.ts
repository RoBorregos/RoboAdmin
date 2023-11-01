import { exampleRouter } from "rbrgs/server/api/routers/example";
import { createTRPCRouter } from "rbrgs/server/api/trpc";
import { testRouter } from "rbrgs/server/api/routers/test";
import { sponsorRouter } from "rbrgs/server/api/routers/sponsor";
import { githubApiRouter } from "rbrgs/server/api/routers/github_api";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  test: testRouter,
  githubApi: githubApiRouter,
  sponsor: sponsorRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
