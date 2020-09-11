import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { Box, IconButton, Stack } from "@chakra-ui/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"
import { FaTrashAlt } from "react-icons/fa"
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

export const FirstResponderExpenses = () => {
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

  const expenses = state["FirstResponderExpenses"]

  const Expense = index => (
    <FieldInput
      name={`FirstResponderExpenses.${index}.expense`}
      label="Paid by who (or needs to be paid?)"
      required="Required"
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`FirstResponderExpenses.${index}.amt`}
      label="Amount"
      required="Required"
      validations={[
        {
          rule: isNumber(),
          message: "This is not a number",
        },
      ]}
    />
  )

  const Note = index => (
    <FieldInput name={`FirstResponderExpenses.${index}.notes`} label="Notes" />
  )

  const Receipt = index => (
    <FieldRadio
      name={`FirstResponderExpenses.${index}.receipt`}
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

  return form.values.MedicalExpenses &&
    form.values.MedicalExpenses.injury === "yes" ? (
    <FormizStep
      label={`First Responder Expenses`}
      name="FirstResponderExpenses"
      order={3000}
    >
      <SectionWrapper>
        <SectionHeader header={`First Responder Expenses`} />
        <FieldRadio
          name="FirstResponderExpenses"
          placeholder="None"
          required="Required"
          label={"Did you have any first responder expenses?"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />

        {expenses === "yes" && (
          <AddAnotherHeader
            header={"Add each of your first responder expenses below."}
          />
        )}
        {expenses === "yes" &&
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
        {expenses === "yes" && additionalExpenses.length <= 20 && (
          <AddPlaceholder label="Add an expense" onClick={addItem} />
        )}
      </SectionWrapper>
    </FormizStep>
  ) : (
    ""
  )
}
