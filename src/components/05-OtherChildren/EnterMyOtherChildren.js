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
  Stack, useColorMode,
} from '@chakra-ui/core'
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const EnterMyOtherChildren = number => {
  const form = useForm()
  const [show, setShow] = React.useState(false)
  const numChildrenOther = sessionStorage.getItem("numChildrenOther")
  const handleToggle = () => setShow(!show)

  let updateState = (name, value, index) => {
    name === "otherChildren." + index + ".housing" &&
    sessionStorage.setItem("otherChildren." + index + ".housing", value)
    name === "otherChildren." + index + ".support" &&
    sessionStorage.setItem("otherChildren." + index + ".support", value)
    name === "otherChildren." + index + ".depcare" &&
    sessionStorage.setItem("otherChildren." + index + ".depcare", value)
    name === "otherChildren." + index + ".medical" &&
    sessionStorage.setItem("otherChildren." + index + ".medical", value)
    name === "otherChildren." + index + ".status" &&
    sessionStorage.setItem("otherChildren." + index + ".status", value)
  }
  const housing = sessionStorage.getItem("otherChildren.housing")
  const { colorMode } = useColorMode()
  let depcare
  let order
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
                    name={`otherChildren.${index}.fname`}
                    label="First name"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`otherChildren.${index}.mname`}
                    label="Middle"
                    type="text"
                    updateState={updateState}
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`otherChildren.${index}.lname`}
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
                    name={`otherChildren.${index}.dob`}
                    label="Date of birth"
                    required="Required"
                    type="text"
                  />
                </Box>
                <FieldRadio
                  name={`otherChildren.${index}.housing`}
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
                    name={`otherChildren.${index}.otherHousing`}
                    label="Who does this child live with?"
                    type="text"
                    placeholder=""
                    m="0"
                  />
                </Box>
              )}
              <Box mb="8" flex="1">
                <FieldMoneyInput
                  name={`otherChildren.${index}.benefits`}
                  label="Dependent's benefits received for this child per year, if any. Examples: Social Security, VA, etc."
                  type="text"
                  placeholder="Enter amount"
                  m="0"
                />
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`otherChildren.${index}.support`}
                  label="Are you ordered to pay support for this child?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {sessionStorage.getItem("otherChildren." + index + ".support") === "yes" && (
                  <FieldMoneyInput
                    name={`otherChildren.${index}.childSupportAmount`}
                    label="Monthly child support you are ordered to pay for this child."
                    type="text"
                    placeholder="Enter amount"
                    m="0"
                  />
                )}
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`otherChildren.${index}.depcare`}
                  label="Do you have any dependent care expense for this child?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {sessionStorage.getItem("otherChildren." + index + ".depcare") === "yes" && (
                  <FieldMoneyInput
                    name={`otherChildren.${index}.depcareAmount`}
                    label="Enter 50% of the yearly dependent care expense for this child."
                    type="text"
                    placeholder="Enter amount"
                    m="0"
                  />
                )}
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`otherChildren.${index}.medical`}
                  label="Do you have any extraordinary medical expenses for this child which were not reimbursed?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {sessionStorage.getItem("otherChildren." + index + ".medical") === "yes" && (
                  <FieldMoneyInput
                    name={`otherChildren.${index}.medicalAmount`}
                    label="Enter 50% of the yearly extraordinary medical expense for this child."
                    type="text"
                    placeholder="Enter amount"
                    m="0"
                  />
                )}
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name={`otherChildren.${index}.status`}
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
                {sessionStorage.getItem(`otherChildren.${index}.status`) !==
                "none" &&
                sessionStorage.getItem(`otherChildren.${index}.status`) !==
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
                {sessionStorage.getItem(`otherChildren.${index}.status`) ===
                "none" && (
                  <FieldRadio
                    name={`otherChildren.${index}.disabled`}
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
