import Apresentacion from "./components/Apresentacion";
import Body from "./components/Body";
import NavBar from "./components/NavBar";

export default function Home() {
  return (
    <Body>
       <NavBar active="home"/>
       <Apresentacion/>
    </Body>
  );
}
