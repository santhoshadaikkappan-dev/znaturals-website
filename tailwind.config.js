/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'botanical-ivory': '#F5F0E6',
        'sage-green': '#66765C',
        'sage-light': '#8A9980',
        'deep-forest': '#263D32',
        'deep-forest-dark': '#1C2E25',
        'warm-sand': '#D9CBB5',
        'warm-sand-light': '#E9DFD0',
        'muted-blush': '#D9B9AE',
        'soft-olive': '#A4A486',
        'cocoa-brown': '#705B49',
        'champagne-gold': '#C5A16B',
        'gold-light': '#DFC293',
        'soft-white': '#FFFCF7',
        'charcoal': '#292B27',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        editorial: ['"DM Serif Display"', 'serif'],
      },
      boxShadow: {
        'botanical': '0 10px 30px -10px rgba(38, 61, 50, 0.08)',
        'botanical-lg': '0 20px 40px -15px rgba(38, 61, 50, 0.12)',
        'gold-glow': '0 0 20px rgba(197, 161, 107, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
