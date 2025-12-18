/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      colors: {
        cream: "#f8f7f4",
        "dark-text": "#2c2c2c",
        "accent-brown": "#8b7355",
        "accent-brown-dark": "#7c7562",
        "light-gray": "#e0dfd9",
        "border-light": "rgba(124, 117, 98, 0.2)",
        "gradient-start": "#6366f1",
        "gradient-end": "#a855f7",
        "cyan-accent": "#00d4ff",
        "purple-accent": "#7d2ae8",
        "pink-accent": "#ff006e",
      },
      backgroundImage: {
        "gradient-purple": "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
        "gradient-cyan-purple": "linear-gradient(135deg, #00d4ff 0%, #7d2ae8 50%, #ff006e 100%)",
        "gradient-dark": "linear-gradient(135deg, #050505 0%, #0a0a0a 100%)",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        "fade-in": "fadeIn 0.8s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease",
        "ken-burns": "kenBurns 20s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.6s ease-out backwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1.05) translateX(0)" },
          "50%": { transform: "scale(1.1) translateX(-2%)" },
          "100%": { transform: "scale(1.05) translateX(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
}
