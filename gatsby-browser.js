import React from "react"
import { ChakraProvider } from "@chakra-ui/core"
import theme from "./src/theme"
//import theme from '@chakra-ui/theme';

export const wrapRootElement = ({ element }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {element}
    </ChakraProvider>
  )
}
