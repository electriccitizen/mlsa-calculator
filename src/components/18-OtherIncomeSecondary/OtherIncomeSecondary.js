import React, { useEffect, useState, useRef } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldMoneyInput } from "../Fields/FieldMoneyInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { FieldCheckbox2 } from "../Fields/FieldCheckbox2"
import {
  Switch,
  Select,
  Checkbox,
  CheckboxGroup,
  Flex,
  Box,
  Divider,
  SimpleGrid,
} from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"
import { useHistoryState } from "../../hooks/useHistoryState"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Stack,
} from "@chakra-ui/core"
import { FieldSelect } from "../Fields/FieldSelect"
import { FieldCheckbox } from "../Fields/FieldCheckbox"
const updateState = e => {}

export const OtherIncomeSecondary = () => {
  const [checkedItems, setCheckedItems] = useState({})
  const form = useForm()
  const otherParent = form.values.otherParent
    ? form.values.otherParent.fname
    : ""
  return (
    <FormizStep name="OtherIncomeSecondary" order={18000}>
      <>
        <SectionWrapper>
          <SectionHeader header={otherParent + `'s Other Income`} />
          <FieldCheckbox
            name="OtherIncomeSecondary"
            label="Selet all that apply, or none of the above if you have no other income."
            required="Required"
            keepValue
            setCheckedItems={setCheckedItems}
            checkedItems={checkedItems}
            options={[
              {
                value: "sep",
                label:
                  " Self-employment [Schedules C and F (Form 1040) and Partnerships (Form 1065), but not S corps (Form 1120S). Enter S corps as Other Taxable Income.",
              },
              { value: "pension", label: "Pensions, retirement" },
              {
                value: "social",
                label: "Social Security (retirement income, not disability)",
              },
              { value: "interest", label: "Interest/Dividends" },
              { value: "unearned", label: "Other unearned income" },
              { value: "imputed", label: "Imputed income" },
              { value: "eitc", label: "Earned Income Tax Credit (EITC)" },
              {
                value: "prize",
                label:
                  "Prize, award, settlement, or other one-time payment within the past 12 months",
              },
              { value: "bonus", label: "Bonus" },
              { value: "taxable", label: " Other taxable income" },
              { value: "nontaxable", label: " Other non-taxable income" },
              { value: "none", label: "None of the above" },
            ]}
          />
          {checkedItems.sep == true && (
            <Box mr={12}>
              <Box d="flex">
                <FieldMoneyInput
                  name={`OtherIncomeSecondary.SepEarning`}
                  label="Self-employment net earnings (- loss)"
                  required="Required"
                  type="text"
                  updateState={updateState}
                  mr={4}
                />
                <FieldSelect
                  name="OtherIncomeSecondary.SepEarning.PaySchedule"
                  label="Paid how often?"
                  placeholder="Select option..."
                  required="Required"
                  fieldwidth={"25%"}
                  keepValue
                  options={[
                    { value: "weekly", label: "Once per week" },
                    { value: "biweekly", label: "Every two weeks" },
                    { value: "bimonthly", label: "Twice a month" },
                    { value: "monthly", label: "Once per month" },
                    { value: "yearly", label: "Yearly" },
                  ]}
                />
              </Box>
              <FieldInput
                name={`OtherIncomeSecondary.SepEarning.Desc`}
                label="Describe your self-employment activities"
                required="Required"
                type="text"
                updateState={updateState}
              />
              <Box spacing="2" p="2" d="flex">
                <FieldMoneyInput
                  name={`OtherIncomeSecondary.SepEarning.HoursPerWeek`}
                  label="Hours per week spent in self-employment activities"
                  required="Required"
                  type="text"
                  updateState={updateState}
                  mr={4}
                />
                <FieldRadio
                  name="OtherIncomeSecondary.SepEarning.Primary"
                  placeholder="None"
                  required="Required"
                  label={
                    "\n" +
                    "Is your self-employment the primary source of your income for meeting your living expenses?"
                  }
                  updateState={updateState}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
              </Box>
              <Divider />
            </Box>
          )}

          {checkedItems.pension == true && (
            <Box mr={12}>
              <FieldMoneyInput
                name={`OtherIncomeSecondary.Pension`}
                label="Pensions, retirement - per year (before taxes)"
                required="Required"
                type="text"
                updateState={updateState}
                mr={4}
              />
            </Box>
          )}

          {checkedItems.social == true && (
            <Box mr={12}>
              <FieldMoneyInput
                name={`OtherIncomeSecondary.SSN`}
                label="Pensions, Social Security, per year (before taxes)"
                required="Required"
                type="text"
                updateState={updateState}
                mr={4}
              />
            </Box>
          )}

          {checkedItems.interest == true && (
            <Box mr={12}>
              <FieldMoneyInput
                name={`OtherIncomeSecondary.Interest`}
                label="Interest/Dividend income - per year (before taxes)"
                required="Required"
                type="text"
                updateState={updateState}
                mr={4}
              />
            </Box>
          )}

          {checkedItems.unearned == true && (
            <Box mr={12}>
              <FieldMoneyInput
                name={`OtherIncomeSecondary.Unearned`}
                label="Other unearned income - per year (before taxes)"
                required="Required"
                type="text"
                updateState={updateState}
                mr={4}
              />
            </Box>
          )}

          {checkedItems.imputed == true && (
            <Box d={"flex"} mr={12}>
              <Box flex={1} mr={4}>
                <FieldMoneyInput
                  name={`OtherIncomeSecondary.Imputed`}
                  label="Imputed income (before taxes)"
                  required="Required"
                  type="text"
                  updateState={updateState}
                />
              </Box>
              <Box flex={1}>
                <FieldSelect
                  name="OtherIncomeSecondary.Imputed.Schedule"
                  label="Paid how often?"
                  placeholder="Select option..."
                  required="Required"
                  fieldwidth={"25%"}
                  keepValue
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
          {checkedItems.eitc == true && (
            <Box mr={12}>
              <FieldMoneyInput
                name={`OtherIncomeSecondary.EITC`}
                label="Earned Income Tax Credit (EITC) - per year (before taxes)"
                required="Required"
                type="text"
                updateState={updateState}
                mr={4}
              />
            </Box>
          )}

          {checkedItems.prize == true && (
            <Box d={"flex"} mr={12}>
              <Box flex={1} mr={4}>
                <FieldMoneyInput
                  name={`OtherIncomeSecondary.prize`}
                  label="Prize, award, settlement, or other one-time cash payment (before taxes)"
                  required="Required"
                  type="text"
                  updateState={updateState}
                  mr={4}
                />
              </Box>
              <Box flex={1}>
                <FieldInput
                  name={`OtherIncomeSecondary.prize.desc`}
                  label="Describe the prize, including its present location."
                  required="Required"
                  type="text"
                  updateState={updateState}
                  mr={4}
                />
              </Box>
            </Box>
          )}

          {checkedItems.bonus == true && (
            <Box mr={12}>
              <FieldMoneyInput
                name={`OtherIncomeSecondary.bonus`}
                label="Bonus amount - per year (before taxes)"
                required="Required"
                type="text"
                updateState={updateState}
                mr={4}
              />
            </Box>
          )}
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
