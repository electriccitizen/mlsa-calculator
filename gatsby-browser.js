import React from "react"
import { ChakraProvider } from "@chakra-ui/core"
import customTheme from "./src/theme"

export const wrapRootElement = ({ element }) => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      {element}
    </ChakraProvider>
  )
}
