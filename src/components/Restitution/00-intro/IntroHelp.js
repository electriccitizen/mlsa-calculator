import React from "react"
import { FormizStep } from "@formiz/core"
import { Text, useColorMode, Tooltip, Box } from "@chakra-ui/core"
import { SectionHeader } from "../../Utils/SectionHeader"

export const IntroHelp = () => {
  const { colorMode } = useColorMode()
  return (
    <FormizStep label={"Getting help"} name="introHelp" order={1000}>
      <SectionHeader header={"Getting help along the way:"} />
      <Text>
        As you go through each section of the workbook, you will find help
        icons that contain helpful information.
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
          helpText={{
            text:
              "These tips provide additional" +
              " information as you move through the" +
              " worksheet.",
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
    </FormizStep>
  )
}
