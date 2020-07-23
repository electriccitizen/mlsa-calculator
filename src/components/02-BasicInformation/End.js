import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import { SimpleGrid } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { AddressField } from "./AddressField"
//import statesData from "../../utils/states_hash.json"

export const End = ({ updateMontana }) => {
  const form = useForm()
  const updateState = (name, value) => {
  }
  return (
    <FormizStep name="End" order={100000}>
      <SectionWrapper>
        <SectionHeader header={"What is the word?"} />
        <SimpleGrid mb={8} columns={3} spacing={10}>
          <FieldInput
            name={`end`}
            label="First"
            required="Required"
            updateState={updateState}
            m="0"
          />

        </SimpleGrid>
      </SectionWrapper>
    </FormizStep>
  )
}
