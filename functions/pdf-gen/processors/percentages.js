const { convertToNumber } = require("../helpers")
const { getAllowanceChildren, getPersonalAllowance } = require('../utils/support-tables')

const calcPercentages = (form, deductions) => {
  // See https://dphhs.mt.gov/Portals/85/csed/documents/cs404-2CSGuidelinesTables.pdf

  // Totals
  let data = []

  // 4 Personal allowance from Table 1
  const globalPPA = getPersonalAllowance()
  data["ppa.mother.personalAllowance"] = globalPPA
  data["ppa.father.personalAllowance"] = globalPPA

  // 5 Income available for child support (line 3 minus line 4; if less than zero, enter zero)
  let incomeAvailablePrimary = deductions["allowable.mother.income"] - globalPPA
  let incomeAvailableSecondary = deductions["allowable.father.income"] - globalPPA
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
    data["ppa.mother.share"] = convertToNumber(
      (data["ppa.mother.compare"] /
        data["ppa.combined"] *
        100).toFixed(2)
    )
    data["ppa.father.share"] = convertToNumber(
      (data["ppa.father.compare"] /
        data["ppa.combined"] *
        100).toFixed(2)
    )
  } else {
    data["ppa.mother.share"] = 0
    data["ppa.father.share"] = 0
  }

  // Callout
  data["ppa.mother.percentageCallout"] = data["ppa.mother.share"]
  data["ppa.father.percentageCallout"] = data["ppa.father.share"]

  // 10 Number of children listed above due support
  data["ppa.numChildren"] = form.NumPrimaryChildren

  // 11 Primary child support allowance from Table 2 
  data["ppa.pcsa"] = getAllowanceChildren(Number(form.NumPrimaryChildren))

  let primaryChildExpenses = calcChildExpenses(form.ChildExpenses)
  let secondaryChildExpenses = calcChildExpenses(form.ChildExpensesSecondary)

  // 12A Child care cost less dependent care tax credit
  data["ppa.costLessCredit"] =
    primaryChildExpenses.childCareCost +
    secondaryChildExpenses.childCareCost

  //12B Child health insurance premium 
  data["ppa.healthPremium"] =
    primaryChildExpenses.healthInsurance +
    secondaryChildExpenses.healthInsurance

  //12C Unreimbursed medical expense (> $250/child)
  data["ppa.unreimbursedMed"] =
    primaryChildExpenses.medicalExpense +
    secondaryChildExpenses.medicalExpense

  //12D Other (specify) @TODO desc gets added to Attachment 
  data["ppa.other"] =
    primaryChildExpenses.other +
    secondaryChildExpenses.other

  if (data["ppa.other"]) {
    data["ppa.otherSpecify"] = "See Worksheet A Addendum"
  }

  //12E Total supplement (add lines 12a through 12d)
  data["ppa.totalSupplement"] =
    primaryChildExpenses.total +
    secondaryChildExpenses.total

  //13 Total primary allowance and supplement (add lines 11 and 12e) 
  data["ppa.totalPrimaryAllowance"] =
    data["ppa.totalSupplement"] + data["ppa.pcsa"]

  return data
}

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

const calcChildExpenses = (data) => {
  const initExpenses = {
    childCareCost: 0,
    healthInsurance: 0,
    medicalExpense: 0,
    other: 0,
    total: 0
  }

  if (!data) return initExpenses

  const calcOtherExpenses = (otherExpenses) => {
    return Object.values(otherExpenses).reduce((accOther, otherExpense) => {
      return otherExpense.amt ? accOther + convertToNumber(otherExpense.amt) : accOther
    }, 0)
  }

  const expenses = Object.values(data).reduce((acc, expense) => ({
    childCareCost:
      expense.childCareCost ?
        acc.childCareCost + convertToNumber(expense.childCareCost) :
        acc.childCareCost,
    healthInsurance:
      expense.healthInsurance ?
        acc.healthInsurance + convertToNumber(expense.healthInsurance) :
        acc.healthInsurance,
    medicalExpense:
      expense.medicalExpense ?
        acc.medicalExpense + convertToNumber(expense.medicalExpense) :
        acc.medicalExpense,
    other:
      (expense.otherExpenses && expense.otherExpenses !== "no") ?
        acc.other + calcOtherExpenses(expense.otherExpenses) :
        acc.other
  }), initExpenses)

  return {
    ...expenses,
    total: Object.values(expenses).reduce((total, value) => total + value, 0)
  }
}

module.exports = { calcPercentages, calcChildExpenses }
