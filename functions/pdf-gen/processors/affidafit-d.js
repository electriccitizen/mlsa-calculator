const { format, add, sum, multiply } = require("../utils/currency")
const { getValue, getValueAsNumber, getValueAsArray, divideIntoLines } = require("../utils/helpers")
const { calcWages } = require("./income")

// Static fields width in pixels
const FIELDS_WIDTH = {
    "income.cashBenefitsDetails": [93, 736, 736],
    "income.selfEmploymentDesc": [310, 736],
    "income.prizeDesc": [722]
}

// D. INCOME
const getAffidavitD = (form) => {
    // Main
    let data = {}

    // 1. List all income which you receive or have received in the last 12 months.
    // Gross Wages
    data["income.wages"] = calcWages(form, "EmploymentPrimary", "OtherJob")

    // Unemployment
    data["income.unemployment"] = format(getOtherIncome(form, "TaxableIncome", "unemployment"))

    // Workers' Compensation
    data["income.workersCompensation"] = format(getOtherIncome(form, "NonTaxableIncome", "comp"))

    // Social Security Benefits
    data["income.socialSecurityBenefits"] = format(getOtherIncome(form, "NonTaxableIncome", "ssdi"))

    // Retirement
    data["income.retirement"] = format(getValueAsNumber(form, ["OtherIncome", "pension"]))

    // Interest/Dividend Income
    data["income.interestDividend"] = format(getValueAsNumber(form, ["OtherIncome", "interest"]))

    // Reimbursements
    data["income.reimbursements"] = format(getValueAsNumber(form, ["FinancialAffadavitOne", "supportExpense"]))

    // Educational Grants
    data["income.educationalGrants"] = format(getOtherIncome(form, "NonTaxableIncome", "grants"))

    // Public Assistance
    data["income.publicAssistance"] = format(getValueAsNumber(form, ["FinancialAffadavitOne", "publicAssistanceAmt"]))

    // Veterans' Disability
    data["income.veteransDisability"] = format(getOtherIncome(form, "NonTaxableIncome", "va"))

    // Spousal Support
    data["income.spousalSupport"] = format(getOtherIncome(form, "TaxableIncome", "alimony"))

    // Contract Receipts
    data["income.contractReceipts"] = format(getOtherIncome(form, "TaxableIncome", "contract"))

    // Rental Income
    data["income.rentalIncome"] = format(getOtherIncome(form, "TaxableIncome", "rental"))

    // Fringe Benefits/Bonuses
    data["income.fringeBenefitsBonuses"] = add(
        getOtherIncome(form, "NonTaxableIncome", "fringe"),
        getValueAsNumber(form, ["OtherIncome", "bonus"])
    )

    // Profit (Loss) from Self-employment
    data["income.profitSelfEmployment"] = multiply(
        getValueAsNumber(form, ["OtherIncome", "SepEarning", "net"]),
        getValueAsNumber(form, ["OtherIncome", "SepEarning", "schedule"])
    )

    // Other
    data["income.other"] = sum([
        getValueAsNumber(form, ["OtherIncome", "SSN"]),
        getValueAsNumber(form, ["OtherIncome", "unearned"]),
        multiply(
            getValueAsNumber(form, ["OtherIncome", "imputed"]),
            getValueAsNumber(form, ["OtherIncome", "imputedSchedule"])
        ),
        getValueAsNumber(form, ["OtherIncome", "eitc"]),
        getOtherIncome(form, "TaxableIncome", "capitalgains"),
        getOtherIncome(form, "TaxableIncome", "capitalgainshouse"),
        getOtherIncome(form, "TaxableIncome", "scorportation"),
        getOtherIncome(form, "TaxableIncome", "royalties"),
        getOtherIncome(form, "TaxableIncome", "other"),
        getOtherIncome(form, "NonTaxableIncome", "bond"),
        getOtherIncome(form, "NonTaxableIncome", "gifts"),
        getOtherIncome(form, "NonTaxableIncome", "other")
    ])

    // 2. Non-cash benefits
    data["income.cashBenefits"] = getValue(form, ["EmploymentPrimary", "cashBenefits"])

    const [cashBenefitsDetails, cashBenefitsDetailsAddendum] = divideIntoLines(
        data["income.cashBenefits"] === "yes" &&
        `Description: ${getValue(form, ["EmploymentPrimary", "cashBenefitsDetails"])}. The value of the benefit is ${format(getValue(form, ["EmploymentPrimary", "cashBenefitsAmount"]), 'currency')} per year.`,
        FIELDS_WIDTH["income.cashBenefitsDetails"]
    )
    cashBenefitsDetails.forEach((line, index) => {
        data[`income.cashBenefitsDetails-${index + 1}`] = line
    })

    // 3. Self-empployed
    const [selfEmploymentDesc, selfEmploymentDescAddendum] = divideIntoLines(
        getValue(form, ["OtherIncome", "SepEarning", "desc"]),
        FIELDS_WIDTH["income.selfEmploymentDesc"]
    )
    selfEmploymentDesc.forEach((line, index) => {
        data[`income.selfEmploymentDesc-${index + 1}`] = line
    })

    data["income.selfEmploymentHoursPerWeek"] = getValue(form, ["OtherIncome", "SepEarning", "hoursPerWeek"])
    data["income.selfEmploymentPrimarySource"] = getValue(form, ["OtherIncome", "SepEarning", "primary"])

    // 4. Prize, award, settlement, or other one-time payment within the past 12 months
    data["income.prize"] = getValue(form, ["OtherIncome", "prize"]) === false ? "no" : "yes"

    const [prizeDesc, prizeDescAddendum] = divideIntoLines(
        data["income.prize"] === "yes" &&
        `Description: ${getValue(form, ["OtherIncome", "prizeDesc"])}. The value of the benefit is ${format(getValueAsNumber(form, ["OtherIncome", "prize"]), "currency")}.`,
        FIELDS_WIDTH["income.prizeDesc"]
    )
    prizeDesc.forEach((line, index) => {
        data[`income.prizeDesc-${index + 1}`] = line
    })

    let addendum = [
        cashBenefitsDetailsAddendum && 'Describe the non-cash benefit you receive, how often you receive it, and the value of the benefit, continued:\n ' + cashBenefitsDetailsAddendum,
        selfEmploymentDescAddendum && 'Describe your self-employment activities, continued:\n ' + selfEmploymentDescAddendum,
        prizeDescAddendum && 'Describe the payment, including the amount and its present location and value, continued:\n ' + prizeDescAddendum,
    ].filter(a => !!a)

    return {
        data,
        addendum: [
            addendum.length > 0 && [
                "D. INCOME\n\n" + 
                addendum
            ]
        ]
    }
}

// Helpers
const getOtherIncome = (form, key, type) => {
    return getValueAsNumber(
        getValueAsArray(form, key).find(income => getValue(income, ["type"]) === type),
        ["amt"]
    )
}

module.exports = { getAffidavitD }