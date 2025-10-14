"use client";

import { HiOutlineCode } from "react-icons/hi";
import { GrContactInfo } from "react-icons/gr";
import { FaGamepad } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

const folderIds = [
  "PRI",
  "LI",
  "ES",
  "PEI",
  "BIO",
  "INT",
  "EDU",
  "HO",
  "HOF",
  "CON",
];

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

  useEffect(() => {
    const handleResize = () => {
      setIsPC(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isPC) setActiveFolders(folderIds);
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
      <div className="flex flex-col text-primary md:border-r md:border-r-gray w-full md:w-fit">
        {checked === "professional-info" && (
          <>
            <div
              className="p-2 border-b border-b-gray gap-2"
              onClick={() => toggleFolder("PRI")}
            >
              <TitleSideBar
                text="info-profissional"
                active={isActive("PRI")}
                onClick={() => toggleFolder("PRI")}
              />
            </div>
            <div
              className={`${isActive("PRI") ? "" : "hidden"} flex flex-col gap-2 py-2`}
            >
              <div className="pl-4 pr-2" onClick={() => toggleFolder("LI")}>
                <FolderSideBar
                  text="linguagens"
                  color="red"
                  active={isActive("LI")}
                  onClick={() => toggleFolder("LI")}
                />
              </div>
              <div
                className={`pl-4 pr-2 flex flex-col gap-2 ${isActive("LI") ? "" : "hidden"}`}
              >
                {linguagens.map(({ nome, Logo, cor }) => (
                  <div
                    key={nome}
                    className="flex items-center ml-2 gap-1 cursor-pointer"
                    onClick={() => {
                      setActiveTabs((prev) =>
                        prev.includes(nome) ? prev : [...prev, nome],
                      );
                      setActiveTab(nome);
                      setLastActiveTab(nome);
                    }}
                  >
                    <Logo color={cor} fontSize={20} />
                    <span className="text-sm">{nome}</span>
                  </div>
                ))}
              </div>
              <div className="pl-4 pr-2" onClick={() => toggleFolder("ES")}>
                <FolderSideBar
                  text="estudos"
                  color="green"
                  active={isActive("ES")}
                  onClick={() => toggleFolder("ES")}
                />
              </div>
              <div
                className={`pl-4 pr-2 flex flex-col gap-2 ${isActive("ES") ? "" : "hidden"}`}
              >
                {infoSideBar.estudos.map((e, index) => (
                  <SideBarElementTxt
                    key={index}
                    setActiveTab={setActiveTab}
                    setActiveTabs={setActiveTabs}
                    setLastActiveTab={setLastActiveTab}
                    element={e}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {checked === "personal-info" && (
          <>
            <div
              className="p-2 border-b border-b-gray gap-2"
              onClick={() => toggleFolder("PEI")}
            >
              <TitleSideBar
                text="info-pessoal"
                active={isActive("PEI")}
                onClick={() => toggleFolder("PEI")}
              />
            </div>
            <div
              className={`${isActive("PEI") ? "" : "hidden"} flex flex-col gap-2 py-2`}
            >
              <div className="pl-4 pr-2" onClick={() => toggleFolder("BIO")}>
                <FolderSideBar
                  text="bio"
                  color="red"
                  active={isActive("BIO")}
                  onClick={() => toggleFolder("BIO")}
                />
              </div>
              <div
                className={`pl-4 pr-2 flex flex-col gap-2 ${isActive("BIO") ? "" : "hidden"}`}
              >
                <SideBarElementTxt
                  setActiveTab={setActiveTab}
                  setActiveTabs={setActiveTabs}
                  setLastActiveTab={setLastActiveTab}
                  element="Minha bio"
                />
              </div>

              <div className="pl-4 pr-2" onClick={() => toggleFolder("INT")}>
                <FolderSideBar
                  text="interesses"
                  color="green"
                  active={isActive("INT")}
                  onClick={() => toggleFolder("INT")}
                />
              </div>
              <div
                className={`pl-4 pr-2 flex flex-col gap-2 ${isActive("INT") ? "" : "hidden"}`}
              >
                {infoSideBar.interesses.map((e, index) => (
                  <SideBarElementTxt
                    key={index}
                    setActiveTab={setActiveTab}
                    setActiveTabs={setActiveTabs}
                    setLastActiveTab={setLastActiveTab}
                    element={e}
                  />
                ))}
              </div>

              <div className="pl-4 pr-2" onClick={() => toggleFolder("EDU")}>
                <FolderSideBar
                  text="educação"
                  color="purple"
                  active={isActive("EDU")}
                  onClick={() => toggleFolder("EDU")}
                />
              </div>
              <div
                className={`pl-4 pr-2 flex flex-col gap-2 ${isActive("EDU") ? "" : "hidden"}`}
              >
                {infoSideBar.educacao.map((e, index) => (
                  <SideBarElementTxt
                    key={index}
                    setActiveTab={setActiveTab}
                    setActiveTabs={setActiveTabs}
                    setLastActiveTab={setLastActiveTab}
                    element={e}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {checked === "hobbies" && (
          <>
            <div
              className="p-2 border-b border-b-gray gap-2"
              onClick={() => toggleFolder("HO")}
            >
              <TitleSideBar
                text="hobbies"
                active={isActive("HO")}
                onClick={() => toggleFolder("HO")}
              />
            </div>
            <div
              className={`${isActive("HO") ? "" : "hidden"} flex flex-col gap-2 py-2`}
            >
              <div className="pl-4 pr-2" onClick={() => toggleFolder("HOF")}>
                <FolderSideBar
                  text="hobbies"
                  color="red"
                  active={isActive("HOF")}
                  onClick={() => toggleFolder("HOF")}
                />
              </div>
              <div
                className={`pl-4 pr-2 flex flex-col gap-2 ${isActive("HOF") ? "" : "hidden"}`}
              >
                {infoSideBar.hobbies.map((e, index) => (
                  <SideBarElementTxt
                    key={index}
                    setActiveTab={setActiveTab}
                    setActiveTabs={setActiveTabs}
                    setLastActiveTab={setLastActiveTab}
                    element={e}
                  />
                ))}
              </div>
            </div>
          </>
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
        <div className={`${isActive("CON") ? "" : "hidden"}`}>
          <div className="flex items-center ml-2 px-3 py-1 gap-1">
            <MdEmail fontSize={20} />
            <span className="text-sm">adrianfachidev@gmail.com</span>
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
