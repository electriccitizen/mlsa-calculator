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

export const StandardOfLivingSecondary = number => {
  const form = useForm({
    subscribe: { fields: ["OtherParent.fname"] },
  })

  const otherParent = form.values.OtherParent
    ? form.values.OtherParent.fname
    : "Other parent"

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
      name={`StandardOfLivingSecondary.other.${index}.desc`}
      label="Describe the adjustment"
      required="Required"
    />
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`StandardOfLivingSecondary.other.${index}.amt`}
      label="Annual Amount"
      required="Required"
    />
  )

  return (
    <FormizStep
      label="Standard of Living adjustment (other parent)"
      name={`StandardOfLivingSecondary`}
      order={23000}
    >
      <Box mb="8">
        <SectionHeader
          header={otherParent + `'s Standard of Living adjustment`}
        />
      </Box>
      <FieldRadio
        name={`StandardOfLivingSecondary.mileage`}
        label={`Has ${otherParent} driven any miles for long-distance parenting?`}
        required="Required"
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {state["StandardOfLivingSecondary.mileage"] === "yes" && (
        <FieldInput
          name={`StandardOfLivingSecondary.mileage.distance`}
          label={`How many miles does ${otherParent} drive annually to exercise long-distance parenting?`}
          type="text"
          fieldWidth={"25%"}
          placeholder=""
          mb="4"
        />
      )}
      <FieldRadio
        name={`StandardOfLivingSecondary.transportation`}
        label={`Does ${otherParent} have other, non-automobile transportation costs?`}
        required="Required"
        updateState={updateState}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {state["StandardOfLivingSecondary.transportation"] === "yes" && (
        <FieldInput
          name={`StandardOfLivingSecondary.transportation.othercost`}
          label="How much are those other costs, annually?"
          type="text"
          fieldWidth={"25%"}
          placeholder=""
          mb="4"
        />
      )}
      <FieldRadio
        name={`StandardOfLivingSecondary.other`}
        label={`Does ${otherParent} have other standard of living adjustments to add?`}
        required="Required"
        updateState={updateState}
        helper={"See the User's Manual for to find out if you have any other Standard of Living Adjustments"}
        options={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
        ]}
      />
      {state["StandardOfLivingSecondary.other"] === "yes" &&
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
      {state["StandardOfLivingSecondary.other"] === "yes" &&
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
