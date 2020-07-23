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

export const EnterMyOtherChildren = number => {
  const form = useForm()
  const [show, setShow] = React.useState(false)
  const numChildren = sessionStorage.getItem("OtherChildrenPrimaryNumber")
  const handleToggle = () => setShow(!show)

  const order = sessionStorage.getItem("order")
  const depcare = sessionStorage.getItem("depcare")

  let updateState = (name, value) => {
    name === "children.relationship" &&
      sessionStorage.setItem("relationship", JSON.stringify(value))
  }
  //numChildren === 0 && form.gotoStep("End")
  //form.goToStep("End")

  // let count = []
  // form.isStepValid === false && form.isStepSubmitted === true
  //   ? (count = [0, 1])
  //   : (count = [0])

  // console.log(form.isValid)
  // console.log(form.isStepSubmitted)
  // console.log(count)
  // set up a string to show ALL accordions in case of validation error
  //console.log(form.values.basic.fname)
  return (
    <>
      {Array.apply(null, { length: numChildren }).map((e, index) => (
        <FormizStep key={index} name={`foo` + index} order={5500 + index}>
          <SectionWrapper>
            <Box mb="8">
              <SectionHeader
                header={`Enter the details for Child ` + (index+1) + `:`}
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
              <Box mb="8" flex="1">
                <Box flex="1">
                  <FieldDate
                    name={`children.${numChildren}.dob`}
                    label="Date of birth"
                    required="Required"
                    type="text"
                  />
                </Box>
                <FieldRadio
                  name="other.children.primary.housing"
                  label="Who does this child live with?"
                  required="Required"
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
              <Box mb="8" flex="1">
                <FieldInput
                  name={`other.child.primary.${index}.benefits`}
                  label="Dependent's benefits received for this child per year, if any. Examples: Social Security, VA, etc."
                  type="text"
                  placeholder="$ Enter dollar amount"
                  m="0"
                />
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name="other.children.primary.support"
                  label="Are you ordered to pay support for this child?"
                  required="Required"
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {order === "yes" && (
                  <FieldInput
                    name={`other.children.primary.${index}.order`}
                    label="Monthly child support you are ordered to pay for this child"
                    type="text"
                    placeholder="Enter dollar amount $"
                    m="0"
                  />
                )}
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name="other.children.primary.depcare"
                  label="Do you have any dependent care expense for this child?"
                  required="Required"
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {depcare === "yes" && (
                  <FieldInput
                    name={`other.children.primary.${index}.depcare`}
                    label="Enter 50% of the yearly dependent care expense for this child."
                    type="text"
                    placeholder="Enter dollar amount $"
                    m="0"
                  />
                )}
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name="other.children.primary.med"
                  label="Do you have any extraordinary medical expenses for this child which were not reimbursed?"
                  required="Required"
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </Box>
              <Box mb="8" flex="1">
                <FieldRadio
                  name="children[${index}].status"
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
              </Box>


            </>
          </SectionWrapper>
        </FormizStep>
      ))}
    </>
  )
}
