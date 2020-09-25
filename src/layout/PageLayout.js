import React, { useState, useMemo, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { Debug } from "../components/Utils/Debug"
import { useDarkTheme } from "../hooks/isDarkTheme"
import SiteHeader from "../layout/SiteHeader"
import { PageFooter } from "../layout/PageFooter"
import { Box, Flex, Stack } from "@chakra-ui/core"

const propTypes = {
  children: PropTypes.node,
}
const defaultProps = {
  children: "",
}

const useDebugTime = () => {
  const initRenderTimeRef = useRef(new Date())
  const preRenderTimeRef = useRef(new Date())
  preRenderTimeRef.current = new Date()

  useMemo(() => {
    // eslint-disable-next-line no-console
    console.log("--- Page mounted ---")
  }, [])

  useEffect(() => {
    const currentTime = new Date()
    // eslint-disable-next-line no-console
    console.log(
      `Rendered in ${(currentTime - preRenderTimeRef.current) / 1000}s`,
      "-",
      `Mounted ${(currentTime - initRenderTimeRef.current) / 1000}s ago`
    )
  })
}
export const PageLayout = ({ children }) => {
  const [debugMode, setDebugMode] = useState("off")
  const handleDebug = value => {
    setDebugMode(value)
  }
  useDebugTime()

  const isDarkTheme = useDarkTheme()

  return (
    <>
      <SiteHeader />
      <Stack
        flex="1"
        minH="100vh"
        flexWrap="nowrap"
        flexDirection={{ base: "column", lg: "row" }}
      >

        <Box flex="1" position="relative">

          <Box
            position={{ lg: "absolute" }}
            top={{ lg: 0 }}
            left={{ lg: 0 }}
            right={{ lg: 0 }}
            bottom={{ lg: 0 }}
            overflow="auto"
          >

            <div id="outer-container">
              <main id="page-wrap">
                <Box
                  pr={[4,8]}
                  pl={[4,8]}
                  fontSize="2xl"
                  maxW="50rem"
                  mx="auto"
                  mt={"6em"}
                >
                  {children}
                  <PageFooter handleDebug={handleDebug} debugMode={debugMode} />
                </Box>
              </main>
            </div>
          </Box>
        </Box>
        {debugMode === "on" && (
          <Flex
            borderColor="gray.200"
            flexDir="column"
            minW="15rem"
            w={{ lg: "30vw" }}
            maxH={{ lg: "100vh" }}
            overflow="auto"
            backgroundColor={isDarkTheme ? "gray.900" : "gray.800"}
            color="gray.100"
            p={{ base: 4, lg: 8 }}
          >
            <Debug />
          </Flex>
        )}
      </Stack>
    </>
  )
}

PageLayout.propTypes = propTypes
PageLayout.defaultProps = defaultProps
