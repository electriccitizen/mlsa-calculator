import React from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
// import { FieldPhone } from "../../Fields/FieldPhone"
import { Stack } from "@chakra-ui/react"
import { SectionHeader } from "../../Utils/SectionHeader"
import { isEmail } from "@formiz/validations"

export const PersonalInfo = () => {
  return (
    <FormizStep
      label={`Personal information`}
      name="PersonalInformation"
      order={1000}
    >
      <SectionHeader header={`Personal information`} />
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`Primary.fname`}
          label="First name"
          required="Required"
        />
        <FieldInput
          name={`Primary.mname`}
          label="Middle"
          placeholder="Optional"
        />
        <FieldInput
          name={`Primary.lname`}
          required="Required"
          label="Last name"
        />
      </Stack>
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`Primary.phone`}
          label="Phone number"
          helper="Enter your phone number if available."
        />
        <FieldInput
          name={`Primary.email`}
          label="Email address"
          helper="Enter a valid email address if available."
          validations={[
            {
              rule: isEmail(),
              message: "Please enter a valid email address.",
            },
            ]}
        />
      </Stack>
    </FormizStep>
  )
}
