import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { InsuranceAddressField } from "./InsuranceAddressField"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { v4 as uuidv4 } from "uuid"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "",
  },
]

export const HealthInsurancePolicies = number => {
  const form = useForm({
    subscribe: {
      fields: [
        "Insurance",
        "Insurance.current",
      ],
    },
  })

  const [collection, setCollection] = useState(defaultCollection)

  useEffect(() => {
    setCollection(defaultCollection)
  }, [form.resetKey])

  const addItem = () => {
    setCollection(c => [
      ...c,
      {
        id: uuidv4(),
      },
    ])
  }

  const removeItem = id => {
    setCollection(c => c.filter(x => x.id !== id))
  }

  const Note = index => (
    <>
      <FieldInput
        name={`HealthInsurancePolicies.${index}.covered`}
        label={"Name everyone who is covered by this policy."}
        required="Required"
      />
      <InsuranceAddressField
        header={"Policy information"}
        label={"Street Address"}
        name={`HealthInsurancePolicies.${index}.policyName`}
        index={index}
      />
      <FieldMoneyInput
        name={`HealthInsurancePolicies.${index}.totalCost`}
        required="Required"
        label={
          "Total cost of health insurance premium per month, including your children"
        }
      />
      <FieldMoneyInput
        name={`HealthInsurancePolicies.${index}.childPortion`}
        required="Required"
        label={"CHILDREN'S portion of premium"}
      />
      <FieldMoneyInput
        name={`HealthInsurancePolicies.${index}.groupPortion`}
        required="Required"
        label={
          "Portion of premium to be paid by employer or other group each month"
        }
      />
    </>
  )
  return (
    <>
      {form.values.Insurance && form.values.Insurance.current === "yes" && (
        <FormizStep
          label="Health insurance policies"
          name="HealthInsurancePolicies"
          order={27500}
        >
          <SectionHeader header={`Health insurance policies`} />
          <AddAnotherHeader
            header={
              "Continue  until you have entered all applicable health insurance policies."
            }
          />
          {collection.map(({ id, name }, index) => (
            <Box key={index}>
              <AddAnother
                note={Note(index)}
                index={index}
                removeItem={removeItem}
                expenseID={id}
              />
            </Box>
          ))}

          {HealthInsurancePolicies.length <= 20 && (
            <AddPlaceholder label="Add another policy?" onClick={addItem} />
          )}
        </FormizStep>
      )}
    </>
  )
}
