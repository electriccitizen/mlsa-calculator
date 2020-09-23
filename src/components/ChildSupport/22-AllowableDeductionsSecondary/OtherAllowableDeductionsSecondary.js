import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box } from "@chakra-ui/core"
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

export const OtherAllowableDeductionsSecondary = () => {
  const form = useForm({
    subscribe: {
      fields: [
        "AllowableDeductionsSecondary",
        "AllowableDeductionsSecondary.other",
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

  const Expense = index => (
    <FieldInput
      name={`OtherAllowableDeductionsSecondary[${index}].description`}
      label={"What is the deduction for?"}
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`OtherAllowableDeductionsSecondary[${index}].amount`}
      label={"Enter amount:"}
    />
  )

  return (
    <>
      {form.values.AllowableDeductionsSecondary &&
        form.values.AllowableDeductionsSecondary.other === true && (
          <FormizStep name="OtherAllowableDeductionsSecondary" order={22500}>
            <SectionHeader header={`Enter other allowable deductions`} />
            <AddAnotherHeader
              header={
                'Enter the type and annual amount of "Other" deductions you have.\n' +
                '              Continue to click "Add another entry" until finished.'
              }
            />
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

            {OtherAllowableDeductionsSecondary.length <= 20 && (
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
