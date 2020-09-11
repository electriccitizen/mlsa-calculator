import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { FieldSelect } from "../../Fields/FieldSelect"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddressField } from "../02-BasicInformation/AddressField"
import { FieldDate } from "../../Fields/FieldDate"
export const CurrentJob = d => {
  const form = useForm({ subscribe: { fields: ["EmploymentStatus"] } })
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  let GrossAmountLabel = ""
  switch (state["CurrentJobPayment"]) {
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
      GrossAmountLabel = null
  }

  return (
    <>
      {form.values.EmploymentStatus === "yes" && (
        <FormizStep label="Current Job" name="CurrentJob" order={8000}>
          <>
            <SectionWrapper>
              <SectionHeader
                header={`Enter information about your current job`}
              />
              <FieldRadio
                name="CurrentJobType"
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
              {state["CurrentJobType"] === "permanent" && (
                <FieldRadio
                  name="CurrentJobStatus"
                  placeholder="None"
                  required="Required"
                  label={"Is this job full time or part time?"}
                  updateState={updateState}
                  options={[
                    { value: "fulltime", label: "Full time" },
                    { value: "parttime", label: "Part time" },
                  ]}
                />
              )}
              <FieldDate
                name={`CurrentJobStart`}
                label="When did you start this job? If you are not sure of the exact date, enter an approximate date. (MM/DD/YYYY)"
                required="Required"
                type="text"
              />
              {state["CurrentJobType"] === "temporary" && (
                <FieldDate
                  name={`CurrentJobEnd`}
                  label="When will this job end? (MM/DD/YYYY) (Please note, if your job is expected to end next year or later, please enter December 31 and the current year into the box. Entering a date that is later than December 31 of the current year may result in a miscalculation). "
                  required="Required"
                  type="text"
                />
              )}

              {state["CurrentJobType"] && (
                <SectionHeader header={`Wage information`} />
              )}

              {state["CurrentJobStatus"] === "parttime" && (
                <FieldInput
                  name={`CurrentJobWeeksPerYear`}
                  label="How many weeks per year do you work?"
                  required="Required"
                  type="text"
                  updateState={updateState}
                  mb="4"
                  fieldwidth={"25%"}
                />
              )}
              {state["CurrentJobType"] && (
                <FieldRadio
                  name="CurrentJobPayment"
                  placeholder="None"
                  required="Required"
                  label={"Are you paid hourly wages, salary, or commission?"}
                  updateState={updateState}
                  options={[
                    { value: "hourly", label: "Hourly" },
                    { value: "salary", label: "Salary" },
                    { value: "commission", label: "Commission" },
                  ]}
                />
              )}
              {state["CurrentJobPayment"] && (
                <>
                  <FieldInput
                    name={`CurrentJobGrossAmount`}
                    label={GrossAmountLabel}
                    required="Required"
                    type="text"
                    updateState={updateState}
                    fieldwidth={"25%"}
                    m="0"
                  />
                  <FieldInput
                    name={`CurrentJobHoursPerWeek`}
                    label="Hours worked per week"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    fieldwidth={"25%"}
                  />
                  <FieldInput
                    name={`CurrentJobWeeksPerYear`}
                    label="Weeks worked per year"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    fieldwidth={"25%"}
                  />
                  <FieldSelect
                    name="CurrentJobPaySchedule"
                    label="Paid how often?"
                    placeholder="Select option..."
                    required="Required"
                    fieldwidth={"25%"}
                    updateState={updateState}
                    options={[
                      { value: "weekly", label: "Once per week" },
                      { value: "biweekly", label: "Every two weeks" },
                      { value: "bimonthly", label: "Twice a month" },
                      { value: "monthly", label: "Once per month" },
                      { value: "yearly", label: "Yearly" },
                    ]}
                  />
                  <SectionHeader header={`Employer Address`} />
                  <AddressField
                    label={"Enter the street address for this employer:"}
                    name={"CurrentJobAddress"}
                  />
                </>
              )}
            </SectionWrapper>
          </>
        </FormizStep>
      )}
    </>
  )
}
