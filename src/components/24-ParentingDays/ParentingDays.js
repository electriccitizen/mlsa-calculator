import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import { AddPlaceholder } from "../AddPlaceholder"
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Collapse,
  Button,
  IconButton,
  Box,
  Text,
  Stack,
  useColorMode,
} from "@chakra-ui/core"
import { DeleteIcon } from "@chakra-ui/icons"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const ParentingDays = number => {
  const form = useForm()
  let updateState = (name, value, index) => {
    name === "ChildExpenses." + index + ".housing" &&
      sessionStorage.setItem("ChildExpenses." + index + ".housing", value)
  }
  const { colorMode } = useColorMode()

  const otherParent = form.values.otherParent
    ? form.values.otherParent.fname
    : ""
  const numChildren = sessionStorage.getItem("numChildren")
  return (
    <FormizStep name="ParentingDays" order={24000}>
      <>
        <SectionWrapper>
          <SectionHeader header={`Parenting Days`} />

          <FieldRadio
            name="ParentingDays.primary"
            placeholder="None"
            required="Required"
            label={"Which parent does the child primarily live with?"}
            updateState={updateState}
            options={[
              { value: "me", label: "Me" },
              { value: "other", label: otherParent },
            ]}
          />
          <Text fontSize={"md"}>
            How many days per year does each child spend with you? The number
            you enter will be subtracted from 365 and the remainder will be the
            number of days this child spends with Daddy.
          </Text>
          {Array.apply(null, { length: 2 }).map((e, index) => (
            <Box d={"flex"}>
              <Box>
                <FieldInput
                  name={`ParentingDays.${index}.name`}
                  label="Child's name"
                  //defaultValue={form.values.primaryChildren.`$index`.fname}
                  defaultValue={"First name"}
                  isDisabled={true}
                  type="text"
                  mb="4"
                  mr={"4"}
                  fieldWidth={"90%"}
                />
              </Box>
              <Box>
              <FieldInput
                name={`ParentingDays.${index}.amount`}
                label="Days spent per yer with you"
                defaultValue=""
                type="text"
                mb="4"
                fieldWidth={"60%"}
              />
              </Box>
            </Box>
          ))}
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
