const { getValue, getValueAsNumber, getValueAsArray } = require('../utils/helpers')
const { calcChildExpenses } = require('./percentages')
const { getIRSBusinessMileageRate, getStandardExpense } = require('../utils/support-tables')
const { currency, format, add, subtract, multiply, percentage, lt, gt, isNegative, minimum, maximum } = require('../utils/currency')

const calcSola = (form, initiate, percentages) => {

  // Main
  let data = {}
  // Addendum
  let addendum = []

  // Set defualt values
  // 15 Parent’s share of total (for each column, line 13 x line 9)
  data["sola.mother.share"] = currency(0)
  data["sola.father.share"] = currency(0)

  //16 Compare line 15 to line 5; enter lower amount here
  data["sola.mother.shareLower"] = currency(0)
  data["sola.father.shareLower"] = currency(0)

  // 17 Income available for SOLA (line 5 minus line 16; if zero, enter zero and skip to line 21)
  data["sola.mother.income"] = currency(0)
  data["sola.father.income"] = currency(0)

  // 18A Long distance parenting adjustment (Worksheet D)
  data["sola.mother.distanceAdjustment"] = currency(0)
  data["sola.father.distanceAdjustment"] = currency(0)

  // 18B Other (specify)
  data["sola.mother.other"] = currency(0)
  data["sola.father.other"] = currency(0)

  // 19 Adjusted income for SOLA [line 17 minus (18a + 18b)]
  data["sola.mother.adjusted"] = currency(0)
  data["sola.father.adjusted"] = currency(0)

  // 20 SOLA amount (Worksheet E)
  data["sola.mother.amount"] = currency(0)
  data["sola.father.amount"] = currency(0)

  // 14 For each parent, if line 6 > line 5, skip to line 21 and enter line 6 amount. If line 6 < line 5, go to line 15
  if (lt(percentages["ppa.mother.line6"], percentages["ppa.mother.income"])) {

    // 15 Parent’s share of total (for each column, line 13 x line 9)
    data["sola.mother.share"] = percentage(
      percentages["ppa.totalPrimaryAllowance"],
      percentages["ppa.mother.share"]
    )

    //16 Compare line 15 to line 5; enter lower amount here
    data["sola.mother.shareLower"] = minimum(
      percentages["ppa.mother.income"],
      data["sola.mother.share"]
    )

    // 17 Income available for SOLA (line 5 minus line 16; if zero, enter zero and skip to line 21)
    data["sola.mother.income"] = subtract(
      percentages["ppa.mother.income"],
      data["sola.mother.shareLower"]
    )
    if (gt(data["sola.mother.income"]), 0) {
      // 18A Long distance parenting adjustment (Worksheet D)
      data["sola.mother.distanceAdjustment"] =
        calcLongDistanceParentingAdjustment(form, "StandardOfLiving")

      // 18B Other (specify)
      data["sola.mother.other"] =
        calcOther(form, ["StandardOfLiving", "other"])

      addendum.push([
        `${initiate["initiate.mother.name"]}, Other sola and parent's annual child support, continued from 18b`,
        ...mapToAddendumOther(form, ["StandardOfLiving", "other"]),
        `Total -- ${format(data["sola.mother.other"], 'currency')}`
      ])

      // 19 Adjusted income for SOLA [line 17 minus (18a + 18b)]
      data["sola.mother.adjusted"] = subtract(
        data["sola.mother.income"],
        add(
          data["sola.mother.distanceAdjustment"],
          data["sola.mother.other"]
        )
      )

      // 20 SOLA amount (Worksheet E)
      data["sola.mother.amount"] = calcStandardOfLivingAdjustment(
        getValueAsArray(form, ["PrimaryChildren"]).filter(child => child.status === 'none').length,
        data["sola.mother.adjusted"]
      )

      // 21 Add line 16 and line 20
      data["sola.mother.line21"] = add(
        data["sola.mother.shareLower"],
        data["sola.mother.amount"]
      )
    } else {
      // 21 Add line 16 and line 20
      data["sola.mother.line21"] = data["sola.mother.shareLower"]
    }
  } else {
    // 21 Enter line 6 amount
    data["sola.mother.line21"] = percentages["ppa.mother.line6"]
  }

  // 14 For each parent, if line 6 > line 5, skip to line 21 and enter line 6 amount. If line 6 < line 5, go to line 15
  if (lt(percentages["ppa.father.line6"], percentages["ppa.father.income"])) {

    // 15 Parent’s share of total (for each column, line 13 x line 9)
    data["sola.father.share"] = percentage(
      percentages["ppa.totalPrimaryAllowance"],
      percentages["ppa.father.share"]
    )

    // 16 Compare line 15 to line 5; enter lower amount here
    data["sola.father.shareLower"] = minimum(
      percentages["ppa.father.income"],
      data["sola.father.share"]
    )

    // 17 Income available for SOLA (line 5 minus line 16; if zero, enter zero and skip to line 21)
    data["sola.father.income"] = subtract(
      percentages["ppa.father.income"],
      data["sola.father.shareLower"]
    )

    if (gt(data["sola.father.income"], 0)) {
      // 18A Long distance parenting adjustment (Worksheet D)
      data["sola.father.distanceAdjustment"] =
        calcLongDistanceParentingAdjustment(form, "StandardOfLivingSecondary")

      // 18B Other (specify)
      data["sola.father.other"] =
        calcOther(form, ["StandardOfLivingSecondary", "other"])

      addendum.push([
        `${initiate["initiate.father.name"]}, Other sola and parent's annual child support, continued from 18b`,
        ...mapToAddendumOther(form, ["StandardOfLivingSecondary", "other"]),
        `Total -- ${format(data["sola.father.other"], 'currency')}`
      ])

      // 19 Adjusted income for SOLA [line 17 minus (18a + 18b)]
      data["sola.father.adjusted"] = subtract(
        data["sola.father.income"],
        add(
          data["sola.father.distanceAdjustment"],
          data["sola.father.other"]
        )
      )

      // 20 SOLA amount (Worksheet E)
      data["sola.father.amount"] = calcStandardOfLivingAdjustment(
        getValueAsArray(form, ["PrimaryChildren"]).filter(child => child.status === 'none').length,
        data["sola.father.adjusted"]
      )

      // 21 Add line 16 and line 20
      data["sola.father.line21"] = add(
        data["sola.father.shareLower"],
        data["sola.father.amount"]
      )
    } else {
      // 21 Add line 16 and line 20
      data["sola.father.line21"] = data["sola.father.shareLower"]
    }
  } else {
    // 21 Enter line 6 amount
    data["sola.father.line21"] = percentages["ppa.father.line6"]
  }

  // 18b Other (specify)
  if (data["sola.mother.other"] || data["sola.father.other"]) {
    data["sola.otherSpecify"] = "See Worksheet A Addendum"
  }

  // 22 Gross Annual Child Support (for each parent, compare line 21 to line 6; enter the higher amount)
  data["sola.mother.gross"] = maximum(
    percentages["ppa.mother.line6"],
    data["sola.mother.line21"]
  )

  data["sola.father.gross"] = maximum(
    percentages["ppa.father.line6"],
    data["sola.father.line21"]
  )

  // 23 Credit for payment of expenses (enter amount of line 12 expenses paid by each parent)
  const primaryChildExpenses = calcChildExpenses(form, "ChildExpenses")
  const secondaryChildExpenses = calcChildExpenses(form, "ChildExpensesSecondary")
  data["sola.mother.credit"] = primaryChildExpenses.total
  data["sola.father.credit"] = secondaryChildExpenses.total

  // 24 Total Annual Child Support (line 22 minus line 23; if less than zero, enter zero) 
  const totalPrimary = subtract(data["sola.mother.gross"], data["sola.mother.credit"])
  const totalSecondary = subtract(data["sola.father.gross"], data["sola.father.credit"])
  data["sola.mother.total"] = isNegative(totalPrimary) ? currency(0) : totalPrimary
  data["sola.father.total"] = isNegative(totalSecondary) ? currency(0) : totalSecondary

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
  const mileageCost = multiply(globalMileageRate, distance)

  // 4. Parent’s annual cost of transportation by means other than automobile
  const annualCost = getValueAsNumber(standardOfLiving, ["transportation", "othercost"])

  // 5. Parent’s total cost (line 3 plus line 4)
  const totalCost = add(mileageCost, annualCost)

  // 6. Standard expense (from Table 3)
  const globalStandardExpense = getStandardExpense()

  // 7. LONG DISTANCE PARENTING ADJUSTMENT (Line 5 minus line 6; if less than zero, enter zero. Enter this amount on line 18a, worksheet A)
  const longDistanceParentingAdjustment = subtract(totalCost, globalStandardExpense)
  return isNegative(longDistanceParentingAdjustment) ? currency(0) : longDistanceParentingAdjustment
}

// WORKSHEET E: STANDARD OF LIVING ADJUSTMENT (SOLA)
const calcStandardOfLivingAdjustment = (numChildren, adjustedIncome) => {
  const solaFactors = [0.14, 0.21, 0.27, 0.31, 0.35, 0.39, 0.43, 0.47]
  if (numChildren > 0 && numChildren <= solaFactors.length) {
    return multiply(adjustedIncome, solaFactors[numChildren - 1])
  } else if (numChildren > solaFactors.length) {
    return multiply(adjustedIncome, solaFactors[solaFactors.length - 1])
  } else {
    return currency(0)
  }
}

const calcOther = (form, key) => {
  const others = getValue(form, key, {})
  if (others === "no") return currency(0)
  return Object.values(others).reduce((total, other) => {
    return add(total, getValueAsNumber(other, ["amt"]))
  }, currency(0))
}

const mapToAddendumOther = (form, key) => {
  return getValueAsArray(form, key)
    .map(other => `${getValue(other, ["desc"], "")} -- ${format(getValueAsNumber(other, ["amt"]), 'currency')}`)
}

module.exports = { calcSola }