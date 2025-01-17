import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        lrt: {
          ag: "#F5911F",
          kj: "#ED0F4C",
          sp: "#8D0C06",
        },
        mrt: {
          kg: "#008640",
          py: "#FBCD20",
        },
        mr: {
          kl: "#81BC00",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
