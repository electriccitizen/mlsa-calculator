import React from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import {
  Text,
  List,
  Link,
  ListItem,
  UnorderedList,
  ListIcon,
  Heading,
  useColorMode,
  Divider,
  Box,
  Icon,
} from "@chakra-ui/core"

import { FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa"
//import { Link } from 'gatsby'
import { FaCalculator } from "react-icons/fa/index"
import { PageLayout } from "../../layout/PageLayout"
export const IntroCanDo = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <FormizStep name="initiate.introCanDo" order={600}>
      <SectionWrapper>
        <SectionHeader header={"What this tool can do:"} />
        <Text>
          You will be asked a series of questions in order to help determine
          child support costs. The tool will calculate child support for
          inclusion in:
        </Text>

        <Text pr={4} pl={4} mt={2}>
          <List
            color={colorMode === "dark" ? "gray.400" : "gray.500"}
            mt={2}
            spacing={4}
          >
            <ListItem>
              <ListIcon as={FaCheckCircle} color="brand.400" />A petition for a
              dissolution with children in District Court in Montana.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="brand.400" />A petition for a
              parenting plan in District Court in Montana.
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="brand.400" />A modification of
              a child support order that was made in a dissolution with children
              or parenting plan by a District Court in Montana.
            </ListItem>
          </List>
        </Text>
      </SectionWrapper>
    </FormizStep>
  )
}
