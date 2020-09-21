import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { Box } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]

export const PropertyDamage = () => {
  const form = useForm({ subscribe: { fields: ["PropertyDamage"] } })
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

  const damage = state["PropertyDamage"]
  const replaceRepair = state["PropertyDamage.replaceRepair"]

  const Expense = index => (
    <FieldInput
      name={`PropertyDamage.${index}.expense`}
      label="Paid by who (or needs to be paid?)"
      required="Required"
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`PropertyDamage.${index}.amt`}
      label="Amount"
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
      name={`PropertyDamage.${index}.notes`}
      label="Describe the item/other notes"
    />
  )

  const Receipt = index => (
    <FieldRadio
      name={`PropertyDamage.${index}.receipt`}
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

  return (
    <FormizStep
      label={`Damaged property expenses`}
      name="PropertyDamage"
      order={9000}
    >
      <SectionHeader header={`Damaged property expenses`} />
      <FieldRadio
        name="PropertyDamage"
        placeholder="None"
        required="Required"
        label={"Was anything damaged during the crime?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {damage === "yes" && (
        <FieldRadio
          name="PropertyDamage.replaceRepair"
          placeholder="None"
          required="Required"
          label={
            "Did you have to repair, clean or replace something or will you need to?"
          }
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      )}

      {damage === "yes" && replaceRepair === "yes" && (
        <AddAnotherHeader
          header={
            "Add each of your repair or replacement costs for any damaged items."
          }
        />
      )}
      {damage === "yes" &&
        replaceRepair === "yes" &&
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
      {damage === "yes" &&
        replaceRepair === "yes" &&
        additionalExpenses.length <= 20 && (
          <AddPlaceholder label="Add an expense" onClick={addItem} />
        )}
    </FormizStep>
  )
}
