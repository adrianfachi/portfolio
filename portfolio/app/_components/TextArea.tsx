"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  title: string;
  animateTypewriter?: boolean;
};

export default function TextArea({ title, text, animateTypewriter }: Props) {
  const textContentRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(1);
  const [displayedText, setDisplayedText] = useState("");
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    timeouts.current.forEach((t) => clearTimeout(t));
    timeouts.current = [];

    if (animateTypewriter) {
      setDisplayedText(text);
      return;
    }

    setDisplayedText("");
    const chars = Array.from(text);

    chars.forEach((char, i) => {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + char);
      }, i * 10);
      timeouts.current.push(timeout);
    });

    return () => {
      timeouts.current.forEach((t) => clearTimeout(t));
      timeouts.current = [];
    };
  }, [text, animateTypewriter]);

  const computeLines = () => {
    const el = textContentRef.current;
    if (!el) return;
    const style = window.getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight);
    if (isNaN(lineHeight) || lineHeight === 0) {
      setLineCount(1);
      return;
    }
    const totalHeight = el.scrollHeight;
    const lines = Math.round(totalHeight / lineHeight);
    setLineCount(lines > 0 ? lines : 1);
  };

  useEffect(() => {
    computeLines();
    const handleResize = () => computeLines();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [displayedText]);

  return (
    <div
      className="flex text-sm w-full text-primary p-2 h-full md:overflow-y-auto scroll-style"
    >
      <div className="flex items-end flex-col px-2 select-none">
        {Array.from({ length: lineCount + 1 }, (_, i) => (
          <div key={i} className="flex gap-4" style={{ lineHeight: "1.5rem" }}>
            {i + 1}
          </div>
        ))}
      </div>

      <div className="flex items-end flex-col px-2 select-none">
        {Array.from({ length: lineCount + 1 }, (_, i) => (
          <div key={i} className="flex gap-4" style={{ lineHeight: "1.5rem" }}>
            <p>{i === 0 ? "/**" : i === lineCount ? "*/" : "*"}</p>
          </div>
        ))}
      </div>

      <div>
        <div
          ref={textContentRef}
          style={{ lineHeight: "1.5rem" }}
          className="pt-6 whitespace-pre-wrap"
        >
          <h1>{title}</h1>
          {displayedText}
        </div>
      </div>
    </div>
  );
}
