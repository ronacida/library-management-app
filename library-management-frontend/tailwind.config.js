/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#646cff',
        secondary: '#535bf2',
        accent: '#61dafb',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
      },
      borderRadius: {
        'xl': '1.25rem',
      },
      screens: {
        // Default Tailwind screens:
        'sm': '640px',  // Small screens
        'md': '768px',  // Medium screens
        'lg': '1024px', // Large screens
        'xl': '1280px', // Extra large screens
        '2xl': '1536px', // 2x Extra large screens
        
        // Custom screens:
        'xs': '480px',   // Extra small screens
        '3xl': '1920px', // 3x Extra large screens
        '4xl': '2560px', // 4x Extra large screens
      },
    },
  },
  plugins: [],
}
