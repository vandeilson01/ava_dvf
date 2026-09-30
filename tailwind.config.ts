import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#11283b',
        navy: '#173f5f',
        teal: '#1f7a8c',
        mint: '#4fb3a4',
        cream: '#f6f8f5',
        warm: '#fffdf8',
        line: '#dbe5e7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 35px rgba(23, 63, 95, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config
