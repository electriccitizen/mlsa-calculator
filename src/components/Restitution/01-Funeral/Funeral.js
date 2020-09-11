import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { Box, IconButton, Input, Stack } from "@chakra-ui/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FaTrashAlt } from "react-icons/fa"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { v4 as uuidv4 } from "uuid"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]

export const Funeral = () => {
  const form = useForm({ subscribe: { fields: ["FuneralExpenses"] } })
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
    setAdditionalExpenses(s => s.filter(index => index.id !== id))
  }
  const funeralExpenses = state["FuneralExpenses"]

  const Expense = index => (
    <FieldInput
      name={`FuneralExpenses.${index}.expense`}
      label="Paid by who (or needs to be paid?)"
      required="Required"
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`FuneralExpenses.${index}.amt`}
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
    <FieldInput name={`FuneralExpenses.${index}.notes`} label="Notes" />
  )

  const Receipt = index => (
    <FieldRadio
      name={`FuneralExpenses.${index}.receipt`}
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
    <FormizStep label={`Funeral Expenses`} name="FuneralExpenses" order={1000}>
      <SectionWrapper>
        <SectionHeader header={`Funeral Expenses`} />
        <FieldRadio
          name="FuneralExpenses"
          placeholder="None"
          required="Required"
          label={"Do you have funeral expenses?"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        {funeralExpenses === "yes" && (
          <AddAnotherHeader header={"Add your funeral expenses below."} />
        )}
        {funeralExpenses === "yes" &&
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
        {funeralExpenses === "yes" && additionalExpenses.length <= 20 && (
          <>
            <AddPlaceholder label="Add another expense?" onClick={addItem} />
          </>
        )}
      </SectionWrapper>
    </FormizStep>
  )
}
