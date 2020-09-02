import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { Box, SimpleGrid, Flex, Stack } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const InsuranceAddressField = ({ header, index, label, name }) => {
  return (
    <SectionWrapper>
      <FieldInput
        name={`HealthInsurancePolicies.${index}.company`}
        label="Company name"
        required="Required"
        mb="4"
      />
      <FieldInput
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
      <SimpleGrid columns={3} spacing={10}>
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
          m="0"
        />
        <FieldInput
          name={`HealthInsurancePolicies.${index}.zip`}
          label="Zip code"
          required="Required"
          mb={4}
        />
      </SimpleGrid>
    </SectionWrapper>
  )
}
