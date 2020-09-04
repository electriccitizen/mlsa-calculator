import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { Box } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const OtherChildren = () => {
  const [state, setState] = useState({})
  const updateState = (name, value, index) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  return (
    <FormizStep name="OtherChildren" order={5000}>
      <>
        <SectionWrapper>
          <SectionHeader
            header={`Do you have other children with someone else?`}
          />
          <FieldRadio
            name="OtherChildren.primary"
            placeholder="None"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </SectionWrapper>
        {state["OtherChildren.primary"] === "yes" && (
          <SectionWrapper>
            <SectionHeader
              header={`How many other minor children do you have?`}
            />
            <Box width="30%">
              <FieldInput
                name="NumOtherChildren"
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
