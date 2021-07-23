import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { Box, Stack } from "@chakra-ui/react"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { FieldDate } from "../../Fields/FieldDate"
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

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldDate
          name={`PropertyDamage.${index}.date`}
          label="Date of purchase or expense"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
        />
        <FieldMoneyInput
          name={`PropertyDamage.${index}.itemCost`}
          label="Cost of repair or replacement?"
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
        <FieldMoneyInput
          name={`PropertyDamage.${index}.amtInsurance`}
          label="Amount paid by insurance"
          required="Required"
          validations={[
            {
              rule: isNumber(),
              message: "Please enter a valid dollar amount a number",
            },
          ]}
        />
        <FieldMoneyInput
          name={`PropertyDamage.${index}.amt`}
          label="Amount paid by you"
          required="Required"
          validations={[
            {
              rule: isNumber(),
              message: "Please enter a valid dollar amount a number",
            },
          ]}
        />
      </Stack>
      <FieldInput
        name={`PropertyDamage.${index}.notes`}
        label="Describe the expense and how it relates to the crime"
      />
      <FieldRadio
        name={`PropertyDamage.${index}.receipt`}
        placeholder="None"
        required="Required"
        label={
          "Do you have receipts or other way of showing the cost (estimate, bill, etc.)?"
        }
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
      label={`Damaged property`}
      name="PropertyDamage"
      order={10000}
    >
      <SectionHeader header={`Damaged property expenses`} />
      <FieldRadio
        name="PropertyDamage"
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
      {damage === "yes" && (
        <AddAnotherHeader
          header={
            "Add each of your repair or replacement costs for any damaged items."
          }
        />
      )}
      {damage === "yes" &&
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
      {damage === "yes" &&
        additionalExpenses.length <= 20 && (
          <AddPlaceholder label="Add an expense" onClick={addItem} />
        )}
    </FormizStep>
  )
}
