const { getValueAsNumber, getValue, getValueAsArray } = require('../utils/helpers')
const { getAllowanceOtherChildren } = require('../utils/support-tables')
const { currency, format, add, subtract, multiply, sum } = require('../utils/currency')

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
  primary["allowable.mother.alimony"] = multiply(
    getValueAsNumber(form, ["AllowableDeductions", "alimony", "amount"]),
    getValueAsNumber(form, ["AllowableDeductions", "alimony", "schedule"])
  )

  secondary["allowable.father.alimony"] = multiply(
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "alimony", "amount"]),
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "alimony", "schedule"])
  )

  // 2D Ordered health ins other children
  primary["allowable.mother.insurance"] = multiply(
    getValueAsNumber(form, ["AllowableDeductions", "healthchildren", "amount"]),
    getValueAsNumber(form, ["AllowableDeductions", "healthchildren", "schedule"])
  )

  secondary["allowable.father.insurance"] = multiply(
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "healthchildren", "amount"]),
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "healthchildren", "schedule"])
  )

  //2E Federal income tax
  primary["allowable.mother.federal"] = multiply(
    getValueAsNumber(form, ["AllowableDeductions", "federal", "amount"]),
    getValueAsNumber(form, ["AllowableDeductions", "federal", "schedule"])
  )

  secondary["allowable.father.federal"] = multiply(
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "federal", "amount"]),
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "federal", "schedule"])
  )

  //2F State income tax
  primary["allowable.mother.state"] = multiply(
    getValueAsNumber(form, ["AllowableDeductions", "state", "amount"]),
    getValueAsNumber(form, ["AllowableDeductions", "state", "schedule"])
  )

  secondary["allowable.father.state"] = multiply(
  getValueAsNumber(form, ["AllowableDeductionsSecondary", "state", "amount"]),
    getValueAsNumber(form, ["AllowableDeductionsSecondary", "state", "schedule"])
    )

//2G Social Security (FICA plus Medicare)
primary["allowable.mother.social"] = multiply(
  getValueAsNumber(form, ["AllowableDeductions", "ssn", "amount"]),
  getValueAsNumber(form, ["AllowableDeductions", "ssn", "schedule"])
)

secondary["allowable.father.social"] = multiply(
  getValueAsNumber(form, ["AllowableDeductionsSecondary", "ssn", "amount"]),
  getValueAsNumber(form, ["AllowableDeductionsSecondary", "ssn", "schedule"])
)

//2H Mandatory retirement contributions
primary["allowable.mother.mandatory"] = multiply(
  getValueAsNumber(form, ["AllowableDeductions", "retirement", "amount"]),
  getValueAsNumber(form, ["AllowableDeductions", "retirement", "schedule"])
)

secondary["allowable.father.mandatory"] = multiply(
  getValueAsNumber(form, ["AllowableDeductionsSecondary", "retirement", "amount"]),
  getValueAsNumber(form, ["AllowableDeductionsSecondary", "retirement", "schedule"])
)

//2I Required employment expense 
primary["allowable.mother.required"] = multiply(
  getValueAsNumber(form, ["AllowableDeductions", "reqemp", "amount"]),
  getValueAsNumber(form, ["AllowableDeductions", "reqemp", "schedule"])
)

secondary["allowable.father.required"] = multiply(
  getValueAsNumber(form, ["AllowableDeductionsSecondary", "reqemp", "amount"]),
  getValueAsNumber(form, ["AllowableDeductionsSecondary", "reqemp", "schedule"])
)

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
  `Total -- ${format(primary["allowable.mother.other"])}`
], [
  `${initiate["initiate.father.name"]}, Other allowable deductions, continued from 2k`,
  ...mapToAddendumOther(form, "OtherAllowableDeductionsSecondary"),
  `Total -- ${format(secondary["allowable.father.other"])}`
])

if (primary["allowable.mother.other"] || secondary["allowable.father.other"]) {
  data["allowable.otherSpecify"] = "See Worksheet A Addendum"
}

//2L TOTAL ALLOWABLE DEDUCTIONS (Add 2a through 2k) 
primary["allowable.mother.total"] = sum(Object.values(primary))
secondary["allowable.father.total"] = sum(Object.values(secondary))

// Line 3 INCOME AFTER DEDUCTIONS
primary["allowable.mother.income"] = subtract(income["income.mother.total"], primary["allowable.mother.total"])
secondary["allowable.father.income"] = subtract(income["income.father.total"], secondary["allowable.father.total"])

// Callout
data["allowable.mother.incomeCallout"] = primary["allowable.mother.income"]
data["allowable.father.incomeCallout"] = secondary["allowable.father.income"]

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
      return add(total, multiply(getValueAsNumber(child, ["childSupportAmount"]), 12))
    }
    return total
  }, currency())
}

const countChildren = (form, key) => {
  return getValueAsArray(form, key).filter((child) => {
    return child.housing === "me" && child.support === "no"
  }).length
}

const calcDependentCareExpense = (form, key) => {
  return getValueAsArray(form, key).reduce((total, child) => {
    if (child.depcare === "yes" && child.depcareAmount) {
      return add(total, getValueAsNumber(child, ["depcareAmount"]))
    }
    return total
  }, currency())
}

const calcOther = (form, key) => {
  return getValueAsArray(form, key).reduce((total, other) => {
    return add(total, getValueAsNumber(other, ["amount"]))
  }, currency())
}

const mapToAddendumOther = (form, key) => {
  return getValueAsArray(form, key)
    .map(other => `${getValue(other, ["description"], "")} -- ${format(getValueAsNumber(other, ["amount"]))}`)
}

module.exports = { calcAllowableDeductions }
