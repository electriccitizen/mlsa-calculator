import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"

export const OtherChildrenSecondary = () => {
  const form = useForm({
    subscribe: { fields: ["OtherParentName"] },
  })
  const [state, setState] = useState({})

  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const otherParent = form.values.OtherParentName
    ? form.values.OtherParentName
    : "other parent"

  return (
    <FormizStep
      name="OtherChildrenSecondary"
      order={6000}
      label={"Does the other parent have other children with somebody else?"}
    >
      <>
        <SectionHeader
          header={`Does ${otherParent} have children with someone else?`}
        />
        <FieldRadio
          name="OtherChildrenSecondary"
          placeholder="None"
          required="Required"
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        {state.OtherChildrenSecondary === "yes" && (
          <FieldRadio
            name="NumOtherChildrenSecondary"
            required="Required"
            forceStack={true}
            label={
              `How many other minor children does ` + otherParent + ` have?`
            }
            options={[
              { value: "1", label: "One" },
              { value: "2", label: "Two" },
              { value: "3", label: "Three" },
              { value: "4", label: "Four" },
              { value: "5", label: "Five" },
              { value: "6", label: "Six" },
              { value: "7", label: "Seven" },
              { value: "8", label: "Eight" },
            ]}
          />
        )}
      </>
    </FormizStep>
  )
}
