import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { FieldSelect } from "../Fields/FieldSelect"
import { Box, SimpleGrid } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { AddressField } from "../02-BasicInformation/AddressField"
import { FieldDate } from "../Fields/FieldDate"
export const CurrentJobSecondary = d => {
  const setField = value => {
    return (
      JSON.parse(sessionStorage.getItem(value)) &&
      JSON.parse(sessionStorage.getItem(value))
    )
  }
  const form = useForm()
  const updateState = (name, value) => {
    name === "EmploymentSecondary.type" &&
      sessionStorage.setItem("EmploymentSecondary.type", value)
    name === "EmploymentSecondary.status" &&
      sessionStorage.setItem("EmploymentSecondary.status", value)
    name === "EmploymentSecondary.payment" &&
      sessionStorage.setItem("EmploymentSecondary.payment", value)
    name === "EmploymentSecondary.otherJobs" &&
      sessionStorage.setItem("EmploymentSecondary.otherJobs", value)
    name === "OtherSecondaryJobs.number" &&
      sessionStorage.setItem("numOtherJobsSecondary", value)
  }

  let GrossAmountLabel = ""
  switch (sessionStorage.getItem("EmploymentSecondary.payment")) {
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
  const otherParent = form.values.otherParent
    ? form.values.otherParent.fname
    : ""
  const emp = sessionStorage.getItem("Employment")
  let foo
  return (
    <FormizStep name="CurrentJobSecondary" order={17500}>
      <>
        <SectionWrapper>
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
          {sessionStorage.getItem("EmploymentSecondary.status") === "yes" && (
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
          {sessionStorage.getItem("EmploymentSecondary.type") ===
            "temporary" && (
            <FieldDate
              name={`CurrentJobEnd`}
              label="When will this job end? (MM/DD/YYYY) (Please note, if your job is expected to end next year or later, please enter December 31 and the current year into the box. Entering a date that is later than December 31 of the current year may result in a miscalculation). "
              required="Required"
              type="text"
            />
          )}
          {sessionStorage.getItem("EmploymentSecondary.type") &&
            sessionStorage.getItem("EmploymentSecondary.status") === "yes" && (
              <SectionHeader header={`Job details`} />
            )}

          {sessionStorage.getItem("EmploymentSecondary.type") ===
            "parttime" && (
            <FieldInput
              name={`EmploymentSecondary.weeksPerYear`}
              label="How many weeks per year do you work?"
              required="Required"
              type="text"
              updateState={updateState}
              mb="4"
              fieldwidth={"25%"}
            />
          )}
          {sessionStorage.getItem("EmploymentSecondary.type") &&
            sessionStorage.getItem("EmploymentSecondary.status") === "yes" && (
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
          {sessionStorage.getItem("EmploymentSecondary.type") &&
            sessionStorage.getItem("EmploymentSecondary.status") === "yes" && (
              <>
                <FieldInput
                  name={`EmploymentSecondary.grossAmount`}
                  label={GrossAmountLabel}
                  required="Required"
                  type="text"
                  updateState={updateState}
                  fieldwidth={"25%"}
                  m="0"
                />
                {sessionStorage.getItem("EmploymentSecondary.payment") ===
                  "hourly" && (
                  <FieldInput
                    name={`EmploymentSecondary.hoursPerWeek`}
                    label="Hours worked per week"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    fieldwidth={"25%"}
                  />
                )}
                <FieldInput
                  name={`EmploymentSecondary.weeksPerYear`}
                  label="Weeks worked per year"
                  required="Required"
                  type="text"
                  updateState={updateState}
                  fieldwidth={"25%"}
                />
              </>
            )}
          {(sessionStorage.getItem("EmploymentSecondary.payment") ===
            "salary" ||
            sessionStorage.getItem("EmploymentSecondary.payment") ===
              "commission") && (
            <FieldSelect
              name="EmploymentSecondary.schedule"
              label="Paid how often?"
              placeholder="Select option..."
              required="Required"
              fieldwidth={"25%"}
              keepValue
              options={[
                { value: "weekly", label: "Once per week" },
                { value: "biweekly", label: "Every two weeks" },
                { value: "bimonthly", label: "Twice a month" },
                { value: "monthly", label: "Once per month" },
                { value: "yearly", label: "Yearly" },
              ]}
            />
          )}
          {sessionStorage.getItem("EmploymentSecondary.type") && (
            <FieldRadio
              name="EmploymentSecondary.otherJobs"
              placeholder="None"
              required="Required"
              label={
                `Do you have any additional jobs to enter for ` +
                otherParent +
                `?`
              }
              updateState={updateState}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          )}

          {sessionStorage.getItem("EmploymentSecondary.otherJobs") ===
            "yes" && (
            <FieldInput
              name="OtherSecondaryJobs.number"
              label={
                `How many additional jobs would you like to enter for ` +
                otherParent +
                `?`
              }
              required="Required"
              fieldWidth={"25%"}
              updateState={updateState}
            />
          )}
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
