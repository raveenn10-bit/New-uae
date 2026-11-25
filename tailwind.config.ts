import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        petro: {
          // Slate Blue & Silver palette
          blue: '#354B60', // slate — primary actions, accent text on light
          'blue-dark': '#101820', // hover / pressed
          'blue-light': '#F0F5F7', // mist — tinted pills and surfaces
          steel: '#354B60',
          'steel-blue': '#7394AC', // lines, fills, icons, progress
          silver: '#B8D0DE', // accent on dark backgrounds
          navy: '#101820', // ink — dark sections, headings
          'navy-mid': '#354B60',
          black: '#101820',
          'light-grey': '#F0F5F7',
          white: '#FFFFFF',
        },

      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'var(--font-manrope)', 'system-ui', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      // Wide container so content reaches the screen edges on large monitors.
      maxWidth: {
        '7xl': '112rem',
      },
      letterSpacing: {
        industrial: '-0.025em',
        widecaps: '0.16em',
      },
      boxShadow: {
        industrial: '0 20px 50px -12px rgba(16, 24, 32, 0.14)',
        'industrial-lg': '0 30px 70px -15px rgba(16, 24, 32, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
