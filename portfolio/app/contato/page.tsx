"use client";

import Body from "../_components/Body";
import { useState } from "react";
import InputsContact from "../_components/InputsContact";
import MessageCode from "../_components/MessageCode";

export default function Contact() {
  const [messages, setMessages] = useState(["", "", ""]);

  const handleChange = (index: number, value: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <Body navBarActive="contate-me">
      <div className="flex-grow flex flex-col gap-10 md:flex-row overflow-y-auto scroll-style">
        <InputsContact
          onNameChange={(value: string) => handleChange(0, value)}
          onEmailChange={(value: string) => handleChange(1, value)}
          onMessageChange={(value: string) => handleChange(2, value)}
          messages={messages}
        />
        <MessageCode menssages={messages} />
      </div>
    </Body>
  );
}
