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

  let otherExpenses
  let courtOrder
  let expectedChanges
  let comments

  let updateState = (name, value, index) => {
    name === "FinancialAffadavitThree.otherExpenses" &&
      sessionStorage.setItem("FinancialAffadavitThree.otherExpenses", value)
    name === "FinancialAffadavitThree.courtOrder" &&
      sessionStorage.setItem("FinancialAffadavitThree.courtOrder", value)
    name === "FinancialAffadavitThree.expectedChanges" &&
      sessionStorage.setItem("FinancialAffadavitThree.expectedChanges", value)
    name === "FinancialAffadavitThree.comments" &&
      sessionStorage.setItem("FinancialAffadavitThree.comments", value)
    otherExpenses = sessionStorage.getItem(
      "FinancialAffadavitThree.otherExpenses"
    )
    courtOrder = sessionStorage.getItem("FinancialAffadavitThree.courtOrder")
    expectedChanges = sessionStorage.getItem(
      "FinancialAffadavitThree.expectedChanges"
    )
    comments = sessionStorage.getItem("FinancialAffadavitThree.comments")
  }

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
          {otherExpenses === "yes" && (
            <FieldInput
              name={`FinancialAffadavitThree.otherExpensesTotal`}
              label="List the other employment-related expenses here."
              type="text"
              isRequired={true}
            />
          )}
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
          {expectedChanges === "yes" && (
            <FieldInput
              name={`FinancialAffadavitThree.expectedChangesDesc`}
              label="Describe those changes."
              type="text"
              isRequired={true}
            />
          )}
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
          {comments === "yes" && (
            <FieldInput
              name={`FinancialAffadavitThree.commentsDesc`}
              label="Enter the additional comments."
              type="text"
              isRequired={true}
            />
          )}
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
