import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { Box, Stack } from '@chakra-ui/react'
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

  const Note = index => (
    <>
      <FieldInput
        name={`LostWagesOther.data.${index}.dates`}
        label="What day or days did you miss work?"
        helper={"Enter an exact date, or a range of dates"}
      />
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`LostWagesOther.data.${index}.notes`}
          label="Why did you miss work?"
        />
        <FieldInput
          name={`LostWagesOther.data.${index}.hours`}
          label="How many hours of work did you miss?"
          required="Required"
          validations={[
            {
              rule: isNumber(),
              message: "Please enter a number",
            },
          ]}
        />

      </Stack>
      <FieldMoneyInput
        name={`LostWagesOther.data.${index}.amt`}
        label="What is your hourly wage?"
        required="Required"
        helper={"To determine your hourly wage if you are on salary, divide your annual salary by 2,080."}
        validations={[
          {
            rule: isNumber(),
            message: "Please enter a valid dollar amount a number",
          },
        ]}
      />
      <FieldRadio
        name={`LostWagesOther.data.${index}.receipt`}
        placeholder="None"
        required="Required"
        label={"Do you have any documents that show you missed work?"}
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
      label={`Lost wages (other reasons)`}
      name="LostWagesOther"
      order={11200}
    >
      <SectionHeader header={`Lost wages (other reasons)`} />
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
