import React from "react"
import PropTypes from "prop-types"
import { Heading, Box } from "@chakra-ui/core"

const propTypes = {
  children: PropTypes.node,
  onReset: PropTypes.func,
  githubPath: PropTypes.string,
}
const defaultProps = {
  children: "",
  onReset: () => {},
  githubPath: null,
}

export const PageHeader = ({ children }) => {
  return (
    <Box mb="6" data-test="header">
      <Heading d="flex" alignItems="center">
        {children}
      </Heading>
    </Box>
  )
}

PageHeader.propTypes = propTypes
PageHeader.defaultProps = defaultProps
