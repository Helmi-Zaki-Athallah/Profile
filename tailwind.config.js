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
        background: '#0e0e11',
        surface: {
          DEFAULT: '#141419',
          hover: '#1b1b22',
          card: '#16161c',
          border: '#272732',
        },
        cobalt: {
          DEFAULT: '#455CE9',
          hover: '#3348d6',
          glow: 'rgba(69, 92, 233, 0.4)',
        },
        brand: {
          cyan: '#00F0FF',
          blue: '#455CE9',
          purple: '#8B5CF6',
        }
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        editorial: ['"Playfair Display"', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
        'marquee-slow': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 22s linear infinite',
      }
    },
  },
  plugins: [],
}
