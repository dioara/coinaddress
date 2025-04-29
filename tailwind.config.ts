import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--text-primary)',
        card: {
          DEFAULT: 'var(--card-bg)',
          foreground: 'var(--text-primary)'
        },
        popover: {
          DEFAULT: 'var(--card-bg)',
          foreground: 'var(--text-primary)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'white'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'white'
        },
        muted: {
          DEFAULT: 'var(--border)',
          foreground: 'var(--text-secondary)'
        },
        accent: {
          DEFAULT: 'var(--primary-light)',
          foreground: 'var(--text-primary)'
        },
        destructive: {
          DEFAULT: 'var(--error)',
          foreground: 'white'
        },
        border: 'var(--border)',
        input: 'var(--border)',
        ring: 'var(--border-focus)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

