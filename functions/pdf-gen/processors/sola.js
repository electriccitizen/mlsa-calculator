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
  // 14 if line 6 (ppa.mother.line6) > line 5 (ppa.mother.income) skip to line 21 and enter amount from line 6

  // TODO double check
  parseInt(percentages["ppa.mother.line6"]) <
  parseInt(percentages["ppa.mother.income"])
    ? (data["mother.share"] = (
        money(percentages["ppa.totalPrimaryAllowance"]) *
        (percentages["ppa.mother.share"] / 100)
      ).toFixed(2))
    : console.log("m goto 21")

  parseInt(percentages["ppa.father.line6"]) <
  parseInt(percentages["ppa.father.income"])
    ? (data["father.share"] = (
        money(percentages["ppa.totalPrimaryAllowance"]) *
        (percentages["ppa.father.share"] / 100)
      ).toFixed(2))
    : console.log("f goto 21")

  //16
  data["mother.shareLower"] = Math.min(
    money(percentages["ppa.mother.income"]),
    data["mother.share"]
  )
  data["father.shareLower"] = Math.min(
    money(percentages["ppa.father.income"]),
    data["father.share"]
  )

  //17
  data["mother.Sola"] =
    money(percentages["ppa.mother.income"]) - data["mother.shareLower"]
  data["father.Sola"] =
    money(percentages["ppa.father.income"]) - data["father.shareLower"]

  //18A TODO long distance parent worksheet D
  let primaryDist = form.StandardOfLiving.mileage.distance
  let secondaryDist = form.StandardOfLivingSecondary.mileage.distance
  
  // From Table 3
  const globalMileageRate = 0.575
  const globalStandardExpense = 1150

  let primaryCost = primaryDist * globalMileageRate
  let secondaryCost = secondaryDist * globalMileageRate

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
  console.log(a - globalStandardExpense)
  console.log(b - globalStandardExpense)

  //

  //18B TODO other

  //19 Adjusted income TODO line17-(18a+18b)

  //20 Sola TODO Worksheet E

  //21 TODO line 16+l20

  return data
}

module.exports = { calcSola }
