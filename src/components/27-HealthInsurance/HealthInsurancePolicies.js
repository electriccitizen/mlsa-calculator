import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldDate } from "../Fields/FieldDate"
import { InsuranceAddressField } from "./InsuranceAddressField"
import { AddPlaceholder } from "../AddPlaceholder"
import { v4 as uuidv4 } from "uuid"
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Collapse,
  Button,
  IconButton,
  Box,
  Text,
  Stack,
  useColorMode,
  Divider,
} from "@chakra-ui/core"
import { DeleteIcon } from "@chakra-ui/icons"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { FaTrashAlt } from "react-icons/fa"

export const HealthInsurancePolicies = number => {
  const form = useForm()
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

  let updateState = (name, value, index) => {
    console.log(index)
    name === "HealthInsurancePolicies." + index + ".grad" &&
      sessionStorage.setItem(
        "HealthInsurancePolicies." + index + ".grad",
        value
      )
  }

  return (
    <>
      {form.values.Insurance && form.values.Insurance.current === "yes" && (
        <FormizStep name="HealthInsurancePolicies" order={27500}>
          <SectionHeader header={`Health Insurance Policies`} />
          <Box fontSize={"md"} mb={4}>
            Continue to click "Add another policy" until you have entered all
            applicable health insurance policies.
          </Box>

          {collection.map(({ id, name }, index) => (
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
          ))}

          {HealthInsurancePolicies.length <= 20 && (
            <AddPlaceholder label="Add another policy?" onClick={addItem} />
          )}
        </FormizStep>
      )}
    </>
  )
}
