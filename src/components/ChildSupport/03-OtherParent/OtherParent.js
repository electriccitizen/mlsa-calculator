import React from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { Box, SimpleGrid } from "@chakra-ui/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"

export const OtherParent = () => {
  return (
    <FormizStep label="Basic information about other parent"  name="OtherParent" order={3000}>
      <SectionWrapper>
        <SectionHeader header={`What is the other parent's name?`} />
        <SimpleGrid mb={8} columns={3} spacing={10}>
          <FieldInput
            name={`OtherParent.fname`}
            label="First"
            required="Required"
            m="0"
          />
          <FieldInput
            name={`OtherParent.mname`}
            label="Middle"
            placeholder="Optional"
            m="0"
          />
          <FieldInput
            name={`OtherParent.lname`}
            required="Required"
            label="Last"
            m="0"
          />
        </SimpleGrid>
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeader
          header={`How many minor children do you have together? (This includes adopted children, but not stepchildren.)`}
        />
        <Box width="30%">
          <FieldInput
            name="NumPrimaryChildren"
            label="Enter number"
            required="Required"
          />
        </Box>
      </SectionWrapper>
    </FormizStep>
  )
}
