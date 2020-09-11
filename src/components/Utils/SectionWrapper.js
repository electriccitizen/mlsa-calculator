import React from "react"
import PropTypes from "prop-types"
import { Box } from "@chakra-ui/core"

const propTypes = {
  children: PropTypes.node,
}
const defaultProps = {
  children: "",
}

export const SectionWrapper = ({ children }) => {
  return <Box mb={8}>{children}</Box>
}

SectionWrapper.propTypes = propTypes
SectionWrapper.defaultProps = defaultProps
