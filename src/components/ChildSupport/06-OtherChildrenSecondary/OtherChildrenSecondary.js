import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const OtherChildrenSecondary = () => {
  const form = useForm({
    subscribe: { fields: ["OtherParent.fname"] },
  })
  const [state, setState] = useState({})

  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const otherParent = form.values.OtherParent.fname
    ? form.values.OtherParent.fname
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
          label={"Select yes or no"}
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
      <AdministrativeRules
        rules={[103, 110, 111]}
        explanation={
          "For definitions and more information, click on the links below:"
        }
      />
    </FormizStep>
  )
}
