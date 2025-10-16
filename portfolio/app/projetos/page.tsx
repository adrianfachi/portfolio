"use client";

import Body from "../_components/Body";
import { useEffect, useState } from "react";
import SideBarProjects from "../_components/SideBarProjects";
import Project from "../_components/Project";
import projects from "../_lib/projects";

export default function Projects() {
  const [checkedLanguages, setCheckedLanguages] = useState<string[]>([
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Tailwind",
    "Next.JS",
    "Java",
  ]);

  const handleUnchecked = (index: number) => {
    setCheckedLanguages((prev) => {
      const newTabs = prev.filter((_, i) => i !== index);

      return newTabs;
    });
  };

  const [filteredProjects, setFilteredProjects] = useState<typeof projects>([]);

  useEffect(() => {
    const visibleProjects = projects.filter(project =>
      checkedLanguages.some(language => project.languages.includes(language))
    );

    const timeout = setTimeout(() => {
      setFilteredProjects(visibleProjects);
    }, 400);

    return () => clearTimeout(timeout);
  }, [projects, checkedLanguages, 400]);

  return (
    <Body navBarActive="projetos">
      <div className="flex-grow flex flex-col h-full w-full md:flex-row">
        <SideBarProjects
          setCheckedLanguages={setCheckedLanguages}
          handleUnchecked={handleUnchecked}
          checkedLanguages={checkedLanguages}
        />
        <div className="p-4 md:p-10 flex flex-wrap gap-6 justify-center h-fit">
          {filteredProjects.map((project, i) => (
            <Project
              name={project.name}
              image={project.image}
              caption={project.caption}
              link={project.link}
              number={i + 1}
              key={i}
              isVisible={checkedLanguages.some((language) => project.languages.includes(language))}
            />
          ))}
        </div>
      </div>
    </Body>
  );
}
