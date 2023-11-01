import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "rbrgs/server/api/trpc";

export const membersRouter = createTRPCRouter({

    addMember: publicProcedure
        .input(z.object({
            id: z.number(), name: z.string(), lastname: z.string(), role: z.string(), subtitle: z.string(), class: z.string(), semesters: z.string(), status: z.string(), description: z.string(), github: z.string(), github_user: z.string(), linkedin: z.string(), tags: z.string(), image: z.string()
        }))
        .mutation(({ input, ctx }) => {
            return ctx.db.member.create({
                data: {
                    id: input.id,
                    name: input.name,
                    lastname: input.lastname,
                    role: input.role,
                    subtitle: input.subtitle,
                    class: input.class,
                    semesters: input.semesters,
                    status: input.status,
                    description: input.description,
                    github: input.github,
                    github_user: input.github_user,
                    linkedin: input.linkedin,
                    tags: input.tags,
                    image: input.image
                }
            })

        }),

    getLastMember: publicProcedure
        .query(({ ctx }) => {
            return ctx.db.member.findFirst({
                orderBy: {
                    id: "desc"
                },
                select: {
                    id: true,
                }
            })
        }),

    updateMember: publicProcedure
        .input(z.object({
            id: z.number(), name: z.string(), lastname: z.string(), role: z.string(), subtitle: z.string(), class: z.string(), semesters: z.string(), status: z.string(), description: z.string(), github: z.string(), github_user: z.string(), linkedin: z.string(), tags: z.string()
        }))
        .mutation(({ input, ctx }) => {
            return ctx.db.member.update({
                data: {
                    name: input.name,
                    lastname: input.lastname,
                    role: input.role,
                    subtitle: input.subtitle,
                    class: input.class,
                    semesters: input.semesters,
                    status: input.status,
                    description: input.description,
                    github: input.github,
                    github_user: input.github_user,
                    linkedin: input.linkedin,
                    tags: input.tags,
                },
                where: {
                    id: input.id
                }
            })
        }),

    getMembers: publicProcedure
        .query(({ ctx }) => {
            return ctx.db.member.findMany({
                select: {
                    id: true,
                    name: true,
                    lastname: true,
                    role: true,
                    subtitle: true,
                    class: true,
                    semesters: true,
                    status: true,
                    description: true,
                    github: true,
                    github_user: true,
                    linkedin: true,
                    tags: true,
                    image: true
                },
                orderBy: {
                    id: "asc"
                }
            })
        }),

    deleteMember: publicProcedure
        .input(z.number())
        .mutation(({ input, ctx }) => {
            return ctx.db.member.delete({
                where: {
                    id: input
                }        
            })
    }),

    getFilteredMembers: publicProcedure
        .input(
            z.string())
        .query(({ ctx, input }) => {
            console.log(input)
            return ctx.db.member.findMany({
                select: {
                    id: true,
                    name: true,
                    lastname: true,
                    role: true,
                    subtitle: true,
                    class: true,
                    semesters: true,
                    status: true,
                    description: true,
                    github: true,
                    github_user: true,
                    linkedin: true,
                    tags: true,
                    image: true
                },
                where: {
                    OR: [
                        {
                            name: {
                                contains: input.charAt(0).toUpperCase() + input.slice(1),
                            }
                        },
                        {
                            role: {
                                contains: input.charAt(0).toUpperCase() + input.slice(1),
                            }
                        },
                        {
                            subtitle: {
                                contains: input.charAt(0).toUpperCase() + input.slice(1),
                            }
                        },
                        {
                            class: input
                        },
                        {
                            semesters: input
                        },
                        {
                            status: input
                        }

                    ]
                },
                orderBy: {
                    id: "asc"
                }
                // }, where: {
                //     OR: [
                //         {
                //             name: input
                //         }
                //     ]
                // }
            })
        })




});