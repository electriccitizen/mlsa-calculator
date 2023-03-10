import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldDate } from "../../Fields/FieldDate"
import { FieldRadio } from "../../Fields/FieldRadio"
import { Box, Stack } from "@chakra-ui/react"
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

export const Funeral = () => {
  const form = useForm({ subscribe: { fields: ["FuneralExpenses"] } })
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
    setAdditionalExpenses(s => s.filter(index => index.id !== id))
  }

  const funeralExpenses = state["FuneralExpenses.status"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldDate
          name={`FuneralExpenses.data.${index}.date`}
          label="Date of purchase or expense"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
        />
        <FieldInput
          name={`FuneralExpenses.data.${index}.amt`}
          label="Amount of expense"
          required="Required"

        />
      </Stack>
      <FieldInput
        name={`FuneralExpenses.data.${index}.description`}
        label="Description of expense"
        required="Required"
      />
      <FieldInput
        name={`FuneralExpenses.data.${index}.notes`}
        label="Enter notes about how the expense was paid or if there is any amount still owing"
      />
      <FieldRadio
        name={`FuneralExpenses.data.${index}.receipt`}
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
    <FormizStep label={`Funeral expenses`} name="FuneralExpenses" order={2000}>
      <SectionHeader header={`Funeral expenses`} />
      <FieldRadio
        name="FuneralExpenses.status"
        placeholder="None"
        required="Required"
        label={"Do you have funeral expenses?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {funeralExpenses === "yes" && (
        <AddAnotherHeader header={"Add your funeral expenses below."} />
      )}
      {funeralExpenses === "yes" &&
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
      {funeralExpenses === "yes" && additionalExpenses.length <= 2 && (
        <>
          <AddPlaceholder label="Add another expense?" onClick={addItem} />
        </>
      )}
    </FormizStep>
  )
}
