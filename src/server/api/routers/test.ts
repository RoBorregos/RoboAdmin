import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "rbrgs/server/api/trpc";




export const testRouter = createTRPCRouter({
  test1: publicProcedure
    .input(
      z.object({
        texto: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.example.create({
        data: {
          name: input.texto,
        },
      });
    }),
    
  test2: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.example.findMany();
  }),
});
