import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  number: number;
  name: string;
  image: string;
  caption: string;
  link: string;
};

function Project({ number, name, image, caption, link }: Props) {
  return (
    <motion.div
      className="text-[12px] w-full sm:w-[70%] flex flex-col gap-3 md:w-[40%] lg:w-[30%]"
      initial={{ opacity: 0, x: 0 }} // Estado inicial
      animate={{ opacity: 1, x: 0 }} // Estado final
      exit={{ opacity: 0, x: 100 }} // Estado de saída (desaparece e se move para a direita)
      transition={{ duration: 0.5 }} // Duração da animação de saída
    >
      <h3>
        {" "}
        <span className="text-purple break-all">Project {number}</span> //{" "}
        {name}
      </h3>
      <div className="flex flex-col">
        <img src={image} className="rounded-t-lg w-[100%]" />
        <div className="bg-[#02061890] h-fit pb-4 px-2 rounded-b-lg">
          <p className="py-4">{caption}</p>
          <Link
            href={link}
            target="_blank"
            className="rounded bg-gray p-1.5 text-white"
          >
            ver-projeto
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Project;
