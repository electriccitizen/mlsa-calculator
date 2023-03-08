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
import { AlertBox } from "../../Utils/AlertBox"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]

export const FutureExpensesRecurring = () => {
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
  const expenses = state["FutureExpensesRecurring.status"]
  const estimate = state["FutureExpensesRecurring.est"]
  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`FutureExpensesRecurring.data.${index}.timeestimate`}
          label={"Estimate the period of time you will need treatment"}
          helper={"e.g. three months or one year"}
          required="Required"
        />
        <FieldInput
          name={`FutureExpensesRecurring.data.${index}.sessions`}
          label={"Can you estimate how many sessions or treatments?"}
          required="Required"
        />
      </Stack>
      <FieldMoneyInput
        name={`FutureExpensesRecurring.data.${index}.amt`}
        label="Estimated cost of each session or prescription"
        required="Required"
      />
      <FieldInput
        name={`FutureExpensesRecurring.data.${index}.description`}
        label="Describe the expense"
        required="Required"
      />

      <FieldInput
        name={`FutureExpensesRecurring.data.${index}.estimate`}
        label="How did you get your estimates?"
        required="Required"
      />
      <FieldInput
        name={`FutureExpensesRecurring.data.${index}.notes`}
        label="Do you have other notes related to this expense?
"
      />
    </>
  )

  return form.values.MedicalExpenses &&
    form.values.MedicalExpenses.expenses === "yes" ? (
    <FormizStep
      label={`Future expenses (recurring)`}
      name="FutureExpensesRecurring"
      order={6000}
    >
      <SectionHeader header={`Recurring medical expenses (future)`} />
      <FieldRadio
        name="FutureExpensesRecurring.status"
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
        helper={
          "Note: Costs related to mental health services will be calculated later"
        }
      />
      {expenses === "yes" && (
        <FieldRadio
          name="FutureExpensesRecurring.est"
          placeholder="None"
          required="Required"
          label={"Do you have estimates for your costs?"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      )}
      {expenses === "yes" && estimate === "no" && (
        <AlertBox>Talk to your provider about getting an estimate on how much care you will need in the future and what the cost of that care will be. Let the provider know the reason you are asking is for restitution. A prosecutor may want your provider to give them paperwork with their estimate, or even come to court to say how they came up with the estimated cost.</AlertBox>
      )}
      {estimate === "yes" && (
        <AddAnotherHeader
          header={" Estimate each of your future recurring expenses below."}
        />
      )}
      {estimate === "yes" &&
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
      {estimate === "yes" && additionalExpenses.length <= 2 && (
        <AddPlaceholder label="Add an estimate" onClick={addItem} />
      )}
    </FormizStep>
  ) : null
}
