import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box } from "@chakra-ui/core"
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
  const otherParent const otherParent = form.values.OtherParent
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
        <Box d={"flex"}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`AllowableDeductionsSecondary.alimony.amount`}
              label="Ordered alimony/spousal support"
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
          <Box flex={1}>
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
          </Box>
        </Box>
      )}
      {checkedItems.healthself === true && (
        <Box d={"flex"}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`AllowableDeductionsSecondary.healthself.amount`}
              label="Ordered health insurance premium for yourself"
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
          <Box flex={1}>
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
          </Box>
        </Box>
      )}
      {checkedItems.healthchildren === true && (
        <Box d={"flex"}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`AllowableDeductionsSecondary.healthchildren.amount`}
              label="Ordered health insurance premium for other children"
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
          <Box flex={1}>
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
          </Box>
        </Box>
      )}
      {checkedItems.taxfed === true && (
        <Box d={"flex"}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`AllowableDeductionsSecondary.taxfed.amount`}
              label="Federal income tax"
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
          <Box flex={1}>
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
          </Box>
        </Box>
      )}
      {checkedItems.taxstate === true && (
        <Box d={"flex"}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`AllowableDeductionsSecondary.taxstate.amount`}
              label="State income tax"
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
          <Box flex={1}>
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
          </Box>
        </Box>
      )}
      {checkedItems.ssn === true && (
        <Box d={"flex"}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`AllowableDeductionsSecondary.ssn.amount`}
              label="Social Security (FICA plus Medicare)"
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
          <Box flex={1}>
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
          </Box>
        </Box>
      )}
      {checkedItems.retirement === true && (
        <Box d={"flex"}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`AllowableDeductionsSecondary.retirement.amount`}
              label="Mandatory retirement contributions"
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
          <Box flex={1}>
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
          </Box>
        </Box>
      )}
      {checkedItems.reqemp === true && (
        <Box d={"flex"}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`AllowableDeductionsSecondary.reqemp.amount`}
              label="Required employment expense"
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
          <Box flex={1}>
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
          </Box>
        </Box>
      )}
      {checkedItems.extmed === true && (
        <Box d={"flex"}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`AllowableDeductionsSecondary.extmed.amount`}
              label="Extraordinary medical expense for yourself - per year"
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
          <Box flex={1}>
            <FieldInput
              name={`AllowableDeductionsSecondary.extmed.desc`}
              label="List the types of extraordinary medical expenses you have."
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
        </Box>
      )}
      {checkedItems.inhome === true && (
        <Box d={"flex"}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`AllowableDeductionsSecondary.inhome.amount`}
              label="In-home nursing care expense - per year"
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
          <Box flex={1}>
            <FieldInput
              name={`AllowableDeductionsSecondary.inhome.desc`}
              label="List the types of in-home nursing care expenses you have and who you pay."
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
        </Box>
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
