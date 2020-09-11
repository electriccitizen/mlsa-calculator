import React, {useState } from "react"
import { FormizStep } from "@formiz/core"
import { Box } from "@chakra-ui/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldRadio } from "../../Fields/FieldRadio"

export const Education = () => {
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }

  const status = state["Education.status"]

  return (
    <FormizStep label={`Loss of Education`} name="Education" order={13000}>
      <SectionWrapper>
        <SectionHeader header={`Loss of Education`} />
        <FieldRadio
          name="Education.status"
          placeholder="None"
          required="Required"
          label={"Did the victimization keep you from participating in school?"}
          updateState={updateState}
          options={[
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
          ]}
        />

        {status === "yes" && (
          <Box p={8} bg="gray.200" fontSize={"md"} mb={4}>
            Screen about getting a lawyer and Title IX
          </Box>
        )}

      </SectionWrapper>
    </FormizStep>
  )
}
