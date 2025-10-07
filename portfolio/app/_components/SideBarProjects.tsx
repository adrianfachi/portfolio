"use client";

import { Dispatch, SetStateAction, useState } from "react";
import TitleSideBar from "./TitleSideBar";
import linguagens from "../_lib/linguagens";
import { PiCheck } from "react-icons/pi";

type Props = {
	setCheckedLanguages: Dispatch<SetStateAction<string[]>>;
	handleUnchecked: (index: number) => void;
	checkedLanguages: string[];
};

function SideBarProjects({
	setCheckedLanguages,
	handleUnchecked,
	checkedLanguages,
}: Props) {
	const [checkedPojects, setCheckedProjects] = useState(true);
	return (
		<div className="flex flex-col text-primary md:border-r md:border-r-gray w-full md:w-fit border-b border-b-gray md:border-b-0">
			<div
				className="p-2 border-b border-b-gray gap-2"
				onClick={() => {
					setCheckedProjects(!checkedPojects);
				}}
			>
				<TitleSideBar
					text="projetos"
					active={checkedPojects}
					onClick={() => setCheckedProjects(!checkedPojects)}
				/>
			</div>
			<div
				className={`${
					checkedPojects ? "" : "hidden"
				} flex flex-col gap-2 py-2 px-4`}
			>
				{linguagens.map(({ nome, Logo }, index) => {
					const [checked, setChecked] = useState(nome == "React" ? true : false);

					return (
						<div key={nome} className="flex items-center ml-2 gap-1	">
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={checked}
									onChange={() => setChecked(!checked)}
									className="appearance-none w-4 h-4 border border-[#62748E] rounded-[2px] bg-transparent cursor-pointer checked:bg-[#62748E] mr-2"
									onClick={() => {
										!checked
											? setCheckedLanguages((prev) =>
													prev.includes(nome) ? prev : [...prev, nome]
											  )
											: handleUnchecked(checkedLanguages.indexOf(nome));
									}}
								/>
								{checked && (
									<PiCheck className="absolute left-0.5 top-0.5 w-3 h-3    text-white pointer-events-none" />
								)}
							</label>
							<Logo className="text-[#62748E]" fontSize={20} />
							<span className="text-sm text-white">{nome}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default SideBarProjects;
