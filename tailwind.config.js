/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          bg: 'var(--bg)',
          surface: 'var(--surface)',
          surface2: 'var(--surface2)',
          text: 'var(--text)',
          muted: 'var(--muted)',
          accent: 'var(--accent)',
          accent2: 'var(--accent2)',
          success: 'var(--success)',
          danger: 'var(--danger)',
          border: 'var(--border)',
        }
      },
      borderRadius: {
        theme: 'var(--radius)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      }
    },
  },
  plugins: [],
}

