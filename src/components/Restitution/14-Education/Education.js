import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"
import { AlertBox } from "../../Utils/AlertBox"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { v4 as uuidv4 } from "uuid"
import { Box, Stack } from "@chakra-ui/react"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { isNumber } from "@formiz/validations"
import { FieldInput } from "../../Fields/FieldInput"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "Default name",
  },
]

export const Education = () => {
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
  const status = state["Education.status"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`Education.${index}.date`}
          label="What was the date you incurred the loss?"
          required={"Required"}
          helper={"e.g. Winter semester 2019"}
        />
        <FieldMoneyInput
          name={`Education.${index}.expense`}
          label="Amount of expense?"
          required="Required"
          pt={[0, 0, 6]}
          validations={[
            {
              rule: isNumber(),
              message: "Please enter a number",
            },
          ]}
        />
      </Stack>
      <FieldInput
        name={`Education.${index}.description`}
        label="Description of the loss"
        required={"Required"}
      />
      <FieldInput
        name={`Education.${index}.descriptionNotes`}
        label="Please describe how the crime impacted your schooling"
      />
      <FieldInput
        name={`Education.${index}.payment`}
        label="Notes related to payment"
      />

      <FieldRadio
        name={`Education.${index}.receipt`}
        placeholder="None"
        required="Required"
        label={"Do you have a receipt or other way of showing the cost?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
    </>
  )

  return (
    <FormizStep label={`Loss of education`} name="Education" order={14000}>
      <SectionHeader header={`Loss of education`} />
      <FieldRadio
        name="Education.status"
        placeholder="None"
        required="Required"
        label={"Did the victimization keep you from participating in school?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {status === "yes" && (
        <AlertBox>
          If you had any trouble participating in school or school related
          activities as a result of the crime, you may want to seek Title IX
          assistance from a licensed attorney. Educational loss expenses might
          include lost tuition costs, books, or other costs associated with
          education that were lost due to the crime.
        </AlertBox>
      )}

      {status === "yes" && (
        <AddAnotherHeader
          header={"Add any loss of education expenses below."}
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
  )
}
