import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { Text, Link, Icon, useColorMode, Tooltip, Box } from "@chakra-ui/core"
import { FaExternalLinkAlt } from "react-icons/fa/index"
export const IntroHelp = () => {
  const { colorMode } = useColorMode()
  return (
    <FormizStep name="introHelp" order={1000}>
      <SectionWrapper>
        <SectionHeader header={"Getting help along the way:"} />

        <Text>
          As you go through each section of the interview, you will find help
          icons that contain helpful information, along with links to specific
          administrative rules where they best apply.
        </Text>
        <Text
          pr={4}
          pl={4}
          mt={2}
          mb={4}
          color={colorMode === "dark" ? "gray.600" : "gray.500"}
        >
          Try clicking the question mark below for an example.
        </Text>
        <Box pl={"12"} pr={"12"}>
          <SectionHeader
            header={"Additional help example:"}
            helpLinks={[
              { value: "#", label: "Official guideline (PDF)" },
              { value: "#", label: "Official guideline (PDF)" },
            ]}
            helpText={{
              text:
                "These tips provide additional" +
                " information as you move through the" +
                " calculator. When available, they will" +
                " also include links to specific guidelines.",
            }}
          />
        </Box>
        <Text
          pr={4}
          pl={4}
          mt={2}
          mb={4}
          color={colorMode === "dark" ? "gray.600" : "gray.500"}
        >
          Now try hovering over the tooltip below:
        </Text>
        <Box pl={"12"} pr={"12"}>
          <SectionHeader header={"Tooltip example:"} />
          <Text mb={8}>
            You will see this symbol
            <Tooltip
              hasArrow
              label="You can click or hover for more information whenever you see this symbol."
              bg="gray.300"
              color="gray.700"
            >
              <Text fontSize={"md"} color="brand.400" as="u">
                {" "}
                [?]
              </Text>
            </Tooltip>{" "}
            throughout the interview. You can click or hover to see more
            information.
          </Text>
        </Box>
        <Text mt={4} mb={4}>
          You may find it helpful to print the{" "}
          <Link
            color={"brand.400"}
            href={"http://www.mtrules.org/gateway/ruleno.asp?RN=37%2E62%2E101"}
          >
            Administrative Rules of Montana
          </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} /> for reference as you
          progress through the interview. that apply to specific questions
          throughout the interview.
        </Text>
      </SectionWrapper>
    </FormizStep>
  )
}
