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
    name === "other.children.primary" &&
      sessionStorage.setItem("OtherChildrenPrimary", value)
    name === "other.children.primary.number" &&
      sessionStorage.setItem("OtherChildrenPrimaryNumber", value)
  }

  const otherChildrenPrimaryNumber = sessionStorage.getItem(
    "OtherChildrenPrimaryNumber"
  )
  const otherChildrenPrimary = sessionStorage.getItem("OtherChildrenPrimary")

  console.log(otherChildrenPrimaryNumber)

  //otherChildrenPrimaryNumber === 0 && form.gotoStep("End")

  let relationship = JSON.parse(sessionStorage.getItem("relationship"))
  let properNoun = ""
  relationship === "mother" ? (properNoun = "Father") : (properNoun = "Mother")
  return (
    <FormizStep name="OtherChildren" order={5000}>
      <>
        <SectionWrapper>
          <SectionHeader
            header={`Do you have other children with someone else?`}
          />
          <FieldRadio
            name="other.children.primary"
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
                name="other.children.primary.number"
                label="Enter number"
                required="Required"
                updateState={updateState}
              />
            </Box>
          </SectionWrapper>
        )}
        {/*{parseInt(otherChildrenPrimaryNumber) !== 0 && (*/}
        {/*  <EnterMyOtherChildren number={parseInt(otherChildrenPrimaryNumber)} />*/}
        {/*)}*/}
      </>
    </FormizStep>
  )
}
