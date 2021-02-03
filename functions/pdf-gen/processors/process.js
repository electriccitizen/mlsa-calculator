var init = require('./init.json')
const { calcIncome } = require("./income")
const { calcAllowableDeductions } = require("./deductions")
const { calcPercentages } = require("./percentages")
const { calcSola } = require("./sola")

const format = number => {
  return Number(number).toLocaleString()
}

const unFormat = number => {
  var regex = /[.,\s]/g
  return parseInt(number.replace(regex, ""))
}

const processData = form => {
  let data = []
  let primary
  let secondary
  
  //form = init
 
  console.log('fooking hell')

  // Case #
  form.CSED && (data["initiate.csed"] = form.CSED)

  // Basic info
  data["initiate.mother.name"] = form.Primary.fname + " " + form.Primary.lname
  data["initiate.father.name"] =
    form.OtherParent.fname + " " + form.OtherParent.lname

  // Primary children DOB
  Object.entries(form.PrimaryChildren).forEach(
    ([index, value]) =>
      (data[`child.${parseInt(index) + 1}.bday`] = value.dob.replace(
        /(\d{4})\-(\d{2})\-(\d{2}).*/,
        "$2-$3-$1"
      ))
  )

  // INCOME
   let income = calcIncome(form)

  // ALLOWABLE DEDUCTIONS
   let deductions = calcAllowableDeductions(form)

  // Line 3 INCOME AFTER DEDUCTIONS
  // primary =
  //   unFormat(income["income.mother.total"]) -
  //   unFormat(deductions["allowable.mother.total"])
  // secondary =
  //   unFormat(income["income.father.total"]) -
  //   unFormat(deductions["allowable.father.total"])
  // data["allowable.mother.income"] = format(primary)
  // data["allowable.father.income"] = format(secondary)
  // data["allowable.mother.income-callout"] = format(primary)
  // data["allowable.father.income-callout"] = format(secondary)

  // PARENT PERCENTAGES
  let percentages = calcPercentages(form, primary, secondary)

  // ** SOLA PACS
  let sola = calcSola(form, percentages)

  //14 TODO  -- no data
  // if line 6 > line 5, skip to line 21 and enter line 6 amount

  // 15 TODO
  //line 14 * 9

  // 16 TODO
  // enter lower between line 15 and line 5

  // 17 TODO
  // line 5 - line 16
  // if zero, zero and skip to line 21

  //18a TODO
  // Long distance parenting adj worksheet D (wtf)

  //18b TODO
  // other SOLA from form

  //19 TODO
  //Adjusted income for SOLA [line 17 minus (18a + 18b)]

  //20 SOLA Amount (Worksheet E) TODO
  // numChildren * line 19 * sola factor global

  //21 TODO
  //add line 16+20

  //22 TODO
  // compare line 21:6 higher amount for both parents

  //23 TODO
  //expenses for each parent computed from 12e :(

  // 24 TODO
  // line 22-23, if < 0 then 0

  // ** PARENTING DAYS
  // 25a TODO
  // calculate number of each days for both parents * numChildren

  // 25b TODO
  // divide mothers line 24 by line 10 (numChild) and enter same amount for each child
  // same for father column

  // 25b Total TODO
  // total parents columns in 25b above

  // See notes on rounding .49 down/.50 up

  // 26 TODO
  //Do ALL primary children live with same primary and > 110 with other parent?
  // if yes:

  //26a/b TODO
  // divide each child's ANNUAL support from Table 25-b, by 12,
  // round per instructions and enter each child's amt for each parent into
  // table 26b
  // Total columns and
  // enter total for non-residential parent at line 27.

  //if no: TODO
  // Complete Worksheet B parts 1 and 2
  // follow instructs for adding results to 26a
  // then divide each amount in 26a by 12, round according to instr
  // and endter in MONTHLUY column of Table 26b.

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

  let final = {
    ...data,
    ...income,
    ...deductions,
    ...percentages,
    // ...sola,
  }

  return final
}

module.exports = { processData }
