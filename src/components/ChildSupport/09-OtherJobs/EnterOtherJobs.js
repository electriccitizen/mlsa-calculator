import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldDate } from "../../Fields/FieldDate"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldSelect } from "../../Fields/FieldSelect"
import { AddressField } from "../02-BasicInformation/AddressField"
import {isMaxNumber, isNumber} from "@formiz/validations";
import {Link, Text} from "@chakra-ui/react";

export const EnterOtherJobs = () => {

  const form = useForm({ subscribe: { fields: ["Documents", "OtherJobsNumber"] } })
  const documents = form?.values?.Documents
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
          {(state[`OtherJob.${index}.type`] === "temporary" || state[`OtherJob.${index}.current`] === 'former') && (
            <FieldDate
              name={`OtherJob.${index}.End`}
              label="When did  or will this job end? (MM/DD/YYYY) (Please note, if your job is expected to end next year or later, please enter December 31 and the current year into the box. Entering a date that is later than December 31 of the current year may result in a miscalculation). "
              required="Required"
              type="text"
            />
          )}
          {state[`OtherJob.${index}.type`] && (
            <SectionHeader header={`Wage information`} />
          )}

          {/*{state[`OtherJob.${index}.status`] === "parttime" && (*/}
          {/*  <FieldInput*/}
          {/*    name={`OtherJob.${index}.WeeksPerYear`}*/}
          {/*    label="How many weeks per year do you work?"*/}
          {/*    required="Required"*/}
          {/*    type="text"*/}
          {/*    updateState={updateState}*/}
          {/*    mb="4"*/}
          {/*    fieldwidth={"25%"}*/}
          {/*  />*/}
          {/*)}*/}
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

          {state[`OtherJob.${index}.payment`] === 'hourly' && (
              <Text mb={4} fontSize='sm'>
                If the hours worked per week varies, the regulations say: "seasonal employment or fluctuating income may be averaged over a period sufficient to accurately reflect the parent's earning ability.

                See: <Link isExternal
                           color={"brand.400"}
                           href={"https://rules.mt.gov/search?query=37%2E62%2E108&v="}
              >
                Income Verification/Determining Annual Income (ARM 37.62.108)
              </Link>{" "}

              </Text>
          )}

          {state[`OtherJob.${index}.type`] && state[`OtherJob.${index}.type`] === 'temporary' && (state[`OtherJob.${index}.payment`] === 'salary' || state[`OtherJob.${index}.payment`] === 'commission') && (
              <Text mb={4} fontSize='sm'>
                Note: If your temporary job is paid by salary or commission, enter values that will reflect the <strong>total sum paid</strong> over the course of your temporary job. For example, if your job pays $10,000 over the course of the year, you may enter that amount and select yearly payment.
              </Text>
          )}

          {state[`OtherJob.${index}.type`] && state[`OtherJob.${index}.type`] === 'seasonal' && (state[`OtherJob.${index}.payment`] === 'salary' || state[`OtherJob.${index}.payment`] === 'commission') && (
              <Text mb={4} fontSize='sm'>
                Note: If your seasonal job is paid by salary or commission, enter values that will reflect the <strong>total sum paid</strong> over the course of your seasonal job. For example, if your job pays $10,000 over the course of the year, you may enter that amount and select yearly payment.
              </Text>
          )}
          {state[`OtherJob.${index}.type`] && state[`OtherJob.${index}.status`] === 'parttime' && (state[`OtherJob.${index}.payment`] === 'salary' || state[`OtherJob.${index}.payment`] === 'commission') && (
              <Text mb={4} fontSize='sm'>
                Note: Be sure that the calculations for your part time job reflect the <strong>total salary or commission</strong> paid over the course of the year. For example, if your part time job pays $10,000 over the course of the year, you may enter that amount and select yearly payment.
              </Text>
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
                validations={[
                  {
                    rule: isNumber(),
                    message: 'Please enter a valid number',
                  },
                ]}
              />

              {state[`OtherJob.${index}.payment`] === 'hourly' && (
              <FieldInput
                  name={`OtherJob.${index}.hoursPerWeek`}
                label="Hours worked per week"
                required="Required"
                type="text"
                updateState={updateState}
                fieldWidth={"25%"}
                validations={[
                  {
                    rule: isMaxNumber(101),
                    message: 'Should be 100 or less',
                  },
                ]}
              />
                  )}
              {state[`OtherJob.${index}.payment`] === 'hourly' &&
                  (
              <FieldInput
                name={`OtherJob.${index}.weeksPerYear`}
                label="Weeks worked per year"
                required="Required"
                type="text"
                updateState={updateState}
                fieldWidth={"25%"}
                validations={[
                  {
                    rule: isMaxNumber(53),
                    message: 'Should be 52 or less',
                  },
                ]}
              />
                  )}

              {
                (state[`OtherJob.${index}.payment`] === "salary" ||
                state[`OtherJob.${index}.payment`] === "commission") && (
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
                  fieldWidth={"30%"}
                />
                )
              }
              {
                  (documents === "both" || documents === "affadavit") && (
                      <>
              <SectionHeader header={`Employer Address`} />


                <FieldInput
                    name={`OtherJob.${index}.employer.name`}
                    label="Name"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    fieldWidth={"50%"}
                />
                <AddressField
                    label={"Enter the street address for this employer:"}
                    name={`OtherJob.${index}.employer`}
                />

              </>
        )}


            </>

          )}
        </FormizStep>
      ))}
    </>
  )
}
