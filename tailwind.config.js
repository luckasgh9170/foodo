/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--color-primary)",
          dark: "var(--color-primary-dark)",
          light: "var(--color-primary-light)",
        },
        accent: "var(--color-accent)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        surface: "var(--color-surface)",
        card: "var(--color-card)",
      },
    },
  },
  plugins: [],
}
