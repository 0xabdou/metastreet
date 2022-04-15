module.exports = {
  content: ["./src/**/*.tsx", "./src/styles/*"],
  theme: {
    extend: {},
  },

  plugins: [require("@tailwindcss/line-clamp")],
};
