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
export const LostWages = () => {
  const form = useForm({ subscribe: { fields: ["LostWages.status"] } })
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

  const status = state["LostWages.status"]

  const Expense = index => (
    <FieldInput
      name={`LostWages.${index}.expense`}
      label="How many hours of work did you miss?"
      required="Required"
      validations={[
        {
          rule: isNumber(),
          message: "This is not a number",
        },
      ]}
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`LostWages.${index}.amt`}
      label="How much are you paid per hour?"
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
    <FieldInput
      name={`LostWages.${index}.notes`}
      label="Notes about this entry (e.g. job name)"
    />
  )

  const Receipt = index => (
    <FieldRadio
      name={`LostWages.${index}.receipt`}
      placeholder="None"
      required="Required"
      label={"Can you show that you missed work?"}
      updateState={updateState}
      fieldWidth={"25%"}
      options={[
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ]}
    />
  )

  return (
    <FormizStep label={`Lost Wages`} name="LostWages" order={10000}>
      <SectionWrapper>
        <SectionHeader header={`Lost Wages`} />
        <FieldRadio
          name="LostWages.status"
          placeholder="None"
          required="Required"
          label={"Did you miss work from being injured?"}
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
        {status === "yes" && additionalExpenses.length <= 20 && (
          <AddPlaceholder label="Add another" onClick={addItem} />
        )}
      </SectionWrapper>
    </FormizStep>
  )
}
