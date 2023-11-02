import CardMainProject from "rbrgs/components/CardMainProject";
import React, { useState } from "react";
import NavBar from "rbrgs/components/NavBar";
import { api } from "rbrgs/utils/api";
import { MyApp } from "rbrgs/components/pruebitas";

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

export default function ProjectPage() {



  const dataMain = api.projects.getProjects.useQuery({ typeProject: "main" })
  const dataCarrousel = api.projects.getProjects.useQuery({ typeProject: "carrousel" })


  return (<>
    <NavBar />
    <div className="bg-slate-800 text-white flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">

        <h3 className="p-3 text-2xl font-semibold " >Main Projects</h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 h-screen px-2 py-3">
       
          {dataMain.data?.map((project) => (
            <div key={project.id} >
              <CardMainProject
                title={project.title}
                description={project.description ? project.description : ""}
                wiki={project.wiki}
                image={project.image ? project.image : ""}
                editable={false}
                id={project.id} />
            </div>
          ))}
        </div>

        <h3 className="p-3 self-center text-2xl font-semibold " >Carrousel Projects</h3>
        <div className="grid grid-cols-2 gap-2 px-5 mb-3">
          {dataCarrousel.data?.map((project) => (
            <div key={project.id} >
              <CardMainProject
                title={project.title}
                description={project.description ? project.description : ""}
                wiki={project.wiki}
                image={project.image ? project.image : ""}
                editable={false}
                id={project.id} />
            </div>
          ))}
        </div>


        <h3>Other Projects</h3>
        <div className="grid grid-cols-2 gap-2 px-5 mb-3">

          
          
        </div>


    


      </div>

    </div>
  </>)

}  
