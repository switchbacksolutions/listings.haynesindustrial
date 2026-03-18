/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#f0f5f9',
          100: '#dce8f1',
          200: '#b5cfe2',
          300: '#84afca',
          400: '#5b8daf',
          500: '#3d6f8f',
          600: '#345e7d',
          700: '#2a4d68',
          800: '#1f3a50',
          900: '#132538',
        },
        gold: {
          300: '#e2c55a',
          400: '#d4ae3a',
          500: '#caa222',
          600: '#a8861c',
          700: '#896d16',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.brand.600'),
              '&:hover': { color: theme('colors.brand.800') },
            },
            'h1, h2, h3, h4': { color: theme('colors.gray.900') },
          },
        },
      }),
    },
  },
  plugins: [],
};
