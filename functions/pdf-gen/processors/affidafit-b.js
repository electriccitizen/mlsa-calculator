var moment = require("moment")
const { format, subtract } = require("../utils/currency")
const { getValue, getValueAsArray, getValueAsNumber, getValuesAsString, divideIntoLines } = require("../utils/helpers")

// Static fields width in pixels
const FIELDS_WIDTH = {
    "children.insuranceOngoingDesc": [194, 733, 733, 733],
}

 // B. CHILDREN
const getAffidavitB = (form) => {
    // Main
    let data = {}

    const primaryChildren = getValueAsArray(form, ["PrimaryChildren"])
    const otherChildren = getValueAsArray(form, ["OtherChildren"])

    // 1. List all of your natural and adopted children (do not include stepchildren) // TODO add to addendum
    primaryChildren.forEach((child, index) => {
        const childIndex = index + 1
        // Child's Full Name
        data[`children.list.child-${childIndex}.name`] = getValuesAsString(child, [["fname"], ["lname"]])

        // Date of Birth Month/Day/Year
        const dob = getValue(child, ["dob"])
        data[`children.list.child-${childIndex}.dob`] = dob && moment(dob).format('MMMM D, YYYY')

        // Who does child live with?
        const housing = getValue(form, ["ChildExpenses", index, "housing"])
        data[`children.list.child-${childIndex}.housing`] =
            housing === 'me' ?
                getValuesAsString(form, [["Primary", "fname"], ["Primary", "lname"]]) :
                housing === 'otherparent' ?
                    getValuesAsString(form, [["OtherParent", "fname"], ["OtherParent", "lname"]]) :
                    housing === 'split' ?
                        "Both parents" :
                        getValue(form, ["ChildExpenses", index, "otherHousing"])

        // Are you ordered to pay support for this child?
        data[`children.list.child-${childIndex}.support`] = getValue(form, ["ChildExpenses", index, "support"])
        data[`children.list.child-${childIndex}.supportAmount`] = format(getValueAsNumber(form, ["ChildExpenses", index, "childSupportAmount"]))
    })

    otherChildren.forEach((child, index) => {
        const childIndex = index + 1 + primaryChildren.length
        // Child's Full Name
        data[`children.list.child-${childIndex}.name`] = getValuesAsString(child, [["fname"], ["lname"]])

        // Date of Birth Month/Day/Year
        const dob = getValue(child, ["dob"])
        data[`children.list.child-${childIndex}.dob`] = dob && moment(dob).format('MMMM D, YYYY')

        // Who does child live with?
        const housing = getValue(form, ["ChildExpenses", index, "housing"])
        data[`children.list.child-${childIndex}.housing`] =
            housing === 'me' ?
                getValuesAsString(form, [["Primary", "fname"], ["Primary", "lname"]]) :
                housing === 'otherparent' ?
                    "Other parent" :
                    housing === 'split' ?
                        "Both parents" :
                        getValue(child, ["otherHousing"])

        // Are you ordered to pay support for this child?
        data[`children.list.child-${childIndex}.support`] = getValue(child, ["support"])
        data[`children.list.child-${childIndex}.supportAmount`] = format(getValueAsNumber(child, ["childSupportAmount"]))
    })

    // 2. Complete the table below for all expenses you pay and benefits you receive on behalf of all children shown in the previous table. // TODO add to addendum
    primaryChildren.forEach((child, index) => {
        const childIndex = index + 1
        // Child's First Name
        data[`children.expenses.child-${childIndex}.firstName`] = getValue(child, ["fname"])

        // Annual Day Care Costs
        data[`children.expenses.child-${childIndex}.dayCareCosts`] = format(getValueAsNumber(form, ["ChildExpenses", index, "childCareCost"]))

        // Annual Unreimbursed Medical Expenses
        data[`children.expenses.child-${childIndex}.unreimbursedMedicalExpenses`] = format(getValueAsNumber(form, ["ChildExpenses", index, "medicalExpense"]))

        // Annual Dependent's Benefits Received
        data[`children.expenses.child-${childIndex}.dependentsBenefits`] = format(getValueAsNumber(form, ["ChildExpenses", index, "benefits"]))

        // How many days does child spend with you per year?
        data[`children.expenses.child-${childIndex}.days`] =
            getValue(form, ["ParentingDays", "primary"]) === "me" ?
                getValueAsNumber(form, ["ParentingDays", "children", index, "amount"]) :
                365 - getValueAsNumber(form, ["ParentingDays", "children", index, "amount"])

        // Annual Miles Driven for Long Distance Parenting
        data[`children.expenses.child-${childIndex}.mileage`] =
            index === 0 &&
            getValueAsNumber(form, ["StandardOfLiving", "mileage", "distance"])

        // Other Transportation Costs for Long Distance Parenting
        data[`children.expenses.child-${childIndex}.otherTransportationCosts`] =
            index === 0 &&
            getValueAsNumber(form, ["StandardOfLiving", "transportation", "othercost"])
    })

    otherChildren.forEach((child, index) => {
        const childIndex = index + 1 + primaryChildren.length
        // Child's First Name
        data[`children.expenses.child-${childIndex}.firstName`] = getValue(child, ["fname"])

        // Annual Day Care Costs
        data[`children.expenses.child-${childIndex}.dayCareCosts`] = format(getValueAsNumber(form, ["OtherChildren", index, "depcareAmount"]))

        // Annual Unreimbursed Medical Expenses
        data[`children.expenses.child-${childIndex}.unreimbursedMedicalExpenses`] = format(getValueAsNumber(form, ["OtherChildren", index, "medicalAmount"]))

        // Annual Dependent's Benefits Received
        data[`children.expenses.child-${childIndex}.dependentsBenefits`] = format(getValueAsNumber(form, ["OtherChildren", index, "benefits"]))

        // How many days does child spend with you per year?
        data[`children.expenses.child-${childIndex}.days`] = "N/A"

        // Annual Miles Driven for Long Distance Parenting
        data[`children.expenses.child-${childIndex}.mileage`] = "N/A"

        // Other Transportation Costs for Long Distance Parenting
        data[`children.expenses.child-${childIndex}.otherTransportationCosts`] = "N/A"
    })

    // 3. Do you receive reimbursement for day care expenses?
    data["children.daycare"] = getValue(form, ["FinancialAffadavitOne", "daycare"])
    data["children.daycareExpense"] = getValue(form, ["FinancialAffadavitOne", "daycareExpense"])

    // 4. The ongoing medical expenses.
    const [insuranceOngoingDesc, insuranceOngoingDescAddendum] = divideIntoLines(
        getValue(form, ["Insurance", "ongoing"]) === 'yes' &&
        getValue(form, ["Insurance", "ongoingDesc"]),
        FIELDS_WIDTH["children.insuranceOngoingDesc"]
    )
    insuranceOngoingDesc.forEach((line, index) => {
        data[`children.insuranceOngoingDesc-${index + 1}`] = line
    })
    // 5. Do you have health insurance available to you through employment or other group?
    data["children.insuranceCurrent"] = getValue(form, ["Insurance", "current"])

    // Name everyone who is covered by this policy:  // TODO add to addendum
    data["children.insurancePolicies.covered"] = getValue(form, ["HealthInsurancePolicies", "0", "covered"])

    // Insurance Co. Name:
    data["children.insurancePolicies.company"] = getValue(form, ["HealthInsurancePolicies", "0", "company"])

    // Address:
    data["children.insurancePolicies.address-1"] = getValuesAsString(form, [
        ["HealthInsurancePolicies", "0", "address"],
        ["HealthInsurancePolicies", "0", "address2"]
    ], { separator: "," })
    data["children.insurancePolicies.address-2"] = getValuesAsString(form, [
        ["HealthInsurancePolicies", "0", "city"],
        ["HealthInsurancePolicies", "0", "state"],
        ["HealthInsurancePolicies", "0", "zip"]
    ], { separator: "," })

    // Policy Number:
    data["children.insurancePolicies.policyNumber"] = getValue(form, ["HealthInsurancePolicies", "0", "policyNumber"])

    // Certificate Number:
    data["children.insurancePolicies.certNumber"] = getValue(form, ["HealthInsurancePolicies", "0", "certNumber"])

    // Total cost of health insurance premium per month, including your children.
    data["children.insurancePolicies.totalCost"] = format(getValueAsNumber(form, ["HealthInsurancePolicies", "0", "totalCost"]))

    // Adult's portion of premium.
    data["children.insurancePolicies.adultPortion"] = subtract(
        getValueAsNumber(form, ["HealthInsurancePolicies", "0", "totalCost"]),
        getValueAsNumber(form, ["HealthInsurancePolicies", "0", "childPortion"]),
    )

    // Child(ren)'s portion of premium.
    data["children.insurancePolicies.childPortion"] = format(getValueAsNumber(form, ["HealthInsurancePolicies", "0", "childPortion"]))

    // Portion of premium to be paid by you each month.
    data["children.insurancePolicies.portionYou"] = subtract(
        getValueAsNumber(form, ["HealthInsurancePolicies", "0", "totalCost"]),
        getValueAsNumber(form, ["HealthInsurancePolicies", "0", "groupPortion"]),
    )

    // Portion of premium to be paid by employer or other group each month.
    data["children.insurancePolicies.portionEmployer"] = format(getValueAsNumber(form, ["HealthInsurancePolicies", "0", "groupPortion"]))

    let addendum = [
        insuranceOngoingDescAddendum && 'If any of the children listed above have ongoing medical expenses, please describe, continued:\n' + insuranceOngoingDescAddendum
    ].filter(a => !!a)

    return {
        data,
        addendum: [
            addendum.length > 0 && [
                'B. CHILDREN\n\n' +
                addendum
            ]
        ]
    }
}

module.exports = { getAffidavitB }