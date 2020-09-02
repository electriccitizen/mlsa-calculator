import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import { AddPlaceholder } from "../AddPlaceholder"
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
  Text,
  Stack,
  useColorMode,
  SimpleGrid,
} from "@chakra-ui/core"
import { DeleteIcon } from "@chakra-ui/icons"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const Schools = number => {
  const form = useForm()
  let updateState = (name, value, index) => {
    name === "Schools.level" && sessionStorage.setItem("Schools.level", value)
    name === "Schools.current" &&
      sessionStorage.setItem("Schools.current", value)
    name === "Schools.postSecondary" &&
      sessionStorage.setItem("Schools.postSecondary", value)

    console.log(sessionStorage.getItem("Schools.postSecondary"))


  }
  const { colorMode } = useColorMode()
  const schoolLevel = sessionStorage.getItem("Schools.level")
  const schoolCurrent = sessionStorage.getItem("Schools.current")
  const schoolPostSecondary = sessionStorage.getItem("Schools.postSecondary")

  return (
    <FormizStep name="Schools" order={26000}>
      <>
        <SectionWrapper>
          <SectionHeader header={`Schools`} />
          <FieldRadio
            name={`Schools.level`}
            label="Did you finish high school?"
            placeholder="Select option..."
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {schoolLevel === "no" && (
            <FieldInput
              name={`School.lastYearCompleted`}
              label="List the highest grade you completed."
              type="text"
              isRequired={true}
              fieldWidth={"25%"}
            />
          )}
          {schoolLevel === "yes" && (
            <FieldRadio
              name={`Schools.postSecondary`}
              label="Did you attend any other schools after high school? This includes training school, trade school, college or university."
              placeholder="Select option..."
              required="Required"
              updateState={updateState}
              keepValue
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          )}

          <FieldRadio
            name={`Schools.current`}
            label="Are you currently a student?"
            placeholder="Select option..."
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {schoolCurrent === "yes" && (
            <FieldDate
              name={`Schools.current.endDate`}
              label="What is your expected date of graduation? If you are not sure of the exact date, enter an approximate date. (MM/DD/YYYY)"
              required="Required"
              placeholder="MM/DD/YYYY"
              m="0"
            />
          )}
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
