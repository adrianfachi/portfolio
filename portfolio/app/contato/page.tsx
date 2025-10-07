"use client";

import Body from "../_components/Body";
import NavBar from "../_components/NavBar";
import Footer from "../_components/Footer";
import { useState } from "react";
import InputsContact from "../_components/InputsContact";
import MessageCode from "../_components/MessageCode";

export default function Contact() {
	const [activeMenu, setActiveMenu] = useState<boolean>(false);
	const [messages, setMessages] = useState(["", "", ""]);

	const handleChange = (index: number, value: string) => {
		setMessages((prev) => {
			const updated = [...prev];
			updated[index] = value;
			return updated;
		});
	};

	return (
		<Body>
			<NavBar active="contate-me" setActiveBoolean={setActiveMenu} />
			{!activeMenu ? (
				<>
					<div className="flex-grow flex flex-col gap-10 md:flex-row">
						<InputsContact
							onNameChange={(value: string) => handleChange(0, value)}
							onEmailChange={(value: string) => handleChange(1, value)}
							onMessageChange={(value: string) => handleChange(2, value)}
              messages={messages}
						/>
            <MessageCode menssages={messages}/>
					</div>
					<Footer />
				</>
			) : null}
		</Body>
	);
}
