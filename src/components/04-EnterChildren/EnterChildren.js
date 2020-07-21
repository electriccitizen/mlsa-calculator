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
  let updateState = (name, value) => {
    name === "children.relationship" &&
      localStorage.setItem("relationship", JSON.stringify(value))
  }
  let count = []
  form.isStepValid === false && form.isStepSubmitted === true
    ? (count = [0, 1])
    : (count = [0])
  // Array.apply(null, { length: 2 }).map((e, index) => (
  //
  // ))
  // console.log(form.isValid)
  // console.log(form.isStepSubmitted)
  // console.log(count)
  // set up a string to show ALL accordions in case of validation error

  return (
    <FormizStep name="exposedPorts">
      <SectionWrapper>
        {/*<SectionHeader header={`Enter the details for each of your children`} />*/}
        <>
          {/*{form.values.basic.children} Total*/}
          <Accordion index={count} defaultIndex={[0]} allowMultiple>
            {Array.apply(null, { length: 2 }).map((e, index) => (
              <AccordionItem key={index}>
                <AccordionHeader bg="gray.50">
                  <Box color="gray.900" flex="1" textAlign="left">
                    Enter the details for Child {index + 1} {count}:
                  </Box>
                  <AccordionIcon />
                </AccordionHeader>
                <AccordionPanel pb={4}>
                  <Stack isInline spacing="4" mb="6" rounded="md" p="2">
                    <Box flex="1">
                      <FieldInput
                        name={`child.${index}.fname`}
                        label="First"
                        required="Required"
                        type="text"
                        m="0"
                      />
                    </Box>
                    <Box flex="1">
                      <FieldInput
                        name={`child.${index}.mname`}
                        label="Middle"
                        type="text"
                        m="0"
                      />
                    </Box>
                    <Box flex="1">
                      <FieldInput
                        name={`child.${index}.lname`}
                        label="Last name"
                        required="Required"
                        type="text"
                        m="0"
                      />
                    </Box>
                  </Stack>
                  <Stack isInline mb="6" rounded="md">
                    <Box flex="1">
                      <FieldDate
                        name={`children[${index}].dob`}
                        label="Date of birth"
                        required="Required"
                        type="text"
                        m="0"
                        p="4"
                      />
                    </Box>
                    <Box flex="1">
                      <Box mb="4">This child is (select all that apply):</Box>
                      <FieldRadio
                        name="children[${index}].status"
                        required="Required"
                        updateState={updateState}
                        options={[
                          { value: "emancipated", label: "Emancipated" },
                          { value: "married", label: "Married" },
                          { value: "military", label: "Military" },
                          { value: "none", label: "None of the above" },
                        ]}
                      />
                    </Box>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      </SectionWrapper>
    </FormizStep>
  )
}
