import theme from "@chakra-ui/theme"
import { mode } from "@chakra-ui/theme-tools"
const styles = {
  ...theme.styles,
  global: props => ({
    "*, *::before, &::after": {
      borderColor: mode("gray.400", "gray.400")(props),
      wordWrap: "break-word",
    },
    ...theme.styles.global,
    "html,body": {
      bg: mode("gray.50", "gray.900")(props),
      color: mode("gray.900", "whiteAlpha.800")(props),
      lineHeight: "tall",
      fontWeight: "normal",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI",\n' +
        "               Roboto, Oxygen-Sans, Ubuntu, Cantarell,\n" +
        '               "Helvetica Neue", sans-serif;',
      fontSize: "lg",
      overflow: "auto",

      a: {
        color: "brand.400",
      },
      "a.logo": {
        color: "gray.100",
      },
      "a.menulink": {
        color: "gray.400",
      },
      "a.homelight": {
        color: "gray.100",
      },
      "a.homedark": {
        color: "gray.800",
      },
      h3: {
        fontFamily: "serif",
      },
    },

    p: {
      pb: 2,
    },
    ".foo a!important": {
      color: "purple",
    },
  }),
}

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    heading: "serif",
    // body:
    //   'system-ui',
    // html:
    //   'system-ui',
    // mono: "'system-ui",
  },
  colors: {
    ...theme.colors,
    brand: {
      50: "pink",
      100: "pink",
      200: "#999",
      300: "#ccc",
      400: "#14662e", // base green
      500: "#15c", // base blue
      600: "#2a68d1", // blue hover
      700: "#14662e",
      800: "pink",
      900: "pink",
      1000: "pink",
    },
  },
  styles,
}
export default customTheme
