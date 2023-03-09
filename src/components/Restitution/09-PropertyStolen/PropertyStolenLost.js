import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box, Stack } from '@chakra-ui/react'
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { v4 as uuidv4 } from "uuid"
import { FieldDate } from '../../Fields/FieldDate'

const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]

export const PropertyStolenLost = () => {
  // const form = useForm({
  //   subscribe: { fields: ["PropertyStolenExpenses.stolen"] },
  // })
  const form = useForm({
    subscribe: {
      values: true,
      fields: true,
    },
    // validateOnMount: true,
  });

  const validateFields = (index) => {
    const values = form.values;
    const data = values.PropertyStolenLost?.data;
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
        PropertyStolenLost: {
          data: [

            { amtInsurance: '' },

          ],
        },
      });
      form.setFieldsValues({
        PropertyStolenLost: {
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

  const replace = state["PropertyStolenLost.replace"]

  const Note = index => (
    <>
      <FieldDate
        name={`PropertyStolenLost.data.${index}.date`}
        label="Date of purchase or expense"
        required="Required"
        type="text"
        placeholder="MM/DD/YYYY"
      />

        <FieldMoneyInput
            name={`PropertyStolenLost.data.${index}.expense`}
            label="Cost of item or repair:"
            required="Required"
            validations={[
              {
                rule: (value, values) => validateFields(index, value, values),
                message: 'The amount paid by you and the amount paid by insurance cannot exceed the total cost of the item or repair.',
              },

            ]}
          />

        <FieldMoneyInput
          name={`PropertyStolenLost.data.${index}.amtInsurance`}
          label="Amount paid by insurance"
          required="The total amount paid by insurance and the amount paid by you cannot exceed the total cost of the item or repair. Adjust the numbers accordingly."
          validations={[
            {
              rule: (value, values) => validateFields(index, value, values),
              message: 'The amount paid by you and the amount paid by insurance cannot exceed the total cost of the item or repair.',
            },
          ]}
        />
        <FieldMoneyInput
          name={`PropertyStolenLost.data.${index}.amt`}
          label="Amount paid by you"
          required="The total amount paid by insurance and the amount paid by you cannot exceed the total cost of the item or repair. Adjust the numbers accordingly."
          validations={[
            {
              rule: (value, values) => validateFields(index, value, values),
              message: 'The amount paid by you and the amount paid by insurance cannot exceed the total cost of the item or repair.',
            },
          ]}
        />

      <FieldInput
        name={`PropertyStolenLost.data.${index}.notes`}
        label="Describe the expense and how it relates to the crime"
      />
      <FieldRadio
        name={`PropertyStolenLost.data.${index}.receipt`}
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

  return form.values.PropertyStolenExpenses &&
    form.values.PropertyStolenExpenses.stolen === "yes" ? (
    <FormizStep
      label={`Lost items`}
      name="PropertyStolenLost"
      order={9750}
    >
      <SectionHeader header={`Stolen property (lost items)`} />

      <FieldRadio
        name="PropertyStolenLost.replace"
        placeholder="None"
        required="Required"
        label={
          "Did you replace or will you need to replace any of your lost items?"
        }
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {replace === "yes" && (
        <AddAnotherHeader
          header={"Add each of your replacement costs for each item below."}
        />
      )}

      {replace === "yes" &&
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
      {replace === "yes" && additionalExpenses.length <= 2 && (
        <AddPlaceholder label="Add an expense" onClick={addItem} />
      )}
    </FormizStep>
  ) : null
}
