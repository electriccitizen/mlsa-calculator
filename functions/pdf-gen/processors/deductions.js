const { getValueAsNumber, getValue, getValueAsMoney, getValueAsArray, numberFormatToMoney, calcTotal } = require('../utils/helpers')
const { getAllowanceOtherChildren } = require('../utils/support-tables')

const calcAllowableDeductions = (form, initiate, income) => {

  // Main
  let data = {}
  // Totals
  let primary = {}
  let secondary = {}
  // Addendum
  let addendum = []

  // 2A Ordered child support for other children
  primary["allowable.mother.childsupport"] =
    calcOrderedChildSupport(form, "OtherChildren")
  secondary["allowable.father.childsupport"] =
    calcOrderedChildSupport(form, "OtherChildrenSecondary")

  // 2B  Allowance for other children from Table 2
  primary["allowable.mother.allowanceOtherChildren"] =
    getAllowanceOtherChildren(countChildren(form, "OtherChildren"))
  secondary["allowable.father.allowanceOtherChildren"] =
    getAllowanceOtherChildren(countChildren(form, "OtherChildrenSecondary"))

  // 2C Ordered alimony/spousal support
  primary["allowable.mother.alimony"] =
    getValueAsNumber(form, ["AllowableDeductions", "alimony", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductions", "alimony", "schedule"])

  secondary["allowable.father.alimony"] =
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "alimony", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "alimony", "schedule"])

  // 2D Ordered health ins other children
  primary["allowable.mother.insurance"] =
    getValueAsNumber(form, ["AllowableDeductions", "healthchildren", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductions", "healthchildren", "schedule"])

  secondary["allowable.father.insurance"] =
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "healthchildren", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "healthchildren", "schedule"])

  //2E Federal income tax
  primary["allowable.mother.federal"] =
    getValueAsNumber(form, ["AllowableDeductions", "federal", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductions", "federal", "schedule"])

  secondary["allowable.father.federal"] =
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "federal", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "federal", "schedule"])

  //2F State income tax
  primary["allowable.mother.state"] =
    getValueAsNumber(form, ["AllowableDeductions", "state", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductions", "state", "schedule"])

  secondary["allowable.father.state"] =
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "state", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "state", "schedule"])

  //2G Social Security (FICA plus Medicare)
  primary["allowable.mother.social"] =
    getValueAsNumber(form, ["AllowableDeductions", "ssn", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductions", "ssn", "schedule"])

  secondary["allowable.father.social"] =
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "ssn", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "ssn", "schedule"])

  //2H Mandatory retirement contributions
  primary["allowable.mother.mandatory"] =
    getValueAsNumber(form, ["AllowableDeductions", "retirement", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductions", "retirement", "schedule"])

  secondary["allowable.father.mandatory"] =
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "retirement", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "retirement", "schedule"])

  //2I Required employment expense 
  primary["allowable.mother.required"] =
    getValueAsNumber(form, ["AllowableDeductions", "reqemp", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductions", "reqemp", "schedule"])

  secondary["allowable.father.required"] =
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "reqemp", "amount"]) *
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "reqemp", "schedule"])

  //2J Dependent care expense for other children, less dependent care tax credit
  primary["allowable.mother.dependentcare"] =
    calcDependentCareExpense(form, "OtherChildren")
  secondary["allowable.father.dependentcare"] =
    calcDependentCareExpense(form, "OtherChildrenSecondary")

  //2K Other (specify):___
  primary["allowable.mother.other"] =
    calcOther(form, "OtherAllowableDeductions")
  secondary["allowable.father.other"] =
    calcOther(form, "OtherAllowableDeductionsSecondary")

  addendum.push([
    `${initiate["initiate.mother.name"]}, Other allowable deductions, continued from 2k`,
    ...mapToAddendumOther(form, "OtherAllowableDeductions"),
    `Total -- ${numberFormatToMoney(primary["allowable.mother.other"])}`
  ], [
    `${initiate["initiate.father.name"]}, Other allowable deductions, continued from 2k`,
    ...mapToAddendumOther(form, "OtherAllowableDeductionsSecondary"),
    `Total -- ${numberFormatToMoney(secondary["allowable.father.other"])}`
  ])

  if (primary["allowable.mother.other"] || secondary["allowable.father.other"]) {
    data["allowable.otherSpecify"] = "See Worksheet A Addendum"
  }

  //2L TOTAL ALLOWABLE DEDUCTIONS (Add 2a through 2k) 
  primary["allowable.mother.total"] = calcTotal(Object.values(primary))
  secondary["allowable.father.total"] = calcTotal(Object.values(secondary))

  // Line 3 INCOME AFTER DEDUCTIONS
  primary["allowable.mother.income"] = income["income.mother.total"] - primary["allowable.mother.total"]
  secondary["allowable.father.income"] = income["income.father.total"] - secondary["allowable.father.total"]

  // Callout
  data["allowable.mother.incomeCallout"] = income["income.mother.total"] - primary["allowable.mother.total"]
  data["allowable.father.incomeCallout"] = income["income.father.total"] - secondary["allowable.father.total"]

  return {
    data: {
      ...data,
      ...primary,
      ...secondary
    },
    addendum
  }
}

// Helpers
const calcOrderedChildSupport = (form, key) => {
  return getValueAsArray(form, key).reduce((total, child) => {
    if (child.support === "yes" && child.childSupportAmount) {
      return total + (getValueAsNumber(child, ["childSupportAmount"]) * 12)
    }
    return total
  }, 0)
}

const countChildren = (form, key) => {
  return getValueAsArray(form, key).filter((child) => {
    return child.housing === "me" && child.support === "no"
  }).length
}

const calcDependentCareExpense = (form, key) => {
  return getValueAsArray(form, key).reduce((total, child) => {
    if (child.depcare === "yes" && child.depcareAmount) {
      return total + getValueAsNumber(child, ["depcareAmount"])
    }
    return total
  }, 0)
}

const calcOther = (form, key) => {
  return getValueAsArray(form, key).reduce((total, other) => {
    return total + getValueAsNumber(other, ["amount"])
  }, 0)
}

const mapToAddendumOther = (form, key) => {
  return getValueAsArray(form, key)
    .map(other => `${getValue(other, ["description"], "")} -- ${getValueAsMoney(other, ["amount"])}`)
}

module.exports = { calcAllowableDeductions }
