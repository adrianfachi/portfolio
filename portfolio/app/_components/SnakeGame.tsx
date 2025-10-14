"use client";

import React, { useEffect, useState } from "react";
import {
  IoMdArrowDropdown,
  IoMdArrowDropleft,
  IoMdArrowDropright,
  IoMdArrowDropup,
} from "react-icons/io";

type Position = {
  x: number;
  y: number;
};

const GRID_SIZE = 20;
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
const INITIAL_FOOD: Position = { x: 15, y: 10 };
const MAX_FOOD = 10;

function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">(
    "RIGHT",
  );
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [foodEaten, setFoodEaten] = useState(0);

  // movimentação com setas
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
    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  });

  function moveSnake() {
    const head = { ...snake[0] };
    if (direction === "UP") head.y -= 1;
    if (direction === "DOWN") head.y += 1;
    if (direction === "LEFT") head.x -= 1;
    if (direction === "RIGHT") head.x += 1;

    // colisão com borda
    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x >= GRID_SIZE ||
      head.y >= GRID_SIZE
    ) {
      setGameOver(true);
      return;
    }

    // colisão com corpo
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];

    // comeu comida
    if (head.x === food.x && head.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      });
      setFoodEaten((prev) => Math.min(prev + 1, MAX_FOOD));
    } else {
      newSnake.pop();
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
  }

  return (
    <div className="hidden items-center justify-center bg-gradient-to-br from-[#00d5c082] to-[#43D9AD13] lg:flex rounded-2xl m-4">
      <div className="flex space-x-6 p-6 rounded-2xl shadow-xl">
        <div className="bg-[#0a1a2a] rounded-xl shadow-lg relative">
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
            className="bg-transparent"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${GRID_SIZE}, 15px)`,
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              const isSnake = snake.some((s) => s.x === x && s.y === y);
              const isFood = food.x === x && food.y === y;
              const isHead = snake[0].x === x && snake[0].y === y;

              return (
                <div
                  key={i}
                  className={`h-[15px] w-[15px] ${
                    isHead && !gameOver
                      ? `bg-[#43D9AD] shadow-[0_0_8px_#22d3ee] ${
                          direction === "UP"
                            ? "rounded-t-2xl"
                            : direction === "LEFT"
                              ? "rounded-l-2xl"
                              : direction === "DOWN"
                                ? "rounded-b-2xl"
                                : "rounded-r-2xl"
                        }`
                      : isSnake
                        ? "bg-[#43D9AD] shadow-[0_0_8px_#22d3ee]"
                        : isFood
                          ? "bg-green-400 rounded-full shadow-[0_0_6px_#4ade80]"
                          : "bg-transparent"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Painel lateral */}
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

          <div>
            <p>// comidas</p>
            <div className="flex space-x-2 mt-2">
              {Array.from({ length: MAX_FOOD }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < foodEaten
                      ? "bg-[#43D9AD] shadow-[0_0_12px_#22d3ee]"
                      : "bg-[#1b2c3c]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SnakeGame;
