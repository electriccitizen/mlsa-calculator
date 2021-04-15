const { convertToNumber } = require('../helpers')

const calcAllowableDeductions = (form, income) => {
  // Totals
  let data = []
  let primary
  let secondary
  let totalPrimary = []
  let totalSecondary = []

  // 2A Ordered child support for other children
  let primaryOtherChildrenSupport = []
  if (form.OtherChildren) {
    Object.values(form.OtherChildren).forEach((child) => {
      if (child.support === "yes" && child.childSupportAmount) {
        primaryOtherChildrenSupport.push(parseInt(child.childSupportAmount) * 12)
      }
    })
  }

  let secondaryOtherChildrenSupport = []
  if (form.OtherChildrenSecondary) {
    Object.values(form.OtherChildrenSecondary).forEach((child) => {
      if (child.support === "yes" && child.childSupportAmount) {
        secondaryOtherChildrenSupport.push(parseInt(child.childSupportAmount) * 12)
      }
    })
  }
  data["allowable.mother.childsupport"] = primaryOtherChildrenSupport.reduce((a, b) => a + b, 0)
  data["allowable.father.childsupport"] = secondaryOtherChildrenSupport.reduce((a, b) => a + b, 0)

  // 2B  Allowance for other children from Table 2 -- @TODO need to write logic based on TABLE 2 (see doc link on project site)

  // 2C Ordered alimony/spousal support
  if (form.AllowableDeductions.alimony) {
    const alimonyPrimary = convertToNumber(form.AllowableDeductions.alimony.amount) *
      convertToNumber(form.AllowableDeductions.alimony.schedule)
    data["allowable.mother.alimony"] = alimonyPrimary
    totalPrimary.push(alimonyPrimary)
  }

  if (form.AllowableDeductionsSecondary.alimony) {
    const alimonySecondary = convertToNumber(form.AllowableDeductionsSecondary.alimony.amount) *
      convertToNumber(form.AllowableDeductionsSecondary.alimony.schedule)
    data["allowable.father.alimony"] = alimonySecondary
    totalSecondary.push(alimonySecondary)
  }

  // 2D Ordered health ins other children
  if (form.AllowableDeductions.healthchildren) {
    primary =
      convertToNumber(form.AllowableDeductions.healthchildren.amount) *
      convertToNumber(form.AllowableDeductions.healthchildren.schedule)
    data["allowable.mother.insurance"] = primary
    totalPrimary.push(primary)
  }
  if (form.AllowableDeductionsSecondary.healthchildren) {
    secondary =
      convertToNumber(form.AllowableDeductionsSecondary.healthchildren.amount) *
      convertToNumber(form.AllowableDeductionsSecondary.healthchildren.schedule)
    data["allowable.father.insurance"] = secondary
    totalSecondary.push(secondary)
  }

  //2E Federal income tax
  if (form.AllowableDeductions.federal) {
    primary =
      convertToNumber(form.AllowableDeductions.federal.amount) *
      convertToNumber(form.AllowableDeductions.federal.schedule)
    data["allowable.mother.federal"] = primary
    totalPrimary.push(primary)
  }
  if (form.AllowableDeductionsSecondary.federal) {
    secondary =
      convertToNumber(form.AllowableDeductionsSecondary.federal.amount) *
      convertToNumber(form.AllowableDeductionsSecondary.federal.schedule)
    data["allowable.father.federal"] = secondary
    totalSecondary.push(secondary)
  }

  //2F State income tax
  if (form.AllowableDeductions.state) {
    primary =
      convertToNumber(form.AllowableDeductions.state.amount) *
      convertToNumber(form.AllowableDeductions.state.schedule)
    data["allowable.mother.state"] = primary
    totalPrimary.push(primary)
  }
  if (form.AllowableDeductionsSecondary.state) {
    secondary =
      convertToNumber(form.AllowableDeductionsSecondary.state.amount) *
      convertToNumber(form.AllowableDeductionsSecondary.state.schedule)
    data["allowable.father.state"] = secondary
    totalSecondary.push(secondary)
  }

  //2G Social Security (FICA plus Medicare)
  if (form.AllowableDeductions.ssn) {
    primary =
      convertToNumber(form.AllowableDeductions.ssn.amount) *
      convertToNumber(form.AllowableDeductions.ssn.schedule)
    data["allowable.mother.social"] = primary
    totalPrimary.push(primary)
  }
  if (form.AllowableDeductionsSecondary.ssn) {
    secondary =
      convertToNumber(form.AllowableDeductionsSecondary.ssn.amount) *
      convertToNumber(form.AllowableDeductionsSecondary.ssn.schedule)
    data["allowable.father.social"] = secondary
    totalSecondary.push(secondary)
  }

  //2H Mandatory retirement contributions
  if (form.AllowableDeductions.retirement) {
    primary =
      convertToNumber(form.AllowableDeductions.retirement.amount) *
      convertToNumber(form.AllowableDeductions.retirement.schedule)
    data["allowable.mother.mandatory"] = primary
    totalPrimary.push(primary)
  }
  if (form.AllowableDeductionsSecondary.retirement) {
    secondary =
      convertToNumber(form.AllowableDeductionsSecondary.retirement.amount) *
      convertToNumber(form.AllowableDeductionsSecondary.retirement.schedule)
    data["allowable.father.mandatory"] = secondary
    totalSecondary.push(secondary)
  }

  //2I Required employment expense 
  if (form.AllowableDeductions.reqemp) {
    primary =
      convertToNumber(form.AllowableDeductions.reqemp.amount) *
      convertToNumber(form.AllowableDeductions.reqemp.schedule)
    data["allowable.mother.required"] = primary
    totalPrimary.push(primary)
  }
  if (form.AllowableDeductionsSecondary.reqemp) {
    secondary =
      convertToNumber(form.AllowableDeductionsSecondary.reqemp.amount) *
      convertToNumber(form.AllowableDeductionsSecondary.reqemp.schedule)
    data["allowable.father.required"] = secondary
    totalSecondary.push(secondary)
  }

  //2J Dependent care expense for other children, less dependent care tax credit
  let primaryOtherChildrenDependent = []
  if (form.OtherChildren) {
    Object.values(form.OtherChildren).forEach((child) => {
      if (child.depcare === "yes") {
        primaryOtherChildrenDependent.push(parseInt(child.depcareAmount))
      }
    })
  }

  let secondaryOtherChildrenDependent = []
  if (form.OtherChildrenSecondary) {
    Object.values(form.OtherChildrenSecondary).forEach((child) => {
      if (child.depcare === "yes") {
        secondaryOtherChildrenDependent.push(parseInt(child.depcareAmount))
      }
    })
  }
  data["allowable.mother.dependentcare"] = primaryOtherChildrenDependent.reduce((a, b) => a + b, 0)
  data["allowable.father.dependent"] = secondaryOtherChildrenDependent.reduce((a, b) => a + b, 0)

  //2K Other (specify):___ @TODO add to attachment
  if (form.AllowableDeductions.other) {
    data["allowable.mother.other"] = calcOther(form, "OtherAllowableDeductions")
  }

  if (form.AllowableDeductionsSecondary.other) {
    data["allowable.father.other"] = calcOther(form, "OtherAllowableDeductionsSecondary")
  }

  if (data["allowable.mother.other"] || data["allowable.father.other"]) {
    data["allowable.mother.other-specify"] = "See Worksheet A Addendum"
  }

  //2L TOTAL ALLOWABLE DEDUCTIONS (Add 2a through 2k) 
  data["allowable.mother.total"] = totalPrimary.reduce((a, b) => a + b, 0)
  data["allowable.father.total"] = totalSecondary.reduce((a, b) => a + b, 0)

  // Line 3 INCOME AFTER DEDUCTIONS
  data["allowable.mother.income"] = income["income.mother.total"] - data["allowable.mother.total"]
  data["allowable.father.income"] = income["income.father.total"] - data["allowable.father.total"]
  data["allowable.mother.income-callout"] = income["income.mother.total"] - data["allowable.mother.total"]
  data["allowable.father.income-callout"] = income["income.father.total"] - data["allowable.father.total"]

  return data
}

const calcOther = (form, key) => {
  return Object.values(form[key]).reduce((total, income) => {
    return total + convertToNumber(income.amount)
  }, 0)
}

module.exports = { calcAllowableDeductions }
