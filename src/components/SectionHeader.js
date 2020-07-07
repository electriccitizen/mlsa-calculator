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
      bg={isDarkTheme ? "gray.900" : "gray.100"}
      p={4}
      mb={2}
    >
      {header}
      {helpText && (
        <Box width="auto" ml="auto">
          <Popover>
            <PopoverTrigger>
              <IconButton
                ml="auto"
                variantColor="teal"
                aria-label="Additional help"
                size="md"
                icon="question"
              />
            </PopoverTrigger>
            <PopoverContent zIndex={4}>
              <PopoverArrow bg="teal.600" />
              <PopoverCloseButton bg="white" />
              <PopoverHeader fontWeight="bold" color="white" bg="teal.600">
                Additional help
              </PopoverHeader>
              <PopoverBody>
                <Box mt="2" mb="4">
                  {helpText.text}
                </Box>
                {helpLinks &&
                <>
                <hr />
                <List mt="2" mb="2" styleType="disc">
                  {helpLinks &&
                    helpLinks.map((value, index) => (
                      <ListItem key={index}>
                        <Link isExternal fontSize="sm" href={value.value}>
                          {value.label}
                          <Icon name="external-link" ml="1" mb="1" />
                        </Link>
                      </ListItem>
                    ))}
                </List>
                </>
                }
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
