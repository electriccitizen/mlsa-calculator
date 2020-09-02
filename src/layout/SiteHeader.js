import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import {
  Stack,
  useColorMode,
  Flex,
  Switch,
  Button,
  Heading,
  Box,
} from "@chakra-ui/core"
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
            }
          }
        }
      `}
      render={data => (
        <>
          <Menu menuLinks={data.site.siteMetadata.menuLinks} />

          <Stack bg={colorMode === 'dark' ? 'black' : 'brand.400'} padding={5} isInline align="center" ml="auto">
            <Box width="90%">
              <Heading color={colorMode === 'dark' ? "gray" : "gray.100"} ml={16} d="flex" alignItems="center">
                <Link to="/">Montana Child Support Calculator</Link>
              </Heading>
            </Box>
            <Box width="10%">
              <Stack isInline align="center" mb="1" ml="auto">
                {/*<Icon*/}
                {/*  name="moon"*/}
                {/*  size="14px"*/}
                {/*  opacity={colorMode !== "dark" ? "0.3" : null}*/}
                {/*/>*/}
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
