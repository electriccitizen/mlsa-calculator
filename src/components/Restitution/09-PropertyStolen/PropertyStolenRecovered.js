import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
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

export const PropertyStolenRecovered = () => {
  const form = useForm({
    subscribe: { fields: ["PropertyStolenExpenses.recovered"] },
  })
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

  const damaged = state["PropertyStolenRecovered.damaged"]
  const rental = state["PropertyStolenRecovered.rental"]
  const replaceRepair = state["PropertyStolenRecovered.replaceRepair"]

  const Note = index => (
    <>
      <FieldDate
        name={`PropertyStolenRecovered.data.${index}.date`}
        label="Date of purchase or expense"
        required="Required"
        type="text"
        placeholder="MM/DD/YYYY"
      />
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
          <FieldMoneyInput
              name={`PropertyStolenRecovered.data.${index}.expense`}
              label="Cost of item or repair:"
              required="Required"
          />
        <FieldMoneyInput
          name={`PropertyStolenRecovered.data.${index}.amtInsurance`}
          label="Amount paid by insurance"
          required="Required"
        />
        <FieldMoneyInput
          name={`PropertyStolenRecovered.data.${index}.amt`}
          label="Amount paid by you"
          required="Required"
        />

      </Stack>
      <FieldInput
        name={`PropertyStolenRecovered.data.${index}.notes`}
        label="Describe the item and how it relates to the crime"
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
            "Did you or will your have to repair any of your recovered items?"
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
