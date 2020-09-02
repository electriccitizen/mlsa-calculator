import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldInput } from "../Fields/FieldInput"
import { Box, Text, Icon, IconButton, SimpleGrid, Stack } from "@chakra-ui/core"
import { SectionHeader } from "../SectionHeader"
import { AddPlaceholder } from "../AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { FieldSelect } from "../Fields/FieldSelect"
import { FaPlus, FaTrashAlt } from "react-icons/fa/index"
const defaultCollection = [
  {
    id: uuidv4(),
    name: "",
  },
]

export const TaxableIncome = () => {
  const form = useForm()

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
      {form.values.OtherIncome && form.values.OtherIncome.taxable === true && (
        <FormizStep name="TaxableIncome" order={12000}>
          <SectionHeader header={`Enter your other taxable income:`} />
          <Box fontSize={"md"} mb={4}>
            Continue to click "Add another entry" until you have entered all
            your taxable incomes.
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
                  <FieldSelect
                    name={`TaxableIncome[${index}].type`}
                    defaultValue={name}
                    label="Type of income"
                    placeholder="Select option..."
                    required="Required"
                    index={index}
                    options={[
                      { value: "rental", label: "Rental income" },
                      { value: "capitalgains", label: "Capital gains" },
                      {
                        value: "capitalgainshouse",
                        label: "Capital gains on the sale of primary residence",
                      },
                      { value: "unemployment", label: "Unemployment benefits" },
                      { value: "scorportation", label: "S Corporation" },
                      { value: "alimony", label: "Spousal support (alimony)" },
                      { value: "contract", label: "Contract receipts" },
                      { value: "royalties", label: "Royalties" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </Box>

                <Box flex="1">
                  {form.values.TaxableIncome &&
                    form.values.TaxableIncome[index] &&
                    form.values.TaxableIncome[index].type === "other" && (
                      <FieldInput
                        name={`TaxableIncome[${index}].description`}
                        label={"Describe the income (40 characters max)"}
                        m="0"
                      />
                    )}
                  <FieldMoneyInput
                    name={`TaxableIncome[${index}].amount`}
                    label={"Enter amount:"}
                    m="0"
                  />
                  <Box ml={4} fontSize={"md"}>
                    {form.values.TaxableIncome &&
                    form.values.TaxableIncome[index] &&
                    form.values.TaxableIncome[index].type ===
                      "capitalgainshouse"
                      ? "Total capital gain received"
                      : "Gross amount (amount before taxes) received per year"}
                  </Box>
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

          {TaxableIncome.length <= 20 && (
            <AddPlaceholder label="Add another entry?" onClick={addItem} />
          )}
        </FormizStep>
      )}
    </>
  )
}
