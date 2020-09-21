import React from "react"
import { FormizStep } from "@formiz/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import {
  Box,
  Text,
  List,
  ListItem,
  ListIcon,
  useColorMode,
} from "@chakra-ui/core"
import { FaCheckCircle } from "react-icons/fa"

export const IntroCanDo = () => {
  const { colorMode } = useColorMode()
  return (
    <FormizStep label={"What this tool can do"} name="initiate.introCanDo" order={600}>
      <SectionHeader header={"What this tool can do"} />
      <Text>
        [rewrite] You will be asked a series of questions in order to help
        determine restitution costs. The tool will calculate restitution costs
        for inclusion in:
      </Text>

      <Box pr={4} pl={4} mt={2}>
        <List
          color={colorMode === "dark" ? "gray.400" : "gray.500"}
          mt={2}
          spacing={4}
        >
          <ListItem>
            <ListIcon as={FaCheckCircle} color="brand.400" />A petition for a
            dissolution with children in District Court in Montana.
          </ListItem>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="brand.400" />A petition for a
            parenting plan in District Court in Montana.
          </ListItem>
          <ListItem>
            <ListIcon as={FaCheckCircle} color="brand.400" />A modification of a
            child support order that was made in a dissolution with children or
            parenting plan by a District Court in Montana.
          </ListItem>
        </List>
      </Box>
    </FormizStep>
  )
}
