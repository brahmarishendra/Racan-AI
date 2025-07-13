/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'monospace'],
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        accent: {
          50: '#ffe6ee',
          100: '#ffcce0',
          200: '#ff99c2',
          300: '#ff66a3',
          400: '#ff3385',
          500: '#ff0066',
          600: '#cc0052',
          700: '#99003d',
          800: '#660029',
          900: '#330014',
        },
        purple: {
          50: '#f5eeff',
          100: '#e8d9ff',
          200: '#d1b3ff',
          300: '#b98eff',
          400: '#a168ff',
          500: '#973cff',
          600: '#7a30cc',
          700: '#5b2499',
          800: '#3d1966',
          900: '#1e0c33',
        },
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        floatLeft: 'floatLeft 6s ease-in-out infinite',
        floatRight: 'floatRight 8s ease-in-out infinite',
        fadeInUp: 'fadeInUp 1s ease-out forwards',
        scrollWheel: 'scrollWheel 1.5s infinite',
      },
    },
  },
  plugins: [],
};