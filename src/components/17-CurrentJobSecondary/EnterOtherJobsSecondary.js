import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import { Box, Text, useColorMode } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { FieldSelect } from "../Fields/FieldSelect"
import { AddressField } from "../02-BasicInformation/AddressField"

export const EnterOtherJobsSecondary = number => {
  const numOtherJobsSecondary = sessionStorage.getItem("numOtherJobsSecondary")

  let GrossAmountLabel = ""
  const updateState = (name, value, index) => {
    console.log(value)
    name === "OtherJobSecondary." + index + ".type" &&
      sessionStorage.setItem("OtherJobSecondary." + index + ".type", value)
    name === "OtherJobSecondary." + index + ".status" &&
      sessionStorage.setItem("OtherJobSecondary." + index + ".status", value)
    name === "OtherJobSecondary." + index + ".payment" &&
      sessionStorage.setItem("OtherJobSecondary." + index + ".payment", value)
    name === "OtherJobSecondary." + index + ".current" &&
      sessionStorage.setItem("OtherJobSecondary." + index + ".current", value)

    console.log(sessionStorage.getItem("OtherJobSecondary." + index + ".type"))

    switch (sessionStorage.getItem("OtherJobSecondary." + index + ".payment")) {
      case "salary":
        GrossAmountLabel =
          "Gross amount (amount before taxes) paid per paycheck"
        sessionStorage.setItem(
          "OtherJobSecondary." + index + ".label",
          GrossAmountLabel
        )
        break
      case "hourly":
        GrossAmountLabel = "Gross amount (amount before taxes) paid per hour"
        sessionStorage.setItem(
          "OtherJobSecondary." + index + ".label",
          GrossAmountLabel
        )
        break
      case "commission":
        GrossAmountLabel =
          "Gross amount (amount before taxes) paid per paycheck"
        sessionStorage.setItem(
          "OtherJobSecondary." + index + ".label",
          GrossAmountLabel
        )
        break
      default:
        GrossAmountLabel = "Gross amount (amount before taxes)"
        sessionStorage.setItem(
          "OtherJobSecondary." + index + ".label",
          GrossAmountLabel
        )
    }
  }

  const { colorMode } = useColorMode()

  const form = useForm()
  const otherParent = form.values.otherParent
    ? form.values.otherParent.fname
    : ""

  return (
    <>
      {Array.apply(null, { length: numOtherJobsSecondary }).map((e, index) => (
        <FormizStep
          key={index}
          name={`EnterOtherJobsSecondary` + index}
          order={17500 + index}
        >
          <SectionWrapper>
            <Box mb="8">
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
            </Box>
            <>
              <FieldRadio
                name={`OtherJobSecondary.${index}.current`}
                label=" Enter all current jobs you have before you enter any previous
                jobs."
                placeholder="None"
                required="Required"
                index={index}
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

              {sessionStorage.getItem(`OtherJobSecondary.${index}.current`) && (
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
              {sessionStorage.getItem(`OtherJobSecondary.${index}.type`) ===
                "temporary" && (
                <FieldDate
                  name={`OtherJobSecondary.${index}.end`}
                  label="When will this job end? (MM/DD/YYYY) (Please note, if this job is expected to end next year or later, please enter December 31 and the current year into the box. Entering a date that is later than December 31 of the current year may result in a miscalculation). "
                  required="Required"
                  type="text"
                />
              )}
              {sessionStorage.getItem(`OtherJobSecondary.${index}.type`) && (
                <SectionHeader header={`Job details`} />
              )}

              {sessionStorage.getItem(`OtherJobSecondary.${index}.type`) && (
                <FieldRadio
                  name={`OtherJobSecondary.${index}.payment`}
                  placeholder="None"
                  required="Required"
                  index={index}
                  label={
                    "Does this job pay hourly wages, salary, or commission?"
                  }
                  updateState={updateState}
                  options={[
                    { value: "hourly", label: "Hourly" },
                    { value: "salary", label: "Salary" },
                    { value: "commission", label: "Commission" },
                  ]}
                />
              )}
              {sessionStorage.getItem(`OtherJobSecondary.${index}.payment`) && (
                <>
                  <FieldInput
                    name={`OtherJobSecondary.${index}.grossAmount`}
                    label={sessionStorage.getItem(
                      "OtherJobSecondary." + index + ".label"
                    )}
                    required="Required"
                    type="text"
                    updateState={updateState}
                    fieldWidth={"25%"}
                  />
                  {sessionStorage.getItem(
                    `OtherJobSecondary.${index}.payment`
                  ) === "hourly" && (
                    <FieldInput
                      name={`OtherJobSecondary.${index}.hoursPerWeek`}
                      label="Hours worked per week"
                      required="Required"
                      type="text"
                      updateState={updateState}
                      fieldWidth={"25%"}
                    />
                  )}
                  <FieldInput
                    name={`OtherJobSecondary.${index}.weeksPerYear`}
                    label="Weeks worked per year"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    fieldWidth={"25%"}
                  />
                </>
              )}
              {(sessionStorage.getItem(`OtherJobSecondary.${index}.payment`) ===
                "salary" ||
                sessionStorage.getItem(`OtherJobSecondary.${index}.payment`) ===
                  "commission") && (
                <FieldSelect
                  name={`OtherJobSecondary.${index}.schedule`}
                  label="Paid how often?"
                  placeholder="Select option..."
                  required="Required"
                  fieldWidth={"25%"}
                  keepValue
                  index={index}
                  options={[
                    { value: "weekly", label: "Once per week" },
                    { value: "biweekly", label: "Every two weeks" },
                    { value: "bimonthly", label: "Twice a month" },
                    { value: "monthly", label: "Once per month" },
                    { value: "yearly", label: "Yearly" },
                  ]}
                />
              )}
            </>
          </SectionWrapper>
        </FormizStep>
      ))}
    </>
  )
}
