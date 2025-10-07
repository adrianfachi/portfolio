"use client";
import { useEffect, useRef, useState } from "react";

type props = {
	text: string;
	title: string;
};

export default function TextArea({ title, text }: props) {
	const textContentRef = useRef<HTMLDivElement>(null);
	const [lineCount, setLineCount] = useState(1);

	const computeLines = () => {
		const el = textContentRef.current;
		if (!el) return;

		const style = window.getComputedStyle(el);
		const lineHeightUnit = style.lineHeight;
		const lineHeight = parseFloat(lineHeightUnit);

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
	}, [text]);


	return (
		<div className="flex text-sm w-full text-primary p-2">
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
                            <p>{i == 0 ? "/**": i == lineCount ? "*/": "*"}</p>
                    </div>
				))}
			</div>

			{/* 3. Estrutura do Conteúdo com Div Isolado */}
			<div>
				<div
					ref={textContentRef}
					// Estilo essencial para o cálculo
					style={{ lineHeight: "1.5rem" }}
                    className="pt-6"
				>
					<h1>{title}</h1>
					{text}
				</div>
			</div>
		</div>
	);
}
