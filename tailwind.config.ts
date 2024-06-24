import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "351": "351px",
        "520": "520px",
      },
      height: {
        "50": "50px",
        "77": "77px",
      },
    },

    screens: {
      tablet: "768px",
      desktop: "1280px",
    },

    colors: {
      black: {
        DEFAULT: "#000000",
        10: "#4B4B4B",
        20: "#333236",
        30: "#171717",
      },
      blue: {
        DEFAULT: "#76A5EA",
        10: "#9DD7ED",
      },
      gray: {
        10: "#FAFAFA",
        20: "#EEEEEE",
        30: "#D9D9D9",
        40: "#9FA6B2",
        50: "#787486",
      },
      green: {
        DEFAULT: "#7AC555",
        10: "#A3C4A2",
      },
      orange: {
        DEFAULT: "#FFA500",
        10: "#FFC85A",
      },
      pink: "#E876EA",
      purple: "#760DDE",
      red: {
        DEFAULT: "#D6173A",
        10: "#F4D7DA",
      },
      sand: "#C4B1A2",
      violet: {
        10: "#F1EFFD",
        20: "#5534DA",
      },
      white: "#ffffff",
      yellow: "#FDD446",
    },
  },
  plugins: [],
};
export default config;
