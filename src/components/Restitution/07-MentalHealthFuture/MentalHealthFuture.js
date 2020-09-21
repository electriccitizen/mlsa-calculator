import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { Box } from "@chakra-ui/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { AlertBox } from "../../Utils/AlertBox"
import { v4 as uuidv4 } from "uuid"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]

export const MentalHealthFuture = () => {
  const form = useForm({
    subscribe: { fields: ["MentalHealthExpenses.status"] },
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

  const expenses = state["MentalHealthFutureExpenses"]
  const estimate = state["MentalHealthFuture.est"]

  const Expense = index => (
    <FieldInput
      name={`MentalHealthFuture.${index}.expense`}
      label="Can you estimate how many sessions?"
      required="Required"
      validations={[
        {
          rule: isNumber(),
          message: "Please enter a number",
        },
      ]}
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`MentalHealthFuture.${index}.amt`}
      label="How much does each session cost?"
      required="Required"
      validations={[
        {
          rule: isNumber(),
          message: "Please enter a valid dollar amount a number",
        },
      ]}
    />
  )

  const Note = index => (
    <FieldInput
      name={`MentalHealthFuture.${index}.notes`}
      label="Describe the expense"
    />
  )
  const Note2 = index => (
    <FieldInput
      name={`FutureExpensesRecurring.${index}.notes`}
      label="How did you get those numbers?"
    />
  )
  return form.values.MentalHealthExpenses &&
    form.values.MentalHealthExpenses.status === "yes" ? (
    <FormizStep
      label={`Mental health expenses (future)`}
      name="MentalHealthFuture"
      order={7000}
    >
      <SectionHeader header={`Future mental health expenses`} />
      <FieldRadio
        name="MentalHealthFutureExpenses"
        placeholder="None"
        required="Required"
        label={
          "Will you have future recurring mental health expenses? (e.g. continuing therapy)"
        }
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {expenses === "yes" && (
        <FieldRadio
          name="MentalHealthFuture.est"
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
        <AlertBox>Add info on how to estimate.</AlertBox>
      )}

      {estimate === "yes" && (
        <AddAnotherHeader
          header={"Add your estimated future mental health expenses below."}
        />
      )}
      {estimate === "yes" &&
        additionalExpenses.map((expense, index) => (
          <Box key={index}>
            <AddAnother
              expense={Expense(index)}
              amount={Amount(index)}
              note={Note(index)}
              note2={Note2(index)}
              index={index}
              removeItem={removeItem}
              expenseID={expense.id}
            />
          </Box>
        ))}
      {expenses === "yes" &&
        estimate === "yes" &&
        additionalExpenses.length <= 20 && (
          <AddPlaceholder label="Add an expense" onClick={addItem} />
        )}
    </FormizStep>
  ) : null
}
