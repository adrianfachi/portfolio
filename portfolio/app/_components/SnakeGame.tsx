"use client";

import React, { useEffect, useState } from "react";
import {
  IoMdArrowDropdown,
  IoMdArrowDropleft,
  IoMdArrowDropright,
  IoMdArrowDropup,
} from "react-icons/io";
import { motion } from "framer-motion"; // AnimatePresence não é necessário, mas motion sim

type Position = {
  x: number;
  y: number;
};

const GRID_SIZE = 20;
const CELL_SIZE = 15;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD: Position = { x: 15, y: 10 };

function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">(
    "RIGHT",
  );
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [foodEaten, setFoodEaten] = useState(0);
  const [foodAnimation, setFoodAnimation] = useState<Position | null>(null);
  const [eatenFoodPosition, setEatenFoodPosition] = useState<Position | null>(
    null,
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  useEffect(() => {
    if (!started || gameOver) return;
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  });

  function generateFood(snake: Position[]): Position {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snake.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y,
      )
    );
    return newFood;
  }

  function moveSnake() {
    const head = { ...snake[0] };
    if (direction === "UP") head.y -= 1;
    if (direction === "DOWN") head.y += 1;
    if (direction === "LEFT") head.x -= 1;
    if (direction === "RIGHT") head.x += 1;

    // Checagem de Colisão
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= GRID_SIZE ||
      head.y >= GRID_SIZE ||
      snake.some((s) => s.x === head.x && s.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];
    setEatenFoodPosition(null); // Limpa a posição da comida a cada movimento

    if (head.x === food.x && head.y === food.y) {
      // A cobra comeu
      setFoodAnimation({ x: food.x, y: food.y });
      setEatenFoodPosition({ x: food.x, y: food.y }); // Guarda a posição para a animação do novo segmento
      setFood(generateFood(newSnake)); // Gera nova comida
      setFoodEaten((prev) => prev + 1);
    } else {
      newSnake.pop(); // Remove a cauda se não comeu
    }

    setSnake(newSnake);
  }

  function resetGame() {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection("RIGHT");
    setGameOver(false);
    setFoodEaten(0);
    setStarted(true);
    setEatenFoodPosition(null);
  }

  return (
    // MODIFICADO: O div foi alterado para motion.div e as propriedades de animação foram adicionadas
    <motion.div
      initial={{ opacity: 0, x: 100 }} // Começa invisível e 100px para a direita
      animate={{ opacity: 1, x: 0 }} // Anima para visível e na posição correta
      transition={{ duration: 0.8, type: "spring", stiffness: 100, delay: 1 }} // Transição suave
      className="hidden items-center justify-center bg-gradient-to-br from-[#00d5c082] to-[#43D9AD13] lg:flex rounded-2xl m-4"
    >
      <div className="flex space-x-6 p-6 rounded-2xl shadow-xl">
        <div className="bg-[#0a1a2a] rounded-xl shadow-lg relative z-2">
          {/* O Seu layout original para Start/Game Over */}
          {!started ? (
            <button
              onClick={resetGame}
              className="absolute top-2/3 left-1/2 transform -translate-x-1/2 bg-orange rounded-[8px] px-4 text-black flex items-center cursor-pointer"
            >
              começar
            </button>
          ) : gameOver ? (
            <div className="absolute top-2/3 w-full text-xl flex flex-col items-center">
              <span className="bg-[#011627] w-full text-center text-green">
                GAME OVER!
              </span>
              <span
                className="text-base text-primary text-[.6rem] cursor-pointer"
                onClick={resetGame}
              >
                Tente novamente
              </span>
            </div>
          ) : null}

          <div
            style={{
              top: 0,
              left: 0,
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
              pointerEvents: "none",
            }}
          >
            {/* Animação da Comida (Mais vibrante) */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                rotate: [0, 15, -15, 0], // Adicionado rotação
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute rounded-full shadow-[0_0_8px_#4ade80]"
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                background: "#4ade80",
              }}
            />

            {/* Animação de Efeito de "Partícula" de Comida (Mais rápido) */}
            {foodAnimation && (
              <motion.div
                initial={{
                  left: foodAnimation.x * CELL_SIZE,
                  top: foodAnimation.y * CELL_SIZE,
                  scale: 1,
                  opacity: 1,
                }}
                animate={{
                  scale: 0,
                  opacity: 0,
                  y: -CELL_SIZE, // Animação para cima
                }}
                transition={{
                  duration: 0.3, // Mais rápido
                  ease: "easeOut",
                }}
                className="absolute w-[15px] h-[15px] rounded-full bg-yellow-300 shadow-[0_0_6px_#facc15] pointer-events-none"
                onAnimationComplete={() => setFoodAnimation(null)}
              />
            )}

            {/* Renderização da Cobra com Animação de Crescimento */}
            {snake.map((seg, idx) => {
              const isHead = idx === 0;
              const isNewSegment = eatenFoodPosition && idx === 0;

              const alpha = 1 - (idx / (snake.length - 1)) * 0.2;
              const bg = `rgba(67,217,173)`;

              // Define a posição inicial SOMENTE para o novo segmento
              const initialPos = isNewSegment
                ? {
                  left: eatenFoodPosition.x * CELL_SIZE,
                  top: eatenFoodPosition.y * CELL_SIZE,
                  scale: 0.1, // Começa bem pequeno
                  opacity: 0.5,
                }
                : {
                  left: seg.x * CELL_SIZE,
                  top: seg.y * CELL_SIZE,
                };

              return (
                <motion.div
                  key={`seg-${idx}`}
                  initial={initialPos}
                  animate={{
                    left: seg.x * CELL_SIZE,
                    top: seg.y * CELL_SIZE,
                    opacity: alpha,
                    scale: isHead ? 1.05 : 1, // Pequeno pulsar na cabeça
                  }}
                  transition={{
                    type: "tween",
                    ease: "linear",
                    duration: 0.14,
                  }}
                  style={{
                    position: "absolute",
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    background: bg,
                    boxShadow: isHead
                      ? "0 0 10px rgba(34,211,238,0.7)"
                      : "none",
                    pointerEvents: "none",
                  }}
                  className={`${isHead
                    ? direction === "UP"
                      ? "rounded-t-2xl"
                      : direction === "LEFT"
                        ? "rounded-l-2xl"
                        : direction === "DOWN"
                          ? "rounded-b-2xl"
                          : "rounded-r-2xl"
                    : ""
                    }`}
                />
              );
            })}
          </div>
        </div>

        {/* Barra Lateral (Controles e Score) */}
        <div className="text-gray-200 font-mono space-y-6">
          <div>
            <p>// use as setas do</p>
            <p>// teclado para jogar</p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div />
              <div className="p-2 bg-[#1b2c3c] rounded-md">
                <IoMdArrowDropup />
              </div>
              <div />
              <div className="p-2 bg-[#1b2c3c] rounded-md">
                <IoMdArrowDropleft />
              </div>
              <div className="p-2 bg-[#1b2c3c] rounded-md">
                <IoMdArrowDropdown />
              </div>
              <div className="p-2 bg-[#1b2c3c] rounded-md">
                <IoMdArrowDropright />
              </div>
            </div>
          </div>
          <p>// score: {foodEaten + 1}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default SnakeGame;