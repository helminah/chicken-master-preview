import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Impact", "Haettenschweiler", "Arial Narrow", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        coal: "#090705",
        ember: "#f59e0b",
        flame: "#ef4e22",
        cream: "#fff7df",
        palm: "#2c6e49",
      },
      boxShadow: {
        ember: "0 0 60px rgba(245, 158, 11, 0.28)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 18s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
