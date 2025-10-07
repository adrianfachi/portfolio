"use client"

import Body from "../_components/Body";
import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";
import { useState } from "react";

export default function Contact() {
  const [activeMenu, setActiveMenu] = useState<boolean>(false)
  return (
    <Body>
       <NavBar active="contate-me" setActiveBoolean={setActiveMenu}/>
       {!activeMenu ? 
       <>
       <div className="flex-grow"></div>
       <Footer/>
       </>
       : null}
    </Body>
  );
}