"use client";

import { Dispatch, SetStateAction, useState } from "react";
import TitleSideBar from "./TitleSideBar";
import linguagens from "../_lib/linguagens";
import { PiCheck } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

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

  const toggleLanguage = (nome: string) => {
    const isChecked = checkedLanguages.includes(nome);
    if (isChecked) {
      handleUnchecked(checkedLanguages.indexOf(nome));
    } else {
      setCheckedLanguages((prev) => [...prev, nome]);
    }
  };

  return (
    <div className="flex flex-col text-primary md:border-r md:border-r-gray w-full md:w-fit border-b border-b-gray md:border-b-0 select-none">
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
      <AnimatePresence>
        {checkedPojects && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="flex flex-col gap-2 py-2 px-4"
          >
            {linguagens.map(({ nome, Logo }, index) => {
              const checked = checkedLanguages.includes(nome);
              return (
                <div key={index} className="flex items-center ml-2 gap-1">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleLanguage(nome)}
                      className="appearance-none w-4 h-4 border border-[#62748E] rounded-[2px] bg-transparent cursor-pointer checked:bg-[#62748E] mr-2"
                    />
                    {checked && (
                      <PiCheck className="absolute left-0.5 top-0.5 w-3 h-3 text-white pointer-events-none" />
                    )}
                  </label>
                  <Logo className="text-[#62748E]" fontSize={20} />
                  <span className="text-sm text-white">{nome}</span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SideBarProjects;
