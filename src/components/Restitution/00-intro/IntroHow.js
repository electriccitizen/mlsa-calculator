import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Icon, useColorMode } from "@chakra-ui/react"
import { FaClock } from "react-icons/fa"
export const IntroHow = () => {
  const { colorMode } = useColorMode()
  return (
    <FormizStep label={"Getting started"} name="introHow" order={100}>
      <SectionHeader header={"Getting started"} />
      <Text mb={4}>
        You will be asked a series of questions in order to produce a
        restitution workbook that outlines your expenses as a crime victim.
      </Text>
      <Text mb={4}>
        Restitution is money that a court orders a defendant to pay to a crime
        victim or the Crime Victim Compensation Program, This workbook will
        help you estimate your expenses, but may not affect the amount the Court
        decides to set for restitution.
      </Text>
      <Text mb={4}>
        This tool is not a substitute for legal advice. The Court is not
        guaranteed to follow any estimates made by this tool.
      </Text>
      <Text p={4} mt={2} color={colorMode === "dark" ? "gray.400" : "gray.500"}>
        <Icon color={"brand.400"} as={FaClock} mr={2} /> Be prepared. It can
        take <strong>up to 10 minutes or longer</strong> to complete this tool,
        depending on your situation.
      </Text>
      <Text
        p={4}
        mt={2}
        mb={2}
        color={colorMode === "dark" ? "gray.400" : "gray.500"}
      >
        <Icon color={"brand.400"} as={FaClock} mr={2} /> This process is
        designed to be completed in one sitting. We do not collect or store any
        of your personal data.
      </Text>
      <Text>
        You will be asked about injuries, mental health costs, funeral expenses, lost or damaged property, and other topics.
      </Text>
    </FormizStep>
  )
}
