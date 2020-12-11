import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldDate } from "../../Fields/FieldDate"
import { FieldRadio } from "../../Fields/FieldRadio"
import { Box, Stack } from "@chakra-ui/react"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AlertBox } from "../../Utils/AlertBox"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const EnterChildren = () => {
  const form = useForm({
    subscribe: { fields: ["OtherParent.fname", "NumPrimaryChildren"] },
  })
  const otherParent =
    form.values.OtherParent && form.values.OtherParent.fname
  let numChildren = form.values.NumPrimaryChildren

  const [state, setState] = useState({})

  const updateState = (name, value, index) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  return (
    <>
      {Array.apply(null, { length: numChildren }).map((e, index) => (
        <FormizStep
          key={index}
          name={`EnterChildren` + index}
          order={4000 + index}
          label={`Child details (${index + 1} of ${numChildren})`}
        >
          <SectionHeader
            header={
              `Your children with ` +
              otherParent +
              ` (` +
              (index + 1) +
              ` of ` +
              numChildren +
              `)`
            }
          />
          <>
            <Stack
              direction={["column", "column", "row"]}
              spacing={["0", "0", "1rem"]}
            >
              <FieldInput
                name={`PrimaryChildren.${index}.fname`}
                label="First name"
                required="Required"
                type="text"
              />
              <FieldInput
                name={`PrimaryChildren.${index}.mname`}
                label="Middle"
                type="text"
              />
              <FieldInput
                name={`PrimaryChildren.${index}.lname`}
                label="Last name"
                required="Required"
                type="text"
              />
            </Stack>
            <Box flex="1">
              <FieldDate
                name={`PrimaryChildren.${index}.dob`}
                label="Date of birth"
                required="Required"
                type="text"
              />
            </Box>
            <FieldRadio
              name={`PrimaryChildren.${index}.status`}
              label="This child is (select all that apply):"
              required="Required"
              index={index}
              updateState={updateState}
              forceStack={true}
              options={[
                { value: "emancipated", label: "Emancipated" },
                { value: "married", label: "Married" },
                { value: "military", label: "Military" },
                { value: "none", label: "None of the above" },
              ]}
            />

            {state[`PrimaryChildren.${index}.status`] &&
              state[`PrimaryChildren.${index}.status`] !== "none" && (
                <AlertBox>
                  Sorry, but this child does not qualify and will not be counted
                  in the child support calculations. Continue to the next step.
                </AlertBox>
              )}
            <FieldRadio
              name={`PrimaryChildren.${index}.disabled`}
              label="Does this child have a disability?"
              required="Required"
              index={index}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </>
          <AdministrativeRules
            rules={[103]}
            explanation={
              "For definitions and more information, click on the links below:"
            }
          />
        </FormizStep>
      ))}
    </>
  )
}
