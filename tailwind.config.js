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
          DEFAULT: '#060A16',
          card: '#0B1225',
          elevated: '#121B33',
          deep: '#1E3A6E',
          border: 'rgba(195, 208, 226, 0.18)',
        },
        // Polished chrome / platinum — the "BP" metal
        platinum: {
          DEFAULT: '#C3D0E2',
          hover: '#DCE6F2',
          light: '#EAF1F8',
          dim: '#8B9BB4',
          glow: 'rgba(195, 208, 226, 0.15)',
        },
        ivory: {
          DEFAULT: '#F5F8FC',
          muted: '#94A3B8',
          dim: '#64748B',
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
