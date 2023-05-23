import React, { useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { Stack } from "@chakra-ui/react"
import { FieldMoneyInput } from "../../Fields/FieldMoneyInput"
import { SectionHeader } from "../../Utils/SectionHeader"
import { FieldSelect } from "../../Fields/FieldSelect"
import { FieldCheckbox } from "../../Fields/FieldCheckbox"
import { AdministrativeRules } from "../AdministrativeRules/AdministrativeRules"
import {AlertBox} from "../../Utils/AlertBox";
import {FieldInput} from "../../Fields/FieldInput";

export const AllowableDeductionsSecondary = () => {
  const form = useForm({
    subscribe: { fields: ["OtherParent.fname"] },
  })
  const otherParent = form.values?.OtherParent?.fname || "Other parent"
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
        label="Select all that apply, or none of the above if there are no allowable deductions."
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
      {/*  {checkedItems.none === true && (*/}
      {/*      <AlertBox>*/}
      {/*          If you select "None of the above", please uncheck any other options to continue.*/}
      {/*      </AlertBox>*/}
      {/*  )}*/}
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
            fieldWidth={"55%"}
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
            fieldWidth={"55%"}
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
            fieldWidth={"55%"}
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
            name={`AllowableDeductionsSecondary.federal.amount`}
            label="Federal income tax"
            required="Required"
            type="text"
            helper={
              "You can use your last tax return to calculate this number."
            }
          />
          <FieldSelect
            name="AllowableDeductionsSecondary.federal.schedule"
            label="How often?"
            placeholder="Select option..."
            required="Required"
            fieldWidth={"55%"}
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
            name={`AllowableDeductionsSecondary.state.amount`}
            label="State income tax"
            required="Required"
            type="text"
            helper={
              "You can use your last tax return to calculate this number."
            }
          />

          <FieldSelect
            name="AllowableDeductionsSecondary.state.schedule"
            label="How often?"
            placeholder="Select option..."
            required="Required"
            fieldWidth={"55%"}
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
            name={`AllowableDeductionsSecondary.ssn.amount`}
            label="Social Security (FICA plus Medicare)"
            required="Required"
            type="text"
            helper={
              "You can use your last tax return to calculate this number."
            }
          />
          <FieldSelect
            name="AllowableDeductionsSecondary.ssn.schedule"
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
            fieldWidth={"55%"}
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
            fieldWidth={"55%"}
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
            name={`AllowableDeductionsSecondary.extmed.amount`}
            label="Extraordinary medical expense for yourself - per year"
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
        </Stack>
      )}
        {checkedItems.other === true && (
            <>
                <AlertBox>
                    Enter "other" deductions on the next screen.
                </AlertBox>
                <FieldInput
                    name={`AllowableDeductionsSecondary.other.trigger`}
                    value={"1"}
                    type="hidden"
                    mr={4}
                />
            </>
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
