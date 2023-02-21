import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldNumberInput } from "../../Fields/FieldNumberInput"
import { FieldDate } from "../../Fields/FieldDate"
import { FieldRadio } from "../../Fields/FieldRadio"
import { FieldSelect } from "../../Fields/FieldSelect"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"
import {isMaxNumber, isMinNumber} from "@formiz/validations";
export const EnterOtherJobsSecondary = () => {
  const form = useForm({
    subscribe: { fields: ["OtherParent.fname", "NumOtherSecondaryJobs"] },
  })
  const numOtherJobsSecondary = form.values.NumOtherSecondaryJobs
  const [state, setState] = useState({})
  const updateState = (name, value, index) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  let GrossAmountLabel = ""
  function switchLabel(index) {
    switch (state["OtherJobSecondary." + index + ".payment"]) {
      case "salary":
        GrossAmountLabel =
          "Gross amount (amount before taxes) paid per paycheck"
        break
      case "hourly":
        GrossAmountLabel = "Gross amount (amount before taxes) paid per hour"
        break
      case "commission":
        GrossAmountLabel =
          "Gross amount (amount before taxes) paid per paycheck"
        break
      default:
        GrossAmountLabel = "Gross amount (amount before taxes)"
    }
    return GrossAmountLabel
  }

  const otherParent = form.values?.OtherParent?.fname || "other parent"

  return (
    <>
      {Array.apply(null, { length: numOtherJobsSecondary }).map((e, index) => (
        <FormizStep
          key={index}
          name={`EnterOtherJobsSecondary` + index}
          order={17500 + index}
          label={"Job details (" + index + " of " + numOtherJobsSecondary + ")"}
        >
          <SectionHeader
            header={
              `Enter the details for ` +
              otherParent +
              `'s additional jobs (` +
              (index + 1) +
              ` of ` +
              numOtherJobsSecondary +
              `)`
            }
          />
          <>
            <FieldRadio
              name={`OtherJobSecondary.${index}.current`}
              label=" Enter all current jobs you have before you enter any previous jobs."
              placeholder="None"
              required="Required"
              index={index}
              forceStack={true}
              updateState={updateState}
              options={[
                {
                  value: "current",
                  label: otherParent + " is currently working at this job",
                },
                {
                  value: "former",
                  label: otherParent + " no longer works at this job",
                },
              ]}
            />

            {state[`OtherJobSecondary.${index}.current`] && (
              <FieldRadio
                name={`OtherJobSecondary.${index}.type`}
                placeholder="None"
                required="Required"
                label={"What type of job is this?"}
                updateState={updateState}
                index={index}
                options={[
                  { value: "permanent", label: "Permanent" },
                  { value: "temporary", label: "Temporary" },
                  { value: "seasonal", label: "Seasonal" },
                ]}
              />
            )}
            {state[`OtherJobSecondary.${index}.type`] && (
              <FieldDate
                name={`OtherJobSecondary.${index}.start`}
                label="When did you start this job? If you are not sure of the exact date, enter an approximate date. (MM/DD/YYYY)"
                required="Required"
                type="text"
              />
            )}
            {state[`OtherJobSecondary.${index}.type`] === "temporary" && (
              <FieldDate
                name={`OtherJobSecondary.${index}.end`}
                label="When will this job end? (MM/DD/YYYY) (Please note, if this job is expected to end next year or later, please enter December 31 and the current year into the box. Entering a date that is later than December 31 of the current year may result in a miscalculation). "
                required="Required"
                type="text"
              />
            )}
            {state[`OtherJobSecondary.${index}.type`] && (
              <SectionHeader header={`Job details`} />
            )}

            {state[`OtherJobSecondary.${index}.type`] && (
              <FieldRadio
                name={`OtherJobSecondary.${index}.payment`}
                placeholder="None"
                required="Required"
                index={index}
                label={"Does this job pay hourly wages, salary, or commission?"}
                updateState={updateState}
                options={[
                  { value: "hourly", label: "Hourly" },
                  { value: "salary", label: "Salary" },
                  { value: "commission", label: "Commission" },
                ]}
              />
            )}
            {state[`OtherJobSecondary.${index}.payment`] && (
              <>
                <FieldMoneyInput
                  name={`OtherJobSecondary.${index}.grossAmount`}
                  label={switchLabel(index)}
                  required="Required"
                  type="text"
                  fieldWidth={"25%"}
                />
                {state[`OtherJobSecondary.${index}.payment`] === "hourly" && (
                  <FieldNumberInput
                    name={`OtherJobSecondary.${index}.hoursPerWeek`}
                    label="Hours worked per week"
                    required="Required"
                    type="text"
                    fieldWidth={"25%"}
                    validations={[
                      {
                        rule: isMaxNumber(81),
                        message: 'Should be 80 or less',
                      },
                    ]}
                  />
                )}
                <FieldNumberInput
                  name={`OtherJobSecondary.${index}.weeksPerYear`}
                  label="Weeks worked per year"
                  required="Required"
                  type="text"
                  fieldWidth={"25%"}
                  validations={[
                    {
                      rule: isMaxNumber(53),
                      message: 'Should be 52 or less',
                    },
                  ]}/>
              </>
            )}
            {(state[`OtherJobSecondary.${index}.payment`] === "salary" ||
              state[`OtherJobSecondary.${index}.payment`] === "commission") && (
                <FieldSelect
                  name={`OtherJobSecondary.${index}.schedule`}
                  label="Paid how often?"
                  placeholder="Select option..."
                  required="Required"
                  fieldWidth={"25%"}
                  index={index}
                  options={[
                    { value: "52", label: "Once per week" },
                    { value: "26", label: "Every two weeks" },
                    { value: "24", label: "Twice a month" },
                    { value: "12", label: "Once per month" },
                    { value: "1", label: "Yearly" },
                  ]}
                />
              )}
          </>
          <AdministrativeRules
            rules={[105, 106, 108]}
            explanation={
              "For definitions and more information, click on the links below:"
            }
          />
        </FormizStep>
      ))}
    </>
  )
}
