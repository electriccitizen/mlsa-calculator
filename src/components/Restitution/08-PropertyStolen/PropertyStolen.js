import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"

export const PropertyStolen = () => {
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const stolen = state["PropertyStolenExpenses.stolen"]

  return (
    <FormizStep label={`Stolen Property Expenses`} name="PropertyStolen" order={8000}>
      <SectionWrapper>
        <SectionHeader header={`Stolen Property Expenses`} />
        <FieldRadio
          name="PropertyStolenExpenses.stolen"
          placeholder="None"
          required="Required"
          label={"Was anything stolen from you?"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        {stolen === "yes" && (
          <FieldRadio
            name="PropertyStolenExpenses.recovered"
            placeholder="None"
            required="Required"
            label={"Did you recover any of the items?"}
            helper={
              "Include language about recovering property that is evidence"
            }
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        )}
      </SectionWrapper>
    </FormizStep>
  )
}
