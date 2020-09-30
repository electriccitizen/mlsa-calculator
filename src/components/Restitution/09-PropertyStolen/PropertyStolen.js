import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
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
    <FormizStep
      label={`Property expenses`}
      name="PropertyStolen"
      order={9000}
    >
      <SectionHeader header={`Stolen or lost property expenses`} />
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
          helper={"If any of your property was kept as evidence, you have a right to have the property returned at the end of the criminal proceeding."}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      )}
    </FormizStep>
  )
}
