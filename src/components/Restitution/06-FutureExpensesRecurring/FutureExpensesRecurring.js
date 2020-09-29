import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { Box, Stack } from "@chakra-ui/core"
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

export const FutureExpensesRecurring = () => {
  const form = useForm({ subscribe: { fields: ["MedicalExpenses.injury"] } })
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
  const expenses = state["FutureExpensesRecurring"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >

        <FieldInput
          name={`FutureExpensesRecurring.${index}.description`}
          label="Estimate when you will incur the expense"
          required="Required"
          helper={"E.g. enter a date range, or a period of time"}
        />
        <FieldInput
          name={`FutureExpensesRecurring.${index}.description`}
          label="Description of expense"
          required="Required"
        />

        <FieldMoneyInput
          name={`FutureExpensesRecurring.${index}.amt`}
          label="Estimated amount of expense"
          required="Required"
          validations={[
            {
              rule: isNumber(),
              message: "Please enter a valid dollar amount a number",
            },
          ]}
          pt={[0, 0, 6]}
        />
      </Stack>

      <FieldInput
        name={`FutureExpensesRecurring.${index}.estimate`}
        label="How did you get your estimate?"
        required="Required"
      />
      <FieldInput
        name={`FutureExpensesRecurring.${index}.notes`}
        label="Do you have other notes related to this expense?
"
      />

    </>
  )

  return form.values.MedicalExpenses &&
    form.values.MedicalExpenses.injury === "yes" ? (
    <FormizStep
      label={`Recurring medical expenses (future)`}
      name="FutureExpensesRecurring"
      order={6000}
    >
      <SectionHeader header={`Future recurring medical expenses `} />
      <FieldRadio
        name="FutureExpensesRecurring"
        placeholder="None"
        required="Required"
        label={
          "Will you have future recurring health expenses? (e.g. Physical therapy or medication)"
        }
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
        helper={"Note: Costs related to mental health services will be calculated later"}
      />

      {expenses === "yes" && (
        <AddAnotherHeader
          header={" Estimate each of your future recurring expenses below."}
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
        <AddPlaceholder label="Add an estimate" onClick={addItem} />
      )}
    </FormizStep>
  ) : null
}
