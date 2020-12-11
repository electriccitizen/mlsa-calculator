import React from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { Stack } from "@chakra-ui/react"
import { SectionHeader } from "../../Utils/SectionHeader"

export const OtherParent = () => {
  return (
    <FormizStep label={"Other parent's name"} name="OtherParent" order={3000}>
      <SectionHeader header={`Enter the other parent's name`} />
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`OtherParent.fname`}
          label="First"
          required="Required"
          //
        />
        <FieldInput
          name={`OtherParent.mname`}
          label="Middle"
          placeholder="Optional"
        />
        <FieldInput
          name={`OtherParent.lname`}
          required="Required"
          label="Last"
        />
      </Stack>

    </FormizStep>
  )
}
