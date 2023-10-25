import { z } from "zod";

import { BenefitsModel, SponsorModel, SponsorPackModel } from "rbrgs/zod/types";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "rbrgs/server/api/trpc";

// TODO: add proper authorization

export const sponsorRouter = createTRPCRouter({
  getSponsors: publicProcedure
    .input(
      z.object({
        texto: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      await ctx.db.sponsor.findMany();
    }),

  createOrUpdateSponsor: publicProcedure
    .input(SponsorModel)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.sponsor.upsert({
        where: {
          id: input.id,
        },
        update: {
          ...input,
        },
        create: {
          ...input,
        },
      });
    }),

  getSponsorPacks: publicProcedure
    .input(
      z.object({
        texto: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      await ctx.db.sponsorPack.findMany();
    }),

  createOrUpdateSponsorPack: publicProcedure
    .input(SponsorPackModel)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.sponsorPack.upsert({
        where: {
          id: input.id,
        },
        update: {
          ...input,
        },
        create: {
          ...input,
        },
      });
    }),

  getBenefits: publicProcedure
    .input(
      z.object({
        texto: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      await ctx.db.benefits.findMany();
    }),

  createOrUpdateBenefit: publicProcedure
    .input(BenefitsModel)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.benefits.upsert({
        where: {
          id: input.id,
        },
        update: {
          ...input,
        },
        create: {
          ...input,
        },
      });
    }),
});
