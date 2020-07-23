import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { Button } from "@chakra-ui/core"
export const StartOver = ({ updateMontana, handleBack }) => {
  const form = useForm()
  const setField = value => {
    return (
      JSON.parse(sessionStorage.getItem(value)) &&
      JSON.parse(sessionStorage.getItem(value))
    )
  }
  let updateState = (name, value) => {
    name === "initiate.relationship" &&
      sessionStorage.setItem("relationship", JSON.stringify(value))
    name === "initiate.action" &&
      sessionStorage.setItem("action", JSON.stringify(value))
    name === "initiate.location" &&
      sessionStorage.setItem("location", JSON.stringify(value))
    name === "initiate.documents" &&
      sessionStorage.setItem("documents", JSON.stringify(value))
    name === "initiate.location" && updateMontana(value)
  }
  const handleClick = () => {
    updateMontana("yes")
  }

  return (
    <FormizStep name="startOver">
      <SectionWrapper>
        <SectionHeader header={"This tool is only available in Montana."} />
        <Button variantColor="brand" type="button" onClick={handleClick}>
          Go back
        </Button>
      </SectionWrapper>
    </FormizStep>
  )
}
