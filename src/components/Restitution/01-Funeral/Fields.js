import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { isNumber } from "@formiz/validations"
import { FieldRadio } from "../../Fields/FieldRadio"
import React, { useState } from "react"
function Expense(index) {
  <FieldInput
    name={`FuneralExpenses.${index}.expense`}
    label="Paid by who (or needs to be paid?)"
    required="Required"
  />
}
export const Fields = (Expense) => {
  const [state, setState] = useState({})

  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }


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
}
