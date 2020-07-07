import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldSelect } from "../Fields/FieldSelect"
import { SimpleGrid } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const OtherParent = ({ updateMontana }) => {
  const form = useForm()

  const setField = value => {
    return (
      JSON.parse(localStorage.getItem(value)) &&
      JSON.parse(localStorage.getItem(value))
    )
  }

  const updateState = (name, value) => {
    console.log('i set the damn name')
    // name === "basic.fname.other" &&
    //
    //   localStorage.setItem("fname", JSON.stringify(value))
    // name === "basic.lname.other" &&
    //   localStorage.setItem("lname", JSON.stringify(value))
  }
  let fname = setField("fname")
  let lname = setField("lname")

  let relationship = JSON.parse(localStorage.getItem("relationship"))
  let properNoun = ""
  relationship === "mother" ? (properNoun = "Father") : (properNoun = "Mother")

  return (
    <FormizStep name="OtherParent">
      <SectionWrapper>
        <SectionHeader header={`What is the ${properNoun}'s name?`} />
        <SimpleGrid mb={8} columns={3} spacing={10}>
          <FieldInput
            name={`other.fname`}
            label="First"
            required="Required"
            updateState={updateState}
            m="0"
          />
          <FieldInput
            name={`other.mname`}
            label="Middle"
            placeholder="Optional"
            updateState={updateState}
            m="0"
          />
          <FieldInput
            name={`other.lname`}
            required="Required"
            label="Last"
            updateState={updateState}
            m="0"
          />
        </SimpleGrid>
      </SectionWrapper>
        <SectionWrapper>
          <SectionHeader
            header={
              `How many minor children do you have together? This includes adopted children, but not stepchildren.`
            }
          />
          <FieldSelect
            name="basic.children"
            label="Select a number"
            placeholder="None"
            required="Required"
            keepValue
            options={[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
              { value: "6", label: "6" },
              { value: "7", label: "7" },
              { value: "8", label: "8" },
            ]}
          />
        </SectionWrapper>
    </FormizStep>
  )
}

// <Box  bg="gray.50" w="100%" p={4} mb={4} >
//   What is the { Pronoun } name?
// </Box>
// <Box flex="2">
//   <FieldInput
//     name={`basic.fname2`}
//     label="First Name"
//     required="Required"
//     placeholder={ Pronoun }
//     m="0"
//   />
// </Box>
// <Box flex="2">
//   <FieldInput
//     name={`basic.mname2`}
//     label="Middle"
//     placeholder="Optional middle name or initial"
//
//     m="0"
//   />
// </Box>
// <Box mb={4} flex="2">
//   <FieldInput
//     name={`basic.lname2`}
//     required="Required"
//     label="Last Name"
//     placeholder="Enter your last name"
//     mt="0"
//   />
// </Box>
// <Box  bg="gray.50" w="100%" p={4} mb={4} >
//   How many minor children do you and [first name] have together? This includes adopted children, but not stepchildren.
// </Box>
// <Box>
//   <FieldSelect
//     name="basic.children"
//     label="Enter a number"
//     placeholder="None"
//
//     keepValue
//     options={[
//       { value: '1', label: '1' },
//       { value: '2', label: '2' },
//       { value: '3', label: '3' },
//       { value: '4', label: '4' },
//       { value: '5', label: '5' },
//       { value: '6', label: '6' },
//       { value: '7', label: '7' },
//       { value: '8', label: '8' },
//     ]}
//   />
//
// </Box>
