import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { Box, Icon, Link, List, ListItem, Text, UnorderedList, useColorMode } from '@chakra-ui/core'
import { LinkIcon } from '@chakra-ui/icons'
import { FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa/index'

export const TermsOfUse = ({ updateMontana }) => {
  const form = useForm()
  const setField = value => {
    return (
      JSON.parse(sessionStorage.getItem(value)) &&
      JSON.parse(sessionStorage.getItem(value))
    )
  }


  let updateState = (name, value) => (
    name === "initiate.terms" &&
    sessionStorage.setItem("terms",value)
  )

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <FormizStep name="termsofuse" order={500}>
      <SectionWrapper>
        <SectionHeader header={"Terms of Use:"} />
        <Text mb={2}>
          You must accept these <Link
          isExternal
          color={"brand.400"}
          href={
            "/terms-of-use"
          }
        >
          Terms of Use
        </Link>{" "}
          <Icon boxSize={"12px"} as={FaExternalLinkAlt} /> before using this tool.
        </Text>
        <Box ml="8">
          <List
            spacing={4}
            color={colorMode === "dark" ? "gray.600" : "gray.500"}
          >
            <ListItem>
              <LinkIcon color="brand.400" boxSize="4" as={FaCheckCircle} /> This site does
              not give legal advice. Talk to a lawyer if you
              need legal advice.
            </ListItem>
            <ListItem>
              <LinkIcon color="brand.400" boxSize="4" as={FaCheckCircle} /> You may not use this site for any commercial purpose.
            </ListItem>
            <ListItem>
              <LinkIcon  color="brand.400" boxSize="4" as={FaCheckCircle} /> This site is for people who meet any of the following criteria:
              <UnorderedList mt={4} ml={12} spacing={4}>
                <ListItem>
                  People without lawyers who access this site from a statewide
                  legal aid website, pro bono website, or approved court
                  website.
                </ListItem>
                <ListItem>
                  Nonprofit and charitable organization staff or court staff
                  who help other permitted users.
                </ListItem>
                <ListItem>
                  Lawyers and their staff who provide not-for-profit or
                  reduced fee legal help to low-income people, victims of
                  crime, or nonprofit and charitable organizations.
                </ListItem>
              </UnorderedList>
            </ListItem>
          </List>
          <Text mt={8} mb={4}>
            I have read and agree to MLSA’s <Link
              isExternal
              color={"brand.400"}
              href={
                "/terms-of-use"
              }
            >
              Terms of Use
            </Link>{" "}
            <Icon boxSize={"12px"} as={FaExternalLinkAlt} />. Click
            yes below to continue:
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
            {sessionStorage.getItem('terms') === 'no' &&
            <Box p={4} bg={"gray.300"}>
              If you do not agree with our Terms of Use
               please return to the <Link
              color={"brand.400"}
              href={
                "https://www.mtlsa.org/"
              }
            >
              Montana Legal
              Services Association
            </Link>.
            </Box>
            }
          </Box>

        </Box>
      </SectionWrapper>
    </FormizStep>
  )
}