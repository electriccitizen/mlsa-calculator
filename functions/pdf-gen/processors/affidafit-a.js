var moment = require("moment")
const { getValue, getValueAsArray, getValuesAsString, divideIntoLines } = require("../utils/helpers")

// Static fields width in pixels
const FIELDS_WIDTH = {
    "personal.taxExemptions": [461, 755]
}

// A. PERSONAL INFORMATION
const getAffidavitA = (form) => {
    // Main
    let data = {}

    // Full Name:
    data["persoanl.fullName"] = getValuesAsString(form, [["Primary", "fname"], ["Primary", "lname"]])

    // Home Address:
    data["personal.homeAddress-1"] = getValuesAsString(form, [["Primary", "address"], ["Primary", "address2"]], { separator: "," })
    data["personal.homeAddress-2"] = getValuesAsString(form, [["Primary", "city"], ["Primary", "state"], ["Primary", "zip"]], { separator: "," })

    // Mailing Address:
    data["personal.mailingAddress-1"] =
        getValue(form, ["PrimaryMailing"]) === "yes" ?
            data["personal.homeAddress-1"] :
            getValuesAsString(form, [["PrimaryMailing", "address"], ["PrimaryMailing", "address2"]], { separator: "," })
    data["personal.mailingAddress-2"] =
        getValue(form, ["PrimaryMailing"]) === "yes" ?
            data["personal.homeAddress-2"] :
            getValuesAsString(form, [["PrimaryMailing", "city"], ["PrimaryMailing", "state"], ["PrimaryMailing", "zip"]], { separator: "," })

    // Work Phone No.: 
    data["personal.workPhoneNo"] = "N/A"

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

    // Tax Exemptions
    const [taxExemptions, taxExemptionsAddendum] = divideIntoLines(
        getValue(form, ["FinancialAffadavitOne", "taxExemptions"]),
        FIELDS_WIDTH["personal.taxExemptions"]
    )
    taxExemptions.forEach((line, index) => {
        data[`personal.taxExemptions-${index + 1}`] = line
    })

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

    // List all schools attended following high school.
    let schoolsAddendum = []
    if (getValue(form, ["Schools", "postSecondary"]) === 'yes') {
        const schools = getValueAsArray(form, ["OtherSchools"])
        schools.forEach((school, index) => {
            const schoolIndex = index + 1
            const name = getValue(school, ["name"], "N/A")
            const courseOfStudy = getValue(school, ["courseOfStudy"], "N/A")
            const completionDate = getValue(school, ["grad"]) === "yes" ?
                getValue(school, ["completionDate"], "N/A") : "N/A"
            const degree = getValue(school, ["grad"]) === "yes" ?
                getValue(school, ["degree"], "N/A") : "N/A"

            if (schoolIndex <= 3) {

                // School Name
                data[`personal.school-${schoolIndex}.name`] = name

                // Course of Study
                data[`personal.school-${schoolIndex}.courseOfStudy`] = courseOfStudy

                // Completion Date
                data[`personal.school-${schoolIndex}.completionDate`] = completionDate

                // Degree/Diploma
                data[`personal.school-${schoolIndex}.degree`] = degree
            } else {
                schoolsAddendum.push([
                    `School Name: ${name}`,
                    `Course of study: ${courseOfStudy}`,
                    `Completion date: ${completionDate}`,
                    `Degree/Diploma: ${degree}`
                ])
            }
        })
    }

    if(schoolsAddendum.length > 0) {
        data["personal.schools.addendum"] = "Continued in Financial Affidavit Addendum"
    }

    let addendum = [
        schoolsAddendum.length > 0 && ['Schools, continued:', schoolsAddendum],
        taxExemptionsAddendum && ['List the people you claim as tax exemptions, continued:', taxExemptionsAddendum]
    ].filter(a => !!a)


    return {
        data,
        addendum: [
            ...(addendum.length > 0 ? [
                ['A. PERSONAL INFORMATION'],
                ...addendum
            ] : [])
        ]
    }
}

module.exports = { getAffidavitA }