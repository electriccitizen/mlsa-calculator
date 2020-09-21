import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { AddressField } from "../02-BasicInformation/AddressField"
export const Employment = d => {
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
          name="EmploymentStatus"
          placeholder="None"
          required="Required"
          label={"Do you have a job?"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />
        {state["EmploymentStatus"] === "yes" && (
          <FieldRadio
            name="EmploymentFulltime"
            placeholder="None"
            required="Required"
            updateState={updateState}
            label={"Is the job full time?"}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        )}
        {state["EmploymentStatus"] === "no" && (
          <FieldRadio
            name="Employment.ever"
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
        {(state["Employment.ever"] === "yes" ||
          state["EmploymentFulltime"] === "yes") && (
          <>
            <FieldInput
              name={`Employment.info`}
              label="What kinds of work do you/did you do for your employer(s)?"
              required="Required"
              type="text"
              updateState={updateState}
            />

            <FieldRadio
              mt={4}
              name="Employment.cashBenefits"
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
        {state["EmploymentStatus"] === "yes" &&
          state["Employment.cashBenefits"] === "yes" && (
            <>
              <FieldInput
                name={`Employment.cashBenefitsDetails`}
                label="Describe the non-cash benefit you receive and how often you receive it."
                required="Required"
                type="text"
                updateState={updateState}
              />
              <FieldMoneyInput
                mt={4}
                name={`Employment.cashBenefitsAmount`}
                label="What is the value of the benefit, per year?"
                required="Required"
                type="text"
                updateState={updateState}
              />
            </>
          )}
        {state["EmploymentStatus"] === "yes" && state["EmploymentFulltime"] && (
          <FieldRadio
            name="Employment.union"
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
        {state["EmploymentStatus"] === "yes" &&
          state["Employment.union"] === "yes" && (
            <>
              <FieldInput
                name={`Employment.unionName`}
                label="Name of your union local"
                required="Required"
                type="text"
                updateState={updateState}
                mb="2"
              />
              <FieldMoneyInput
                name={`Employment.unionDues`}
                label="Amount of monthly dues"
                required="Required"
                type="text"
                updateState={updateState}
                mb="2"
              />
              <AddressField
                label={"Street Address"}
                name={"Employment.unionAddress"}
              />
            </>
          )}
      </>
    </FormizStep>
  )
}
