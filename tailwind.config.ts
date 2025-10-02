import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./server/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#1B263B",
          secondary: "#415A77",
          subtle: "#778DA9",
        },
        light: {
          primary: "#E0E1DD",
          secondary: "#E0E1DD",
        },
      },
    },
  },
  plugins: [],
};

export default config;
