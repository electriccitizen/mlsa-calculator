import React from "react"
import PropTypes from "prop-types"
import {
  Stack,
  Icon,
  Link,
  useColorMode,
  Flex,
  Switch,
  Button,
  Heading,
  Box,
} from "@chakra-ui/core"
import { useForm } from "@formiz/core"

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

export const PageHeader = ({ children, onReset, githubPath }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const form = useForm()

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
