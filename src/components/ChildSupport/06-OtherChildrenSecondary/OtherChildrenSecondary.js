import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const OtherChildrenSecondary = () => {
  const form = useForm({
    subscribe: { fields: ["OtherParent.fname","OtherParentChildren","NumOtherChildrenSecondary"] },
  })
  const [state, setState] = useState({})

  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const formOtherParentChildren = (form.fields.OtherParentChildren && form.fields.OtherParentChildren.value)

  const otherParent = form.values.OtherParent
    ? form.values.OtherParent.fname
    : "other parent"

  return (
    <FormizStep
      name="OtherChildrenSecondary"
      order={6000}
      label={"Does the other parent have other children with someone else?"}
    >
      <>
        <SectionHeader
          header={`Does ${otherParent} have children with someone else?`}
          helpText={{
            text:
              "This does not include other parent's step-children. It does include adopted children. Only count other parent's children that they support. This could be children that live with them, or children that live with another parent as long as the other parent provides support for that child.",
          }}
        />
        <FieldRadio
          name="OtherParentChildren"
          placeholder="None"
          required="Required"
          label={"Select yes or no"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        {(state.OtherChildrenSecondary === "yes" || formOtherParentChildren === "yes") && (
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
