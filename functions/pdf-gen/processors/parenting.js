const { convertToNumber, convertToString } = require('../helpers')

const calcParentingDays = (form, sola) => {

  // Total
  let data = []
  let isSpendTimeWithPrimary = false
  let isSpendTimeWithSecondary = false

  const days = 365
  data["parenting.table25b.mother.total"] = 0
  data["parenting.table25b.father.total"] = 0
  Object.entries(form.ParentingDays.children).forEach(
    ([index, child]) => {
      const childIndex = parseInt(index) + 1
      const childDays = convertToNumber(child.amount)

      // Table 25-A: PARENTING DAYS PER YEAR
      // Enter annual number of days each child spends with each parent in Table 25-A.
      let primaryParentingDays =
        form.ParentingDays.primary === "me" ? childDays : days - childDays
      let secondaryParentingDays =
        form.ParentingDays.primary !== "me" ? childDays : days - childDays
      data[`parenting.table25a.mother.child.${childIndex}`] = convertToString(primaryParentingDays)
      data[`parenting.table25a.father.child.${childIndex}`] = convertToString(secondaryParentingDays)
      data[`parenting.table25a.days.child.${childIndex}`] = convertToString(days)

      // Table 25-B: CHILD SUPPORT/YEAR
      // Mother’s line 24 by line 10 and enter the same amount for each child in Mother’s column of Table 25-B. 
      // Do the same for Father in his column. Total the parent’s columns in Table 25-B.
      data[`parenting.table25b.mother.child.${childIndex}`] =
        Math.round(sola["sola.mother.total"] / convertToNumber(form.NumPrimaryChildren))
      data[`parenting.table25b.father.child.${childIndex}`] =
        Math.round(sola["sola.father.total"] / convertToNumber(form.NumPrimaryChildren))
      data["parenting.table25b.mother.total"] =
        data["parenting.table25b.mother.total"] +
        data[`parenting.table25b.mother.child.${childIndex}`]
      data["parenting.table25b.father.total"] =
        data["parenting.table25b.father.total"] +
        data[`parenting.table25b.father.child.${childIndex}`]

      // QUESTION: Do all children on line 10 reside primarily
      // with the same parent and do not spend more than 110
      // days per year with the other parent?
      isSpendTimeWithPrimary =
        (primaryParentingDays > secondaryParentingDays) &&
        secondaryParentingDays < 110

      isSpendTimeWithSecondary =
        (secondaryParentingDays > primaryParentingDays) &&
        primaryParentingDays < 110
    }
  )

  //  IF THE ANSWER IS “YES”: Divide each child’s ANNUAL
  //  support from Table 25 - B, by 12, round per instructions
  //  and enter each child’s amount for each parent into
  //  MONTHLY Table 26 - B at far right.Total columns and
  //  enter total for non - residential parent at line 27.
  if (isSpendTimeWithPrimary || isSpendTimeWithSecondary) {
    data["parenting.table26b.mother.total"] = 0
    data["parenting.table26b.father.total"] = 0
    Object.entries(form.ParentingDays.children).forEach(
      ([index]) => {
        const childIndex = parseInt(index) + 1

        data[`parenting.table26b.mother.child.${childIndex}`] = Math.round(data[`parenting.table25b.mother.child.${childIndex}`] / 12)
        data[`parenting.table26b.father.child.${childIndex}`] = Math.round(data[`parenting.table25b.father.child.${childIndex}`] / 12)
        data["parenting.table26b.mother.total"] =
          data["parenting.table26b.mother.total"] +
          data[`parenting.table26b.mother.child.${childIndex}`]
        data["parenting.table26b.father.total"] =
          data["parenting.table26b.father.total"] +
          data[`parenting.table26b.father.child.${childIndex}`]
      }
    )

    // 27 FINAL MONTHLY TRANSFER PAYMENT
    if (!isSpendTimeWithPrimary) {
      data["parenting.monthlyTransferPayment.mother"] = data["parenting.table26b.mother.total"]
    } else if (!isSpendTimeWithSecondary) {
      data["parenting.monthlyTransferPayment.father"] = data["parenting.table26b.father.total"]
    }

    data["initiate.documents.a"] = "true"
  } else {
    // @TODO
    // Complete Worksheet B parts 1 and 2
    // follow instructs for adding results to 26a
    // then divide each amount in 26a by 12, round according to instr
    // and endter in MONTHLUY column of Table 26b.
    data["initiate.documents.ab"] = "true"
  }

  return data
}

module.exports = { calcParentingDays }