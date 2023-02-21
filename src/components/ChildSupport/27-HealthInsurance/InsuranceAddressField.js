import React from "react"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldNumberInput } from "../../Fields/FieldNumberInput"
import { Stack } from "@chakra-ui/react"

export const InsuranceAddressField = ({ header, index, label, name }) => {
  return (
    <>
      <FieldInput
        name={`HealthInsurancePolicies.${index}.company`}
        label="Company name"
        required="Required"
        mb="4"
      />
      <FieldNumberInput
        name={`HealthInsurancePolicies.${index}.policyNumber`}
        label="Policy number"
        required="Required"
        mb="4"
      />
      <FieldInput
        name={`HealthInsurancePolicies.${index}.certNumber`}
        label="Certificate number"
        required="Required"
        mb="4"
      />
      <FieldInput
        name={`HealthInsurancePolicies.${index}.address`}
        label={label}
        required="Required"
        mb={4}
      />
      <FieldInput
        name={`HealthInsurancePolicies.${index}.address2`}
        label="Line 2, if any (Apt number, P.O. Box, etc.)"
        placeholder="Optional"
        mb="4"
      />
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`HealthInsurancePolicies.${index}.city`}
          label="City"
          required="Required"
          mb="4"
        />
        <FieldInput
          name={`HealthInsurancePolicies.${index}.state`}
          label="State"
          required="Required"
        />
        <FieldNumberInput
          name={`HealthInsurancePolicies.${index}.zip`}
          label="Zip code"
          required="Required"
          format="false"
        />
      </Stack>
    </>
  )
}
