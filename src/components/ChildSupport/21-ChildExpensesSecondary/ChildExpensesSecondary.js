import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { IconButton, Box, Stack, Text } from "@chakra-ui/react"
import { FaTrashAlt } from "react-icons/fa"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"
import { v4 as uuidv4 } from "uuid"

export const ChildExpensesSecondary = () => {
  const form = useForm({ subscribe: true })
  
  const primaryChildren = Object.values(form.values?.PrimaryChildren || {}).filter(child => child.status === 'none')
  const numChildren = primaryChildren.length
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

  const otherParent = form.values?.OtherParent?.fname || "other parent"

  return (
    <>
      {Array.apply(null, { length: numChildren }).map((e, index) => (
        <FormizStep
          key={index}
          name={`ChildExpensesSecondary` + index}
          order={21500 + index}
          label={`Child expenses (${index + 1} of ${numChildren})`}
        >
          <Box mb="8">
            <SectionHeader
              header={
                `Enter ${otherParent}'s expenses for ` +
                (primaryChildren &&
                  primaryChildren[index]?.fname) +
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
            {primaryChildren &&
              primaryChildren[index]?.fname}{" "}
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
            label="Does your spouse have other expenses for this child?"
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
                  Enter a description of each other expense and the amount spent
                  per year.
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
                    />
                  </Box>
                  <Box flex="1">
                    <FieldMoneyInput
                      name={`ChildExpensesSecondary.${index}.otherExpenses.${x}.amt`}
                      label="Amount per year"
                      required="Required"
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
          <AdministrativeRules
            rules={[110]}
            explanation={
              "For definitions and more information, click on the links below:"
            }
          />
        </FormizStep>
      ))}
    </>
  )
}
