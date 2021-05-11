const { getValue } = require('./helpers')

// All labels used on the front
const getLabel = (value) => {
    const labels = [
        {
            value: "rental",
            label: "Rental income"
        },
        {
            value: "capitalgains",
            label: "Capital gains"
        },
        {
            value: "capitalgainshouse",
            label: "Capital gains on the sale of primary residence"
        },
        {
            value: "unemployment",
            label: "Unemployment benefits"
        },
        {
            value: "scorportation",
            label: "S Corporation"
        },
        {
            value: "alimony",
            label: "Spousal support (alimony)"
        },
        {
            value: "contract",
            label: "Contract receipts"
        },
        {
            value: "royalties",
            label: "Royalties"
        },
        {
            value: "other",
            label: "Other"
        },
        {
            value: "sep",
            label: "Self-employment [Schedules C and F (Form 1040) and Partnerships (Form 1065), but not S corps (Form 1120S). Enter S corps as Other Taxable Income.",
        },
        {
            value: "pension",
            label: "Pensions, retirement"
        },
        {
            value: "social",
            label: "Social Security Retirement Income (not Disability Income or Supplemental Income)",
        },
        {
            value: "interest",
            label: "Interest/Dividends"
        },
        {
            value: "unearned",
            label: "Other unearned income"
        },
        {
            value: "imputed",
            label: "Imputed income"
        },
        {
            value: "eitc",
            label: "Earned Income Tax Credit (EITC)"
        },
        {
            value: "prize",
            label: "Prize, award, settlement, or other one-time payment within the past 12 months",
        },
        {
            value: "bonus",
            label: "Bonus"
        },
        {
            value: "taxable",
            label: " Other taxable income"
        },
        {
            value: "nontaxable",
            label: " Other non-taxable income"
        },
        {
            value: "none",
            label: "None of the above"
        },
        {
            value: "total",
            label: "Total"
        },
        {
            value: "bond",
            label: "Tax free municipal bond"
        },
        {
            value: "ssdi",
            label: "Social Security Disability Income (SSDI)",
        },
        {
            value: "va",
            label: "VA disability income"
        },
        {
            value: "comp",
            label: "Workers' Compensation"
        },
        {
            value: "gifts",
            label: "Regular monetary gifts"
        },
        {
            value: "grants",
            label: "Educations grants"
        },
        {
            value: "fringe",
            label: "Fringe benefits"
        },
        {
            value: "other",
            label: "Other"
        },
        {
            value: "52",
            label: "Once per week"
        },
        {
            value: "26",
            label: "Every two weeks"
        },
        {
            value: "24",
            label: "Twice a month"
        },
        {
            value: "12",
            label: "Once per month"
        },
        {
            value: "1",
            label: "Yearly"
        },
    ]

    return getValue(labels.find(label => label.value === value), ["label"], "")
}

module.exports = { getLabel }