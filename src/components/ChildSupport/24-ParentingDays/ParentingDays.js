import React from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { Box, Text } from "@chakra-ui/core"
import { SectionWrapper } from "../../Utils/SectionWrapper"
import { SectionHeader } from "../../Utils/SectionHeader"

export const ParentingDays = number => {
  const form = useForm({ subscribe: { fields: true } })
  const numChildren = form.values.NumPrimaryChildren

  const otherParent = form.values.otherParent
    ? form.values.otherParent.fname
    : ""
  return (
    <FormizStep label="Parenting Days" name="ParentingDays" order={24000}>
      <>
        <SectionWrapper>
          <SectionHeader header={`Parenting Days`} />

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
            How many days per year does each child spend with you? The number
            you enter will be subtracted from 365 and the remainder will be the
            number of days this child spends with Daddy.
          </Text>
          {Array.apply(null, { length: numChildren }).map((e, index) => (
            <Box key={index} d={"flex"}>
              <Box>
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
              </Box>
              <Box>
                <FieldInput
                  name={`ParentingDays.${index}.amount`}
                  label="Days spent per yer with you"
                  defaultValue=""
                  type="text"
                  mb="4"
                  fieldWidth={"60%"}
                />
              </Box>
            </Box>
          ))}
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
