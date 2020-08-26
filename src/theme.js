import theme from "@chakra-ui/theme"
import { mode } from "@chakra-ui/theme-tools"

const styles = {
  ...theme.styles,
  global: props => ({
    "*, *::before, &::after": {
      borderColor: mode("gray.400", "gray.400")(props),
      wordWrap: "break-word",
    },
    // "label, label::before, &::after": {
    //   color: "teal.500",
    // },
    fontFamily: "sans-serif",
    ...theme.styles.global,
    "html,body": {
      bg: mode("gray.50", "gray.900")(props),
      color: mode("gray.900", "whiteAlpha.800")(props),
      lineHeight: "tall",
      fontWeight: "normal",
      fontFamily: "system-ui",
      fontSize: "lg",
      a: {
        color: "red",
      },
    },
    p: {
      pb: 2,
    },


  }),
}

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading: "system-ui",
    body: "serif",
    html: "serif",
    mono: "serif, monospace",
  },
  colors: {
    ...theme.colors,
    fook: "red.900",
    brand: {
      50: "pink",
      100: "pink",
      200: "#999",
      300: "#666",
      400: "#14662e", // base green
      500: "#15c",    // base blue
      600: "#2a68d1", // blue hover
      700: "#2a68d1",
      800: "#1f5d3a",
      900: "#0f3921",
      1000: "#0e4921",
    },
  },
  styles,
}
export default customTheme
