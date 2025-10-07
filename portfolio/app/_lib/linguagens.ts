import { IconType } from "react-icons";
import { BiLogoTypescript, BiLogoTailwindCss, BiLogoHtml5, BiLogoCss3, BiLogoJavascript, BiLogoJava, BiLogoReact } from "react-icons/bi";
import { TbBrandNextjs } from "react-icons/tb";

type Linguagem = {
  nome: string;
  Logo: IconType;
  cor: string;
};

// Array de linguagens
const linguagens: Linguagem[] = [
  { nome: "HTML", Logo: BiLogoHtml5, cor: "#E34C26" },
  { nome: "CSS", Logo: BiLogoCss3, cor: "#264DE4" },
  { nome: "JavaScript", Logo: BiLogoJavascript, cor: "#F7DF1E" },
  { nome: "TypeScript", Logo: BiLogoTypescript, cor: "#007ACC" },
  { nome: "React", Logo: BiLogoReact, cor: "#61DAFB" },
  { nome: "Tailwind", Logo: BiLogoTailwindCss, cor: "#06B6D4" },
  { nome: "Next.JS", Logo: TbBrandNextjs, cor: "#000"},
  { nome: "Java", Logo: BiLogoJava, cor: "#F89820" },
];

export default linguagens;