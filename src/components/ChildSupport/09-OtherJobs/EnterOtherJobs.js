import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldDate } from "../../Fields/FieldDate"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldSelect } from "../../Fields/FieldSelect"
import { AddressField } from "../02-BasicInformation/AddressField"

export const EnterOtherJobs = () => {
  const form = useForm({ subscribe: { fields: ["OtherJobsNumber"] } })
  const numOtherJobs = form.values.OtherJobsNumber
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  let GrossAmountLabel = ""
  const switchLabel = index => {
    switch (state["OtherJob." + index + ".payment"]) {
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
        GrossAmountLabel = "foo"
    }
    return GrossAmountLabel
  }

  return (
    <>
      {Array.apply(null, { length: numOtherJobs }).map((e, index) => (
        <FormizStep
          key={index}
          name={`EnterOtherJobs` + index}
          order={9500 + index}
          label={`Job details (${index + 1} of ${numOtherJobs})`}
        >
          <SectionHeader
            header={
              `Enter details for your other jobs (` +
              (index + 1) +
              ` of ` +
              numOtherJobs +
              `)`
            }
          />
          <FieldRadio
            name={`OtherJob.${index}.current`}
            label="Is this a current job or a former job?"
            placeholder="None"
            required="Required"
            index={index}
            updateState={updateState}
            forceStack={true}
            options={[
              {
                value: "current",
                label: "I am currently working at this job",
              },
              { value: "former", label: "I no longer work at this job" },
            ]}
          />
          {state[`OtherJob.${index}.current`] && (
            <FieldRadio
              name={`OtherJob.${index}.type`}
              placeholder="None"
              required="Required"
              label={"What type of job is this?"}
              index={index}
              updateState={updateState}
              options={[
                { value: "permanent", label: "Permanent" },
                { value: "temporary", label: "Temporary" },
                { value: "seasonal", label: "Seasonal" },
              ]}
            />
          )}
          {state[`OtherJob.${index}.type`] === "permanent" && (
            <FieldRadio
              name={`OtherJob.${index}.status`}
              placeholder="None"
              required="Required"
              label={"Is this job full time or part time?"}
              index={index}
              updateState={updateState}
              options={[
                { value: "fulltime", label: "Full time" },
                { value: "parttime", label: "Part time" },
              ]}
            />
          )}

          {state[`OtherJob.${index}.type`] && (
            <FieldDate
              name={`OtherJob.${index}.start`}
              label="When did you start this job? If you are not sure of the exact date, enter an approximate date. (MM/DD/YYYY)"
              required="Required"
              type="text"
            />
          )}
          {state[`OtherJob.${index}.type`] === "temporary" && (
            <FieldDate
              name={`OtherJob.${index}.End`}
              label="When will this job end? (MM/DD/YYYY) (Please note, if your job is expected to end next year or later, please enter December 31 and the current year into the box. Entering a date that is later than December 31 of the current year may result in a miscalculation). "
              required="Required"
              type="text"
            />
          )}
          {state[`OtherJob.${index}.type`] && (
            <SectionHeader header={`Wage information`} />
          )}

          {state[`OtherJob.${index}.status`] === "parttime" && (
            <FieldInput
              name={`OtherJob.${index}.WeeksPerYear`}
              label="How many weeks per year do you work?"
              required="Required"
              type="text"
              updateState={updateState}
              mb="4"
              fieldwidth={"25%"}
            />
          )}
          {state[`OtherJob.${index}.type`] && (
            <FieldRadio
              name={`OtherJob.${index}.payment`}
              placeholder="None"
              required="Required"
              label={"Are you paid hourly wages, salary, or commission?"}
              updateState={updateState}
              index={index}
              options={[
                { value: "hourly", label: "Hourly" },
                { value: "salary", label: "Salary" },
                { value: "commission", label: "Commission" },
              ]}
            />
          )}
          {state[`OtherJob.${index}.payment`] && (
            <>
              <FieldInput
                name={`OtherJob.${index}.grossAmount`}
                label={switchLabel(index)}
                required="Required"
                type="text"
                updateState={updateState}
                fieldWidth={"25%"}
              />
              <FieldInput
                name={`OtherJob.${index}.hoursPerWeek`}
                label="Hours worked per week"
                required="Required"
                type="text"
                updateState={updateState}
                fieldWidth={"25%"}
              />
              <FieldInput
                name={`OtherJob.${index}.weeksPerYear`}
                label="Weeks worked per year"
                required="Required"
                type="text"
                updateState={updateState}
                fieldWidth={"25%"}
              />
              {
                (state[`OtherJobSecondary.${index}.payment`] === "salary" ||
                state[`OtherJobSecondary.${index}.payment`] === "commission") && (
                <FieldSelect
                  name={`OtherJob.${index}.schedule`}
                  label="Paid how often?"
                  placeholder="Select option..."
                  required="Required"
                  options={[
                    { value: "52", label: "Once per week" },
                    { value: "26", label: "Every two weeks" },
                    { value: "24", label: "Twice a month" },
                    { value: "12", label: "Once per month" },
                    { value: "1", label: "Yearly" },
                  ]}
                />
                )
              }
              <SectionHeader header={`Employer Address`} />
              <AddressField
                label={"Enter the street address for this employer:"}
                name={`OtherJob.${index}.address`}
              />
            </>
          )}
        </FormizStep>
      ))}
    </>
  )
}
