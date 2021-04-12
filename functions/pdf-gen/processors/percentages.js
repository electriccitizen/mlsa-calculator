const calcPercentages = (form, deductions) => {
  // See https://dphhs.mt.gov/Portals/85/csed/documents/cs404-2CSGuidelinesTables.pdf

  // Totals
  let data = []
  let primary
  let secondary

  // 4 Personal allowance from Table 1 -- @TODO We need to store this in a JSON config because it changes from year-to-year
  const globalPPA = 16588
  data["ppa.mother.allowance.from-table1"] = globalPPA
  data["ppa.father.allowance.from-table1"] = globalPPA

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
    ? (data["ppa.mother.line6"] = calcMinimumSupportObligation(deductions["allowable.mother.income"]))
    : (data["ppa.mother.line6"] = deductions["allowable.mother.income"] * 0.12)

  data["ppa.father.income"] === 0
    ? (data["ppa.father.line6"] = calcMinimumSupportObligation(deductions["allowable.father.income"]))
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
  primary =
    data["ppa.mother.compare"] /
    data["ppa.combined"] *
    100

  secondary =
    data["ppa.father.compare"] /
    data["ppa.combined"] *
    100

  data["ppa.mother.share"] = primary
  data["ppa.father.share"] = secondary

  // Callout
  data["ppa.mother.percentage"] = data["ppa.mother.share"]
  data["ppa.father.percentage"] = data["ppa.father.share"]

  // 10 Number of children listed above due support
  data["ppa.numChildren"] = form.NumPrimaryChildren

  // 11 Primary child support allowance from Table 2 
  // @TODO these also need to go into a JSON config, they change yearly

  let globalPSA
  switch (form.NumPrimaryChildren) {
    case "1":
      globalPSA = 4967
      break
    case "2":
      globalPSA = 8294
      break
    case "3":
      globalPSA = 11612
      break
    case "4":
      globalPSA = 13270
      break
    case "5":
      globalPSA = 14929
      break
    case "6":
      globalPSA = 16588
      break
    case "7":
      globalPSA = 18247
      break
    case "8":
      globalPSA = 19906
      break
    default:
      globalPSA = 100
  }

  data["ppa.pcsa"] = globalPSA

  // 12A Child care cost less dependent care tax credit

  let primaryCCC = []
  let primaryCHIP = []
  let primaryUME = []
  let primaryOther = []

  Object.entries(form.ChildExpenses).forEach(([index, value]) => {
    primaryCCC.push(parseInt(value.childCareCost))
    primaryCHIP.push(parseInt(value.healthInsurance))
    primaryUME.push(parseInt(value.medicalExpense))
    value.otherExpenses !== "no" &&
      Object.entries(value.otherExpenses).forEach(([index, expense]) => {
        primaryOther.push(parseInt(expense.amt))
      })
  })

  let secondaryCCC = []
  let secondaryCHIP = []
  let secondaryUME = []
  let secondaryOther = []

  if (form.ChildExpensesSecondary) {
    Object.entries(form.ChildExpensesSecondary).forEach(([index, value]) => {
      secondaryCCC.push(parseInt(value.childCareCost))
      secondaryCHIP.push(parseInt(value.healthInsurance))
      secondaryUME.push(parseInt(value.medicalExpense))
      value.otherExpenses !== "no" &&
        Object.entries(value.otherExpenses).forEach(([index, expense]) => {
          primaryOther.push(parseInt(expense.amt))
        })
    })
  }

  data["ppa.costLessCredit"] =
    primaryCCC.concat(secondaryCCC).reduce((a, b) => a + b, 0)

  // 12B Child health insurance premium 
  data["ppa.healthPremium"] =
    primaryCHIP.concat(secondaryCHIP).reduce((a, b) => a + b, 0)

  //12C Unreimbursed medical expense (> $250/child)
  data["ppa.unreimbursedMed"] =
    primaryUME.concat(secondaryUME).reduce((a, b) => a + b, 0)

  //12D Other (specify) @TODO desc gets added to Attachment 
  data["ppa.other"] =
    primaryOther.concat(secondaryOther).reduce((a, b) => a + b, 0)

  let ppaTotal =
    data["ppa.costLessCredit"] +
    data["ppa.healthPremium"] +
    data["ppa.unreimbursedMed"] +
    data["ppa.other"]

  data["ppa.totalSupplement"] = ppaTotal

  let ppaPrimary =
    data["ppa.totalSupplement"] + data["ppa.pcsa"]

  data["ppa.totalPrimaryAllowance"] = ppaPrimary

  //let expenses = Object.assign(form.ChildExpenses, form.ChildExpensesSecondary)

  //console.log(expenses)

  // let primaryExp = []
  // Object.entries(form.ChildExpenses).forEach(([index, value]) =>
  //   primaryExp.push(value.childCareCost)
  // )

  // data["allowable.mother.total-callout"] = data["allowable.mother.total"]
  // data["allowable.father.total-callout"] = data["allowable.father.total"]

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

module.exports = { calcPercentages }
