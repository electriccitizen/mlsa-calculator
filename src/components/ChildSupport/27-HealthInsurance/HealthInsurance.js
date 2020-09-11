import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"

export const HealthInsurance = number => {
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const insuranceOngoing = state["Insurance.ongoing"]

  return (
    <FormizStep label="Health Insurance" name="Insurance" order={27000}>
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
