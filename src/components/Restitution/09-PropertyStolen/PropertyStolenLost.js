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

export const PropertyStolenLost = () => {
  const form = useForm({
    subscribe: { fields: ["PropertyStolenExpenses.stolen"] },
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

  const replace = state["PropertyStolenLost.replace"]

  const Expense = index => (
    <FieldInput
      name={`PropertyStolenLost.${index}.expense`}
      label="Paid (by who) or needs to be paid?"
      required="Required"
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`PropertyStolenLost.${index}.amt`}
      label="Cost of repair or replacement?"
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
      name={`PropertyStolenLost.${index}.notes`}
      label="Description of item/other notes"
    />
  )

  const Receipt = index => (
    <FieldRadio
      name={`PropertyStolenLost.${index}.receipt`}
      placeholder="None"
      required="Required"
      label={"Do you have a receipt?"}
      updateState={updateState}
      options={[
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ]}
    />
  )

  return form.values.PropertyStolenExpenses &&
    form.values.PropertyStolenExpenses.stolen === "yes" ? (
    <FormizStep
      label={`Stolen property (lost items)`}
      name="PropertyStolenLost"
      order={9750}
    >
      <SectionHeader header={`Stolen property (lost items)`} />

      <FieldRadio
        name="PropertyStolenLost.replace"
        placeholder="None"
        required="Required"
        label={
          "Did you replace or will you need to replace any of your lost items?"
        }
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {replace === "yes" && (
        <AddAnotherHeader
          header={"Add each of your replacement costs for each item below."}
        />
      )}

      {replace === "yes" &&
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
      {replace === "yes" && additionalExpenses.length <= 20 && (
        <AddPlaceholder label="Add an expense" onClick={addItem} />
      )}
    </FormizStep>
  ) : null
}
