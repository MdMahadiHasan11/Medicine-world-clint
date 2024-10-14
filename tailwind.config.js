/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        accent: 'var(--accent-color)',
        background: 'var(--bg-color)',
        cardStyle: 'var(--cardStyle-bg-color)', // Corrected to match your CSS variable name
        navbarStyle: 'var(--navbarStyle-bg-color)', // Corrected to match your CSS variable name
        text: 'var(--text-color)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
