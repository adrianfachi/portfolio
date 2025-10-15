"use client";

import { HiOutlineCode } from "react-icons/hi";
import { GrContactInfo } from "react-icons/gr";
import { FaGamepad } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import linguagens from "../_lib/linguagens";
import TitleSideBar from "./TitleSideBar";
import infoSideBar from "../_lib/infoSideBar";
import FolderSideBar from "./FolderSideBar";
import SideBarElementTxt from "./SideBarElementTxt";

type props = {
  setActiveTabs: Dispatch<SetStateAction<string[]>>;
  setActiveTab: Dispatch<string>;
  setLastActiveTab: (tab: string) => void;
};

function SideBarAbout({
  setActiveTabs,
  setActiveTab,
  setLastActiveTab,
}: props) {
  const [checked, setChecked] = useState<string>("professional-info");
  const [isPC, setIsPC] = useState(false);
  const infoInputs = ["professional-info", "personal-info", "hobbies"];
  const iconsInfoInputs = [HiOutlineCode, GrContactInfo, FaGamepad];
  const [activeFolders, setActiveFolders] = useState<string[]>([]);

  const sections = [
    {
      key: "professional-info",
      folders: [
        {
          id: "PRI",
          title: "info-profissional",
          children: [
            {
              id: "LI",
              title: "linguagens",
              color: "red",
              content: linguagens.map(({ nome, Logo, cor }) => (
                <div
                  key={nome}
                  className="flex items-center ml-2 gap-1 cursor-pointer"
                  onClick={() => {
                    setActiveTabs(prev => prev.includes(nome) ? prev : [...prev, nome])
                    setActiveTab(nome);
                    setLastActiveTab(nome);
                  }}
                >
                  <Logo color={cor} fontSize={20} />
                  <span className="text-sm">{nome}</span>
                </div>
              ))
            },
            {
              id: "ES",
              title: "estudos",
              color: "green",
              content: infoSideBar.estudos.map((e, idx) => (
                <SideBarElementTxt
                  key={idx}
                  setActiveTab={setActiveTab}
                  setActiveTabs={setActiveTabs}
                  setLastActiveTab={setLastActiveTab}
                  element={e}
                />
              ))
            }
          ]
        }
      ]
    },
    {
      key: "personal-info",
      folders: [
        {
          id: "PEI",
          title: "info-pessoal",
          children: [
            {
              id: "BIO",
              title: "bio",
              color: "red",
              content: [
                <SideBarElementTxt
                  key="bio"
                  setActiveTab={setActiveTab}
                  setActiveTabs={setActiveTabs}
                  setLastActiveTab={setLastActiveTab}
                  element="Minha bio"
                />
              ]
            },
            {
              id: "INT",
              title: "interesses",
              color: "green",
              content: infoSideBar.interesses.map((e, idx) => (
                <SideBarElementTxt
                  key={idx}
                  setActiveTab={setActiveTab}
                  setActiveTabs={setActiveTabs}
                  setLastActiveTab={setLastActiveTab}
                  element={e}
                />
              ))
            },
            {
              id: "EDU",
              title: "educação",
              color: "purple",
              content: infoSideBar.educacao.map((e, idx) => (
                <SideBarElementTxt
                  key={idx}
                  setActiveTab={setActiveTab}
                  setActiveTabs={setActiveTabs}
                  setLastActiveTab={setLastActiveTab}
                  element={e}
                />
              ))
            }
          ]
        }
      ]
    },
    {
      key: "hobbies",
      folders: [
        {
          id: "HO",
          title: "hobbies",
          children: [
            {
              id: "HOF",
              title: "hobbies",
              color: "red",
              content: infoSideBar.hobbies.map((e, idx) => (
                <SideBarElementTxt
                  key={idx}
                  setActiveTab={setActiveTab}
                  setActiveTabs={setActiveTabs}
                  setLastActiveTab={setLastActiveTab}
                  element={e}
                />
              ))
            }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    const handleResize = () => setIsPC(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPC) setActiveFolders(["PRI", "LI", "ES", "PEI", "BIO", "INT", "EDU", "HO", "HOF", "CON"]);
    else setActiveFolders([]);
  }, [isPC]);

  const toggleFolder = (id: string) => {
    if (activeFolders.includes(id)) {
      setActiveFolders((prev) => {
        return prev.filter((e) => e !== id);
      });
    } else setActiveFolders([...activeFolders, id]);
  };

  const isActive = (id: string) => activeFolders.includes(id);

  return (
    <div className="flex flex-col text-primary w-full select-none md:flex-row md:w-fit">
      <div className="flex p-4 gap-4 text-primary w-full border-b border-b-gray justify-center md:flex-col md:border-r md:border-r-gray md:w-fit md:justify-start">
        {infoInputs.map((e, index) => {
          const Icon = iconsInfoInputs[index];
          return (
            <Icon
              key={index}
              className={`${checked === e ? "text-white" : ""} cursor-pointer`}
              size={20}
              onClick={() => setChecked(e)}
            />
          );
        })}
      </div>
      <div className="flex flex-col text-primary md:border-r md:border-r-gray w-full md:w-fit text-nowrap">
        {sections
          .filter((section) => section.key === checked)
          .map((section) =>
            section.folders.map((folder) => (
              <div key={folder.id}>
                <div
                  className="p-2 border-b border-b-gray gap-2"
                  onClick={() => toggleFolder(folder.id)}
                >
                  <TitleSideBar
                    text={folder.title}
                    active={isActive(folder.id)}
                    onClick={() => toggleFolder(folder.id)}
                  />
                </div>
                <AnimatePresence>
                  {isActive(folder.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="flex flex-col gap-2 py-2"
                    >
                      {folder.children.map((child) => (
                        <div key={child.id}>
                          <div
                            className="pl-4 pr-2"
                            onClick={() => toggleFolder(child.id)}
                          >
                            <FolderSideBar
                              text={child.title}
                              color={child.color}
                              active={isActive(child.id)}
                              onClick={() => toggleFolder(child.id)}
                            />
                          </div>
                          <AnimatePresence>
                            {isActive(child.id) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="pl-4 pr-2 flex flex-col gap-2"
                              >
                                {child.content}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}
        <div
          className="p-2 border-y border-y-gray"
          onClick={() => toggleFolder("CON")}
        >
          <TitleSideBar
            text="contatos"
            active={isActive("CON")}
            onClick={() => toggleFolder("CON")}
          />
        </div>
        <AnimatePresence>
          {isActive("CON") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex flex-col"
            >
              <div className="flex items-center ml-2 px-3 py-1 gap-1">
                <MdEmail fontSize={20} />
                <span className="text-sm">adrianfachidev@gmail.com</span>
              </div>
              <div className="flex items-center ml-2 px-3 py-1 gap-1">
                <MdPhone fontSize={20} />
                <span className="text-sm">+55 51 996105286</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SideBarAbout;