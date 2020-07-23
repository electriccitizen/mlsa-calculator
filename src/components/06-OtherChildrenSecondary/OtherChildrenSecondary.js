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

  //console.log(form.values.other.fname)

  const [isChildren, setIsChildren] = React.useState()

  const updateState = (name, value) => {
    name === "other.children.secondary" &&
      sessionStorage.setItem("OtherChildrenSecondary", value)
    name === "other.children.secondary" &&
    setIsChildren(value)
    name === "other.children.secondary.number" &&
      sessionStorage.setItem("OtherChildrenSecondaryNumber", value)
  }

  const otherChildrenSecondaryNumber = sessionStorage.getItem(
    "OtherChildrenSecondaryNumber"
  )
  const otherChildrenSecondary = sessionStorage.getItem("OtherChildrenSecondary")


  //isChildren === 'no' && form.goToStep("End")


  let relationship = JSON.parse(sessionStorage.getItem("relationship"))
  let properNoun = ""
  relationship === "mother" ? (properNoun = "Father") : (properNoun = "Mother")

  const properName = form.values.other ? form.values.other.fname : 'Placeholder'

  return (
    <FormizStep name="OtherChildrenSecondary" order={6000}>
      <>
        <SectionWrapper>
          <SectionHeader
            header={`Does `+properName+ ` have children with someone else?`}
          />
          <FieldRadio
            name="other.children.secondary"
            placeholder="None"
            required="Required"
            keepValue
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
              header={`How many other minor children does `+properName+ ` have?`}
            />
            <Box width="30%">
              <FieldInput
                name="other.children.secondary.number"
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
