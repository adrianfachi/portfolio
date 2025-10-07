"use client";

import Body from "../_components/Body";
import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";
import SideBarAbout from "../_components/SideBarAbout";
import { useState } from "react";
import TabsAbout from "../_components/TabsAbout";
import TextArea from "../_components/TextArea";
import textAbout from "../_lib/textAbout";

export default function About() {
	const [activeTabs, setActiveTabs] = useState<string[]>(["Minha bio"]);
	const [activeTab, setActiveTab] = useState<string>("Minha bio");
	const [lastActiveTab, setLastActiveTab] = useState<string>("");
	const [activeMenu, setActiveMenu] = useState<boolean>(false);

	const handleCloseTab = (index: number) => {
		setActiveTabs((prev) => {
			const newTabs = prev.filter((_, i) => i !== index);

			if (newTabs.length === 0) {
				setActiveTab("");
			} else if (!newTabs.includes(lastActiveTab)) {
				setActiveTab(newTabs[Math.max(0, index - 1)]);
			} else {
				setActiveTab(lastActiveTab);
			}

			return newTabs;
		});
	};

	const handleOpenTab = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<Body>
			<NavBar active="sobre" setActiveBoolean={setActiveMenu} />
			{!activeMenu ? (
				<>
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
							{activeTab === "Minha bio" ? (
								<TextArea title="Minha bio" text={textAbout.bio} />
							) : activeTab == "Grupo de estudos" ? (
								<TextArea
									title="Grupo de estudos"
									text={textAbout.grupoEstudos}
								/>
							) : activeTab == "Hackatona" ? (
								<TextArea title="Hackatona" text={textAbout.hackatona} />
							) : activeTab == "Objetivo profissional" ? (
								<TextArea
									title="Objetivo Proficional"
									text={textAbout.objetivoProfissional}
								/>
							) : activeTab == "Sociedade" ? (
								<TextArea title="Sociedade" text={textAbout.sociedade} />
							) : activeTab == "Ensino fundamental" ? (
								<TextArea
									title="Ensino fundamental"
									text={textAbout.ensinoFundamental}
								/>
							) : activeTab == "Ensino médio" ? (
								<TextArea title="Ensino médio" text={textAbout.ensinoMedio} />
							) : activeTab == "Graduação" ? (
								<TextArea title="Graduação" text={textAbout.graduacao} />
							) : activeTab == "Jogos" ? (
								<TextArea title="Jogos" text={textAbout.jogos} />
							) : activeTab == "Filmes" ? (
								<TextArea title="Filmes" text={textAbout.filmes} />
							) : activeTab == "Música" ? (
								<TextArea title="Música" text={textAbout.musica} />
							) : null}
						</div>
					</div>
					<Footer />
				</>
			) : null}
		</Body>
	);
}
