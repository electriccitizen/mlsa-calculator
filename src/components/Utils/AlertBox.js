import React from "react"
import PropTypes from "prop-types"
import { Box } from "@chakra-ui/core"
import { useDarkTheme } from "../../hooks/isDarkTheme"

const propTypes = {
  children: PropTypes.node,
}
const defaultProps = {
  children: "",
}

export const AlertBox = ({children}) => {
  const isDarkTheme = useDarkTheme()
  return (
    <Box
      borderRadius="lg"
      p={8}
      mb={8}
      bg={isDarkTheme ? "gray.600" : "yellow.50"}
      fontSize={"md"}
      mt={4}
    >
      {children}
    </Box>
  )
}

AlertBox.propTypes = propTypes
AlertBox.defaultProps = defaultProps
