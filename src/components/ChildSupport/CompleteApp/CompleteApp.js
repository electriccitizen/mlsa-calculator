import React from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { Button, Stack } from "@chakra-ui/core"
import { SectionHeader } from "../../Utils/SectionHeader"

export const CompleteApp = () => {
  return (
    <FormizStep label={"Complete Interview"} name="CompleteApp" order={30000}>
      <SectionHeader header={`Complete`} />
     <Button colorScheme={"brand"}>Download PDF</Button>
    </FormizStep>
  )
}
