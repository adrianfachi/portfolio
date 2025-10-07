"use client"

import Apresentacion from "./_components/Apresentacion";
import Body from "./_components/Body";
import NavBar from "./_components/NavBar";
import Footer from "./_components/Footer";
import SnakeGame from "./_components/SnakeGame";
import { useState } from "react";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<boolean>(false)

  return (
    <Body>
       <NavBar active="home" setActiveBoolean={setActiveMenu}/>
       {!activeMenu ? 
       <>
       <div className="flex-grow flex items-center justify-center gap-12">
        <Apresentacion/>
        <SnakeGame/>
       </div>
       <Footer/>
       </>: null}
    </Body>
  );
}
