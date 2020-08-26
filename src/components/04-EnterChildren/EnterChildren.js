import React, { useffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import { Box, Stack, useColorMode } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const EnterChildren = () => {
  const [show, setShow] = React.useState(false)
  const numChildren = sessionStorage.getItem("numChildren")
  const { colorMode } = useColorMode()
  const form = useForm()

  let updateState = (name, value, index, numChildren) => {
    name === "primaryChildren." + index + ".status" &&
      sessionStorage.setItem("primaryChildren." + index + ".status", value)
  }
  const otherParent = form.values.otherParent
    ? form.values.otherParent.fname
    : ""

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
                header={
                  `Enter the 
                  details for your children with ` +
                  otherParent +
                  ` (` +
                  (index + 1) +
                  ` of ` +
                  numChildren +
                  `)`
                }
              />
            </Box>
            <>
              <Stack isInline spacing="4" mb="6" rounded="md" p="2">
                <Box flex="1">
                  <FieldInput
                    name={`primaryChildren.${index}.fname`}
                    label="First name"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`primaryChildren.${index}.mname`}
                    label="Middle"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`primaryChildren.${index}.lname`}
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
                  name={`primaryChildren.${index}.dob`}
                  label="Date of birth"
                  required="Required"
                  type="text"
                />
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`primaryChildren.${index}.status`}
                  label="This child is (select all that apply):"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "emancipated", label: "Emancipated" },
                    { value: "married", label: "Married" },
                    { value: "military", label: "Military" },
                    { value: "none", label: "None of the above" },
                  ]}
                />
                {sessionStorage.getItem(`primaryChildren.${index}.status`) !==
                  "none" &&
                  sessionStorage.getItem(`primaryChildren.${index}.status`) !==
                    null && (
                    <Box
                      fontSize="lg"
                      bg={colorMode === "dark" ? "gray.700" : "gray.200"}
                      p={4}
                    >
                      Sorry, but this child does not qualify and will not be
                      counted in the child support calculations. Continue to the
                      next step.
                    </Box>
                  )}
                {sessionStorage.getItem(`primaryChildren.${index}.status`) ===
                  "none" && (
                  <FieldRadio
                    name={`primaryChildren.${index}.disabled`}
                    label="Does this child have a disability?"
                    required="Required"
                    index={index}
                    updateState={updateState}
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                  />
                )}
              </Box>
            </>
          </SectionWrapper>
        </FormizStep>
      ))}
    </>
  )
}
