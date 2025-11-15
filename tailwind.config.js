/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This is CRITICAL - enables dark mode with .dark class
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'light-primary': '#F5F3EF',
        'light-card': '#FFFFFF',
        'light-section': '#EFEAE5',
        'light-border': '#E5E0DA',
        'light-text-primary': '#2C2C2C',
        'light-text-secondary': '#6B6B6B',
        'light-accent-primary': '#6B5B95',
        'light-accent-secondary': '#9A8C98',
        'light-accent-hover': '#7E6CC6',
        
        // Dark mode colors
        'dark-primary': '#1C1B22',
        'dark-card': '#23222A',
        'dark-section': '#1A1A21',
        'dark-border': '#2E2D36',
        'dark-text-primary': '#E8E6EB',
        'dark-text-secondary': '#A1A0A8',
        'dark-accent-primary': '#8B7FD0',
        'dark-accent-secondary': '#A499D9',
        'dark-accent-hover': '#B3A8F2',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}