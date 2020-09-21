import React, { useState } from "react"
import { Link } from "gatsby"
import { FormizStep } from "@formiz/core"
import { FieldRadio } from "../Fields/FieldRadio"
import { SectionHeader } from "../Utils/SectionHeader"
import { AlertBox } from "../Utils/AlertBox"
import {
  Icon,
  Box,
  List,
  ListItem,
  Text,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/core"
import { LinkIcon } from "@chakra-ui/icons"
import { FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa/index"

export const TermsOfUse = () => {
  const [terms, setTerms] = useState()

  let updateState = (name, value) => {
    name === "initiate.terms" && setTerms(value)
  }

  const { colorMode } = useColorMode()

  return (
    <FormizStep label={`Terms of Use`} name="TermsOfUse" order={500}>
      <SectionHeader header={"Terms of Use:"} />
      <Text mb={2}>
        You must accept these Terms of Use before using this tool. If you have
        not already reviewed the{" "}
        <Link to={"/restitution"}>Getting Started</Link> guide for this tool
        please do so before continuing.
      </Text>
      <Box ml="8">
        <List
          spacing={4}
          color={colorMode === "dark" ? "gray.400" : "gray.500"}
        >
          <ListItem>
            <LinkIcon color="brand.400" boxSize="4" as={FaCheckCircle} /> This
            site does not give legal advice. Talk to a lawyer if you need legal
            advice.
          </ListItem>
          <ListItem>
            <LinkIcon color="brand.400" boxSize="4" as={FaCheckCircle} /> You
            may not use this site for any commercial purpose.
          </ListItem>
          <ListItem>
            <LinkIcon color="brand.400" boxSize="4" as={FaCheckCircle} /> This
            site is for people who meet any of the following criteria:
            <UnorderedList mt={4} ml={12} spacing={4}>
              <ListItem>
                People without lawyers who access this site from a statewide
                legal aid website, pro bono website, or approved court website.
              </ListItem>
              <ListItem>
                Nonprofit and charitable organization staff or court staff who
                help other permitted users.
              </ListItem>
              <ListItem>
                Lawyers and their staff who provide not-for-profit or reduced
                fee legal help to low-income people, victims of crime, or
                nonprofit and charitable organizations.
              </ListItem>
            </UnorderedList>
          </ListItem>
        </List>
        <Text mt={8} mb={4}>
          I have read and agree to MLSA’s{" "}
          <Link isExternal color={"brand.400"} href={"/terms-of-use"}>
            Terms of Use
          </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} />. Click yes below to
          continue:
        </Text>
        <Box>
          <FieldRadio
            d={"flex"}
            name="initiate.terms"
            required="Required"
            updateState={updateState}
            mb={1}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {terms === "no" && (
            <AlertBox>
              If you do not agree with our Terms of Use please return to the
              {" "}<Link color={"brand.400"} href={"https://www.mtlsa.org/"}>
                  Montana Legal Services Association
                </Link>
                .
            </AlertBox>
          )}
        </Box>
      </Box>
    </FormizStep>
  )
}
