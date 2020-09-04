import React from "react"
import { FieldInput } from "../Fields/FieldInput"
import { SimpleGrid } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
//import statesData from '../../utils/states_hash.json';

export const AddressField = ({ header, label, name }) => {
  return (
    <SectionWrapper>
      {header && <SectionHeader header={header} />}
      <FieldInput name={name} label={label} required="Required" mb={4} />
      <FieldInput
        name={`Primary.address2`}
        label="Line 2, if any (Apt number, P.O. Box, etc.)"
        placeholder="Optional"
        mb="4"
      />
      <SimpleGrid columns={3} spacing={10}>
        <FieldInput
          name={`Primary.city`}
          label="City"
          required="Required"
          mb="4"
        />
        <FieldInput
          name={`Primary.state`}
          label="State"
          required="Required"
          m="0"
        />
        <FieldInput
          name={"Primary.zip"}
          label="Zip code"
          required="Required"
          mb={4}
        />
      </SimpleGrid>
    </SectionWrapper>
  )
}
