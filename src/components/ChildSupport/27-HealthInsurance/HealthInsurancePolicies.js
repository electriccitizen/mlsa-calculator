import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { InsuranceAddressField } from "./InsuranceAddressField"
import { AddPlaceholder } from "../../Utils/AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import { Box, Divider, IconButton, Stack } from "@chakra-ui/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FaTrashAlt } from "react-icons/fa"

export const HealthInsurancePolicies = number => {
  const form = useForm()
  // const updateState = (name, value) => {
  //   setState({
  //     ...state,
  //     [name]: value,
  //   })
  // }

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

  const removeItem = id => {
    setCollection(c => c.filter(x => x.id !== id))
  }

  return (
    <>
      {form.values.Insurance && form.values.Insurance.current === "yes" && (
        <FormizStep  label="Health Insurance Policies" name="HealthInsurancePolicies" order={27500}>
          <SectionHeader header={`Health Insurance Policies`} />
          <Box fontSize={"md"} mb={4}>
            Continue to click "Add another policy" until you have entered all
            applicable health insurance policies.
          </Box>

          {collection.map(({ id, name }, index) => (
            <Stack
              key={id}
              direction="row"
              spacing="2"
              mb="6"
              data-test={`repeater-item[${index}]`}
            >
              <Box>
                <FieldInput
                  name={`HealthInsurancePolicies.${index}.covered`}
                  label={"Name everyone who is covered by this policy."}
                  required="Required"
                />
                <InsuranceAddressField
                  header={"Policy information"}
                  label={"Street Address"}
                  name={`HealthInsurancePolicies.${index}.policyName`}
                  index={index}
                />

                <FieldMoneyInput
                  name={`HealthInsurancePolicies.${index}.totalCost`}
                  required="Required"
                  label={
                    "Total cost of health insurance premium per month, including your children"
                  }
                />
                <FieldMoneyInput
                  name={`HealthInsurancePolicies.${index}.childPortion`}
                  required="Required"
                  label={"CHILDREN'S portion of premium"}
                />
                <FieldMoneyInput
                  name={`HealthInsurancePolicies.${index}.groupPortion`}
                  required="Required"
                  label={
                    "Portion of premium to be paid by employer or other group each month"
                  }
                />
                <Divider />
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

          {HealthInsurancePolicies.length <= 20 && (
            <AddPlaceholder label="Add another policy?" onClick={addItem} />
          )}
        </FormizStep>
      )}
    </>
  )
}
