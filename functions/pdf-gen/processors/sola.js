const calcSola = (form, percentages) => {

  // Total
  let data = []
  let primary
  let secondary
  let totalPrimary = []
  let totalSecondary = []

  // 14 For each parent, if line 6 > line 5, skip to line 21 and enter line 6 amount. If line 6 < line 5, go to line 15
  // skip to line 21 and enter amount from line 6
  // @TODO verify this logic, and jump to line 21 per rules in line 14
  if (percentages["ppa.mother.line6"] < percentages["ppa.mother.income"]) {

    // 15 Parent’s share of total (for each column, line 13 x line 9)
    data["mother.share"] =
      percentages["ppa.totalPrimaryAllowance"] *
      (percentages["ppa.mother.share"] / 100)


    //16 Compare line 15 to line 5; enter lower amount here
    data["mother.shareLower"] = Math.min(
      percentages["ppa.mother.income"],
      data["mother.share"]
    )

    //17 Income available for SOLA (line 5 minus line 16; if zero, enter zero and skip to line 21)
    // @TODO add logic for jumping to line 21 if zero
    data["mother.Sola"] =
      percentages["ppa.mother.income"] - data["mother.shareLower"]
    if (data["mother.Sola"] !== 0) {
      //@TODO add calc from line 18 to line 21
      //21 Add line 16 and line 20
      data["sola.mother.line21"] = data["mother.shareLower"]
    } else {
      //21 Add line 16 and line 20
      data["sola.mother.line21"] = data["mother.shareLower"]
    }
  } else {
    data["sola.mother.line21"] = percentages["ppa.mother.line6"]
  }

  //22 Gross Annual Child Support (for each parent, compare line 21 to line 6; enter the higher amount)
  data["sola.mother.gross"] = Math.max(
    percentages["ppa.mother.line6"],
    data["sola.mother.line21"]
  )

  if (percentages["ppa.father.line6"] < percentages["ppa.father.income"]) {

    // 15 Parent’s share of total (for each column, line 13 x line 9)
    data["father.share"] =
      percentages["ppa.totalPrimaryAllowance"] *
      (percentages["ppa.father.share"] / 100)


    //16 Compare line 15 to line 5; enter lower amount here
    data["father.shareLower"] = Math.min(
      percentages["ppa.father.income"],
      data["father.share"]
    )

    //17 Income available for SOLA (line 5 minus line 16; if zero, enter zero and skip to line 21)
    // @TODO add logic for jumping to line 21 if zero
    data["father.Sola"] =
      percentages["ppa.father.income"] - data["father.shareLower"]

    if (data["father.Sola"] !== 0) {
      //@TODO add calc from line 18 to line 21
      //21 Add line 16 and line 20
      data["sola.father.line21"] = data["father.shareLower"]
    } else {
      //21 Add line 16 and line 20
      data["sola.father.line21"] = data["father.shareLower"]
    }
  } else {
    data["sola.father.line21"] = percentages["ppa.father.line6"]
  }

  //22 Gross Annual Child Support (for each parent, compare line 21 to line 6; enter the higher amount)
  data["sola.father.gross"] = Math.max(
    percentages["ppa.father.line6"],
    data["sola.father.line21"]
  )

  //18A @TODO Long distance parenting adjustment (Worksheet D)

  // WORKSHEET D: LONG DISTANCE PARENTING ADJUSTMENT
  //1. Annual mileage actually driven by the parent to exercise long-distance parenting
  let primaryDist = form.StandardOfLiving.mileage.distance
  let secondaryDist = form.StandardOfLivingSecondary.mileage.distance

  // From Table3 @TODO need to go into json config, changes yearly
  // 2. Current IRS business mileage rate (from Table 3)
  const globalMileageRate = 0.575
  const globalStandardExpense = 1150

  let primaryCost = primaryDist * globalMileageRate
  let secondaryCost = secondaryDist * globalMileageRate

  // @TODO 18B Other (specify) -- add to attachment as needed 
  let primaryCostOther = form.StandardOfLiving.other
  let secondaryCostOther = form.StandardOfLivingSecondary.other

  let primaryCostOtherTotal = []
  Object.entries(primaryCostOther).forEach(([index, value]) => {
    primaryCostOtherTotal.push(parseInt(value.amt))
  })
  let secondaryCostOtherTotal = []
  Object.entries(secondaryCostOther).forEach(([index, value]) => {
    secondaryCostOtherTotal.push(parseInt(value.amt))
  })

  let totalPrimaryOther = primaryCostOtherTotal.reduce((a, b) => a + b, 0)
  let totalSecondaryOther = primaryCostOtherTotal.reduce((a, b) => a + b, 0)

  let a = primaryCost + totalPrimaryOther
  let b = secondaryCost + totalSecondaryOther
  // console.log(a - globalStandardExpense)
  // console.log(b - globalStandardExpense)

  // @TODO 19 Adjusted income TODO line17-(18a+18b)

  // @TODO 20 SOLA amount (Worksheet E)
  // numChildren * line 19 * sola factor global

  // @TODO 21 Add line 16 and line 20

  // @TODO 23 Credit for payment of expenses (enter amount of line 12 expenses paid by each parent)
  //expenses for each parent computed from 12e :(  

  // @TODO 24 Total Annual Child Support (line 22 minus line 23; if less than zero, enter zero) 24 PA

  return data
}

module.exports = { calcSola }
