"use client";

import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
  navBarActive: string;
};

function Body({ children, navBarActive }: Props) {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);

  useEffect(() => {
    if (activeMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeMenu]);

  return (
    <div className="m-4 border-gray border text-primary rounded-lg h-[calc(100vh-2rem)] bg-[#0F172B] flex flex-col background-stripes md:m-12 md:h-[calc(100vh-6rem)] overflow-auto scroll-style">
      <NavBar active={navBarActive} setActiveBoolean={setActiveMenu} />
      {children}
      <Footer />
    </div>
  );
}

export default Body;
