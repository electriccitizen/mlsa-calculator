import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { AddressField } from "../02-BasicInformation/AddressField"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const Employment = d => {
  const form = useForm({ subscribe: { fields: ["Documents"] } })
  const documents = form?.values?.Documents
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  return (
    <FormizStep
      label="Your employment status"
      name="EmploymentStatus"
      order={7000}
    >
      <>
        <SectionHeader header={`Employment information`} />
        <FieldRadio
          name="EmploymentPrimary.initiate"
          placeholder="None"
          required="Required"
          label={"Do you have a job?"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        {
          (documents === "both" || documents === "affadavit") && (
            <>
              {
                state["EmploymentPrimary.initiate"] === "yes" && (
                  <FieldRadio
                    name="EmploymentPrimary.initiateFulltime"
                    placeholder="None"
                    required="Required"
                    updateState={updateState}
                    label={"Is the job full time?"}
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                    ]}
                  />
                )
              }
              {state["EmploymentPrimary.initiate"] === "no" && (
                <FieldRadio
                  name="EmploymentPrimaryEver"
                  placeholder="None"
                  required="Required"
                  updateState={updateState}
                  label={"Have you ever had a job?"}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              )}
              {(state["EmploymentPrimary.initiateEver"] === "yes" ||
                state["EmploymentPrimary.initiate"] === "yes") && (
                  <>
                    <FieldInput
                      name={`EmploymentPrimary.info`}
                      label="What kinds of work do you/did you do for your employer(s)?"
                      required="Required"
                      type="text"
                      updateState={updateState}
                    />

                    <FieldRadio
                      mt={4}
                      name="EmploymentPrimary.cashBenefits"
                      placeholder="None"
                      required="Required"
                      updateState={updateState}
                      label={
                        "Do you receive any non-cash benefits from your employer, such as housing, groceries, meat, car or truck, utilities, phone service?"
                      }
                      options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                      ]}
                    />
                  </>
                )}
              {state["EmploymentPrimary.initiate"] === "yes" &&
                state["EmploymentPrimary.cashBenefits"] === "yes" && (
                  <>
                    <FieldInput
                      name={`EmploymentPrimary.cashBenefitsDetails`}
                      label="Describe the non-cash benefit you receive and how often you receive it."
                      required="Required"
                      type="text"
                      updateState={updateState}
                    />
                    <FieldMoneyInput
                      mt={4}
                      name={`EmploymentPrimary.cashBenefitsAmount`}
                      label="What is the value of the benefit, per year?"
                      required="Required"
                      type="text"
                      updateState={updateState}
                    />
                  </>
                )}
              {state["EmploymentPrimary.initiate"] === "yes" && state["EmploymentPrimary.initiateFulltime"] && (
                <FieldRadio
                  name="EmploymentPrimary.union"
                  placeholder="None"
                  required="Required"
                  updateState={updateState}
                  label={"Do you belong to a union?"}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              )}
              {state["EmploymentPrimary.initiate"] === "yes" &&
                state["EmploymentPrimary.union"] === "yes" && (
                  <>
                    <FieldInput
                      name={`EmploymentPrimary.unionName`}
                      label="Name of your union local"
                      required="Required"
                      type="text"
                      updateState={updateState}
                      mb="2"
                    />
                    <FieldMoneyInput
                      name={`EmploymentPrimary.unionDues`}
                      label="Amount of monthly dues"
                      required="Required"
                      type="text"
                      updateState={updateState}
                      mb="2"
                    />
                    <AddressField
                      label={"Street Address"}
                      name={"EmploymentPrimary.unionAddress"}
                    />
                  </>
                )}
            </>
          )
        }
      </>
      <AdministrativeRules
        rules={[105, 106, 108]}
        explanation={
          "For definitions and more information, click on the links below:"
        }
      />
    </FormizStep>
  )
}
