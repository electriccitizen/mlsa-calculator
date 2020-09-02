import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Collapse,
  Button,
  IconButton,
  Box,
  Stack,
  useColorMode,
} from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { FieldSelect } from "../Fields/FieldSelect"
import { AddressField } from "../02-BasicInformation/AddressField"

export const EnterOtherJobs = number => {
  const [show, setShow] = React.useState(false)
  const numOtherJobs = sessionStorage.getItem("numOtherJobs")

  const updateState = (name, value, index) => {
    name === "OtherJob." + index + ".Type" &&
      sessionStorage.setItem("OtherJob." + index + ".Type", value)
    name === "OtherJob." + index + ".Status" &&
      sessionStorage.setItem("OtherJob." + index + ".Status", value)
    name === "OtherJob." + index + ".Payment" &&
      sessionStorage.setItem("OtherJob." + index + ".Payment", value)
    name === "OtherJob." + index + ".Current" &&
      sessionStorage.setItem("OtherJob." + index + ".Current", value)
  }

  let GrossAmountLabel = ""
  switch (sessionStorage.getItem("CurrentJobPayment")) {
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
  const { colorMode } = useColorMode()

  return (
    <>
      {Array.apply(null, { length: numOtherJobs }).map((e, index) => (
        <FormizStep
          key={index}
          name={`EnterOtherJobs` + index}
          order={9500 + index}
        >
          <SectionWrapper>
            <Box mb="8">
              <SectionHeader
                header={
                  `Enter the details for your other jobs (` +
                  (index + 1) +
                  ` of ` +
                  numOtherJobs +
                  `)`
                }
              />
            </Box>
            <>
              <FieldRadio
                name={`OtherJob.${index}.Current`}
                label="Is this a current job or a former job?"
                placeholder="None"
                required="Required"
                index={index}
                updateState={updateState}
                options={[
                  {
                    value: "current",
                    label: "I am currently working at this job",
                  },
                  { value: "former", label: "I no longer work at this job" },
                ]}
              />
              {sessionStorage.getItem("OtherJob." + index + ".Current") && (
                <FieldRadio
                  name={`OtherJob.${index}.Type`}
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
              {sessionStorage.getItem("OtherJob." + index + ".Type") ===
                "permanent" && (
                <FieldRadio
                  name={`OtherJob.${index}.Status`}
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

              {sessionStorage.getItem("OtherJob." + index + ".Type") && (
                <FieldDate
                  name={`OtherJob.${index}.Start`}
                  label="When did you start this job? If you are not sure of the exact date, enter an approximate date. (MM/DD/YYYY)"
                  required="Required"
                  type="text"
                />
              )}
              {sessionStorage.getItem("OtherJob." + index + ".Type") ===
                "temporary" && (
                <FieldDate
                  name={`OtherJob.${index}.End`}
                  label="When will this job end? (MM/DD/YYYY) (Please note, if your job is expected to end next year or later, please enter December 31 and the current year into the box. Entering a date that is later than December 31 of the current year may result in a miscalculation). "
                  required="Required"
                  type="text"
                />
              )}
              <SectionHeader header={`Wage information`} />

              {sessionStorage.getItem("OtherJob." + index + ".Status") ===
                "parttime" && (
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
              {sessionStorage.getItem("OtherJob." + index + ".Type") && (
                <FieldRadio
                  name={`OtherJob.${index}.Payment`}
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
              {sessionStorage.getItem("OtherJob." + index + ".Payment") && (
                <>
                  <FieldInput
                    name={`OtherJob.${index}.GrossAmount`}
                    label={GrossAmountLabel}
                    required="Required"
                    type="text"
                    updateState={updateState}
                    fieldwidth={"25%"}
                    m="0"
                  />
                  <FieldInput
                    name={`OtherJob.${index}.HoursPerWeek`}
                    label="Hours worked per week"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    fieldwidth={"25%"}
                  />
                  <FieldInput
                    name={`OtherJob.${index}.WeeksPerYear`}
                    label="Weeks worked per year"
                    required="Required"
                    type="text"
                    updateState={updateState}
                    fieldwidth={"25%"}
                  />
                  <FieldSelect
                    name={`OtherJob.${index}.PaySchedule`}
                    label="Paid how often?"
                    placeholder="Select option..."
                    required="Required"
                    fieldwidth={"25%"}
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
                    name={`OtherJob.${index}.Address`}
                  />
                </>
              )}
            </>
          </SectionWrapper>
        </FormizStep>
      ))}
    </>
  )
}
