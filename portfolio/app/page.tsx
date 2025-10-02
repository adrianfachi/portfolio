import Apresentacion from "./components/Apresentacion";
import Body from "./components/Body";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <Body>
       <NavBar active="home"/>
       <div className="flex-grow flex items-center justify-center">
        <Apresentacion/>
       </div>
       <Footer/>
    </Body>
  );
}
