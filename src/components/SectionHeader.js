import React, { useRef, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import {
  useColorMode,
  Button,
  Stack,
  Box,
  IconButton,
  Flex,
  Heading,
  Icon,
  Link,
  List,
  ListItem,
  Text,
} from "@chakra-ui/core"
import { useDarkTheme } from "../hooks/isDarkTheme"
import { useToastValues } from "../hooks/useToastValues"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/core"
import { FaQuestion } from "react-icons/fa"
import { FaExternalLinkAlt } from 'react-icons/fa/index'
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

export const SectionHeader = ({ header, helpText, helpLinks }) => {
  const toastValues = useToastValues()
  useDebugTime()
  const isDarkTheme = useDarkTheme()
  const { colorMode } = useColorMode()
  return (
    <Box
      alignItems="center"
      d="flex"
      bg={isDarkTheme ? "gray.800" : "gray.200"}
      p={4}
      mb={6}
      color={isDarkTheme ? "gray.300" : "gray.700"}
      fontWeight={"bold"}
    >
      <Heading as={"h3"} size="md">{header}</Heading>
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
              <PopoverArrow color={isDarkTheme ? "gray.800" : "brand.500"} bg={isDarkTheme ? "gray.800" : "brand.500"} />
              <PopoverCloseButton bg={isDarkTheme ? "gray" : "gray.200"}/>
              <PopoverHeader fontWeight="bold"
                             color={isDarkTheme ? "gray.50" : "gray.50"}
                             bg={isDarkTheme ? "gray.800" : "brand.500"}
                              fontSize={"md"}>

                Additional help
              </PopoverHeader>
              <PopoverBody>
                <Box fontWeight="normal" fontSize="md" mt="2" mb="4">
                  <div dangerouslySetInnerHTML={{ __html: helpText.text  }} />
                </Box>
                {helpLinks && (
                  <>
                    <Heading as={"h4"} color={isDarkTheme ? "gray.500" : "brand.400"} size={"sm"}>References:</Heading>
                    <List  pl="2" fontWeight="normal" mt="2" mb="2" >
                      {helpLinks &&
                        helpLinks.map((value, index) => (
                          <ListItem key={index}>
                            <Link color={isDarkTheme ? "gray.100" : "brand.400"}isExternal fontSize="md" href={value.value}>
                              {value.label}
                            </Link>  <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
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
