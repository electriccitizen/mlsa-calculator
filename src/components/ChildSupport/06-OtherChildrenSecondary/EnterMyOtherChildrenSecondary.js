import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldDate } from "../../Fields/FieldDate"
import { FieldRadio } from "../../Fields/FieldRadio"
import { Stack } from "@chakra-ui/react"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AlertBox } from "../../Utils/AlertBox"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const EnterMyOtherChildrenSecondary = () => {
  const form = useForm({
    subscribe: { fields: ["OtherParent.fname", "NumOtherChildrenSecondary"] },
  })
  const numChildrenSecondary = form.values.NumOtherChildrenSecondary
  const [state, setState] = useState({})
  const updateState = (name, value, index) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const otherParent = form.values.OtherParent
    ? form.values.OtherParent.fname
    : "other parent"
  return (
    <>
      {Array.apply(null, { length: numChildrenSecondary }).map((e, index) => (
        <FormizStep
          key={index}
          name={`EnterMyOtherChildrenSecondary` + index}
          order={6500 + index}
          label={`Child details (${index + 1} of ${numChildrenSecondary})`}
        >
          <SectionHeader
            header={
              `Enter details for ` +
              otherParent +
              `'s other children (` +
              (index + 1) +
              ` of ` +
              numChildrenSecondary +
              `)`
            }
            helpText={{
              text:
                "This should be one half of the total dependant care costs for this child.",
            }}
          />
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            */}
            <FieldInput
              name={`OtherChildrenSecondary.${index}.fname`}
              label="First name"
              required="Required"
              type="text"
            />
            <FieldInput
              name={`OtherChildrenSecondary.${index}.mname`}
              label="Middle"
              type="text"
            />
            <FieldInput
              name={`OtherChildrenSecondary.${index}.lname`}
              label="Last name"
              required="Required"
              type="text"
            />
          </Stack>
          <FieldDate
            name={`OtherChildrenSecondary.${index}.dob`}
            label="Date of birth"
            required="Required"
            type="text"
          />
          <FieldRadio
            name={`OtherChildrenSecondary.${index}.housing`}
            label="Who does the child live with most of the time?"
            required="Required"
            index={index}
            updateState={updateState}
            forceStack={true}
            options={[
              { value: "me", label: "Me" },
              {
                value: "otherparent",
                label: "The child's other parent",
              },
              { value: "other", label: "Someone else" },
            ]}
          />
          {state[`OtherChildrenSecondary.${index}.housing`] === "yes" && (
            <FieldInput
              name={`OtherChildrenSecondary.${index}.otherHousing`}
              label="Who does the child live with most of the time?"
              type="text"
              placeholder=""
            />
          )}
          <FieldMoneyInput
            name={`OtherChildrenSecondary.${index}.benefits`}
            label="Dependent's benefits received for this child per year, if any. Examples: Social Security, VA, etc."
            type="text"
            placeholder="Enter amount"
          />
          <FieldRadio
            name={`OtherChildrenSecondary.${index}.support`}
            label="Are you ordered to pay support for this child?"
            required="Required"
            index={index}
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {state[`OtherChildrenSecondary.${index}.support`] === "yes" && (
            <FieldMoneyInput
              name={`OtherChildrenSecondary.${index}.childSupportAmount`}
              label="Monthly child support you are ordered to pay for this child."
              type="text"
              placeholder="Enter amount"
            />
          )}
          <FieldRadio
            name={`OtherChildrenSecondary.${index}.depcare`}
            label="Do you have any dependent care expense for this child?"
            required="Required"
            index={index}
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {state[`OtherChildrenSecondary.${index}.depcare`] === "yes" && (
            <FieldMoneyInput
              name={`OtherChildrenSecondary.${index}.depcareAmount`}
              label="Enter 50% of the yearly dependent care expense for this child."
              type="text"
              placeholder="Enter amount"
            />
          )}
          <FieldRadio
            name={`OtherChildrenSecondary.${index}.medical`}
            label="Do you have any extraordinary medical expenses for this child which were not reimbursed?"
            required="Required"
            index={index}
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {state[`OtherChildrenSecondary.${index}.medical`] === "yes" && (
            <FieldMoneyInput
              name={`OtherChildrenSecondary.${index}.medicalAmount`}
              label="Enter 50% of the yearly extraordinary medical expense for this child."
              type="text"
              placeholder="Enter amount"
            />
          )}
          <FieldRadio
            name={`OtherChildrenSecondary.${index}.otherParent`}
            label="Is this child's other parent still living?"
            index={index}
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <FieldRadio
            name={`OtherChildrenSecondary.${index}.status`}
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
          {state[`OtherChildrenSecondary.${index}.status`] !== "none" && (
            <AlertBox>
              Sorry, but this child does not qualify and will not be counted in
              the child support calculations. Continue to the next step.
            </AlertBox>
          )}
          <FieldRadio
            name={`OtherChildrenSecondary.${index}.disabled`}
            label="Does this child have a disability?"
            required="Required"
            index={index}
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <AdministrativeRules
            rules={[103, 110, 111]}
            explanation={
              "For definitions and more information, click on the links below:"
            }
          />
        </FormizStep>
      ))}
    </>
  )
}
