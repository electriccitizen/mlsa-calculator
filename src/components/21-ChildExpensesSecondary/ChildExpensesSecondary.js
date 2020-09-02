import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { AddPlaceholder } from "../AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import {
  IconButton,
  Box,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/core"
import { DeleteIcon } from "@chakra-ui/icons"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

export const ChildExpensesSecondary = number => {
  const form = useForm()
  const numChildren = sessionStorage.getItem("numChildren")
  // console.log(form.values.primaryChildren['0'].fname)
  let updateState = (name, value, index) => {
    name === "ChildExpensesSecondary." + index + ".housing" &&
      sessionStorage.setItem("ChildExpensesSecondary." + index + ".housing", value)
    name === "ChildExpensesSecondary." + index + ".support" &&
      sessionStorage.setItem("ChildExpensesSecondary." + index + ".support", value)
    name === "ChildExpensesSecondary." + index + ".depcare" &&
      sessionStorage.setItem("ChildExpensesSecondary." + index + ".depcare", value)
    name === "ChildExpensesSecondary." + index + ".medical" &&
      sessionStorage.setItem("ChildExpensesSecondary." + index + ".medical", value)
    name === "ChildExpensesSecondary." + index + ".status" &&
      sessionStorage.setItem("ChildExpensesSecondary." + index + ".status", value)
    name === "ChildExpensesSecondary." + index + ".otherExpenses" &&
      sessionStorage.setItem("ChildExpensesSecondary." + index + ".otherExpenses", value)
  }
  // const housing = sessionStorage.getItem("ChildExpensesSecondary." + index + ".housing")
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
          name={`ChildExpensesSecondary` + index}
          order={21500 + index}
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

            <Text fontWeight={"md"} mb={4}>
            Enter the annual amounts spent on each expense for {form.values.primaryChildren &&
                      form.values.primaryChildren[index].fname} if any.
            </Text>
            <FieldMoneyInput
                  name={`ChildExpensesSecondary.${index}.childCareCost`}
                  label="Child care cost less dependent care tax credit, per year"
                  type="text"
                  placeholder="Enter amount"
                />
                <FieldMoneyInput
                  name={`ChildExpensesSecondary.${index}.healthInsurance`}
                  label="Health insurance premium, per year"
                  type="text"
                  placeholder="Enter amount"
                />
                <FieldMoneyInput
                  name={`ChildExpensesSecondary.${index}.medicalExpense`}
                  label="Unreimbursed medical expense over $250 for this child, per year"
                  type="text"
                  placeholder="Enter amount"
                />
                <FieldRadio
                  name={`ChildExpensesSecondary.${index}.otherExpenses`}
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
                  "ChildExpensesSecondary." + index + ".otherExpenses"
                ) === "yes" &&
                  additionalExpenses.map((expense, x) => (
                    <>
                      <Box fontSize={"md"} mb={2}>
                        Enter a description of each other expense and the amount
                        spent per year.
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
                            name={`ChildExpensesSecondary.${index}.otherExpenses.${x}.desc`}
                            label="Description"
                            required="Required"
                            m="0"
                          />
                        </Box>
                        <Box flex="1">
                          <FieldInput
                            name={`ChildExpensesSecondary.${index}.otherExpenses.${x}.amt`}
                            label="Amount per year"
                            required="Required"
                            m="0"
                          />
                        </Box>
                        <Box pt="1.75rem">
                          <IconButton
                            icon={<DeleteIcon />}
                            onClick={() => removeItem(expense.id)}
                            variant="ghost"
                          />
                        </Box>
                      </Stack>
                    </>
                  ))}
                {sessionStorage.getItem(
                  "ChildExpensesSecondary." + index + ".otherExpenses"
                ) === "yes" &&
                  additionalExpenses.length <= 20 && (
                    <AddPlaceholder label="Add expense" onClick={addItem} />
                  )}

          </SectionWrapper>
        </FormizStep>
      ))}
    </>
  )
}
