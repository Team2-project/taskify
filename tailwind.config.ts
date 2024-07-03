import type { Config } from "tailwindcss";

const px0_50 = Object.fromEntries(
  Array.from({ length: 51 }, (_, i) => [i, `${i}px`]),
);
const px0_100 = Object.fromEntries(
  Array.from({ length: 101 }, (_, i) => [i, `${i}px`]),
);
const px0_200 = Object.fromEntries(
  Array.from({ length: 201 }, (_, i) => [i, `${i}px`]),
);
const px0_1920 = Object.fromEntries(
  Array.from({ length: 1921 }, (_, i) => [i, `${i}px`]),
);

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        ...px0_50, // 0px ~ 50px
        ...px0_100, // 0px ~ 100px
        ...px0_200, // 0px ~ 200px
        ...px0_1920, // 0px ~ 1920px
      },
      height: {
        ...px0_50, // 0px ~ 50px
        ...px0_100, // 0px ~ 100px
        ...px0_200, // 0px ~ 200px
        ...px0_1920, // 0px ~ 1920px
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
        bg: "#DBE6F7",
        text: "#4981D5",
      },
      gray: {
        DEFAULT: "#F5F5F5",
        10: "#FAFAFA",
        20: "#EEEEEE",
        30: "#D9D9D9",
        40: "#9FA6B2",
        50: "#787486",
      },
      green: {
        DEFAULT: "#7AC555",
        10: "#A3C4A2",
        bg: "#E7F7DB",
        text: "#86D549",
      },
      orange: {
        DEFAULT: "#FFA500",
        10: "#FFC85A",
      },
      pink: { DEFAULT: "#E876EA", bg: "#F7DBF0" },
      purple: { DEFAULT: "#760DDE", 10: "#F1EFFD" },
      red: {
        DEFAULT: "#D6173A",
        10: "#F4D7DA",
        20: "#D25B68",
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
