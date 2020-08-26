import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { Box, SimpleGrid } from '@chakra-ui/core'
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const OtherParent = ({ updateMontana }) => {
  const updateState = (name, value) => {
    name === "otherParent.numchildren" && sessionStorage.setItem("numChildren", value)
    // name === "basic.fname.other" &&
    //
    //   sessionStorage.setItem("fname", JSON.stringify(value))
    // name === "basic.lname.other" &&
    //   sessionStorage.setItem("lname", JSON.stringify(value))
  }

  // let fname = setField("fname")
  // let lname = setField("lname")

  let relationship = JSON.parse(sessionStorage.getItem("relationship"))
  let properNoun = ""
  relationship === "mother" ? (properNoun = "Father") : (properNoun = "Mother")

  return (
    <FormizStep name="OtherParent" order={3000}>
      <SectionWrapper>
        <SectionHeader header={`What is the other parent's name?`} />
        <SimpleGrid mb={8} columns={3} spacing={10}>
          <FieldInput
            name={`otherParent.fname`}
            label="First"
            required="Required"
            updateState={updateState}
            m="0"
          />
          <FieldInput
            name={`otherParent.mname`}
            label="Middle"
            placeholder="Optional"
            updateState={updateState}
            m="0"
          />
          <FieldInput
            name={`otherParent.lname`}
            required="Required"
            label="Last"
            updateState={updateState}
            m="0"
          />
        </SimpleGrid>
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeader
          header={`How many minor children do you have together? (This includes adopted children, but not stepchildren.)`}
        />
        <Box width="30%">
          <FieldInput
            name="otherParent.numchildren"
            label="Enter number"
            required="Required"
            updateState={updateState}
          />
        </Box>
      </SectionWrapper>
    </FormizStep>
  )
}
