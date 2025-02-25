import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'premier-blue': '#142944',
        'premier-orange': '#D67945',
      },
      fontFamily: {
        heebo: ['var(--font-heebo)', 'sans-serif'], 
        'ranade': ['Ranade', 'sans-serif'],
        'ranade-thin': ['Ranade', 'sans-serif'],
        'ranade-light': ['Ranade', 'sans-serif'],
        'ranade-regular': ['Ranade', 'sans-serif'],
        'ranade-medium': ['Ranade', 'sans-serif'],
        'ranade-bold': ['Ranade', 'sans-serif'],
        'ranade-bold-italic': ['Ranade', 'sans-serif'],
        'ranade-medium-italic': ['Ranade', 'sans-serif'],
        'ranade-italic': ['Ranade', 'sans-serif'],
        'ranade-light-italic': ['Ranade', 'sans-serif'],
        'ranade-thin-italic': ['Ranade', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
} satisfies Config;
