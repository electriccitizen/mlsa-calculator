import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Box } from "@chakra-ui/react"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const InitiateInterview = () => {
  const form = useForm({ subscribe: { fields: ["Documents", "Action", "Location"] } })
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const formDocuments = (form.fields.Documents && form.fields.Documents.value)
  const formAction = (form.fields.Action && form.fields.Action.valued)
  const formLocation = (form.fields.Location && form.fields.Location.value)

  // console.log(form.fields.Documents.value)

  return (
    <FormizStep label="Start interview" name="initiateInterview" order={1000}>
      <SectionHeader
        header={"Which documents would you like to produce?"}
        // helpLinks={[
        //   { value: "/guide", label: "Calculator Guide" },
        //   { value: "/guide", label: "Calculator Guide" },
        // ]}
        helpText={{
          text:
            "<p>You can choose to create one or both of the" +
            " documents.</p>" +
            "<p>If you have already completed a Financial Affidavit, it " +
            " will help you create the Child Support Worksheet.</p>" +
            "<p>If you have not created a Financial Affadavit, you can choose " +
            " to do so here.</p>",
        }}
      />

      <FieldRadio
        name="Documents"
        required="Required"
        updateState={updateState}
        forceStack={true}
        options={[
          { value: "both", label: "Both documents" },
          { value: "worksheets", label: "Child Support Worksheets" },
          { value: "affadavit", label: "Financial Affadavit" },
        ]}
        helper={
          "This amount is only the cost of your portion the premium. If you need help calculating the this portion of your health insurance premium see the User Manual or ask your employer."
        }
      />
      {((state.Documents === "worksheets" ||  formDocuments === "worksheets") || (state.Documents === "both" || formDocuments === "both")) && (
        <>
          <FieldRadio
            name="Action"
            required="Required"
            label={
              " Will this calculation be used to establish a new child support order OR to modify the amount of an existing support order?"
            }
            updateState={updateState}
            forceStack={true}
            options={[
              {
                value: "establish",
                label: "Establish a new child support order",
              },
              {
                value: "modify",
                label: "Modify the amount of an existing support order",
              },
            ]}
          />

          {(state.Action === "establish" || formAction === "establish") ? (
            <>
              <FieldInput
                name="CSED"
                label="If available, enter the District Court Case number or CSSD Case number for the case in which you are seeking child support:"
                size={"xl"}
                fieldWidth={"10rem"}
              />
            </>
          ) : (
            (state.Action === "modify" || formAction === "modify") && (
              <>
                <FieldRadio
                  name="Location"
                  required="Required"
                  label={"Was the child support order issued in Montana?"}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {(state.Location === "no" || formLocation === "no") && (
                  <Box
                    borderRadius="lg"
                    p={8}
                    mb={4}
                    color="gray.900"
                    bg="yellow.50"
                    fontSize={"md"}
                  >
                    Sorry, this tool is only available for cases in the State of
                    Montana.
                  </Box>
                )}

                {(state.Location === "yes" || formLocation === "yes") && (
                  <FieldInput
                    name="CSED"
                    label="Enter the District Court Case number or CSSD Case number for the case in which you are seeking child support:"
                    fieldWidth={"250px"}
                  />
                )}
              </>
            )
          )}
        </>
      )}
      <AdministrativeRules
        rules={[101, 102, 103, 140]}
        explanation={
          "For definitions and more information, click on the links below:"
        }
      />
    </FormizStep>
  )
}
