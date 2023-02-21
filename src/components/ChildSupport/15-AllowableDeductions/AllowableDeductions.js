import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box, Stack } from "@chakra-ui/react"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldSelect } from "../../Fields/FieldSelect"
import { FieldCheckbox } from "../../Fields/FieldCheckbox"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"
import {AlertBox} from "../../Utils/AlertBox";

export const AllowableDeductions = () => {
  const form = useForm({ subscribe: { fields: ["Documents"] } })
  const documents = form?.values?.Documents
  const [checkedItems, setCheckedItems] = useState({})
  return (
    <FormizStep
      label="Your allowable deductions"
      name="AllowableDeductions"
      order={15000}
    >
      <>
        <SectionHeader header={`Your allowable deductions`} />
        <FieldCheckbox
          name="AllowableDeductions"
          label="Select all that apply, or none of the above if you have no allowable deductions."
          setCheckedItems={setCheckedItems}
          checkedItems={checkedItems}
          options={[
            {
              value: "alimony",
              label: "Alimony/spousal support",
            },
            {
              value: "healthself",
              label: "Health insurance premium for yourself",
            },
            {
              value: "healthchildren",
              label: "Health insurance premium other children",
            },
            { value: "federal", label: "Federal income tax" },
            { value: "state", label: "State income tax" },
            { value: "ssn", label: "Social Security (FICA plus Medicare)" },
            {
              value: "retirement",
              label: "Mandatory retirement contributions",
            },
            {
              value: "reqemp",
              label: "Required employment expense",
            },
            {
              value: "extmed",
              label:
                "Extraordinary medical expenses for yourself, not reimbursed",
            },
            { value: "inhome", label: "In-home nursing care" },
            { value: "other", label: "Other" },
            { value: "none", label: "None of the above" },
          ]}
        />

          {checkedItems.none === true && (
              <AlertBox>
                  If you select "None of the above", please uncheck any other options to continue.
              </AlertBox>
          )}


          {checkedItems.alimony === true && (
          <Box d={"flex"}>
            <Box flex={1} mr={4}>
              <FieldMoneyInput
                name={`AllowableDeductions.alimony.amount`}
                label="Ordered alimony/spousal support"
                required="Required"
                type="text"
                mr={4}
              />
            </Box>
            <Box flex={1}>
              <FieldSelect
                name="AllowableDeductions.alimony.schedule"
                label="How often?"
                placeholder="Select option..."
                required="Required"
                options={[
                  { value: "52", label: "Once per week" },
                  { value: "26", label: "Every two weeks" },
                  { value: "24", label: "Twice a month" },
                  { value: "12", label: "Once per month" },
                  { value: "1", label: "Yearly" },
                ]}
              />
            </Box>
          </Box>
        )}
        {checkedItems.healthself === true && (
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            <FieldMoneyInput
              name={`AllowableDeductions.healthself.amount`}
              label="Ordered health insurance premium for yourself"
              required="Required"
              type="text"
              mr={4}
              helper={
                "This amount is only the cost of your portion the premium. If you need help calculating the this portion of your health insurance premium see the User Manual or ask your employer."
              }
            />

            <FieldSelect
              name="AllowableDeductions.healthself.schedule"
              label="How often?"
              placeholder="Select option..."
              required="Required"
              fieldwidth={"25%"}
              options={[
                { value: "52", label: "Once per week" },
                { value: "26", label: "Every two weeks" },
                { value: "24", label: "Twice a month" },
                { value: "12", label: "Once per month" },
                { value: "1", label: "Yearly" },
              ]}
            />
          </Stack>
        )}
        {checkedItems.healthchildren === true && (
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            <FieldMoneyInput
              name={`AllowableDeductions.healthchildren.amount`}
              label="Ordered health insurance premium for other children"
              required="Required"
              type="text"
              helper={
                "This amount is only the cost of the portion the premium for other children you support. If you need help calculating the this portion of your health insurance premium see the User Manual or ask your employer."
              }
            />
            <FieldSelect
              name="AllowableDeductions.healthchildren.schedule"
              label="How often?"
              placeholder="Select option..."
              required="Required"
              fieldwidth={"25%"}
              options={[
                { value: "52", label: "Once per week" },
                { value: "26", label: "Every two weeks" },
                { value: "24", label: "Twice a month" },
                { value: "12", label: "Once per month" },
                { value: "1", label: "Yearly" },
              ]}
            />
          </Stack>
        )}
        {checkedItems.federal === true && (
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            <FieldMoneyInput
              name={`AllowableDeductions.federal.amount`}
              label="Federal income tax"
              required="Required"
              type="text"
              helper={
                "You can use your last tax return to calculate this number or see the User's manual to learn more."
              }
            />
            <FieldSelect
              name="AllowableDeductions.federal.schedule"
              label="How often?"
              placeholder="Select option..."
              required="Required"
              options={[
                { value: "52", label: "Once per week" },
                { value: "26", label: "Every two weeks" },
                { value: "24", label: "Twice a month" },
                { value: "12", label: "Once per month" },
                { value: "1", label: "Yearly" },
              ]}
            />
          </Stack>
        )}
        {checkedItems.state === true && (
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            <FieldMoneyInput
              name={`AllowableDeductions.state.amount`}
              label="State income tax"
              required="Required"
              type="text"
              helper={
                "You can use your last tax return to calculate this number or see the User's manual to learn more."
              }
            />
            <FieldSelect
              name="AllowableDeductions.state.schedule"
              label="How often?"
              placeholder="Select option..."
              required="Required"
              fieldwidth={"25%"}
              options={[
                { value: "52", label: "Once per week" },
                { value: "26", label: "Every two weeks" },
                { value: "24", label: "Twice a month" },
                { value: "12", label: "Once per month" },
                { value: "1", label: "Yearly" },
              ]}
            />
          </Stack>
        )}
        {checkedItems.ssn === true && (
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            <FieldMoneyInput
              name={`AllowableDeductions.ssn.amount`}
              label="Social Security (FICA plus Medicare)"
              required="Required"
              type="text"
              helper={
                "You can use your last tax return to calculate this number or see the User's manual to learn more."
              }
            />
            <FieldSelect
              name="AllowableDeductions.ssn.schedule"
              label="How often?"
              placeholder="Select option..."
              required="Required"
              fieldwidth={"25%"}
              options={[
                { value: "52", label: "Once per week" },
                { value: "26", label: "Every two weeks" },
                { value: "24", label: "Twice a month" },
                { value: "12", label: "Once per month" },
                { value: "1", label: "Yearly" },
              ]}
            />
          </Stack>
        )}
        {checkedItems.retirement === true && (
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            <FieldMoneyInput
              name={`AllowableDeductions.retirement.amount`}
              label="Mandatory retirement contributions"
              required="Required"
              type="text"
              mr={4}
            />
            <FieldSelect
              name="AllowableDeductions.retirement.schedule"
              label="How often?"
              placeholder="Select option..."
              required="Required"
              fieldwidth={"25%"}
              options={[
                { value: "52", label: "Once per week" },
                { value: "26", label: "Every two weeks" },
                { value: "24", label: "Twice a month" },
                { value: "12", label: "Once per month" },
                { value: "1", label: "Yearly" },
              ]}
            />
          </Stack>
        )}
        {checkedItems.reqemp === true && (
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            <FieldMoneyInput
              name={`AllowableDeductions.reqemp.amount`}
              label="Required employment expense"
              required="Required"
              type="text"
              mr={4}
            />
            <FieldSelect
              name="AllowableDeductions.reqemp.schedule"
              label="How often?"
              placeholder="Select option..."
              required="Required"
              fieldwidth={"25%"}
              options={[
                { value: "52", label: "Once per week" },
                { value: "26", label: "Every two weeks" },
                { value: "24", label: "Twice a month" },
                { value: "12", label: "Once per month" },
                { value: "1", label: "Yearly" },
              ]}
            />
          </Stack>
        )}
        {checkedItems.extmed === true && (
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            <FieldMoneyInput
              name={`AllowableDeductions.extmed.amount`}
              label="Extraordinary dical expense for yourself - per year"
              required="Required"
              type="text"
              mr={4}
            />
            {
              (documents === "both" || documents === "affadavit") && (
                <FieldInput
                  name={`AllowableDeductions.extmed.desc`}
                  label="List the types of extraordinary medical expenses you have."
                  required="Required"
                  type="text"
                  mr={4}
                />
              )
            }
          </Stack>
        )}
        {checkedItems.inhome === true && (
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            <FieldMoneyInput
              name={`AllowableDeductions.inhome.amount`}
              label="In-home nursing care expense - per year"
              required="Required"
              type="text"
              mr={4}
            />
            {
              (documents === "both" || documents === "affadavit") && (
                <FieldInput
                  name={`AllowableDeductions.inhome.desc`}
                  label="List the types of in-home nursing care expenses you have and who you pay."
                  required="Required"
                  type="text"
                  mr={4}
                />
              )
            }
          </Stack>
        )}
          {checkedItems.other === true && (
             <>
              <AlertBox>
                Enter your "other" deductions on the next screen.
              </AlertBox>
              <FieldInput
              name={`AllowableDeductions.other.trigger`}
              value={"1"}
              type="hidden"
              mr={4}
              />
             </>
          )}
      </>
      <AdministrativeRules
        rules={[110, 111]}
        explanation={
          "For definitions and more information, click on the links below:"
        }
      />
    </FormizStep>
  )
}
