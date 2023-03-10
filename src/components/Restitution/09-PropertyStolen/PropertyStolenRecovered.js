import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box } from '@chakra-ui/react'
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

export const PropertyStolenRecovered = ({ data }) => {
    const [state, setState] = useState({})

    const form = useForm({
        subscribe: {
            values: true,
            fields: true,
        },
        // validateOnMount: true,
    });

    const validateFields = (index) => {
        const values = form.values;
        const data = values.PropertyStolenRecovered?.data;
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
                PropertyStolenRecovered: {
                    data: [

                        { amtInsurance: '' },

                    ],
                },
            });
            form.setFieldsValues({
                PropertyStolenRecovered: {
                    data: [

                        { amt: '' },

                    ],
                },
            });
            return false
        } else {
            return true // return true if all fields are valid
        }
    };

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

  const damaged = state["PropertyStolenRecovered.damaged"]
  const rental = state["PropertyStolenRecovered.rental"]
  const replaceRepair = state["PropertyStolenRecovered.replaceRepair"]

    const Note = index => (
    <>
        <FieldInput
            name={`PropertyStolenRecovered.data.${index}.notes`}
            label="Describe the item and how it relates to the crime"
        />

      <FieldDate
        name={`PropertyStolenRecovered.data.${index}.date`}
        label="Date of purchase or expense"
        required="Required"
        type="text"
        placeholder="MM/DD/YYYY"
      />

          <FieldMoneyInput
              name={`PropertyStolenRecovered.data.${index}.expense`}
              label="Cost of item or repair:"
              required="Required"
              type="text"
              // validations={[
              //
              //     {
              //         rule: (value, values) => validateFields(index, value, values),
              //         message: 'The amount paid by you and the amount paid by insurance cannot exceed the total cost of the item or repair.',
              //     },
              //
              // ]}
          />
        <FieldMoneyInput
          name={`PropertyStolenRecovered.data.${index}.amtInsurance`}
          label="Amount paid by insurance"
          required="The total amount paid by insurance and the amount paid by you cannot exceed the total cost of the item or repair. Adjust the numbers accordingly."
          type="text"
          validations={[
              {
                  rule: (value, values) => validateFields(index, value, values),
                  message: 'The amount paid by you and the amount paid by insurance cannot exceed the total cost of the item or repair.',
              },
          ]}

        />
        <FieldMoneyInput
          name={`PropertyStolenRecovered.data.${index}.amt`}
          label="Amount paid by you"
          required="The total amount paid by insurance and the amount paid by you cannot exceed the total cost of the item or repair. Adjust the numbers accordingly."
          type="text"
          validations={[
              {
                  rule: (value, values) => validateFields(index, value, values),
                  message: 'The amount paid by you and the amount paid by insurance cannot exceed the total cost of the item or repair.',
              },
          ]}

        />


      <FieldRadio
        name={`PropertyStolenRecovered.data.${index}.receipt`}
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
    form.values.PropertyStolenExpenses.recovered === "yes" ? (
    <FormizStep
      label={`Recovered items`}
      name="PropertyStolenRecovered"
      order={9500}
    >
      <SectionHeader
        header={`Stolen property (recovered items)`}
        helpText={{
          text:
            "This question is to help determine any costs related" +
            " to property that was stolen but recovered, including any " +
            "rental, replacement, or repair costs.",
        }}
      />

      <FieldRadio
        name="PropertyStolenRecovered.damaged"
        placeholder="None"
        required="Required"
        label={"Was any of your recovered property damaged?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {damaged && (
        <FieldRadio
          name="PropertyStolenRecovered.replaceRepair"
          placeholder="None"
          required="Required"
          label={
            "Did you or will you have to repair any of your recovered items?"
          }
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      )}
      {damaged && (
        <FieldRadio
          name="PropertyStolenRecovered.rental"
          placeholder="None"
          required="Required"
          label={
            "Did you have to rent something while your property was missing?"
          }
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      )}

      {(rental === "yes" || replaceRepair === "yes") && (
        <AddAnotherHeader
          header={
            "Add each of your repair or rental costs for each item below. Include\n" +
            "            any rental costs."
          }
        />
      )}

      {(rental === "yes" || replaceRepair === "yes") &&
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
      {(rental === "yes" || replaceRepair === "yes") &&
        additionalExpenses.length <= 2 && (
          <AddPlaceholder label="Add an expense" onClick={addItem} />
        )}
    </FormizStep>
  ) : null
}
