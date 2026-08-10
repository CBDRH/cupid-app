/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', 
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        surface: 'var(--color-surface)',
        muted: 'var(--color-muted)'
      }
    }},
  plugins: [],
};