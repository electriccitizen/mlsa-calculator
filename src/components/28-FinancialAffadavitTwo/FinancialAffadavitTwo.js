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
  let updateState = (name, value, index) => {
    name === "FinancialAffadavitTwo.workReason" &&
      sessionStorage.setItem("FinancialAffadavitTwo.workReason", value)
    name === "FinancialAffadavitTwo.workersComp" &&
      sessionStorage.setItem("FinancialAffadavitTwo.workersComp", value)
    name === "FinancialAffadavitTwo.seekingComp" &&
      sessionStorage.setItem("FinancialAffadavitTwo.seekingComp", value)
    name === "FinancialAffadavitTwo.unemployment" &&
      sessionStorage.setItem("FinancialAffadavitTwo.unemployment", value)
    name === "FinancialAffadavitTwo.employmentEfforts" &&
      sessionStorage.setItem("FinancialAffadavitTwo.employmentEfforts", value)
    name === "FinancialAffadavitTwo.publicAssistance" &&
      sessionStorage.setItem("FinancialAffadavitTwo.publicAssistance", value)
  }
  let workReason = ""
  let workersComp = ""
  let seekingComp = ""
  let unemployment = ""
  let employmentEfforts = ""
  let publicAssistance = ""
  useEffect(() => {
    // Update the document title using the browser API
    workReason = sessionStorage.getItem("FinancialAffadavitTwo.workReason")
    workersComp = sessionStorage.getItem("FinancialAffadavitTwo.workersComp")
    seekingComp = sessionStorage.getItem("FinancialAffadavitTwo.seekingComp")
    unemployment = sessionStorage.getItem("FinancialAffadavitTwo.unemployment")
    employmentEfforts = sessionStorage.getItem(
      "FinancialAffadavitTwo.employmentEfforts"
    )
    publicAssistance = sessionStorage.getItem(
      "FinancialAffadavitTwo.publicAssistance"
    )
  })

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
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {workReason === "yes" && (
            <FieldInput
              name={`FinancialAffadavitTwo.workReasonDesc`}
              label="Please explain."
              type="text"
              isRequired={true}
            />
          )}
          <FieldRadio
            name={`FinancialAffadavitTwo.workersComp`}
            label="Do you receive workers' compensation or occupational disease benefits?"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {workersComp === "yes" && (
            <>
              <FieldInput
                name={`FinancialAffadavitTwo.workersCompPayment`}
                label="Who pays the benefits?"
                type="text"
                isRequired={true}
                fieldWidth={"30%"}
              />
              <FieldInput
                name={`FinancialAffadavitTwo.workersCompClaimNum`}
                label="What is your claim number?"
                type="text"
                isRequired={true}
                fieldWidth={"30%"}
              />
            </>
          )}
          <FieldRadio
            name={`FinancialAffadavitTwo.seekingComp`}
            label="Are you currently seeking workers' compensation or occupational disease benefits?"
            required="Required"
            updateState={updateState}
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
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {unemployment === "yes" && (
            <FieldInput
              name={`FinancialAffadavitTwo.unemploymentDesc`}
              label="What state or agency is paying the unemployment benefits?"
              type="text"
              isRequired={true}
              fieldWidth={"30%"}
            />
          )}
          <FieldRadio
            name={`FinancialAffadavitTwo.employmentEfforts`}
            label="If unemployed or employed part-time, have you made any efforts to find full-time employment?"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {employmentEfforts === "yes" && (
            <FieldInput
              name={`FinancialAffadavitTwo.employmentEffortsDesc`}
              label="If yes, describe your job search."
              type="text"
              isRequired={true}
            />
          )}
          {employmentEfforts === "no" && (
            <FieldInput
              name={`FinancialAffadavitTwo.employmentEffortsDesc`}
              label="If not, why not?"
              type="text"
              isRequired={true}
            />
          )}
          <FieldRadio
            name={`FinancialAffadavitTwo.publicAssistance`}
            label="Did you receive any Public Assistance benefits in the last 12 months?"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {publicAssistance === "yes" && (
            <FieldMoneyInput
              name={`FinancialAffadavitTwo.publicAssistanceAmt`}
              label="Public assistance - last 12 months"
              type="text"
              isRequired={true}
              fieldWidth={"30%"}
            />
          )}
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
