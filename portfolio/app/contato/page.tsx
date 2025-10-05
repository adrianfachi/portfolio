import Body from "../_components/Body";
import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";

export default function Contact() {
  return (
    <Body>
       <NavBar active="contate-me"/>
       <div className="flex-grow"></div>
       <Footer/>
    </Body>
  );
}