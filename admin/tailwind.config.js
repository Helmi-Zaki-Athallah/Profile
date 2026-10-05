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
        admin: {
          bg: '#0A0C10',
          card: '#12161F',
          sidebar: '#0D1117',
          border: '#1E2638',
          hover: '#182030',
          primary: '#4F46E5',
          primaryHover: '#4338CA',
          accent: '#06B6D4',
          textMuted: '#94A3B8',
          success: '#10B981',
          danger: '#EF4444',
          warning: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    },
  },
  plugins: [],
}
