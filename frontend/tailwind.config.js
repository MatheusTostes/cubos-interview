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
      screens: {
        xs: '375px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        border: 'rgb(from var(--border) r g b / <alpha-value>)',
        input: 'rgb(from var(--input) r g b / <alpha-value>)',
        ring: 'rgb(from var(--ring) r g b / <alpha-value>)',
        background: 'rgb(from var(--background) r g b / <alpha-value>)',
        foreground: 'rgb(from var(--foreground) r g b / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(from var(--primary) r g b / <alpha-value>)',
          foreground:
            'rgb(from var(--primary-foreground) r g b / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(from var(--secondary) r g b / <alpha-value>)',
          foreground:
            'rgb(from var(--secondary-foreground) r g b / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(from var(--destructive) r g b / <alpha-value>)',
          foreground:
            'rgb(from var(--destructive-foreground) r g b / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(from var(--muted) r g b / <alpha-value>)',
          foreground: 'rgb(from var(--muted-foreground) r g b / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(from var(--accent) r g b / <alpha-value>)',
          foreground:
            'rgb(from var(--accent-foreground) r g b / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgb(from var(--popover) r g b / <alpha-value>)',
          foreground:
            'rgb(from var(--popover-foreground) r g b / <alpha-value>)',
        },
        card: {
          DEFAULT: 'rgb(from var(--card) r g b / <alpha-value>)',
          foreground: 'rgb(from var(--card-foreground) r g b / <alpha-value>)',
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
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
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
