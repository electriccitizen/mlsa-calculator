var moment = require("moment")
var pixelWidth = require('string-pixel-width')
const { format, subtract, add, sum, multiply } = require("../utils/currency")
const { getValue, getValueAsArray, getValueAsNumber, getValuesAsString } = require("../utils/helpers")
const { getLabel } = require("../utils/labels")
const { calcWages } = require("./income")

// Static fields width in pixels
const FIELDS_WIDTH = {
    "personal.taxExemptions": [510, 830],
    "children.insuranceOngoingDesc": [220, 815, 815, 815],
    "employment.employers.name": [340, 340],
    "employment.info": [375, 805, 805, 805],
    "employment.workReasonDesc": [355, 800],
    "employment.unemploymentBenefitsDesc": [425, 800],
    "employment.effortsDescNo": [690, 800],
    "employment.effortsDescYes": [575, 800],
    "income.cashBenefitsDetails": [105, 850, 850],
    "income.selfEmploymentDesc": [355, 850],
    "income.prizeDesc": [830],
    "deductions.extmedDesc": [510],
    "deductions.inhomeDesc": [760],
    "deductions.otherExpensesTotal": [415, 840],
    "anticipatedChanges": [500, 840],
    "additionalComments": [400, 840, 840, 840, 840]
}

const getAffidavit = (form) => {
    // Main
    let data = {}

    // A. PERSONAL INFORMATION
    // Full Name:
    data["persoanl.fullName"] = getValuesAsString(form, [["Primary", "fname"], ["Primary", "lname"]])

    // Home Address:
    data["personal.homeAddress-1"] = getValuesAsString(form, [["Primary", "address"], ["Primary", "address2"]]), { separator: "," }
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
    const [taxExemptions] = divideIntoLines(
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
    const [insuranceOngoingDesc] = divideIntoLines(
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

    // C. EMPLOYMENT
    // 1. List your current or most recent employer(s) first and your past two employers: //TODO add to addendum
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
    const [kindsOfWork] = divideIntoLines(
        getValue(form, ["EmploymentPrimary", "info"]),
        FIELDS_WIDTH["employment.info"]
    )
    kindsOfWork.forEach((line, index) => {
        data[`employment.info-${index + 1}`] = line
    })

    // 3. Union
    data['employment.union'] = getValue(form, ["EmploymentPrimary", "union"])

    // Union info
    data["employment.unionInfo-1"] = getValue(form, ["EmploymentPrimary", "unionName"])
    data["employment.unionInfo-2"] = getValuesAsString(form, [
        ["EmploymentPrimary", "unionAddress", "address"],
        ["EmploymentPrimary", "unionAddress", "address2"],
        ["EmploymentPrimary", "unionAddress", "city"],
        ["EmploymentPrimary", "unionAddress", "state"],
        ["EmploymentPrimary", "unionAddress", "zip"]
    ])
    data["employment.unionInfo-3"] = `Monthly dues: ${format(getValueAsNumber(form, ["EmploymentPrimary", "unionDues"]), "currency")}`

    // 4. Are you currently a student?
    data["employment.student"] = getValue(form, ["Schools", "current"])

    // Date of graduation
    const dateOfGraduation = getValue(form, ["Schools", "dateOfGraduation"])
    data["employment.dateOfGraduation"] = dateOfGraduation && moment(dateOfGraduation).format('LL')

    // 5. Work reason
    data["employment.workReason"] = getValue(form, ["FinancialAffadavitTwo", "workReason"])

    const [workReasonDesc] = divideIntoLines(
        getValue(form, ["FinancialAffadavitTwo", "workReasonDesc"]),
        FIELDS_WIDTH["employment.workReasonDesc"]
    )
    workReasonDesc.forEach((line, index) => {
        data[`employment.workReasonDesc-${index + 1}`] = line
    })

    // 6. Workers' compensation
    data["employment.workersComp"] = getValue(form, ["FinancialAffadavitTwo", "workersComp"])

    data["employment.workersCompDesc"] = `${getValue(form, ["FinancialAffadavitTwo", "workersCompPayment"])}, Claim number: ${getValue(form, ["FinancialAffadavitTwo", "workersCompClaimNum"], "N/A")}`

    // 7. Unemployment benefits
    data["employment.unemploymentBenefits"] = getValue(form, ["FinancialAffadavitTwo", "unemployment"])

    const [unemploymentBenefitsDesc] = divideIntoLines(
        getValue(form, ["FinancialAffadavitTwo", "unemploymentDesc"]),
        FIELDS_WIDTH["employment.unemploymentBenefitsDesc"]
    )
    unemploymentBenefitsDesc.forEach((line, index) => {
        data[`employment.unemploymentBenefitsDesc-${index + 1}`] = line
    })

    // 8. Employment efforts
    data["employment.efforts"] = getValue(form, ["FinancialAffadavitTwo", "employmentEfforts"])

    const [effortsDescNo] = divideIntoLines(
        data["employment.efforts"] === 'no' &&
        getValue(form, ["FinancialAffadavitTwo", "employmentEffortsDesc"]),
        FIELDS_WIDTH["employment.effortsDescNo"]
    )
    effortsDescNo.forEach((line, index) => {
        data[`employment.effortsDescNo-${index + 1}`] = line
    })

    const [effortsDescYes] = divideIntoLines(
        data["employment.efforts"] === 'yes' &&
        getValue(form, ["FinancialAffadavitTwo", "employmentEffortsDesc"]),
        FIELDS_WIDTH["employment.effortsDescYes"]
    )
    effortsDescYes.forEach((line, index) => {
        data[`employment.effortsDescYes-${index + 1}`] = line
    })

    // D. INCOME
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

    const [cashBenefitsDetails] = divideIntoLines(
        data["income.cashBenefits"] === "yes" &&
        `Description: ${getValue(form, ["EmploymentPrimary", "cashBenefitsDetails"])}. The value of the benefit is ${format(getValue(form, ["EmploymentPrimary", "cashBenefitsAmount"]), 'currency')} per year.`,
        FIELDS_WIDTH["income.cashBenefitsDetails"]
    )
    cashBenefitsDetails.forEach((line, index) => {
        data[`income.cashBenefitsDetails-${index + 1}`] = line
    })

    // 3. Self-empployed
    const [selfEmploymentDesc] = divideIntoLines(
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

    const [prizeDesc] = divideIntoLines(
        data["income.prize"] === "yes" &&
        `Description: ${getValue(form, ["OtherIncome", "prizeDesc"])}. The value of the benefit is ${format(getValueAsNumber(form, ["OtherIncome", "prize"]), "currency")}.`,
        FIELDS_WIDTH["income.prizeDesc"]
    )
    prizeDesc.forEach((line, index) => {
        data[`income.prizeDesc-${index + 1}`] = line
    })

    // E. DEDUCTIONS AND EXPENSES
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

    const [extmedDesc] = divideIntoLines(
        data["deductions.extmed"] === "yes" &&
        `Description: ${getValue(form, ["AllowableDeductions", "extmed", "desc"])}. The total yearly expense is ${format(getValueAsNumber(form, ["AllowableDeductions", "extmed", "amount"]), "currency")}.`,
        FIELDS_WIDTH["deductions.extmedDesc"]
    )
    extmedDesc.forEach((line, index) => {
        data[`deductions.extmedDesc-${index + 1}`] = line
    })

    // 4. Extraordinary dical expense for yourself
    const [inhomeDesc] = divideIntoLines(
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
    const [otherExpensesTotal] = divideIntoLines(
        getValue(form, ["FinancialAffadavitThree", "otherExpenses"]) === "yes" &&
        getValue(form, ["FinancialAffadavitThree", "otherExpensesTotal"]),
        FIELDS_WIDTH["deductions.otherExpensesTotal"]
    )
    otherExpensesTotal.forEach((line, index) => {
        data[`deductions.otherExpensesTotal-${index + 1}`] = line
    })

    // 7. Has a court ordered you to make payments for restitution, damages, etc.? 
    data["deductions.courtOrder"] = getValue(form, ["FinancialAffadavitThree", "courtOrder"])

    // F. ANTICIPATED CHANGES / ADDITIONAL COMMENTS
    // 1. Anticipated Changes
    const [anticipatedChanges] = divideIntoLines(
        getValue(form, ["FinancialAffadavitThree", "expectedChanges"]) === "yes" &&
        getValue(form, ["FinancialAffadavitThree", "expectedChangesDesc"]),
        FIELDS_WIDTH["anticipatedChanges"]
    )
    anticipatedChanges.forEach((line, index) => {
        data[`anticipatedChanges-${index + 1}`] = line
    })

    // 2. Additional Comments
    const [additionalComments] = divideIntoLines(
        getValue(form, ["FinancialAffadavitThree", "comments"]) === "yes" &&
        getValue(form, ["FinancialAffadavitThree", "commentsDesc"]),
        FIELDS_WIDTH["additionalComments"]
    )
    additionalComments.forEach((line, index) => {
        data[`additionalComments-${index + 1}`] = line
    })

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

// Helpers
const divideIntoLines = (string, widths) => {
    const ADDENDUM_WIDTH = 700

    if (!string) return [["N/A"]]

    return Object.values(
        Object.values(
            string
                .split(" ")
                .reduce((lines, word) => {
                    // Get current number of lines
                    const length = Object.keys(lines).length
                    const current = length - 1 < 0 ? 0 : length - 1

                    // Set is addendum
                    const isAddendum = current >= widths.length

                    // Calculate number of words
                    const words = [lines[current] || "", word].join(" ").trim()

                    // Calculate width words
                    const width = pixelWidth(words, { font: 'Helvetica', size: 16 })

                    // Set max width field
                    const maxWidth = isAddendum ? ADDENDUM_WIDTH : widths[current]

                    // Set next number of page
                    const next = Math.floor(width / maxWidth) >= 1 ? current + 1 : current

                    return {
                        ...lines,
                        [next]: [lines[next] || "", word].join(" ").trim()
                    }
                }, {})
        ).reduce((lines, line, index) => {
            const key = index >= widths.length ? '1' : '0'
            return {
                ...lines,
                [key]: [
                    ...(lines[key] || []),
                    line
                ]
            }
        }, {})
    )
}

const getOtherIncome = (form, key, type) => {
    return getValueAsNumber(
      getValueAsArray(form, key).find(income => getValue(income, ["type"]) === type),
      ["amt"]
    )
  }

module.exports = { getAffidavit }