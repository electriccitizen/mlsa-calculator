import React from "react"
import { Link as GatsbyLink } from "gatsby"
// import { FaRegFileAlt } from "react-icons/fa"
import { FaRegFileAlt } from "react-icons/fa"
//, FaCalculator

import {
  Heading,
  Divider,
  Text,
  Box,
  Button,
  Icon,
  useColorMode,
  List,
  ListItem,
} from "@chakra-ui/react"

import { PageLayout } from "../layout/PageLayout"
export default function Home() {
  const { colorMode } = useColorMode()
  return (
    <PageLayout>
      <Box mb="4">
        <Heading
          fontFamily={
            '-apple-system, BlinkMacSystemFont, "Segoe UI",\n' +
            "               Roboto, Oxygen-Sans, Ubuntu, Cantarell,\n" +
            '               "Helvetica Neue", sans-serif;'
          }
          mb={4}
          fontSize={"3xl"}
        >
          Getting started
        </Heading>
        <Text mb={2}>
          These tools were developed by the Montana Legal Services Association
          to help calculate possible
          restitution costs for victims of crime.
          {/*These tools were developed by the Montana Legal Services Association*/}
          {/*to help determine child support costs and to calculate possible*/}
          {/*restitution costs for victims of crime.*/}
        </Text>
        {/*<Text mb={4} color={colorMode === "dark" ? "gray.600" : "gray.500"}>*/}
        {/*  Choose a tool below to get started with a short guide:*/}
        {/*</Text>*/}
        <Box display={{ md: "flex" }}>
          {/*<Box*/}
          {/*  pl={["4", "8", "8"]}*/}
          {/*  pr={["4", "8", "8"]}*/}
          {/*  mb={{ xs: "4" }}*/}
          {/*  flex={1}*/}
          {/*>*/}
          {/*  <GatsbyLink*/}
          {/*    className={colorMode === "dark" ? "homedark" : "homelight"}*/}
          {/*    to="/child-support"*/}
          {/*  >*/}
          {/*    <Box*/}
          {/*      fontSize={"sm"}*/}
          {/*      as={Button}*/}
          {/*      colorScheme={"brand"}*/}
          {/*      width={"100%"}*/}
          {/*    >*/}
          {/*      <Icon mr={2} as={FaCalculator} /> Child Support Calculator*/}
          {/*    </Box>*/}
          {/*  </GatsbyLink>*/}
          {/*  <Text*/}
          {/*    mt={2}*/}
          {/*    color={colorMode === "dark" ? "gray.600" : "gray.500"}*/}
          {/*    fontSize={"xl"}*/}
          {/*  >*/}
          {/*    Help determine child support costs for those involved in, or*/}
          {/*    considering divorce, child custody, or parenting plan actions.*/}
          {/*  </Text>*/}
          {/*  <GatsbyLink to="/child-support">*/}
          {/*    <Button>Start</Button>*/}
          {/*  </GatsbyLink>*/}
          {/*</Box>*/}

          <Box
            pl={["4", "8", "8"]}
            pr={["4", "8", "8"]}
            flex={1}
            ml={{ md: 12 }}
          >
            <GatsbyLink
              className={colorMode === "dark" ? "homedark" : "homelight"}
              to="/restitution"
            >
              <Box
                fontSize={"sm"}
                as={Button}
                colorScheme={"brand"}
                width={"100%"}
              >
                <Icon as={FaRegFileAlt} mr={2} />
                Restitution Workbook
              </Box>
            </GatsbyLink>
            <Text
              mt={2}
              fontSize={"xl"}
              color={colorMode === "dark" ? "gray.600" : "gray.500"}
            >
              Help estimate possible costs that are paid by a victim as a result
              of a crime, which could be ordered by a Court to be paid back by
              the defendant.
            </Text>
            <GatsbyLink to="/restitution">
              <Button>Start</Button>
            </GatsbyLink>
          </Box>
        </Box>
      </Box>

      <Divider pt="4" mb="2" orientation="horizontal" />

      <Box mt={{ base: 8, md: 8 }} flex={1}>
        <Heading fontWeight="normal" as={"h3"} size={"md"}>
          Other related resources and links:
        </Heading>
        <List styleType="disc" mt="2" ml={8} fontSize={"lg"} spacing={2}>
          <ListItem>
            <GatsbyLink to="/safety">Safe Internet Use and Browsing</GatsbyLink>
          </ListItem>
          <ListItem>
            <GatsbyLink to="/about">
              More about Montana Legal Services Association
            </GatsbyLink>
          </ListItem>
        </List>
      </Box>
    </PageLayout>
  )
}
