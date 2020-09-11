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
import { isNumber } from '@formiz/validations'
import { AddAnother, AddAnotherHeader } from '../../Utils/AddAnother'
const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]
export const OtherExpenses = () => {
  const form = useForm({ subscribe: { fields: ["OtherExpenses.status"] } })
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

  const status = state["OtherExpenses.status"]

  const Expense = index => (
    <FieldInput
      name={`OtherExpenses.${index}.expense`}
      label="Describe the expense"
      required="Required"
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`OtherExpenses.${index}.amt`}
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
    <FieldInput name={`OtherExpenses.${index}.notes`} label="Notes" />
  )

  const Receipt = index => (
    <FieldRadio
      name={`OtherExpenses.${index}.receipt`}
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
    <FormizStep label={`Other Expenses`} name="OtherExpenses" order={14000}>
      <SectionWrapper>
        <SectionHeader
          header={`Other Expenses`}
          helpText={{
            text:
              "This question is to account for other expenses that " +
              " may not have been covered elsewhere in this interview. " +
              "Note that not all costs might not be covered.",
          }}
        />
        <FieldRadio
          name="OtherExpenses.status"
          placeholder="None"
          required="Required"
          label={"Did you have any other related expenses?"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />

        {status === "yes" && (
          <>
            <Box borderRadius="lg" width="95%" p={8} mb={4} bg="yellow.50" fontSize={"md"} mb={4}>
              Disclaimer that a lot of things might not be covered
            </Box>
            <AddAnotherHeader header={"Add any other related expenses below."} />
          </>
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
        {status === "yes" &&
          additionalExpenses.length <= 20 && (
            <AddPlaceholder label="Add another expense" onClick={addItem} />
          )}
      </SectionWrapper>
    </FormizStep>
  )
}
