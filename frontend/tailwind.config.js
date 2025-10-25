/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        // Purple Scale
        purple: {
          100: 'rgb(from var(--purple-100) r g b / <alpha-value>)',
          200: 'rgb(from var(--purple-200) r g b / <alpha-value>)',
          300: 'rgb(from var(--purple-300) r g b / <alpha-value>)',
          400: 'rgb(from var(--purple-400) r g b / <alpha-value>)',
          500: 'rgb(from var(--purple-500) r g b / <alpha-value>)',
          600: 'rgb(from var(--purple-600) r g b / <alpha-value>)',
          700: 'rgb(from var(--purple-700) r g b / <alpha-value>)',
          800: 'rgb(from var(--purple-800) r g b / <alpha-value>)',
          900: 'rgb(from var(--purple-900) r g b / <alpha-value>)',
          1000: 'rgb(from var(--purple-1000) r g b / <alpha-value>)',
          1100: 'rgb(from var(--purple-1100) r g b / <alpha-value>)',
          1200: 'rgb(from var(--purple-1200) r g b / <alpha-value>)',
        },
        // Mauve Scale
        mauve: {
          100: 'rgb(from var(--mauve-100) r g b / <alpha-value>)',
          100_50: 'var(--mauve-100-50)', // Esta já tem transparência definida
          200: 'rgb(from var(--mauve-200) r g b / <alpha-value>)',
          300: 'rgb(from var(--mauve-300) r g b / <alpha-value>)',
          400: 'rgb(from var(--mauve-400) r g b / <alpha-value>)',
          500: 'rgb(from var(--mauve-500) r g b / <alpha-value>)',
          600: 'rgb(from var(--mauve-600) r g b / <alpha-value>)',
          700: 'rgb(from var(--mauve-700) r g b / <alpha-value>)',
          800: 'rgb(from var(--mauve-800) r g b / <alpha-value>)',
          900: 'rgb(from var(--mauve-900) r g b / <alpha-value>)',
          1000: 'rgb(from var(--mauve-1000) r g b / <alpha-value>)',
          1100: 'rgb(from var(--mauve-1100) r g b / <alpha-value>)',
          1200: 'rgb(from var(--mauve-1200) r g b / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xs: 'calc(var(--radius) - 6px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
