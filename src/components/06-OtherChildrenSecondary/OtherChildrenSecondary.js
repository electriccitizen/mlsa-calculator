import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { Box, SimpleGrid } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { EnterMyOtherChildrenSecondary } from "./EnterMyOtherChildrenSecondary"

const flatten = require("flat").flatten
export const OtherChildrenSecondary = ({ updateMontana }) => {
  const form = useForm()

  const setField = value => {
    return (
      JSON.parse(sessionStorage.getItem(value)) &&
      JSON.parse(sessionStorage.getItem(value))
    )
  }
  const otherParent = form.values.otherParent
    ? form.values.otherParent.fname
    : ""

  //console.log(form.values.other.fname)

  const [isChildren, setIsChildren] = React.useState()

  const updateState = (name, value) => {
    name === "otherChildrenSecondary" &&
      sessionStorage.setItem("OtherChildrenSecondary", value)
    name === "otherChildrenSecondary.number" &&
      sessionStorage.setItem("numChildrenSecondary", value)
  }

  const otherChildrenSecondary = sessionStorage.getItem(
    "OtherChildrenSecondary"
  )

  //isChildren === 'no' && form.goToStep("End")

  return (
    <FormizStep name="OtherChildrenSecondary" order={6000}>
      <>
        <SectionWrapper>
          <SectionHeader
            header={`Does ` + otherParent + ` have children with someone else?`}
          />
          <FieldRadio
            name="otherChildrenSecondary"
            placeholder="None"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </SectionWrapper>
        {otherChildrenSecondary === "yes" && (
          <SectionWrapper>
            <SectionHeader
              header={
                `How many other minor children does ` + otherParent + ` have?`
              }
            />
            <Box width="30%">
              <FieldInput
                name="otherChildrenSecondary.number"
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
