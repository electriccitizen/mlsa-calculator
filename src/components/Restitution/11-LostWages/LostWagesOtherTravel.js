import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { Box, Stack } from "@chakra-ui/react"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"
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
export const LostWagesOtherTravel = () => {
  const form = useForm({
    subscribe: { fields: ["LostWagesCarTravel.status"] },
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

  const status = state["LostWagesOtherTravel.status"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldDate
          name={`LostWagesOtherTravel.data.${index}.date`}
          label="Date of travel"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
        />
        <FieldMoneyInput
          name={`LostWagesOther.data.${index}.amt`}
          label="How much was the expense?"
          required="Required"
          validations={[
            {
              rule: isNumber(),
              message: "Please enter a valid dollar amount a number",
            },
          ]}
        />
      </Stack>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`LostWagesOtherTravel.data.${index}.notes`}
          label="What was the reason for travel?"
        />
        <FieldInput
          name={`LostWagesOtherTravel.data.${index}.description`}
          label="Describe what kind of travel expense"
          required="Required"
        />
      </Stack>

      <FieldRadio
        name={`LostWagesOtherTravel.data.${index}.receipt`}
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
    <FormizStep
      label={`Travel expenses (other travel)`}
      name="LostWagesOtherTravel"
      order={11500}
    >
      <SectionHeader header={`Travel expenses (other travel)`} />
      <FieldRadio
        name="LostWagesOtherTravel.status"
        placeholder="None"
        required="Required"
        label={
          "Did you have other travel expense? For example did you have to take public transit or fly to a different city for a surgery?"
        }
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {status === "yes" && (
        <AddAnotherHeader
          header={"Add as many entries as needed for related travel expenses."}
        />
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
