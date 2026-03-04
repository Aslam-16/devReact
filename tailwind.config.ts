// tailwind.config.ts
import type { Config } from "tailwindcss";
import daisyui from "daisyui"; // Import the plugin

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // Add daisyUI as a plugin
};

export default config;
