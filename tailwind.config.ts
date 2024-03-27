import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#4f72b8',
        'custom-black':'#13191e'
      },
    },
  },
  plugins: [],
} satisfies Config;
