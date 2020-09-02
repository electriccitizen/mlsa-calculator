import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { Box } from "@chakra-ui/core"
export const InitiateInterview = ({ updateMontana }) => {
  // const setField = value => {
  //   return (
  //     JSON.parse(sessionStorage.getItem(value)) &&
  //     JSON.parse(sessionStorage.getItem(value))
  //   )
  // }

  // let documents = setField("documents")
  // let relationship = setField("relationship")
  // let action = setField("action")
  // let location = setField("location")

  const [state, setState] = useState({
    relationship: '',
    action: '',
    location: '',
    documents: '',

  });


  let updateState = (name, value) => {
    console.log("value")
    //  name === "initiate.relationship" &&
    //    sessionStorage.setItem("state.relationship", value)
    // // name === "initiate.action" &&
    //   sessionStorage.setItem("action", JSON.stringify(value))
    // name === "initiate.location" &&
    //   sessionStorage.setItem("location", JSON.stringify(value))
    name === "initiate.documents" &&
      setState("state.documents", value)
   //name === "initiate.location" && updateMontana(value)
  }
  return (
    <FormizStep name="initiateInterview" order={1000}>
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
          name="initiate.documents"
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

      {(state.documents === "worksheets" || state.documents === "both") && (
        <>
          <SectionWrapper>
            <SectionHeader
              header={
                " Will this calculation be used to establish a new child support order OR to modify the amount of an existing support order?"
              }
            />
            <FieldRadio
              name="initiate.action"
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

          {state.action === "establish" ? (
            <SectionWrapper>
              <SectionHeader
                header={
                  "If available, enter the District Court Case number or CSED Case number for the case in which you are seeking child support."
                }
              />
              <FieldInput
                name="initiate.csed"
                label="District Court Case Number or CSED Case Number:"
                updateState={updateState}
                size={"xl"}
              />
            </SectionWrapper>
          ) : (
            state.action === "modify" && (
              <>
                <SectionHeader
                  header={"Was the child support order issued in Montana?"}
                />
                <FieldRadio
                  name="initiate.location"
                  required="Required"
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {state.location === "no" && (
                  <Box ml={4} mr={4} p={4} bg={"gray.400"} fontSize="lg">
                    Sorry, this tool is only available for cases in the State of
                    Montana.
                  </Box>
                )}

                {state.location === "yes" && (
                  <SectionWrapper>
                    <SectionHeader
                      header={
                        "Enter the District Court Case number or CSED Case number for the case in which you are seeking child support."
                      }
                    />
                    <FieldInput
                      name="initiate.csed"
                      label="District Court Case Number (CSED)"
                      required="Required"
                      updateState={updateState}
                      size={"3xl"}
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
