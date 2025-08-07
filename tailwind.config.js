/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B47E0",
        secondary: "#7C6FFF",
        accent: "#FF6B6B",
        surface: "#FFFFFF",
        background: "#F8F9FC",
        success: "#4CAF50",
        warning: "#FF9800",
        error: "#F44336",
        info: "#2196F3",
      },
      fontFamily: {
        'display': ['Pretendard', 'sans-serif'],
        'body': ['Noto Sans KR', 'sans-serif'],
      },
      scale: {
        '103': '1.03',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}