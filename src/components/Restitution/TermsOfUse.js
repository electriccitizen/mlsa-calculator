import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldRadio } from "../Fields/FieldRadio"
import { SectionHeader } from "../Utils/SectionHeader"
import {
  Icon,
  Box,
  Link,
  List,
  ListItem,
  Text,
  OrderedList,
  useColorMode,
} from "@chakra-ui/react"
import { LinkIcon } from "@chakra-ui/icons"
import { FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa/index"

export const TermsOfUse = () => {
  const [terms, setTerms] = useState()

  let updateState = (name, value) => {
    name === "initiate.terms.worksheet" && setTerms(value)
  }



  const { colorMode } = useColorMode()

  return (
    <FormizStep label="Terms Of Use" name="TermsOfUse" order={500}>
      <SectionHeader header={"Terms Of Use"} />
      <Text mb={2}>
        You must accept these Terms of Use before using this tool.
      </Text>
      <Box ml="8">
        <List
          spacing={4}
          color={colorMode === "dark" ? "gray.600" : "gray.500"}
        >
          <ListItem>
            <LinkIcon color="brand.400" boxSize="4" as={FaCheckCircle} />
            This site does not give legal advice. If you have additional
            questions about child support, you should contact an experienced
            attorney.
          </ListItem>
          <ListItem>
            <LinkIcon color="brand.400" boxSize="4" as={FaCheckCircle} />
            This tool is not a substitute for receiving child support assistance
            from a lawyer or the State of Montana's Child Support Enforcement
            Division.
          </ListItem>
          <ListItem>
            <LinkIcon color="brand.400" boxSize="4" as={FaCheckCircle} /> This
            site is for people who meet any of the following criteria:
            <OrderedList mt={4} ml={12} spacing={4}>
              <ListItem>
                People without lawyers who access this site from a statewide
                legal aid website, pro bono website, or approved court website.
              </ListItem>
              <ListItem>
                Government employees who provide social or legal services to
                low-income people and victims of crime.
              </ListItem>
              <ListItem>
                Nonprofit and charitable organization staff, including court
                staff who help other permitted users.
              </ListItem>
              <ListItem>
                Lawyers and their staff who provide not-for-profit or reduced
                fee legal help to low-income people, victims of crime, or
                nonprofit and charitable organizations.
              </ListItem>
            </OrderedList>
          </ListItem>
          <ListItem>
            You should not use this site for any commercial purposes.
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
            name="TermsOfUse"
            required="Required"
            updateState={updateState}
            mb={1}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {terms === "no" && (
            <Box
              borderRadius="lg"
              p={8}
              mt={4}
              color="gray.900"
              bg="yellow.50"
              fontSize={"md"}
              mb={4}
            >
              If you do not agree with our Terms of Use please return to the{" "}
              <Link color={"brand.400"} href={"https://www.mtlsa.org/"}>
                Montana Legal Services Association
              </Link>
              .
            </Box>
          )}
        </Box>
      </Box>
    </FormizStep>
  )
}
