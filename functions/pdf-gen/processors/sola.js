const { convertToNumber } = require('../helpers')

const calcSola = (form, percentages) => {

  // Total
  let data = []

  // 14 For each parent, if line 6 > line 5, skip to line 21 and enter line 6 amount. If line 6 < line 5, go to line 15
  if (percentages["ppa.mother.line6"] < percentages["ppa.mother.income"]) {

    // 15 Parent’s share of total (for each column, line 13 x line 9)
    data["sola.mother.share"] =
      percentages["ppa.totalPrimaryAllowance"] *
      (percentages["ppa.mother.share"] / 100)


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
      data["sola.mother.distanceAdjustment"] = calcLongDistanceParentingAdjustment(form.StandardOfLiving)

      // 18B Other (specify) @TODO add to attachment as needed
      data["sola.mother.other"] = calcOther(form.StandardOfLiving, "other")

      // 19 Adjusted income for SOLA [line 17 minus (18a + 18b)]
      data["sola.mother.adjusted"] =
        data["sola.mother.income"] - (data["sola.mother.distanceAdjustment"] + data["sola.mother.other"])

      // 20 SOLA amount (Worksheet E)
      data["sola.mother.amount"] = calcStandardOfLivingAdjustment(
        convertToNumber(form.NumPrimaryChildren),
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
      (percentages["ppa.father.share"] / 100)

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
      data["sola.father.distanceAdjustment"] = calcLongDistanceParentingAdjustment(form.StandardOfLivingSecondary)

      // 18B Other (specify) @TODO add to attachment as needed
      data["sola.father.other"] = calcOther(form.StandardOfLivingSecondary, "other")

      // 19 Adjusted income for SOLA [line 17 minus (18a + 18b)]
      data["sola.father.adjusted"] =
        data["sola.father.income"] - (data["sola.father.distanceAdjustment"] + data["sola.father.other"])

      // 20 SOLA amount (Worksheet E)
      data["sola.father.amount"] = calcStandardOfLivingAdjustment(
        convertToNumber(form.NumPrimaryChildren),
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
    data["sola.other-specify"] = "See Worksheet A Addendum"
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

  // @TODO verify this field
  // 23 Credit for payment of expenses (enter amount of line 12 expenses paid by each parent)
  data["sola.mother.credit"] = percentages["ppa.totalSupplement"]
  data["sola.father.credit"] = percentages["ppa.totalSupplement"]

  // 24 Total Annual Child Support (line 22 minus line 23; if less than zero, enter zero) 24 PA
  let totalPrimary = data["sola.mother.gross"] - data["sola.mother.credit"]
  let totalSecondary = data["sola.father.gross"] - data["sola.father.credit"]
  data["sola.mother.total"] = totalPrimary < 0 ? 0 : totalPrimary
  data["sola.father.total"] = totalSecondary < 0 ? 0 : totalSecondary
  data["sola.mother.total-callout"] = data["sola.mother.total"]
  data["sola.father.total-callout"] = data["sola.father.total"]

  return data
}

// WORKSHEET D: LONG DISTANCE PARENTING ADJUSTMENT
const calcLongDistanceParentingAdjustment = (standardOfLiving) => {
  if (!standardOfLiving) return 0

  // 1. Annual mileage actually driven by the parent to exercise long-distance parenting
  let distance = 0
  if (standardOfLiving.mileage.distance) {
    distance = convertToNumber(standardOfLiving.mileage.distance)
  }

  // From Table3 @TODO need to go into json config, changes yearly
  // 2. Current IRS business mileage rate (from Table 3)
  const globalMileageRate = 0.575

  // 3. Parent’s mileage cost (line 1 times line 2
  const mileageCost = distance * globalMileageRate

  // 4. Parent’s annual cost of transportation by means other than automobile
  let annualCost = 0
  if (standardOfLiving.transportation.othercost) {
    annualCost = convertToNumber(standardOfLiving.transportation.othercost)
  }

  // 5. Parent’s total cost (line 3 plus line 4)
  const totalCost = mileageCost + annualCost

  // From Table3 @TODO need to go into json config, changes yearly
  // 6. Standard expense (from Table 3)
  const globalStandardExpense = 1150

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
  if (!form[key]) return 0
  return Object.values(form[key]).reduce((total, income) => {
    return total + convertToNumber(income.amt)
  }, 0)
}

module.exports = { calcSola }