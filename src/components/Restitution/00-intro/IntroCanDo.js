import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import {
  Text,
} from "@chakra-ui/core"

export const IntroCanDo = () => {
  return (
    <FormizStep label={"What this tool can do"} name="initiate.introCanDo" order={600}>
      <SectionHeader header={"What this tool can do"} />
      <Text>
        You will be asked a series of questions in order to help you record existing and future expenses incurred because of the crime. The tool will estimate possible restitution costs for inclusion in criminal cases.  A Court may order a defendant to pay some or all of these costs to the victim or to the Crime Victim Compensation Program.
      </Text>
    </FormizStep>
  )
}
