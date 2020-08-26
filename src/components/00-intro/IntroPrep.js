import React from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import {
  Text,
  List,
  Icon,
  ListItem,
  UnorderedList,
  ListIcon,
  useColorMode,
  Heading,
  Box,
  Button,
} from "@chakra-ui/core"
import { PageLayout } from "../../layout/PageLayout"
import { Link } from "gatsby"
import { FaCalculator } from "react-icons/fa/index"
import { FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa/index'
export const IntroPrep = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <FormizStep name="introPrep" order={1000}>
      <SectionWrapper>
        <SectionHeader header={"Preparation checklist:"} />
        <Text>
          The following are examples of documentation and other
          information you may need in order to successfully complete the
          calculator.
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
            >Child Support Worksheet
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
