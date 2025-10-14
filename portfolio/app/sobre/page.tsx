"use client";

import { useState } from "react";
import Body from "../_components/Body";
import SideBarAbout from "../_components/SideBarAbout";
import TabsAbout from "../_components/TabsAbout";
import TextArea from "../_components/TextArea";
import textAbout from "../_lib/textAbout";

export default function About() {
  const [activeTabs, setActiveTabs] = useState<string[]>(["Minha bio"]);
  const [activeTab, setActiveTab] = useState<string>("Minha bio");
  const [lastActiveTab, setLastActiveTab] = useState<string>("");

  const handleCloseTab = (index: number) => {
    setActiveTabs((prevTabs) => {
      const newTabs = prevTabs.filter((_, i) => i !== index);
      const nextTab =
        newTabs.length === 0
          ? ""
          : newTabs.includes(lastActiveTab)
            ? lastActiveTab
            : newTabs[Math.max(0, index - 1)];

      setActiveTab(nextTab);
      return newTabs;
    });
  };

  const handleOpenTab = (tab: string) => setActiveTab(tab);

  const tabContent: Record<string, { title: string; text: string }> = {
    "Minha bio": { title: "Minha bio", text: textAbout.bio },
    "Grupo de estudos": {
      title: "Grupo de estudos",
      text: textAbout.grupoEstudos,
    },
    Hackatona: { title: "Hackatona", text: textAbout.hackatona },
    "Objetivo profissional": {
      title: "Objetivo Profissional",
      text: textAbout.objetivoProfissional,
    },
    Sociedade: { title: "Sociedade", text: textAbout.sociedade },
    "Ensino fundamental": {
      title: "Ensino fundamental",
      text: textAbout.ensinoFundamental,
    },
    "Ensino médio": { title: "Ensino médio", text: textAbout.ensinoMedio },
    Graduação: { title: "Graduação", text: textAbout.graduacao },
    Jogos: { title: "Jogos", text: textAbout.jogos },
    Filmes: { title: "Filmes", text: textAbout.filmes },
    Música: { title: "Música", text: textAbout.musica },
    JavaScript: { title: "JavaScript", text: textAbout.javascript },
    HTML: { title: "HTML", text: textAbout.html },
    CSS: { title: "CSS", text: textAbout.css },
    TypeScript: { title: "TypeScript", text: textAbout.typescript },
    React: { title: "React", text: textAbout.react },
    Tailwind: { title: "Tailwind", text: textAbout.tailwind },
    "Next.JS": { title: "Next.JS", text: textAbout.nextjs },
    Java: { title: "Java", text: textAbout.java },
  };

  const currentContent = tabContent[activeTab];

  return (
    <Body navBarActive="sobre">
      <div className="flex-grow flex flex-col h-full w-full md:flex-row">
        <SideBarAbout
          setActiveTabs={setActiveTabs}
          setActiveTab={setActiveTab}
          setLastActiveTab={setLastActiveTab}
        />

        <div className="flex flex-col max-w-full min-w-0 w-full">
          <TabsAbout
            tabs={activeTabs}
            onClose={handleCloseTab}
            onOpen={handleOpenTab}
            activeTab={activeTab}
            setLastActiveTab={setLastActiveTab}
          />

          {currentContent && (
            <TextArea title={currentContent.title} text={currentContent.text} />
          )}
        </div>
      </div>
    </Body>
  );
}
