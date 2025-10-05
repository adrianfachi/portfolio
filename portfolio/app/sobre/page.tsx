import Body from "../_components/Body";
import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";
import SideBarAbout from "../_components/SideBarAbout";

export default function About() {
  return (
    <Body>
       <NavBar active="sobre"/>
       <div className="flex-grow flex h-full">
        <SideBarAbout/>
       </div>
       <Footer/>
    </Body>
  );
}