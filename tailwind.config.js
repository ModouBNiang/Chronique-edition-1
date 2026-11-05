/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0c0d0e',
        charcoal: '#141619',
        'charcoal-light': '#1c1f24',
        ivory: '#f4f1ea',
        stone: '#9e9a90',
        ash: '#5a5751',
        ochre: '#c89d66',
        crimson: '#a63a2b',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        editorial: '0.22em',
        ultra: '0.32em',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'curtain': 'cubic-bezier(0.77, 0, 0.175, 1)',
      }
    },
  },
  plugins: [],
};
