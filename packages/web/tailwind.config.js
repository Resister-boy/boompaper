/* eslint-disable  @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        sky: colors.sky,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
      },
      backgroundImage: {
        'home-background': "url('/designAssets/home-background.svg')"
      },
      // keyframes: {
      //   windy: {
      //     '0%, 100%': {
      //       transform: 'translateX(-120%) translateY(20%) rotate(-40deg)',
      //       'animation-timing-function': 'ease',
      //     },
      //     '50%': {
      //       transform: 'none',
      //       'animation-timing-function': 'ease',
      //     },
      //   }
      // },
      // animation: {
      //   windy: 'windy 5s ease-in-out infinite'
      // }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
}
