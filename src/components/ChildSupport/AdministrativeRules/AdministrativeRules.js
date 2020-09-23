import React from "react"
import PropTypes from "prop-types"

import {
  Box,
  Link,
  List,
  ListItem,
  Switch,
  FormControl,
  FormLabel,
  Flex,
} from "@chakra-ui/core"
import { useRules } from "../../../hooks/useRulesContext"

const propTypes = {
  children: PropTypes.node,
}
const defaultProps = {
  children: "",
}

const baseUrl = "http://www.mtrules.org/gateway/RuleNo.asp?RN="
const Rules = [
  {
    code: 101,
    name: "Authority, Policy, and Purpose (ARM 37.62.101)",
    label: "37%2E62%2E101",
  },
  {
    code: 102,
    name: "Rebuttable Presumption (ARM 37.62.102)",
    label: "37%2E62%2E102",
  },
  {
    code: 103,
    name: "Definitions (ARM 37.62.103)",
    label: "37%2E62%2E103",
  },
  {
    code: 105,
    name: "Determination of Income for Child Support (ARM 37.62.105)",
    label: "37%2E62%2E105",
  },
  {
    code: 106,
    name: "Imputed Income for Child Support (ARM 37.62.106)",
    label: "37%2E62%2E106",
  },
  {
    code: 108,
    name: "Income Verification/Determining Annual Income (ARM 37.62.108)",
    label: "37%2E62%2E108",
  },
  {
    code: 110,
    name: "Allowable Deductions from Parents' Income (ARM 37.62.110)",
    label: "37%2E62%2E110",
  },
  {
    code: 111,
    name: "Nonallowable Deductions from Income (ARM 37.62.111)",
    label: "37%2E62%2E111",
  },
  {
    code: 114,
    name: "Personal Allowance (ARM 37.62.114)",
    label: "37%2E62%2E114",
  },
  {
    code: 116,
    name: "Income Available for Child Support (ARM 37.62.116)",
    label: "37%2E62%2E116",
  },
  {
    code: 118,
    name: "Total Income Available/Parental Share (ARM 37.62.118)",
    label: "37%2E62%2E118",
  },
  {
    code: 121,
    name: "Primary Child Support Allowance (ARM 37.62.121)",
    label: "37%2E62%2E121",
  },
  {
    code: 123,
    name: "Supplements to Primary Child Support Allowance (ARM 37.62.123)",
    label: "37%2E62%2E123",
  },
  {
    code: 124,
    name: "Parenting Days (ARM 37.62.124)",
    label: "37%2E62%2E103",
  },
  {
    code: 126,
    name: "Minimum Support Obligation (ARM 37.62.126)",
    label: "37%2E62%2E126",
  },
  {
    code: 128,
    name:
      "Income Available for Standard of Living Adjustment (SOLA) (ARM 37.62.128)",
    label: "37%2E62%2E128",
  },
  {
    code: 130,
    name: "Long Distance Parenting Adjustment (ARM 37.62.130)",
    label: "37%2E62%2E130",
  },
  {
    code: 134,
    name: "Total Support Amount and Transfer Payment (ARM 37.62.134)",
    label: "37%2E62%2E103",
  },
  {
    code: 136,
    name: "Transfer Payment (ARM 37.62.136)",
    label: "37%2E62%2E136",
  },
  {
    code: 138,
    name:
      "Payment of Monthly Support Amount in Combination Parenting Arrangements (ARM 37.62.138)",
    label: "37%2E62%2E138",
  },
  {
    code: 140,
    name: "Anticipated Changes (ARM 37.62.140)",
    label: "37%2E62%2E140",
  },
  {
    code: 142,
    name: "Support Payable in Dollars (ARM 37.62.142)",
    label: "37%2E62%2E142",
  },
  {
    code: 144,
    name: "Social Security and Veterans Benefits (ARM 37.62.144)",
    label: "37%2E62%2E144",
  },
  {
    code: 146,
    name: "Modifications of Child Support Orders (ARM 37.62.146)",
    label: "37%2E62%2E146",
  },
  {
    code: 148,
    name: "Support Guidelines Tables/Forms (ARM 37.62.148)",
    label: "37%2E62%2E148",
  },
]

export const AdministrativeRules = ({ explanation, rules, isRulesStatus }) => {
  const [isRules, setIsRules] = useRules()
  let updateState = value => {
    setIsRules(value === true ? false : true)
  }

  let filtered = Rules.filter(function (item) {
    return rules.indexOf(item.code) !== -1
  })

  return (
    <>
      <Box width={"100%"} align={"center"}>
        <FormControl
          as={Flex}
          align="center"
          justifyContent="center"
          alignItems="center"
        >
          <FormLabel
            fontSize={"sm"}
            pt="2"
            fontWeight="normal"
            htmlFor="email-alerts"
          >
            {isRules === true
              ? "Hide these rules?"
              : "Show administrative rules?"}
          </FormLabel>
          <Switch isChecked={isRules} onChange={e => updateState(isRules)} />
        </FormControl>
        {isRules && (
          <Box
            width={["90%", "90%", "70%"]}
            p={8}
            rounded={"lg"}
            bg="yellow.50"
            mt={2}
          >
            <Box mb="2" align={"left"} fontSize={"sm"}>
              {explanation}
            </Box>
            <List align={"left"} fontSize={"sm"}>
              {filtered.map(({ code, name, label }, index) => (
                <ListItem key={index}>
                  <Link isExternal color="brand" href={baseUrl + label}>
                    {name}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </>
  )
}

AdministrativeRules.propTypes = propTypes
AdministrativeRules.defaultProps = defaultProps
