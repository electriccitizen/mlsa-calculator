import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { IconButton, Box, Stack } from "@chakra-ui/core"
import { FaTrashAlt } from "react-icons/fa/index"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { SectionHeader } from "../../Utils/SectionHeader"
import { v4 as uuidv4 } from "uuid"

export const ChildExpenses = () => {
  const form = useForm()
  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const numChildren = form.values.NumPrimaryChildren
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
          label={`Child expenses (${index + 1} of ${numChildren})`}
          name={`ChildExpenses${index}`}
          order={14500 + index}
        >
          <Box mb="8">
            <SectionHeader
              header={
                `Enter the expenses for ` +
                (form.values.PrimaryChildren &&
                  form.values.PrimaryChildren[0].fname) +
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
          {state[`ChildExpenses.${index}.housing`] === "other" && (
            <FieldInput
              name={`ChildExpenses.${index}.otherHousing`}
              label="Who does this child live with?"
              type="text"
              placeholder=""
              mb="4"
            />
          )}
          {state[`ChildExpenses.${index}.housing`] && (
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
              {state[`ChildExpenses.${index}.housing`] === "yes" && (
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
                  `Enter the annual amounts spent on each expense for ` +
                  (form.values.PrimaryChildren &&
                    form.values.PrimaryChildren[index].fname) +
                  `, if any.`
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
              {state[`ChildExpenses.${index}.otherExpenses`] === "yes" &&
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
                          name={`ChildExpenses.${index}.otherExpenses.${x}.desc`}
                          label="Description"
                          required="Required"
                        />
                      </Box>
                      <Box flex="1">
                        <FieldInput
                          name={`ChildExpenses.${index}.otherExpenses.${x}.amt`}
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
              {state[`ChildExpenses.${index}.otherExpenses`] === "yes" &&
                additionalExpenses.length <= 20 && (
                  <AddPlaceholder label="Add expense" onClick={addItem} />
                )}
            </>
          )}
        </FormizStep>
      ))}
    </>
  )
}
