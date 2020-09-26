import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddAnother } from "../../Utils/AddAnother"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"
import { v4 as uuidv4 } from "uuid"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "",
  },
]

export const StandardOfLiving = () => {
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
  const Expense = index => (
    <FieldInput
      name={`StandardOfLiving.other.${index}.desc`}
      label="Describe the adjustment"
      required="Required"
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`StandardOfLiving.other.${index}.amt`}
      label="Annual Amount"
      required="Required"
    />
  )
  return (
    <FormizStep
      label="Your Long Distance Parenting and Standard of Living adjustment"
      name={`StandardOfLiving`}
      order={16000}
    >
      <SectionHeader
        header={`Your Long Distance Parenting and Standard of Living adjustment`}
        helpText={{ text: "See the User's Manual for to find out if you have any other Standard of Living Adjustments"}}
      />
      <FieldRadio
        name={`StandardOfLiving.mileage`}
        label="Have you driven any miles for long-distance parenting?"
        required="Required"
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {state["StandardOfLiving.mileage"] === "yes" && (
        <FieldInput
          name={`StandardOfLiving.mileage.distance`}
          label="How many miles do you drive annually to exercise long-distance parenting?"
          type="text"
          placeholder=""

        />
      )}
      <FieldRadio
        name={`StandardOfLiving.transportation`}
        label="Do you have other, non-automobile transportation costs?"
        required="Required"
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {state["StandardOfLiving.transportation"] === "yes" && (
        <FieldInput
          name={`StandardOfLiving.transportation.othercost`}
          label="How much are those other costs, annually?"
          type="text"
          placeholder=""
          mb="4"
        />
      )}
      <FieldRadio
        name={`StandardOfLiving.other`}
        label="Do you have other standard of living adjustments to add?"
        required="Required"
        updateState={updateState}
        helper={"See the User's Manual for to find out if you have any other Standard of Living Adjustments"}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {state["StandardOfLiving.other"] === "yes" &&
        additionalExpenses.map((expense, index) => (
          <Box key={index}>
            <AddAnother
              expense={Expense(index)}
              amount={Amount(index)}
              index={index}
              removeItem={removeItem}
              expenseID={expense.id}
            />
          </Box>
        ))}

      {state["StandardOfLiving.other"] === "yes" &&
        additionalExpenses.length <= 20 && (
          <AddPlaceholder label="Add adjustment" onClick={addItem} />
        )}
      <AdministrativeRules
        rules={[128, 130]}
        explanation={
          "For definitions and more information, click on the links below:"
        }
      />
    </FormizStep>
  )
}
