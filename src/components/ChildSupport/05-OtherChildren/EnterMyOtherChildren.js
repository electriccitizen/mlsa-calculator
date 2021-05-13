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

export const EnterMyOtherChildren = () => {
  const form = useForm({ subscribe: { fields: ["Documents", "NumOtherChildren"] } })
  const numOtherChildren = form.values.NumOtherChildren
  const documents = form?.values?.Documents
  const [state, setState] = useState({})
  const updateState = (name, value, index) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  return (
    <>
      {Array.apply(null, { length: numOtherChildren }).map((e, index) => (
        <FormizStep
          key={index}
          name={`EnterMyOtherChildren` + index}
          label={`Child details (${index + 1} of ${numOtherChildren})`}
          order={5500 + index}
        >
          <SectionHeader
            header={
              `Your other children (` +
              (index + 1) +
              ` of ` +
              numOtherChildren +
              `)`
            }
          />
          <>
            <Stack
              direction={["column", "column", "row"]}
              spacing={["0", "0", "1rem"]}
            >
              <FieldInput
                name={`OtherChildren.${index}.fname`}
                label="First name"
                required="Required"
                type="text"
              />
              <FieldInput
                name={`OtherChildren.${index}.mname`}
                label="Middle"
                type="text"
              />
              <FieldInput
                name={`OtherChildren.${index}.lname`}
                label="Last name"
                required="Required"
                type="text"
              />
            </Stack>
            <FieldDate
              name={`OtherChildren.${index}.dob`}
              label="Date of birth"
              required="Required"
              type="text"
            />

            <FieldRadio
              name={`OtherChildren.${index}.housing`}
              label="Who does the child live with most of the time?"
              required="Required"
              index={index}
              forceStack={true}
              updateState={updateState}
              options={[
                { value: "me", label: "Me", id: "me" },
                {
                  value: "otherparent",
                  id: "otherparent",
                  label: "The child's other parent",
                },
                { value: "other", id: "other", label: "Someone else" },
              ]}
            />

            {state[`OtherChildren.${index}.housing`] === "other" && (
              <FieldInput
                name={`OtherChildren.${index}.otherHousing`}
                label="Who does the child live with most of the time?"
                type="text"
                placeholder=""
              />
            )}
            {
              (documents === "both" || documents === "affadavit") && (
                <FieldMoneyInput
                  name={`OtherChildren.${index}.benefits`}
                  label="Dependent's benefits received for this child per year, if any. Examples: Social Security, VA, etc."
                  type="text"
                  placeholder="Enter amount"
                />
              )
            }
            <FieldRadio
              name={`OtherChildren.${index}.support`}
              label="Are you ordered to pay support for this child?"
              required="Required"
              index={index}
              updateState={updateState}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            {state[`OtherChildren.${index}.support`] === "yes" && (
              <FieldMoneyInput
                name={`OtherChildren.${index}.childSupportAmount`}
                label="Monthly child support you are ordered to pay for this child."
                type="text"
                placeholder="Enter amount"
              />
            )}
            <FieldRadio
              name={`OtherChildren.${index}.depcare`}
              label="Do you have any dependent care expense for this child?"
              required="Required"
              index={index}
              updateState={updateState}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            {state[`OtherChildren.${index}.depcare`] === "yes" && (
              <FieldMoneyInput
                name={`OtherChildren.${index}.depcareAmount`}
                label="Enter 50% of the yearly dependent care expense for this child."
                type="text"
                placeholder="Enter amount"
              />
            )}
            <FieldRadio
              name={`OtherChildren.${index}.medical`}
              label="Do you have any extraordinary medical expenses for this child which were not reimbursed?"
              required="Required"
              index={index}
              updateState={updateState}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
            {state[`OtherChildren.${index}.medical`] === "yes" && (
              <FieldMoneyInput
                name={`OtherChildren.${index}.medicalAmount`}
                label="Enter 50% of the yearly extraordinary medical expense for this child."
                type="text"
                placeholder="Enter amount"
              />
            )}
            <FieldRadio
              name={`OtherChildren.${index}.status`}
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
            {state[`OtherChildren.${index}.status`] &&
              state[`OtherChildren.${index}.status`] !== "none" && (
                <AlertBox>
                  Sorry, but this child does not qualify and will not be counted
                  in the child support calculations. Continue to the next step.
                </AlertBox>
              )}
            <FieldRadio
              name={`OtherChildren.${index}.disabled`}
              label="Does this child have a disability?"
              required="Required"
              index={index}
              updateState={updateState}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </>
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
