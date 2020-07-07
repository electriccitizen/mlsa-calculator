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

        <Stack isInline align="center" mb="1" ml="auto">
          <Icon
            name="moon"
            size="14px"
            opacity={colorMode !== "dark" ? "0.3" : null}
          />
          <Switch
            size="md"
            isChecked={colorMode === "light"}
            onChange={toggleColorMode}
            color="none"
          />
          <Icon
            name="sun"
            size="14px"
            opacity={colorMode !== "light" ? "0.3" : null}
          />
        </Stack>
        {/*<Button*/}
        {/*  onClick={() => {*/}
        {/*    form.reset();*/}
        {/*    onReset();*/}
        {/*    localStorage.clear();*/}
        {/*  }}*/}
        {/*  ml="auto"*/}
        {/*  size="sm"*/}
        {/*>*/}
        {/*  Reset*/}
        {/*</Button>*/}
      </Heading>
      {/*{!!githubPath && (*/}
      {/*  <Link*/}
      {/*    isExternal*/}
      {/*    fontSize="sm"*/}
      {/*    href={`/notes`}*/}
      {/*  >*/}
      {/*    Development notes*/}
      {/*    <Icon name="external-link" ml="1" mb="1" />*/}
      {/*  </Link>*/}

      {/*)}*/}
    </Box>
  )
}

PageHeader.propTypes = propTypes
PageHeader.defaultProps = defaultProps
