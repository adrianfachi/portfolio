"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  number: number;
  name: string;
  image: string;
  caption: string;
  link: string;
  isVisible: boolean;
};

function Project({ number, name, image, caption, link, isVisible }: Props) {
  return (
    <div className="text-[12px] w-full sm:w-[70%] flex flex-col gap-3 md:w-[40%] lg:w-[30%]">
      <AnimatePresence mode="popLayout">
        {isVisible && (
          <motion.div
            key={number}
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h3>
              <span className="text-purple break-all">Project {number}</span> //{" "}
              {name}
            </h3>

            <div className="flex flex-col">
              <img src={image} className="rounded-t-lg w-full" />
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
        )}
      </AnimatePresence>
    </div>
  );
}

export default Project;
