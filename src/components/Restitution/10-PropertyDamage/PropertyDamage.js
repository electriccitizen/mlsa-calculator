import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box, Stack } from "@chakra-ui/react"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { FieldDate } from "../../Fields/FieldDate"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]

export const PropertyDamage = () => {
  // const form = useForm({ subscribe: { fields: ["PropertyDamage"] } })
    const form = useForm({
        subscribe: {
            values: true,
            fields: true,
        },
        // validateOnMount: true,
    });


    const validateFields = (index) => {
        const values = form.values;
        const data = values.PropertyDamage?.data;
        if (!data || index < 0 || index >= data.length) {
            return true; // or return an error message for invalid index
        }
        const { amt, amtInsurance, expense } = data[index];
        let numAmt = amt ? amt.replace(/,/g, "") : '';
        let numAmtInsurance = amtInsurance ? amtInsurance.replace(/,/g, "") : '';
        let numExpense = expense ? expense.replace(/,/g, "") : '';

        numAmt = Number(numAmt)
        numAmtInsurance = Number(numAmtInsurance)
        numExpense = Number(numExpense)

        if (numAmt + numAmtInsurance > numExpense) {
            form.setFieldsValues({
                PropertyDamage: {
                    data: [

                        { amtInsurance: '' },

                    ],
                },
            });
            form.setFieldsValues({
                PropertyDamage: {
                    data: [

                        { amt: '' },

                    ],
                },
            });
            return false
        } else {
            return true
        }

        return null; // return null if all fields are valid
    };
    
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const [additionalExpenses, setAdditionalExpenses] = useState(
    defaultCollection
  )
  useEffect(() => {
    setAdditionalExpenses(defaultCollection)
  }, [form.resetKey])

  const addItem = () => {
    setAdditionalExpenses(s => [
      ...s,
      {
        id: uuidv4(),
      },
    ])
  }
  const removeItem = id => {
    setAdditionalExpenses(s => s.filter(x => x.id !== id))
  }

  const damage = state["PropertyDamage.status"]
  // const replaceRepair = state["PropertyDamage.replaceRepair"]

  const Note = index => (
    <>

        <FieldDate
          name={`PropertyDamage.data.${index}.date`}
          label="Date of purchase or expense"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
        />
        <FieldMoneyInput
          name={`PropertyDamage.data.${index}.expense`}
          label="Cost of repair or replacement?"
          required="Required"
          validations={[
              {
                  rule: (value, values) => validateFields(index, value, values),
                  message: 'The amount paid by you and the amount paid by insurance cannot exceed the total cost of the item or repair.',
              },

          ]}
        />

        <FieldMoneyInput
          name={`PropertyDamage.data.${index}.amtInsurance`}
          label="Amount paid by insurance"
          required="Required"
          validations={[
              {
                  rule: (value, values) => validateFields(index, value, values),
                  message: 'The amount paid by you and the amount paid by insurance cannot exceed the total cost of the item or repair.',
              },
          ]}
          
        />
        <FieldMoneyInput
          name={`PropertyDamage.data.${index}.amt`}
          label="Amount paid by you"
          required="Required"
          validations={[
            {
                rule: (value, values) => validateFields(index, value, values),
                message: 'The amount paid by you and the amount paid by insurance cannot exceed the total cost of the item or repair.',
            },
        ]}
        />
      <FieldInput
        name={`PropertyDamage.data.${index}.notes`}
        label="Describe the expense and how it relates to the crime"
      />
      <FieldRadio
        name={`PropertyDamage.data.${index}.receipt`}
        placeholder="None"
        required="Required"
        label={
          "Do you have receipts or other way of showing the cost (estimate, bill, etc.)?"
        }
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
    </>
  )
  return (
    <FormizStep
      label={`Damaged property`}
      name="PropertyDamage"
      order={10000}
    >
      <SectionHeader header={`Damaged property expenses`} />
      <FieldRadio
        name="PropertyDamage.status"
        placeholder="None"
        required="Required"
        label={
          "Did you have to repair, clean or replace something or will you need to?"
        }
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {damage === "yes" && (
        <AddAnotherHeader
          header={
            "Add each of your repair or replacement costs for any damaged items."
          }
        />
      )}
      {damage === "yes" &&
        additionalExpenses.map((expense, index) => (
          <Box key={index}>
            <AddAnother
              note={Note(index)}
              index={index}
              removeItem={removeItem}
              expenseID={expense.id}
            />
          </Box>
        ))}
      {damage === "yes" &&
        additionalExpenses.length <= 2 && (
          <AddPlaceholder label="Add an expense" onClick={addItem} />
        )}
    </FormizStep>
  )
}
