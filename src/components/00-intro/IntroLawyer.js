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
  Heading,
  Icon,
  UnorderedList,
  ListIcon,
  useColorMode,
  Box,
  Button,
} from "@chakra-ui/core"
import { FaInfoCircle, FaExternalLinkAlt } from "react-icons/fa/index"
import { PageLayout } from "../../layout/PageLayout"
export const IntroLawyer = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <FormizStep name="introLawyer" order={1000}>
      <SectionWrapper>
        <SectionHeader header={"Lawyer Referral Information:"} />

        <Text mb={2}>
          You may wish to speak with an attorney about this process or
          paperwork.
        </Text>
        <Heading
          as="h2"
          fontSize="2xl"
          lineHeight="tall"
          fontWeight="normal"
          color={"gray.500"}
          href="#"
        >
          <Icon color={"brand.400"} as={FaInfoCircle} /> Montana Legal Services
          Association (MLSA)
        </Heading>
        <Text mb={4}>
          Montana Legal Services Association (MLSA) gives free civil legal help
          to low-income people.
          <Link href={"https://goo.gl/7xgkgj"} color={"brand.400"}>
            {" "}
            Apply online
          </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
        </Text>
        <Heading
          as="h2"
          fontSize="2xl"
          lineHeight="tall"
          fontWeight="normal"
          color={"gray.500"}
          href="#"
        >
          <Icon color={"brand.400"} as={FaInfoCircle} /> AskCarla
        </Heading>
        <Text mb={2}>
          If you're eligible for MLSA, you may also get legal advice by email
          from AskKarla. Go to{" "}
          <Link href={"https://askkarla.org/"} color={"brand.400"}>
            {" "}
            AskCarla
          </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
        </Text>
        <Heading
          as="h2"
          fontSize="2xl"
          lineHeight="tall"
          fontWeight="normal"
          color={"gray.500"}
          href="#"
        >
          <Icon color={"brand.400"} as={FaInfoCircle} /> Montana Bar Lawyer
          Referral and Information Service
        </Heading>
        <Text mb={2}>
          You may be able to find an attorney to help you by calling the State
          of Montana Bar Lawyer Referral and Information Service (LRIS) at (406)
          449-6577. Or visit{" "}
          <Link href={"http://www.montanabar.org"} color={"brand.400"}>
            {" "}
            LRIS online
          </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} />
        </Text>
      </SectionWrapper>
    </FormizStep>
  )
}