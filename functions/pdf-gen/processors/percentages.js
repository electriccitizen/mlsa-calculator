const format = number => {
  return Number(number).toLocaleString()
}
const unFormat = number => {
  var regex = /[.,\s]/g
  return parseInt(number.replace(regex, ""))
}

const unFormatMax = number => {
  return parseFloat(number.replace(/,/g, ""))
}

const calcPercentages = (form, incomePrimary, incomeSecondary) => {
  // See https://dphhs.mt.gov/Portals/85/csed/documents/cs404-2CSGuidelinesTables.pdf

  // Total
  let data = []
  let primary
  let secondary
  let totalPrimary = []
  let totalSecondary = []

  const globalPPA = 16588
  data["ppa.mother.allowance.from-table1"] = format(globalPPA)
  data["ppa.father.allowance.from-table1"] = format(globalPPA)

  // 5 Income available TODO: test with < 0
  let incomeAvailablePrimary = incomePrimary - globalPPA
  let incomeAvailableSecondary = incomeSecondary - globalPPA
  incomeAvailablePrimary < 0
    ? (data["ppa.mother.income"] = 0)
    : (data["ppa.mother.income"] = format(incomeAvailablePrimary))
  incomeAvailableSecondary < 0
    ? (data["ppa.father.income"] = 0)
    : (data["ppa.father.income"] = format(incomeAvailableSecondary))

  // 6
  data["ppa.mother.income"] === 0
    ? (data["ppa.mother.line6"] = "Total from Worksheet C")
    : (data["ppa.mother.line6"] = format(incomePrimary * 0.12))

  data["ppa.father.income"] === 0
    ? (data["ppa.father.line6"] = "Total from Worksheet C")
    : (data["ppa.father.line6"] = format(incomeSecondary * 0.12))

  // 7 larger of line 5 and line 6
  data["ppa.mother.compare"] = format(
    Math.max(
      unFormatMax(data["ppa.mother.income"]),
      unFormatMax(data["ppa.mother.line6"])
    )
  )

  data["ppa.father.compare"] = format(
    Math.max(
      unFormatMax(data["ppa.father.income"]),
      unFormatMax(data["ppa.father.line6"])
    )
  )

  // 8 Combined income available
  data["ppa.combined"] = format(
    unFormatMax(data["ppa.mother.compare"]) +
      unFormatMax(data["ppa.father.compare"])
  )

  // 9 Parental share
  primary =
    (unFormatMax(data["ppa.mother.compare"]) /
      unFormatMax(data["ppa.combined"])) *
    100
  secondary =
    (unFormatMax(data["ppa.father.compare"]) /
      unFormatMax(data["ppa.combined"])) *
    100
  data["ppa.mother.share"] = primary.toFixed(2)
  data["ppa.father.share"] = secondary.toFixed(2)

  // 10 Num Children
  data["ppa.numChildren"] = form.NumPrimaryChildren

  // 11 Primary support allowance
  // Table 2

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

  data["ppa.pcsa"] = format(globalPSA)

  // 12a child care less dc tax credit
  //primary = form.

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

  Object.entries(form.ChildExpensesSecondary).forEach(([index, value]) => {
    secondaryCCC.push(parseInt(value.childCareCost))
    secondaryCHIP.push(parseInt(value.healthInsurance))
    secondaryUME.push(parseInt(value.medicalExpense))
    value.otherExpenses !== "no" &&
      Object.entries(value.otherExpenses).forEach(([index, expense]) => {
        primaryOther.push(parseInt(expense.amt))
      })
  })

  data["ppa.costLessCredit"] = format(
    primaryCCC.concat(secondaryCCC).reduce((a, b) => a + b, 0)
  )
  data["ppa.healthPremium"] = format(
    primaryCHIP.concat(secondaryCHIP).reduce((a, b) => a + b, 0)
  )
  data["ppa.unreimbursedMed"] = format(
    primaryUME.concat(secondaryUME).reduce((a, b) => a + b, 0)
  )
  data["ppa.other"] = format(
    primaryOther.concat(secondaryOther).reduce((a, b) => a + b, 0)
  )

  let ppaTotal =
    unFormat(data["ppa.costLessCredit"]) +
    unFormat(data["ppa.healthPremium"]) +
    unFormat(data["ppa.unreimbursedMed"]) +
    unFormat(data["ppa.other"])
  data["ppa.totalSupplement"] = format(ppaTotal)

  let ppaPrimary =
    unFormat(data["ppa.totalSupplement"]) + unFormat(data["ppa.pcsa"])
  data["ppa.totalPrimaryAllowance"] = format(ppaPrimary)

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

module.exports = { calcPercentages }
