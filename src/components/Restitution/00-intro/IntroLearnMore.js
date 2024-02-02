import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Heading, Icon } from "@chakra-ui/react"
import { FaInfoCircle, FaExternalLinkAlt } from "react-icons/fa/index"
export const IntroLearnMore = () => {
  return (
    <FormizStep label={"Learn more"} name="introcode" order={1000}>
      <SectionHeader header={"Learn more about restitution"} />
      <Text mb={2}>
        You can find the law about the right to restitution at{" "}
        <a
          isExternal
          href={
            "https://leg.mt.gov/bills/mca/title_0460/chapter_0180/part_0020/section_0010/0460-0180-0020-0010.html"
          }
        >
          Montana Code Annotated § 46-18-201.
        </a>
        <Icon boxSize={"12px"} as={FaExternalLinkAlt} />.
      </Text>
      <Heading
        as="h2"
        fontSize="2xl"
        lineHeight="tall"
        fontWeight="normal"
        color={"gray.500"}
        href="#"
      >
        <Icon color={"brand.400"} as={FaInfoCircle} /> MTCrimeVictimHelp
      </Heading>
      <Text mb={4}>
        MLSA operates{" "}
        <a isExternal href={"https://MTCrimeVictimHelp.org"}>
          MTCrimeVictimHelp.org
        </a>{" "}
        <Icon boxSize={"12px"} as={FaExternalLinkAlt} />, a website with legal
        information and resources on restitution and other crime victim topics.
      </Text>

      <Heading
        as="h2"
        fontSize="2xl"
        lineHeight="tall"
        fontWeight="normal"
        color={"gray.500"}
        href="#"
      >
        <Icon color={"brand.400"} as={FaInfoCircle} /> Montana Department of
        Justice
      </Heading>
      <Text mb={4}>
        The State of Montana’s{" "}
        <a isExternal href={"https://dojmt.gov/victims/restitution/"}>
          Department of Justice, Office for Victim Services
        </a>{" "}
        <Icon boxSize={"12px"} as={FaExternalLinkAlt} />, provides information about restitution and
        other resources for crime victims.
      </Text>
    </FormizStep>
  )
}
