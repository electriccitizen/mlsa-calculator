import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { Box } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { v4 as uuidv4 } from "uuid"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]
export const LostWagesOther = () => {
  const form = useForm({ subscribe: { fields: ["LostWagesOther.status"] } })
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

  const status = state["LostWagesOther.status"]

  const Expense = index => (
    <FieldInput
      name={`LostWagesOther.${index}.expense`}
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
      name={`LostWagesOther.${index}.amt`}
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
      name={`LostWagesOther.${index}.notes`}
      label="Notes about this entry (e.g. job name)"
    />
  )

  const Receipt = index => (
    <FieldRadio
      name={`LostWagesOther.${index}.receipt`}
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
      label={`Lost wages (other losses)`}
      name="LostWagesOther"
      order={10000}
    >
      <SectionHeader header={`Lost wages (other losses)`} />
      <FieldRadio
        name="LostWagesOther.status"
        placeholder="None"
        required="Required"
        label={
          "Did you miss work to participate in the investigation and prosecution of the crime (other than going to court)?"
        }
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