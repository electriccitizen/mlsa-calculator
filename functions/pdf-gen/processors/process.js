// Hard-coded data for testing, copied from # Debug - Form values
const init = require('./init.json')
const { isNumber } = require("../helpers")

const { calcIncome } = require("./income")
const { calcAllowableDeductions } = require("./deductions")
const { calcPercentages } = require("./percentages")
const { calcSola } = require("./sola")
const { calcParentingDays } = require("./parenting")

const processData = form => {
  let initiate = []

  // Pass hard-coded data to processors instead of form (init.json)
  form = init

  // Case #
  form.CSED && (initiate["initiate.csed"] = form.CSED)

  // Basic info
  initiate["initiate.mother.name"] =
    form.Primary.fname + " " + form.Primary.lname
  initiate["initiate.father.name"] =
    form.OtherParent.fname + " " + form.OtherParent.lname

  // Primary children DOB
  Object.entries(form.PrimaryChildren).forEach(
    ([index, value]) =>
    (initiate[`child.${parseInt(index) + 1}.bday`] = value.dob.replace(
      /(\d{4})\-(\d{2})\-(\d{2}).*/,
      "$2-$3-$1"
    ))
  )

  // 1 INCOME
  let income = calcIncome(form)

  // 2 ALLOWABLE DEDUCTIONS
  let deductions = calcAllowableDeductions(form, income)

  // PARENT PERCENTAGES
  let percentages = calcPercentages(form, deductions)

  // ** SOLA PACS
  let sola = calcSola(form, percentages)

  // ** PARENTING DAYS
  let parenting = calcParentingDays(form, sola)

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

  let data = {
    ...income,
    ...deductions,
    ...percentages,
    ...sola,
    ...parenting
  }

  // return {
  //   ...initiate,
  //   ...data
  // }

  // Format numbers to string
  return {
    ...initiate,
    ...Object.keys(data).reduce((acc, key) => {
      return {
        ...acc,
        [key]:
          isNumber(data[key]) ?
            (Number.isInteger(data[key]) ? data[key] : data[key].toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
            data[key]
      }
    }, {})
  }
}

module.exports = { processData }
