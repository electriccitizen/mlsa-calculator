import React from "react"
import { FaCheckCircle } from "react-icons/fa"
import {
  List,
  ListItem,
  UnorderedList,
  Heading,
  Text,
  Box,
  useColorMode,
} from "@chakra-ui/core"

import { PageLayout } from "../layout/PageLayout"
import { LinkIcon } from "@chakra-ui/icons"
export default function TermsOfUse() {
  const { colorMode } = useColorMode()
  return (
    <>
      <PageLayout>
        <Box mb="8">
          <Heading mb={4}>Terms of Use</Heading>
          <Text>
            You must accept these Terms of Use before using this tool.
          </Text>
          <Box ml="8">
            <List
              spacing={4}
              color={colorMode === "dark" ? "gray.600" : "gray.500"}
            >
              <ListItem>
                <LinkIcon boxSize="4" as={FaCheckCircle} /> This site does not
                give legal advice. Talk to a lawyer if you need legal advice.
              </ListItem>
              <ListItem>
                <LinkIcon boxSize="4" as={FaCheckCircle} /> You may not use this
                site for any commercial purpose.
              </ListItem>
              <ListItem>
                <LinkIcon boxSize="4" as={FaCheckCircle} /> This site is for
                people who meet any of the following criteria:
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
          </Box>
        </Box>
      </PageLayout>
    </>
  )
}
