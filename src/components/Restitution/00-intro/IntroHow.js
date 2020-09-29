import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Icon, useColorMode } from "@chakra-ui/core"
import { FaClock } from "react-icons/fa/index"
export const IntroHow = () => {
  const { colorMode } = useColorMode()
  return (
    <FormizStep label={"Getting started"} name="introHow" order={100}>
      <SectionHeader header={"Getting started"} />
      <Text mb={4}>
        This application was built by the Montana Legal Services Association to
        help estimate the financial costs that victims incur as a result of a
        crime.
      </Text>
      <Text mb={4}>
        This tool will help you keep track of expenses related to the crime so
        that you can determine an estimate for proposed restitution.
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
        To complete this application, you need to have copies of estimates, bills, or receipts related to the crime.
      </Text>
    </FormizStep>
  )
}
