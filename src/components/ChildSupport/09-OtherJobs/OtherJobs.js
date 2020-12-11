import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Text } from "@chakra-ui/react"
import { AdministrativeRules } from '../AdministrativeRules/AdministrativeRules'

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
        <FormizStep label="Your other jobs" name="OtherJobs" order={9000}>
          <SectionHeader header={`Do you have additional jobs to enter?`} />
          <Text>
            If you have another job (or former jobs) that you want to report,
            select yes below to continue adding additional jobs. Otherwise
            select no to continue.
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

          {state["OtherJobs"] === "yes" && (
            <FieldRadio
              name="OtherJobsNumber"
              required="Required"
              forceStack={true}
              label={"How many additional jobs would you like to enter?"}
              options={[
                { value: "1", label: "One" },
                { value: "2", label: "Two" },
                { value: "3", label: "Three" },
                { value: "4", label: "Four" },
              ]}
            />
          )}
          <AdministrativeRules
            rules={[105,106,108]}
            explanation={
              "For definitions and more information, click on the links below:"
            }
          />
        </FormizStep>
      )}
    </>
  )
}
