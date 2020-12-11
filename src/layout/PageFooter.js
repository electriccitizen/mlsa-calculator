import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { Stack, Icon, Switch, Button, Box, Spacer } from "@chakra-ui/react"
import { FaBug } from "react-icons/fa/index"
import { Logos } from '../components/Logos/logos'

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
const windowGlobal = typeof window !== "undefined" && window
export const PageFooter = ({ handleDebug, debugMode }) => {
  return (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
        fontSize={"small"}
        mt={8}
        mb={8}
        pt={4}
        borderTopWidth={1}
        borderColor={"gray.300"}
      >
        <Box>
          &copy; {new Date().getFullYear()}{" "}
          <a href={"https://www.mtlsa.org/"} color={"brand.400"}>
            Montana Legal Services Association
          </a>
        </Box>
        <Spacer />
        <Box align={["left","left","right"]}  >
          See our <Link to={"/disclaimer"}>Disclaimer and Accessibility</Link>{" "}statement and{" "} <Link to={"/privacy-notice"}>Privacy Notice</Link>
        </Box>

      </Stack>
      <Box><Logos /></Box>
      <Box mt="8" fontSize="small">
        This project was funded by the National Crime Victim Law Institute
        (NCVLI) under grant No. 2017-VF-GX-K130, awarded by the Office for
        Victims of Crime, Office of Justice Programs, U.S. Department of
        Justice. The opinions, findings, and conclusions or recommendations
        expressed in this project are those of the contributors and do not
        necessarily represent the official position or policies of the U.S.
        Department of Justice or NCVLI.
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
