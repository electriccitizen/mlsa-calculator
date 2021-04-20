var moment = require("moment")
const { convertToNumber } = require('../helpers')

const calcIncome = form => {

  // Totals
  let data = []
  let totalPrimary = []
  let totalSecondary = []

  // 1A Wages, salaries, commissions
  if (form.EmploymentPrimary && form.EmploymentPrimary.status !== "no") {
    const primaryWages = calcWages(form, "EmploymentPrimary", "OtherJob")
    data["income.mother.wages"] = primaryWages
    totalPrimary.push(primaryWages)
  }

  if (form.OtherIncome.bonus) {
    const primaryBonus = convertToNumber(form.OtherIncome.bonus)
    data["income.mother.wages"] =
      data["income.mother.wages"] ?
        data["income.mother.wages"] + primaryBonus :
        primaryBonus
    totalPrimary.push(primaryBonus)
  }

  if (form.EmploymentSecondary && form.EmploymentSecondary.status !== "no") {
    const secondaryWages = calcWages(form, "EmploymentSecondary", "OtherJobSecondary")
    data["income.father.wages"] = secondaryWages
    totalSecondary.push(secondaryWages)
  }

  if (form.OtherIncomeSecondary.bonus) {
    const secondaryBonus = convertToNumber(form.OtherIncomeSecondary.bonus)
    data["income.father.wages"] =
      data["income.father.wages"] ?
        data["income.father.wages"] + secondaryBonus :
        secondaryBonus
    totalSecondary.push(secondaryBonus)
  }

  // 1B Self-Employment net earnings
  if (form.OtherIncome.SepEarning) {
    const primarySep =
      convertToNumber(form.OtherIncome.SepEarning.net) *
      convertToNumber(form.OtherIncome.SepEarning.schedule)
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
  if (form.OtherIncome.pension) {
    const primaryPension = convertToNumber(form.OtherIncome.pension)
    data["income.mother.ssn"] = primaryPension
    totalPrimary.push(primaryPension)
  }
  if (form.OtherIncome.SSN) {
    const primarySsn = convertToNumber(form.OtherIncome.SSN)
    data["income.mother.ssn"] =
      data["income.mother.ssn"] ?
        data["income.mother.ssn"] + primarySsn :
        primarySsn
    totalPrimary.push(primarySsn)
  }

  if (form.OtherIncomeSecondary.pension) {
    const secondaryPension = convertToNumber(form.OtherIncomeSecondary.pension)
    data["income.father.ssn"] = secondaryPension
    totalSecondary.push(secondaryPension)
  }
  if (form.OtherIncomeSecondary.SSN) {
    const secondarySsn = convertToNumber(form.OtherIncomeSecondary.SSN)
    data["income.father.ssn"] =
      data["income.father.ssn"] ?
        data["income.father.ssn"] + secondarySsn :
        secondarySsn
    totalSecondary.push(secondarySsn)
  }

  // 1D Unearned Income
  if (form.OtherIncome.interest) {
    const primaryInterest = convertToNumber(form.OtherIncome.interest)
    data["income.mother.unearned"] = primaryInterest
    totalPrimary.push(primaryInterest)
  }

  if (form.OtherIncome.unearned) {
    const primaryUnearned = convertToNumber(form.OtherIncome.unearned)
    data["income.mother.unearned"] =
      data["income.mother.unearned"] ?
        data["income.mother.unearned"] + primaryUnearned :
        primaryUnearned
    totalPrimary.push(primaryUnearned)
  }

  if (form.OtherIncomeSecondary.interest) {
    const secondaryInterest = convertToNumber(form.OtherIncomeSecondary.interest)
    data["income.father.unearned"] = secondaryInterest
    totalSecondary.push(secondaryInterest)
  }

  if (form.OtherIncomeSecondary.unearned) {
    const secondaryUnearned = convertToNumber(form.OtherIncomeSecondary.unearned)
    data["income.father.unearned"] =
      data["income.father.unearned"] ?
        data["income.father.unearned"] + secondaryUnearned :
        secondaryUnearned
    totalSecondary.push(secondaryUnearned)
  }

  // 1E Imputed income
  if (form.OtherIncome.imputed) {
    const primaryImputed =
      convertToNumber(form.OtherIncome.imputed) *
      convertToNumber(form.OtherIncome.imputedSchedule)
    data["income.mother.imputed"] = primaryImputed
    totalPrimary.push(primaryImputed)
  }

  if (form.OtherIncomeSecondary.imputed) {
    const secondaryImputed =
      convertToNumber(form.OtherIncomeSecondary.imputed) *
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

  // 1G Other taxable income (specify): @TODO add multiple entries to Attachment A (verify)
  if (form.OtherIncome.prize) {
    const primaryPrize = convertToNumber(form.OtherIncome.prize)
    data["income.mother.otherTaxable"] = primaryPrize
    totalPrimary.push(primaryPrize)
  }

  if (form.TaxableIncome) {
    const primaryTaxable = calcOtherIncome(form, "TaxableIncome")
    data["income.mother.otherTaxable"] =
      data["income.mother.otherTaxable"] ?
        data["income.mother.otherTaxable"] + primaryTaxable :
        primaryTaxable
    totalPrimary.push(primaryTaxable)
  }

  if (form.OtherIncomeSecondary.prize) {
    const secondaryPrize = convertToNumber(form.OtherIncomeSecondary.prize)
    data["income.father.otherTaxable"] = secondaryPrize
    totalSecondary.push(secondaryPrize)
  }

  if (form.TaxableIncomeSecondary) {
    const secondaryTaxable = calcOtherIncome(form, "TaxableIncomeSecondary")
    data["income.father.otherTaxable"] =
      data["income.father.otherTaxable"] ?
        data["income.father.otherTaxable"] + secondaryTaxable :
        secondaryTaxable
    totalSecondary.push(secondaryTaxable)
  }

  if (data["income.mother.otherTaxable"] || data["income.father.otherTaxable"]) {
    data["income.otherTaxableSpecify"] = "See Worksheet A Addendum"
  }

  // 1H Other non-taxable income (specify(): @TODO add multiple entries to Attachment A
  if (form.NonTaxableIncome) {
    const primaryTaxable = calcOtherIncome(form, "NonTaxableIncome")
    data["income.mother.otherNonTaxable"] = primaryTaxable
    totalPrimary.push(primaryTaxable)
  }

  if (form.NonTaxableIncomeSecondary) {
    const secondaryNonTaxable = calcOtherIncome(form, "NonTaxableIncomeSecondary")
    data["income.father.otherNonTaxable"] = secondaryNonTaxable
    totalSecondary.push(secondaryNonTaxable)
  }

  if (data["income.mother.otherNonTaxable"] || data["income.father.otherNonTaxable"]) {
    data["income.otherNontaxSpecify"] = "See Worksheet A Addendum"
  }

  // 1I TOTAL INCOME -- SUM(1A:1H)
  data["income.mother.total"] = totalPrimary.reduce((a, b) => a + b, 0)
  data["income.father.total"] = totalSecondary.reduce((a, b) => a + b, 0)

  data["income.mother.totalCallout"] = data["income.mother.total"]
  data["income.father.totalCallout"] = data["income.father.total"]

  return data
}

// Helpers
const calcWeeksBetween = (start, end) => {
  var a = moment(start)
  var b = moment(end)
  return b.diff(a, "week", true)
}

const calcWage = (job) => {
  let wage = 0
  let numWeeks
  let jobType = job.type
  let jobStart = job.start
  let jobEnd = job.end
  let jobWeeksPerYear = job.weeksPerYear
  let jobHoursPerWeek = job.hoursPerWeek
  let jobGrossAmount = job.grossAmount
  let jobSchedule = job.schedule
  let jobPayment = job.payment

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
      wage = jobHoursPerWeek * jobGrossAmount * numWeeks
      break
    case "salary":
    case "commission":
      wage = jobGrossAmount * jobSchedule
      break
  }

  return wage
}

const calcWages = (form, employment, other) => {
  const wage = calcWage(form[employment])

  if (
    !form[other] ||
    form[employment]["initiate"] === 'yes' || // If primary person has current job don't calc other wages
    form[employment]["otherJobs"] === 'no'
  ) {
    return wage
  }

  // Calc other wages
  const otherWages = Object.values(form[other]).reduce((wages, job) => {
    return wages + calcWage(job)
  }, 0)

  return wage + otherWages
}

const calcOtherIncome = (form, key) => {
  return Object.values(form[key]).reduce((total, income) => {
    return total + convertToNumber(income.amt)
  }, 0)
}

module.exports = { calcIncome, calcWages }
