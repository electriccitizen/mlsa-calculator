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
import { v4 as uuidv4 } from "uuid"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]
export const LostWagesCourt = () => {
  const form = useForm({ subscribe: { fields: ["LostWagesCourt.status"] } })
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

  const status = state["LostWagesCourt.status"]

  const Expense = index => (
    <FieldInput
      name={`LostWagesCourt.${index}.expense`}
      label="How many hours of work did you miss?"
      required="Required"
      validations={[
        {
          rule: isNumber(),
          message: "Please enter a valid dollar amount a number",
        },
      ]}
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`LostWagesCourt.${index}.amt`}
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
      name={`LostWagesCourt.${index}.notes`}
      label="Notes about this entry (e.g. job name)"
    />
  )

  const Receipt = index => (
    <FieldRadio
      name={`LostWagesCourt.${index}.receipt`}
      placeholder="None"
      required="Required"
      label={"Can you show that you missed work?"}
      updateState={updateState}
      options={[
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ]}
    />
  )

  return (
    <FormizStep
      label={`Lost wages (court expenses)`}
      name="LostWagesCourt"
      order={11000}
    >
      <SectionHeader header={`Lost wages (court expenses)`} />
      <FieldRadio
        name="LostWagesCourt.status"
        placeholder="None"
        required="Required"
        label={"Did you miss work to go to court?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

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
              receipt={Receipt(index)}
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
