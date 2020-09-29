import React from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { Stack } from "@chakra-ui/core"
import { SectionHeader } from "../../Utils/SectionHeader"

export const CaseInfo = () => {
  return (
    <FormizStep label={`Case information`} name="CaseInformation" order={1100}>
      <SectionHeader header={`Case information`} />
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`Primary.caseName`}
          label="What is the name of the person who committed the crime?"
          required="Required"
          fieldWidth={"55%"}
        />

      </Stack>
      <FieldInput
        name={`Primary.prosecutor`}
        label="Who is the prosecutor?"
        fieldWidth={"55%"}
      />
      <Stack
        direction={["column", "column", "row"]}
        spacing={["0", "0", "1rem"]}
      >
        <FieldInput
          name={`Primary.causeNumber`}
          label="What is the cause number?"
        />
        <FieldInput
          name={`Primary.caseID`}
          label="What is the case ID?"
        />
      </Stack>
    </FormizStep>
  )
}
