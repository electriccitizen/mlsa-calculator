import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box } from "@chakra-ui/react"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldSelect } from "../../Fields/FieldSelect"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { AddAnother, AddAnotherHeader } from "../../Utils/AddAnother"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"
import { v4 as uuidv4 } from "uuid"

const defaultCollection = [
  {
    id: uuidv4(),
    name: "",
  },
]

export const NonTaxableIncomeSecondary = () => {
  const form = useForm({
    subscribe: {
      fields: [
        "OtherParent.fname",
        "OtherIncomeSecondary",
        "OtherIncomeSecondary.nontaxable",
      ],
    },
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

  const otherParent = form.values?.OtherParent?.fname || "Other parent"

  const Expense = index => (
    <FieldSelect
      name={`NonTaxableIncomeSecondary[${index}].type`}
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
  )
  const Amount = index => (
    <FieldMoneyInput
      name={`NonTaxableIncomeSecondary[${index}].amt`}
      label={"Enter amount:"}
    />
  )
  const Note = index =>
    state[`NonTaxableIncomeSecondary[${index}].type`] === "other" && (
      <FieldInput
        name={`NonTaxableIncomeSecondary[${index}].description`}
        label={"Describe the income (40 characters max)"}
      />
    )

  return (
    <>
      {form.values.OtherIncomeSecondary &&
        form.values.OtherIncomeSecondary.nontaxable === true && (
          <FormizStep
            label={"Non-taxable (other)"}
            name="NonTaxableIncomeSecondary"
            order={20000}
          >
            <SectionHeader
              header={otherParent + `'s other non-taxable income:`}
            />
            <AddAnotherHeader
              header={
                'Continue to click "Add another entry" until you have entered all\n' +
                "            non-taxable incomes."
              }
            />

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
              rules={[105, 106, 108]}
              explanation={
                "For definitions and more information, click on the links below:"
              }
            />
          </FormizStep>
        )}
    </>
  )
}
