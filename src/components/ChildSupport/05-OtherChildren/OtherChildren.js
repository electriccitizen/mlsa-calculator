import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const OtherChildren = () => {
  const form = useForm({ subscribe: { fields: ["OtherChildrenPrimary","NumOtherChildren"] } })
  const [state, setState] = useState({})
  const updateState = (name, value, index) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const formOtherChildrenPrimary = (form.fields.OtherChildrenPrimary && form.fields.OtherChildrenPrimary.value)

  return (
    <FormizStep label="Other children (you)" name="OtherChildren" order={5000}>
      <>
        <SectionHeader
          header={`Do you have other children with someone else?`}
          helpText={{
            text:
              "This does not include your step-children. It does include adopted children. Only count your children that you support. This could be children that live with you, or your children that live with another parent as long as you provide support for that child.",
          }}
        />
        <FieldRadio
          name="OtherChildrenPrimary"
          placeholder="None"
          required="Required"
          updateState={updateState}
          label={"Select yes or no"}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        {(state["OtherChildrenPrimary"] === "yes" || formOtherChildrenPrimary === "yes") && (
          <>
            <FieldRadio
              name="NumOtherChildren"
              required="Required"
              forceStack={true}
              label={"How many other minor children do you have?"}
              options={[
                { value: "1", label: "One" },
                { value: "2", label: "Two" },
                { value: "3", label: "Three" },
                { value: "4", label: "Four" },
              ]}
            />
          </>
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
