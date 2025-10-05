import Apresentacion from "./_components/Apresentacion";
import Body from "./_components/Body";
import NavBar from "./_components/NavBar";
import Footer from "./_components/Footer";
import SnakeGame from "./_components/SnakeGame";

export default function Home() {
  return (
    <Body>
       <NavBar active="home"/>
       <div className="flex-grow flex items-center justify-center gap-12">
        <Apresentacion/>
        <SnakeGame/>
       </div>
       <Footer/>
    </Body>
  );
}
