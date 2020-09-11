import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Link, Icon, useColorMode, Box, Heading } from "@chakra-ui/core"
import {
  FaFileAlt,
  FaFileInvoiceDollar,
  FaExternalLinkAlt,
} from "react-icons/fa"

export const IntroWhat = () => {
  const { colorMode } = useColorMode()
  return (
    <FormizStep label="What You Will Receive" name="introWhat" order={1000}>
      <SectionWrapper>
        <SectionHeader header={"What You Will Receive"} />
        <Text mb={4}>
          When finished, you will be able to download, print, or email completed
          versions of one or both of the following documents:
        </Text>
        <Box display={{ md: "flex" }}>
          <Box flex={1}>
            <Heading
              as="h2"
              fontSize="2xl"
              lineHeight="tall"
              fontWeight="normal"
              color={"gray.500"}
              href="#"
            >
              <Icon boxSize={10} color={"brand.400"} as={FaFileAlt} /> Child
              Support Worksheet
            </Heading>

            <Box flex={1}>What is the Child Support Worksheet?</Box>
            <Text mt={2} color={colorMode === "dark" ? "gray.600" : "gray.500"}>
              You can do anything here. So don't worry about it. All you need to
              paint is a few tools, a little instruction, and a vision in your
              mind.
            </Text>
          </Box>

          <Box flex={1} ml={{ md: 6 }}>
            <Heading
              as="h2"
              fontSize="2xl"
              lineHeight="tall"
              fontWeight="normal"
              color={"gray.500"}
              href="#"
            >
              <Icon boxSize={10} color={"brand.400"} as={FaFileInvoiceDollar} />{" "}
              Financial Affadavit
            </Heading>

            <Box flex={1}>What is the Financial Affadavit?</Box>

            <Text color={colorMode === "dark" ? "gray.600" : "gray.500"} mt={2}>
              You can do anything here. So don't worry about it. All you need to
              paint is a few tools, a little instruction, and a vision in your
              mind.
            </Text>
            <Text
              mt={2}
              fontSize={"md"}
              color={colorMode === "dark" ? "gray.600" : "gray.500"}
            ></Text>
          </Box>
        </Box>
        <Text mt={2}>
          If you have already completed a Financial Affidavit, the information
          from that document will help you create the Child Support Worksheet.
          If you have not previously created a Financial Affadavit, this tool
          will allow you to create one.
        </Text>
        <Text mt={2}>
          Note: both of these forms along with additional information are
          available{" "}
          <Link
            color="brand.400"
            href="https://dphhs.mt.gov/csed/services/guidelinespacket"
            isExternal
          >
            via the Montana state website
          </Link>
          . <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
        </Text>
      </SectionWrapper>
    </FormizStep>
  )
}
