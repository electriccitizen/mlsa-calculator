import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import { AddPlaceholder } from "../AddPlaceholder"
import { useColorMode } from "@chakra-ui/core"
import { DeleteIcon } from "@chakra-ui/icons"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const HealthInsurance = number => {
  let insuranceOngoing = ""
  let updateState = (name, value, index) => {
    name === "Insurance.ongoing" &&
      sessionStorage.setItem("Insurance.ongoing", value)
    name === "Insurance.current" &&
      sessionStorage.setItem("Insurance.current", value)

    insuranceOngoing = sessionStorage.getItem("Insurance.ongoing")
  }
  const { colorMode } = useColorMode()
  // causes bug in gatsby build?
  //const insuranceOngoing = sessionStorage.getItem("Insurance.ongoing")

  return (
    <FormizStep name="Insurance" order={27000}>
      <>
        <SectionWrapper>
          <SectionHeader header={`Health Insurance`} />
          <FieldRadio
            name={`Insurance.ongoing`}
            label="Do any of the children have ongoing medical expenses?"
            placeholder="Select option..."
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {insuranceOngoing === "yes" && (
            <FieldInput
              name={`Insurance.ongoingDesc`}
              label="Describe the ongoing medical expenses."
              type="text"
              isRequired={true}
            />
          )}

          <FieldRadio
            name={`Insurance.current`}
            label="Do you have health insurance available to you through employment or other group?"
            placeholder="Select option..."
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
