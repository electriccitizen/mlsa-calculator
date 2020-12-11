import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { Box, Stack } from "@chakra-ui/react"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { v4 as uuidv4 } from "uuid"
import { FieldDate } from "../../Fields/FieldDate"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]
export const Moving = () => {
  const form = useForm({ subscribe: { fields: ["Moving.status"] } })
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

  const status = state["Moving.status"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldDate
          name={`Moving.${index}.date`}
          label="Date of expense"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
        />
        <FieldMoneyInput
          name={`Working.${index}.expense`}
          label="Amount of expense?"
          required="Required"
          validations={[
            {
              rule: isNumber(),
              message: "Please enter a number",
            },
          ]}
        />
      </Stack>
      <FieldInput
        name={`Working.${index}.description`}
        label="Description of expense"
        required={"Required"}
      />
      <FieldInput
        name={`Working.${index}.descriptionNotes`}
        label="How does it relate to the crime?"
      />
      <FieldInput
        name={`Working.${index}.notes`}
        label="Notes related to payment"
      />
      <FieldRadio
        name={`Working.${index}.receipt`}
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
    <FormizStep label={`Moving expenses`} name="Moving" order={12000}>
      <SectionHeader header={`Moving expenses`} />
      <FieldRadio
        name="Moving.status"
        placeholder="None"
        required="Required"
        label={"Did you have to move because of the crime?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {status === "yes" && (
        <AddAnotherHeader header={"Add any moving expenses below."} />
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
      {status === "yes" && additionalExpenses.length <= 20 && (
        <AddPlaceholder label="Add another" onClick={addItem} />
      )}
    </FormizStep>
  )
}
