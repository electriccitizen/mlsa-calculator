var moment = require("moment")
const { format, subtract } = require("../utils/currency")
const { getValue, getValueAsArray, getValueAsNumber, getValuesAsString } = require("../utils/helpers")

const getAffidavit = (form) => {
    // Main
    let data = {}

    // A. PERSONAL INFORMATION
    // Full Name:
    data["persoanl.fullName"] = getValuesAsString(form, [["Primary", "fname"], ["Primary", "lname"]])

    // Home Address:
    data["personal.homeAddress-1"] = getValuesAsString(form, [["Primary", "address"], ["Primary", "address2"]])
    data["personal.homeAddress-2"] = getValuesAsString(form, [["Primary", "city"], ["Primary", "state"], ["Primary", "zip"]])

    // Mailing Address:
    data["personal.mailingAddress-1"] =
        getValue(form, ["PrimaryMailing"]) === "yes" ?
            data["personal.homeAddress-1"] :
            getValuesAsString(form, [["PrimaryMailing", "address"], ["PrimaryMailing", "address2"]])
    data["personal.mailingAddress-2"] =
        getValue(form, ["PrimaryMailing"]) === "yes" ?
            data["personal.homeAddress-2"] :
            getValuesAsString(form, [["PrimaryMailing", "city"], ["PrimaryMailing", "state"], ["PrimaryMailing", "zip"]])

    // Work Phone No.: 
    data["personal.workPhoneNo"] = "N/A" // TODO verify

    // Home/Cell No.: 
    data["personal.homeCellNo"] = getValue(form, ["Primary", "phone"])

    // Date of Birth:
    const dateOfBirth = getValue(form, ["Primary", "dob"])
    data["personal.dateOfBirth"] = dateOfBirth && moment(dateOfBirth).format('LL')

    // Case Number:
    data["personal.caseNumber"] = getValue(form, ["CSED"])

    // Driver's License No.:
    data["personal.driversLicenseNo"] = getValue(form, ["Primary", "dl"])

    // Tax filing status
    data["personal.taxStatus"] = getValue(form, ["FinancialAffadavitOne", "taxStatus"])

    // Tax Exemptions //TODO add multiline
    data["personal.taxExemptions-1"] = getValue(form, ["FinancialAffadavitOne", "taxExemptions"])

    // Spouse income
    data["personal.spouseIncome"] =
        data["personal.taxStatus"] === "marriedjoint" &&
        getValue(form, ["FinancialAffadavitOne", "spouseIncome"])

    // High school
    data["personal.highSchool"] = getValue(form, ["Schools", "level"])

    // Highest grade completed
    data["personal.highestGradeCompleted"] =
        data["personal.highSchool"] === "no" &&
        getValue(form, ["School", "lastYearCompleted"])

    // List all schools attended following high school. // TODO add to addendum
    if (getValue(form, ["Schools", "postSecondary"]) === 'yes') {
        const schools = getValueAsArray(form, ["OtherSchools"])
        schools.forEach((school, index) => {
            const schoolIndex = index + 1
            // School Name
            data[`personal.school-${schoolIndex}.name`] = getValue(school, ["name"])

            // Course of Study
            data[`personal.school-${schoolIndex}.courseOfStudy`] = getValue(school, ["courseOfStudy"])

            // Completion Date
            data[`personal.school-${schoolIndex}.completionDate`] =
                getValue(school, ["grad"]) === "yes" &&
                getValue(school, ["completionDate"])

            // Degree/Diploma
            data[`personal.school-${schoolIndex}.degree`] = getValue(school, ["degree"])
        })
    }

    // B. CHILDREN
    const primaryChildren = getValueAsArray(form, ["PrimaryChildren"])
    const otherChildren = getValueAsArray(form, ["OtherChildren"])

    // List all of your natural and adopted children (do not include stepchildren) // TODO add to addendum
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

    // Complete the table below for all expenses you pay and benefits you receive on behalf of all children shown in the previous table. // TODO add to addendum
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

    // Do you receive reimbursement for day care expenses?
    data["children.daycare"] = getValue(form, ["FinancialAffadavitOne", "daycare"])
    data["children.daycareExpense"] = getValue(form, ["FinancialAffadavitOne", "daycareExpense"])

    // The ongoing medical expenses. //TODO add multiline
    data["children.insuranceOngoingDesc"] =
        getValue(form, ["Insurance", "ongoing"]) === 'yes' &&
        getValue(form, ["Insurance", "ongoingDesc"])

    // Do you have health insurance available to you through employment or other group?
    data["children.insuranceCurrent"] = getValue(form, ["Insurance", "current"])

    // Name everyone who is covered by this policy:  // TODO add to addendum
    data["children.insurancePolicies.covered"] = getValue(form, ["HealthInsurancePolicies", "0", "covered"])

    // Insurance Co. Name:
    data["children.insurancePolicies.company"] = getValue(form, ["HealthInsurancePolicies", "0", "company"])

    // Address:
    data["children.insurancePolicies.address-1"] = getValuesAsString(form, [["HealthInsurancePolicies", "0", "address"], ["HealthInsurancePolicies", "0", "address2"]])
    data["children.insurancePolicies.address-2"] = getValuesAsString(form, [["HealthInsurancePolicies", "0", "city"], ["HealthInsurancePolicies", "0", "state"], ["HealthInsurancePolicies", "0", "zip"]])

    // Policy Number:
    data["children.insurancePolicies.policyNumber"] = getValue(form, ["HealthInsurancePolicies", "0", "policyNumber"])

    // Certificate Number:
    data["children.insurancePolicies.certNumber"] = getValue(form, ["HealthInsurancePolicies", "0", "certNumber"])

    // Total cost of health insurance premium per month, including your children.
    data["children.insurancePolicies.totalCost"] = format(getValueAsNumber(form, ["HealthInsurancePolicies", "0", "totalCost"]))

    // Adult's portion of premium.
    data["children.insurancePolicies.adultPortion"] = format(subtract(
        getValueAsNumber(form, ["HealthInsurancePolicies", "0", "totalCost"]),
        getValueAsNumber(form, ["HealthInsurancePolicies", "0", "childPortion"]),
    ))

    // Child(ren)'s portion of premium.
    data["children.insurancePolicies.childPortion"] = format(getValueAsNumber(form, ["HealthInsurancePolicies", "0", "childPortion"]))

    // Portion of premium to be paid by you each month.
    data["children.insurancePolicies.portionYou"] = format(subtract(
        getValueAsNumber(form, ["HealthInsurancePolicies", "0", "totalCost"]),
        getValueAsNumber(form, ["HealthInsurancePolicies", "0", "groupPortion"]),
    ))

    //Portion of premium to be paid by employer or other group each month.
    data["children.insurancePolicies.portionEmployer"] = format(getValueAsNumber(form, ["HealthInsurancePolicies", "0", "groupPortion"]))

    return Object.keys(data).reduce((acc, key) => {
        return {
            ...acc,
            [key]: (
                data[key] === undefined ||
                data[key] === null ||
                data[key] === false ||
                (typeof data[key] === "string" && !!!data[key].trim().length)
            ) ?
                "N/A" :
                data[key]
        }
    }, {})
}

module.exports = { getAffidavit }