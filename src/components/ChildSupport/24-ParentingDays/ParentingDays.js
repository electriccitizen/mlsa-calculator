import React from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Stack, Text } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { SectionHeader } from "../../Utils/SectionHeader"

export const ParentingDays = number => {
  const form = useForm({
    subscribe: { fields: ["OtherParentName", "NumPrimaryChildren"] },
  })
  const numChildren = form.values.NumPrimaryChildren

  const otherParent = form.values.OtherParentName
    ? form.values.OtherParentName
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
      <Text fontSize={"md"}>
        How many days per year does each child spend with you? The number you
        enter will be subtracted from 365 and the remainder will be the number
        of days this child spends with Daddy.
      </Text>
      {Array.apply(null, { length: numChildren }).map((e, index) => (
        <Stack
          direction={["column", "column", "row"]}
          spacing={["0", "0", "1rem"]}
          key={index}
        >
          <FieldInput
            name={`ParentingDays.${index}.name`}
            label="Child's name"
            defaultValue={"First name"}
            isDisabled={true}
            type="text"
            mb="4"
            mr={"4"}
            fieldWidth={"90%"}
          />

          <FieldInput
            name={`ParentingDays.${index}.amount`}
            label="Days spent per yer with you"
            defaultValue=""
            type="text"
            mb="4"
            fieldWidth={"60%"}
          />
        </Stack>
      ))}
    </FormizStep>
  )
}
