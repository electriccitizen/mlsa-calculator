import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { Box, SimpleGrid } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { Text} from '@chakra-ui/core'

const flatten = require("flat").flatten
export const OtherJobs = () => {
  const form = useForm()

  const setField = value => {
    return (
      JSON.parse(sessionStorage.getItem(value)) &&
      JSON.parse(sessionStorage.getItem(value))
    )
  }

  const updateState = (name, value) => {
    name === "OtherJobs" &&
      sessionStorage.setItem("OtherJobs", value)
    name === "OtherJobsNumber" &&
    sessionStorage.setItem("numOtherJobs", value)
  }

  const otherJobs = sessionStorage.getItem("OtherJobs")

  return (
    <FormizStep name="OtherJobs" order={9000}>
      <>
        <SectionWrapper>
          <SectionHeader
            header={`Do you have additional jobs to enter?`}
          />
          <Text>
            If you have another job (or former jobs) that you want
            to report, select yes below to continue adding additional
            jobs. Otherwise select no to continue.
          </Text>
          <FieldRadio
            name="OtherJobs"
            placeholder="None"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </SectionWrapper>
        {otherJobs === "yes" && (
          <SectionWrapper>
            <SectionHeader
              header={`How many additional jobs would you like to enter?`}
            />
            <Box width="30%">
              <FieldInput
                name="OtherJobsNumber"
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
