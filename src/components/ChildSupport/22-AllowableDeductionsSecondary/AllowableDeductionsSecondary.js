import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Stack } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldSelect } from "../../Fields/FieldSelect"
import { FieldCheckbox } from "../../Fields/FieldCheckbox"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const AllowableDeductionsSecondary = () => {
  const form = useForm({
    subscribe: { fields: ["OtherParent.fname"] },
  })
  const otherParent = form.values.OtherParent
    ? form.values.OtherParent.fname
    : "Other parent"
  const [checkedItems, setCheckedItems] = useState({})
  return (
    <FormizStep
      label="Allowable deductions (other parent)"
      name="AllowableDeductionsSecondary"
      order={22000}
    >
      <SectionHeader header={otherParent + `'s allowable deductions`} />
      <FieldCheckbox
        name="AllowableDeductionsSecondary"
        label="Select all that apply, or none of the above if you have no allowable deductions."
        required="Required"
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
          { value: "taxfed", label: "Federal income tax" },
          { value: "taxstate", label: "State income tax" },
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
      {checkedItems.alimony === true && (
        <Stack
          direction={["column", "column", "row"]}
          spacing={["0", "0", "1rem"]}
        >
          <FieldMoneyInput
            name={`AllowableDeductionsSecondary.alimony.amount`}
            label="Ordered alimony/spousal support"
            required="Required"
            type="text"
            mr={4}
          />
          <FieldSelect
            name="AllowableDeductionsSecondary.alimony.schedule"
            label="How often?"
            placeholder="Select option..."
            required="Required"
            fieldwidth={"25%"}
            options={[
              { value: "weekly", label: "Once per week" },
              { value: "biweekly", label: "Every two weeks" },
              { value: "bimonthly", label: "Twice a month" },
              { value: "monthly", label: "Once per month" },
              { value: "yearly", label: "Yearly" },
            ]}
          />
        </Stack>
      )}
      {checkedItems.healthself === true && (
        <Stack
          direction={["column", "column", "row"]}
          spacing={["0", "0", "1rem"]}
        >
          <FieldMoneyInput
            name={`AllowableDeductionsSecondary.healthself.amount`}
            label="Ordered health insurance premium for yourself"
            required="Required"
            type="text"
            helper={
              "This amount is only the cost of your portion the premium. If you need help calculating the this portion of your health insurance premium see the User Manual or ask your employer."
            }
          />
          <FieldSelect
            name="AllowableDeductionsSecondary.healthself.schedule"
            label="How often?"
            placeholder="Select option..."
            required="Required"
            fieldwidth={"25%"}
            options={[
              { value: "weekly", label: "Once per week" },
              { value: "biweekly", label: "Every two weeks" },
              { value: "bimonthly", label: "Twice a month" },
              { value: "monthly", label: "Once per month" },
              { value: "yearly", label: "Yearly" },
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
            name={`AllowableDeductionsSecondary.healthchildren.amount`}
            label="Ordered health insurance premium for other children"
            required="Required"
            type="text"
            helper={
              "This amount is only the cost of the portion the premium for other children you support. If you need help calculating the this portion of your health insurance premium see the User Manual or ask your employer."
            }
          />
          <FieldSelect
            name="AllowableDeductionsSecondary.healthchildren.schedule"
            label="How often?"
            placeholder="Select option..."
            required="Required"
            fieldwidth={"25%"}
            options={[
              { value: "weekly", label: "Once per week" },
              { value: "biweekly", label: "Every two weeks" },
              { value: "bimonthly", label: "Twice a month" },
              { value: "monthly", label: "Once per month" },
              { value: "yearly", label: "Yearly" },
            ]}
          />
        </Stack>
      )}
      {checkedItems.taxfed === true && (
        <Stack
          direction={["column", "column", "row"]}
          spacing={["0", "0", "1rem"]}
        >
          <FieldMoneyInput
            name={`AllowableDeductionsSecondary.taxfed.amount`}
            label="Federal income tax"
            required="Required"
            type="text"
            helper={
              "You can use your last tax return to calculate this number or see the User's manual to learn more."
            }
          />
          <FieldSelect
            name="AllowableDeductionsSecondary.taxfed.schedule"
            label="How often?"
            placeholder="Select option..."
            required="Required"
            fieldwidth={"25%"}
            options={[
              { value: "weekly", label: "Once per week" },
              { value: "biweekly", label: "Every two weeks" },
              { value: "bimonthly", label: "Twice a month" },
              { value: "monthly", label: "Once per month" },
              { value: "yearly", label: "Yearly" },
            ]}
          />
        </Stack>
      )}
      {checkedItems.taxstate === true && (
        <Stack
          direction={["column", "column", "row"]}
          spacing={["0", "0", "1rem"]}
        >
          <FieldMoneyInput
            name={`AllowableDeductionsSecondary.taxstate.amount`}
            label="State income tax"
            required="Required"
            type="text"
            helper={
              "You can use your last tax return to calculate this number or see the User's manual to learn more."
            }
          />

          <FieldSelect
            name="AllowableDeductionsSecondary.taxstate.schedule"
            label="How often?"
            placeholder="Select option..."
            required="Required"
            fieldWidth={"25%"}
            options={[
              { value: "weekly", label: "Once per week" },
              { value: "biweekly", label: "Every two weeks" },
              { value: "bimonthly", label: "Twice a month" },
              { value: "monthly", label: "Once per month" },
              { value: "yearly", label: "Yearly" },
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
            name={`AllowableDeductionsSecondary.ssn.amount`}
            label="Social Security (FICA plus Medicare)"
            required="Required"
            type="text"
            helper={
              "You can use your last tax return to calculate this number or see the User's manual to learn more."
            }
          />
          <FieldSelect
            name="AllowableDeductionsSecondary.ssn.schedule"
            label="How often?"
            placeholder="Select option..."
            required="Required"
            fieldWidth={"25%"}
            options={[
              { value: "weekly", label: "Once per week" },
              { value: "biweekly", label: "Every two weeks" },
              { value: "bimonthly", label: "Twice a month" },
              { value: "monthly", label: "Once per month" },
              { value: "yearly", label: "Yearly" },
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
            name={`AllowableDeductionsSecondary.retirement.amount`}
            label="Mandatory retirement contributions"
            required="Required"
            type="text"
            mr={4}
          />
          <FieldSelect
            name="AllowableDeductionsSecondary.retirement.schedule"
            label="How often?"
            placeholder="Select option..."
            required="Required"
            fieldwidth={"25%"}
            options={[
              { value: "weekly", label: "Once per week" },
              { value: "biweekly", label: "Every two weeks" },
              { value: "bimonthly", label: "Twice a month" },
              { value: "monthly", label: "Once per month" },
              { value: "yearly", label: "Yearly" },
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
            name={`AllowableDeductionsSecondary.reqemp.amount`}
            label="Required employment expense"
            required="Required"
            type="text"
            mr={4}
          />
          <FieldSelect
            name="AllowableDeductionsSecondary.reqemp.schedule"
            label="How often?"
            placeholder="Select option..."
            required="Required"
            fieldwidth={"25%"}
            options={[
              { value: "weekly", label: "Once per week" },
              { value: "biweekly", label: "Every two weeks" },
              { value: "bimonthly", label: "Twice a month" },
              { value: "monthly", label: "Once per month" },
              { value: "yearly", label: "Yearly" },
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
            name={`AllowableDeductionsSecondary.extmed.amount`}
            label="Extraordinary medical expense for yourself - per year"
            required="Required"
            type="text"
            mr={4}
          />
          <FieldInput
            name={`AllowableDeductionsSecondary.extmed.desc`}
            label="List the types of extraordinary medical expenses you have."
            required="Required"
            type="text"
            mr={4}
          />
        </Stack>
      )}
      {checkedItems.inhome === true && (
        <Stack
          direction={["column", "column", "row"]}
          spacing={["0", "0", "1rem"]}
        >
          <FieldMoneyInput
            name={`AllowableDeductionsSecondary.inhome.amount`}
            label="In-home nursing care expense - per year"
            required="Required"
            type="text"
            mr={4}
          />

          <FieldInput
            name={`AllowableDeductionsSecondary.inhome.desc`}
            label="List the types of in-home nursing care expenses you have and who you pay."
            required="Required"
            type="text"
            mr={4}
          />
        </Stack>
      )}
      <AdministrativeRules
        rules={[110, 111]}
        explanation={
          "For definitions and more information, click on the links below:"
        }
      />
    </FormizStep>
  )
}
