const { getValue, getValueAsNumber, getValueAsArray } = require("../utils/helpers")
const { getAllowanceChildren, getPersonalAllowance } = require('../utils/support-tables')
const { currency, format, getAmount, add, subtract, sum, percentage, isZero, isNegative, maximum, gt } = require('../utils/currency')

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
  const incomeAvailablePrimary = subtract(deductions["allowable.mother.income"], globalPPA)
  const incomeAvailableSecondary = subtract(deductions["allowable.father.income"], globalPPA)
  isNegative(incomeAvailablePrimary)
    ? (data["ppa.mother.income"] = currency(0))
    : (data["ppa.mother.income"] = incomeAvailablePrimary)
  isNegative(incomeAvailableSecondary)
    ? (data["ppa.father.income"] = currency(0))
    : (data["ppa.father.income"] = incomeAvailableSecondary)

  // 6 If line 5 = zero, enter minimum contribution from Worksheet C. 
  // If line 5 > 0, multiply line 3 by 12% (.12) and enter here.  
  isZero(data["ppa.mother.income"])
    ? (data["ppa.mother.line6"] = calcMinimumSupportObligation(deductions["allowable.mother.income"], globalPPA))
    : (data["ppa.mother.line6"] = percentage(deductions["allowable.mother.income"], 12))

  isZero(data["ppa.father.income"])
    ? (data["ppa.father.line6"] = calcMinimumSupportObligation(deductions["allowable.father.income"], globalPPA))
    : (data["ppa.father.line6"] = percentage(deductions["allowable.father.income"], 12))

  // 7 Compare each parent’s lines 5 & 6; enter higher number
  data["ppa.mother.compare"] = maximum(
    data["ppa.mother.income"],
    data["ppa.mother.line6"]
  )

  data["ppa.father.compare"] = maximum(
    data["ppa.father.income"],
    data["ppa.father.line6"]
  )

  // 8 Combined income available
  data["ppa.combined"] = add(
    data["ppa.mother.compare"],
    data["ppa.father.compare"]
  )

  // 9 Parental share of combined income (line 7 ÷ line 8)
  if (gt(data["ppa.combined"], 0)) {
    data["ppa.mother.share"] =
      Number((getAmount(data["ppa.mother.compare"]) /
        getAmount(data["ppa.combined"]) *
        100).toFixed(2))
    data["ppa.father.share"] =
      Number((getAmount(data["ppa.father.compare"]) /
        getAmount(data["ppa.combined"]) *
        100).toFixed(2))
  } else {
    data["ppa.mother.share"] = currency(0)
    data["ppa.father.share"] = currency(0)
  }

  // Callout
  data["ppa.mother.percentageCallout"] = data["ppa.mother.share"]
  data["ppa.father.percentageCallout"] = data["ppa.father.share"]

  // 10 Number of children listed above due support
  data["ppa.numChildren"] = getValueAsArray(form, ["PrimaryChildren"]).filter(child => child.status === 'none').length

  // 11 Primary child support allowance from Table 2 
  data["ppa.pcsa"] = getAllowanceChildren(data["ppa.numChildren"])

  const primaryChildExpenses = calcChildExpenses(form, "ChildExpenses")
  const secondaryChildExpenses = calcChildExpenses(form, "ChildExpensesSecondary")

  // 12A Child care cost less dependent care tax credit
  data["ppa.costLessCredit"] = add(
    primaryChildExpenses.childCareCost,
    secondaryChildExpenses.childCareCost
  )

  // 12B Child health insurance premium 
  data["ppa.healthPremium"] = add(
    primaryChildExpenses.healthInsurance,
    secondaryChildExpenses.healthInsurance
  )

  // 12C Unreimbursed medical expense (> $250/child)
  data["ppa.unreimbursedMed"] = add(
    primaryChildExpenses.medicalExpense,
    secondaryChildExpenses.medicalExpense
  )

  // 12D Other (specify)
  data["ppa.other"] = add(
    primaryChildExpenses.other,
    secondaryChildExpenses.other
  )

  addendum.push([
    `${initiate["initiate.mother.name"]}, Other primary child support allowance, continued from 12d`,
    ...mapToAddendumOtherExpenses(form, "ChildExpenses"),
    `Total -- ${format(primaryChildExpenses.other, 'currency')}`
  ], [
    `${initiate["initiate.father.name"]}, Other primary child support allowance, continued from 12d`,
    ...mapToAddendumOtherExpenses(form, "ChildExpensesSecondary"),
    `Total -- ${format(secondaryChildExpenses.other, 'currency')}`
  ])

  if (data["ppa.other"]) {
    data["ppa.otherSpecify"] = "See Worksheet A Addendum"
  }

  // 12E Total supplement (add lines 12a through 12d)
  data["ppa.totalSupplement"] = add(
    primaryChildExpenses.total,
    secondaryChildExpenses.total
  )

  // 13 Total primary allowance and supplement (add lines 11 and 12e) 
  data["ppa.totalPrimaryAllowance"] = add(
    data["ppa.totalSupplement"],
    data["ppa.pcsa"]
  )

  return {
    data,
    addendum
  }
}

// Helpers

// WORKSHEET C: MINIMUM SUPPORT OBLIGATION
const calcMinimumSupportObligation = (income, personalAllowance) => {
  // Income Ratio: Divide line 3, worksheet A, by line 4, worksheet A
  const IR = Number((getAmount(income) / getAmount(personalAllowance)).toFixed(2))
  if (IR < 0 || IR >= 1) return 0

  // Find index IR from range
  const range = [0, 0.25, 0.31, 0.38, 0.45, 0.52, 0.59, 0.66, 0.73, 0.80, 0.87, 0.94, 1]
  const index = range.findIndex((value, index, array) => IR >= value && IR < array[index + 1])

  // Multiply line 3, WS-A, by percent
  return index > 0 ? percentage(income, index) : 0
}

const calcChildExpenses = (form, key, index) => {
  const calcOtherExpenses = (expense) => {
    const otherExpenses = getValue(expense, ["otherExpenses"])
    if (!otherExpenses || otherExpenses === "no") {
      return currency(0)
    }
    return getValueAsArray(expense, ["otherExpenses"]).reduce((accOther, otherExpense) => {
      return add(accOther, getValueAsNumber(otherExpense, ["amt"]))
    }, currency(0))
  }

  const children = getValueAsArray(form, key)
  const expenses = (
    (index !== undefined && children[index]) ? [children[index]] : children
  ).reduce((acc, expense) => ({
    childCareCost: add(acc.childCareCost, getValueAsNumber(expense, ["childCareCost"])),
    healthInsurance: add(acc.healthInsurance, getValueAsNumber(expense, ["healthInsurance"])),
    medicalExpense: add(acc.medicalExpense, getValueAsNumber(expense, ["medicalExpense"])),
    other: add(acc.other, calcOtherExpenses(expense))
  }), {
    childCareCost: currency(0),
    healthInsurance: currency(0),
    medicalExpense: currency(0),
    other: currency(0)
  })

  return {
    ...expenses,
    total: sum(Object.values(expenses))
  }
}

const mapToAddendumOtherExpenses = (form, key) => {
  return getValueAsArray(form, key).reduce((data, expense) => {
    const otherExpenses = getValue(expense, ["otherExpenses"])
    if (otherExpenses && otherExpenses !== "no") {
      return [
        ...data,
        ...getValueAsArray(expense, ["otherExpenses"]).map(other => `${getValue(other, ["desc"], "")} -- ${format(getValueAsNumber(other, ["amt"]), 'currency')}`),
      ]
    }
    return data
  }, [])
}

module.exports = { calcPercentages, calcChildExpenses }
