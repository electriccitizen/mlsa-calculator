import React from "react"
import { StaticQuery, graphql } from "gatsby"
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
import { Menu } from "./Menu"

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
              }
            }
          }
        }
      `}
      render={data => (
        <>
          <Menu menuLinks={data.site.siteMetadata.menuLinks} />
          <Stack bg="gray.500" p="6" isInline align="center" ml="auto">
            <Box width="90%">
              <Heading ml="16" d="flex" alignItems="center">
                Montana Child Support Calculator
              </Heading>
            </Box>
            <Box width="10%">
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
            </Box>
          </Stack>
        </>
      )}
    />
  )
}

SiteHeader.propTypes = propTypes
SiteHeader.defaultProps = defaultProps
