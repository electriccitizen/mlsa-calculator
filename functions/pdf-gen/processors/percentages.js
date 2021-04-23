const { getValue, getValueAsNumber, getValueAsMoney, getValueAsArray, numberFormatToMoney, calcTotal } = require("../utils/helpers")
const { getAllowanceChildren, getPersonalAllowance } = require('../utils/support-tables')

const calcPercentages = (form, initiate, deductions) => {
  // See https://dphhs.mt.gov/Portals/85/csed/documents/cs404-2CSGuidelinesTables.pdf

  // Main
  let data = {}
  // Addendum
  let addendum = []

  // 4 Personal allowance from Table 1
  const globalPPA = getPersonalAllowance()
  data["ppa.mother.personalAllowance"] = globalPPA
  data["ppa.father.personalAllowance"] = globalPPA

  // 5 Income available for child support (line 3 minus line 4; if less than zero, enter zero)
  const incomeAvailablePrimary = deductions["allowable.mother.income"] - globalPPA
  const incomeAvailableSecondary = deductions["allowable.father.income"] - globalPPA
  incomeAvailablePrimary < 0
    ? (data["ppa.mother.income"] = 0)
    : (data["ppa.mother.income"] = incomeAvailablePrimary)
  incomeAvailableSecondary < 0
    ? (data["ppa.father.income"] = 0)
    : (data["ppa.father.income"] = incomeAvailableSecondary)

  // 6 If line 5 = zero, enter minimum contribution from Worksheet C. 
  // If line 5 > 0, multiply line 3 by 12% (.12) and enter here.  
  data["ppa.mother.income"] === 0
    ? (data["ppa.mother.line6"] = calcMinimumSupportObligation(deductions["allowable.mother.income"], globalPPA))
    : (data["ppa.mother.line6"] = deductions["allowable.mother.income"] * 0.12)

  data["ppa.father.income"] === 0
    ? (data["ppa.father.line6"] = calcMinimumSupportObligation(deductions["allowable.father.income"], globalPPA))
    : (data["ppa.father.line6"] = deductions["allowable.father.income"] * 0.12)

  // 7 Compare each parent’s lines 5 & 6; enter higher number
  data["ppa.mother.compare"] = Math.max(
    data["ppa.mother.income"],
    data["ppa.mother.line6"]
  )

  data["ppa.father.compare"] = Math.max(
    data["ppa.father.income"],
    data["ppa.father.line6"]
  )

  // 8 Combined income available
  data["ppa.combined"] =
    data["ppa.mother.compare"] +
    data["ppa.father.compare"]

  // 9 Parental share of combined income (line 7 ÷ line 8) 
  if (data["ppa.combined"] > 0) {
    data["ppa.mother.share"] =
      (data["ppa.mother.compare"] /
        data["ppa.combined"] *
        100).toFixed(2)
    data["ppa.father.share"] =
      (data["ppa.father.compare"] /
        data["ppa.combined"] *
        100).toFixed(2)
  } else {
    data["ppa.mother.share"] = 0
    data["ppa.father.share"] = 0
  }

  // Callout
  data["ppa.mother.percentageCallout"] = data["ppa.mother.share"]
  data["ppa.father.percentageCallout"] = data["ppa.father.share"]

  // 10 Number of children listed above due support
  data["ppa.numChildren"] = getValue(form, ["NumPrimaryChildren"], "")

  // 11 Primary child support allowance from Table 2 
  data["ppa.pcsa"] = getAllowanceChildren(getValueAsNumber(form, ["NumPrimaryChildren"]))

  const primaryChildExpenses = calcChildExpenses(form, "ChildExpenses")
  const secondaryChildExpenses = calcChildExpenses(form, "ChildExpensesSecondary")

  // 12A Child care cost less dependent care tax credit
  data["ppa.costLessCredit"] =
    primaryChildExpenses.childCareCost +
    secondaryChildExpenses.childCareCost

  // 12B Child health insurance premium 
  data["ppa.healthPremium"] =
    primaryChildExpenses.healthInsurance +
    secondaryChildExpenses.healthInsurance

  // 12C Unreimbursed medical expense (> $250/child)
  data["ppa.unreimbursedMed"] =
    primaryChildExpenses.medicalExpense +
    secondaryChildExpenses.medicalExpense

  // 12D Other (specify)
  data["ppa.other"] =
    primaryChildExpenses.other +
    secondaryChildExpenses.other

  addendum.push([
    `${initiate["initiate.mother.name"]}, Other primary child support allowance, continued from 12d`,
    ...mapToAddendumOtherExpenses(form, "ChildExpenses"),
    `Total -- ${numberFormatToMoney(primaryChildExpenses.other)}`
  ], [
    `${initiate["initiate.father.name"]}, Other primary child support allowance, continued from 12d`,
    ...mapToAddendumOtherExpenses(form, "ChildExpensesSecondary"),
    `Total -- ${numberFormatToMoney(secondaryChildExpenses.other)}`
  ])

  if (data["ppa.other"]) {
    data["ppa.otherSpecify"] = "See Worksheet A Addendum"
  }

  // 12E Total supplement (add lines 12a through 12d)
  data["ppa.totalSupplement"] =
    primaryChildExpenses.total +
    secondaryChildExpenses.total

  // 13 Total primary allowance and supplement (add lines 11 and 12e) 
  data["ppa.totalPrimaryAllowance"] =
    data["ppa.totalSupplement"] + data["ppa.pcsa"]

  return {
    data,
    addendum
  }
}

// Helpers

// WORKSHEET C: MINIMUM SUPPORT OBLIGATION
const calcMinimumSupportObligation = (income, personalAllowance) => {
  // Income Ratio: Divide line 3, worksheet A, by line 4, worksheet A
  const IR = income / personalAllowance
  if (IR < 0 || IR >= 1) return 0

  // Find index IR from range
  const range = [0, 0.25, 0.31, 0.38, 0.45, 0.52, 0.59, 0.66, 0.73, 0.80, 0.87, 0.94, 1]
  const index = range.findIndex((value, index, array) => IR >= value && IR < array[index + 1])

  // Multiply line 3, WS-A, by percent
  return index > 0 ? income * (index / 100) : 0
}

const calcChildExpenses = (form, key) => {
  const calcOtherExpenses = (expense) => {
    const otherExpenses = getValue(expense, ["otherExpenses"])
    if (!otherExpenses || otherExpenses === "no") {
      return 0
    }
    return getValueAsArray(expense, ["otherExpenses"]).reduce((accOther, otherExpense) => {
      return accOther + getValueAsNumber(otherExpense, ["amt"])
    }, 0)
  }

  const expenses = getValueAsArray(form, key).reduce((acc, expense) => ({
    childCareCost: acc.childCareCost + getValueAsNumber(expense, ["childCareCost"]),
    healthInsurance: acc.healthInsurance + getValueAsNumber(expense, ["healthInsurance"]),
    medicalExpense: acc.medicalExpense + getValueAsNumber(expense, ["medicalExpense"]),
    other: acc.other + calcOtherExpenses(expense)
  }), {
    childCareCost: 0,
    healthInsurance: 0,
    medicalExpense: 0,
    other: 0
  })

  return {
    ...expenses,
    total: calcTotal(Object.values(expenses))
  }
}

const mapToAddendumOtherExpenses = (form, key) => {
  return getValueAsArray(form, key).reduce((data, expense) => {
    const otherExpenses = getValue(expense, ["otherExpenses"])
    if (otherExpenses && otherExpenses !== "no") {
      return [
        ...data,
        ...getValueAsArray(expense, ["otherExpenses"]).map(other => `${getValue(other, ["desc"], "")} -- ${getValueAsMoney(other, ["amt"])}`),
      ]
    }
    return data
  }, [])
}

module.exports = { calcPercentages, calcChildExpenses }
