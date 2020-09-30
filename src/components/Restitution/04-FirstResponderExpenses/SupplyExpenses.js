import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box, Stack } from '@chakra-ui/core'
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

export const SupplyExpenses = () => {
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

  const expenses = state["SupplyExpenses"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldDate
          name={`SupplyExpenses.${index}.date`}
          label="Date of purchase or expense"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
        />
        <FieldMoneyInput
          name={`SupplyExpenses.${index}.amt`}
          label="Amount of expense"
          required="Required"
          validations={[
            {
              rule: isNumber(),
              message: "Please enter a valid dollar amount a number",
            },
          ]}
        />
      </Stack>
      <FieldInput
        name={`SupplyExpenses.${index}.description`}
        label="Description of expense"
        required="Required"
      />
      <FieldInput
        name={`SupplyExpenses.${index}.notes`}
        label="Enter notes about how the expense was paid or if there is any amount still owing"
      />
      <FieldRadio
        name={`SupplyExpenses.${index}.receipt`}
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
      label={`Medication and medical supplies`}
      name="SupplyExpenses"
      order={4100}
    >
      <SectionHeader header={`Medication and medical supply expenses`} />
      <FieldRadio
        name="SupplyExpenses"
        placeholder="None"
        required="Required"
        label={"Did you have to take medication or get any medical supplies (for example crutches or a sling)?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {expenses === "yes" && (
        <AddAnotherHeader
          header={"Add each of your medicine or medical supply expenses below."}
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
      {expenses === "yes" && additionalExpenses.length <= 20 && (
        <AddPlaceholder label="Add an expense" onClick={addItem} />
      )}
    </FormizStep>
  ) : null
}
