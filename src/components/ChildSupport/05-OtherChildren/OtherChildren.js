import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const OtherChildren = () => {
  const [state, setState] = useState({})
  const updateState = (name, value, index) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  return (
    <FormizStep label="Your other children" name="OtherChildren" order={5000}>
      <>
        <SectionHeader
          header={`Do you have other children with someone else?`}
          helpText={{
            text:
              "This does not include your step-children. It does include adopted children. Only count your children that you support. This could be children that live with you, or your children that live with another parent as long as you provide support for that child.",
          }}
        />
        <FieldRadio
          name="OtherChildren.primary"
          placeholder="None"
          required="Required"
          updateState={updateState}
          label={"Select yes or no"}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        {state["OtherChildren.primary"] === "yes" && (
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
                { value: "5", label: "Five" },
                { value: "6", label: "Six" },
                { value: "7", label: "Seven" },
                { value: "8", label: "Eight" },
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
