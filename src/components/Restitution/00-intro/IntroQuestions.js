import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import {
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react"
import { FaCheckCircle } from "react-icons/fa/index"
export const IntroQuestions = () => {
  return (
    <FormizStep
      label={"Additional questions?"}
      name="introQuestions"
      order={1000}
    >
      <SectionHeader header={"Have additional questions?"} />

      <List spacing={4}>
        <ListItem>
          <ListIcon as={FaCheckCircle} color="brand.400" />A victim advocate may
          be able to help you with this restitution workbook. You can find a
          Crime Victim Advocates near you using the <a isExternal href={"https://www.mocadsv.org/how-to-get-help/"}>MCADSV resource map</a>.
        </ListItem>
        <ListItem>
          <ListIcon as={FaCheckCircle} color="brand.400" />
          The Montana Department of Justice, Office for Victim Services
          Restitution Officer may also be able to answer questions about
          restitution. Contact the Restitution Officer at 406-444-7847
        </ListItem>
        <ListItem>
          <ListIcon as={FaCheckCircle} color="brand.400" />
          If you need legal help, you can apply for free legal assistance from
          Montana Legal Services Association. Call the MLSA HelpLine toll free
          at 1-800-666-6899.
        </ListItem>
      </List>
    </FormizStep>
  )
}
