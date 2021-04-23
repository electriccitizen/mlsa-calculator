var moment = require("moment")
// Hard-coded data for testing, copied from # Debug - Form values
const init = require('./init.json')
const { numberFormatToMoney } = require("../utils/helpers")

const { getInitiate } = require("./initiate")
const { calcIncome } = require("./income")
const { calcAllowableDeductions } = require("./deductions")
const { calcPercentages } = require("./percentages")
const { calcSola } = require("./sola")
const { calcParentingDays } = require("./parenting")
const { getAddendum } = require("./addendum")

const processData = (form, pdfs) => {
  // Override pdfs array to object with names
  pdfs = pdfs && pdfs.reduce((names, pdf) => ({ ...names, [pdf.name]: pdf.name }), {})

  // Pass hard-coded data to processors instead of form (init.json)
  form = init

  // Main
  let data = {}

  // Initiate
  let initiate = getInitiate(form)

  // 1 INCOME
  let income = calcIncome(form, initiate.data)

  // 2 ALLOWABLE DEDUCTIONS
  let deductions = calcAllowableDeductions(form, initiate.data, income.data)

  // PARENT PERCENTAGES
  let percentages = calcPercentages(form, initiate.data, deductions.data)

  // ** SOLA PACS
  let sola = calcSola(form, initiate.data, percentages.data)

  // ** PARENTING DAYS
  let parenting = calcParentingDays(form, sola.data)

  // WORKSHEET PREPARED BY
  data["worksheet.prepared"] = initiate["initiate.mother.name"]
  data["worksheet.date"] = moment().format('MMMM D, YYYY')

  // WORKSHEET A ADDENDUM
  let addendum = getAddendum(initiate.data, [
    ...income.addendum,
    ...deductions.addendum,
    ...percentages.addendum,
    ...sola.addendum
  ])

  if (parenting["initiate.documents.ab"] === "true") {
    // Worksheet B TODO
    // mother/father name

    //1 X for each child (limit 4 on one form)

    //2 divide line 11 wsA by numChildren and enter same amount for each child

    //3 enter wsA 12a-12d by child -- total should equal line 12e wsA

    //4 add line 2+3

    //5 add all from line 4 and enter in totals

    //6 divide line 4/5 for each child

    // MOTHER
    //7 line 22 Wsa in totals
    //8 line 20 Wsa
    //9  line8-line7
    //10 line 6*8 for each child
    //11 line 20 Wsa
    //12 line 11/numChildren
    //13 line 10+12
    //14 mother: line 13-14 for each child.
  }

  let results = {
    ...data,
    ...initiate.data,
    ...income.data,
    ...deductions.data,
    ...percentages.data,
    ...sola.data,
    ...parenting
  }

  return {
    [pdfs.wsa]: {
      // Format numbers to money
      ...Object.keys(results).reduce((acc, key) => {
        return {
          ...acc,
          [key]: numberFormatToMoney(results[key])
        }
      }, {})
    },
    [pdfs.addendum]: addendum
  }
}

module.exports = { processData }
