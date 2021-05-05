var moment = require("moment")
const { format } = require("../utils/currency")
const { getValue, getValueAsArray, getValueAsNumber } = require("../utils/helpers")

const getAffidavit = (form) => {
    // Main
    let data = {}

    // A. PERSONAL INFORMATION
    // Full Name:
    data["persoanl.fullName"] = `${getValue(form, ["Primary", "fname"], "")} ${getValue(form, ["Primary", "lname"], "")}`

    // Home Address:
    data["personal.homeAddress-1"] = `${getValue(form, ["Primary", "address"], "")} ${getValue(form, ["Primary", "address2"], "")}`
    data["personal.homeAddress-2"] = `${getValue(form, ["Primary", "city"], "")}, ${getValue(form, ["Primary", "state"], "")} ${getValue(form, ["Primary", "zip"], "")}`

    // Mailing Address:
    data["personal.mailingAddress-1"] =
        getValue(form, ["PrimaryMailing"]) === "yes" ?
            data["personal.homeAddress-1"] :
            `${getValue(form, ["PrimaryMailing", "address"], "")} ${getValue(form, ["PrimaryMailing", "address2"], "")}`
    data["personal.mailingAddress-2"] =
        getValue(form, ["PrimaryMailing"]) === "yes" ?
            data["personal.homeAddress-2"] :
            `${getValue(form, ["PrimaryMailing", "city2"], "")}, ${getValue(form, ["PrimaryMailing", "state2"], "")} ${getValue(form, ["PrimaryMailing", "zip2"], "")}`

    // Work Phone No.: 
    data["personal.workPhoneNo"] = "N/A" // TODO

    // Home/Cell No.: 
    data["personal.homeCellNo"] = getValue(form, ["Primary", "phone"], "N/A")

    // Date of Birth:
    const dateOfBirth = getValue(form, ["Primary", "dob"], "N/A")
    data["personal.dateOfBirth"] = dateOfBirth !== "N/A" && moment(dateOfBirth).format('LL')

    // Case Number:
    data["personal.caseNumber"] = getValue(form, ["CSED"], "N/A")

    // Driver's License No.:
    data["personal.driversLicenseNo"] = getValue(form, ["Primary", "dl"], "N/A")

    // Tax filing status
    data["personal.taxStatus"] = getValue(form, ["FinancialAffadavitOne", "taxStatus"])

    // Tax Exemptions //TODO
    data["personal.taxExemptions-1"] = getValue(form, ["FinancialAffadavitOne", "taxExemptions"]).slice(0, 80)
    data["personal.taxExemptions-2"] = getValue(form, ["FinancialAffadavitOne", "taxExemptions"]).slice(81, 215)

    // Spouse income
    data["personal.spouseIncome"] =
        data["personal.taxStatus"] === "marriedjoint" ?
            getValue(form, ["FinancialAffadavitOne", "spouseIncome"], "N/A") :
            "N/A"

    // High school
    data["personal.highSchool"] = getValue(form, ["Schools", "level"], "N/A")

    // Highest grade completed
    data["personal.highestGradeCompleted"] =
        data["personal.highSchool"] === "no" ?
            getValue(form, ["School", "lastYearCompleted"]) :
            "N/A"

    // Other schools
    if (getValue(form, ["Schools", "postSecondary"]) === 'yes') {
        const schools = getValueAsArray(form, ["OtherSchools"])

        schools.forEach((school, index) => {
            // School Name
            data[`personal.school-${index + 1}.name`] = getValue(school, ["name"], "N/A")

            // Course of Study
            data[`personal.school-${index + 1}.courseOfStudy`] = getValue(school, ["courseOfStudy"], "N/A")

            // Completion Date
            data[`personal.school-${index + 1}.completionDate`] =
                getValue(school, ["grad"]) === "yes" ?
                    getValue(school, ["completionDate"], "N/A") :
                    "N/A"

            // Degree/Diploma
            data[`personal.school-${index + 1}.degree`] = getValue(school, ["degree"], "N/A")
        })
    }

    // B. CHILDREN
    // List all of your natural and adopted children (do not include stepchildren)
    const primaryChildren = getValueAsArray(form, ["PrimaryChildren"])
    const primaryChildrenExpenses = getValueAsArray(form, ["ChildExpenses"])
    const otherChildren = getValueAsArray(form, ["OtherChildren"])
    const children = [
        ...primaryChildren.map((child, index) => ({ ...child, ...primaryChildrenExpenses[index] })),
        ...otherChildren
    ]

    children.forEach((child, index) => {
        // Child's Full Name
        data[`children.list.child-${index + 1}.name`] = `${getValue(child, ["fname"], "")} ${getValue(child, ["lname"])}`

        // Date of Birth Month/Day/Year
        const dob = getValue(child, ["dob"])
        data[`children.list.child-${index + 1}.dob`] = dob ? moment(dob).format('MMMM D, YYYY') : "N/A"

        // Who does child live with?
        const housing = getValue(child, ["housing"])
        data[`children.list.child-${index + 1}.housing`] =
            housing === 'me' ?
                `${getValue(form, ["Primary", "fname"], "")} ${getValue(form, ["Primary", "lname"], "")}` :
                housing === 'otherparent' ?
                    `${getValue(form, ["OtherParent", "fname"], "")} ${getValue(form, ["OtherParent", "lname"], "")}` :
                    housing === 'split' ?
                        "Both parents" :
                        getValue(child, ["otherHousing"], "N/A")

        // Are you ordered to pay support for this child?
        data[`children.list.child-${index + 1}.support`] = getValue(child, ["support"])
        data[`children.list.child-${index + 1}.supportAmount`] = format(getValueAsNumber(child, ["childSupportAmount"]))
    })

    return data
}

module.exports = { getAffidavit }