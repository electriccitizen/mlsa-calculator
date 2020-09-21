import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"

export const FinancialAffadavitTwo = () => {
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const workReason = state["FinancialAffadavitTwo.workReason"]
  const workersComp = state["FinancialAffadavitTwo.workersComp"]
  const unemployment = state["FinancialAffadavitTwo.unemployment"]
  const employmentEfforts = state["FinancialAffadavitTwo.employmentEfforts"]
  const publicAssistance = state["FinancialAffadavitTwo.publicAssistance"]

  return (
    <FormizStep
      label={`Financial Affidavit Information, Part 2`}
      name="FinancialAffadavitTwo"
      order={28000}
    >
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
    </FormizStep>
  )
}
