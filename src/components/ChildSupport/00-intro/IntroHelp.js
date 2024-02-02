import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Link, Icon, useColorMode, Tooltip, Box } from "@chakra-ui/react"
import { FaExternalLinkAlt } from "react-icons/fa/index"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"
import { RulesProvider } from "../../../hooks/useRulesContext"

export const IntroHelp = () => {
  const { colorMode } = useColorMode()
  return (
    <RulesProvider>
      <FormizStep label="Getting help" name="introHelp" order={1000}>
        <SectionHeader header={"Getting help"} />
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
          Try toggling the administrative rules help.
        </Text>
        <Box pl={"12"} pr={"12"}>
          <SectionHeader header={"Administrative rules help:"} />
          <AdministrativeRules
            rules={[101, 102, 103, 140]}
            isRulesStatus={true}
            explanation={
              "For definitions and more information, click on the links below:"
            }
          />
          <Box mt="4" mb="4" fontSize={"lg"}>
            These rules will be available on each page of the interview and
            provide links to relevant administrative rules of Montana.
          </Box>
        </Box>
        <Text
          pr={4}
          pl={4}
          mt={4}
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
          <Box mt="4" mb="4" fontSize={"lg"}>
            This icon will be available any time there is additional information
            or tips about a particular step in the interview.
          </Box>
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
        <Box mt="4" mb="4" fontSize={"lg"} pl={"12"} pr={"12"}>
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
          <Link isExternal
            color={"brand.400"}
            href={"http://www.mtrules.org/gateway/ruleno.asp?RN=37%2E62%2E101"}
          >
            Administrative Rules of Montana
          </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} /> for reference as you
          progress through the interview.
        </Text>
      </FormizStep>
    </RulesProvider>
  )
}
