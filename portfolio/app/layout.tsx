import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adrian Fachi",
  description: "Portfólio pessoal do Adrian Fachi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${firaCode.className} antialiased`}>
      <head>
        <link rel="icon" href="AF.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
