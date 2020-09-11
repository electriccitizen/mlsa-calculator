import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldInput } from "../../Fields/FieldInput"
import { Box, IconButton, Stack } from "@chakra-ui/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { FieldSelect } from "../../Fields/FieldSelect"
import { FaPlus, FaTrashAlt } from "react-icons/fa/index"

export const NonTaxableIncome = () => {
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
      {form.values.OtherIncome && form.values.OtherIncome.nontaxable === true && (
        <FormizStep label="Non-Taxable Income" name="NonTaxableIncome" order={13000}>
          <SectionHeader header={`Enter your other non-taxable income:`} />
          <Box fontSize={"md"} mb={4}>
            Continue to click "Add another entry" until you have entered all
            your non-taxable incomes.
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
                    name={`NonTaxableIncome[${index}].type`}
                    defaultValue={name}
                    label="Type of income"
                    placeholder="Select option..."
                    required="Required"
                    index={index}
                    options={[
                      { value: "bond", label: "Tax free municipal bond" },
                      {
                        value: "ssdi",
                        label: "Social Security Disability Income (SSDI)",
                      },
                      { value: "va", label: "VA disability income" },
                      { value: "comp", label: "Workers' Compensation" },
                      { value: "gifts", label: "Regular monetary gifts" },
                      { value: "grants", label: "Educations grants" },
                      { value: "fringe", label: "Fringe benefits" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </Box>
                <Box flex="1">
                  {form.values.NonTaxableIncome &&
                    form.values.NonTaxableIncome[index] &&
                    form.values.NonTaxableIncome[index].type === "other" && (
                      <FieldInput
                        name={`NonTaxableIncome[${index}].description`}
                        label={"Describe the income (40 characters max)"}
                        m="0"
                      />
                    )}
                  <FieldMoneyInput
                    name={`NonTaxableIncome[${index}].amount`}
                    label={"Enter amount:"}
                    m="0"
                  />
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
          {NonTaxableIncome.length <= 20 && (
            <AddPlaceholder label="Add another entry?" onClick={addItem} />
          )}
        </FormizStep>
      )}
    </>
  )
}
