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

export const FinancialAffadavitTwo = number => {
  const form = useForm()
  let updateState = (name, value, index) => {
    name === "ChildExpenses." + index + ".housing" &&
      sessionStorage.setItem("ChildExpenses." + index + ".housing", value)
  }
  const { colorMode } = useColorMode()

  return (
    <FormizStep name="FinancialAffadavitTwo" order={28000}>
      <>
        <SectionWrapper>
          <SectionHeader header={`Financial Affidavit Information, Part 2`} />
          <FieldRadio
            name={`FinancialAffadavitTwo.workReason`}
            label="Is there any reason, such as disability, that prevents you from being able to work full-time or from being able to earn income at the same level you have in the past?"
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FieldRadio
            name={`FinancialAffadavitTwo.workersComp`}
            label="Do you receive workers' compensation or occupational disease benefits?"
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FieldRadio
            name={`FinancialAffadavitTwo.seekingComp`}
            label="Are you currently seeking workers' compensation or occupational disease benefits?"
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FieldRadio
            name={`FinancialAffadavitTwo.unemployment`}
            label="Are you currently receiving unemployment benefits?"
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FieldRadio
            name={`FinancialAffadavitTwo.employmentEfforts`}
            label="If unemployed or employed part-time, have you made any efforts to find full-time employment?"
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FieldRadio
            name={`FinancialAffadavitTwo.publicAssistance`}
            label="Did you receive any Public Assistance benefits in the last 12 months?"
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
