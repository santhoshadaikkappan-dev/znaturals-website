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
        serif: ['"Fraunces"', '"DM Serif Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        editorial: ['"Fraunces"', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'botanical': '0 8px 24px -6px rgba(38, 61, 50, 0.08)',
        'botanical-lg': '0 16px 36px -10px rgba(38, 61, 50, 0.12)',
      },
    },
  },
  plugins: [],
}
