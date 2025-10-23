import Apresentacion from "./_components/Apresentacion";
import Body from "./_components/Body";
import SnakeGame from "./_components/SnakeGame";

export default function Home() {
  return (
    <Body navBarActive="home" className="overflow-x-hidden scroll-style">
      <div className="flex-grow flex items-center justify-center gap-12 min-h-fit overflow-y-auto scroll-style">
        <Apresentacion />
        <SnakeGame />
      </div>
    </Body>
  );
}
