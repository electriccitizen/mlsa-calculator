import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldNumberInput } from "../../Fields/FieldNumberInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { FieldSelect } from "../../Fields/FieldSelect"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddressField } from "../02-BasicInformation/AddressField"
import { FieldDate } from "../../Fields/FieldDate"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"
import {isMaxNumber} from "@formiz/validations";
import { Text, Link } from "@chakra-ui/react"

export const CurrentJob = d => {
  const form = useForm({ subscribe: { fields: ["Documents", "EmploymentPrimary.initiate"] } })
  const documents = form?.values?.Documents
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  let GrossAmountLabel = ""
  switch (state["EmploymentPrimary.payment"]) {
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
      {form.values.EmploymentPrimary && form.values.EmploymentPrimary.initiate === "yes" && (
        <FormizStep label="Your current job" name="CurrentJob" order={8000}>
          <SectionHeader header={`Enter information about your current job`} />
          <FieldRadio
            name="EmploymentPrimary.type"
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
          {state["EmploymentPrimary.type"] === "permanent" && (
            <FieldRadio
              name="EmploymentPrimary.status"
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
            name={`EmploymentPrimary.start`}
            label="When did you start this job? If you are not sure of the exact date, enter an approximate date. (MM/DD/YYYY)"
            required="Required"
            type="text"
          />
          {state["EmploymentPrimary.type"] === "temporary" && (
            <FieldDate
              name={`EmploymentPrimary.end`}
              label="When will this job end? (MM/DD/YYYY) (Please note, if your job is expected to end next year or later, please enter December 31 and the current year into the box. Entering a date that is later than December 31 of the current year may result in a miscalculation). "
              required="Required"
              type="text"
            />
          )}

          {state["EmploymentPrimary.type"] && (
            <SectionHeader header={`Wage information`}
            />
          )}


          {state["EmploymentPrimary.type"] && (
            <FieldRadio
              name="EmploymentPrimary.payment"
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

          {state["EmploymentPrimary.payment"] === 'hourly' && (
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

          {state["EmploymentPrimary.type"] && state["EmploymentPrimary.type"] === 'temporary' && (state["EmploymentPrimary.payment"] === 'salary' || state["EmploymentPrimary.payment"] === 'commission') && (
              <Text mb={4} fontSize='sm'>
              Note: If your temporary job is paid by salary or commission, enter values that will reflect the <strong>total sum paid</strong> over the course of your temporary job. For example, if your job pays $10,000 over the course of the year, you may enter that amount and select yearly payment.
              </Text>
          )}

          {state["EmploymentPrimary.type"] && state["EmploymentPrimary.type"] === 'seasonal' && (state["EmploymentPrimary.payment"] === 'salary' || state["EmploymentPrimary.payment"] === 'commission') && (
              <Text mb={4} fontSize='sm'>
                Note: If your seasonal job is paid by salary or commission, enter values that will reflect the <strong>total sum paid</strong> over the course of your seasonal job. For example, if your job pays $10,000 over the course of the year, you may enter that amount and select yearly payment.
              </Text>
          )}

          {state["EmploymentPrimary.type"] && state["EmploymentPrimary.status"] === 'parttime' && (state["EmploymentPrimary.payment"] === 'salary' || state["EmploymentPrimary.payment"] === 'commission') && (
              <Text mb={4} fontSize='sm'>
                Note: Be sure that the calculations for your part time job reflect the <strong>total salary or commission</strong> paid over the course of the year. For example, if your part time job pays $10,000 over the course of the year, you may enter that amount and select yearly payment.
              </Text>
          )}



          {state["EmploymentPrimary.payment"] && (
            <>
              <FieldMoneyInput
                name={`EmploymentPrimary.grossAmount`}
                label={GrossAmountLabel}
                required="Required"
                type="text"
                updateState={updateState}
                fieldWidth={"25%"}
              />
              {state["EmploymentPrimary.payment"] === 'hourly' && (
              <FieldNumberInput
                name={`EmploymentPrimary.hoursPerWeek`}
                label="Hours worked per week"
                required="Required"
                type="text"
                updateState={updateState}
                fieldWidth={"25%"}
                format="false"
                validations={[
                  {
                    rule: isMaxNumber(101),
                    message: 'Should be 100 or less',
                  },
                ]}
              />
              )}
              {
                state["EmploymentPrimary.payment"] === 'hourly' &&
               (
                  <FieldNumberInput
                    name={`EmploymentPrimary.weeksPerYear`}
                    label="How many weeks per year do you work?"
                    required="Required"
                    type="text"
                    format="false"
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

              {state["EmploymentPrimary.payment"] !== "hourly" && (
                <FieldSelect
                  name="EmploymentPrimary.schedule"
                  label="Paid how often?"
                  placeholder="Select option..."
                  required="Required"
                  updateState={updateState}
                  options={[
                    { value: "52", label: "Once per week" },
                    { value: "26", label: "Every two weeks" },
                    { value: "24", label: "Twice a month" },
                    { value: "12", label: "Once per month" },
                    { value: "1", label: "Yearly" },
                  ]}
                  fieldWidth={"30%"}
                />
              )}
              {
                (documents === "both" || documents === "affadavit") && (
                  <>
                    <SectionHeader header={`Employer Information`} />
                    <FieldInput
                      name={`EmploymentPrimary.employer.name`}
                      label="Name"
                      required="Required"
                      type="text"
                      updateState={updateState}
                      fieldWidth={"50%"}
                    />
                    <AddressField
                      label={"Enter the street address for this employer:"}
                      name={"EmploymentPrimary.employer"}
                    />
                    <FieldInput
                      name={`EmploymentPrimary.employer.phone`}
                      label="Phone"
                      required="Required"
                      helper="e.g. (555) 555-5555"
                      fieldWidth={"25%"}
                    />
                  </>
                )
              }
            </>
          )}
          <AdministrativeRules
            rules={[105, 106, 108, 110]}
            explanation={
              "For definitions and more information, click on the links below:"
            }
          />
        </FormizStep>
      )}
    </>
  )
}
