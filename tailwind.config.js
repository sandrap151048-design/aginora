/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#FF5C00", // Reassigned to Orange
          blue: "#FFB000",  // Reassigned to Yellow/Gold
        },
        secondary: {
          green: "#FFF5E8", // Light Orange
          blue: "#FFFCE8",  // Light Yellow
        },
        orange: "#FF5C00",
        yellow: "#FFB000",
        dark: "#0F172A",
        light: "#F8FAFC",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #FF5C00 0%, #FFB000 100%)',
      },
    },
  },
  plugins: [],
};
