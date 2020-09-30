import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import {
  Text,
  List,
  ListItem,
  ListIcon,
  Box,
} from "@chakra-ui/core"
import { FaCheckCircle } from "react-icons/fa/index"
export const IntroPrep = () => {
  return (
    <FormizStep label={"Preparation checklist"} name="introPrep" order={1000}>
      <SectionHeader header={"Preparation checklist"} />
      <Text>
        You may need to provide information for both existing and future
        expenses related to the crime. The following are examples of
        documentation and other information you may need in order to
        successfully complete the workbook:
      </Text>

      <Box display={{ md: "flex" }}>
        <Box mt={{ base: 4, md: 4 }} flex={1}>
          <List spacing={4}>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="brand.400" />
              Information on criminal case (cause number, prosecutor name)*
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="brand.400" />
              Funeral expenses
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="brand.400" />
              Injury expenses
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="brand.400" />
              Property Damage expenses
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="brand.400" />
              Mental Health Services expenses
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="brand.400" />
              Information on lost wages
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="brand.400" />
              Travel expenses for participation in the criminal court process
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="brand.400" />
              Moving & Safety Expenses
            </ListItem>
          </List>
          <Text fontSize={"lg"} mt={4}>
            *This information is not necessary for the workbook, but it may be helpful moving forward.
          </Text>
        </Box>
      </Box>
    </FormizStep>
  )
}
