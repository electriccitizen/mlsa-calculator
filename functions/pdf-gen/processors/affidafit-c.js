var moment = require("moment")
const { format } = require("../utils/currency")
const { getValue, getValueAsNumber, getValuesAsString, divideIntoLines } = require("../utils/helpers")

// Static fields width in pixels
const FIELDS_WIDTH = {
    "employment.employers.name": [309, 309],
    "employment.info": [341, 731, 731, 731],
    "employment.unionInfo": [731, 731, 731],
    "employment.workReasonDesc": [322, 730],
    "employment.workersCompDesc": [322],
    "employment.unemploymentBenefitsDesc": [387, 717],
    "employment.effortsDescNo": [627, 720],
    "employment.effortsDescYes": [522, 720],
}

// C. EMPLOYMENT
const getAffidavitC = (form) => {
    // Main
    let data = {}

    // 1. List your current or most recent employer(s) first and your past two employers:
    // Employer's Name, Address, and Telephone Number
    const [employer] = divideIntoLines(
        getValuesAsString(form, [
            ["EmploymentPrimary", "employer", "name"],
            ["EmploymentPrimary", "employer", "address"],
            ["EmploymentPrimary", "employer", "address2"],
            ["EmploymentPrimary", "employer", "city"],
            ["EmploymentPrimary", "employer", "state"],
            ["EmploymentPrimary", "employer", "zip"],
            ["EmploymentPrimary", "employer", "phone"],
        ], { separator: "," }),
        FIELDS_WIDTH["employment.employers.name"]
    )
    employer.forEach((line, index) => {
        data[`employment.employers-1.name-${index + 1}`] = line
    })

    // Dates of Employment
    const employmentDateFrom = getValue(form, ["EmploymentPrimary", "start"])
    const employmentDateTo = getValue(form, ["EmploymentPrimary", "end"])
    data['employment.employers-1.dateFrom'] = employmentDateFrom && moment(employmentDateFrom).format('LL')
    data['employment.employers-1.dateTo'] = employmentDateTo && moment(employmentDateTo).format('LL')

    // Average Hours Worked and Current or Ending Pay
    data['employment.employers-1.hours'] = getValue(form, ["EmploymentPrimary", "hoursPerWeek"])
    data['employment.employers-1.payhour'] = format(getValueAsNumber(form, ["EmploymentPrimary", "grossAmount"]))

    // Type of job
    data['employment.employers-1.type'] = (getValue(form, ["EmploymentPrimary", "type"], "")[0] || "").toUpperCase()

    // 2. Kinds of work
    const [kindsOfWork, kindsOfWorkAddendum] = divideIntoLines(
        getValue(form, ["EmploymentPrimary", "info"]),
        FIELDS_WIDTH["employment.info"]
    )
    kindsOfWork.forEach((line, index) => {
        data[`employment.info-${index + 1}`] = line
    })

    // 3. Union
    data['employment.union'] = getValue(form, ["EmploymentPrimary", "union"])

    const [union, unionAddendum] = divideIntoLines(
        data['employment.union'] === "yes" &&
        `${getValuesAsString(form, [
            ["EmploymentPrimary", "unionName"],
            ["EmploymentPrimary", "unionAddress", "address"],
            ["EmploymentPrimary", "unionAddress", "address2"],
            ["EmploymentPrimary", "unionAddress", "city"],
            ["EmploymentPrimary", "unionAddress", "state"],
            ["EmploymentPrimary", "unionAddress", "zip"],
            ["EmploymentPrimary", "unionDues"]
        ], { separator: "," })}
            Monthly dues: ${format(getValueAsNumber(form,), "currency")}`,
        FIELDS_WIDTH["employment.unionInfo"]
    )
    union.forEach((line, index) => {
        data[`employment.unionInfo-${index + 1}`] = line
    })

    // 4. Are you currently a student?
    data["employment.student"] = getValue(form, ["Schools", "current"])

    // Date of graduation
    const dateOfGraduation = getValue(form, ["Schools", "dateOfGraduation"])
    data["employment.dateOfGraduation"] = dateOfGraduation && moment(dateOfGraduation).format('LL')

    // 5. Work reason
    data["employment.workReason"] = getValue(form, ["FinancialAffadavitTwo", "workReason"])

    const [workReasonDesc, workReasonDescAddendum] = divideIntoLines(
        getValue(form, ["FinancialAffadavitTwo", "workReasonDesc"]),
        FIELDS_WIDTH["employment.workReasonDesc"]
    )
    workReasonDesc.forEach((line, index) => {
        data[`employment.workReasonDesc-${index + 1}`] = line
    })

    // 6. Workers' compensation
    data["employment.workersComp"] = getValue(form, ["FinancialAffadavitTwo", "workersComp"])
    data["employment.seekingComp"] = getValue(form, ["FinancialAffadavitTwo", "seekingComp"])
    const [workersCompDesc, workersCompDescAddendum] = divideIntoLines(
        data["employment.workersComp"] === 'yes' &&
        `${getValue(form, ["FinancialAffadavitTwo", "workersCompPayment"])}, Claim number: ${getValue(form, ["FinancialAffadavitTwo", "workersCompClaimNum"], "N/A")}`,
        FIELDS_WIDTH["employment.workersCompDesc"]
    )
    workersCompDesc.forEach((line, index) => {
        data[`employment.workersCompDesc-${index + 1}`] = line
    })

    // 7. Unemployment benefits
    data["employment.unemploymentBenefits"] = getValue(form, ["FinancialAffadavitTwo", "unemployment"])

    const [unemploymentBenefitsDesc, unemploymentBenefitsDescAddendum] = divideIntoLines(
        getValue(form, ["FinancialAffadavitTwo", "unemploymentDesc"]),
        FIELDS_WIDTH["employment.unemploymentBenefitsDesc"]
    )
    unemploymentBenefitsDesc.forEach((line, index) => {
        data[`employment.unemploymentBenefitsDesc-${index + 1}`] = line
    })

    // 8. Employment efforts
    data["employment.efforts"] = getValue(form, ["FinancialAffadavitTwo", "employmentEfforts"])

    const [effortsDescNo, effortsDescNoAddendum] = divideIntoLines(
        data["employment.efforts"] === 'no' &&
        getValue(form, ["FinancialAffadavitTwo", "employmentEffortsDesc"]),
        FIELDS_WIDTH["employment.effortsDescNo"]
    )
    effortsDescNo.forEach((line, index) => {
        data[`employment.effortsDescNo-${index + 1}`] = line
    })

    const [effortsDescYes, effortsDescYesAddendum] = divideIntoLines(
        data["employment.efforts"] === 'yes' &&
        getValue(form, ["FinancialAffadavitTwo", "employmentEffortsDesc"]),
        FIELDS_WIDTH["employment.effortsDescYes"]
    )
    effortsDescYes.forEach((line, index) => {
        data[`employment.effortsDescYes-${index + 1}`] = line
    })

    let addendum = [
        kindsOfWorkAddendum && ['2. Kinds of work do you/did you do for your employer(s), continued:', kindsOfWorkAddendum],
        unionAddendum && ['3. Name of union local, address, and amount of monthly dues, continued', unionAddendum],
        workReasonDescAddendum && ['5. Please explain and provide astatement from your doctor or the Social Security Administration, continued:', workReasonDescAddendum],
        workersCompDescAddendum && ['6. who pays those benefits and what is your claim number, continued:', workersCompDescAddendum],
        unemploymentBenefitsDescAddendum && ['7. Name of state or agency paying those benefits, continued:', unemploymentBenefitsDescAddendum],
        effortsDescNoAddendum && ['8. Why not, continued:', effortsDescNoAddendum],
        effortsDescYesAddendum && ['8. Describe your job search, continued:', effortsDescYesAddendum],
    ].filter(a => !!a)

    return {
        data,
        addendum: [
            ...(addendum.length > 0 ? [
                ["C. EMPLOYMENT"],
                ...addendum
            ] : [])
        ]
    }
}

module.exports = { getAffidavitC }