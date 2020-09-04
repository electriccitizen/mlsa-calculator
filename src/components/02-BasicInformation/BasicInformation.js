import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import { SimpleGrid, Box, Flex, Text } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { AddressField } from "./AddressField"

export const BasicInformation = () => {
  const [state, setState] = useState({
    Mailing: "",
  })
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  return (
    <FormizStep name="BasicInformation" order={2000}>
      <SectionHeader header={"What is your name?"} />
      <Flex alignItems="top" mb={2}>
        <Box pr={4} pl={4}>
          <FieldInput
            name={`Primary.fname`}
            label="First"
            required="Required"
            updateState={updateState}
            fontSize="xl"
          />
        </Box>
        <Box pr={4} pl={4}>
          <FieldInput
            name={`Primary.mname`}
            label="Middle"
            placeholder="Optional"
            updateState={updateState}
          />
        </Box>
        <Box pr={4} pl={4}>
          <FieldInput
            name={`Primary.lname`}
            required="Required"
            label="Last"
            updateState={updateState}
          />
        </Box>
      </Flex>

      {/*{(documents === "both" || documents === "affadavit") && (*/}
      <>
        <SectionWrapper>
          <SectionHeader
            header={"Enter your birthday, phone, and driver's licence #:"}
          />
          <SimpleGrid mb={8} columns={3} spacing={10}>
            <FieldDate
              name={`Primary.dob`}
              label="Date of birth"
              required="Required"
              placeholder="MM/DD/YYYY"
              m="0"
            />
            <FieldInput
              name={`Primary.phone`}
              label="Primary phone"
              required="Required"
              updateState={updateState}
              m="0"
            />
            <FieldInput
              updateState={updateState}
              name={`Primary.dl`}
              label="Driver's License #"
              m="0"
            />
          </SimpleGrid>
        </SectionWrapper>

        <AddressField
          header={"What is your street address?"}
          label={"Street Address"}
          name={"Primary.address"}
        />
        <SectionWrapper>
          <SectionHeader header={"Is this your primary mailing address?"} />
          <FieldRadio
            name="PrimaryMailing"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </SectionWrapper>
      </>
      {/*)}*/}
      {/*))}*/}
      {state.PrimaryMailing === "no" && (
        <AddressField
          header={"What is your mailing address?"}
          label={"Mailing Address"}
          name={"Primary.mail_address"}
        />
      )}
    </FormizStep>
  )
}
