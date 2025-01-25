import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {          
          primary: "#004AAD",
          secondary: "#049276",
          accent: "#EDA464",
          neutral: "#D1D2D3",
          "base-100": "#FFFFFF",
          "base-200": "#DCFFF8",
          "base-300": "#E5E5E5",
          info: "#3ABFF8",
          success: "#52C41A",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
