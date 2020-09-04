import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldInput } from "../Fields/FieldInput"
import { Box, IconButton, Stack } from "@chakra-ui/core"
import { SectionHeader } from "../SectionHeader"
import { AddPlaceholder } from "../AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { FaPlus, FaTrashAlt } from "react-icons/fa/index"

export const OtherAllowableDeductions = () => {
  const form = useForm({ subscribe: { fields: true } })
  const defaultCollection = [
    {
      id: uuidv4(),
      name: "",
    },
  ]
  const [collection, setCollection] = useState(defaultCollection)

  useEffect(() => {
    setCollection(defaultCollection)
  }, [form.resetKey])

  const addItem = () => {
    setCollection(c => [
      ...c,
      {
        id: uuidv4(),
      },
    ])
  }

  const addItemAtIndex = index => {
    setCollection(c => [
      ...c.slice(0, index + 1),
      {
        id: uuidv4(),
      },
      ...c.slice(index + 1),
    ])
  }

  const removeItem = id => {
    setCollection(c => c.filter(x => x.id !== id))
  }

  return (
    <>
      {form.values.AllowableDeductions &&
        form.values.AllowableDeductions.other === true && (
          <FormizStep name="OtherAllowableDeductions" order={15500}>
            <SectionHeader header={`Enter your other allowable deductions:`} />
            <Box fontSize={"md"} mb={4}>
              Enter the type and annual amount of "Other" deduction you have.
              Continue to click "Add another entry" until finished.
            </Box>
            <Box>
              {collection.map(({ id, name }, index) => (
                <Stack
                  key={id}
                  direction="row"
                  spacing="2"
                  mb="6"
                  data-test={`repeater-item[${index}]`}
                >
                  <Box transform="translateY(4rem)">
                    <IconButton
                      aria-label="Add"
                      icon={<FaPlus />}
                      size="sm"
                      onClick={() => addItemAtIndex(index)}
                      variant="ghost"
                      isDisabled={collection.length > 20}
                      pointerEvents={
                        index + 1 >= collection.length ? "none" : null
                      }
                      opacity={index + 1 >= collection.length ? 0 : null}
                    />
                  </Box>
                  <Box flex="1">
                    <FieldInput
                      name={`OtherAllowableDeductions[${index}].description`}
                      label={"What is the deduction for?"}
                      m="0"
                    />
                  </Box>

                  <Box flex="1">
                    <FieldMoneyInput
                      name={`OtherAllowableDeductions[${index}].amount`}
                      label={"Enter amount:"}
                      m="0"
                    />
                    {/*<Box ml={4} fontSize={"md"}>*/}
                    {/*  {form.values.OtherAllowableDeductions &&*/}
                    {/*  form.values.OtherAllowableDeductions[index] &&*/}
                    {/*  form.values.OtherAllowableDeductions[index].type ===*/}
                    {/*    "capitalgainshouse"*/}
                    {/*    ? "Total capital gain received"*/}
                    {/*    : "Gross amount (amount before taxes) received per year"}*/}
                    {/*</Box>*/}
                  </Box>
                  <Box transform="translateY(1rem)" pt="1.75rem">
                    <IconButton
                      aria-label="Delete"
                      icon={<FaTrashAlt />}
                      onClick={() => removeItem(id)}
                      variant="ghost"
                    />
                  </Box>
                </Stack>
              ))}
            </Box>

            {OtherAllowableDeductions.length <= 20 && (
              <AddPlaceholder label="Add another entry?" onClick={addItem} />
            )}
          </FormizStep>
        )}
    </>
  )
}
