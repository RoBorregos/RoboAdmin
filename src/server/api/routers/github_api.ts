import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "rbrgs/server/api/trpc";
import {
  createBranch,
  addFileToBranch,
  createPullRequest,
  updateFileFromBranch,
} from "rbrgs/server/github_api_utils";


export const githubApiRouter = createTRPCRouter({
  createBranch: protectedProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        baseBranch: z.string(),
        newBranch: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await createBranch(
        input.owner,
        input.repo,
        input.baseBranch,
        input.newBranch,
      );
    }),

  addFileToBranch: protectedProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        branch: z.string(),
        filePath: z.string(),
        fileContent: z.string(),
        commitMessage: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await addFileToBranch(
        input.owner,
        input.repo,
        input.branch,
        input.filePath,
        input.fileContent,
        input.commitMessage,
      );
    }),

  updateFileFromBranch: protectedProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        branch: z.string(),
        filePath: z.string(),
        fileContent: z.string(),
        commitMessage: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await updateFileFromBranch(
        input.owner,
        input.repo,
        input.branch,
        input.filePath,
        input.fileContent,
        input.commitMessage,
      );
    }),

  createPullRequest: protectedProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        baseBranch: z.string(),
        headBranch: z.string(),
        title: z.string(),
        body: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await createPullRequest(
        input.owner,
        input.repo,
        input.baseBranch,
        input.headBranch,
        input.title,
        input.body,
      );
    }),
});
