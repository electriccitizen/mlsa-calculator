var moment = require("moment")
const { getValueAsNumber, getValue, getValueAsArray } = require('../utils/helpers')
const { getLabel } = require('../utils/labels')
const { currency, format, add, multiply, sum } = require('../utils/currency')

const calcIncome = (form, initiate) => {

  // Main
  let data = {}
  // Totals
  let primary = {}
  let secondary = {}
  // Addendum
  let addendum = []

  // 1A Wages, salaries, commissions
  primary["income.mother.wages"] = add(
    calcWages(form, "EmploymentPrimary", "OtherJob"),
    getValueAsNumber(form, ["OtherIncome", "bonus"])
  )

  secondary["income.father.wages"] = add(
    calcWages(form, "EmploymentSecondary", "OtherJobSecondary"),
    getValueAsNumber(form, ["OtherIncomeSecondary", "bonus"])
  )

  // 1B Self-Employment net earnings
  primary["income.mother.sep"] = multiply(
    getValueAsNumber(form, ["OtherIncome", "SepEarning", "net"]),
    getValueAsNumber(form, ["OtherIncome", "SepEarning", "schedule"])
  )

  secondary["income.father.sep"] = multiply(
    getValueAsNumber(form, ["OtherIncomeSecondary", "SepEarning", "net"]),
    getValueAsNumber(form, ["OtherIncomeSecondary", "SepEarning", "schedule"])
  )

  // 1C Pensions, Social Security
  primary["income.mother.ssn"] = add(
    getValueAsNumber(form, ["OtherIncome", "pension"]),
    getValueAsNumber(form, ["OtherIncome", "SSN"])
  )

  secondary["income.father.ssn"] = add(
    getValueAsNumber(form, ["OtherIncomeSecondary", "pension"]),
    getValueAsNumber(form, ["OtherIncomeSecondary", "SSN"])
  )

  // 1D Unearned Income
  primary["income.mother.unearned"] = add(
    getValueAsNumber(form, ["OtherIncome", "interest"]),
    getValueAsNumber(form, ["OtherIncome", "unearned"])
  )

  secondary["income.father.unearned"] = add(
    getValueAsNumber(form, ["OtherIncomeSecondary", "interest"]),
    getValueAsNumber(form, ["OtherIncomeSecondary", "unearned"])
  )

  // 1E Imputed income
  primary["income.mother.imputed"] = multiply(
    getValueAsNumber(form, ["OtherIncome", "imputed"]),
    getValueAsNumber(form, ["OtherIncome", "imputedSchedule"])
  )

  secondary["income.father.imputed"] = multiply(
    getValueAsNumber(form, ["OtherIncomeSecondary", "imputed"]),
    getValueAsNumber(form, ["OtherIncomeSecondary", "imputedSchedule"])
  )

  // 1F Earned Income Tax Credit (EITC)
  primary["income.mother.earned"] =
    currency(getValueAsNumber(form, ["OtherIncome", "eitc"]))
  secondary["income.father.earned"] =
    currency(getValueAsNumber(form, ["OtherIncomeSecondary", "eitc"]))

  // 1G Other taxable income (specify):
  primary["income.mother.otherTaxable"] = add(
    getValueAsNumber(form, ["OtherIncome", "prize"]),
    calcOtherIncome(form, "TaxableIncome")
  )
  secondary["income.father.otherTaxable"] = add(
    getValueAsNumber(form, ["OtherIncomeSecondary", "prize"]),
    calcOtherIncome(form, "TaxableIncomeSecondary")
  )

  addendum.push([
    `${initiate["initiate.mother.name"]}, Other taxable income, continued from 1g`,
    `${getLabel('prize')} -- ${format(getValueAsNumber(form, ["OtherIncome", "prize"]))}`,
    ...mapOtherIncomeToAddendum(form, "TaxableIncome"),
    `Total -- ${format(primary["income.mother.otherTaxable"])}`
  ], [
    `${initiate["initiate.father.name"]}, Other taxable income, continued from 1g`,
    `${getLabel('prize')} -- ${format(getValueAsNumber(form, ["OtherIncomeSecondary", "prize"]))}`,
    ...mapOtherIncomeToAddendum(form, "TaxableIncomeSecondary"),
    `Total -- ${format(secondary["income.father.otherTaxable"])}`
  ])

  if (primary["income.mother.otherTaxable"] || secondary["income.father.otherTaxable"]) {
    data["income.otherTaxableSpecify"] = "See Worksheet A Addendum"
  }

  // 1H Other non-taxable income (specify)
  primary["income.mother.otherNonTaxable"] =
    calcOtherIncome(form, "NonTaxableIncome")
  secondary["income.father.otherNonTaxable"] =
    calcOtherIncome(form, "NonTaxableIncomeSecondary")

  addendum.push([
    `${initiate["initiate.mother.name"]}, Other non-taxable income, continued from 1h`,
    ...mapOtherIncomeToAddendum(form, "NonTaxableIncome"),
    `Total -- ${format(primary["income.mother.otherNonTaxable"])}`
  ], [
    `${initiate["initiate.mother.name"]}, Other non-taxable income, continued from 1h`,
    ...mapOtherIncomeToAddendum(form, "NonTaxableIncomeSecondary"),
    `Total -- ${format(secondary["income.father.otherNonTaxable"])}`
  ])

  if (primary["income.mother.otherNonTaxable"] || secondary["income.father.otherNonTaxable"]) {
    data["income.otherNontaxSpecify"] = "See Worksheet A Addendum"
  }

  // 1I TOTAL INCOME -- SUM(1A:1H) 
  primary["income.mother.total"] = sum(Object.values(primary))
  secondary["income.father.total"] = sum(Object.values(secondary))

  // Callout
  data["income.mother.totalCallout"] = primary["income.mother.total"]
  data["income.father.totalCallout"] = secondary["income.father.total"]

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
const calcWeeksBetween = (start, end) => {
  if (!start || !end) return 0
  let a = moment(start)
  let b = moment(end)
  return b.diff(a, "week")
}

const calcWage = (job) => {
  let wage = 0
  let numWeeks = 0
  let jobType = getValue(job, "type")
  let jobStart = getValue(job, "start")
  let jobEnd = getValue(job, "end")
  let jobWeeksPerYear = getValueAsNumber(job, "weeksPerYear")
  let jobHoursPerWeek = getValueAsNumber(job, "hoursPerWeek")
  let jobGrossAmount = getValueAsNumber(job, "grossAmount")
  let jobSchedule = getValueAsNumber(job, "schedule")
  let jobPayment = getValue(job, "payment")

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
      wage = multiply(jobGrossAmount, jobHoursPerWeek, numWeeks)
      break
    case "salary":
    case "commission":
      wage = multiply(jobGrossAmount, jobSchedule)
      break
  }

  return wage
}

const calcWages = (form, keyEmployment, keyOther) => {
  const employment = getValue(form, [keyEmployment], {})
  const employmentStatus = getValue(form, [keyEmployment, "status"])
  const employmentInitiate = getValue(form, [keyEmployment, "initiate"])
  const employmentOtherJobs = getValue(form, [keyEmployment, "otherJobs"])

  if (employmentStatus === "no") return 0

  const wage = calcWage(employment)

  if (
    employmentInitiate === 'yes' || // If primary person has current job don't calc other wages
    employmentOtherJobs === 'no'
  ) {
    return wage
  }

  // Calc other wages
  const otherWages = getValueAsArray(form, [keyOther]).reduce((wages, job) => {
    return add(wages, calcWage(job))
  }, currency())

  return add(wage, otherWages)
}

const calcOtherIncome = (form, key) => {
  return getValueAsArray(form, key).reduce((total, other) => {
    return add(total, getValueAsNumber(other, ["amt"]))
  }, currency())
}

const mapOtherIncomeToAddendum = (form, key) => {
  return getValueAsArray(form, key)
    .map(other => `${getLabel(getValue(other, ["type"]))} -- ${format(getValueAsNumber(other, ["amt"]))}`)
}

module.exports = { calcIncome }
