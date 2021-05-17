import React from "react"
import { FormizStep, useForm } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"
import { Text } from '@chakra-ui/react'
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const NumberChildren = () => {
  const form = useForm({ subscribe: { fields: ["OtherParent.fname"] } })
  const otherParent = form.values?.OtherParent?.fname || "other parent"

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
        ]}
      />
      <Text fontSize={"md"} mb={4}>For the purpose of this calculation, you should count your child if they are under the age of 18, or under the age of 19 and still in high school, or they are mentally or physically incapacitated and have been since before their 19th birthday.</Text>
      <AdministrativeRules
        rules={[103]}
        explanation={
          "For definitions and more information, click on the links below:"
        }
      />
    </FormizStep>
  )
}
