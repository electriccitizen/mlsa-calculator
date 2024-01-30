import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Link, Heading, Icon } from "@chakra-ui/react"
import { FaInfoCircle, FaExternalLinkAlt } from "react-icons/fa/index"
export const IntroSafety = () => {
  return (
    <FormizStep label="Safety and privacy" name="introSafety" order={1000}>
      <SectionHeader header={"Safety and Privacy"} />

      <Text mb={2}>
        This tool does not collect or store any personal information, but basic
        safety precautions should be taken into account:
      </Text>
      <Heading
        as="h2"
        fontSize="2xl"
        lineHeight="tall"
        fontWeight="normal"
        color={"gray.500"}
        href="#"
      >
        <Icon color={"brand.400"} as={FaInfoCircle} /> Using a public computer
      </Heading>
      <Text mb={4}>
        If you are using a public computer, be sure to close the browser when
        complete. Do not download your results to a public computer.
      </Text>
      <Heading
        as="h2"
        fontSize="2xl"
        lineHeight="tall"
        fontWeight="normal"
        color={"gray.500"}
        href="#"
      >
        <Icon color={"brand.400"} as={FaInfoCircle} /> Browsing safety
      </Heading>
      <Text mb={2}>
        If you feel unsafe in your household or in your relationship, this <a href={"/safety"}  rel={"noreferrer"} target={"_blank"}>safe
        internet use information</a> may help you keep yourself, your family, and
        your information safe.
      </Text>
      <Heading
        as="h2"
        fontSize="2xl"
        lineHeight="tall"
        fontWeight="normal"
        color={"gray.500"}
        href="#"
      >
        <Icon color={"brand.400"} as={FaInfoCircle} /> Domestic Violence
      </Heading>
      <Text mb={2}>
        The Montana Child Support Services Division (CSSD), part of the MT
        Department of Health and Human Services (DPHHS). To open a case with
        CSSD,{" "}
        <Link isExternal
          href={
            "https://webapp.hhs.mt.gov/SEARCHSIntakeApplicationApp/"
          }
          color={"brand.400"}
        >
            you can apply online here
        </Link>.{" "}
        <Icon boxSize={"12px"} as={FaExternalLinkAlt} /> You may pick up an
        application at a{" "}
        <Link isExternal
          href={
            "https://dphhs.mt.gov/cssd/Contacts"
          }
          color={"brand.400"}
        >
          local child support office
        </Link>{" "}
        <Icon boxSize={"12px"} as={FaExternalLinkAlt} />.
      </Text>
    </FormizStep>
  )
}
