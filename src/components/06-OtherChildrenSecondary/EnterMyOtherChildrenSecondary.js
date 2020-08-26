import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
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
  useColorMode,
} from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const EnterMyOtherChildrenSecondary = number => {
  const form = useForm()
  const [show, setShow] = React.useState(false)
  const numChildrenSecondary = sessionStorage.getItem("numChildrenSecondary")

  let updateState = (name, value, index) => {
    name === "otherChildrenSecondary." + index + ".housing" &&
      sessionStorage.setItem(
        "otherChildrenSecondary." + index + ".housing",
        value
      )
    name === "otherChildrenSecondary." + index + ".support" &&
      sessionStorage.setItem(
        "otherChildrenSecondary." + index + ".support",
        value
      )
    name === "otherChildrenSecondary." + index + ".depcare" &&
      sessionStorage.setItem(
        "otherChildrenSecondary." + index + ".depcare",
        value
      )
    name === "otherChildrenSecondary." + index + ".medical" &&
      sessionStorage.setItem(
        "otherChildrenSecondary." + index + ".medical",
        value
      )
    name === "otherChildrenSecondary." + index + ".status" &&
      sessionStorage.setItem(
        "otherChildrenSecondary." + index + ".status",
        value
      )
  }
  const housing = sessionStorage.getItem("otherChildrenSecondary.housing")
  const { colorMode } = useColorMode()
  const otherParent = form.values.otherParent
    ? form.values.otherParent.fname
    : ""

  return (
    <>
      {Array.apply(null, { length: numChildrenSecondary }).map((e, index) => (
        <FormizStep
          key={index}
          name={`EnterMyOtherChildrenSecondary` + index}
          order={6500 + index}
        >
          <SectionWrapper>
            <Box mb="8">
              <SectionHeader
                header={
                  `Enter the details for ` +
                  otherParent +
                  `'s other children (` +
                  (index + 1) +
                  ` of ` +
                  numChildrenSecondary +
                  `)`
                }
              />
            </Box>
            <>
              <Stack isInline spacing="4" mb="6" rounded="md" p="2">
                */}
                <Box flex="1">
                  <FieldInput
                    name={`otherChildrenSecondary.${index}.fname`}
                    label="First name"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`otherChildrenSecondary.${index}.mname`}
                    label="Middle"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`otherChildrenSecondary.${index}.lname`}
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
                    name={`otherChildrenSecondary.${index}.dob`}
                    label="Date of birth"
                    required="Required"
                    type="text"
                  />
                </Box>
                <FieldRadio
                  name={`otherChildrenSecondary.${index}.housing`}
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
              {housing === "other" && (
                <Box mb="8" flex="1">
                  <FieldInput
                    name={`otherChildrenSecondary.${index}.otherHousing`}
                    label="Who does this child live with?"
                    type="text"
                    placeholder=""
                    m="0"
                  />
                </Box>
              )}
              <Box mb="8" flex="1">
                <FieldMoneyInput
                  name={`otherChildrenSecondary.${index}.benefits`}
                  label="Dependent's benefits received for this child per year, if any. Examples: Social Security, VA, etc."
                  type="text"
                  placeholder="Enter amount"
                  m="0"
                />
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`otherChildrenSecondary.${index}.support`}
                  label="Are you ordered to pay support for this child?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {sessionStorage.getItem(
                  "otherChildrenSecondary." + index + ".support"
                ) === "yes" && (
                  <FieldMoneyInput
                    name={`otherChildrenSecondary.${index}.childSupportAmount`}
                    label="Monthly child support you are ordered to pay for this child."
                    type="text"
                    placeholder="Enter amount"
                    m="0"
                  />
                )}
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`otherChildrenSecondary.${index}.depcare`}
                  label="Do you have any dependent care expense for this child?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {sessionStorage.getItem(
                  "otherChildrenSecondary." + index + ".depcare"
                ) === "yes" && (
                  <FieldMoneyInput
                    name={`otherChildrenSecondary.${index}.depcareAmount`}
                    label="Enter 50% of the yearly dependent care expense for this child."
                    type="text"
                    placeholder="Enter amount"
                    m="0"
                  />
                )}
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`otherChildrenSecondary.${index}.medical`}
                  label="Do you have any extraordinary medical expenses for this child which were not reimbursed?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {sessionStorage.getItem(
                  "otherChildrenSecondary." + index + ".medical"
                ) === "yes" && (
                  <FieldMoneyInput
                    name={`otherChildrenSecondary.${index}.medicalAmount`}
                    label="Enter 50% of the yearly extraordinary medical expense for this child."
                    type="text"
                    placeholder="Enter amount"
                    m="0"
                  />
                )}
                <Box mt="4" mb="8" flex="1">
                <FieldRadio
                  name={`otherChildrenSecondary.${index}.otherParent`}
                  label="Is this child's other parent still living?"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                </Box>
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`otherChildrenSecondary.${index}.status`}
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
                {sessionStorage.getItem(
                  `otherChildrenSecondary.${index}.status`
                ) !== "none" &&
                  sessionStorage.getItem(
                    `otherChildrenSecondary.${index}.status`
                  ) !== null && (
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
                {sessionStorage.getItem(
                  `otherChildrenSecondary.${index}.status`
                ) === "none" && (
                  <FieldRadio
                    name={`otherChildrenSecondary.${index}.disabled`}
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
