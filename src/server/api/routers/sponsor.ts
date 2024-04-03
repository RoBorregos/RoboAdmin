import { z } from "zod";
import { SponsorsInfo } from "rbrgs/utils/jsonread";
import { SponsorModel, SponsorPackModel } from "rbrgs/zod/types";
import { jsonSponsorFormat } from "rbrgs/zod/types";

import { generateSponsorsJson } from "rbrgs/utils/jsongen";

import { cleanSponsorHistory } from "rbrgs/server/api/routers/historyUtils";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "rbrgs/server/api/trpc";
import {
  createBranch,
  isBranchAvailable,
  updateFileFromBranch,
} from "rbrgs/server/github_api_utils";

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
        orderBy: {
          order: "asc",
        },
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
        orderBy: {
          order: "asc",
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
              order: true,
            },
            orderBy: {
              order: "asc",
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
            order: input.order,
            benefits: {
              deleteMany: {},
              create: input.items,
            },
          },
          create: {
            order: input.order,
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
        orderBy: {
          order: "asc",
        },
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
  fetchSponsors: protectedProcedure
    .input(z.object({ url: z.string().optional().nullable() }))
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
        await ctx.db.$transaction(
          async (prisma) => {
            const prevJson = await generateSponsorsJson({ db: ctx.db });

            // Only add the previous json if it is valid
            if (typeof prevJson === "string") {
              await prisma.sponsorHistory.create({
                data: {
                  json: prevJson,
                  userId: ctx.session.user.id,
                },
              });
            }

            await prisma.benefits.deleteMany({});
            await prisma.sponsor.deleteMany({});
            await prisma.sponsorPack.deleteMany({});

            for (const sponsor of sponsorInfo.sponsors) {
              await prisma.sponsor.create({
                data: {
                  name: sponsor.name,
                  url: sponsor.link,
                  img_path: sponsor.img_path,
                },
              });
            }

            for (const sponsorPackage of sponsorInfo.packages) {
              await prisma.sponsorPack.create({
                data: {
                  name: sponsorPackage.name,
                  benefits: {
                    create: sponsorPackage.benefits.map((benefit) => ({
                      enDescription: benefit.en,
                      esDescription: benefit.es,
                    })),
                  },
                },
              });
            }

            // Maintain only the last 15 history elements
            await cleanSponsorHistory({ db: prisma });
          },
          {
            timeout: 10000,
          },
        );

        return true;
      } catch (err) {
        console.log("Error: ", err);
        return false;
      }
    }),

  restoreJson: protectedProcedure
    .input(z.object({ historyId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Fetch json
      const json = await ctx.db.sponsorHistory.findUnique({
        where: {
          id: input.historyId,
        },
        select: {
          json: true,
        },
      });

      if (!json) {
        return "No se encontró el elemento en el historial";
      }

      // Parse json
      try {
        // Save current db elements into history and delete all current elements
        const sponsorInfo = jsonSponsorFormat.parse(JSON.parse(json.json));

        await ctx.db.$transaction(
          async (prisma) => {
            const prevJson = await generateSponsorsJson({ db: ctx.db });

            // Only add the previous json if it is valid
            if (typeof prevJson === "string") {
              await prisma.sponsorHistory.create({
                data: {
                  json: prevJson,
                  userId: ctx.session.user.id,
                },
              });
            }

            await prisma.benefits.deleteMany({});
            await prisma.sponsor.deleteMany({});
            await prisma.sponsorPack.deleteMany({});

            for (const sponsor of sponsorInfo.sponsors) {
              await prisma.sponsor.create({
                data: {
                  name: sponsor.name,
                  url: sponsor.link,
                  img_path: sponsor.img_path,
                },
              });
            }

            for (const sponsorPackage of sponsorInfo.packages) {
              await prisma.sponsorPack.create({
                data: {
                  name: sponsorPackage.name,
                  benefits: {
                    create: sponsorPackage.benefits.map((benefit) => ({
                      enDescription: benefit.en,
                      esDescription: benefit.es,
                    })),
                  },
                },
              });
            }

            // Maintain only the last 15 history elements
            await cleanSponsorHistory({ db: prisma });
          },
          {
            timeout: 10000,
          },
        );

        return true;
      } catch (err) {
        console.log("Error: ", err);
        return false;
      }
    }),

  // From the database, generate a json file with the sponsors information
  // and make a commit to the repository
  // postSponsors: publicProcedure.mutation(async ({ input, ctx }) => {}),

  // Get the history of the sponsors information
  getSponsorsHistory: publicProcedure
    .input(z.object({ search: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.sponsorHistory.findMany({
        where: {
          json: {
            contains: input.search ?? "",
            mode: "insensitive",
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
        },
      });
    }),

  getSponsorHistoryById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.sponsorHistory.findUnique({
        where: {
          id: input.id,
        },
        select: {
          updatedAt: true,
          json: true,
          User: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
    }),

  uploadToRepository: protectedProcedure.mutation(async ({ ctx }) => {
    const sponsorBranch = "sponsors";
    const owner = "RoBorregos";
    const repo = "roborregos-web";
    const baseBranch = "develop";

    if (!(await isBranchAvailable({ branch: sponsorBranch, owner, repo }))) {
      await createBranch(owner, repo, baseBranch, sponsorBranch);
    }

    const content = await generateSponsorsJson({ db: ctx.db });
    const filePath = "src/data/sponsors.json";

    if (typeof content === "number") {
      throw new Error("Failed to generate sponsors information.");
    }

    await updateFileFromBranch(
      owner,
      repo,
      sponsorBranch,
      filePath,
      content,
      "Update sponsors information. ",
    );

    return "Successfuly updated sponsors information.";
  }),
});
