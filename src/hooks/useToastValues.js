import React from "react"
import { Box, useToast } from "@chakra-ui/react"

export const useToastValues = () => {
  const toast = useToast()

  return values => {
    console.log(values)
    toast({
      title: "Additional Help",
      description: (
        <Box as="pre" maxHeight="80vh" maxWidth="80vw" overflow="auto">
          {values[0].text}
        </Box>
      ),
      status: "success",
      duration: null,
      isClosable: true,
      position: "top",
    })
  }
}
