"use client"

import Body from "../_components/Body";
import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";
import { useState } from "react";
import SideBarProjects from "../_components/SideBarProjects";
import Project from "../_components/Project";
import projects from "../_lib/projects";

export default function Projects() {
  const [activeMenu, setActiveMenu] = useState<boolean>(false)
  const [ checkedLanguages, setCheckedLanguages] = useState<string[]>(["React"])
  let index = 1

  const handleUnchecked = (index: number) => {
    setCheckedLanguages((prev) => {
      const newTabs = prev.filter((_, i) => i !== index);

      return newTabs;
    });
  };

  return (
    <Body>
       <NavBar active="projetos" setActiveBoolean={setActiveMenu}/>
       {!activeMenu ? 
       <>
       <div className="flex-grow flex flex-col h-full w-full md:flex-row">
        <SideBarProjects setCheckedLanguages={setCheckedLanguages} handleUnchecked={handleUnchecked} checkedLanguages={checkedLanguages}/>
        <div className="p-4 md:p-10 flex flex-wrap gap-3 justify-center">
          {projects.map((project) => {
            const hasLanguage = checkedLanguages.some(language => project.languages.includes(language));
            return (
              <>
              {hasLanguage ? 
                <Project name={project.name} image={project.image} caption={project.caption} link={project.link} number={index++} key={index}/>
              :null}
              </>
            )
          })}
        </div>
       </div>
       <Footer/>
       </>
       : null}
    </Body>
  );
}