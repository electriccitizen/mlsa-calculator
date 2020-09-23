import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { FieldSelect } from "../../Fields/FieldSelect"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldDate } from "../../Fields/FieldDate"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const CurrentJobSecondary = d => {
  const form = useForm({ subscribe: { fields: ["OtherParent.fname"] } })
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const otherParent = form.values.OtherParent.fname
    ? form.values.OtherParent.fname
    : "other parent"

  let GrossAmountLabel = ""
  switch (state["EmploymentSecondary.payment"]) {
    case "salary":
      GrossAmountLabel = "Gross amount (amount before taxes) paid per paycheck"
      break
    case "hourly":
      GrossAmountLabel = "Gross amount (amount before taxes) paid per hour"
      break
    case "commission":
      GrossAmountLabel = "Gross amount (amount before taxes) paid per paycheck"
      break
    default:
      GrossAmountLabel = "Gross amount (amount before taxes) "
  }

  return (
    <FormizStep
      label="Employment status (other parent)"
      name="CurrentJobSecondary"
      order={17500}
    >
      <SectionHeader header={`Employment information for ` + otherParent} />
      <FieldRadio
        name="EmploymentSecondary.status"
        placeholder="None"
        required="Required"
        label={`Does ` + otherParent + ` have a job?`}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {state["EmploymentSecondary.status"] === "yes" && (
        <FieldRadio
          name="EmploymentSecondary.type"
          placeholder="None"
          required="Required"
          label={"What type of job is this?"}
          updateState={updateState}
          options={[
            { value: "permanent", label: "Permanent" },
            { value: "temporary", label: "Temporary" },
            { value: "seasonal", label: "Seasonal" },
          ]}
        />
      )}
      {state["EmploymentSecondary.type"] === "temporary" && (
        <FieldDate
          name={`CurrentJobEnd`}
          label="When will this job end? (MM/DD/YYYY) (Please note, if your job is expected to end next year or later, please enter December 31 and the current year into the box. Entering a date that is later than December 31 of the current year may result in a miscalculation). "
          required="Required"
          type="text"
        />
      )}
      {state["EmploymentSecondary.type"] &&
        state["EmploymentSecondary.status"] === "yes" && (
          <SectionHeader header={`Job details`} />
        )}

      {state["EmploymentSecondary.type"] === "parttime" && (
        <FieldInput
          name={`EmploymentSecondary.weeksPerYear`}
          label="How many weeks per year do you work?"
          required="Required"
          type="text"
          fieldWidth={"25%"}
        />
      )}
      {state["EmploymentSecondary.type"] &&
        state["EmploymentSecondary.status"] === "yes" && (
          <FieldRadio
            name="EmploymentSecondary.payment"
            placeholder="None"
            required="Required"
            label={"Does this job pay hourly wages, salary, or commission?"}
            updateState={updateState}
            options={[
              { value: "hourly", label: "Hourly" },
              { value: "salary", label: "Salary" },
              { value: "commission", label: "Commission" },
            ]}
          />
        )}
      {state["EmploymentSecondary.type"] &&
        state["EmploymentSecondary.status"] === "yes" && (
          <>
            <FieldInput
              name={`EmploymentSecondary.grossAmount`}
              label={GrossAmountLabel}
              required="Required"
              type="text"
              fieldWidth={"25%"}
            />
            {state["EmploymentSecondary.payment"] === "hourly" && (
              <FieldInput
                name={`EmploymentSecondary.hoursPerWeek`}
                label="Hours worked per week"
                required="Required"
                type="text"
                fieldWidth={"25%"}
              />
            )}
            <FieldInput
              name={`EmploymentSecondary.weeksPerYear`}
              label="Weeks worked per year"
              required="Required"
              type="text"
              fieldWidth={"25%"}
            />
          </>
        )}
      {(state["EmploymentSecondary.payment"] === "salary" ||
        state["EmploymentSecondary.payment"] === "commission") && (
        <FieldSelect
          name="EmploymentSecondary.schedule"
          label="Paid how often?"
          placeholder="Select option..."
          required="Required"
          fieldWidth={"25%"}
          options={[
            { value: "weekly", label: "Once per week" },
            { value: "biweekly", label: "Every two weeks" },
            { value: "bimonthly", label: "Twice a month" },
            { value: "monthly", label: "Once per month" },
            { value: "yearly", label: "Yearly" },
          ]}
        />
      )}
      {state["EmploymentSecondary.type"] && (
        <FieldRadio
          name="EmploymentSecondary.otherJobs"
          placeholder="None"
          required="Required"
          label={
            `Do you have any additional jobs to enter for ` + otherParent + `?`
          }
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      )}

      {state["EmploymentSecondary.otherJobs"] === "yes" && (
        <FieldRadio
          name="NumOtherSecondaryJobs"
          required="Required"
          forceStack={true}
          label={"How many additional jobs would you like to enter?"}
          options={[
            { value: "1", label: "One" },
            { value: "2", label: "Two" },
            { value: "3", label: "Three" },
            { value: "4", label: "Four" },
          ]}
        />
      )}
      <AdministrativeRules
        rules={[105, 106, 108]}
        explanation={
          "For definitions and more information, click on the links below:"
        }
      />
    </FormizStep>
  )
}
