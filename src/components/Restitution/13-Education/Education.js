import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"
import { AlertBox } from "../../Utils/AlertBox"

export const Education = () => {
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const status = state["Education.status"]

  return (
    <FormizStep label={`Loss of education`} name="Education" order={13000}>
      <SectionHeader header={`Loss of education`} />
      <FieldRadio
        name="Education.status"
        placeholder="None"
        required="Required"
        label={"Did the victimization keep you from participating in school?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {status === "yes" && (
        <AlertBox>Screen about getting a lawyer and Title IX</AlertBox>
      )}
    </FormizStep>
  )
}
