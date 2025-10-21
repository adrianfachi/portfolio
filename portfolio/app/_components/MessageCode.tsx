"use client";

import React from "react";
import { motion, Easing, Variants } from "framer-motion";

type Props = {
  menssages: string[];
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as Easing,
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.08,
    },
  },
};

function MessageCode({ menssages }: Props) {
  const date = new Date();
  const codeLines = [
    <>
      <span className="text-pink">const </span>{" "}
      <span className="text-purple">button</span>{" "}
      <span className="text-pink"> = </span>{" "}
      <span className="text-purple">document.querySelector</span>
      &#40;<span className="text-orange">'#sendBtn'</span>&#41;;
    </>,
    <br key="empty-2" />,
    <>
      <span className="text-pink">const </span>{" "}
      <span className="text-purple">message</span>{" "}
      <span className="text-pink"> = </span>
      &#123;
    </>,
    <div className="pl-4" key="line-4-content">
      <span className="text-purple">name: </span>
      <span className="text-orange">"{menssages[0]}"</span>
    </div>,
    <div className="pl-4" key="line-5-content">
      <span className="text-purple">email: </span>
      <span className="text-orange">"{menssages[1]}"</span>
    </div>,
    <div className="pl-4" key="line-6-content">
      <span className="text-purple">message: </span>
      <span className="text-orange">"{menssages[2]}"</span>
    </div>,
    <div className="pl-4" key="line-7-content">
      <span className="text-purple">date: </span>
      <span className="text-orange">
        "
        {date
          .toLocaleDateString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          })
          .replace(",", "")}
        "
      </span>
    </div>,
    <div key="line-8-content">&#125;</div>,
    <br key="empty-9" />,
    <>
      <span className="text-purple">button.addEventListener</span>&#40;
      <span className="text-orange">'click'</span>, &#40;&#41;{" "}
      <span className="text-orange">{"=>"}</span> &#123;
    </>,
    <div className="pl-4" key="line-11-content">
      <span className="text-purple">form.send</span>&#40;
      <span className="text-purple">message</span>&#41;;
    </div>,
    <div key="line-12-content">&#125;&#41;</div>,
  ];

  return (
    <motion.div
      className="p-4 flex flex-col md:w-1/2 md:border-l border-l-gray md:p-10 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {codeLines.map((content, index) => (
        <motion.div
          key={index}
          className="flex items-start w-full"
          variants={lineVariants}
        >
          <span className="pr-4 text-gray-400 min-w-[30px] text-right">
            {index + 1}
          </span>
          <div className="w-full text-white break-all">
            {content}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default MessageCode;