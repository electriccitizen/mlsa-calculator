import { theme } from '@chakra-ui/core';

export default {
  ...theme,
  fonts: {
    heading: '"Avenir Next", sans-serif',
    body: "system-ui, sans-serif",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
  colors: {
    ...theme.colors,
    brand: {
      50: '#edfdf4',
      100: '#e2fbed',
      200: '#c2ebd4',
      300: '#9fddb9',
      400: '#7ccf9e',
      500: '#58c184',
      600: '#3ea76a',
      700: '#2e8251',
      800: '#1f5d3a',
      900: '#0f3921',
      1000: '#001506',
    },
  },
  globals: {
    'field_mb': 4,
  }
};
