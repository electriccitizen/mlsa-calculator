import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldDate } from "../../Fields/FieldDate"
import { FieldRadio } from "../../Fields/FieldRadio"
import { Stack } from "@chakra-ui/react"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddressField } from "./AddressField"
import { AddressFieldMailing } from "./AddressFieldMailing"
export const BasicInformation = () => {
  const form = useForm({ subscribe: { fields: ["PrimaryMailing"] } })
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const formPrimaryMailing = (form.fields.PrimaryMailing && form.fields.PrimaryMailing.value)
  return (
    <FormizStep
      label="Your contact information"
      name="BasicInformation"
      order={2000}
    >
      <SectionHeader header={"Enter your contact information"} />
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput name={`Primary.fname`} label="First" required="Required" />
        <FieldInput
          name={`Primary.mname`}
          label="Middle"
          placeholder="Optional"
        />
        <FieldInput name={`Primary.lname`} required="Required" label="Last" />
      </Stack>
      {/*{(documents === "both" || documents === "affadavit") && (*/}
      <>
        <Stack
          direction={["column", "column", "row"]}
          spacing={["0", "0", "1rem"]}
        >
          <FieldDate
            name={`Primary.dob`}
            label="Date of birth"
            required="Required"
            placeholder="MM/DD/YYYY"
          />
          <FieldInput
            name={`Primary.phone`}
            label="Primary phone"
            required="Required"
          />
          <FieldInput name={`Primary.dl`} label="Driver's License #" />
        </Stack>

        <AddressField label={"Street Address"} name={"Primary"} />

        <FieldRadio
          name="PrimaryMailing"
          label={"Is this your mailing address?"}
          required="Required"
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
      </>

      {(state.PrimaryMailing === "no" || formPrimaryMailing === "no") && (
        <AddressFieldMailing
          header={"What is your mailing address?"}
          label={"Mailing Address"}
          name={"PrimaryMailing.address"}
        />
      )}

    </FormizStep>
  )
}
