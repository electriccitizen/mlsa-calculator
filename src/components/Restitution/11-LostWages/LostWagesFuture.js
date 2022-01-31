import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { Box, Stack } from "@chakra-ui/react"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { AlertBox } from "../../Utils/AlertBox"
import { v4 as uuidv4 } from "uuid"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]
export const LostWagesFuture = () => {
  const form = useForm({ subscribe: { fields: ["LostWagesFuture.status"] } })
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

  const status = state["LostWagesFuture.status"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`LostWagesFuture.data.${index}.description`}
          label="Describe the future loss"
        />
        <FieldMoneyInput
          name={`LostWagesFuture.data.${index}.amt`}
          label="Estimate the amount of future loss"
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
        name={`LostWagesFuture.data.${index}.notes`}
        label="How did you estimate that?"
      />
      <FieldInput name={`LostWagesFuture.data.${index}.note2`} label="Do you have any other notes?" />
    </>
  )

  return (
    <FormizStep
      label={`Lost wages (future)`}
      name="LostWagesFuture"
      order={11300}
    >
      <SectionHeader header={`Lost wages (future)`} />
      <FieldRadio
        name="LostWagesFuture.status"
        placeholder="None"
        required="Required"
        label={"Will you miss work in the future from your injuries?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {status === "yes" && (
        <AlertBox>
          You may want to talk to a lawyer to calculate money you lost from
          future work do to the crime.
        </AlertBox>
      )}

      {status === "yes" && (
        <AddAnotherHeader
          header={
            "Add as many entries as needed for any future missed work periods below."
          }
        />
      )}

      {status === "yes" &&
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
      {status === "yes" && additionalExpenses.length <= 2 && (
        <AddPlaceholder label="Add another" onClick={addItem} />
      )}
    </FormizStep>
  )
}
