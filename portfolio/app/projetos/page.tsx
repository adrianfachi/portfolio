import Body from "../_components/Body";
import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";

export default function Projects() {
  return (
    <Body>
       <NavBar active="projetos"/>
       <div className="flex-grow"></div>
       <Footer/>
    </Body>
  );
}