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
        cardStyle: 'var(--card-bg-color)', // Card background color
        navbarStyle: 'var(--navbar-bg-color)', // Navbar background color
        text: 'var(--text-color)',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
