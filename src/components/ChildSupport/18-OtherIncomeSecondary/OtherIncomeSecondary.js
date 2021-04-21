import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Box, Divider, Stack, Text } from '@chakra-ui/react'
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
  const otherParent = form.values.OtherParent
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
            label: "Social Security Retirement Income (not Disability Income or Supplemental Income)",
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
        <>
          <Divider mb={4} />
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            <FieldMoneyInput
              name={`OtherIncomeSecondary.SepEarning.net`}
              label="Self-employment net earnings (- loss)"
              required="Required"
              type="text"
            />
            <FieldSelect
              name="OtherIncomeSecondary.SepEarning.schedule"
              label="Paid how often?"
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
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            <FieldInput
              name={`OtherIncomeSecondary.SepEarning.desc`}
              label="Describe your self-employment activities"
              required="Required"
              type="text"
              width={"80%"}
            />

            <FieldMoneyInput
              name={`OtherIncomeSecondary.SepEarning.hoursPerWeek`}
              label="Hours per week spent in self-employment activities"
              required="Required"
              type="text"
            />
          </Stack>
          <Stack
            direction={["column", "column", "row"]}
            spacing={["0", "0", "1rem"]}
          >
            <FieldRadio
              name="OtherIncomeSecondary.SepEarning.primary"
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
          </Stack>
          <Text fontSize={"sm"} mt={2} mb={4}>
            This amount may not be the same amount of income you claim on your
            taxes. Certian deductions are allowable for tax purposes but not for
            child support purposes. The User Guide can help you calculate the
            appropriate self-employment income.
          </Text>
        </>
      )}

      {checkedItems.pension === true && (
        <Box mr={12}>
          <Divider mb={4} />
          <FieldMoneyInput
            name={`OtherIncomeSecondary.pension`}
            label="Pensions, retirement - per year (before taxes)"
            required="Required"
            type="text"
          />
          <Text fontSize={"sm"} mt={2}>
            Pensions and retirement includes all pensions, including VA pensions
            and military pensions, IRA distributions, Railroad retirement and
            all other retirement funds. Do not include Social Security here.
          </Text>
        </Box>
      )}

      {checkedItems.social === true && (
        <Box mr={12}>
          <Divider mb={4} />
          <FieldMoneyInput
            name={`OtherIncomeSecondary.SSN`}
            label="Pensions, Social Security, per year (before taxes)"
            required="Required"
            type="text"
          />
          <Text fontSize={"sm"} mt={2}>
            Enter only social Security Retirement and/or survivors benefits. Do
            not enter Social Security Disability Income (SSDI) benefits here.
            Disability benefits, (but not benefits received by a child on behalf
            of a disabled parent) should be entered as "other taxable income
            below. Do not enter Social Security Income (SSI) received by a
            parent or for a child anywhere in this calculator.
          </Text>
        </Box>
      )}

      {checkedItems.interest === true && (
        <Box mr={12}>
          <Divider mb={4} />
          <FieldMoneyInput
            name={`OtherIncomeSecondary.interest`}
            label="Interest/Dividend income - per year (before taxes)"
            required="Required"
            type="text"
          />
        </Box>
      )}

      {checkedItems.unearned === true && (
        <Box mr={12}>
          <Divider mb={4} />
          <FieldMoneyInput
            name={`OtherIncomeSecondary.unearned`}
            label="Other unearned income - per year (before taxes)"
            required="Required"
            type="text"
          />
        </Box>
      )}

      {checkedItems.imputed === true && (
       <>
       <Divider mb={4} />
        <Stack
          direction={["column", "column", "row"]}
          spacing={["0", "0", "1rem"]}
        >
            <FieldMoneyInput
              name={`OtherIncomeSecondary.imputed`}
              label="Imputed income (before taxes)"
              required="Required"
              type="text"
            />
            <FieldSelect
              name="OtherIncomeSecondary.imputedSchedule"
              label="Paid how often?"
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
       </>
      )}
      {checkedItems.eitc === true && (
        <Box mr={12}>
          <Divider mb={4} />
          <FieldMoneyInput
            name={`OtherIncomeSecondary.eitc`}
            label="Earned Income Tax Credit (EITC) - per year (before taxes)"
            required="Required"
            type="text"
          />
        </Box>
      )}

      {checkedItems.prize === true && (
        <>
          <Divider mb={4} />
        <Stack
          direction={["column", "column", "row"]}
          spacing={["0", "0", "1rem"]}
        >
            <FieldMoneyInput
              name={`OtherIncomeSecondary.prize`}
              label="Prize, award, settlement, or other one-time cash payment (before taxes)"
              required="Required"
              type="text"
            />
            <FieldInput
              name={`OtherIncomeSecondary.prizeDesc`}
              label="Describe the prize, including its present location."
              required="Required"
              type="text"
            />
        </Stack>
        <Text fontSize={"sm"} mb={4} mt={2}>
          One-time payments can be spread out over several years. Because one-time payments will not happen every year, you may want to do another calculation that does not include this income. See ARM 37.62.105(2)(a)
        </Text>
        </>
      )}
      {checkedItems.taxable === true && (
        <>
          <Divider mb={4} />
          <Text fontSize={"sm"} mt={2}>
            Enter on next screen. Examples include income from an S-corp, scholarships or grants that exceeded the qualifed tuition related expenses (find this on your tuition statement IRS Form 1098-T) Social Security Disability benefits (but not Disability benefits recieved by a child on behalf of a disabled parent. See ARM 37.62.144
          </Text>
        </>
      )}
      {checkedItems.nontaxable === true && (
        <>
          <Divider mb={4} />
          <Text fontSize={"sm"} mt={2}>
            Enter on next screen. Examples include tax-exempt interest, accelerated depreciation on business assests, qualifed tuition related expenses (find this on your tuition statement IRS Form 1098-T) See ARM 37.62.105(2).
          </Text>
        </>
      )}
      {checkedItems.bonus === true && (
        <Box mr={12}>
          <Divider mb={4} />
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
