const format = number => {
  return Number(number).toLocaleString()
}

const calcAllowableDeductions = form => {
  // Total
  let data = []
  let primary
  let secondary
  let totalPrimary = []
  let totalSecondary = []

  // 2a and 2b -- only apply to "other" children" TODO

  // 2c
  const alimonyPrimary =
    form.AllowableDeductions.alimony.amount *
    form.AllowableDeductions.alimony.schedule
  data["allowable.mother.alimony"] = format(alimonyPrimary)
  totalPrimary.push(parseInt(alimonyPrimary))

  const alimonySecondary =
    form.AllowableDeductionsSecondary.alimony.amount *
    form.AllowableDeductionsSecondary.alimony.schedule
  data["allowable.father.alimony"] = format(alimonySecondary)
  totalSecondary.push(parseInt(alimonySecondary))

  // 2d Ordered health ins other children
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

  //2e federal tax
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

  //2f state tax
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

  //2g SS plus Medicare
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

  //2h Mandatory retirement
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

  //2i Require emp expense
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

  //2j TODO ***???
  // Dependent care for other children, less dep. care tax credit

  // 2k Other TODO ****

  // TOTAL WAGES
  data["allowable.mother.total"] = format(
    totalPrimary.reduce((a, b) => a + b, 0)
  )
  data["allowable.father.total"] = format(
    totalSecondary.reduce((a, b) => a + b, 0)
  )
  data["allowable.mother.total-callout"] = data["allowable.mother.total"]
  data["allowable.father.total-callout"] = data["allowable.father.total"]

  return data
}

module.exports = { calcAllowableDeductions }
