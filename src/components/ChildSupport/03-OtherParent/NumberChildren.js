import React from "react"
import { FormizStep, useForm } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"
import { AdministrativeRules } from '../AdministrativeRules/AdministrativeRules'

export const NumberChildren = () => {
  const form = useForm({ subscribe: { fields: ["OtherParentName"] } })
  const otherParent = form.values.OtherParentName && form.values.OtherParentName

  return (
    <FormizStep label="Number of Children" name="NumberChildren" order={3000}>
      <SectionHeader
        header={`How many minor children do you have together with ${otherParent}? (This includes adopted children, but not stepchildren.)`}
      />
      <FieldRadio
        name="NumPrimaryChildren"
        required="Required"
        forceStack={true}
        label={"Select number"}
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
      <AdministrativeRules
        rules={[101, 102, 103]}
        explanation={
          "For definitions and more information, click on the links below:"
        }
      />
    </FormizStep>
  )
}
