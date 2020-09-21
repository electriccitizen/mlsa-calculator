import React, { useState } from "react"
import { FormizStep } from "@formiz/core"
import { FieldInput } from "../../Fields/FieldInput"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { FieldRadio } from "../../Fields/FieldRadio"
import { Box } from "@chakra-ui/core"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldSelect } from "../../Fields/FieldSelect"
import { FieldCheckbox } from "../../Fields/FieldCheckbox"

export const OtherIncome = () => {
  const updateState = {}
  const [checkedItems, setCheckedItems] = useState({})
  return (
    <FormizStep label="Your other income" name="OtherIncome" order={10000}>
      <SectionHeader header={`Your other income`} />
      <FieldCheckbox
        name="OtherIncome"
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
        <Box d="flex">
          <FieldMoneyInput
            name={`OtherIncome.SepEarning`}
            label="Self-employment net earnings (- loss)"
            required="Required"
            type="text"
            mr={4}
          />
          <FieldSelect
            name="OtherIncome.SepEarning.PaySchedule"
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
          <FieldInput
            name={`OtherIncome.SepEarning.Desc`}
            label="Describe your self-employment activities"
            required="Required"
            type="text"
          />
          <FieldMoneyInput
            name={`OtherIncome.SepEarning.HoursPerWeek`}
            label="Hours per week spent in self-employment activities"
            required="Required"
            type="text"
            mr={4}
          />
          <FieldRadio
            name="OtherIncome.SepEarning.Primary"
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
      )}

      {checkedItems.pension === true && (
        <FieldMoneyInput
          name={`OtherIncome.Pension`}
          label="Pensions, retirement - per year (before taxes)"
          required="Required"
          type="text"
          mr={4}
        />
      )}

      {checkedItems.social === true && (
        <FieldMoneyInput
          name={`OtherIncome.SSN`}
          label="Pensions, Social Security, per year (before taxes)"
          required="Required"
          type="text"
          mr={4}
        />
      )}

      {checkedItems.interest === true && (
          <FieldMoneyInput
            name={`OtherIncome.Interest`}
            label="Interest/Dividend income - per year (before taxes)"
            required="Required"
            type="text"
            mr={4}
          />
      )}

      {checkedItems.unearned === true && (
          <FieldMoneyInput
            name={`OtherIncome.Unearned`}
            label="Other unearned income - per year (before taxes)"
            required="Required"
            type="text"
            mr={4}
          />
      )}

      {checkedItems.imputed === true && (
        <Box d={"flex"} mr={12}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`OtherIncome.Imputed`}
              label="Imputed income (before taxes)"
              required="Required"
              type="text"
            />
          </Box>
          <Box flex={1}>
            <FieldSelect
              name="OtherIncome.Imputed.Schedule"
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
          <FieldMoneyInput
            name={`OtherIncome.EITC`}
            label="Earned Income Tax Credit (EITC) - per year (before taxes)"
            required="Required"
            type="text"
            mr={4}
          />
      )}

      {checkedItems.prize === true && (
        <Box d={"flex"} mr={12}>
          <Box flex={1} mr={4}>
            <FieldMoneyInput
              name={`OtherIncome.prize`}
              label="Prize, award, settlement, or other one-time cash payment (before taxes)"
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
          <Box flex={1}>
            <FieldInput
              name={`OtherIncome.prize.desc`}
              label="Describe the prize, including its present location."
              required="Required"
              type="text"
              mr={4}
            />
          </Box>
        </Box>
      )}

      {checkedItems.bonus === true && (
          <FieldMoneyInput
            name={`OtherIncome.bonus`}
            label="Bonus amount - per year (before taxes)"
            required="Required"
            type="text"
            mr={4}
          />
      )}
    </FormizStep>
  )
}
