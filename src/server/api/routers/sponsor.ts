import { z } from "zod";
import { SponsorsInfo } from "rbrgs/utils/jsonread";
import { SponsorModel, SponsorPackModel } from "rbrgs/zod/types";

import { generateSponsorsJson } from "rbrgs/utils/jsongen";

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
      console.log("Search:");
      console.log(input.search);
      return await ctx.db.sponsorPack.findMany({
        where: {
          OR: [
            {
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
            },
            { name: { contains: input.search ?? "", mode: "insensitive" } },
          ],
        },
        select: {
          id: true,
        },
      });
    }),

  getSponsorPackById: publicProcedure
    .input(z.object({ id: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.sponsorPack.findUnique({
        where: {
          id: input.id,
        },
        include: {
          benefits: {
            select: {
              enDescription: true,
              esDescription: true,
              id: true,
            },
            orderBy: {
              enDescription: "asc",
            },
          },
        },
      });
    }),

  createOrUpdateSponsorPack: publicProcedure
    .input(SponsorPackModel)
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.sponsorPack.upsert({
          where: {
            id: input.id ?? "-1",
          },
          update: {
            name: input.name,
            benefits: {
              deleteMany: {},
              create: input.items,
            },
          },
          create: {
            name: input.name,
            benefits: {
              create: input.items,
            },
          },
        });
      } catch (error) {
        console.log(error);
        return false;
      }

      return true;
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

  // Get sponsors from the provided url and update the sponsors
  // information in the database. Save a copy of the previous sponsors
  fetchSponsors: publicProcedure
    .input(z.object({ url: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const sponsorInfo = input?.url
        ? await SponsorsInfo({ url: input.url })
        : await SponsorsInfo({});

      if (typeof sponsorInfo === "string") {
        // If there was an error, return the error message
        return sponsorInfo;
      }

      // Delete all previous elements and add all new ones
      try {
        await ctx.db.$transaction(async (prisma) => {
          const prevJson = await generateSponsorsJson({ db: ctx.db });

          // Only add the previous json if it is valid
          if (typeof prevJson === "string") {
            await prisma.sponsorHistory.create({
              data: {
                json: prevJson,
              },
            });
          }

          await prisma.benefits.deleteMany({});
          await prisma.sponsor.deleteMany({});
          await prisma.sponsorPack.deleteMany({});

          sponsorInfo.sponsors.forEach(async (sponsor) => {
            await prisma.sponsor.create({
              data: {
                name: sponsor.name,
                url: sponsor.link,
                img_path: sponsor.img_path,
              },
            });
          });

          sponsorInfo.packages.forEach(async (pack) => {
            await prisma.sponsorPack.create({
              data: {
                name: pack.name,
                benefits: {
                  create: pack.benefits.map((benefit) => ({
                    enDescription: benefit.en,
                    esDescription: benefit.es,
                  })),
                },
              },
            });
          });

          // Maintain only the last 15 history elements
          const maintainItems = await prisma.sponsorHistory.findMany({
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
            },
            take: 15,
          });

          await prisma.sponsorHistory.deleteMany({
            where: {
              id: {
                notIn: maintainItems.map((item) => item.id),
              },
            },
          });
        });

        return true;
      } catch (err) {
        console.log("Error: ", err);
        return false;
      }
    }),

  // From the database, generate a json file with the sponsors information
  // and make a commit to the repository
  postSponsors: publicProcedure.mutation(async ({ input, ctx }) => {
    return await ctx.db.sponsor.findMany({
      select: {
        id: true,
        name: true,
        url: true,
        img_path: true,
      },
    });
  }),
});
