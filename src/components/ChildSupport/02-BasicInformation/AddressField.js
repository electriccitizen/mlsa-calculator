import React from "react"
import { FieldInput } from "../../Fields/FieldInput"
import { Stack, Box } from "@chakra-ui/react"

export const AddressField = ({ header, label, name }) => {
  return (
    <Box mt={4}>
      <FieldInput name={name} label={label} required="Required" mb={4} />
      <FieldInput
        name={`Primary.address2`}
        label="Line 2, if any (Apt number, P.O. Box, etc.)"
        placeholder="Optional"
      />
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`Primary.city`}
          label="City"
          required="Required"
        />
        <FieldInput
          name={`Primary.state`}
          label="State"
          required="Required"
        />
        <FieldInput
          name={"Primary.zip"}
          label="Zip code"
          required="Required"
        />
      </Stack>
    </Box>
  )
}
