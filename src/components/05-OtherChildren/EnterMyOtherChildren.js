import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import { Box, Stack, useColorMode } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const EnterMyOtherChildren = () => {
  const form = useForm({ subscribe: { fields: ["NumOtherChildren"] } })
  const numChildrenOther = form.values.NumOtherChildren
  const { colorMode } = useColorMode()
  const [state, setState] = useState({})
  const updateState = (name, value, index) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  return (
    <>
      {Array.apply(null, { length: numChildrenOther }).map((e, index) => (
        <FormizStep
          key={index}
          name={`EnterMyOtherChildren` + index}
          order={5500 + index}
        >
          <SectionWrapper>
            <Box mb="8">
              <SectionHeader
                header={
                  `Enter the details for your other children (` +
                  (index + 1) +
                  ` of ` +
                  numChildrenOther +
                  `)`
                }
              />
            </Box>
            <>
              <Stack isInline spacing="4" mb="6" rounded="md" p="2">
                */}
                <Box flex="1">
                  <FieldInput
                    name={`OtherChildren.${index}.fname`}
                    label="First name"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`OtherChildren.${index}.mname`}
                    label="Middle"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`OtherChildren.${index}.lname`}
                    label="Last name"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
              </Stack>
              <Box mb="8" flex="1">
                <Box flex="1">
                  <FieldDate
                    name={`OtherChildren.${index}.dob`}
                    label="Date of birth"
                    required="Required"
                    type="text"
                  />
                </Box>
                <FieldRadio
                  name={`OtherChildren.${index}.housing`}
                  label="Who does this child live with?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "me", label: "Me" },
                    {
                      value: "otherparent",
                      label: "The child's other parent",
                    },
                    { value: "other", label: "Someone else" },
                  ]}
                />
              </Box>
              {state[`OtherChildren.${index}.housing`] === "other" && (
                <Box mb="8" flex="1">
                  <FieldInput
                    name={`OtherChildren.${index}.otherHousing`}
                    label="Who does this child live with?"
                    type="text"
                    placeholder=""
                    m="0"
                  />
                </Box>
              )}
              <Box mb="8" flex="1">
                <FieldMoneyInput
                  name={`OtherChildren.${index}.benefits`}
                  label="Dependent's benefits received for this child per year, if any. Examples: Social Security, VA, etc."
                  type="text"
                  placeholder="Enter amount"
                  m="0"
                />
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`OtherChildren.${index}.support`}
                  label="Are you ordered to pay support for this child?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {state[`OtherChildren.${index}.support`] === "yes" && (
                  <FieldMoneyInput
                    name={`OtherChildren.${index}.childSupportAmount`}
                    label="Monthly child support you are ordered to pay for this child."
                    type="text"
                    placeholder="Enter amount"
                    m="0"
                  />
                )}
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`OtherChildren.${index}.depcare`}
                  label="Do you have any dependent care expense for this child?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {state[`OtherChildren.${index}.depcare`] === "yes" && (
                  <FieldMoneyInput
                    name={`OtherChildren.${index}.depcareAmount`}
                    label="Enter 50% of the yearly dependent care expense for this child."
                    type="text"
                    placeholder="Enter amount"
                    m="0"
                  />
                )}
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`OtherChildren.${index}.medical`}
                  label="Do you have any extraordinary medical expenses for this child which were not reimbursed?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {state[`OtherChildren.${index}.medical`] === "yes" && (
                  <FieldMoneyInput
                    name={`OtherChildren.${index}.medicalAmount`}
                    label="Enter 50% of the yearly extraordinary medical expense for this child."
                    type="text"
                    placeholder="Enter amount"
                    m="0"
                  />
                )}
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`OtherChildren.${index}.status`}
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
                {state[`OtherChildren.${index}.status`] &&
                  state[`OtherChildren.${index}.status`] !== "none" && (
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
                {state[`OtherChildren.${index}.status`] === "none" && (
                  <FieldRadio
                    name={`OtherChildren.${index}.disabled`}
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
