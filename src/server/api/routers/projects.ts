import { z } from "zod";
import axios from "axios";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "rbrgs/server/api/trpc";


interface ProyectProps {
    typeProject: string
    priority: string
    title: string
    description: string
    wiki: string
    image: string
    color: string
    background: string
}

export const projectRouter = createTRPCRouter({
    resetDBProjects: publicProcedure
        .mutation(async ({ctx }) => {
            const response = await axios.get("https://raw.githubusercontent.com/RoBorregos/roborregos-web/develop/src/data/projects.json")
            const data: {
                main: ProyectProps[],
                carrousel:ProyectProps[][],
                other:ProyectProps[]
            } = response.data
            const { main, carrousel, other } = data

            await ctx.db.projects.deleteMany()
            
            await ctx.db.projects.createMany({
                data:
                    main.map((project: ProyectProps) => {
                        return {
                            priority: project.priority,
                            title: project.title,
                            description: project.description,
                            wiki: project.wiki,
                            image: project.image,
                            color: project.color,
                            background: project.background,
                            typeProject: "main"
                        }
                    }).concat(carrousel[0]?carrousel[0].map((project: ProyectProps)=>{
                        return {
                            priority: project.priority,
                            title: project.title,
                            description: project.description,
                            wiki: project.wiki,
                            image: project.image,
                            color: project.color,
                            background: project.background,
                            typeProject: "carrousel"
                        }
                    }):[]).concat(carrousel[1]?carrousel[1].map((project: ProyectProps)=>{
                        return {
                            priority: project.priority,
                            title: project.title,
                            description: project.description,
                            wiki: project.wiki,
                            image: project.image,
                            color: project.color,
                            background: project.background,
                            typeProject: "carrousel"
                        }
                    }):[]).concat(other.map((project: ProyectProps)=>{
                        return {
                            priority: project.priority,
                            title: project.title,
                            description: project.description,
                            wiki: project.wiki,
                            image: project.image,
                            color: project.color,
                            background: project.image,
                            typeProject: "other"
                        }
                    }))
                
            })

        }),
    getProjects:publicProcedure
        .input(
            z.object({
                typeProject:z.string()
            })
        )
        .query(async({input,ctx})=>{
        return await ctx.db.projects.findMany({
            where:{
                typeProject:input.typeProject
            }
        })
    }),

    updateProject:publicProcedure
        .input(
            z.object({
                id:z.string(),
                title:z.string(),
                description:z.string(),
                wiki:z.string(),
            })
        )
        .mutation(async({input,ctx})=>{
            await ctx.db.projects.update({
                where:{
                    id:input.id
                },
                data:{
                    title:input.title,
                    description:input.description,
                    wiki:input.wiki,
                }
            })
        })
    

});