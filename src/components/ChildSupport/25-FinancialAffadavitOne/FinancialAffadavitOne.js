import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { FieldSelect } from "../../Fields/FieldSelect"
import { SectionHeader } from "../../Utils/SectionHeader"

export const FinancialAffadavitOne = () => {
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const taxStatus = state["FinancialAffadavitOne.taxStatus"]
  const daycareStatus = state["FinancialAffadavitOne.daycare"]
  const supportStatus = state["FinancialAffadavitOne.support"]

  return (
    <FormizStep
      label="Financial Affidavit, Part 1"
      name="FinancialAffadavitOne"
      order={25000}
    >
      <SectionHeader header={`Financial Affidavit Information, Part 1`} />
      <FieldSelect
        name={`FinancialAffadavitOne.taxStatus`}
        label="What is your tax filing status?"
        placeholder="Select option..."
        required="Required"
        fieldWidth={"25%"}
        updateState={updateState}
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
          fieldWidth={"25%"}
        />
      )}

      <FieldRadio
        name={`FinancialAffadavitOne.support`}
        label="Did you receive reimbursement for other child support expenses in the last 12 months?"
        placeholder="Select option..."
        required="Required"
        updateState={updateState}
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
          fieldWidth={"25%"}
        />
      )}
    </FormizStep>
  )
}
