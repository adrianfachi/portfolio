import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        primary: "var(--primary)",
        white: "var(--white)",
        purple: "var(--purple)",
        green: "var(--green)",
        red: "var(--red)",
        orange: "var(--orange)",
      },
    },
  },
  plugins: [],
};

export default config;
