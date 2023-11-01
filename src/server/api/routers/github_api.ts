import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "rbrgs/server/api/trpc";
import {
  createBranch,
  addFileToBranch,
  deleteFileFromBranch,
  mergeBranch,
  createPullRequest,
  updateFileFromBranch,
} from "rbrgs/utils/github_api_utils";

export const githubApiRouter = createTRPCRouter({
  createBranch: protectedProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        baseBranch: z.string(),
        newBranch: z.string(),
        token: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await createBranch(
        input.owner,
        input.repo,
        input.baseBranch,
        input.newBranch,
        input.token,
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
        token: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await addFileToBranch(
        input.owner,
        input.repo,
        input.branch,
        input.filePath,
        Buffer.from(input.fileContent, "base64"),
        input.commitMessage,
        input.token,
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
        token: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await updateFileFromBranch(
        input.owner,
        input.repo,
        input.branch,
        input.filePath,
        Buffer.from(input.fileContent, "base64"),
        input.commitMessage,
        input.token,
      );
    }),

  deleteFileFromBranch: protectedProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        branch: z.string(),
        filePath: z.string(),
        commitMessage: z.string(),
        token: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await deleteFileFromBranch(
        input.owner,
        input.repo,
        input.branch,
        input.filePath,
        input.commitMessage,
        input.token,
      );
    }),

  mergeBranch: protectedProcedure
    .input(
      z.object({
        owner: z.string(),
        repo: z.string(),
        baseBranch: z.string(),
        headBranch: z.string(),
        token: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      await mergeBranch(
        input.owner,
        input.repo,
        input.baseBranch,
        input.headBranch,
        input.token,
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
        token: z.string(),
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
        input.token,
      );
    }),
});