import Apresentacion from "./_components/Apresentacion";
import Body from "./_components/Body";
import SnakeGame from "./_components/SnakeGame";

export default function Home() {
  return (
    <Body navBarActive="home">
      <div className="flex-grow flex items-center justify-center gap-12">
        <Apresentacion />
        <SnakeGame />
      </div>
    </Body>
  );
}
