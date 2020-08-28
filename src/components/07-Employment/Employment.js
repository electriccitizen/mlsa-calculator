import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { Box, SimpleGrid } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { AddressField } from "../02-BasicInformation/AddressField"
export const Employment = d => {
  const setField = value => {
    return (
      JSON.parse(sessionStorage.getItem(value)) &&
      JSON.parse(sessionStorage.getItem(value))
    )
  }

  const updateState = (name, value) => {
    name === "EmploymentStatus" &&
      sessionStorage.setItem("EmploymentStatus", value)
    name === "Employment.Ever" &&
      sessionStorage.setItem("Employment.Ever", value)
    name === "EmploymentFulltime" &&
      sessionStorage.setItem("EmploymentFulltime", value)
    name === "Employment.CashBenefits" &&
      sessionStorage.setItem("Employment.CashBenefits", value)
    name === "Employment.Union" &&
      sessionStorage.setItem("Employment.Union", value)
  }

  return (
    <FormizStep name="Employment" order={7000}>
      <>
        <SectionWrapper>
          <SectionHeader header={`Employment information`} />
          <FieldRadio
            name="EmploymentStatus"
            placeholder="None"
            required="Required"
            label={"Do you have a job?"}
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {sessionStorage.getItem("EmploymentStatus") === "yes" && (
            <FieldRadio
              name="EmploymentFulltime"
              placeholder="None"
              required="Required"
              updateState={updateState}
              label={"Is the job full time?"}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          )}
          {sessionStorage.getItem("EmploymentStatus") === "no" && (
            <FieldRadio
              name="Employment.Ever"
              placeholder="None"
              required="Required"
              updateState={updateState}
              label={"Have you ever had a job?"}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          )}
          {(sessionStorage.getItem("Employment.Ever") === "yes" ||
            sessionStorage.getItem("EmploymentFulltime")) && (
              <>
            <FieldInput
              name={`Employment.Info`}
              label="What kinds of work do you/did you do for your employer(s)?"
              required="Required"
              type="text"
              updateState={updateState}
              m="0"
            />

          <FieldRadio
            mt={4}
            name="Employment.CashBenefits"
            placeholder="None"
            required="Required"
            updateState={updateState}
            label={
              "Do you receive any non-cash benefits from your employer, such as housing, groceries, meat, car or truck, utilities, phone service?"
            }
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          </>
            )}
          {sessionStorage.getItem("EmploymentStatus") === "yes" &&
            sessionStorage.getItem("Employment.CashBenefits") === "yes" && (
              <>
                <FieldInput
                  name={`Employment.CashBenefitsDetails`}
                  label="Describe the non-cash benefit you receive and how often you receive it."
                  required="Required"
                  type="text"
                  updateState={updateState}
                  m="0"
                />
                <FieldMoneyInput
                  mt={4}
                  name={`Employment.CashBenefitsAmount`}
                  label="What is the value of the benefit, per year?"
                  required="Required"
                  type="text"
                  updateState={updateState}
                />
              </>
            )}
          {sessionStorage.getItem("EmploymentStatus") === "yes" &&
            sessionStorage.getItem("EmploymentFulltime") && (
              <FieldRadio
                name="Employment.Union"
                placeholder="None"
                required="Required"
                updateState={updateState}
                label={"Do you belong to a union?"}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
              />
            )}
          {sessionStorage.getItem("EmploymentStatus") === "yes" &&
            sessionStorage.getItem("Employment.Union") === "yes" && (
              <>
                <FieldInput
                  name={`Employment.UnionName`}
                  label="Name of your union local"
                  required="Required"
                  type="text"
                  updateState={updateState}
                  mb="2"
                />
                <FieldMoneyInput
                  name={`Employment.UnionDues`}
                  label="Amount of monthly dues"
                  required="Required"
                  type="text"
                  updateState={updateState}
                  mb="2"
                />
                <AddressField
                  label={"Street Address"}
                  name={"Employment.UnionAddress"}
                />
              </>
            )}
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
