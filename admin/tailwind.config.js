module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          25: '#fdf8f0',
          50: '#fbf1e1',
          100: '#f7e3c3',
          200: '#f0d09a',
          300: '#e9bd71',
          400: '#e2aa48',
          500: '#ca8a2c',
          600: '#b07824',
          700: '#8f611d',
          800: '#6e4a16',
          900: '#4d3310',
          950: '#2c1d09',
        },
        greenish: '#3d5e5e',
        blueish: '#1e3a5f',
      },
    },
  },
  plugins: [],
};
