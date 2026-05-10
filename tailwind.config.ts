import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        luxury: {
          bg: '#FAFAF8',
          ink: '#1C1C1A',
          gold: '#B8860B',
          border: 'rgba(0, 0, 0, 0.06)',
          secondary: '#6B6B69',
          accent: '#D4AF37',
        },
      },
      boxShadow: {
        premium: '0 20px 40px -10px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)',
        embossed: '4px 4px 10px #ebeae7, -4px -4px 10px #ffffff',
      },
    },
  },
  plugins: [],
}
export default config
