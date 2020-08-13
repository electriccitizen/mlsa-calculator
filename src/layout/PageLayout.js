import React, { useRef, useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import { Stack, Box, Flex } from "@chakra-ui/core"
import { Debug } from "../components/Debug"
import { useDarkTheme } from "../hooks/isDarkTheme"
import { PageHeader } from "../layout/PageHeader"
import  SiteHeader  from "../layout/SiteHeader"
import { PageFooter } from "../layout/PageFooter"

const propTypes = {
  children: PropTypes.node,
}
const defaultProps = {
  children: "",
}

const useDebugTime = () => {
  const initRenderTimeRef = useRef(new Date())
  const preRenderTimeRef = useRef(new Date())
  //preRenderTimeRef.current = new Date();

  // useMemo(() => {
  //   // eslint-disable-next-line no-console
  //   console.log('--- Page mounted ---');
  // }, []);
  //
  // useEffect(() => {
  //   const currentTime = new Date();
  //   // eslint-disable-next-line no-console
  //   console.log(
  //     `Rendered in ${(currentTime - preRenderTimeRef.current) / 1000}s`,
  //     '-',
  //     `Mounted ${(currentTime - initRenderTimeRef.current) / 1000}s ago`,
  //   );
  // });
}

export const PageLayout = ({ children, updateMontana }) => {
  const [debugMode, setDebugMode] = useState("off")
  const handleDebug = value => {
    setDebugMode(value)
  }
  useDebugTime()
  const isDarkTheme = useDarkTheme()
  return (
    <>
      <div id="outer-container">
        <SiteHeader />
        {/*<Stack*/}
        {/*  flex="1"*/}
        {/*  flexWrap="nowrap"*/}
        {/*  flexDirection={{ base: "column", lg: "row" }}*/}
        {/*>*/}
        {/*</Stack>*/}
        <main id="page-wrap">
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
                p={{ base: 4, lg: 8 }}
              >
                <Box maxW="50rem" mx="auto">
                  {children}
                  <PageFooter
                    updateMontana={updateMontana}
                    handleDebug={handleDebug}
                    debugMode={debugMode}
                  />
                </Box>
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
        </main>
      </div>
    </>
  )
}

PageLayout.propTypes = propTypes
PageLayout.defaultProps = defaultProps
