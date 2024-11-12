module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#cc2f2c",
        accent: "#1565C0",
        darkBg: "#1c1c1e",
      },
    },
  },
  plugins: [],
};
