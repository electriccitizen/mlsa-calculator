import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { Box } from "@chakra-ui/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"
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

export const PropertyStolenRecovered = () => {
  const form = useForm({
    subscribe: { fields: ["PropertyStolenExpenses.recovered"] },
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

  const damaged = state["PropertyStolenRecovered.damaged"]
  const rental = state["PropertyStolenRecovered.rental"]
  const replaceRepair = state["PropertyStolenRecovered.replaceRepair"]

  const Expense = index => (
    <FieldInput
      name={`PropertyStolenRecovered.${index}.expense`}
      label="Paid (by who) or needs to be paid?"
      required="Required"
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`PropertyStolenRecovered.${index}.amt`}
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
    <FieldInput
      name={`PropertyStolenRecovered.${index}.notes`}
      label="Describe the item/other notes"
    />
  )

  const Receipt = index => (
    <FieldRadio
      name={`PropertyStolenRecovered.${index}.receipt`}
      placeholder="None"
      required="Required"
      label={"Do you have a receipt or other way of showing the cost?"}
      updateState={updateState}
      options={[
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ]}
    />
  )

  return form.values.PropertyStolenExpenses &&
    form.values.PropertyStolenExpenses.recovered === "yes" ? (
    <FormizStep
      label={`Stolen Property (Recovered)`}
      name="PropertyStolenRecovered"
      order={8500}
    >
      <SectionWrapper>
        <SectionHeader
          header={`Stolen Property (Recovered Items)`}
          helpText={{
            text:
              "This question is to help determine any costs related" +
              " to property that was stolen but recovered, including any " +
              "rental, replacement, or repair costs.",
          }}
        />
        <FieldRadio
          name="PropertyStolenRecovered.damaged"
          placeholder="None"
          required="Required"
          label={"Was any of your recovered property damaged?"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        {damaged && (
          <FieldRadio
            name="PropertyStolenRecovered.replaceRepair"
            placeholder="None"
            required="Required"
            label={
              "Did you or will your have to repair any of your recovered items?"
            }
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        )}
        {damaged && (
          <FieldRadio
            name="PropertyStolenRecovered.rental"
            placeholder="None"
            required="Required"
            label={
              "Did you have to rent something while your property was missing?"
            }
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        )}

        {(rental === "yes" || replaceRepair === "yes") && (
          <AddAnotherHeader
            header={
              "Add each of your repair or rental costs for each item below. Include\n" +
              "            any rental costs."
            }
          />
        )}

        {(rental === "yes" || replaceRepair === "yes") &&
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
        {(rental === "yes" || replaceRepair === "yes") &&
          additionalExpenses.length <= 20 && (
            <AddPlaceholder label="Add an expense" onClick={addItem} />
          )}
      </SectionWrapper>
    </FormizStep>
  ) : (
    ""
  )
}
