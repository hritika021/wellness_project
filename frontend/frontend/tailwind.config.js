/** @type {import('tailwindcss').Config} */
import textShadow from 'tailwindcss-textshadow'
export default {

  corePlugins:{
scrollBehavior:true
  },



  content: [
        "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    
        fontFamily: {
      sans: ['Open Sans', 'sans-serif'], // Body text
      serif: ['Playfair Display', 'serif'], // Accent text
      poppins: ['Poppins', 'sans-serif'], // Headings
    },
    extend: {
        textShadow: {
    '3d': [
      '1px 1px 0px #0284c7',
      '2px 2px 0px #0369a1',
      '3px 3px 0px #075985',
      '4px 4px 0px #0c4a6e'
    ].join(', ')
  },

      keyframes:{
slidein:{
  from:{
    opacity:"0",
    transform:"translateY(-10px)",
  },
  to:{
    opacity:"1",
    transform:"translateY(0)"
  }
}
      },
      animation:{
        slidein:"slidein 1s ease 300ms"
      },
        colors: {
        wellness: {
          500: '#4CAF50',
          600: '#45A049',
        },
        coral:{
          500: '#FF6B6B',  // Coral hex code
          600: '#E05555',  // Darker on hover
        },
        teal:{
          500: '#38B2AC',
          600:'#319795 ',
          700:'#2A8C87 ',
          800:'#26716eff'
          
        },
        blue:{
          700:"#373B44",
          400:'#4286f4'
        },
        
      green:{
        200:'#43cea2',
        500:'#185a9d'
      }
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        DEFAULT: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '4px 4px 8px rgba(0, 0, 0, 0.5)',
        xl: '4px 4px 16px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    textShadow,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    },
  ],
  
  
 
}

