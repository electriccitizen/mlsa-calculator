import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { IconButton, Box, Stack, Text, useColorMode } from "@chakra-ui/core"
import { FaTrashAlt } from "react-icons/fa/index"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"

export const ChildExpensesSecondary = () => {
  const form = useForm({ subscribe: { fields: true } })
  const numChildren = form.values.NumPrimaryChildren
  const [state, setState] = useState({})
  const updateState = (name, value, index) => {
    setState({
      ...state,
      [name]: value,
    })
  }
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
              Enter the annual amounts spent on each expense for{" "}
              {form.values.primaryChildren &&
                form.values.primaryChildren[index].fname}{" "}
              if any.
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
            {state["ChildExpensesSecondary." + index + ".otherExpenses"] ===
              "yes" &&
              additionalExpenses.map((expense, x) => (
                <Box key={x}>
                  <Box fontSize={"md"} mb={2}>
                    Enter a description of each other expense and the amount
                    spent per year.
                  </Box>
                  <Stack
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
                        icon={<FaTrashAlt />}
                        onClick={() => removeItem(expense.id)}
                        variant="ghost"
                      />
                    </Box>
                  </Stack>
                </Box>
              ))}
            {state["ChildExpensesSecondary." + index + ".otherExpenses"] ===
              "yes" &&
              additionalExpenses.length <= 20 && (
                <AddPlaceholder label="Add expense" onClick={addItem} />
              )}
          </SectionWrapper>
        </FormizStep>
      ))}
    </>
  )
}
