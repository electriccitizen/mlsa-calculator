var moment = require("moment")
const format = number => {
  return Number(number).toLocaleString()
}
const calcIncome = form => {
  // Total
  let data = []
  let totalPrimary = []
  let totalSecondary = []

  // Wages
  // TODO other jobs for both parents
  const primaryWages = calcWages(form, "EmploymentPrimary")
  data["income.mother.wages"] = Number(primaryWages).toLocaleString()
  totalPrimary.push(primaryWages)

  const secondaryWages = calcWages(form, "EmploymentSecondary")
  data["income.father.wages"] = Number(secondaryWages).toLocaleString()
  totalSecondary.push(secondaryWages)
  //console.log(totalSecondary)

  // SEP
  if (form.OtherIncome.SepEarning) {
    const primarySep =
    form.OtherIncome.SepEarning.net * form.OtherIncome.SepEarning.schedule
    data["income.mother.sep"] = format(primarySep)
    totalPrimary.push(parseInt(primarySep))
  }

  if (form.OtherIncomeSecondary.SepEarning) {
  const secondarySep =
    form.OtherIncomeSecondary.SepEarning.net *
      form.OtherIncomeSecondary.SepEarning.schedule
      data["income.father.sep"] = format(secondarySep)
      totalSecondary.push(parseInt(secondarySep))
  }
  
  // SSN
  if (form.OtherIncome.SSN) {
    const primarySsn = form.OtherIncome.SSN
    data["income.mother.ssn"] = format(primarySsn)
    totalPrimary.push(parseInt(primarySsn))
  }

  if (form.OtherIncomeSecondary.SSN) {
  const secondarySsn = form.OtherIncomeSecondary.SSN
  data["income.father.ssn"] = format(secondarySsn)
  totalSecondary.push(parseInt(secondarySsn))
  }

  // Unearned
  if (form.OtherIncome.unearned) {
    const primaryUnearned = form.OtherIncome.unearned
    data["income.mother.unearned"] = format(primaryUnearned)
    totalPrimary.push(parseInt(primaryUnearned))
  }

  if (form.OtherIncomeSecondary.unearned) {
    const secondaryUnearned = form.OtherIncomeSecondary.unearned
    data["income.father.unearned"] = format(secondaryUnearned)
    totalSecondary.push(parseInt(secondaryUnearned))
  }
  
  // Imputed
  if (form.OtherIncome.imputed) {
    const primaryImputed = form.OtherIncome.imputed * form.OtherIncome.imputedSchedule
    data["income.mother.imputed"] = format(primaryImputed)
    totalPrimary.push(parseInt(primaryImputed))
  }

  if (form.OtherIncomeSecondary.imputed) {
    const secondaryImputed = form.OtherIncomeSecondary.imputed *
      form.OtherIncomeSecondary.imputedSchedule
      data["income.father.imputed"] = format(secondaryImputed)
      totalSecondary.push(parseInt(secondaryImputed))
  }

  // EITC
  if (form.OtherIncome.eitc) {
    const primaryEitc = form.OtherIncome.eitc
    data["income.mother.earned"] = format(primaryEitc)
    totalPrimary.push(parseInt(primaryEitc))
  }
  
  if (form.OtherIncomeSecondary.eitc) {
    const secondaryEitc = form.OtherIncomeSecondary.eitc
    data["income.father.earned"] = format(secondaryEitc)
    totalSecondary.push(parseInt(secondaryEitc))
  }

  // TOTAL WAGES
  data["income.mother.total-unformat"] = totalPrimary.reduce((a, b) => a + b, 0)
  data["income.father.total-unformat"] = totalSecondary.reduce(
    (a, b) => a + b,
    0
  )

  data["income.mother.total"] = format(totalPrimary.reduce((a, b) => a + b, 0))
  data["income.father.total"] = format(
    totalSecondary.reduce((a, b) => a + b, 0)
  )

  data["income.mother.total-callout"] = data["income.mother.total"]
  data["income.father.total-callout"] = data["income.father.total"]

  return data
}

const calcWeeksBetween = (start, end) => {
  var a = moment(start)
  var b = moment(end)
  return b.diff(a, "week", true)
}

const calcWages = (form, parent) => {
  let totalWages
  let numWeeks
  let jobType = form[parent].type
  let jobStart = form[parent].start
  let jobEnd = form[parent].end
  let jobWeeksPerYear = form[parent].weeksPerYear
  let jobHoursPerWeek = form[parent].hoursPerWeek
  let jobGrossAmount = form[parent].grossAmount
  let jobSchedule = form[parent].schedule

  let jobPayment = form[parent].payment

  switch (jobType) {
    case "temporary":
      numWeeks = calcWeeksBetween(jobStart, jobEnd)
      break
    case "permanent":
    case "seasonal":
      numWeeks = jobWeeksPerYear
      break
  }

  switch (jobPayment) {
    case "hourly":
      totalWages = jobHoursPerWeek * jobGrossAmount * numWeeks
      break
    case "salary":
    case "commission":
      totalWages = jobGrossAmount * jobSchedule
      break
  }

  // let otherJobsWages = []
  //
  // form.OtherJob &&
  //   Object.entries(form.OtherJob).forEach(([index, job]) => {
  //     switch (form.CurrentJobPayment) {
  //       case "hourly":
  //         otherJobsWages.push(
  //           job.hoursPerWeek * job.grossAmount * job.weeksPerYear
  //         )
  //         break
  //       case "salary":
  //       case "commission":
  //         otherJobsWages.push(job.grossAmount * job.paySchedule)
  //         break
  //     }
  //   })
  // const otherJobsTotal = otherJobsWages.reduce((a, b) => a + b, 0)

  const total = totalWages

  return total
}

const calcImputed = form => {
  switch (form.OtherIncome.ImputedSchedule) {
    case "weekly":
      form.OtherIncome.Imputed * 52
      break
    case "biweekly":
      form.OtherIncome.Imputed * 26
      break
    case "bimonthly":
      form.OtherIncome.Imputed * 24
      break
    case "monthly":
      form.OtherIncome.Imputed * 12
      break
    case "yearly":
      form.OtherIncome.Imputed
      break
  }
}

module.exports = { calcIncome, calcWages, calcImputed }
