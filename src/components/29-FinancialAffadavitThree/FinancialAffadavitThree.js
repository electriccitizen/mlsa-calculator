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
} from "@chakra-ui/core"
import { DeleteIcon } from "@chakra-ui/icons"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const FinancialAffadavitThree = number => {
  const form = useForm()
  let updateState = (name, value, index) => {
    name === "ChildExpenses." + index + ".housing" &&
      sessionStorage.setItem("ChildExpenses." + index + ".housing", value)
  }
  const { colorMode } = useColorMode()

  return (
    <FormizStep name="FinancialAffadavitThree" order={29000}>
      <>
        <SectionWrapper>
          <SectionHeader header={`Financial Affidavit Information, Part 3`} />
          <FieldRadio
            name={`FinancialAffadavitThree.otherExpenses`}
            label="Did you incur other employment-related expenses not listed anywhere else in this interview?"
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FieldRadio
            name={`FinancialAffadavitThree.courtOrder`}
            label="Has a court ordered you to make payments for restitution, damages, etc.?"
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FieldRadio
            name={`FinancialAffadavitThree.expectedChanges`}
            label="Do you expect any changes in your or your children's circumstances during the next 18 months which would affect the calculation of child support?"
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FieldRadio
            name={`FinancialAffadavitThree.comments`}
            label="Do you want to make any additional comments?"
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
