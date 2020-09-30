import React from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Stack, Text } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldChild } from '../../Fields/FieldChild'
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const ParentingDays = number => {
  const form = useForm({ subscribe: true })
  const numChildren = form.values.NumPrimaryChildren

  const otherParent = form.values.OtherParent
    ? form.values.OtherParent.fname
    : "Other parent"

  return (
    <FormizStep label="Parenting days" name="ParentingDays" order={24000}>
      <SectionHeader header={`Parenting days`} />

      <FieldRadio
        name="ParentingDays.primary"
        placeholder="None"
        required="Required"
        label={"Which parent does the child primarily live with?"}
        options={[
          { value: "me", label: "Me" },
          { value: "other", label: otherParent },
        ]}
      />
      <Text fontSize={"md"} mb={4}>
        How many days per year does each child spend with you? The number you
        enter will be subtracted from 365 and the remainder will be the number
        of days this child spends with the other parent.
      </Text>
      {Array.apply(null, { length: numChildren }).map((e, index) => (
        <Stack
          direction={["column", "column", "row"]}
          spacing={["0", "0", "1rem"]}
          key={index}
        >

          <FieldChild
            name={`ParentingDays.${index}.name`}
            label={"Child's name"}
            child={
              form.values.PrimaryChildren &&
              form.values.PrimaryChildren[index] &&
              form.values.PrimaryChildren[index].fname +
                " " +
                form.values.PrimaryChildren[index].lname
            }
            mb="4"
            mr={"4"}
            borderColor={"gray.900"}
            fieldWidth={"90%"}
            fontSize={"lg"}
          />


          <FieldInput
            name={`ParentingDays.${index}.amount`}
            label="Days spent per year with you"
            defaultValue=""
            type="text"
            mb="4"
            isRequired={true}
            fieldWidth={"60%"}
          />
        </Stack>
      ))}
      <AdministrativeRules rules={[124]} />
    </FormizStep>
  )
}
