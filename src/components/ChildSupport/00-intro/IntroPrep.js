import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import {
  Text,
  List,
  ListItem,
  ListIcon,
  useColorMode,
  Heading,
  Box,
} from "@chakra-ui/core"
import { FaCheckCircle } from "react-icons/fa/index"
export const IntroPrep = () => {
  const { colorMode } = useColorMode()
  return (
    <FormizStep label="Preparation Checklist" name="introPrep" order={1000}>
      <SectionWrapper>
        <SectionHeader header={"Preparation Checklist"} />
        <Text>
          The following are examples of documentation and other information you
          may need in order to successfully complete the calculator.
        </Text>
        <Text
          p={4}
          mt={2}
          color={colorMode === "dark" ? "gray.600" : "gray.500"}
        >
          You will need some or all of the following information for yourself
          AND the other parent, and will need to answer detailed questions about
          all children related to both parties.
        </Text>

        <Box display={{ md: "flex" }}>
          <Box mt={{ base: 6, md: 6 }} flex={1}>
            <Heading
              as="h2"
              fontSize="2xl"
              lineHeight="tall"
              fontWeight="normal"
              color={"gray.500"}
              href="#"
              mb={2}
            >
              Child Support Worksheet
            </Heading>
            <List spacing={4}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="brand.400" />
                Basic income info for current and past employers
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="brand.400" />
                Health expense records
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="brand.400" />
                Investment records
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="brand.400" />
                Addresses and contact info for current and past employers
              </ListItem>
            </List>
          </Box>

          <Box flex={1} mt={{ base: 6, md: 6 }} ml={{ md: 6 }}>
            <Heading
              as="h2"
              fontSize="2xl"
              lineHeight="tall"
              fontWeight="normal"
              color={"gray.500"}
              href="#"
              mb={2}
            >
              Financial Affadavit
            </Heading>

            <List spacing={4}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="brand.400" />
                Basic income info for current and past employers
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="brand.400" />
                Health expense records
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="brand.400" />
                Investment records
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="brand.400" />
                Addresses and contact info for current and past employers
              </ListItem>
            </List>
            <Text
              mt={2}
              fontSize={"md"}
              color={colorMode === "dark" ? "gray.600" : "gray.500"}
            >
              Note: If you have already completed a Financial Affidavit, the
              information from that document will help you with tool.
            </Text>
          </Box>
        </Box>
        <List
          color={colorMode === "dark" ? "gray.600" : "gray.500"}
          mt={2}
          spacing={4}
        ></List>
      </SectionWrapper>
    </FormizStep>
  )
}
