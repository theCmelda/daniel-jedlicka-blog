import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // V1 Bali Tropical palette
        palm: "#1F6B47",
        palmDark: "#13452D",
        coral: "#FF6B5B",
        coralDark: "#E5523F",
        sun: "#FFD15B",
        sunDark: "#F2B33B",
        sand: "#FFF6E5",
        cream: "#FFFAF0",
        ink: "#1A1A1A",
        muted: "#5A5A5A",
      },
      fontFamily: {
        display: ["'Caveat'", "cursive"],
        serif: ["'Playfair Display'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        chunk: "6px 6px 0px 0px rgba(31, 107, 71, 1)",
        chunkCoral: "6px 6px 0px 0px rgba(255, 107, 91, 1)",
        chunkSun: "6px 6px 0px 0px rgba(255, 209, 91, 1)",
      },
      borderRadius: {
        chunk: "18px",
      },
    },
  },
  plugins: [],
};

export default config;
