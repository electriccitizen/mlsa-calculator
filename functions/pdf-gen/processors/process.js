var moment = require("moment")
// Hard-coded data for testing, copied from # Debug - Form values
const init = require('./init.json')
const { parseDataToMoney } = require("../utils/helpers")

const { getInitiate } = require("./initiate")
const { calcIncome } = require("./income")
const { calcAllowableDeductions } = require("./deductions")
const { calcPercentages } = require("./percentages")
const { calcSola } = require("./sola")
const { calcParentingDays } = require("./parenting")
const { getAddendum } = require("./addendum")
const { calcWSB } = require("./wsb")

const processData = (form, pdfs) => {
  // Override pdfs array to object with names
  pdfs = pdfs && pdfs.reduce((names, pdf) => ({ ...names, [pdf.name]: pdf.name }), {})

  // Pass hard-coded data to processors instead of form (init.json)
  form = init

  // Main
  let data = {}

  // Initiate
  let initiate = getInitiate(form)

  // INCOME
  let income = calcIncome(form, initiate.data)

  // ALLOWABLE DEDUCTIONS
  let deductions = calcAllowableDeductions(form, initiate.data, income.data)

  // PARENTS’ PERCENTAGES and PRIMARY CHILD SUPPORT ALLOWANCE
  let percentages = calcPercentages(form, initiate.data, deductions.data)

  // SOLA AND PARENT’S ANNUAL CHILD SUPPORT
  let sola = calcSola(form, initiate.data, percentages.data)

  // PARENTING DAYS AND ANNUAL CHILD SUPPORT
  let parenting = calcParentingDays(form, sola.data)

  // WORKSHEET PREPARED BY
  data["worksheet.prepared"] = initiate.data["initiate.mother.name"]

  // WORKSHEET DATE
  data["worksheet.date"] = moment().format('MMMM D, YYYY')

  // WORKSHEET A ADDENDUM
  let addendum = getAddendum(initiate.data, [
    ...income.addendum,
    ...deductions.addendum,
    ...percentages.addendum,
    ...sola.addendum
  ])

  // WORKSHEET A DATA
  let wsa = {
    ...data,
    ...initiate.data,
    ...income.data,
    ...deductions.data,
    ...percentages.data,
    ...sola.data,
    ...parenting.data
  }

  // WORKSEET B DATA
  let wsb = calcWSB(form, wsa)

  return {
    [pdfs.wsa]: parseDataToMoney({ ...wsa, ...wsb.wsaData }),
    [pdfs.addendum]: addendum,
    [pdfs.wsbPartOne]: parseDataToMoney(wsb.partOneData),
    [pdfs.wsbPartTwo]: parseDataToMoney(wsb.partTwoData)
  }
}

module.exports = { processData }
