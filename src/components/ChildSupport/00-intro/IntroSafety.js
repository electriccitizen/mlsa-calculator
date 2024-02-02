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
          If you are concerned about your safety or the safety of your family members, it would be a good idea to talk to a Crime Victim Advocate (CVA). CVAs can answer basic questions about the law and help you come up with ways to protect your safety. You can find the {" "}
        <Link isExternal
          href={
            "https://dojmt.gov/victims/crime-victim-advocates/"
          }
          color={"brand.400"}
        >
            CVA closest to you here
        </Link>.{" "}

        <Icon boxSize={"12px"} as={FaExternalLinkAlt} />.
      </Text>
    </FormizStep>
  )
}
