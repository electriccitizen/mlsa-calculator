import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"

export const FinancialAffadavitThree = () => {
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  let otherExpenses = state["FinancialAffadavitThree.otherExpenses"]
  let expectedChanges = state["FinancialAffadavitThree.expectedChanges"]
  let comments = state["FinancialAffadavitThree.comments"]

  return (
    <FormizStep
      label={"Financial Affidavit Information, Part 3"}
      name="FinancialAffadavitThree"
      order={29000}
    >
      <SectionHeader header={`Financial Affidavit Information, Part 3`} />
      <FieldRadio
        name={`FinancialAffadavitThree.otherExpenses`}
        label="Did you incur other employment-related expenses not listed anywhere else in this interview?"
        required="Required"
        updateState={updateState}
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
    </FormizStep>
  )
}
