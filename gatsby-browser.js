import React from "react"
import { ChakraProvider } from "@chakra-ui/core"
import theme from "./src/theme"

export const wrapRootElement = ({ element }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {element}
    </ChakraProvider>
  )
}
