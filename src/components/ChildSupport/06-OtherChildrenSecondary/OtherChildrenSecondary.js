import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { Box } from "@chakra-ui/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"

export const OtherChildrenSecondary = () => {
  const form = useForm({ subscribe: { fields: ["OtherParent.fname"] } })

  const otherParent = form.values.OtherParent
    ? form.values.OtherParent.fname
    : ""

  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  return (
    <FormizStep label="Other Children (other parent)" name="OtherChildrenSecondary" order={6000}>
      <>
        <SectionWrapper>
          <SectionHeader
            header={`Does ` + otherParent + ` have children with someone else?`}
          />
          <FieldRadio
            name="OtherChildrenSecondary"
            placeholder="None"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </SectionWrapper>
        {state.OtherChildrenSecondary === "yes" && (
          <SectionWrapper>
            <SectionHeader
              header={
                `How many other minor children does ` + otherParent + ` have?`
              }
            />
            <Box width="30%">
              <FieldInput
                name="NumOtherChildrenSecondary"
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
