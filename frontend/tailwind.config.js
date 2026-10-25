/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#E8F8F3',
          100: '#C6EEE0',
          200: '#91DDBF',
          300: '#5CCC9E',
          400: '#2DC08D',
          500: '#25A77B',
          600: '#1E8E68',
          700: '#176E51',
          800: '#114E3A',
          900: '#0D3829',
        },
        surface: {
          0:   '#FFFFFF',
          50:  '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Rubik', 'Outfit', 'Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scoreReveal: {
          '0%': { strokeDashoffset: '251.2' },
          '100%': { strokeDashoffset: 'var(--target-offset)' },
        },
      },
      animation: {
        'fadeIn': 'fadeIn 0.4s ease-out both',
        'fadeInUp': 'fadeInUp 0.5s ease-out both',
        'slideInRight': 'slideInRight 0.4s ease-out both',
        'slideDown': 'slideDown 0.25s ease-out both',
        'scaleIn': 'scaleIn 0.3s ease-out both',
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'brand-sm': '0 2px 8px -2px rgba(45, 192, 141, 0.20)',
        'brand-md': '0 4px 16px -4px rgba(45, 192, 141, 0.25)',
        'brand-lg': '0 8px 32px -6px rgba(45, 192, 141, 0.30)',
        'card-hover': '0 12px 28px -6px rgba(15, 23, 42, 0.12)',
        'glass': '0 8px 32px -8px rgba(15, 23, 42, 0.08)',
        'elevated': '0 20px 60px -15px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2DC08D 0%, #25A77B 100%)',
        'purple-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
        'hero-mesh': `
          radial-gradient(at 15% 10%, rgba(45, 192, 141, 0.08) 0px, transparent 45%),
          radial-gradient(at 85% 15%, rgba(139, 92, 246, 0.06) 0px, transparent 50%),
          radial-gradient(at 50% 75%, rgba(56, 189, 248, 0.05) 0px, transparent 45%),
          radial-gradient(at 80% 85%, rgba(254, 215, 170, 0.06) 0px, transparent 45%)
        `,
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
