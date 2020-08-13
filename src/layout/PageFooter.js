import React from "react"
import PropTypes from "prop-types"
import {
  Stack,
  Icon,
  Switch,
  Button,
  Heading,
  Box,
  RadioGroup,
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

export const PageFooter = ({
  onReset,
  handleDebug,
  debugMode,
  updateMontana,
}) => {
  const form = useForm()
  return (
    <Box
      d="flex"
      alignItems="center"
      mt="64"
      pt="2"
      borderTop="1px"
      borderColor="gray.200"
      data-test="header"
    >
      <Stack mr="4" mt="2" isInline align="center" mb="1">
        <Icon
          name="view-off"
          size="14px"
          opacity={debugMode !== "off" ? "0.3" : null}
        />
        <Switch
          size="md"
          onChange={e => {
            handleDebug(debugMode === "on" ? "off" : "on")
          }}
          color="none"
          t
        />
        <Icon
          name="view"
          size="14px"
          opacity={debugMode !== "on" ? "0.3" : null}
        />
      </Stack>
      {/*<Button*/}
      {/*  onClick={() => {*/}
      {/*    onReset(sessionStorage.clear())*/}
      {/*    form.reset()*/}
      {/*    window.location.reload(sessionStorage.clear())*/}
      {/*  }}*/}
      {/*  size="sm"*/}
      {/*  mr="auto"*/}
      {/*>*/}
      {/*  Reset*/}
      {/*</Button>*/}
      <Button
        onClick={() => {
          sessionStorage.clear()
          window.location.reload(sessionStorage.clear())
        }}
        size="sm"
        mr="auto"
      >
        Clear
      </Button>
    </Box>
  )
}

PageFooter.propTypes = propTypes
PageFooter.defaultProps = defaultProps
