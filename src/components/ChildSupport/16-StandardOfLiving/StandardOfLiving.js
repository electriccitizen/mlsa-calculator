import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { FaTrashAlt } from "react-icons/fa/index"
import { IconButton, Box, Stack } from "@chakra-ui/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"

export const StandardOfLiving = number => {
  const form = useForm({ subscribe: false })
  const [state, setState] = useState({})
  let updateState = (name, value) => {
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
      <FormizStep label="Standard of Living Adjustment" name={`StandardOfLiving`} order={16000}>
        <SectionWrapper>
          <Box mb="8">
            <SectionHeader header={`Your Standard of Living Adjustment`} />
          </Box>
          <FieldRadio
            name={`StandardOfLiving.mileage`}
            label="Have you driven any miles for long-distance parenting?"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {state["StandardOfLiving.mileage"] === "yes" && (
            <FieldInput
              name={`StandardOfLiving.mileage.distance`}
              label="How many miles do you drive annually to exercise long-distance parenting?"
              type="text"
              placeholder=""
              mb="4"
            />
          )}
          <FieldRadio
            name={`StandardOfLiving.transportation`}
            label="Do you have other, non-automobile transportation costs?"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {state["StandardOfLiving.transportation"] === "yes" && (
            <FieldInput
              name={`StandardOfLiving.transportation.othercost`}
              label="How much are those other costs, annually?"
              type="text"
              placeholder=""
              mb="4"
            />
          )}
          <FieldRadio
            name={`StandardOfLiving.other`}
            label="Do you have other standard of living adjustments to add?"
            required="Required"
            updateState={updateState}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          {state["StandardOfLiving.other"] === "yes" &&
            additionalExpenses.map((expense, x) => (
              <Box key={x}>
                <Box fontSize={"md"} mb={2}>
                  Continue to add your other standard of living adjustments
                  until finished.
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
                      name={`StandardOfLiving.other.${x}.desc`}
                      label="Describe the adjustment"
                      required="Required"
                      m="0"
                    />
                  </Box>
                  <Box flex="1">
                    <FieldInput
                      name={`StandardOfLiving.other.${x}.amt`}
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
              </Box>
            ))}
          {state["StandardOfLiving.other"] === "yes" &&
            additionalExpenses.length <= 20 && (
              <AddPlaceholder label="Add adjustment" onClick={addItem} />
            )}
        </SectionWrapper>
      </FormizStep>
    </>
  )
}
