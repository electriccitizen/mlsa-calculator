import React from "react"
import PropTypes from "prop-types"
import {
  Box,
  IconButton,
  Heading,
  Icon,
  Link,
  List,
  ListItem,
} from "@chakra-ui/core"
import { useDarkTheme } from "../../hooks/isDarkTheme"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/core"
import { FaQuestion } from "react-icons/fa"
import { FaExternalLinkAlt } from "react-icons/fa/index"
const propTypes = {
  children: PropTypes.node,
}
const defaultProps = {
  children: "",
}

export const SectionHeader = ({ header, helpText, helpLinks }) => {
  const isDarkTheme = useDarkTheme()
  return (
    <Box
      alignItems="center"
      d="flex"
      bg={isDarkTheme ? "gray.800" : "gray.200"}
      p={4}
      mb={6}
      mt={0}
      color={isDarkTheme ? "gray.300" : "gray.700"}
      fontWeight={"bold"}
      rounded={"lg"}
    >
      <Heading mt={0} as={"h3"} size="md">
        {header}
      </Heading>
      {helpText && (
        <Box width="auto" ml="auto">
          <Popover>
            <PopoverTrigger>
              <IconButton
                ml="auto"
                colorScheme={isDarkTheme ? "gray" : "brand"}
                aria-label="Additional help"
                size="md"
                borderColor={"brand.400"}
                icon={<FaQuestion />}
              />
            </PopoverTrigger>
            <PopoverContent borderColor={isDarkTheme ? "black" : ""} zIndex={4}>
              <PopoverArrow
                color={isDarkTheme ? "gray.800" : "brand.500"}
                bg={isDarkTheme ? "gray.800" : "brand.500"}
              />
              <PopoverCloseButton bg={isDarkTheme ? "gray" : "gray.200"} />
              <PopoverHeader
                fontWeight="bold"
                color={isDarkTheme ? "gray.50" : "gray.50"}
                bg={isDarkTheme ? "gray.800" : "brand.500"}
                fontSize={"md"}
              >
                Additional help
              </PopoverHeader>
              <PopoverBody>
                <Box fontWeight="normal" fontSize="md" mt="2" mb="4">
                  <div dangerouslySetInnerHTML={{ __html: helpText.text }} />
                </Box>
                {helpLinks && (
                  <>
                    <Heading
                      as={"h4"}
                      color={isDarkTheme ? "gray.500" : "brand.400"}
                      size={"sm"}
                    >
                      References:
                    </Heading>
                    <List pl="2" fontWeight="normal" mt="2" mb="2">
                      {helpLinks &&
                        helpLinks.map((value, index) => (
                          <ListItem key={index}>
                            <Link
                              color={isDarkTheme ? "gray.100" : "brand.400"}
                              isExternal
                              fontSize="md"
                              href={value.value}
                            >
                              {value.label}
                            </Link>{" "}
                            <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
                          </ListItem>
                        ))}
                    </List>
                  </>
                )}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </Box>
  )
}

SectionHeader.propTypes = propTypes
SectionHeader.defaultProps = defaultProps
