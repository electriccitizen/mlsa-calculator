import React from "react"
import PropTypes from "prop-types"
import { Box, useColorMode } from "@chakra-ui/core"
const propTypes = {
  children: PropTypes.node,
}
const defaultProps = {
  children: "",
}

export const AddAnotherHeader = ({
  header,

}) => {
  const { colorMode } = useColorMode()
  return (
    <Box borderRadius="lg" width="95%" bg="gray.200" fontSize={"md"} p={4} mb={2}>
      {header}
    </Box>
  )
}

AddAnotherHeader.propTypes = propTypes
AddAnotherHeader.defaultProps = defaultProps
