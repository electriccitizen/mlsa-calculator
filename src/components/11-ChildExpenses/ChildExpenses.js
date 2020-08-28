import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldDate } from "../Fields/FieldDate"
import { FieldRadio } from "../Fields/FieldRadio"
import { AddPlaceholder } from "../AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
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
import { DeleteIcon } from '@chakra-ui/icons';
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const ChildExpenses = number => {
  const form = useForm()
  const flatform = form.flatValues
  const numChildren = sessionStorage.getItem("numChildren")
  // console.log(form.values.primaryChildren['0'].fname)
  let updateState = (name, value, index) => {
    name === "ChildExpenses." + index + ".housing" &&
      sessionStorage.setItem("ChildExpenses." + index + ".housing", value)
    name === "ChildExpenses." + index + ".support" &&
      sessionStorage.setItem("ChildExpenses." + index + ".support", value)
    name === "ChildExpenses." + index + ".depcare" &&
      sessionStorage.setItem("ChildExpenses." + index + ".depcare", value)
    name === "ChildExpenses." + index + ".medical" &&
      sessionStorage.setItem("ChildExpenses." + index + ".medical", value)
    name === "ChildExpenses." + index + ".status" &&
      sessionStorage.setItem("ChildExpenses." + index + ".status", value)
    name === "ChildExpenses." + index + ".otherExpenses" &&
      sessionStorage.setItem("ChildExpenses." + index + ".otherExpenses", value)
  }
  // const housing = sessionStorage.getItem("ChildExpenses." + index + ".housing")
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
      {Array.apply(null, { length: numChildren }).map((e, index) => (
        <FormizStep
          key={index}
          name={`ChildExpenses` + index}
          order={11500 + index}
        >
          <SectionWrapper>
            <Box mb="8">
              <SectionHeader
                header={
                  `Enter the expenses for ` +
                  (form.values.primaryChildren &&
                    form.values.primaryChildren[index].fname) +
                  ` (Child ` +
                  (index + 1) +
                  ` of ` +
                  numChildren +
                  `)`
                }
              />
            </Box>
            <FieldRadio
              name={`ChildExpenses.${index}.housing`}
              label="Who does this child live with?"
              required="Required"
              index={index}
              updateState={updateState}
              options={[
                { value: "me", label: "Me" },
                {
                  value: "otherparent",
                  label: "The child's other parent",
                },
                { value: "other", label: "Someone else" },
              ]}
            />
            {sessionStorage.getItem("ChildExpenses." + index + ".housing") ===
              "other" && (

                <FieldInput
                  name={`ChildExpenses.${index}.otherHousing`}
                  label="Who does this child live with?"
                  type="text"
                  placeholder=""
                  mb="4"
                />
               )}
                {sessionStorage.getItem("ChildExpenses." + index + ".housing")  && (
                  <>
                <FieldMoneyInput
                  name={`ChildExpenses.${index}.benefits`}
                  label="Dependent's benefits received for this child per year, if any. Examples: Social Security, VA, etc."
                  type="text"
                  placeholder="Enter amount"
                  mb="4"
                />
                <FieldRadio
                  name={`ChildExpenses.${index}.support`}
                  label="Are you ordered to pay support for this child?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  mb="4"
                />
                {sessionStorage.getItem(
                  "ChildExpenses." + index + ".support"
                ) === "yes" && (
                  <FieldMoneyInput
                    name={`ChildExpenses.${index}.childSupportAmount`}
                    label="Monthly child support you are ordered to pay for this child."
                    type="text"
                    placeholder="Enter amount"
                    mb="8"
                  />
                )}
                <SectionHeader
                  header={
                    `Enter the annual amounts spent on each expense for, if any. ` +
                    (form.values.primaryChildren &&
                      form.values.primaryChildren[index].fname) +
                    ` (Child ` +
                    (index + 1) +
                    ` of ` +
                    numChildren +
                    `)`
                  }
                />
                <FieldMoneyInput
                  name={`ChildExpenses.${index}.childCareCost`}
                  label="Child care cost less dependent care tax credit, per year"
                  type="text"
                  placeholder="Enter amount"

                />
                <FieldMoneyInput
                  name={`ChildExpenses.${index}.healthInsurance`}
                  label="Health insurance premium, per year"
                  type="text"
                  placeholder="Enter amount"

                />
                <FieldMoneyInput
                  name={`ChildExpenses.${index}.medicalExpense`}
                  label="Unreimbursed medical expense over $250 for this child, per year"
                  type="text"
                  placeholder="Enter amount"

                />
                <FieldRadio
                  name={`ChildExpenses.${index}.otherExpenses`}
                  label="Do you have other expenses for this child?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                {sessionStorage.getItem(
                  "ChildExpenses." + index + ".otherExpenses"
                ) === "yes" &&
                  additionalExpenses.map((port, index) => (
                    <Stack
                      key={port.id}
                      direction="row"
                      spacing="4"
                      mb="6"
                      backgroundColor={'gray.50'}
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor={'gray.200'}
                      p="4"
                    >
                      <Box flex="1">
                        <FieldInput
                          name={`ChildExpenses[${index}].otherExpenses`}
                          label="Port number"
                          required="Required"
                          placeholder="e.g. 8080"
                          type="number"
                          m="0"
                          // validations={[
                          //   {
                          //     rule: (val) => (form.values.ports || [])
                          //       .filter((x) => x.number === val).length <= 1,
                          //     deps: [JSON.stringify(form.values.ports)],
                          //     message: 'Must be unique',
                          //   },
                          // ]}
                        />
                      </Box>
                      <Box flex="1">
                        <FieldInput
                          name={`ChildExpenses[${index}].name`}
                          label="Port name"
                          placeholder="e.g. webapp"
                          m="0"
                        />
                      </Box>
                      <Box pt="1.75rem">
                        <IconButton
                          icon={<DeleteIcon />}
                          onClick={() => removeItem(port.id)}
                          variant="ghost"
                        />
                      </Box>
                    </Stack>
                  ))

                }
                {sessionStorage.getItem(
                  "ChildExpenses." + index + ".otherExpenses"
                ) === "yes" &&

                additionalExpenses.length <= 20 && (
                  <AddPlaceholder label="Add expense" onClick={addItem} />

                  )}
                </>
            )}
          </SectionWrapper>
        </FormizStep>
      ))}
    </>
  )
}
