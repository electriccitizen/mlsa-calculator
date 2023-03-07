import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box, Stack } from '@chakra-ui/react'
import { isNumber } from "@formiz/validations"
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

export const FirstResponderExpenses = () => {
  const form = useForm({ subscribe: { fields: ["MedicalExpenses.expenses"] } })
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

  const expenses = state["FirstResponderExpenses.status"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldDate
          name={`FirstResponderExpenses.data.${index}.date`}
          label="Date of purchase or expense"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
        />
        <FieldMoneyInput
          name={`FirstResponderExpenses.data.${index}.amt`}
          label="Amount of expense"
          required="Required"
        />
      </Stack>
      <FieldInput
        name={`FirstResponderExpenses.data.${index}.description`}
        label="Description of expense"
        required="Required"
      />
      <FieldInput
        name={`FirstResponderExpenses.data.${index}.notes`}
        label="Enter notes about how the expense was paid or if there is any amount still owing"
      />
      <FieldRadio
        name={`FirstResponderExpenses.data.${index}.receipt`}
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


  return form.values.MedicalExpenses &&
    form.values.MedicalExpenses.expenses === "yes" ? (
    <FormizStep
      label={`First responder`}
      name="FirstResponderExpenses"
      order={4000}
    >
      <SectionHeader header={`First responder expenses`} />
      <FieldRadio
        name="FirstResponderExpenses.status"
        placeholder="None"
        required="Required"
        label={"Did your receive help from a first responder?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {expenses === "yes" && (
        <AddAnotherHeader
          header={"Add each of your first responder expenses below."}
        />
      )}
      {expenses === "yes" &&
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
      {expenses === "yes" && additionalExpenses.length <= 2 && (
        <AddPlaceholder label="Add an expense" onClick={addItem} />
      )}
    </FormizStep>
  ) : null
}
