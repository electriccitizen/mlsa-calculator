import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { Box } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { FieldSelect } from "../Fields/FieldSelect"
import { FieldCheckbox } from "../Fields/FieldCheckbox"

export const AllowableDeductions = () => {
  const [checkedItems, setCheckedItems] = useState({})
  return (
    <FormizStep name="AllowableDeductions" order={15000}>
      <>
        <SectionWrapper>
          <SectionHeader header={`Your Allowable Deductions`} />
          <FieldCheckbox
            name="AllowableDeductions"
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
          {checkedItems.alimony == true && (
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
          {checkedItems.healthself == true && (
            <Box d={"flex"}>
              <Box flex={1} mr={4}>
                <FieldMoneyInput
                  name={`AllowableDeductions.healthself.amount`}
                  label="Ordered health insurance premium for yourself"
                  required="Required"
                  type="text"
                  mr={4}
                />
              </Box>
              <Box flex={1}>
                <FieldSelect
                  name="AllowableDeductions.healthself.schedule"
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
          {checkedItems.healthchildren == true && (
            <Box d={"flex"}>
              <Box flex={1} mr={4}>
                <FieldMoneyInput
                  name={`AllowableDeductions.healthchildren.amount`}
                  label="Ordered health insurance premium for other children"
                  required="Required"
                  type="text"
                  mr={4}
                />
              </Box>
              <Box flex={1}>
                <FieldSelect
                  name="AllowableDeductions.healthchildren.schedule"
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
          {checkedItems.taxfed == true && (
            <Box d={"flex"}>
              <Box flex={1} mr={4}>
                <FieldMoneyInput
                  name={`AllowableDeductions.taxfed.amount`}
                  label="Federal income tax"
                  required="Required"
                  type="text"
                  mr={4}
                />
              </Box>
              <Box flex={1}>
                <FieldSelect
                  name="AllowableDeductions.taxfed.schedule"
                  label="How often?"
                  placeholder="Select option..."
                  required="Required"
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
          {checkedItems.taxstate == true && (
            <Box d={"flex"}>
              <Box flex={1} mr={4}>
                <FieldMoneyInput
                  name={`AllowableDeductions.taxstate.amount`}
                  label="State income tax"
                  required="Required"
                  type="text"
                  mr={4}
                />
              </Box>
              <Box flex={1}>
                <FieldSelect
                  name="AllowableDeductions.taxstate.schedule"
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
          {checkedItems.ssn == true && (
            <Box d={"flex"}>
              <Box flex={1} mr={4}>
                <FieldMoneyInput
                  name={`AllowableDeductions.ssn.amount`}
                  label="Social Security (FICA plus Medicare)"
                  required="Required"
                  type="text"
                  mr={4}
                />
              </Box>
              <Box flex={1}>
                <FieldSelect
                  name="AllowableDeductions.ssn.schedule"
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
          {checkedItems.retirement == true && (
            <Box d={"flex"}>
              <Box flex={1} mr={4}>
                <FieldMoneyInput
                  name={`AllowableDeductions.retirement.amount`}
                  label="Mandatory retirement contributions"
                  required="Required"
                  type="text"
                  mr={4}
                />
              </Box>
              <Box flex={1}>
                <FieldSelect
                  name="AllowableDeductions.retirement.schedule"
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
          {checkedItems.reqemp == true && (
            <Box d={"flex"}>
              <Box flex={1} mr={4}>
                <FieldMoneyInput
                  name={`AllowableDeductions.reqemp.amount`}
                  label="Required employment expense"
                  required="Required"
                  type="text"
                  mr={4}
                />
              </Box>
              <Box flex={1}>
                <FieldSelect
                  name="AllowableDeductions.reqemp.schedule"
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
          {checkedItems.extmed == true && (
            <Box d={"flex"}>
              <Box flex={1} mr={4}>
                <FieldMoneyInput
                  name={`AllowableDeductions.extmed.amount`}
                  label="Extraordinary medical expense for yourself - per year"
                  required="Required"
                  type="text"
                  mr={4}
                />
              </Box>
              <Box flex={1}>
                <FieldInput
                  name={`AllowableDeductions.extmed.desc`}
                  label="List the types of extraordinary medical expenses you have."
                  required="Required"
                  type="text"
                  mr={4}
                />
              </Box>
            </Box>
          )}
          {checkedItems.inhome == true && (
            <Box d={"flex"}>
              <Box flex={1} mr={4}>
                <FieldMoneyInput
                  name={`AllowableDeductions.inhome.amount`}
                  label="In-home nursing care expense - per year"
                  required="Required"
                  type="text"
                  mr={4}
                />
              </Box>
              <Box flex={1}>
                <FieldInput
                  name={`AllowableDeductions.inhome.desc`}
                  label="List the types of in-home nursing care expenses you have and who you pay."
                  required="Required"
                  type="text"
                  mr={4}
                />
              </Box>
            </Box>
          )}
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
