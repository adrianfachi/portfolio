"use client";

import { MdEmail, MdPhone } from "react-icons/md";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import linguagens from "../_lib/linguagens";
import TitleSideBar from "./TitleSideBar";
import infoSideBar from "../_lib/infoSideBar";
import FolderSideBar from "./FolderSideBar";
import SideBarElementTxt from "./SideBarElementTxt";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

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
  const [isPC, setIsPC] = useState(false);
  const [activeFolders, setActiveFolders] = useState<string[]>([]);

  function copyEmail() {
    navigator.clipboard.writeText("adrianfachidev@gmail.com");
    toast.success("Email copiado!", { style: { backgroundColor: "var(--background)", color: "var(--foreground)" } })
  }

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

  const sidebarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleResize = () => setIsPC(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    if (sidebarRef.current && isPC) {
      const container = sidebarRef.current;
      const scrollbarWidth = container.offsetWidth - container.clientWidth;

      container.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    } else if (sidebarRef.current && !isPC) {
      sidebarRef.current.style.removeProperty('--scrollbar-width');
    }

    return () => window.removeEventListener("resize", handleResize);
  }, [isPC]);

  useEffect(() => {
    if (isPC) setActiveFolders(["PRI", "PEI", "BIO", "HO", "CON"]);
    else setActiveFolders(["PEI", "BIO"]);
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
    <div ref={sidebarRef} className="flex flex-col h-auto md:max-h-full md:min-h-full text-primary w-full md:w-fit md:min-w-fit text-nowrap border-b border-b-gray md:border-b-0 select-none scroll-style md:overflow-y-auto md:border-r md:border-r-gray p-2">
      {sections
        .map((section) =>
          section.folders.map((folder) => (
            <div key={folder.id} className="pt-1">
              <div
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
                    className="flex flex-col ml-2 border-l border-gray py-1 gap-1"
                  >
                    {folder.children.map((child) => (
                      <div key={child.id}>
                        <div
                          className="pl-2"
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
                              className="ml-4 flex flex-col gap-1 border-l border-gray"
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
        className="p-2"
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
            className="flex flex-col border-l border-gray ml-4"
          >
            <div className="flex items-center pr-3 pl-2 pb-1 gap-1">
              <MdEmail fontSize={20} />
              <div onClick={copyEmail} className="text-sm cursor-pointer">adrianfachidev@gmail.com</div>
              <Toaster position="top-right" />
            </div>
            <div className="flex items-center pr-3 pl-2 gap-1">
              <MdPhone fontSize={20} />
              <a href="https://wa.me/5551995105286" target="_blank" className="text-sm cursor-pointer">+55 51 996105286</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SideBarAbout;