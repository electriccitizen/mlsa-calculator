
var moment = require("moment")

const { getInitiate } = require("./initiate")
const { calcIncome } = require("./income")
const { calcAllowableDeductions } = require("./deductions")
const { calcPercentages } = require("./percentages")
const { calcSola } = require("./sola")
const { calcParentingDays } = require("./parenting")

const calcWSA = (form) => {

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

    return {
        // WORKSHEET A DATA
        data: {
            ...data,
            ...initiate.data,
            ...income.data,
            ...deductions.data,
            ...percentages.data,
            ...sola.data,
            ...parenting.data
        },
        // WORKSHEET A ADDENDUM DATA
        addendum: [
            ...income.addendum,
            ...deductions.addendum,
            ...percentages.addendum,
            ...sola.addendum
        ]
    }
}

module.exports = { calcWSA }