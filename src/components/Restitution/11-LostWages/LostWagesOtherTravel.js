import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { Box, Stack } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"
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
export const LostWagesOtherTravel = () => {
  const form = useForm({
    subscribe: { fields: ["LostWagesCourtTravel.other"] },
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

  const status = state["LostWagesOtherTravel.status"]

  const Note = index => (
    <>
      <FieldDate
        name={`LostWagesOtherTravel.${index}.date`}
        label="Date of travel"
        required="Required"
        type="text"
        placeholder="MM/DD/YYYY"
      />
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`LostWagesOtherTravel.${index}.notes`}
          label="Why did you miss work?"
        />
        <FieldInput
          name={`LostWagesOtherTravel.${index}.expense`}
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
        name={`LostWagesOtherTravel.${index}.amt`}
        label="What is your hourly wage?"
        required="Required"
        helper={
          "To determine your hourly wage if you are on salary, divide your annual salary by 2,080."
        }
        validations={[
          {
            rule: isNumber(),
            message: "Please enter a valid dollar amount a number",
          },
        ]}
      />
      <FieldRadio
        name={`LostWagesOtherTravel.${index}.receipt`}
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

  return form.values.LostWagesCourtTravel &&
    form.values.LostWagesCourtTravel.other === "yes" ? (
    <FormizStep
      label={`Lost wages (other travel)`}
      name="LostWagesOther"
      order={11500}
    >
      <SectionHeader header={`Lost wages (other travel)`} />
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
      {status === "yes" && additionalExpenses.length <= 20 && (
        <AddPlaceholder label="Add another" onClick={addItem} />
      )}
    </FormizStep>
  ) : (
    ""
  )
}
