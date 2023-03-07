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

export const MentalHealth = () => {
  const form = useForm({ subscribe: false })
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

  const status = state["MentalHealthExpenses.status"]
  const current = state["MentalHealthExpenses.current"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldDate
          name={`MentalHealthExpenses.data.${index}.date`}
          label="Date of purchase or expense"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
        />
        <FieldMoneyInput
          name={`MentalHealthExpenses.data.${index}.amt`}
          label="Amount of expense"
          required="Required"
        />
      </Stack>
      <FieldInput
        name={`MentalHealthExpenses.data.${index}.description`}
        label="Description of expense"
        required="Required"
      />
      <FieldInput
        name={`MentalHealthExpenses.data.${index}.notes`}
        label="Enter notes about how the expense was paid or if there is any amount still owing"
      />
      <FieldRadio
        name={`MentalHealthExpenses.data.${index}.receipt`}
        placeholder="None"
        required="Required"
        label={"Do you have receipts or other way of showing the cost (estimate, bill, etc.)?"}
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
      label={`Mental health expenses`}
      name="MentalHealth"
      order={7000}
    >
      <SectionHeader header={`Mental health expenses`} />
      <FieldRadio
        name="MentalHealthExpenses.status"
        placeholder="None"
        required="Required"
        label={
          "Did you seek or will you need mental health services as a result of the crime?"
        }
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {status === "yes" && (
        <FieldRadio
          name="MentalHealthExpenses.current"
          placeholder="None"
          required="Required"
          label={"Have you already received mental health services?"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      )}

      {current === "yes" && (
        <AddAnotherHeader
          header={
            "Add each of your initial mental health expenses below. You will also be\n" +
            "            asked about future ongoing mental health expenses on the following\n" +
            "            screen."
          }
        />
      )}
      {current === "yes" &&
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
      {current === "yes" && additionalExpenses.length <= 2 && (
        <AddPlaceholder label="Add an expense" onClick={addItem} />
      )}
    </FormizStep>
  )
}
