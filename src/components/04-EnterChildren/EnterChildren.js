import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Collapse,
  Button,
  IconButton,
  Box,
  Stack,
} from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const EnterChildren = () => {
  const form = useForm()
  const [show, setShow] = React.useState(false)

  const handleToggle = () => setShow(!show)

  const numChildren = sessionStorage.getItem("numChildren")

  let updateState = (name, value, index,numChildren) => {
    name === "children.relationship" &&
      sessionStorage.setItem("relationship", JSON.stringify(value))
    name === "other.children.primary." + { index } + ".order" &&
      sessionStorage.setItem("order", value)
    name === "other.children.primary.depcare" &&
      sessionStorage.setItem("depcare", value)
    // name === "children."+numChildren+".status" &&
    //   console.log("set child status")
    //sessionStorage.setItem("children"+numChildren+".status", value)

    console.log(name)
  }




  const order = sessionStorage.getItem("order")
  const depcare = sessionStorage.getItem("depcare")
  const status = sessionStorage.getItem("children."+numChildren+".status")
  console.log(status)

  // let count = []
  // form.isStepValid === false && form.isStepSubmitted === true
  //   ? (count = [0, 1])
  //   : (count = [0])

  // console.log(form.isValid)
  // console.log(form.isStepSubmitted)
  // console.log(count)
  // set up a string to show ALL accordions in case of validation error
  return (
    <>
      {Array.apply(null, { length: numChildren }).map((e, index) => (
        <FormizStep
          key={index}
          name={`EnterOtherChildren` + index}
          order={4000 + index}
        >
          <SectionWrapper>
            <Box mb="8">
              <SectionHeader
                header={`Enter the details for Child ` + (index + 1) + `:`}
              />
            </Box>
            <>
              <Stack isInline spacing="4" mb="6" rounded="md" p="2">
                */}
                <Box flex="1">
                  <FieldInput
                    name={`child.${numChildren}.fname`}
                    label="First"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`child.${numChildren}.mname`}
                    label="Middle"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`child.${numChildren}.lname`}
                    label="Last name"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
              </Stack>
              <Box flex="1">
                <FieldDate
                  name={`children.${numChildren}.dob`}
                  label="Date of birth"
                  required="Required"
                  type="text"
                />
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`children.${numChildren}.status`}
                  label="This child is (select all that apply):"
                  required="Required"
                  updateState={updateState}
                  options={[
                    { value: "emancipated", label: "Emancipated" },
                    { value: "married", label: "Married" },
                    { value: "military", label: "Military" },
                    { value: "none", label: "None of the above" },
                  ]}
                />
                {/*<div>STATUS: {status}</div>*/}
                {/*{ status !== 'none' &&*/}
                {/*<Box>Sorry joe</Box>*/}
                {/*}*/}
              </Box>
            </>
          </SectionWrapper>
        </FormizStep>
      ))}
    </>
  )
}
