import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { Box, Stack } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { v4 as uuidv4 } from "uuid"
import { FieldDate } from "../../Fields/FieldDate"

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
  const onetime = state["MedicalExpenses.onetime"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldDate
          name={`MedicalExpenses.${index}.date`}
          label="Date of purchase or expense"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
        />
        <FieldMoneyInput
          name={`MedicalExpenses.${index}.amt`}
          label="Amount of expense"
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
        name={`MedicalExpenses.${index}.description`}
        label="Description of expense"
        required="Required"
      />
      <FieldInput
        name={`MedicalExpenses.${index}.notes`}
        label="Enter notes about how the expense was paid or if there is any amount still owing"
      />
      <FieldRadio
        name={`MedicalExpenses.${index}.receipt`}
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
    <FormizStep label={`Medical expenses`} name="MedicalExpenses" order={3000}>
      <SectionHeader
        header={`Medical expenses`}
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
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      )}
      {expenses === "yes" && (
        <FieldRadio
          name="MedicalExpenses.onetime"
          placeholder="None"
          required="Required"
          label={"Did you have any one-time medical expenses?"}
          helper={"You will also be asked about first responder expenses, and other future ongoing medical expenses."}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      )}

      {onetime === "yes" && (
        <AddAnotherHeader
          header={
            " Add each of your initial medical expenses below. "
          }
        />
      )}
      {onetime === "yes" &&
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
      {onetime === "yes" && additionalExpenses.length <= 20 && (
        <AddPlaceholder label="Add an expense" onClick={addItem} />
      )}
    </FormizStep>
  )
}
