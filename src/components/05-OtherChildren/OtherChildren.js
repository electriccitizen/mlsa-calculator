import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { Box, SimpleGrid } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { EnterMyOtherChildren } from "./EnterMyOtherChildren"

const flatten = require("flat").flatten
export const OtherChildren = ({ updateMontana }) => {
  const form = useForm()

  const setField = value => {
    return (
      JSON.parse(sessionStorage.getItem(value)) &&
      JSON.parse(sessionStorage.getItem(value))
    )
  }

  const updateState = (name, value) => {
    name === "otherChildren.primary" &&
      sessionStorage.setItem("OtherChildrenPrimary", value)
    name === "otherChildren.number" &&
      sessionStorage.setItem("numChildrenOther", value)
  }

  const otherChildrenPrimary = sessionStorage.getItem("OtherChildrenPrimary")

  return (
    <FormizStep name="OtherChildren" order={5000}>
      <>
        <SectionWrapper>
          <SectionHeader
            header={`Do you have other children with someone else?`}
          />
          <FieldRadio
            name="otherChildren.primary"
            placeholder="None"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </SectionWrapper>
        {otherChildrenPrimary === "yes" && (
          <SectionWrapper>
            <SectionHeader
              header={`How many other minor children do you have?`}
            />
            <Box width="30%">
              <FieldInput
                name="otherChildren.number"
                label="Enter number"
                required="Required"
                updateState={updateState}
              />
            </Box>
          </SectionWrapper>
        )}
      </>
    </FormizStep>
  )
}
