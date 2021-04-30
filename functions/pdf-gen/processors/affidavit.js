var moment = require("moment")

const { getValue } = require("../utils/helpers")

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
    data["personal.workPhoneNo"] = getValue(form, ["EmploymentPrimary", "phone"], "N/A")

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

    return data
}

module.exports = { getAffidavit }