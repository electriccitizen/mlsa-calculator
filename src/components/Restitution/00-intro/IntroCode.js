import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Link, Heading, Icon } from "@chakra-ui/core"
import { FaInfoCircle, FaExternalLinkAlt } from "react-icons/fa/index"
export const IntroCode = () => {
  return (
    <FormizStep label={"Learn more"} name="introcode" order={1000}>
      <SectionHeader header={"Learn more"} />
      <Text mb={2}>
        Learn how to effectively use this tool for the best results [insert
        more].
      </Text>
      <Heading
        as="h2"
        fontSize="2xl"
        lineHeight="tall"
        fontWeight="normal"
        color={"gray.500"}
        href="#"
      >
      <Icon color={"brand.400"} as={FaInfoCircle} /> Montana Code
      </Heading>
<Text mb={4}>
    Learn more about Restitution. You can find the law about these rights at
  {" "} <a
      isExternal
      href={
        "https://leg.mt.gov/bills/mca/title_0460/chapter_0180/part_0020/section_0010/0460-0180-0020-0010.html"
      }
    >
      Montana Code Annotated § 46-18-201.
    </a>
    <Icon boxSize={"12px"} as={FaExternalLinkAlt} />

</Text>

        <Heading
        as="h2"
        fontSize="2xl"
        lineHeight="tall"
        fontWeight="normal"
        color={"gray.500"}
        href="#"
      >
        <Icon color={"brand.400"} as={FaInfoCircle} /> Sample Restitution Worksheet
      </Heading>
      <Text mb={2}>
         [insert
       sample image of complete worksheet].
      </Text>

    </FormizStep>
  )
}
