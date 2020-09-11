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
    <FormizStep label={"Preparation Checklist"} name="introPrep" order={1000}>
      <SectionWrapper>
        <SectionHeader header={"Preparation Checklist"} />
        <Text>
          [rewrite] The following are examples of documentation and other
          information you may need in order to successfully complete the
          worksheet.
        </Text>
        <Text
          p={4}
          mt={2}
          color={colorMode === "dark" ? "gray.400" : "gray.500"}
        >
          You may need to provide both existing costs and future costs for
          expenses related to injury or mental health. Examples of information
          you may need include:
        </Text>

        <Box display={{ md: "flex" }}>
          <Box mt={{ base: 4, md: 4 }} flex={1}>
            <Heading
              as="h2"
              fontSize="2xl"
              lineHeight="tall"
              fontWeight="normal"
              color={"gray.500"}
              href="#"
            >
            </Heading>
            <List spacing={4}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="brand.400" />
                (rewrite) This list
              </ListItem>
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
        </Box>
      </SectionWrapper>
    </FormizStep>
  )
}
