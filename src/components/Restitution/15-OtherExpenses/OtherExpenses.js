import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box, Stack } from "@chakra-ui/react"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"
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

  const status = state["Other.status"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldDate
          name={`Other.data.${index}.date`}
          label="Date of expense"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
        />
        <FieldMoneyInput
          name={`Other.data.${index}.amt`}
          label="Amount of expense?"
          required="Required"
        />
      </Stack>
      <FieldInput
        name={`Other.data.${index}.description`}
        label="Description of expense"
        required={"Required"}
      />
      <FieldInput
        name={`Other.data.${index}.descriptionNotes`}
        label="Please describe how the expense relates to the crime"
      />
      <FieldInput
        name={`Other.data.${index}.notes`}
        label="Notes related to payment"
      />
      <FieldRadio
        name={`Other.data.${index}.receipt`}
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
    <FormizStep label={`Other expenses`} name="OtherExpenses" order={15000}>
      <SectionHeader
        header={`Other expenses`}
        helpText={{
          text:
            "This question is to account for other expenses that " +
            " may not have been covered elsewhere in this interview. " +
            "Note that not all costs might not be covered.",
        }}
      />
      <FieldRadio
        name="Other.status"
        placeholder="None"
        required="Required"
        label={
          "Did you have other expenses? (e.g. child care while at court.) "
        }
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {status === "yes" && (
        <>
          <AlertBox>
            This tool is meant to help victims determine estimate the financial
            costs that arose out of a crime and their victimization. The Court
            may or may not take some of these expenses into account when
            ordering the defendant to pay restitution. Additionally, restitution
            is not a remedy for immediate financial compensation from
            defendants. If you need immediate financial assistance to cover
            expenses related to the crime, consider applying for Crime Victim
            Compensation or contacting a private attorney for additional
            information.
          </AlertBox>
          <AddAnotherHeader header={"Add any other related expenses below."} />
        </>
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
        <AddPlaceholder label="Add another expense" onClick={addItem} />
      )}
    </FormizStep>
  )
}
