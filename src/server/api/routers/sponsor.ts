import { z } from "zod";

import { BenefitsModel, SponsorModel, SponsorPackModel } from "rbrgs/zod/types";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "rbrgs/server/api/trpc";

// TODO: add proper authorization

export const sponsorRouter = createTRPCRouter({
  getSponsorsIds: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.sponsor.findMany({ select: { id: true } });
  }),
  getSponsorById: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
      }),
    )
    .query(async ({ input, ctx }) => {
      if (!input.id) {
        return null;
      }
      return await ctx.db.sponsor.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  createOrUpdateSponsor: publicProcedure
    .input(SponsorModel)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.sponsor.upsert({
          where: {
            id: input.id ?? "-1",
          },
          update: {
            ...input,
          },
          create: {
            ...input,
          },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }),

  deleteSponsorById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.sponsor.delete({
          where: {
            id: input.id,
          },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
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
