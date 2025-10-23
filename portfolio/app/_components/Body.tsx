"use client";

import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
  navBarActive: string;
  className?: string;
};

function Body({ children, navBarActive, className }: Props) {

  return (
    <div className={`m-4 border-gray border text-primary rounded-lg h-[calc(100vh-2rem)] bg-[#0F172B] flex flex-col background-stripes md:m-12 md:h-[calc(100vh-6rem)] ${className}`}>
      <NavBar active={navBarActive} />
      {children}
      <Footer />
    </div>
  );
}

export default Body;
