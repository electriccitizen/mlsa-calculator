import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { FaCalculator, FaGlobe, FaThumbsUp } from "react-icons/fa"
import {
  Heading,
  Divider,
  Text,
  Box,
  Button,
  useColorMode,
} from "@chakra-ui/core"

import { PageLayout } from "../layout/PageLayout"
export default function Home() {
  const { colorMode } = useColorMode()
  return (
    <>
      <PageLayout>
        <Box mt="4" mb="8">
          <Heading mb={4}>Getting started</Heading>
          <Text>
            This application was developed by the Montana Legal Services
            Association to help determine child support costs for those involved
            in, or considering divorce, child custody, or parenting plan
            actions.
          </Text>
          <Text mt={2} color={colorMode === "dark" ? "gray.600" : "gray.500"}>
            If this is your first time here, the following pages will guide you
            through the basics of using the calculator prior to beginning.
          </Text>
          <Box w="100%" align="right">
            <GatsbyLink to="/intro">
              <Button
                leftIcon={<FaCalculator />}
                colorScheme="brand"
                variant="solid"
              >
                Start
              </Button>
            </GatsbyLink>
          </Box>
        </Box>

        <Divider mb="2" orientation="horizontal" />

        <Box display={{ md: "flex" }}>
          <Box mt={{ base: 8, md: 8 }} flex={1}>
            <Text
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
              letterSpacing="wide"
              color={colorMode === "dark" ? "gray.600" : "brand.400"}
            >
              Learning
            </Text>
            <GatsbyLink
              mt={1}
              display="block"
              fontSize="lg"
              fontWeight="semibold"
              to="/guide"
            >
              Guide to using the calculator
            </GatsbyLink>
            <Text mt={2} color={colorMode === "dark" ? "gray.600" : "gray.500"}>
              Learn how to effectively use this tool for the best results.
            </Text>
            <Button
              align={"right"}
              leftIcon={<FaGlobe />}
              colorScheme="gray"
              variant="solid"
              size="xs"
            >
              <GatsbyLink to="/guide">Calculator Guide</GatsbyLink>
            </Button>
          </Box>

          <Box flex={1} mt={{ base: 8, md: 8 }} ml={{ md: 6 }}>
            <Text
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
              letterSpacing="wide"
              color={colorMode === "dark" ? "gray.600" : "brand.400"}
            >
              Safe browsing
            </Text>
            <GatsbyLink
              mt={1}
              display="block"
              fontSize="lg"
              fontWeight="semibold"
              to="/safety"
            >
              Protect your safety
            </GatsbyLink>
            <Text mt={2} color={colorMode === "dark" ? "gray.600" : "gray.500"}>
              Learn more about safe browsing techniques, and our privacy policy.
            </Text>
            <Button
              leftIcon={<FaThumbsUp />}
              colorScheme="gray"
              variant="solid"
              size="xs"
            >
              <GatsbyLink to="/safety">Learn more</GatsbyLink>
            </Button>
          </Box>
        </Box>
      </PageLayout>
    </>
  )
}
