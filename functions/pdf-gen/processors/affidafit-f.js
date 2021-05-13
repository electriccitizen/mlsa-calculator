const { getValue, divideIntoLines } = require("../utils/helpers")

// Static fields width in pixels
const FIELDS_WIDTH = {
    "anticipatedChanges": [437, 729],
    "additionalComments": [357, 729, 729, 729, 729]
}

// F. ANTICIPATED CHANGES / ADDITIONAL COMMENTS
const getAffidavitF = (form) => {
    // Main
    let data = {}

    // 1. Anticipated Changes
    const [anticipatedChanges, anticipatedChangesAddendum] = divideIntoLines(
        getValue(form, ["FinancialAffadavitThree", "expectedChanges"]) === "yes" &&
        getValue(form, ["FinancialAffadavitThree", "expectedChangesDesc"]),
        FIELDS_WIDTH["anticipatedChanges"]
    )
    anticipatedChanges.forEach((line, index) => {
        data[`anticipatedChanges-${index + 1}`] = line
    })

    // 2. Additional Comments
    const [additionalComments, additionalCommentsAddendum] = divideIntoLines(
        getValue(form, ["FinancialAffadavitThree", "comments"]) === "yes" &&
        getValue(form, ["FinancialAffadavitThree", "commentsDesc"]),
        FIELDS_WIDTH["additionalComments"]
    )
    additionalComments.forEach((line, index) => {
        data[`additionalComments-${index + 1}`] = line
    })

    let addendum = [
        anticipatedChangesAddendum && ["1. Please list any changes you expect in your or your child(ren)'s circumstances during the next 18 months which would affect the calculation of child support, continued:", anticipatedChangesAddendum],
        additionalCommentsAddendum && ["2. Additional Comments (a separate sheet may be attached), continued:", additionalCommentsAddendum]
    ].filter(a => !!a)

    return {
        data,
        addendum: [
            ...(addendum.length > 0 ? [
                ["F. ANTICIPATED CHANGES / ADDITIONAL COMMENTS"],
                ...addendum
            ] : [])
        ]
    }
}

module.exports = { getAffidavitF }