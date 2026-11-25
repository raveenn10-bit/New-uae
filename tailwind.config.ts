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
          blue: '#207FBA',
          'blue-dark': '#176291',
          'blue-light': '#E8F3FA',
          navy: '#071827',
          'navy-mid': '#0D263D',
          black: '#101010',
          steel: '#64748B',
          'light-grey': '#F1F5F9',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'var(--font-manrope)', 'system-ui', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        industrial: '-0.025em',
        widecaps: '0.16em',
      },
      boxShadow: {
        industrial: '0 20px 50px -12px rgba(7, 24, 39, 0.14)',
        'industrial-lg': '0 30px 70px -15px rgba(7, 24, 39, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
