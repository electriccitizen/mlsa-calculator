import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box, Stack } from '@chakra-ui/react'
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { FieldDate } from '../../Fields/FieldDate'
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { v4 as uuidv4 } from "uuid"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]
export const Safety = () => {
  const form = useForm({ subscribe: { fields: ["Safety.status"] } })
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

  const status = state["Safety.status"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldDate
          name={`Safety.data.${index}.date`}
          label="Date of expense"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
        />
        <FieldMoneyInput
          name={`Safety.data.${index}.amt`}
          label="Amount of expense?"
          required="Required"
        />
      </Stack>
      <FieldInput
        name={`Safety.data.${index}.description`}
        label="Description of expense"
        required={"Required"}
      />
      <FieldInput
        name={`Safety.data.${index}.descriptionNotes`}
        label="How does it relate to the crime?"
      />
      <FieldInput
        name={`Safety.data.${index}.notes`}
        label="Notes related to payment"
      />
      <FieldRadio
        name={`Safety.data.${index}.receipt`}
        placeholder="None"
        required="Required"
        label={"Do you have a receipt or other way of showing the cost?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
    </>
  )

  return (
    <FormizStep label={`Safety expenses`} name="Safety" order={13000}>
      <SectionHeader header={`Safety expenses`} />
      <FieldRadio
        name="Safety.status"
        placeholder="None"
        required="Required"
        label={"Did you have to take additional safety precautions?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {status === "yes" && (
        <AddAnotherHeader header={"Add any safety-related expenses below."} />
      )}

      {status === "yes" &&
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
      {status === "yes" && additionalExpenses.length <= 2 && (
        <AddPlaceholder label="Add another" onClick={addItem} />
      )}
    </FormizStep>
  )
}
