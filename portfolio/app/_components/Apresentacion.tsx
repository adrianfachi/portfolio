"use client";

import React from "react";
import Link from "next/link";
import { motion, Easing } from "framer-motion";

function Apresentacion() {
  const ease: Easing = [0.4, 0, 0.2, 1];
  const duration = 0.4;

  return (
    <motion.div
      className="flex flex-col gap-8 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <motion.p
          className="text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, ease, delay: 0.05 }}
        >
          Olá, eu sou o
        </motion.p>

        <motion.h1
          className="text-white text-3xl md:text-4xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.15 }}
        >
          Adrian Fachi
        </motion.h1>

        <motion.h2
          className="text-purple text-base md:text-xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
        >
          &gt; Front-end developer
        </motion.h2>
      </div>

      <div className="text-xs">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration, ease, delay: 0.6 }}
        >
          // meu perfil no github:
        </motion.p>
        <motion.div>
          <motion.span
            className="text-purple"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.7 }}
          >
            const{" "}
          </motion.span>
          <motion.span
            className="text-green"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.8 }}
          >
            gitHubLink{" "}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.9 }}
          >
            ={" "}
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease, delay: 1.0 }}
            style={{ display: 'inline-block' }}
          >
            <Link
              href={"https://github.com/adrianfachi"}
              target="_blank"
              className="text-red break-all"
            >
              https://github.com/adrianfachi
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Apresentacion;