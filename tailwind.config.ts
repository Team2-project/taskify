import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "768px",
      desktop: "1280px",
    },

    colors: {
      red: "#D6173A",
      green: "#7AC555",
      purple: "#760DDE",
      orange: "#FFA500",
      pink: "#E876EA",
      white: "#ffffff",
      blue: "#76A5EA",

      gray: {
        10: "#FAFAFA",
        20: "#EEEEEE",
        30: "#D9D9D9",
        40: "#9FA6B2",
        50: "#787486",
      },
      black: {
        DEFAULT: "#000000",
        10: "#4B4B4B",
        20: "#333236",
        30: "#171717",
      },
      violet: {
        10: "#F1EFFD",
        20: "#5534DA",
      },
    },
  },
  plugins: [],
};
export default config;

