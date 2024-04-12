import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Link, Icon, useColorMode, Box, Heading } from "@chakra-ui/react"
import {
  FaFileAlt,
  FaFileInvoiceDollar,
  FaExternalLinkAlt,
} from "react-icons/fa"

export const IntroWhat = () => {
  const { colorMode } = useColorMode()
  return (
    <FormizStep label="What you will receive" name="introWhat" order={1000}>
      <SectionHeader header={"What you will receive"} />
      <Text mb={4}>
        When you’re done, you will be able to download, print, or email complete
        versions of a Child Support Worksheet, Financial Affidavit, or both.
      </Text>
      <Text mb={4}>
        If you have already completed a Financial Affidavit, the information
        from that document will help you create the Child Support Worksheet. If
        you have not previously created a Financial Affidavit, this tool will
        allow you to create one.
      </Text>
      <Text mb={4}>
        These tools use the Montana's Child Support Guidelines to produce the
        Child Support Worksheet.
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
            <Icon boxSize={6} color={"brand.400"} as={FaFileAlt} /> Child
            Support Worksheet
          </Heading>

          <Box flex={1}>What is the Child Support Worksheet?</Box>
          <Text mt={2} color={colorMode === "dark" ? "gray.600" : "gray.500"}>
            This worksheet compiles parenting, insurance, and financial
            information to project each parent or guardian’s support
            contributions. This sheet is intended for use in family law
            proceedings including divorce, child custody, or parenting plan
            actions.
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
            <Icon boxSize={6} color={"brand.400"} as={FaFileInvoiceDollar} />{" "}
            Financial Affadavit
          </Heading>

          <Box flex={1}>What is the Financial Affadavit?</Box>

          <Text color={colorMode === "dark" ? "gray.600" : "gray.500"} mt={2}>
            This affidavit is a sworn statement with information about your
            children, employment, and income. The Court and DPHHS’s CSSD use
            this information to determine each parent/guardians earnings, so
            it’s important that all the information in it is true. This sheet is
            intended for use in family law proceedings, including divorce, child
            custody, or parenting plan actions.
          </Text>
          <Text
            mt={2}
            fontSize={"md"}
            color={colorMode === "dark" ? "gray.600" : "gray.500"}
          ></Text>
        </Box>
      </Box>

      <Text mt={2}>
        Both forms and additional information about child support are available{" "}
        online on{" "}
        <Link isExternal
          color="brand.400"
          href="https://dphhs.mt.gov/index"
        >
          Montana’s DPHHS Child Support Services Division website
        </Link>
        . <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
      </Text>
    </FormizStep>
  )
}
