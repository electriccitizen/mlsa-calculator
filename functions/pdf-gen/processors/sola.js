const money = number => {
  var regex = /[.,\s]/g
  return Number.parseFloat(number.replace(regex, "")).toFixed(2)
}

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

const calcSola = (form, percentages) => {
  
  // Total
  let data = []
  let primary
  let secondary
  let totalPrimary = []
  let totalSecondary = []
  
  // 14 For each parent, if line 6 > line 5, skip to line 21 and enter line 6 amount. If line 6 < line 5, go to line 15
  // skip to line 21 and enter amount from line 6

  // 15 Parent’s share of total (for each column, line 13 x line 9)
  // @TODO verify this logic, and jump to line 21 per rules in line 14
  parseInt(percentages["ppa.mother.line6"]) <
  parseInt(percentages["ppa.mother.income"])
    ? (data["mother.share"] = (
        money(percentages["ppa.totalPrimaryAllowance"]) *
        (percentages["ppa.mother.share"] / 100)
      ).toFixed(2))
    : console.log("jump to line 21")

  parseInt(percentages["ppa.father.line6"]) <
  parseInt(percentages["ppa.father.income"])
    ? (data["father.share"] = (
        money(percentages["ppa.totalPrimaryAllowance"]) *
        (percentages["ppa.father.share"] / 100)
      ).toFixed(2))
    : console.log("jump to line goto 21")

  //16 Compare line 15 to line 5; enter lower amount here
  data["mother.shareLower"] = Math.min(
    money(percentages["ppa.mother.income"]),
    data["mother.share"]
  )
  data["father.shareLower"] = Math.min(
    money(percentages["ppa.father.income"]),
    data["father.share"]
  )

  //17 Income available for SOLA (line 5 minus line 16; if zero, enter zero and skip to line 21)
  // @TODO add logic for jumping to line 21 if zero
  data["mother.Sola"] =
    (money(percentages["ppa.mother.income"]) - data["mother.shareLower"]).toFixed(2)
  data["father.Sola"] =
    (money(percentages["ppa.father.income"]) - data["father.shareLower"]).toFixed(2)

  
  //18A @TODO Long distance parenting adjustment (Worksheet D)
  let primaryDist = form.StandardOfLiving.mileage.distance
  let secondaryDist = form.StandardOfLivingSecondary.mileage.distance
  
  // From Table3 @TODO need to go into json config, changes yearly
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

  // @TODO 21 Add line 16 and line 20

  // @TODO 22 Gross Annual Child Support (for each parent, compare line 21 to line 6; enter the higher amount)

  // @TODO 23 Credit for payment of expenses (enter amount of line 12 expenses paid by each parent)  
  
  // @TODO 24 Total Annual Child Support (line 22 minus line 23; if less than zero, enter zero) 24 PA
  
  return data
}

module.exports = { calcSola }
