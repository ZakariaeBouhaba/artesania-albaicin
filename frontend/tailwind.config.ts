import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:  { DEFAULT: '#f6efe2', '2': '#efe6d3' },
        sand:   '#e8dcc1',
        bone:   '#faf5ea',
        ink:    { DEFAULT: '#1d1a14', '2': '#3a3326' },
        muted:  '#6b6149',
        line:   { DEFAULT: '#d9ccae', '2': '#c4b48f' },
        gold:   { DEFAULT: '#b18a3a', '2': '#d4ac5a', deep: '#8a6a23' },
        sherif: { DEFAULT: '#5a3a1c', '2': '#3e2710' },
        terra:  '#a85a32',
        navy:   { DEFAULT: '#1a2742', '2': '#0e1729' },
      },
      fontFamily: {
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['"Inter Tight"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
