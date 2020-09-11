import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldDate } from "../../Fields/FieldDate"
import { FieldRadio } from "../../Fields/FieldRadio"
import { Box, Stack } from "@chakra-ui/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"

export const EnterChildren = () => {
  const form = useForm({ subscribe: { fields: ["NumPrimaryChildren"] } })
  const numChildren = form.values.NumPrimaryChildren

  const otherParent = form.values.otherParent
    ? form.values.otherParent.fname
    : ""

  const [state, setState] = useState({})

  const updateState = (name, value, index) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  return (
    <>
      {Array.apply(null, { length: numChildren }).map((e, index) => (
        <FormizStep
          key={index}
          name={`EnterOtherChildren` + index}
          order={4000 + index}
          label={"Child " + index}
        >
          <SectionWrapper>
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
            <>
              <Stack isInline spacing="4" mb="6" rounded="md" p="2">
                <Box flex="1">
                  <FieldInput
                    name={`PrimaryChildren.${index}.fname`}
                    label="First name"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`PrimaryChildren.${index}.mname`}
                    label="Middle"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`PrimaryChildren.${index}.lname`}
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
                  name={`PrimaryChildren.${index}.dob`}
                  label="Date of birth"
                  required="Required"
                  type="text"
                />
              </Box>
              <FieldRadio
                name={`PrimaryChildren.${index}.status`}
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

              {state[`PrimaryChildren.${index}.status`] &&
                state[`PrimaryChildren.${index}.status`] !== "none" && (
                  <Box fontSize="lg" bg={"gray.200"} p={4}>
                    Sorry, but this child does not qualify and will not be
                    counted in the child support calculations. Continue to the
                    next step.
                  </Box>
                )}
              {state[`PrimaryChildren.${index}.status`] === "none" && (
                <FieldRadio
                  name={`PrimaryChildren.${index}.disabled`}
                  label="Does this child have a disability?"
                  required="Required"
                  index={index}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              )}
            </>
          </SectionWrapper>
        </FormizStep>
      ))}
    </>
  )
}
