import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box, Stack } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
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
export const LostWagesCarTravel = () => {
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

  const car = state["LostWagesCarTravel.car"]

  const Note = index => (
    <>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldDate
          name={`LostWagesCarTravel.${index}.date`}
          label="Date of travel"
          required="Required"
          type="text"
          placeholder="MM/DD/YYYY"
          pt={[0, 0, 6]}
        />
        <FieldInput
          name={`LostWagesCarTravel.${index}.notes`}
          label="How many miles did you travel round trip?"
        />
      </Stack>
      <Box mb="4" fontSize={"sm"}>
        See:{" "}
        <a
          isExternal
          href={"https://www.irs.gov/tax-professionals/standard-mileage-rates"}
        >
          IRS Standard Mileage Rates
        </a>
      </Box>

      <FieldInput
        name={`LostWagesCarTravel.${index}.notes`}
        label="What was the reason for the travel?"
      />
    </>
  )

  return (
    <FormizStep
      label={`Travel expenses (car travel)`}
      name="LostWagesCarTravel"
      order={11400}
    >
      <SectionHeader header={`Travel expenses (car travel)`} />
      <FieldRadio
        name="LostWagesCarTravel.status"
        placeholder="None"
        required="Required"
        label={
          "Did you have to travel for court, to participate in the criminal court process or to get treatment for injuries, including mental health services?"
        }
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      <FieldRadio
        name="LostWagesCarTravel.car"
        placeholder="None"
        required="Required"
        label={"Did you travel by car?"}
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />

      {car === "yes" && (
        <AddAnotherHeader
          header={
            "Add as many entries as needed for car-related travel expenses below"
          }
        />
      )}

      {car === "yes" &&
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
      {car === "yes" && additionalExpenses.length <= 20 && (
        <AddPlaceholder label="Add another" onClick={addItem} />
      )}
    </FormizStep>
  )
}
