var moment = require("moment")
const { convertToNumber } = require('../helpers')

const calcIncome = form => {

  // Totals
  let data = []
  let totalPrimary = []
  let totalSecondary = []

  // 1A Wages 
  // @TODO add "other" jobs for both parents
  const primaryWages = calcWages(form, "EmploymentPrimary")
  data["income.mother.wages"] = primaryWages
  totalPrimary.push(primaryWages)

  const secondaryWages = calcWages(form, "EmploymentSecondary")
  data["income.father.wages"] = secondaryWages
  totalSecondary.push(secondaryWages)

  // 1B Self-Employment net earnings
  if (form.OtherIncome.SepEarning) {
    const primarySep =
    convertToNumber(form.OtherIncome.SepEarning.net) * convertToNumber(form.OtherIncome.SepEarning.schedule)
    data["income.mother.sep"] = primarySep
    totalPrimary.push(primarySep)
  }

  if (form.OtherIncomeSecondary.SepEarning) {
    const secondarySep =
    convertToNumber(form.OtherIncomeSecondary.SepEarning.net) *
    convertToNumber(form.OtherIncomeSecondary.SepEarning.schedule)
    data["income.father.sep"] = secondarySep
    totalSecondary.push(secondarySep)
  }

  // 1C Pensions, Social Security 
  if (form.OtherIncome.SSN) {
    const primarySsn = convertToNumber(form.OtherIncome.SSN)
    data["income.mother.ssn"] = primarySsn
    totalPrimary.push(primarySsn)
  }

  if (form.OtherIncomeSecondary.SSN) {
    const secondarySsn = convertToNumber(form.OtherIncomeSecondary.SSN)
    data["income.father.ssn"] = secondarySsn
    totalSecondary.push(secondarySsn)
  }

  // 1D Unearned Income
  if (form.OtherIncome.unearned) {
    const primaryUnearned = convertToNumber(form.OtherIncome.unearned)
    data["income.mother.unearned"] = primaryUnearned
    totalPrimary.push(primaryUnearned)
  }

  if (form.OtherIncomeSecondary.unearned) {
    const secondaryUnearned = convertToNumber(form.OtherIncomeSecondary.unearned)
    data["income.father.unearned"] = secondaryUnearned
    totalSecondary.push(secondaryUnearned)
  }

  // 1E Imputed income
  if (form.OtherIncome.imputed) {
    const primaryImputed = convertToNumber(form.OtherIncome.imputed) * convertToNumber(form.OtherIncome.imputedSchedule)
    data["income.mother.imputed"] = primaryImputed
    totalPrimary.push(primaryImputed)
  }

  if (form.OtherIncomeSecondary.imputed) {
    const secondaryImputed = convertToNumber(form.OtherIncomeSecondary.imputed) *
    convertToNumber(form.OtherIncomeSecondary.imputedSchedule)
    data["income.father.imputed"] = secondaryImputed
    totalSecondary.push(secondaryImputed)
  }

  // 1F Earned Income Tax Credit (EITC) 
  if (form.OtherIncome.eitc) {
    const primaryEitc = convertToNumber(form.OtherIncome.eitc)
    data["income.mother.earned"] = primaryEitc
    totalPrimary.push(primaryEitc)
  }

  if (form.OtherIncomeSecondary.eitc) {
    const secondaryEitc = convertToNumber(form.OtherIncomeSecondary.eitc)
    data["income.father.earned"] = secondaryEitc
    totalSecondary.push(secondaryEitc)
  }

  // 1G Other taxable income (specify): @TODO -- sum, add multiple entries to Attachment A (verify)
  // 1H Other non-taxable income (specify(): @TODO -- sum, add multiple entries to Attachment A

  // 1I TOTAL INCOME -- SUM(1A:1H)
  data["income.mother.total"] = totalPrimary.reduce((a, b) => a + b, 0)
  data["income.father.total"] = totalSecondary.reduce((a, b) => a + b, 0)

  data["income.mother.total-callout"] = data["income.mother.total"]
  data["income.father.total-callout"] = data["income.father.total"]

  return data
}

// Helpers
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
