module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ytd: {
          900: "#181818",
          800: "#212121",
          700: "#3d3d3d",
          200: "#aaaaaa",
          100: "#ffffff",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    // ...
  ],
};
