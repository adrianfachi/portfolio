"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type props = {
  active: string;
  setActiveBoolean: Dispatch<SetStateAction<boolean>>;
};

const menuItems = [
  { href: "/", label: "_home", key: "home" },
  { href: "/sobre", label: "_sobre", key: "sobre" },
  { href: "/projetos", label: "_projetos", key: "projetos" },
];

function NavBar({ active, setActiveBoolean }: props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setActiveBoolean(false);
  };

  return (
    <div className="relative max-w-full">
      <div className="absolute flex top-1/2 -translate-y-1/2 right-4 z-50 md:hidden">
        <motion.button
          initial={false}
          animate={isMenuOpen ? "open" : "closed"}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setActiveBoolean(!isMenuOpen);
          }}
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            className="cursor-pointer"
          >
            <motion.path
              className="stroke-3 stroke-white fill-transparent"
              variants={{
                closed: { d: "M 2 2.5 L 20 2.5" },
                open: { d: "M 3 16.5 L 17 2.5" },
              }}
            />
            <motion.path
              className="stroke-3 stroke-white fill-transparent"
              d="M 2 9.423 L 20 9.423"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.1 }}
            />
            <motion.path
              className="stroke-3 stroke-white fill-transparent"
              variants={{
                closed: { d: "M 2 16.346 L 20 16.346" },
                open: { d: "M 3 2.5 L 17 16.346" },
              }}
            />
          </svg>
        </motion.button>
      </div>

      <div className="hidden md:flex gap-16 w-full h-8 border-b-gray text-primary text-xs border-b">
        <p className="text-nowrap pl-6 flex items-center">adrian-fachi</p>

        <div className="flex justify-between w-full">
          <div className="flex h-8 border-l border-gray">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`border-gray flex items-center border-b-0 border-r cursor-pointer ${active == item.key ? "" : "hover:border-b-2"
                  }`}
              >
                <div className="w-full h-full relative px-4 flex items-center">
                  {item.label}
                  {active === item.key && (
                    <motion.div
                      key={item.key}
                      layoutId="underline"
                      className="absolute left-0 bottom-0 h-[2px] w-full bg-orange rounded"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              </Link>
            ))}
          </div>
          <Link
            href={"/contato"}
            className={`border-gray flex items-center border-b-0 border-r cursor-pointer ${active === "contate-me" ? "" : "hover:border-b-2"
              }`}
          >
            <div className="w-full h-full relative px-4 flex items-center border-l border-l-gray">
              _contate-me
              {active === "contate-me" && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 h-[2px] w-full bg-orange rounded"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </div>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-[3rem] right-4 w-[calc(100%-2rem)] background-stripes bg-[#0F172B] z-40 rounded-b-lg overflow-hidden md:hidden border-x border-gray"
          >
            <div className="flex flex-col p-4">
              <p className="text-xs text-primary px-6 mb-2"># navigate:</p>
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`text-base text-white px-6 h-10 flex items-center border-b border-gray hover:bg-white/5 transition ${active === item.key ? "text-purple font-bold" : ""
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contato"
                onClick={handleLinkClick}
                className={`text-base text-white px-6 h-10 flex items-center border-b border-gray hover:bg-white/5 transition ${active === "contate-me" ? "text-purple font-bold" : ""
                  }`}
              >
                _contate-me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {isMenuOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 background-stripes bg-[#0F172B] z-30 md:hidden m-4 rounded-lg border border-gray mt-[47.2px] mb-[48.8px]"
            onClick={handleLinkClick}
          />
        </AnimatePresence>

      )}
      <div className="border-b-gray text-primary text-xs border-b pl-6 h-8 flex items-center gap-16 md:hidden">
        <p className="media2">adrian-fachi</p>
      </div>
    </div>
  );
}

export default NavBar;
