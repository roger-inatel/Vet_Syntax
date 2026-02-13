import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111213",
        mist: "#f6f4f1",
        clay: "#c9b8a6",
        fern: "#3c5f4e",
      },
      boxShadow: {
        soft: "0 12px 30px rgba(17, 18, 19, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
