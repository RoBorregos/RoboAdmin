import { z } from "zod";

import { BenefitsModel, SponsorModel, SponsorPackModel } from "rbrgs/zod/types";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "rbrgs/server/api/trpc";

// TODO: add proper authorization

export const sponsorRouter = createTRPCRouter({
  getSponsorsIds: publicProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.sponsor.findMany({
        where: {
          OR: [
            { name: { contains: input.search ?? "", mode: "insensitive" } },
            { url: { contains: input.search ?? "", mode: "insensitive" } },
            { img_path: { contains: input.search ?? "", mode: "insensitive" } },
          ],
        },
        select: { id: true },
      });
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

  getSponsorPacksIds: publicProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.sponsorPack.findMany({
        where: {
          benefits: {
            some: {
              OR: [
                {
                  enDescription: {
                    contains: input.search ?? "",
                    mode: "insensitive",
                  },
                },
                {
                  esDescription: {
                    contains: input.search ?? "",
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
          name: { contains: input.search ?? "", mode: "insensitive" },
        },
        select: {
          id: true,
        },
      });
    }),

  getSponsorPacksById: publicProcedure
    .input(z.object({ id: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.sponsorPack.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  createOrUpdateSponsorPack: publicProcedure
    .input(SponsorPackModel)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.sponsorPack.upsert({
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
    }),

  getBenefitsIds: publicProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.benefits.findMany({
        where: {
          enDescription: { contains: input.search ?? "", mode: "insensitive" },
          esDescription: { contains: input.search ?? "", mode: "insensitive" },
        },
        select: { id: true },
      });
    }),

  getBenefitById: publicProcedure
    .input(z.object({ id: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.benefits.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          esDescription: true,
          enDescription: true,
          updatedAt: true,
        },
      });
    }),

  createOrUpdateBenefit: publicProcedure
    .input(BenefitsModel)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.benefits.upsert({
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

  deleteBenefitById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.benefits.delete({
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
});
