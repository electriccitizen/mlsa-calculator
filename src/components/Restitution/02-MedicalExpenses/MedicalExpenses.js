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

export const MedicalExpenses = () => {
  const form = useForm({ subscribe: false })
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

  const injury = state["MedicalExpenses.injury"]
  const expenses = state["MedicalExpenses.expenses"]

  const Expense = index => (
    <FieldInput
      name={`MedicalExpenses.${index}.expense`}
      label="Paid by who (or needs to be paid?)"
      required="Required"
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`MedicalExpenses.${index}.amt`}
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
    <FieldInput name={`MedicalExpenses.${index}.notes`} label="Notes" />
  )

  const Receipt = index => (
    <FieldRadio
      name={`MedicalExpenses.${index}.receipt`}
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
    <FormizStep label={`Injury expenses`} name="MedicalExpenses" order={2000}>
      <SectionHeader
        header={`Injury expenses`}
        helpText={{
          text:
            "This section is focused on physical" +
            " injuries and initial medical costs." +
            " You will also be asked about future medical expenses," +
            " and non-physical injuries (e.g. mental health costs).",
        }}
      />
      <FieldRadio
        name="MedicalExpenses.injury"
        placeholder="None"
        required="Required"
        label={"Were you hurt or injured during the crime?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {injury === "yes" && (
        <FieldRadio
          name="MedicalExpenses.expenses"
          placeholder="None"
          required="Required"
          label={
            "Did you seek medical attention or incur any medical expenses? "
          }
          helper={"Do not include first responder expenses"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      )}

      {expenses === "yes" && (
        <AddAnotherHeader
          header={
            " Add each of your initial medical expenses below. You will also be\n" +
            "            asked about first responder expenses, and other future ongoing or\n" +
            "            one-time medical expenses."
          }
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
    </FormizStep>
  )
}
