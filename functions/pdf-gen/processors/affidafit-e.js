const { format } = require("../utils/currency")
const { getValue, getValueAsNumber, divideIntoLines } = require("../utils/helpers")
const { getLabel } = require("../utils/labels")

// Static fields width in pixels
const FIELDS_WIDTH = {
    "deductions.extmedDesc": [445],
    "deductions.inhomeDesc": [666],
    "deductions.otherExpensesTotal": [362, 731]
}

// E. DEDUCTIONS AND EXPENSES
const getAffidavitE = (form) => {
    // Main
    let data = {}

    // 1. List deductions from gross wages, including costs for required uniforms or work related equipment.
    // Federal Income Tax
    data["deductions.federal.amount"] = format(getValueAsNumber(form, ["AllowableDeductions", "federal", "amount"]))
    data["deductions.federal.schedule"] = getLabel(getValue(form, ["AllowableDeductions", "federal", "schedule"]))

    // State Income Tax
    data["deductions.state.amount"] = format(getValueAsNumber(form, ["AllowableDeductions", "state", "amount"]))
    data["deductions.state.schedule"] = getLabel(getValue(form, ["AllowableDeductions", "state", "schedule"]))

    // FICA and Medicare
    data["deductions.ssn.amount"] = format(getValueAsNumber(form, ["AllowableDeductions", "ssn", "amount"]))
    data["deductions.ssn.schedule"] = getLabel(getValue(form, ["AllowableDeductions", "ssn", "schedule"]))

    // Mandatory Retirement
    data["deductions.retirement.amount"] = format(getValueAsNumber(form, ["AllowableDeductions", "retirement", "amount"]))
    data["deductions.retirement.schedule"] = getLabel(getValue(form, ["AllowableDeductions", "retirement", "schedule"]))

    // Required Work Related Costs
    data["deductions.reqemp.amount"] = format(getValueAsNumber(form, ["AllowableDeductions", "reqemp", "amount"]))
    data["deductions.reqemp.schedule"] = getLabel(getValue(form, ["AllowableDeductions", "reqemp", "schedule"]))

    // 2. Alimony
    data["deductions.alimony"] = getValue(form, ["AllowableDeductions", "alimony"]) === false ? "no" : "yes"

    // 3. Extraordinary dical expense for yourself
    data["deductions.extmed"] = getValue(form, ["AllowableDeductions", "extmed"]) === false ? "no" : "yes"

    const [extmedDesc, extmedDescAddendum] = divideIntoLines(
        data["deductions.extmed"] === "yes" &&
        `Description: ${getValue(form, ["AllowableDeductions", "extmed", "desc"])}. The total yearly expense is ${format(getValueAsNumber(form, ["AllowableDeductions", "extmed", "amount"]), "currency")}.`,
        FIELDS_WIDTH["deductions.extmedDesc"]
    )
    extmedDesc.forEach((line, index) => {
        data[`deductions.extmedDesc-${index + 1}`] = line
    })

    // 4. Extraordinary dical expense for yourself
    const [inhomeDesc, inhomeDescAddendum] = divideIntoLines(
        getValue(form, ["AllowableDeductions", "inhome"]) !== false &&
        `Description: ${getValue(form, ["AllowableDeductions", "inhome", "desc"])}. The total yearly expense is ${format(getValueAsNumber(form, ["AllowableDeductions", "inhome", "amount"]), "currency")}.`,
        FIELDS_WIDTH["deductions.inhomeDesc"]
    )
    inhomeDesc.forEach((line, index) => {
        data[`deductions.inhomeDesc-${index + 1}`] = line
    })

    // 5. Retirement mandatory
    data["deductions.retirementMandatory"] = getValue(form, ["AllowableDeductions", "retirement"]) === false ? "no" : "yes"

    // 6. List the other employment-related expenses
    const [otherExpensesTotal, otherExpensesTotalAddendum] = divideIntoLines(
        getValue(form, ["FinancialAffadavitThree", "otherExpenses"]) === "yes" &&
        getValue(form, ["FinancialAffadavitThree", "otherExpensesTotal"]),
        FIELDS_WIDTH["deductions.otherExpensesTotal"]
    )
    otherExpensesTotal.forEach((line, index) => {
        data[`deductions.otherExpensesTotal-${index + 1}`] = line
    })

    // 7. Has a court ordered you to make payments for restitution, damages, etc.? 
    data["deductions.courtOrder"] = getValue(form, ["FinancialAffadavitThree", "courtOrder"])

    let addendum = [
        extmedDescAddendum && 'List yearly expenses and attach proof, continued:\n' + extmedDescAddendum,
        inhomeDescAddendum && 'Please list any necessary expense you pay for in-home nursing care to enable you to work and for whom the expense is paid, continued:\n' + inhomeDescAddendum,
        otherExpensesTotalAddendum && 'List employment related expenses not shown elsewhere, continued:\n' + otherExpensesTotalAddendum,
    ].filter(a => !!a)

    return {
        data,
        addendum: [
            addendum.length > 0 && [
                "E. DEDUCTIONS AND EXPENSES\n\n" +
                addendum
            ]
        ]
    }
}

module.exports = { getAffidavitE }