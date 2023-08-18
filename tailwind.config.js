/** @type {import('tailwindcss').Config} */
module.exports = {
  mode:'jit',
  content: ["./src/**/*.{html,js,ts,jsx}"],
  darkMode: 'class', // class, 'media' or boolean
  theme: {
    extend: {
      fontFamily: {
        'new-hero': ['new-hero', 'sans-serif']
      },
      colors: {Upside: {
          900: '#2B6551',
          800: '#347862',
          700: '#3F8D72',
          600: '#48A182',
          500: '#53B592',
          400: '#58C19D',
          300: '#66DDB3',
          200: '#70F2C3',
          100: '#76FBCD',
          50: '#79FCD1',
        }
        ,
        Deepwater: {
          900: '#050B10',
          800: '#0A1520',
          700: '#102031',
          600: '#162A41',
          500: '#1C3451',
          400: '#223F61',
          300: '#284972',
          200: '#2D5482',
          100: '#335F93',
          50: '#3969A2',
        }
        ,
        Primary: {
          900: '#193B49',
          800: '#204A5B',
          700: '#28596D',
          600: '#2F6880',
          500: '#367692',
          400: '#3D84A4',
          300: '#4593B6',
          200: '#4CA2C8',
          100: '#53B1DB',
          50: '#5ABAE5',
        }
        ,
        Downside: {
          900: '#A0391D',
          800: '#B13F20',
          700: '#C34524',
          600: '#D44C28',
          500: '#DE562F',
          400: '#DF5C37',
          300: '#E26F4B',
          200: '#E47C5B',
          100: '#E68B6D',
          50: '#E9997F',
        }
        ,
        Brightside: {
          900: '#F5BE52',
          800: '#F6C55F',
          700: '#F7CB6F',
          600: '#F8D17F',
          500: '#F9D890',
          400: '#FADEA2',
          300: '#FBE5B4',
          200: '#FCECC7',
          100: '#FDF2D9',
          50: '#FEF8EC',
        }
        ,
      },
      spacing: {
        88: '22rem',
      },
    },
  },
  plugins: [],
}

