import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldDate } from '../Fields/FieldDate'
import { FieldRadio } from "../Fields/FieldRadio"
import { SimpleGrid } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { AddressField } from "./AddressField"
//import statesData from "../../utils/states_hash.json"

export const BasicInformation = ({ updateMontana }) => {
  const form = useForm()
  let updateState = (name, value) => {
    name === "basic.mailing" &&
      localStorage.setItem("mailing", JSON.stringify(value))
  }
  // const handleClick = () => {
  //   form.goToStep("initiateInterview")
  //   console.log(form.steps)
  // }
  // const setField = value => {
  //   return (
  //     JSON.parse(localStorage.getItem(value)) &&
  //     JSON.parse(localStorage.getItem(value))
  //   )
  // }
  let documents = JSON.parse(localStorage.getItem("documents"))
  return (
    <FormizStep name="BasicInformation">
      <SectionWrapper>
        <SectionHeader header={"What is your name?"} />
        <SimpleGrid mb={8} columns={3} spacing={10}>
          <FieldInput
            name={`basic.fname`}
            label="First"
            required="Required"
            m="0"
          />
          <FieldInput
            name={`basic.mname`}
            label="Middle"
            placeholder="Optional"
            m="0"
          />
          <FieldInput
            name={`basic.lname`}
            required="Required"
            label="Last"
            m="0"
          />
        </SimpleGrid>
      </SectionWrapper>
      {(documents === "both" || documents === "affadavit") && (
        <>
          <SectionWrapper>
            <SectionHeader
              header={"Enter required info for financial affadavit:"}
            />
            <SimpleGrid mb={8} columns={3} spacing={10}>
              <FieldDate
                name={`basic.dob`}
                label="Date of birth"
                required="Required"
                placeholder="MM/DD/YYYY"
                m="0"
              />
              <FieldInput
                name={`basic.phone`}
                label="Primary phone"
                required="Required"
                m="0"
              />
              <FieldInput name={`basic.dl`} label="Driver's License #" m="0" />
            </SimpleGrid>
          </SectionWrapper>

          <AddressField
            header={"What is your street address?"}
            label={"Street Address"}
            name={"basic.address"}
          />
          <SectionWrapper>
            <SectionHeader header={"Is this your primary mailing address?"} />
            <FieldRadio
              name="basic.mailing"
              required="Required"
              updateState={updateState}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </SectionWrapper>
        </>
      )}
      {/*))}*/}
      {JSON.parse(localStorage.getItem("mailing")) === "no" && (
        <AddressField
          header={"What is your mailing address?"}
          label={"Mailing Address"}
          name={"basic.mail_address"}
        />
      )}
    </FormizStep>
  )
}
