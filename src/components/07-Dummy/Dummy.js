import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { List, ListItem, Box, SimpleGrid } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const Dummy = () => {
  const updateState = (name, value) => {
    name === "basic.children" && sessionStorage.setItem("numChildren", value)
  }

  let relationship = JSON.parse(sessionStorage.getItem("relationship"))
  let properNoun = ""
  relationship === "mother" ? (properNoun = "Father") : (properNoun = "Mother")

  return (
    <FormizStep name="Dummy" order={7000}>
      <SectionWrapper>
        <SectionHeader header={`Additional steps`} />
      </SectionWrapper>
      <List mb="8" as="ol" styleType="decimal">
        <ListItem>
          Your employment information -- job details+add another
        </ListItem>
        <ListItem>Your other types of income -- checkboxes+values </ListItem>
        <ListItem>
          Your expenses for Child (N) -- repeat for all children{" "}
        </ListItem>
        <ListItem>Your allowable deductions -- checkboxes+values</ListItem>
        <ListItem>
          Your standard of living adjustment -- checkboxes+values
        </ListItem>
      </List>
      <List mb="8" as="ol" styleType="decimal">
        <ListItem>
          Other employment information -- job details+add another
        </ListItem>
        <ListItem>Other's other types of income -- checkboxes+values </ListItem>
        <ListItem>
          Expenses for Other Child (N) -- repeat for all children{" "}
        </ListItem>
        <ListItem>Other's allowable deductions -- checkboxes+values</ListItem>
        <ListItem>
          Other's standard of living adjustment -- checkboxes+values
        </ListItem>
      </List>
      <List mb="8" as="ol" styleType="decimal">
        <ListItem>Parenting Days -- repeat for each child</ListItem>
        <ListItem>Financial affadavit Part 1 - values </ListItem>
        <ListItem>
        Schools - values
        </ListItem>
        <ListItem>
        Health Insurance
        </ListItem>
        <ListItem>Other's allowable deductions -- checkboxes+values</ListItem>
        <ListItem>
          Other's standard of living adjustment -- checkboxes+values
        </ListItem>
        <ListItem>Financial affadavit Part 2 - values </ListItem>
        <ListItem>Financial affadavit Part 3 - values </ListItem>
      </List>
    </FormizStep>
  )
}
