import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import { Box } from "@chakra-ui/core"
export const InitiateInterview = () => {
  const [state, setState] = useState({
    Documents: "",
    Action: "",
    Location: "",
  })

  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  return (
    <FormizStep label="Start interview" name="initiateInterview" order={1000}>
      <SectionWrapper>
        <SectionHeader
          header={"Which documents would you like to produce?"}
          helpLinks={[{ value: "/guide", label: "Calculator Guide" }]}
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
          orientation={"vertical"}
          options={[
            { value: "both", label: "Both documents" },
            { value: "worksheets", label: "Child Support Worksheets" },
            { value: "affadavit", label: "Financial Affadavit" },
          ]}
        />
      </SectionWrapper>

      {(state.Documents === "worksheets" || state.Documents === "both") && (
        <>
          <SectionWrapper>
            <SectionHeader
              header={
                " Will this calculation be used to establish a new child support order OR to modify the amount of an existing support order?"
              }
            />
            <FieldRadio
              name="Action"
              required="Required"
              updateState={updateState}
              orientation={"vertical"}
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
          </SectionWrapper>

          {state.Action === "establish" ? (
            <SectionWrapper>
              <SectionHeader
                header={
                  "If available, enter the District Court Case number or CSED Case number for the case in which you are seeking child support."
                }
              />
              <FieldInput
                name="CSED"
                label="District Court Case Number or CSED Case Number:"
                updateState={updateState}
                size={"xl"}
              />
            </SectionWrapper>
          ) : (
            state.Action === "modify" && (
              <>
                <SectionHeader
                  header={"Was the child support order issued in Montana?"}
                />
                <FieldRadio
                  name="Location"
                  required="Required"
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {state.Location === "no" && (
                  <Box ml={4} mr={4} p={4} bg={"gray.400"} fontSize="lg">
                    Sorry, this tool is only available for cases in the State of
                    Montana.
                  </Box>
                )}

                {state.Location === "yes" && (
                  <SectionWrapper>
                    <SectionHeader
                      header={
                        "Enter the District Court Case number or CSED Case number for the case in which you are seeking child support."
                      }
                    />
                    <FieldInput
                      name="CSED"
                      label="District Court Case Number (CSED)"
                      required="Required"
                      updateState={updateState}
                    />
                  </SectionWrapper>
                )}
              </>
            )
          )}
        </>
      )}
    </FormizStep>
  )
}
