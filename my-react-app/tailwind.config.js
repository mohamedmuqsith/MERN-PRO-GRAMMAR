/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        // --- NEW HIGH-CONTRAST DARK THEME ---
        dark: {
          bg: '#0D1117',            // Very dark background (like GitHub)
          'bg-secondary': '#161B22', // Lighter background for cards/sidebar
          text: '#E6EDF3',           // Soft white for text
          'text-secondary': '#8B949E', // Gray for less important text
          primary: '#388BFD',         // A vibrant, accessible blue
          'primary-hover': '#58A6FF', // Lighter blue for hover
          border: '#30363D',         // Subtle border color
        },
        // --- REFINED LIGHT THEME ---
        light: {
          bg: '#F3F4F6',
          'bg-secondary': '#FFFFFF',
          text: '#111827',
          'text-secondary': '#6B7280',
          primary: '#4F46E5',
          'primary-hover': '#4338CA',
          border: '#E5E7EB',
        },
      }
    },
  },
  plugins: [],
}