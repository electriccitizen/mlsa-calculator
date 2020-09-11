import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { Box } from "@chakra-ui/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { isNumber } from "@formiz/validations"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
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

  const Expense = index => (
    <FieldInput
      name={`FutureExpensesRecurring.${index}.expense`}
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
      name={`FutureExpensesRecurring.${index}.amt`}
      label="How much does each session cost?"
      required="Required"
      validations={[
        {
          rule: isNumber(),
          message: "This is not a number",
        },
      ]}
    />
  )

  const Note2 = index => (
    <FieldInput
      name={`FutureExpensesRecurring.${index}.notes`}
      label="How did you get those numbers?"
    />
  )

  const Note = index => (
    <FieldInput
      name={`FutureExpensesRecurring.${index}.note2`}
      label="Describe the expense "
      required="Required"
      helper={"(e.g. physical therapy)"}
    />
  )


  return form.values.MedicalExpenses &&
    form.values.MedicalExpenses.injury === "yes" ? (
    <FormizStep label={`Recurring Medical Expenses (Future)`} name="FutureExpensesRecurring" order={5000}>
      <SectionWrapper>
        <SectionHeader header={`Future Recurring Medical Expenses `} />
        <FieldRadio
          name="FutureExpensesRecurring"
          placeholder="None"
          required="Required"
          label={
            "Will you have future recurring health expenses? (e.g. Physical therapy)"
          }
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
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
        {expenses === "yes" && additionalExpenses.length <= 20 && (
          <AddPlaceholder label="Add an estimate" onClick={addItem} />
        )}
      </SectionWrapper>
    </FormizStep>
  ) : (
    ""
  )
}
