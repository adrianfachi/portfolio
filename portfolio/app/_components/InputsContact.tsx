"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { messageValidateSchema } from "../_utils/messageValidate";
import { useState } from "react";
import { messageType } from "../_types/messageType";
import { ScaleLoader } from "react-spinners";
// IMPORTANDO motion e AnimatePresence
import { motion, AnimatePresence, Easing } from "framer-motion";
import axios from "axios";

type Props = {
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  messages: string[];
};

// Renomeado para seguir a convenção de PascalCase para componentes React
function InputsContact({
  onEmailChange,
  onMessageChange,
  onNameChange,
  messages,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(messageValidateSchema),
    mode: "all",
    reValidateMode: "onBlur",
  });

  const [submmited, setSubmmited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Definindo variantes para os itens do formulário
  const itemVariants = {
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

  // Definindo variantes para o container do formulário (para orquestrar a entrada)
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Pequeno atraso entre cada campo (0.1s)
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.2 }
    },
  };

  const onSubmit = async (data: messageType) => {
    setLoading(true);
    try {
      await axios.post(
        "https://formsubmit.co/ajax/adrianfachidev@gmail.com",
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      reset();
      onEmailChange("");
      onNameChange("");
      onMessageChange("");
      setSubmmited(true);
    } catch (error: any) {
      console.error(
        "Erro ao enviar mensagem:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // Container principal não precisa de animação, apenas para centralização
    <div className="max-w-[calc(100%-2rem)] p-4 md:p-10 m-auto md:max-w-1/2">
      <AnimatePresence mode="wait">
        {!submmited ? (
          // 1. O Formulário (Animação de Entrada e Saída)
          <motion.form
            key="contactForm"
            className="text-sm flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit" // Aplica a animação de saída ao ser removido
          >
            {/* Campo NOME */}
            <motion.div className="flex flex-col gap-1" variants={itemVariants}>
              <label htmlFor="name">_nome:</label>
              <input
                type="text"
                id="name"
                className={`bg-[#02061880] rounded-lg p-2 border  border-gray outline-none shadow-none ${errors.name
                    ? "bg-[#46080930] border-red-500 focus:border-red-500 focus:outline-0"
                    : "focus:border-white"
                  } `}
                value={messages[0]}
                {...register("name", {
                  onChange: (e) => onNameChange(e.target.value),
                })}
              />
              <div className="text-red-500 text-[.7rem]">
                {errors.name?.message}
              </div>
            </motion.div>

            {/* Campo EMAIL */}
            <motion.div className="flex flex-col gap-1" variants={itemVariants}>
              <label htmlFor="email">_email:</label>
              <input
                type="text"
                id="email"
                className={`bg-[#02061880] rounded-lg p-2 border border-gray outline-none shadow-none ${errors.email
                    ? "bg-[#46080930] border-red-500 focus:border-red-500 focus:outline-0"
                    : "focus:border-white"
                  }`}
                value={messages[1]}
                {...register("email", {
                  onChange: (e) => onEmailChange(e.target.value),
                })}
              />
              <div className="text-red-500 text-[.7rem]">
                {errors.email?.message}
              </div>
            </motion.div>

            {/* Campo MENSAGEM */}
            <motion.div className="flex flex-col gap-1" variants={itemVariants}>
              <label htmlFor="message">_mensagem:</label>
              <textarea
                id="message"
                placeholder="sua mensagem aqui..."
                className={`bg-[#02061880] rounded-lg p-2 border border-gray outline-none shadow-none max-h-[250px] scroll-style resize overflow-auto h-[150px] w-[500px] max-w-full ${errors.message
                    ? "bg-[#46080930] border-red-500 focus:border-red-500 focus:outline-0"
                    : "focus:border-white"
                  }`}
                value={messages[2]}
                {...register("message", {
                  onChange: (e) => onMessageChange(e.target.value),
                })}
              ></textarea>
              <div className="text-red-500 text-[.7rem]">
                {errors.message?.message}
              </div>
            </motion.div>

            {/* Botão ENVIAR */}
            <motion.div className="relative w-[100px]" variants={itemVariants}>
              <input
                type="submit"
                value={`${!loading ? "enviar" : ""}`}
                className={`w-full py-2 rounded-lg ${isValid
                    ? "cursor-pointer bg-orange text-black"
                    : "cursor-no-drop bg-gray"
                  }`}
                disabled={loading}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <ScaleLoader
                    color="#000"
                    height={20}
                    width={4}
                    radius={2}
                    margin={2}
                  />
                </div>
              )}
            </motion.div>
          </motion.form>
        ) : (
          // 2. A Mensagem de Sucesso (Animação de Entrada e Saída)
          <motion.div
            key="successMessage"
            className="flex flex-col gap-5 items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as Easing }}
          >
            <h1 className="text-2xl text-white">Muito obrigado! &#x1F918;</h1>
            <div className="flex flex-col gap-1 items-center">
              <p>Sua mensagem foi recebida.</p>
              <p>Você receberá uma resposta em breve!</p>
            </div>
            <input
              type="button"
              value="nova-mensagem"
              className="rounded-lg w-fit px-6 py-2 cursor-pointer bg-orange text-black"
              onClick={() => {
                setSubmmited(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InputsContact;