/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep navy family — drawn from the Bonvino & Pereira monogram plate
        navy: {
          DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
          card: 'rgb(var(--color-surface) / <alpha-value>)',
          elevated: 'rgb(var(--color-surface) / <alpha-value>)',
          deep: 'rgb(var(--color-surface) / <alpha-value>)',
          border: 'rgb(var(--color-primary) / 0.18)',
        },
        // Polished chrome / platinum — the "BP" metal
        platinum: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-foreground) / <alpha-value>)',
          light: 'rgb(var(--color-foreground) / <alpha-value>)',
          dim: 'rgb(var(--color-muted) / <alpha-value>)',
          glow: 'rgb(var(--color-primary) / 0.15)',
        },
        ivory: {
          DEFAULT: 'rgb(var(--color-foreground) / <alpha-value>)',
          muted: 'rgb(var(--color-muted) / <alpha-value>)',
          dim: 'rgb(var(--color-muted) / <alpha-value>)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2rem': '2rem',
        '2.5rem': '2.5rem',
        '3rem': '3rem',
        '4rem': '4rem',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.2s infinite ease-in-out',
        'float': 'float 4s infinite ease-in-out',
        'sheen': 'sheen 6s infinite linear',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(195, 208, 226, 0.4)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 12px rgba(195, 208, 226, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        // Chrome light sweeping across the monogram
        sheen: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      }
    },
  },
  plugins: [],
}
