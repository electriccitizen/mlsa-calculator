import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import { AddPlaceholder } from "../AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { FaPlus, FaTrashAlt } from "react-icons/fa/index"
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

export const StandardOfLivingSecondary = number => {
  const form = useForm()
  let updateState = (name, value, index) => {
    name === "StandardOfLivingSecondary.mileage" &&
    sessionStorage.setItem("StandardOfLivingSecondary.mileage", value)
    name === "StandardOfLivingSecondary.transportation" &&
    sessionStorage.setItem("StandardOfLivingSecondary.transportation", value)
    name === "StandardOfLivingSecondary.other" &&
    sessionStorage.setItem("StandardOfLivingSecondary.other", value)
  }
  const { colorMode } = useColorMode()

  const [additionalExpenses, setAdditionalExpenses] = useState([])
  useEffect(() => {
    setAdditionalExpenses([])
  }, [form.resetKey])

  const addItem = () => {
    setAdditionalExpenses(s => [
      ...s,
      {
        id: uuidv4(),
      },
    ])
  }
  const removeItem = id => {
    setAdditionalExpenses(s => s.filter(x => x.id !== id))
  }

  return (
    <>
      <FormizStep name={`StandardOfLivingSecondary`} order={23000}>
        <SectionWrapper>
          <Box mb="8">
            <SectionHeader header={`Your Standard of Living Adjustment`} />
          </Box>
          <FieldRadio
            name={`StandardOfLivingSecondary.mileage`}
            label="Have you driven any miles for long-distance parenting?"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {sessionStorage.getItem("StandardOfLivingSecondary.mileage") === "yes" && (
            <FieldInput
              name={`StandardOfLivingSecondary.mileage.distance`}
              label="How many miles do you drive annually to exercise long-distance parenting?"
              type="text"
              placeholder=""
              mb="4"
            />
          )}
          <FieldRadio
            name={`StandardOfLivingSecondary.transportation`}
            label="Do you have other, non-automobile transportation costs?"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {sessionStorage.getItem("StandardOfLivingSecondary.transportation") ===
          "yes" && (
            <FieldInput
              name={`StandardOfLivingSecondary.transportation.othercost`}
              label="How much are those other costs, annually?"
              type="text"
              placeholder=""
              mb="4"
            />
          )}
          <FieldRadio
            name={`StandardOfLivingSecondary.other`}
            label="Do you have other standard of living adjustments to add?"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {sessionStorage.getItem("StandardOfLivingSecondary.other") === "yes" &&
          additionalExpenses.map((expense, x) => (
            <>
              <Box fontSize={"md"} mb={2}>
                Continue to add your other standard of living adjustments until finished.
              </Box>
              <Stack
                key={x}
                direction="row"
                spacing="4"
                mb="6"
                backgroundColor={"gray.50"}
                borderRadius="md"
                borderWidth="1px"
                borderColor={"gray.200"}
                p="4"
              >
                <Box flex="1">
                  <FieldInput
                    name={`StandardOfLivingSecondary.other.${x}.desc`}
                    label="Describe the adjustment"
                    required="Required"
                    m="0"
                  />
                </Box>
                <Box flex="1">
                  <FieldInput
                    name={`StandardOfLivingSecondary.other.${x}.amt`}
                    label="Annual Amount"
                    required="Required"
                    m="0"
                  />
                </Box>
                <Box pt="1.75rem">
                  <IconButton
                    icon={<FaTrashAlt />}
                    onClick={() => removeItem(expense.id)}
                    variant="ghost"
                  />
                </Box>
              </Stack>
            </>
          ))}
          {sessionStorage.getItem("StandardOfLivingSecondary.other") === "yes" &&
          additionalExpenses.length <= 20 && (
            <AddPlaceholder label="Add adjustment" onClick={addItem} />
          )}
        </SectionWrapper>
      </FormizStep>
    </>
  )
}
