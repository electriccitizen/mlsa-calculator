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

export const MentalHealth = () => {
  const form = useForm({ subscribe: form })
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

  const status = state["MentalHealthExpenses.status"]
  const current = state["MentalHealthExpenses.current"]

  const Expense = index => (
    <FieldInput
      name={`MentalHealthExpenses.${index}.expense`}
      label="Paid by who (or needs to be paid?)"
      required="Required"
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`MentalHealthExpenses.${index}.amt`}
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
    <FieldInput name={`MentalHealthExpenses.${index}.notes`} label="Notes" />
  )

  const Receipt = index => (
    <FieldRadio
      name={`MentalHealthExpenses.${index}.receipt`}
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
      label={`Mental Health Expenses`}
      name="MentalHealth"
      order={6000}
    >
      <SectionWrapper>
        <SectionHeader header={`Mental Health Expenses`} />
        <FieldRadio
          name="MentalHealthExpenses.status"
          placeholder="None"
          required="Required"
          label={
            "Did you seek or will you need mental health services as a result of the crime?"
          }
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        {status === "yes" && (
          <FieldRadio
            name="MentalHealthExpenses.current"
            placeholder="None"
            required="Required"
            label={"Have you already received mental health services?"}
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        )}

        {current === "yes" && (
          <AddAnotherHeader
            header={
              "Add each of your initial mental health expenses below. You will also be\n" +
              "            asked about future ongoing mental health expenses on the following\n" +
              "            screen."
            }
          />
        )}
        {current === "yes" &&
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
        {current === "yes" && additionalExpenses.length <= 20 && (
          <AddPlaceholder label="Add an expense" onClick={addItem} />
        )}
      </SectionWrapper>
    </FormizStep>
  )
}
