import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Icon, useColorMode } from "@chakra-ui/react"
import { FaStopCircle } from "react-icons/fa"
export const IntroCantDo = () => {
  const { colorMode } = useColorMode()
  return (
    <FormizStep
      label={"What this tool can't do"}
      name="initiate.introCantDo"
      order={700}
    >
      <SectionHeader header={"What this tool can't do"} />
      <Text>
        This workbook cannot take the place of court-ordered restitution or a
        lawyer’s legal advice.
      </Text>
      <Text p={4} mt={2} color={colorMode === "dark" ? "gray.400" : "gray.500"}>
        <Icon color="red.700" as={FaStopCircle} /> There is no claim or
        guarantee that using the calculator will help you get what you want.
      </Text>
      <Text p={4} mb={2} color={colorMode === "dark" ? "gray.400" : "gray.500"}>
        <Icon color="red.700" as={FaStopCircle} /> Montana Legal Services
        Association and/or CSED are not responsible for what happens if you use
        this calculator.
      </Text>

    </FormizStep>
  )
}
