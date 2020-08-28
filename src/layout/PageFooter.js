import React from "react"
import { Link as GatsbyLink } from "gatsby"
import PropTypes from "prop-types"
import { Stack, Icon, Switch, Button, Link, Box } from "@chakra-ui/core"
import { useForm } from "@formiz/core"
import { FaBug } from "react-icons/fa/index"
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
const windowGlobal = typeof window !== 'undefined' && window
export const PageFooter = ({
  onReset,
  handleDebug,
  debugMode,
  updateMontana,
}) => {
  const form = useForm()
  return (
    <>
      <Box
        mt={"8"}
        fontSize="sm"
        borderColor="gray.300"
        borderTopWidth="1px"
        display={{ md: "flex" }}
      >
        <Box mt={{ base: 6, md: 6 }} flex={1}>
          &copy; {new Date().getFullYear()} <Link href={"https://www.mtlsa.org/"} color={"brand.400"}>Montana Legal Services Association</Link>
        </Box>
        <Box align="right" mt={{ base: 6, md: 6 }} flex={1}>
          See our{" "}
          <GatsbyLink to={"/terms-of-use"}>
            <Link color={"brand.400"}>Terms of Use</Link>
          </GatsbyLink>{" "}
          and{" "}
          <GatsbyLink to={"/privacy-notice"}>
            <Link color={"brand.400"}>Privacy Notice</Link>
          </GatsbyLink>
          .
        </Box>
      </Box>

      {/*{Debugging}*/}
      <Box d="flex" alignItems="center" mt="8" pt="2">
        <Stack mr="4" mt="2" isInline align="center" mb="2">
          <Icon
            as={FaBug}
            name="view-off"
            boxSize={4}
            opacity={debugMode !== "off" ? "0.3" : null}
          />
          <Switch
            size="sm"
            onChange={e => {
              handleDebug(debugMode === "on" ? "off" : "on")
            }}
            color="none"
          />
          <Icon
            as={FaBug}
            name="view"
            boxSize={4}
            opacity={debugMode !== "on" ? "0.3" : null}
          />
        </Stack>
        <Button
          onClick={() => {
            sessionStorage.clear()
            windowGlobal.location.reload(sessionStorage.clear())
          }}
          size="sm"
          mr="auto"
        >
          Reset
        </Button>
      </Box>
    </>
  )
}

PageFooter.propTypes = propTypes
PageFooter.defaultProps = defaultProps
