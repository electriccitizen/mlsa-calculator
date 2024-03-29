import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box, Stack } from "@chakra-ui/react"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { AlertBox } from "../../Utils/AlertBox"
import { v4 as uuidv4 } from "uuid"
import { FieldDate } from "../../Fields/FieldDate"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]

export const FutureExpenses = () => {
  const form = useForm({ subscribe: { fields: ["MedicalExpenses.expenses"] } })
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
  const expenses = state["FutureExpenses.status"]
  const estimate = state["FutureExpenses.est"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldDate
          name={`FutureExpenses.data.${index}.date`}
          label="Estimate when you will incur the expense"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
        />
        <FieldMoneyInput
          name={`FutureExpenses.data.${index}.amt`}
          label="Estimated amount of expense"
          required="Required"
          pt={[0, 0, 6]}
        />
      </Stack>
      <FieldInput
        name={`FutureExpenses.data.${index}.description`}
        label="Description of expense"
        required="Required"
      />
      <FieldInput
        name={`FutureExpenses.data.${index}.estimate`}
        label="How did you get your estimate?"
        required="Required"
      />
      <FieldInput
        name={`FutureExpenses.data.${index}.notes`}
        label="Do you have other notes related to this expense?
"
      />
      <FieldRadio
        name={`FutureExpenses.data.${index}.receipt`}
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
  return form.values.MedicalExpenses &&
    form.values.MedicalExpenses.expenses === "yes" ? (
    <FormizStep
      label={`Future expenses`}
      name="FutureExpenses"
      order={5000}
    >
      <SectionHeader
        header={`Future medical expenses`}
        helpText={{
          text:
            "This question is for one-time future medical expenses." +
            " Any ongoing future" +
            " expenses (e.g. ongoing therapy) are addressed in " +
            " the next question.",
        }}
      />
      <FieldRadio
        name="FutureExpenses.status"
        placeholder="None"
        required="Required"
        label={
          "Will you have future one-time medical expenses related to your injuries? (e.g. Surgery)"
        }
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {expenses === "yes" && (
        <FieldRadio
          name="FutureExpenses.est"
          placeholder="None"
          required="Required"
          label={"Do you have estimates for your costs?"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      )}
      {expenses === "yes" && estimate === "yes" && (
        <AddAnotherHeader
          header={"Add each of your future one-time expenses below."}
        />
      )}
      {expenses === "yes" && estimate === "no" && (
        <AlertBox>Talk to your provider about getting an estimate on how much care you will need in the future and what the cost of that care will be. Let the provider know the reason you are asking is for restitution. A prosecutor may want your provider to give them paperwork with their estimate, or even come to court to say how they came up with the estimated cost.</AlertBox>
      )}
      {expenses === "yes" &&
        estimate === "yes" &&
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
      {expenses === "yes" &&
        estimate === "yes" &&
        additionalExpenses.length <= 2 && (
          <AddPlaceholder label="Add an expense" onClick={addItem} />
        )}
    </FormizStep>
  ) : null
}
