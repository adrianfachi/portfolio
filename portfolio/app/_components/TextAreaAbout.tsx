"use client";
import { useEffect, useRef, useState } from "react";

type props = {
	text: string;
	title: string;
};

export default function TextAreaAbout({ title, text }: props) {
	// 1. Mude a referência para o novo elemento que conterá SÓ o texto.
	const textContentRef = useRef<HTMLDivElement>(null);
	const [lineCount, setLineCount] = useState(1);

	const computeLines = () => {
		const el = textContentRef.current;
		if (!el) return;

		// Obtém o lineHeight computado do DOM (precisa ser um número em 'px')
		const style = window.getComputedStyle(el);
		const lineHeightUnit = style.lineHeight; // Pega o valor, ex: "24px"

		// Converte para número (em px)
		const lineHeight = parseFloat(lineHeightUnit);

		// Se por algum motivo o lineHeight não for um número válido, evita divisão por zero.
		if (isNaN(lineHeight) || lineHeight === 0) {
			setLineCount(1);
			return;
		}

		// scrollHeight é a altura mínima necessária para mostrar todo o conteúdo.
		const totalHeight = el.scrollHeight;

		// Calcula o número de linhas (arredondado para o mais próximo)
		const lines = Math.round(totalHeight / lineHeight);

		// Garante que a contagem seja pelo menos 1 (para o caso de texto vazio ou erro)
		setLineCount(lines > 0 ? lines : 1);
	};

	useEffect(() => {
		// 2. Garanta que o cálculo rode inicialmente e ao redimensionar
		computeLines();

		const handleResize = () => computeLines();
		window.addEventListener("resize", handleResize);

		// O recalculo também é necessário se o *texto* mudar.
		return () => window.removeEventListener("resize", handleResize);
	}, [text]); // Adicionamos 'text' para re-rodar se o texto mudar.


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
