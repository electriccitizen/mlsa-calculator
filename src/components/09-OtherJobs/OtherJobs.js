import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { Box } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { Text } from "@chakra-ui/core"

export const OtherJobs = () => {
  const form = useForm({ subscribe: { fields: ["EmploymentStatus"] } })
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  return (
    <>
      {form.values.EmploymentStatus === "yes" && (
        <FormizStep name="OtherJobs" order={9000}>
          <>
            <SectionWrapper>
              <SectionHeader header={`Do you have additional jobs to enter?`} />
              <Text>
                If you have another job (or former jobs) that you want to
                report, select yes below to continue adding additional jobs.
                Otherwise select no to continue.
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
            {state["OtherJobs"] === "yes" && (
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
      )}
    </>
  )
}
