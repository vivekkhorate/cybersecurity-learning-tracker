/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0D1117',
          card: '#161B22',
          border: '#30363D',
          hover: '#21262D',
          primary: '#00E5FF',
          accent: '#00FF88',
          muted: '#8B949E',
          danger: '#FF5555',
          warning: '#FFB86C',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'cyber-glow': '0 0 20px rgba(0, 229, 255, 0.15)',
        'accent-glow': '0 0 20px rgba(0, 255, 136, 0.15)',
        'card-glow': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(22, 27, 34, 0.8) 0%, rgba(13, 17, 23, 0.9) 100%)',
        'cyan-gradient': 'linear-gradient(135deg, #00E5FF 0%, #0099FF 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #00FF88 0%, #00B359 100%)',
      }
    },
  },
  plugins: [],
}
