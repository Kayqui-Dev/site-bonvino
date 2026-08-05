/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0D0D12',
          card: '#14141D',
          elevated: '#1A1A24',
          border: 'rgba(201, 168, 76, 0.2)',
        },
        champagne: {
          DEFAULT: '#C9A84C',
          hover: '#D9B85C',
          light: '#E6D399',
          glow: 'rgba(201, 168, 76, 0.15)',
        },
        ivory: {
          DEFAULT: '#FAF8F5',
          muted: '#A1A1AA',
          dim: '#71717A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
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
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(201, 168, 76, 0.4)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 12px rgba(201, 168, 76, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
