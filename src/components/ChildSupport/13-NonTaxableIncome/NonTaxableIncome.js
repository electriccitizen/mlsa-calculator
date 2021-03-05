import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box } from "@chakra-ui/react"
import { isNumber } from "@formiz/validations"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldSelect } from "../../Fields/FieldSelect"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { AdministrativeRules } from '../AdministrativeRules/AdministrativeRules'
import { v4 as uuidv4 } from "uuid"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "",
  },
]
export const NonTaxableIncome = () => {
  const form = useForm({
    subscribe: { fields: ["OtherIncome", "OtherIncome.nontaxable"] },
  })
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const [collection, setCollection] = useState(defaultCollection)

  useEffect(() => {
    setCollection(defaultCollection)
  }, [form.resetKey])

  const addItem = () => {
    setCollection(c => [
      ...c,
      {
        id: uuidv4(),
      },
    ])
  }

  const removeItem = id => {
    setCollection(c => c.filter(x => x.id !== id))
  }

  const Expense = index => (
    <>
      <FieldSelect
        name={`NonTaxableIncome[${index}].type`}
        label="Type of income"
        placeholder="Select option..."
        required="Required"
        index={index}
        updateState={updateState}
        options={[
          { value: "bond", label: "Tax free municipal bond" },
          {
            value: "ssdi",
            label: "Social Security Disability Income (SSDI)",
          },
          { value: "va", label: "VA disability income" },
          { value: "comp", label: "Workers' Compensation" },
          { value: "gifts", label: "Regular monetary gifts" },
          { value: "grants", label: "Educations grants" },
          { value: "fringe", label: "Fringe benefits" },
          { value: "other", label: "Other" },
        ]}
      />
    </>
  )
  const Amount = index => (
    <>
      <FieldMoneyInput
        name={`NonTaxableIncome.${index}.amt`}
        label="Amount"
        required="Required"
        mb={0}
        validations={[
          {
            rule: isNumber(),
            message: "Please enter a valid dollar amount a number",
          },
        ]}
      />
    </>
  )
  const Note = index =>
    state[`NonTaxableIncome[${index}].type`] === "other" && (
      <FieldInput
        name={`NonTaxableIncome[${index}].description`}
        label={"Describe the income (40 characters max)"}
      />
    )

  return (
    <>
      {form.values.OtherIncome && form.values.OtherIncome.nontaxable === true && (
        <FormizStep
          label="Non-taxable (other)"
          name="NonTaxableIncome"
          order={13000}
        >
          <SectionHeader header={`Enter your other non-taxable income`} />
          <AddAnotherHeader
            header={
              'Continue to click "Add another entry" until you have entered all\n' +
              "            your non-taxable incomes."
            }
          />
          <Box fontSize={"md"} mb={4}></Box>
          <Box>
            {collection.map(({ id, name }, index) => (
              <Box key={index}>
                <AddAnother
                  expense={Expense(index)}
                  amount={Amount(index)}
                  note={Note(index)}
                  index={index}
                  removeItem={removeItem}
                  expenseID={id}
                />
              </Box>
            ))}
          </Box>
          {collection.length <= 3 && (
            <AddPlaceholder label="Add another entry?" onClick={addItem} />
          )}
          <AdministrativeRules
            rules={[105,106,108]}
            explanation={
              "For definitions and more information, click on the links below:"
            }
          />
        </FormizStep>
      )}
    </>
  )
}
