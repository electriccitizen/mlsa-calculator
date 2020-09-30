import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Link as GatsbyLink } from "gatsby"
import PropTypes from "prop-types"
import { Stack, useColorMode, Switch, Heading, Box } from "@chakra-ui/core"
import { Menu } from "./Menu"
import { FaSun, FaMoon } from "react-icons/fa"

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

export default function SiteHeader() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site {
            siteMetadata {
              title
              menuLinks {
                link
                name
                text
                icon
              }
              menuLinks2 {
                link
                name
                text
                icon
              }
              menuLinks3 {
                link
                name
                text
                icon
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <Menu
            menuLinks={data.site.siteMetadata.menuLinks}
            menuLinks2={data.site.siteMetadata.menuLinks2}
            menuLinks3={data.site.siteMetadata.menuLinks3}
          />
          <Stack
            bg={colorMode === "dark" ? "black" : "brand.400"}
            isInline
            align="center"
            ml="auto"
            width={"100%"}
            position={"fixed"}
            top={0}
            left={0}
            zIndex={10}
            p={4}

          >

            <Box width="90%">
              <Heading
                fontFamily={
                  '-apple-system, BlinkMacSystemFont, "Segoe UI",\n' +
                  "               Roboto, Oxygen-Sans, Ubuntu, Cantarell,\n" +
                  '               "Helvetica Neue", sans-serif;'
                }
                as={"h1"}
                fontSize={["100%", "130%", "180%"]}
                ml={16}
                mt={["4px", "0px", "-8px"]}
              >
                <GatsbyLink className={"logo"} to={"/"}>
                  {data.site.siteMetadata.title}
                </GatsbyLink>
              </Heading>
              <Box
                fontFamily={
                  '-apple-system, BlinkMacSystemFont, "Segoe UI",\n' +
                  "               Roboto, Oxygen-Sans, Ubuntu, Cantarell,\n" +
                  '               "Helvetica Neue", sans-serif;'
                }
                ml={16}
                color="gray.200"
                fontSize={["60%", "60%", "90%"]}
              >
                Provided by the Montana Legal Services Association
              </Box>
            </Box>
            <Box width="10%">
              <Stack isInline align="center" mb="1" ml="auto">
                <FaMoon />
                <Switch
                  size={"md"}
                  isChecked={colorMode === "light"}
                  onChange={toggleColorMode}
                  colorScheme="brand"
                />
                <FaSun />
              </Stack>
            </Box>
          </Stack>
        </>
      )}
    />
  )
}

SiteHeader.propTypes = propTypes
SiteHeader.defaultProps = defaultProps
