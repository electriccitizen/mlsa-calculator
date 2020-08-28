import React, { useEffect, useState } from "react"
import { FormizStep, useForm } from "@formiz/core"
import { FieldInput } from "../Fields/FieldInput"
import { FieldRadio } from "../Fields/FieldRadio"
import { FieldCheckbox } from "../Fields/FieldCheckbox"
import { Box, SimpleGrid } from "@chakra-ui/core"
import { SectionWrapper } from "../SectionWrapper"
import { SectionHeader } from "../SectionHeader"

const flatten = require("flat").flatten
export const OtherIncome = () => {
  // const form = useForm()
  // const setField = value => {
  //   return (
  //     JSON.parse(sessionStorage.getItem(value)) &&
  //     JSON.parse(sessionStorage.getItem(value))
  //   )
  // }

  const [checkedItems, setCheckedItems] = useState({})

  const updateState = event => {
    //console.log(event)
    setCheckedItems({
      ...checkedItems,
      ['foo']: event.checked,
    })
    console.log("checkedItems: ", checkedItems)
  }

  return (
    <FormizStep name="OtherIncome" order={10000}>
      <>
        <SectionWrapper>
          <SectionHeader header={`Your Other Income`} />

          <FieldCheckbox
            label={"Check any other types of income you have"}
            name="OtherIncome"
            placeholder="None"
            required="Required"
            updateState={updateState}
            checkedItems={checkedItems}
            options={[
              {
                value: "sep",
                label:
                  "Self-employment [Schedules C and F (Form 1040) and Partnerships (Form 1065), but not S corps (Form 1120S). Enter S corps as “Other Taxable Income.”",
              },
            ]}
          />

          {/*<FieldCheckbox*/}
          {/*  label={"Check any other types of income you have"}*/}
          {/*  name="OtherIncome"*/}
          {/*  placeholder="None"*/}
          {/*  required="Required"*/}
          {/*  setChecked={setChecked}*/}
          {/*  updateState={updateState}*/}
          {/*  options={[*/}
          {/*    {*/}
          {/*      value: "sep",*/}
          {/*      label:*/}
          {/*        "Self-employment [Schedules C and F (Form 1040) and Partnerships (Form 1065), but not S corps (Form 1120S). Enter S corps as “Other Taxable Income.”]",*/}
          {/*    },*/}
          {/*    { value: "pensions", label: "Pensions, retirement" },*/}
          {/*    {*/}
          {/*      value: "social",*/}
          {/*      label: "Social Security (retirement income, not disability)",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      value: "interest",*/}
          {/*      label: "Interest/Dividends",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      value: "other",*/}
          {/*      label: "Other unearned income",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      value: "imputed",*/}
          {/*      label: "Imputed income",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      value: "eitc",*/}
          {/*      label: "Earned Income Tax Credit (EITC)",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      value: "prize",*/}
          {/*      label:*/}
          {/*        "Prize, award, settlement, or other one-time payment within the past 12 months",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      value: "bonus",*/}
          {/*      label: "Bonus",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      value: "othertaxable",*/}
          {/*      label: "Other taxable income",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      value: "othernontaxable",*/}
          {/*      label: "Other non-taxable income",*/}
          {/*    },*/}
          {/*    {*/}
          {/*      value: "none",*/}
          {/*      label: "None of the above",*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*/>*/}
        </SectionWrapper>
      </>
    </FormizStep>
  )
}
