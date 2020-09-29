import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { Box } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
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
export const LostWagesFuture = () => {
  const form = useForm({ subscribe: { fields: ["LostWagesFuture.status"] } })
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

  const status = state["LostWagesFuture.status"]

  const Expense = index => (
    <FieldInput
      name={`LostWagesFuture.${index}.expense`}
      label="How many hours of work will you miss?"
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
      name={`LostWagesFuture.${index}.amt`}
      label="How much are you paid per hour?"
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
      name={`LostWagesFuture.${index}.notes`}
      label="How did you estimate that?"
    />
  )

  const Note2 = index => (
    <FieldInput name={`LostWagesFuture.${index}.note2`} label="Notes" />
  )

  return (
    <FormizStep
      label={`Lost wages (future losses)`}
      name="LostWagesFuture"
      order={11000}
    >
      <SectionHeader header={`Lost wages (future losses)`} />
      <FieldRadio
        name="LostWagesFuture.status"
        placeholder="None"
        required="Required"
        label={"Will you miss work in the future from your injuries?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {status === "yes" && (
        <AlertBox>
          Screen about having a lawyer calculate future earnings
        </AlertBox>
      )}

      {status === "yes" && (
        <AddAnotherHeader
          header={
            "Add as many entries as needed for any missed work periods below."
          }
        />
      )}

      {status === "yes" &&
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
      {status === "yes" && additionalExpenses.length <= 20 && (
        <AddPlaceholder label="Add another" onClick={addItem} />
      )}
    </FormizStep>
  )
}
