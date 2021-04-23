const { getValue, getValueAsNumber, getValueAsMoney, getValueAsArray, numberFormatToMoney } = require('../utils/helpers')
const { calcChildExpenses } = require('./percentages')
const { getIRSBusinessMileageRate, getStandardExpense } = require('../utils/support-tables')

const calcSola = (form, initiate, percentages) => {

  // Main
  let data = {}
  // Addendum
  let addendum = []

  // 14 For each parent, if line 6 > line 5, skip to line 21 and enter line 6 amount. If line 6 < line 5, go to line 15
  if (percentages["ppa.mother.line6"] < percentages["ppa.mother.income"]) {

    // 15 Parent’s share of total (for each column, line 13 x line 9)
    data["sola.mother.share"] =
      percentages["ppa.totalPrimaryAllowance"] *
      (Number(percentages["ppa.mother.share"]) / 100)

    //16 Compare line 15 to line 5; enter lower amount here
    data["sola.mother.shareLower"] = Math.min(
      percentages["ppa.mother.income"],
      data["sola.mother.share"]
    )

    // 17 Income available for SOLA (line 5 minus line 16; if zero, enter zero and skip to line 21)
    data["sola.mother.income"] =
      percentages["ppa.mother.income"] - data["sola.mother.shareLower"]
    if (data["sola.mother.income"] > 0) {
      // 18A Long distance parenting adjustment (Worksheet D)
      data["sola.mother.distanceAdjustment"] =
        calcLongDistanceParentingAdjustment(form, "StandardOfLiving")

      // 18B Other (specify)
      data["sola.mother.other"] =
        calcOther(form, ["StandardOfLiving", "other"])

      addendum.push([
        `${initiate["initiate.mother.name"]}, Other sola and parent's annual child support, continued from 18b`,
        ...mapToAddendumOther(form, ["StandardOfLiving", "other"]),
        `Total -- ${numberFormatToMoney(data["sola.mother.other"])}`
      ])

      // 19 Adjusted income for SOLA [line 17 minus (18a + 18b)]
      data["sola.mother.adjusted"] =
        data["sola.mother.income"] - (data["sola.mother.distanceAdjustment"] + data["sola.mother.other"])

      // 20 SOLA amount (Worksheet E)
      data["sola.mother.amount"] = calcStandardOfLivingAdjustment(
        getValueAsNumber(form, ["NumPrimaryChildren"]),
        data["sola.mother.adjusted"]
      )

      // 21 Add line 16 and line 20
      data["sola.mother.line21"] =
        data["sola.mother.shareLower"] +
        data["sola.mother.amount"]
    } else {
      // 21 Add line 16 and line 20
      data["sola.mother.line21"] = data["sola.mother.shareLower"]
    }
  } else {
    data["sola.mother.line21"] = percentages["ppa.mother.line6"]
  }

  // 14 For each parent, if line 6 > line 5, skip to line 21 and enter line 6 amount. If line 6 < line 5, go to line 15
  if (percentages["ppa.father.line6"] < percentages["ppa.father.income"]) {

    // 15 Parent’s share of total (for each column, line 13 x line 9)
    data["sola.father.share"] =
      percentages["ppa.totalPrimaryAllowance"] *
      (Number(percentages["ppa.father.share"]) / 100)

    // 16 Compare line 15 to line 5; enter lower amount here
    data["sola.father.shareLower"] = Math.min(
      percentages["ppa.father.income"],
      data["sola.father.share"]
    )

    // 17 Income available for SOLA (line 5 minus line 16; if zero, enter zero and skip to line 21)
    data["sola.father.income"] =
      percentages["ppa.father.income"] - data["sola.father.shareLower"]

    if (data["sola.father.income"] > 0) {
      // 18A Long distance parenting adjustment (Worksheet D)
      data["sola.father.distanceAdjustment"] =
        calcLongDistanceParentingAdjustment(form, "StandardOfLivingSecondary")

      // 18B Other (specify)
      data["sola.father.other"] =
        calcOther(form, ["StandardOfLivingSecondary", "other"])

      addendum.push([
        `${initiate["initiate.father.name"]}, Other sola and parent's annual child support, continued from 18b`,
        ...mapToAddendumOther(form, ["StandardOfLivingSecondary", "other"]),
        `Total -- ${numberFormatToMoney(data["sola.father.other"])}`
      ])

      // 19 Adjusted income for SOLA [line 17 minus (18a + 18b)]
      data["sola.father.adjusted"] =
        data["sola.father.income"] - (data["sola.father.distanceAdjustment"] + data["sola.father.other"])

      // 20 SOLA amount (Worksheet E)
      data["sola.father.amount"] = calcStandardOfLivingAdjustment(
        getValueAsNumber(form, ["NumPrimaryChildren"]),
        data["sola.father.adjusted"]
      )

      // 21 Add line 16 and line 20
      data["sola.father.line21"] =
        data["sola.father.shareLower"] +
        data["sola.father.amount"]
    } else {
      // 21 Add line 16 and line 20
      data["sola.father.line21"] = data["sola.father.shareLower"]
    }
  } else {
    data["sola.father.line21"] = percentages["ppa.father.line6"]
  }

  // 18b Other (specify)
  if (data["sola.mother.other"] || data["sola.father.other"]) {
    data["sola.otherSpecify"] = "See Worksheet A Addendum"
  }

  // 22 Gross Annual Child Support (for each parent, compare line 21 to line 6; enter the higher amount)
  data["sola.mother.gross"] = Math.max(
    percentages["ppa.mother.line6"],
    data["sola.mother.line21"]
  )

  data["sola.father.gross"] = Math.max(
    percentages["ppa.father.line6"],
    data["sola.father.line21"]
  )

  // 23 Credit for payment of expenses (enter amount of line 12 expenses paid by each parent)
  const primaryChildExpenses = calcChildExpenses(form, "ChildExpenses")
  const secondaryChildExpenses = calcChildExpenses(form, "ChildExpensesSecondary")
  data["sola.mother.credit"] = primaryChildExpenses.total
  data["sola.father.credit"] = secondaryChildExpenses.total

  // 24 Total Annual Child Support (line 22 minus line 23; if less than zero, enter zero) 24 PA
  const totalPrimary = data["sola.mother.gross"] - data["sola.mother.credit"]
  const totalSecondary = data["sola.father.gross"] - data["sola.father.credit"]
  data["sola.mother.total"] = totalPrimary < 0 ? 0 : totalPrimary
  data["sola.father.total"] = totalSecondary < 0 ? 0 : totalSecondary

  // Callout
  data["sola.mother.totalCallout"] = data["sola.mother.total"]
  data["sola.father.totalCallout"] = data["sola.father.total"]

  return {
    data,
    addendum
  }
}

// Helpers

// WORKSHEET D: LONG DISTANCE PARENTING ADJUSTMENT
const calcLongDistanceParentingAdjustment = (form, key) => {
  const standardOfLiving = getValue(form, key, {})

  // 1. Annual mileage actually driven by the parent to exercise long-distance parenting
  const distance = getValueAsNumber(standardOfLiving, ["mileage", "distance"])

  // 2. Current IRS business mileage rate (from Table 3)
  const globalMileageRate = getIRSBusinessMileageRate()

  // 3. Parent’s mileage cost (line 1 times line 2
  const mileageCost = distance * globalMileageRate

  // 4. Parent’s annual cost of transportation by means other than automobile
  const annualCost = getValueAsNumber(standardOfLiving, ["transportation", "othercost"])

  // 5. Parent’s total cost (line 3 plus line 4)
  const totalCost = mileageCost + annualCost

  // 6. Standard expense (from Table 3)
  const globalStandardExpense = getStandardExpense()

  // 7. LONG DISTANCE PARENTING ADJUSTMENT (Line 5 minus line 6; if less than zero, enter zero. Enter this amount on line 18a, worksheet A)
  const longDistanceParentingAdjustment = totalCost - globalStandardExpense
  return longDistanceParentingAdjustment < 0 ? 0 : longDistanceParentingAdjustment
}

// WORKSHEET E: STANDARD OF LIVING ADJUSTMENT (SOLA)
const calcStandardOfLivingAdjustment = (numChildren, adjustedIncome) => {
  const solaFactors = [0.14, 0.21, 0.27, 0.31, 0.35, 0.39, 0.43, 0.47]
  if (numChildren > 0 && numChildren <= solaFactors.length) {
    return solaFactors[numChildren - 1] * adjustedIncome
  } else if (numChildren > solaFactors.length) {
    return solaFactors[solaFactors.length - 1] * adjustedIncome
  } else {
    return 0
  }
}

const calcOther = (form, key) => {
  const others = getValue(form, key, {})
  if (others === "no") return 0
  return Object.values(others).reduce((total, other) => {
    return total + getValueAsNumber(other, ["amt"])
  }, 0)
}

const mapToAddendumOther = (form, key) => {
  return getValueAsArray(form, key)
    .map(other => `${getValue(other, ["desc"], "")} -- ${getValueAsMoney(other, ["amt"])}`)
}

module.exports = { calcSola }