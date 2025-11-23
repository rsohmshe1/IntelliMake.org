/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './header.html', './footer.html', './main.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3b82f6',
          teal: '#2dd4bf'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      },
      boxShadow: {
        brand: '0 24px 48px rgba(59, 130, 246, 0.15)'
      },
      borderRadius: {
        xl2: '18px'
      }
    }
  },
  plugins: []
};
