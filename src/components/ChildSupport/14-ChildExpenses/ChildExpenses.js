import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { IconButton, Text, Box, Stack } from "@chakra-ui/react"
import { FaTrashAlt } from "react-icons/fa/index"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"
import { v4 as uuidv4 } from "uuid"

export const ChildExpenses = () => {
  const form = useForm({ subscribe: true })

  const [state, setState] = useState({})
  let updateState = (name, value) => {
    setState({
      ...state,
      [name]: value,
    })
  }
  const primaryChildren = Object.values(form.values?.PrimaryChildren || {}).filter(child => child.status === 'none')
  const numChildren = primaryChildren.length
  const documents = form?.values?.Documents
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

  //console.log(form.flatValues)

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
                `Enter expenses for ` +
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
          {
            (documents === "both" || documents === "affadavit") && (
              <>
                <FieldRadio
                  name={`ChildExpenses.${index}.housing`}
                  label="Who does the child live with most of the time?"
                  required="Required"
                  index={index}
                  updateState={updateState}
                  forceStack={true}
                  options={[
                    { value: "me", label: "Me" },
                    {
                      value: "otherparent",
                      label: "The child's other parent",
                    },
                    { value: "split", label: "50-50 split" },
                    { value: "other", label: "Someone else" },
                  ]}
                />
                <Text mt={2} mb={4} fontSize={"md"}>
                  Only chose 50-50 split if it is a true 50 split where the child
                  lives exactly half time with both parents.
                </Text>
                {state[`ChildExpenses.${index}.housing`] === "other" && (
                  <>
                    <FieldInput
                      name={`ChildExpenses.${index}.otherHousing`}
                      label="Who does the child live with most of the time?"
                      type="text"
                      placeholder=""
                      mb="4"
                    />
                  </>
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
                    {state[`ChildExpenses.${index}.support`] === "yes" && (
                      <FieldMoneyInput
                        name={`ChildExpenses.${index}.childSupportAmount`}
                        label="Monthly child support you are ordered to pay for this child."
                        type="text"
                        placeholder="Enter amount"
                        mb="8"
                      />
                    )}
                  </>
                )}
              </>
            )
          }
          
          <Text fontWeight={"md"} mb={4}>
            Enter the annual amounts spent on each expense for{" "}
            {primaryChildren &&
              primaryChildren[index]?.fname}{" "}
            if any.
          </Text>
          <FieldMoneyInput
            name={`ChildExpenses.${index}.childCareCost`}
            label="Child care cost less dependent care tax credit, per year"
            type="text"
            placeholder="Enter amount"
            helper={
              "For information of the Dependent Care Credit  visit  <a href='https://www.irs.gov/taxtopics/tc602' target='_blank'>or visit the IRS Child and Dependent Care Credit page</a>"
            }
          />
          <FieldMoneyInput
            name={`ChildExpenses.${index}.healthInsurance`}
            label="Health insurance premium, per year"
            type="text"
            placeholder="Enter amount"
            helper={
              "This amount is only the cost of the child's premium. If you need help calculating the child's portion of your health insurance premium see the User Manual or ask your employer."
            }
          />
          <FieldMoneyInput
            name={`ChildExpenses.${index}.medicalExpense`}
            label="Unreimbursed medical expense over $250 for this child, per year"
            type="text"
            placeholder="Enter amount"
            helper={
              "An example might be out-of-pocket medication. These should be expenses you are pretty sure you will have to pay every year. For more information see the User Manual."
            }
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
            helper={"See the User's Manual for examples"}
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
                    <FieldMoneyInput
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
            additionalExpenses.length <= 3 && (
              <AddPlaceholder label="Add expense" onClick={addItem} />
            )}
          <AdministrativeRules
            rules={[123]}
            explanation={
              "For definitions and more information, click on the links below:"
            }
          />
        </FormizStep>
      ))}
    </>
  )
}
