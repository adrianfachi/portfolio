"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

type props = {
	active: string;
	setActiveBoolean: Dispatch<SetStateAction<boolean>>
};

// Dados dos links para simplificar a manutenção
const menuItems = [
	{ href: "/", label: "_home", key: "home" },
	{ href: "/sobre", label: "_sobre", key: "sobre" },
	{ href: "/projetos", label: "_projetos", key: "projetos" },
];

function NavBar({ active, setActiveBoolean }: props) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleLinkClick = () => {
		setIsMenuOpen(false);
		setActiveBoolean(false);
	};

	return (
		<div className="relative">
			<div className="absolute flex top-1/2 -translate-y-1/2 right-4 z-50 md:hidden">
				<button
					onClick={() => {
						setIsMenuOpen(!isMenuOpen);
						setActiveBoolean(isMenuOpen)
					}}
					className="text-primary hover:text-purple transition"
					aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
				>
					{isMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
				</button>
			</div>

			<div className="hidden md:flex gap-16 w-full h-8 border-b-gray text-primary text-xs border-b">
				<p className="text-nowrap pl-6 flex items-center">
					adrian-fachi
				</p>

				<div className="flex justify-between w-full">
					<div className="flex h-8 border-l border-gray">
						{menuItems.map((item) => (
							<Link
								key={item.key}
								href={item.href}
								className={`${
									active === item.key ? "active" : ""
								} border-gray px-6 flex items-center border-b-0 border-r cursor-pointer transition-[border-width] ease-in-out duration-200 hover:border-b-4`}
							>
								{item.label}
							</Link>
						))}
					</div>
					<Link
						href={"/contato"}
						className={`${
							active === "contate-me" ? "active" : ""
						} border-l border-gray px-6 flex items-center border-b-0 cursor-pointer transition-[border-width] ease-in-out duration-200 hover:border-b-4`}
					>
						_contate-me
					</Link>
				</div>
			</div>

			<div
				className={`fixed top-0 left-0 h-screen w-full bg-background z-40 transform transition-transform duration-300 ease-in-out ${
					isMenuOpen ? "translate-y-0" : "-translate-y-full"
				} md:hidden`}
			>
				<div className="flex flex-col pt-16 m-4">
					<p className="text-xs text-primary px-6 mb-2"># navigate:</p>
					{menuItems.map((item) => (
						<Link
							key={item.key}
							href={item.href}
							onClick={handleLinkClick}
							className={`text-base text-white px-6 h-10 flex items-center border-b border-gray hover:bg-white/5 transition ${
								active === item.key ? "text-purple font-bold" : ""
							}`}
						>
							{item.label}
						</Link>
					))}
					<Link
						href="/contato"
						onClick={handleLinkClick}
						className={`text-base text-white px-6 h-10 flex items-center border-b border-gray  hover:bg-white/5 transition ${
							active === "contate-me" ? "text-purple font-bold" : ""
						}`}
					>
						_contate-me
					</Link>
				</div>
			</div>

			{isMenuOpen && (
				<div
					className="fixed inset-0 background-stripes bg-[#0F172B] z-30 md:hidden m-4 mt-12 border border-gray rounded-b-lg"
					onClick={handleLinkClick}
				/>
			)}
			<div className="border-b-gray text-primary text-xs border-b pl-6 h-8 flex items-center gap-16 md:hidden">
				<p className="media2">adrian-fachi</p>
			</div>
		</div>
	);
}

export default NavBar;
