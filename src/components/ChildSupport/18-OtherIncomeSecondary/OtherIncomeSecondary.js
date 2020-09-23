import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box, Divider } from "@chakra-ui/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { FieldSelect } from "../../Fields/FieldSelect"
import { FieldCheckbox } from "../../Fields/FieldCheckbox"
import { SectionHeader } from "../../Utils/SectionHeader"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"

export const OtherIncomeSecondary = () => {
  const form = useForm({
    subscribe: { fields: ["OtherParent.fname"] },
  })
  const otherParent = form.values.OtherParent.fname
    ? form.values.OtherParent.fname
    : "Other parent"

  const [checkedItems, setCheckedItems] = useState({})
  return (
    <FormizStep
      label="Other income (other parent)"
      name="OtherIncomeSecondary"
      order={18000}
    >
      <SectionHeader header={otherParent + `'s other income`} />
      <FieldCheckbox
        name="OtherIncomeSecondary"
        label="Select all that apply, or none of the above if you have no other income."
        required="Required"
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
      {checkedItems.sep === true && (
        <Box mr={12}>
          <Box d="flex">
            <FieldMoneyInput
              name={`OtherIncomeSecondary.SepEarning`}
              label="Self-employment net earnings (- loss)"
              required="Required"
              type="text"
            />
            <FieldSelect
              name="OtherIncomeSecondary.SepEarning.PaySchedule"
              label="Paid how often?"
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
          <FieldInput
            name={`OtherIncomeSecondary.SepEarning.Desc`}
            label="Describe your self-employment activities"
            required="Required"
            type="text"
          />
          <Box spacing="2" p="2" d="flex">
            <FieldMoneyInput
              name={`OtherIncomeSecondary.SepEarning.HoursPerWeek`}
              label="Hours per week spent in self-employment activities"
              required="Required"
              type="text"
            />
            <FieldRadio
              name="OtherIncomeSecondary.SepEarning.Primary"
              placeholder="None"
              required="Required"
              label={
                "\n" +
                "Is your self-employment the primary source of your income for meeting your living expenses?"
              }
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </Box>
          <Divider />
        </Box>
      )}

      {checkedItems.pension === true && (
        <Box mr={12}>
          <FieldMoneyInput
            name={`OtherIncomeSecondary.Pension`}
            label="Pensions, retirement - per year (before taxes)"
            required="Required"
            type="text"
          />
        </Box>
      )}

      {checkedItems.social === true && (
        <Box mr={12}>
          <FieldMoneyInput
            name={`OtherIncomeSecondary.SSN`}
            label="Pensions, Social Security, per year (before taxes)"
            required="Required"
            type="text"
          />
        </Box>
      )}

      {checkedItems.interest === true && (
        <Box mr={12}>
          <FieldMoneyInput
            name={`OtherIncomeSecondary.Interest`}
            label="Interest/Dividend income - per year (before taxes)"
            required="Required"
            type="text"
          />
        </Box>
      )}

      {checkedItems.unearned === true && (
        <Box mr={12}>
          <FieldMoneyInput
            name={`OtherIncomeSecondary.Unearned`}
            label="Other unearned income - per year (before taxes)"
            required="Required"
            type="text"
          />
        </Box>
      )}

      {checkedItems.imputed === true && (
        <Box d={"flex"} mr={12}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`OtherIncomeSecondary.Imputed`}
              label="Imputed income (before taxes)"
              required="Required"
              type="text"
            />
          </Box>
          <Box flex={1}>
            <FieldSelect
              name="OtherIncomeSecondary.Imputed.Schedule"
              label="Paid how often?"
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
      {checkedItems.eitc === true && (
        <Box mr={12}>
          <FieldMoneyInput
            name={`OtherIncomeSecondary.EITC`}
            label="Earned Income Tax Credit (EITC) - per year (before taxes)"
            required="Required"
            type="text"
          />
        </Box>
      )}

      {checkedItems.prize === true && (
        <Box d={"flex"} mr={12}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`OtherIncomeSecondary.prize`}
              label="Prize, award, settlement, or other one-time cash payment (before taxes)"
              required="Required"
              type="text"
            />
          </Box>
          <Box flex={1}>
            <FieldInput
              name={`OtherIncomeSecondary.prize.desc`}
              label="Describe the prize, including its present location."
              required="Required"
              type="text"
            />
          </Box>
        </Box>
      )}

      {checkedItems.bonus === true && (
        <Box mr={12}>
          <FieldMoneyInput
            name={`OtherIncomeSecondary.bonus`}
            label="Bonus amount - per year (before taxes)"
            required="Required"
            type="text"
          />
        </Box>
      )}
      <AdministrativeRules
        rules={[105, 106, 108, 144]}
        explanation={
          "For definitions and more information, click on the links below:"
        }
      />
    </FormizStep>
  )
}
