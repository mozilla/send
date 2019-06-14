const colors = {
  transparent: 'transparent',

  black: '#22292f',
  'grey-darkest': '#4a4a4f',
  'grey-darker': '#606f7b',
  'grey-dark': '#8795a1',
  grey: '#B1B1B3',
  'grey-light': '#dae1e7',
  'grey-banner': '#f0f0f4',
  'grey-transparent': 'hsla(250, 13%, 9%, .2)',
  'grey-lighter': '#f1f5f8',
  'grey-lightest': '#F9F9FA',
  white: '#ffffff',

  'red-darkest': '#3b0d0c',
  'red-darker': '#621b18',
  'red-dark': '#cc1f1a',
  red: '#e3342f',
  'red-light': '#ef5753',
  'red-lighter': '#f9acaa',
  'red-lightest': '#fcebea',

  'orange-darkest': '#462a16',
  'orange-darker': '#613b1f',
  'orange-dark': '#de751f',
  orange: '#f6993f',
  'orange-light': '#faad63',
  'orange-lighter': '#fcd9b6',
  'orange-lightest': '#fff5eb',

  'yellow-darkest': '#453411',
  'yellow-darker': '#684f1d',
  'yellow-dark': '#f2d024',
  yellow: '#ffed4a',
  'yellow-light': '#fff382',
  'yellow-lighter': '#fff9c2',
  'yellow-lightest': '#fcfbeb',

  'green-darkest': '#003706',
  'green-darker': '#006504',
  'green-dark': '#058b00',
  green: '#12bc00',
  'green-light': '#51d88a',
  'green-lighter': '#a2f5bf',
  'green-lightest': '#e3fcec',

  'teal-darkest': '#0d3331',
  'teal-darker': '#20504f',
  'teal-dark': '#38a89d',
  teal: '#4dc0b5',
  'teal-light': '#64d5ca',
  'teal-lighter': '#a0f0ed',
  'teal-lightest': '#e8fffe',

  'blue-darkest': '#002275',
  'blue-darker': '#003eaa',
  'blue-dark': '#0060df',
  blue: '#0a84ff',
  'blue-light': '#6cb2eb',
  'blue-lighter': '#bcdefa',
  'blue-lightest': '#eff8ff',

  'indigo-darkest': '#191e38',
  'indigo-darker': '#2f365f',
  'indigo-dark': '#5661b3',
  indigo: '#6574cd',
  'indigo-light': '#7886d7',
  'indigo-lighter': '#b2b7ff',
  'indigo-lightest': '#e6e8ff',

  'purple-darkest': '#21183c',
  'purple-darker': '#382b5f',
  'purple-dark': '#794acf',
  purple: '#9561e2',
  'purple-light': '#a779e9',
  'purple-lighter': '#d6bbfc',
  'purple-lightest': '#f3ebff',

  'pink-darkest': '#451225',
  'pink-darker': '#6f213f',
  'pink-dark': '#eb5286',
  pink: '#f66d9b',
  'pink-light': '#fa7ea8',
  'pink-lighter': '#ffbbca',
  'pink-lightest': '#ffebef',
  cloud: 'rgba(255, 255, 255, 0.8)',
  violet: 'hsl(258, 57%, 35%)'
};

module.exports = {
  theme: {
    colors: colors,
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px'
    },
    fontFamily: {
      sans: [
        'Inter',
        'system-ui',
        'BlinkMacSystemFont',
        '-apple-system',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif'
      ],
      serif: [
        'Constantia',
        'Lucida Bright',
        'Lucidabright',
        'Lucida Serif',
        'Lucida',
        'DejaVu Serif',
        'Bitstream Vera Serif',
        'Liberation Serif',
        'Georgia',
        'serif'
      ],
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace'
      ]
    },
    fontSize: {
      xs: '.75rem', // 12px
      sm: '.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '2rem', // 32px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem' // 48px
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      loose: 1.75
    },
    letterSpacing: {
      tight: '-0.05em',
      normal: '0',
      wide: '0.05em'
    },
    textColor: colors,
    backgroundColor: colors,
    backgroundSize: {
      auto: 'auto',
      cover: 'cover',
      contain: 'contain'
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
      '8': '8px'
    },
    borderColor: global.Object.assign(
      { default: colors['grey-light'] },
      colors
    ),
    borderRadius: {
      none: '0',
      sm: '.125rem',
      default: '.25rem',
      lg: '.5rem',
      xl: '1rem',
      full: '9999px'
    },
    width: {
      auto: 'auto',
      px: '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '24': '6rem',
      '32': '8rem',
      '48': '12rem',
      '64': '16rem',
      '128': '32rem',
      '1/2': '50%',
      '1/3': '33.33333%',
      '2/3': '66.66667%',
      '1/4': '25%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.66667%',
      '5/6': '83.33333%',
      full: '100%',
      screen: '100vw'
    },
    height: {
      auto: 'auto',
      px: '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '24': '6rem',
      '32': '8rem',
      '48': '12rem',
      '64': '16rem',
      full: '100%',
      screen: '100vh'
    },
    minWidth: {
      '0': '0',
      full: '100%'
    },
    minHeight: {
      '0': '0',
      full: '100%',
      screen: '100vh'
    },
    maxWidth: {
      xs: '20rem',
      sm: '30rem',
      md: '40rem',
      lg: '50rem',
      xl: '60rem',
      '2xl': '70rem',
      '3xl': '80rem',
      '4xl': '90rem',
      '5xl': '100rem',
      full: '100%'
    },
    maxHeight: {
      full: '100%',
      'half-screen': '50vh',
      screen: '100vh'
    },
    padding: {
      px: '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem'
    },
    margin: {
      auto: 'auto',
      px: '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
      '-px': '-1px',
      '-1': '-0.25rem',
      '-2': '-0.5rem',
      '-3': '-0.75rem',
      '-4': '-1rem',
      '-5': '-1.25rem',
      '-6': '-1.5rem',
      '-8': '-2rem',
      '-10': '-2.5rem',
      '-12': '-3rem',
      '-16': '-4rem',
      '-20': '-5rem',
      '-24': '-6rem',
      '-32': '-8rem'
    },
    boxShadow: {
      default: '0 2px 4px 0 rgba(0,0,0,0.10)',
      md: '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
      lg: '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
      inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      outline: '0 0 0 3px rgba(52,144,220,0.5)',
      none: 'none',
      cloud: '0 0 5rem 5rem white',
      btn:
        'inset 0 -6px 12px 0 rgba(0,70,144,0.25), 0 4px 6px 0 rgba(34,0,51,0.04), 0 1px 10px 0 rgba(7,48,114,0.12), 0 2px 8px -1px rgba(14,13,26,0.08)'
    },
    opacity: {
      '0': '0',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '100': '1'
    },
    fill: {
      current: 'currentColor'
    },
    stroke: {
      current: 'currentColor'
    },

    zIndex: {
      auto: 'auto',
      '0': 0,
      '10': 10,
      '20': 20,
      '30': 30,
      '40': 40,
      '50': 50
    }
  },

  variants: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColor: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    flexDirection: ['responsive'],
    flexWrap: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    alignContent: ['responsive'],
    justifyContent: ['responsive'],
    flex: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    opacity: ['responsive', 'hover'],
    outline: ['focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    inset: ['responsive'],
    resize: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus'],
    fill: [],
    stroke: [],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus'],
    fontSize: ['responsive'],
    fontStyle: ['responsive', 'hover', 'focus'],
    fontSmoothing: ['responsive', 'hover', 'focus'],
    textDecoration: ['responsive', 'hover', 'focus'],
    textTransform: ['responsive', 'hover', 'focus'],
    letterSpacing: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    wordBreak: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive']
  },
  corePlugins: {
    container: false
  },
  plugins: []
};
