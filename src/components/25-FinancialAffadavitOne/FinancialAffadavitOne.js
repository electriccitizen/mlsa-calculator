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
import { FieldSelect } from "../Fields/FieldSelect"

export const FinancialAffadavitOne = number => {
  const form = useForm()
  let updateState = (name, value, index) => {
    name === "FinancialAffadavitOne.taxStatus" &&
      sessionStorage.setItem("FinancialAffadavitOne.taxStatus", value)
    name === "FinancialAffadavitOne.daycare" &&
      sessionStorage.setItem("FinancialAffadavitOne.daycare", value)
    name === "FinancialAffadavitOne.support" &&
      sessionStorage.setItem("FinancialAffadavitOne.support", value)
  }

  const taxStatus = sessionStorage.getItem("FinancialAffadavitOne.taxStatus")
  const daycareStatus = sessionStorage.getItem("FinancialAffadavitOne.daycare")
  const supportStatus = sessionStorage.getItem("FinancialAffadavitOne.support")

  const { colorMode } = useColorMode()

  return (
    <FormizStep name="FinancialAffadavitOne" order={25000}>
      <>
        <SectionWrapper>
          <SectionHeader header={`Financial Affidavit Information, Part 1`} />

          <FieldSelect
            name={`FinancialAffadavitOne.taxStatus`}
            label="What is your tax filing status?"
            placeholder="Select option..."
            required="Required"
            fieldWidth={"25%"}
            updateState={updateState}
            keepValue
            options={[
              { value: "single", label: "Single" },
              { value: "marriedjoint", label: "Married, filing jointly" },
              { value: "marriedsep", label: "Married, filing separately" },
              { value: "head", label: "Head of Household" },
            ]}
          />

          {(taxStatus === "marriedjoint" || taxStatus === "marriedsep") && (
            <FieldMoneyInput
              name={`FinancialAffadavitOne.spouseIncome`}
              label="What is your current spouse's annual income?"
              required="Required"
              type="text"
              updateState={updateState}
              fieldWidth={"25%"}
              mr={4}
            />
          )}

          <FieldInput
            name={`FinancialAffadavitOne.taxExemptions`}
            label='List the people you claim as tax exemptions. For example, "John C. Smith, Alice Smith, and Randall Smith."'
            type="text"
          />

          <FieldRadio
            name={`FinancialAffadavitOne.daycare`}
            label="Do you receive reimbursement for day care expenses?"
            placeholder="Select option..."
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {daycareStatus === "yes" && (
            <FieldMoneyInput
              name={`FinancialAffadavitOne.daycareExpense`}
              label="How much are you reimbursed for day care expenses each month?"
              required="Required"
              type="text"
              updateState={updateState}
              fieldWidth={"25%"}
              mr={4}
            />
          )}

          <FieldRadio
            name={`FinancialAffadavitOne.support`}
            label="Did you receive reimbursement for other child support expenses in the last 12 months?"
            placeholder="Select option..."
            required="Required"
            updateState={updateState}
            keepValue
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {supportStatus === "yes" && (
            <FieldMoneyInput
              name={`FinancialAffadavitOne.supportExpense`}
              label="How much were you reimbursed for other child support expenses?"
              required="Required"
              type="text"
              updateState={updateState}
              fieldWidth={"25%"}
              mr={4}
            />
          )}
        </SectionWrapper>
      </>
    </FormizStep>
  )
}