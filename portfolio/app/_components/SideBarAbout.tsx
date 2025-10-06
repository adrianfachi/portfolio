"use client";

import { HiOutlineCode } from "react-icons/hi";
import { GrContactInfo } from "react-icons/gr";
import { FaGamepad } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { TbFileTypeTxt } from "react-icons/tb";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import linguagens from "../_lib/linguagens";
import TitleSideBar from "./TitleSideBar";
import infoSideBar from "../_lib/infoSideBar";
import FolderSideBar from "./FolderSideBar";

type props = {
	setActiveTabs: Dispatch<SetStateAction<string[]>>;
	setActiveTab: Dispatch<string>;
	setLastActiveTab: (tab: string) => void;
};

function SideBarAbout({ setActiveTabs, setActiveTab, setLastActiveTab }: props) {
	const [checked, setChecked] = useState<string>("professional-info");
	const [isPC, setIsPC] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsPC(window.innerWidth >= 768);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const [checkedPRI, setCheckedPRI] = useState<boolean>(isPC);
	const [checkedPEI, setCheckedPEI] = useState<boolean>(isPC);
	const [checkedHO, setCheckedHO] = useState<boolean>(isPC);
	const [checkedCON, setCheckedCON] = useState<boolean>(isPC);
	const [checkedLI, setCheckedLI] = useState<boolean>(isPC);
	const [checkedES, setCheckedES] = useState<boolean>(isPC);
	const [checkedBIO, setCheckedBIO] = useState<boolean>(isPC);
	const [checkedINT, setCheckedINT] = useState<boolean>(isPC);
	const [checkedEDU, setCheckedEDU] = useState<boolean>(isPC);
	const [checkedHOF, setCheckedHOF] = useState<boolean>(isPC);

	useEffect(() => {
		setCheckedPRI(isPC);
		setCheckedPEI(isPC);
		setCheckedHO(isPC);
		setCheckedCON(isPC);
		setCheckedLI(isPC);
		setCheckedES(isPC);
		setCheckedBIO(isPC);
		setCheckedINT(isPC);
		setCheckedEDU(isPC);
		setCheckedHOF(isPC);
	}, [isPC]);

	return (
		<div
			className={`flex flex-col text-primary w-full select-none md:flex-row md:w-fit`}
		>
			<div className="flex p-4 gap-4 text-primary w-full border-b border-b-gray justify-center md:flex-col md:border-r md:border-r-gray md:w-fit md:justify-start">
				<HiOutlineCode
					className={`${
						checked == "professional-info" ? "text-white" : ""
					} cursor-pointer`}
					size={20}
					onClick={() => {
						setChecked("professional-info");
					}}
				/>
				<GrContactInfo
					className={`${
						checked == "personal-info" ? "text-white" : ""
					} cursor-pointer`}
					size={20}
					onClick={() => {
						setChecked("personal-info");
					}}
				/>
				<FaGamepad
					className={`${
						checked == "hobbies" ? "text-white" : ""
					} cursor-pointer`}
					size={20}
					onClick={() => {
						setChecked("hobbies");
					}}
				/>
			</div>
			<div className="flex flex-col text-primary md:border-r md:border-r-gray w-full md:w-fit">
				{checked == "professional-info" ? (
					<>
						<div
							className="p-2 border-b border-b-gray gap-2"
							onClick={() => {
								setCheckedPRI(!checkedPRI);
							}}
						>
							<TitleSideBar
								text="info-profissional"
								active={checkedPRI}
								onClick={() => setCheckedPRI(!checkedPRI)}
							/>
						</div>
						<div
							className={`${
								checkedPRI ? "" : "hidden"
							} flex flex-col gap-2 py-2`}
						>
							<div
								onClick={() => {
									setCheckedLI(!checkedLI);
								}}
								className="pl-4 pr-2"
							>
								<FolderSideBar
									text="linguagens"
									color="red"
									active={checkedLI}
									onClick={() => setCheckedLI(!checkedLI)}
								/>
							</div>
							<div
								className={`pl-4 pr-2 flex flex-col gap-2 ${
									checkedLI ? "" : "hidden"
								}`}
							>
								{linguagens.map(({ nome, Logo, cor }) => (
									<div key={nome} className="flex items-center ml-2 gap-1	">
										<Logo color={cor} fontSize={20} />
										<span className="text-sm">{nome}</span>
									</div>
								))}
							</div>
							<div
								onClick={() => {
									setCheckedES(!checkedES);
								}}
								className="pl-4 pr-2"
							>
								<FolderSideBar
									text="estudos"
									color="green"
									active={checkedES}
									onClick={() => setCheckedES(!checkedES)}
								/>
							</div>
							<div
								className={`pl-4 pr-2 flex flex-col gap-2 ${
									checkedES ? "" : "hidden"
								}`}
							>
								{infoSideBar.estudos.map((e) => {
									return (
										<div key={e} className="flex items-center ml-2 gap-1 cursor-pointer" onClick={() => {
										setActiveTabs((prev) => 
											prev.includes(e) ? prev : [...prev, e]
										)
										setActiveTab(e);
										setLastActiveTab(e);
									}}>
											<TbFileTypeTxt fontSize={20} />
											<span className="text-sm">{e}</span>
										</div>
									);
								})}
							</div>
						</div>
					</>
				) : checked == "personal-info" ? (
					<>
						<div
							className="p-2 border-b border-b-gray gap-2"
							onClick={() => {
								setCheckedPEI(!checkedPEI);
							}}
						>
							<TitleSideBar
								text="info-pessoal"
								active={checkedPEI}
								onClick={() => setCheckedPEI(!checkedPEI)}
							/>
						</div>
						<div
							className={`${
								checkedPEI ? "" : "hidden"
							} flex flex-col gap-2 py-2`}
						>
							<div
								onClick={() => {
									setCheckedBIO(!checkedBIO);
								}}
								className="pl-4 pr-2"
							>
								<FolderSideBar
									text="bio"
									color="red"
									active={checkedBIO}
									onClick={() => setCheckedBIO(!checkedBIO)}
								/>
							</div>
							<div
								className={`pl-4 pr-2 flex flex-col gap-2 ${
									checkedBIO ? "" : "hidden"
								}`}
							>
								<div className="flex items-center ml-2 gap-1 cursor-pointer" onClick={() => {
										setActiveTabs((prev) => 
											prev.includes("Minha bio") ? prev : [...prev, "Minha bio"]
										)
										setActiveTab("Minha bio");
										setLastActiveTab("Minha bio");
									}}>
									<TbFileTypeTxt fontSize={20} />
									<span className="text-sm">Minha bio</span>
								</div>
							</div>
							<div
								onClick={() => {
									setCheckedINT(!checkedINT);
								}}
								className="pl-4 pr-2"
							>
								<FolderSideBar
									text="interesses"
									color="green"
									active={checkedINT}
									onClick={() => {
										setCheckedINT(!checkedINT);
									}}
								/>
							</div>
							<div
								className={`pl-4 pr-2 flex flex-col gap-2 ${
									checkedINT ? "" : "hidden"
								}`}
							>
								{infoSideBar.interesses.map((e) => {
									return (
										<div key={e} className="flex items-center ml-2 gap-1 cursor-pointer" onClick={() => {
											setActiveTabs((prev) => 
												prev.includes(e) ? prev : [...prev, e]
											)
											setActiveTab(e);
											setLastActiveTab(e);
										}}>
											<TbFileTypeTxt fontSize={20} />
											<span className="text-sm">{e}</span>
										</div>
									);
								})}
							</div>
							<div
								onClick={() => {
									setCheckedEDU(!checkedEDU);
								}}
								className="pl-4 pr-2"
							>
								<FolderSideBar
									text="educação"
									color="purple"
									active={checkedEDU}
									onClick={() => {
										setCheckedEDU(!checkedEDU);
									}}
								/>
							</div>
							<div
								className={`pl-4 pr-2 flex flex-col gap-2 ${
									checkedEDU ? "" : "hidden"
								}`}
							>
								{infoSideBar.educacao.map((e) => {
									return (
										<div key={e} className="flex items-center ml-2 gap-1 cursor-pointer" onClick={() => {
											setActiveTabs((prev) => 
												prev.includes(e) ? prev : [...prev, e]
											)
											setActiveTab(e);
											setLastActiveTab(e);
										}}>
											<TbFileTypeTxt fontSize={20} />
											<span className="text-sm">{e}</span>
										</div>
									);
								})}
							</div>
						</div>
					</>
				) : (
					<>
						<div
							className="p-2 border-b border-b-gray gap-2"
							onClick={() => {
								setCheckedPEI(!checkedHO);
							}}
						>
							<TitleSideBar
								text="hobbies"
								active={checkedHO}
								onClick={() => setCheckedHO(!checkedHO)}
							/>
						</div>
						<div
							className={`${
								checkedHO ? "" : "hidden"
							} flex flex-col gap-2 py-2`}
						>
							<div
								onClick={() => {
									setCheckedHOF(!checkedHOF);
								}}
								className="pl-4 pr-2"
							>
								<FolderSideBar
									text="hobbies"
									color="red"
									active={checkedHOF}
									onClick={() => {
										setCheckedHOF(!checkedHOF);
									}}
								/>
							</div>
							<div
								className={`pl-4 pr-2 flex flex-col gap-2 ${
									checkedHOF ? "" : "hidden"
								}`}
							>
								{infoSideBar.hobbies.map((e) => {
									return (
										<div key={e} className="flex items-center ml-2 gap-1 cursor-pointer" onClick={() => {
											setActiveTabs((prev) => 
												prev.includes(e) ? prev : [...prev, e]
											)
											setActiveTab(e);
											setLastActiveTab(e);
										}}>
											<TbFileTypeTxt fontSize={20} />
											<span className="text-sm">{e}</span>
										</div>
									);
								})}
							</div>
						</div>
					</>
				)}
				<div
					className="p-2 border-y border-y-gray"
					onClick={() => {
						setCheckedCON(!checkedCON);
					}}
				>
					<TitleSideBar
						text="contatos"
						active={checkedCON}
						onClick={() => setCheckedCON(!checkedCON)}
					/>
				</div>
				<div className={`${checkedCON ? "" : "hidden"}`}>
					<div className="flex items-center ml-2 px-3 py-1 gap-1">
						<MdEmail fontSize={20} />
						<span className="text-sm">adrianfachi5@gmail.com</span>
					</div>
					<div className="flex items-center ml-2 px-3 py-1 gap-1">
						<MdPhone fontSize={20} />
						<span className="text-sm">+55 51 996105286</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SideBarAbout;
