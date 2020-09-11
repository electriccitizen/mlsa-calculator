import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text, Link, Icon, Heading, useColorMode, Box } from "@chakra-ui/core"
import { FaClock, FaExternalLinkAlt } from "react-icons/fa/index"
export const IntroHow = () => {
  const { colorMode } = useColorMode()
  return (
    <FormizStep label="Getting Started" name="introHow" order={1000}>
      <SectionWrapper>
        <SectionHeader header={"Getting Started"} />
        <Text>
          You will be asked a series of questions in order to help determine
          child support costs. You will need to provide details surrounding
          employment, income history, expenses, and other financial information
          for BOTH individuals involved in this case.
        </Text>
        <Text
          p={4}
          mt={2}
          color={colorMode === "dark" ? "gray.600" : "gray.500"}
        >
          <Icon color={"brand.400"} as={FaClock} mr={2}/> Be prepared. It can take{" "}
          <strong>up to 30 minutes or longer</strong> to complete this tool,
          depending on your situation.
        </Text>
        <Text
          p={4}
          mt={2}
          mb={2}
          color={colorMode === "dark" ? "gray.600" : "gray.500"}
        >
          <Icon color={"brand.400"} as={FaClock}  mr={2}/> This process is designed to
          be completed in one sitting; we do not collect or store any of your
          personal data.
        </Text>

        <Box mb={4}>
          <p>
            The child support guidelines used to calculate support are contained
            in the{" "}
            <Link
              isExternal
              color={"brand.400"}
              href={
                "http://www.mtrules.org/gateway/ruleno.asp?RN=37%2E62%2E101"
              }
            >
              Administrative Rules of Montana
            </Link>{" "}
            <Icon boxSize={"12px"} as={FaExternalLinkAlt} />. There are more
            than 20 individual rules, and we provide links to each rule during
            the portion of the child support interview where they are the best
            fit.
          </p>
          <p>
            You may print a copy of all the rules or just refer to the ones you
            need when you need them. You can navigate through the rules by using
            the Prev and Next buttons on the web page (see screen shot below).
          </p>
          {/*<Image />*/}
        </Box>
      </SectionWrapper>
    </FormizStep>
  )
}
