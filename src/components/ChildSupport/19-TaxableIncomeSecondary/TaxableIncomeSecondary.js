import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { isNumber } from "@formiz/validations"
import { Box } from "@chakra-ui/core"
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

export const TaxableIncomeSecondary = () => {
  const form = useForm({
    subscribe: {
      fields: [
        "OtherParent.fname",
        "OtherIncomeSecondary",
        "OtherIncomeSecondary.taxable",
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

  const otherParent const otherParent = form.values.OtherParent
    ? form.values.OtherParent.fname
    : "Other parent"

  const Amount = index => (
    <>
      <FieldMoneyInput
        name={`TaxableIncomeSecondary.${index}.amt`}
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
      <Box fontSize={"md"}>
        {state[`TaxableIncomeSecondary[${index}].type`] === "capitalgainshouse"
          ? "Total capital gain received"
          : "Gross amount (amount before taxes) received per year"}
      </Box>
    </>
  )

  const Expense = index => (
    <>
      <FieldSelect
        name={`TaxableIncomeSecondary[${index}].type`}
        label="Type of income"
        placeholder="Select option..."
        required="Required"
        index={index}
        updateState={updateState}
        options={[
          { value: "rental", label: "Rental income" },
          { value: "capitalgains", label: "Capital gains" },
          {
            value: "capitalgainshouse",
            label: "Capital gains on the sale of primary residence",
          },
          { value: "unemployment", label: "Unemployment benefits" },
          { value: "scorportation", label: "S Corporation" },
          { value: "alimony", label: "Spousal support (alimony)" },
          { value: "contract", label: "Contract receipts" },
          { value: "royalties", label: "Royalties" },
          { value: "other", label: "Other" },
        ]}
      />
    </>
  )

  const Note = index =>
    state[`TaxableIncomeSecondary[${index}].type`] === "other" && (
      <FieldInput
        name={`TaxableIncomeSecondary.${index}.notes`}
        label={"Describe the income (40 characters max)"}
      />
    )

  return (
    <>
      {form.values.OtherIncomeSecondary &&
        form.values.OtherIncomeSecondary.taxable === true && (
          <FormizStep
            label={"Taxable (other)"}
            name="TaxableIncomeSecondary"
            order={19000}
          >
            <SectionHeader header={otherParent + `'s other taxable income`} />
            <AddAnotherHeader
              header={
                'Continue to click "Add another entry" until you have entered all\n' +
                "              other taxable incomes."
              }
            />

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
            {TaxableIncomeSecondary.length <= 20 && (
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
