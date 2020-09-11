import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Link, Icon, Heading, useColorMode, Box } from "@chakra-ui/core"
import { FaClock } from "react-icons/fa/index"
export const IntroHow = () => {
  const { colorMode } = useColorMode()
  return (
    <FormizStep label={"Getting Started"} name="introHow" order={100}>
      <SectionWrapper>
        <SectionHeader header={"Getting Started"} />
        <Text>
          You will be asked a series of questions in order to produce a
          restitution worksheet that outlines your expenses as a crime victim.
        </Text>
        <Text
          p={4}
          mt={2}
          color={colorMode === "dark" ? "gray.400" : "gray.500"}
        >
          <Icon color={"brand.400"} as={FaClock} mr={2} /> Be prepared. It can take{" "}
          <strong>up to 10 minutes or longer</strong> to complete this tool,
          depending on your situation.
        </Text>
        <Text
          p={4}
          mt={2}
          mb={2}
          color={colorMode === "dark" ?  "gray.400" : "gray.500"}
        >
          <Icon color={"brand.400"} as={FaClock} mr={2} /> This process is designed to
          be completed in one sitting. We do not collect or store any of your
          personal data.
        </Text>
        <Text>
          You will be asked about injuries, mental health costs, funeral
          expense, lost or damaged property, and other topics.
        </Text>
      </SectionWrapper>
    </FormizStep>
  )
}
