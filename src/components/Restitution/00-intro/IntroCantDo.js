import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Icon, useColorMode } from "@chakra-ui/core"
import { FaStopCircle } from "react-icons/fa"
export const IntroCantDo = () => {
  const { colorMode } = useColorMode()
  return (
    <FormizStep label={"What Can't It Do"} name="initiate.introCantDo" order={700}>
      <SectionWrapper>
        <SectionHeader header={"What This Tool Can't Do"} />
        <Text>
          [rewrite]  This calculator cannot take the place of a lawyer’s legal advice or
          information from the State of Montana Child Support Enforcement
          Division (CSED).
        </Text>
        <Text
          p={4}
          mt={2}
          color={colorMode === "dark" ? "gray.400" : "gray.500"}
        >
          <Icon color="red.700" as={FaStopCircle} /> There is no claim or
          guarantee that using the calculator will help you get what you want.
        </Text>
        <Text
          p={4}
          mb={2}
          color={colorMode === "dark" ? "gray.400" : "gray.500"}
        >
          <Icon color="red.700" as={FaStopCircle} /> Montana Legal Services
          Association and/or CSED are not responsible for what happens if you
          use this calculator.
        </Text>
        <Text>
          This calculator may not be right for you if you have a complicated
          case. For example, you may need additional help if there is a dispute
          about self-employment income, if you are ineligible to work due to
          illegality or disability, if you work full time but not all months of
          the year (teacher).
        </Text>
      </SectionWrapper>
    </FormizStep>
  )
}
