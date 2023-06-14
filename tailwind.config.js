/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          100: '#BEBFA4',
          200: '#8DA68A',
          300: '#4F7358',
          400: '#26402D',
        },
        gray: {
          900: '#0D0D0D',
        },
      },
      screens: {
        tablet: { max: '1350px' },
        tabletMini: { max: '940px' },
        phone: { max: '840px' },
      },
    },
  },
  plugins: [],
}
