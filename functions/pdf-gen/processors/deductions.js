const format = number => {
  return Number(number).toLocaleString()
}

const calcAllowableDeductions = (form) => {
  // Totals
  let data = []
  let primary
  let secondary
  let totalPrimary = []
  let totalSecondary = []

  // 2A Ordered child support for other children -- @TODO this applies to "other" children of the primary applicant
  // 2B  Allowance for other children from Table 2 -- @TODO need to write logic based on TABLE 2 (see doc link on project site)

  // 2C Ordered alimony/spousal support
  if (form.AllowableDeductions.alimony) {
    const alimonyPrimary = form.AllowableDeductions.alimony.amount *
      form.AllowableDeductions.alimony.schedule
      data["allowable.mother.alimony"] = format(alimonyPrimary)
      totalPrimary.push(parseInt(alimonyPrimary))
  }

  if (form.AllowableDeductionsSecondary.alimony) {
    const alimonySecondary = form.AllowableDeductionsSecondary.alimony.amount *
    form.AllowableDeductionsSecondary.alimony.schedule
    data["allowable.father.alimony"] = format(alimonySecondary)
    totalSecondary.push(parseInt(alimonySecondary))
  }

  // 2D Ordered health ins other children
  if (form.AllowableDeductions.healthchildren) {
    primary =
      form.AllowableDeductions.healthchildren.amount *
      form.AllowableDeductions.healthchildren.schedule
    data["allowable.mother.insurance"] = format(primary)
    totalPrimary.push(parseInt(primary))
  }
  if (form.AllowableDeductionsSecondary.healthchildren) {
    secondary =
      form.AllowableDeductionsSecondary.healthchildren.amount *
      form.AllowableDeductionsSecondary.healthchildren.schedule
    data["allowable.father.insurance"] = format(secondary)
    totalSecondary.push(parseInt(secondary))
  }

  //2E Federal income tax
  if (form.AllowableDeductions.federal) {
    primary =
      form.AllowableDeductions.federal.amount *
      form.AllowableDeductions.federal.schedule
    data["allowable.mother.federal"] = format(primary)
    totalPrimary.push(parseInt(primary))
  }
  if (form.AllowableDeductionsSecondary.federal) {
    secondary =
      form.AllowableDeductionsSecondary.federal.amount *
      form.AllowableDeductionsSecondary.federal.schedule
    data["allowable.father.federal"] = format(secondary)
    totalSecondary.push(parseInt(secondary))
  }

  //2F State income tax
  if (form.AllowableDeductions.state) {
    primary =
      form.AllowableDeductions.state.amount *
      form.AllowableDeductions.state.schedule
    data["allowable.mother.state"] = format(primary)
    totalPrimary.push(parseInt(primary))
  }
  if (form.AllowableDeductionsSecondary.state) {
    secondary =
      form.AllowableDeductionsSecondary.state.amount *
      form.AllowableDeductionsSecondary.state.schedule
    data["allowable.father.state"] = format(secondary)
    totalSecondary.push(parseInt(secondary))
  }

  //2G Social Security (FICA plus Medicare)
  if (form.AllowableDeductions.ssn) {
    primary =
      form.AllowableDeductions.ssn.amount *
      form.AllowableDeductions.ssn.schedule
    data["allowable.mother.social"] = format(primary)
    totalPrimary.push(parseInt(primary))
  }
  if (form.AllowableDeductionsSecondary.ssn) {
    secondary =
      form.AllowableDeductionsSecondary.ssn.amount *
      form.AllowableDeductionsSecondary.ssn.schedule
    data["allowable.father.social"] = format(secondary)
    totalSecondary.push(parseInt(secondary))
  }

  //2H Mandatory retirement contributions
  if (form.AllowableDeductions.retirement) {
    primary =
      form.AllowableDeductions.retirement.amount *
      form.AllowableDeductions.retirement.schedule
    data["allowable.mother.mandatory"] = format(primary)
    totalPrimary.push(parseInt(primary))
  }
  if (form.AllowableDeductionsSecondary.retirement) {
    secondary =
      form.AllowableDeductionsSecondary.retirement.amount *
      form.AllowableDeductionsSecondary.retirement.schedule
    data["allowable.father.mandatory"] = format(secondary)
    totalSecondary.push(parseInt(secondary))
  }

  //2I Required employment expense 
  if (form.AllowableDeductions.reqemp) {
    primary =
      form.AllowableDeductions.reqemp.amount *
      form.AllowableDeductions.reqemp.schedule
    data["allowable.mother.required"] = format(primary)
    totalPrimary.push(parseInt(primary))
  }
  if (form.AllowableDeductionsSecondary.reqemp) {
    secondary =
      form.AllowableDeductionsSecondary.reqemp.amount *
      form.AllowableDeductionsSecondary.reqemp.schedule
    data["allowable.father.required"] = format(secondary)
    totalSecondary.push(parseInt(secondary))
  }

  //2J Dependent care expense for other children, less -- @TODO still need to read/decipher instructions for this field
  //2K Other (specify):___ @TODO Sum, plus add to attachment

  //2L TOTAL ALLOWABLE DEDUCTIONS (Add 2a through 2k) 
  data["allowable.mother.total"] = format(
    totalPrimary.reduce((a, b) => a + b, 0)
  )
  data["allowable.father.total"] = format(
    totalSecondary.reduce((a, b) => a + b, 0)
  )
  return data
}

module.exports = { calcAllowableDeductions }
