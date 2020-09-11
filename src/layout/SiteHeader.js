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
            padding={5}
            isInline
            align="center"
            ml="auto"
          >
            <Box width="90%">
              <Heading
                ml={16}
                d="flex"
                alignItems="center"
                fontSize={{ xs: "2xl", md: "3xl" }}
              >
                <GatsbyLink className="logo" to={"/"}>
                  {data.site.siteMetadata.title}
                </GatsbyLink>
              </Heading>
              <Box ml={16} color="gray.200" fontSize={{ xs: "xs", md: "lg" }}>
                Provided by Montana Legal Services Association
              </Box>
            </Box>
            <Box width="10%">
              <Stack isInline align="center" mb="1" ml="auto">
                <FaMoon />
                <Switch
                  size="md"
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
