import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const Schools = () => {
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const schoolLevel = state["Schools.level"]
  const schoolCurrent = state["Schools.current"]

  return (
    <FormizStep name="Schools" order={26000}>
      <>
        <SectionWrapper>
          <SectionHeader header={`Schools`} />
          <FieldRadio
            name={`Schools.level`}
            label="Did you finish high school?"
            placeholder="Select option..."
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {schoolLevel === "no" && (
            <FieldInput
              name={`School.lastYearCompleted`}
              label="List the highest grade you completed."
              type="text"
              isRequired={true}
              fieldWidth={"25%"}
            />
          )}
          {schoolLevel === "yes" && (
            <FieldRadio
              name={`Schools.postSecondary`}
              label="Did you attend any other schools after high school? This includes training school, trade school, college or university."
              placeholder="Select option..."
              required="Required"
              updateState={updateState}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          )}

          <FieldRadio
            name={`Schools.current`}
            label="Are you currently a student?"
            placeholder="Select option..."
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {schoolCurrent === "yes" && (
            <FieldDate
              name={`Schools.current.endDate`}
              label="What is your expected date of graduation? If you are not sure of the exact date, enter an approximate date. (MM/DD/YYYY)"
              required="Required"
              placeholder="MM/DD/YYYY"
              m="0"
            />
          )}
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
