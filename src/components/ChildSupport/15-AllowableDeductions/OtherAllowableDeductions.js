import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box } from "@chakra-ui/react"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldInput } from "../../Fields/FieldInput"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { AdministrativeRules } from '../AdministrativeRules/AdministrativeRules'
import { v4 as uuidv4 } from "uuid"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "",
  },
]

export const OtherAllowableDeductions = () => {
  const form = useForm({
    subscribe: { fields: ["AllowableDeductions", "AllowableDeductions.other.trigger"] },
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
  const Expense = index => (
    <FieldInput
      name={`OtherAllowableDeductions[${index}].description`}
      label={"What is the deduction for?"}
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`OtherAllowableDeductions[${index}].amount`}
      label={"Enter amount:"}
    />
  )
  return (
    <>
      {form.values.AllowableDeductions &&
        form.values.AllowableDeductions.other && (
          <FormizStep
            label="Other deductions"
            name="OtherAllowableDeductions"
            order={15500}
          >
            <SectionHeader header={`Enter your other allowable deductions`} />
            <AddAnotherHeader
              header={
                'Enter the type and annual amount of "Other" deduction you have.\n' +
                'Continue to click "Add another entry" until finished.'
              }
            />
            <Box fontSize={"md"} mb={4}></Box>
            <Box>
              {collection.map(({ id, name }, index) => (
                <Box key={index}>
                  <AddAnother
                    expense={Expense(index)}
                    amount={Amount(index)}
                    index={index}
                    removeItem={removeItem}
                    expenseID={id}
                  />
                </Box>
              ))}
            </Box>

            {collection.length <= 3 && (
              <AddPlaceholder label="Add another entry?" onClick={addItem} />
            )}
            <AdministrativeRules
              rules={[110,111]}
              explanation={
                "For definitions and more information, click on the links below:"
              }
            />
          </FormizStep>
        )}
    </>
  )
}
