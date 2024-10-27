// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 例: src フォルダ内の全てのJS/TSファイル
    "./public/index.html",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
