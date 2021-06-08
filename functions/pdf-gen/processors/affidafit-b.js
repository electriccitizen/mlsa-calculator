var moment = require("moment")
const { format, subtract } = require("../utils/currency")
const { getValue, getValueAsArray, getValueAsNumber, getValuesAsString, divideIntoLines, capitalize } = require("../utils/helpers")

// Static fields width in pixels
const FIELDS_WIDTH = {
    "children.insuranceOngoingDesc": [194, 733, 733, 733],
}

// B. CHILDREN
const getAffidavitB = (form) => {
    // Main
    let data = {}

    const primaryChildren = getValueAsArray(form, ["PrimaryChildren"]).filter(child => child.status === 'none')
    const otherChildren = getValueAsArray(form, ["OtherChildren"]).filter(child => child.status === 'none')

    // 1. List all of your natural and adopted children (do not include stepchildren)
    let listChildrenAddendum = []
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
        const name = getValuesAsString(child, [["fname"], ["lname"]]).trim() || "N/A"
        const dob = getValue(child, ["dob"], "N/A")
        const dobFormated = (dob && dob !== "N/A") ? moment(dob).format('MMMM D, YYYY') : "N/A"
        const housing = getValue(form, ["ChildExpenses", index, "housing"])
        const liveWith = housing === 'me' ?
            getValuesAsString(form, [["Primary", "fname"], ["Primary", "lname"]]).trim() || "N/A" :
            housing === 'otherparent' ?
                "Other parent" :
                housing === 'split' ?
                    "Both parents" :
                    getValue(child, ["otherHousing"], "N/A")
        const support = getValue(child, ["support"], "N/A")
        const supportAmount = getValueAsNumber(child, ["childSupportAmount"])

        if (childIndex <= 6) {
            // Child's Full Name
            data[`children.list.child-${childIndex}.name`] = name

            // Date of Birth Month/Day/Year
            data[`children.list.child-${childIndex}.dob`] = dobFormated

            // Who does child live with?
            data[`children.list.child-${childIndex}.housing`] = liveWith

            // Are you ordered to pay support for this child? 
            data[`children.list.child-${childIndex}.support`] = support
            data[`children.list.child-${childIndex}.supportAmount`] = format(supportAmount)
        } else {
            listChildrenAddendum.push([
                `Child's Full Name: ${name}`,
                `Date of Birth: ${dobFormated}`,
                `Who does child live with?: ${liveWith}`,
                `Are you ordered to pay support for this child?: ${capitalize(support)}`,
                `Support amount: ${format(supportAmount, "currency")}/month`
            ])
        }
    })

    // 2. Complete the table below for all expenses you pay and benefits you receive on behalf of all children shown in the previous table.
    let expensesAddendum = []
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
        const name = getValue(child, ["fname"], "N/A")
        const dayCareCosts = getValueAsNumber(child, ["depcareAmount"])
        const unreimbursedMedicalExpenses = getValueAsNumber(child, ["medicalAmount"])
        const dependentsBenefits = getValueAsNumber(child, ["benefits"])
        const days = "N/A"
        const mileage = "N/A"
        const otherTransportationCosts = "N/A"

        if (childIndex <= 5) {
            // Child's First Name
            data[`children.expenses.child-${childIndex}.firstName`] = name

            // Annual Day Care Costs
            data[`children.expenses.child-${childIndex}.dayCareCosts`] = format(dayCareCosts)

            // Annual Unreimbursed Medical Expenses
            data[`children.expenses.child-${childIndex}.unreimbursedMedicalExpenses`] = format(unreimbursedMedicalExpenses)

            // Annual Dependent's Benefits Received
            data[`children.expenses.child-${childIndex}.dependentsBenefits`] = format(dependentsBenefits)

            // How many days does child spend with you per year?
            data[`children.expenses.child-${childIndex}.days`] = days

            // Annual Miles Driven for Long Distance Parenting
            data[`children.expenses.child-${childIndex}.mileage`] = mileage

            // Other Transportation Costs for Long Distance Parenting
            data[`children.expenses.child-${childIndex}.otherTransportationCosts`] = otherTransportationCosts
        } else {
            expensesAddendum.push([
                `Child's First Name: ${name}`,
                `Annual Day Care Costs: ${format(dayCareCosts, "currency")}`,
                `Annual Unreimbursed Medical Expenses: ${format(unreimbursedMedicalExpenses, "currency")}`,
                `Annual Dependent's Benefits Received*: ${format(dependentsBenefits, "currency")}`,
                `How many days does child spend with you per year?**: ${days}`,
                `Annual Miles Driven for Long Distance Parenting: ${mileage}`,
                `Other Transportation Costs for Long Distance Parenting***: ${otherTransportationCosts}`
            ])
        }
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

    let policiesAddendum = []
    const policies = getValueAsArray(form, ["HealthInsurancePolicies"])
    policies.forEach((policy, index) => {
        const policyIndex = index + 1
        const covered = getValue(policy, ["covered"], "N/A")
        const company = getValue(policy, ["company"], "N/A")
        const address1 = getValuesAsString(policy, [
            ["address"],
            ["address2"]
        ], { separator: "," }).trim() || "N/A"
        const address2 = getValuesAsString(policy, [
            ["city"],
            ["state"],
            ["zip"]
        ], { separator: "," }).trim() || "N/A"
        const policyNumber = getValue(policy, ["policyNumber"], "N/A")
        const certNumber = getValue(policy, ["certNumber"], "N/A")
        const totalCost = getValueAsNumber(policy, ["totalCost"])
        const adultPortion = subtract(
            getValueAsNumber(policy, ["totalCost"]),
            getValueAsNumber(policy, ["childPortion"]),
        )
        const childPortion = getValueAsNumber(policy, ["childPortion"])
        const portionYou = subtract(
            getValueAsNumber(policy, ["totalCost"]),
            getValueAsNumber(policy, ["groupPortion"]),
        )
        const portionEmployer = getValueAsNumber(policy, ["groupPortion"])

        if (policyIndex <= 1) {
            // Name everyone who is covered by this policy:
            data["children.insurancePolicies.covered"] = covered

            // Insurance Co. Name:
            data["children.insurancePolicies.company"] = company

            // Address:
            data["children.insurancePolicies.address-1"] = address1
            data["children.insurancePolicies.address-2"] = address2

            // Policy Number:
            data["children.insurancePolicies.policyNumber"] = policyNumber

            // Certificate Number:
            data["children.insurancePolicies.certNumber"] = certNumber

            // Total cost of health insurance premium per month, including your children.
            data["children.insurancePolicies.totalCost"] = format(totalCost)

            // Adult's portion of premium.
            data["children.insurancePolicies.adultPortion"] = format(adultPortion)

            // Child(ren)'s portion of premium.
            data["children.insurancePolicies.childPortion"] = format(childPortion)

            // Portion of premium to be paid by you each month.
            data["children.insurancePolicies.portionYou"] = format(portionYou)

            // Portion of premium to be paid by employer or other group each month.
            data["children.insurancePolicies.portionEmployer"] = format(portionEmployer)
        } else {
            policiesAddendum.push([
                `Name everyone who is covered by this policy: ${covered}`,
                `Insurance Co. Name: ${company}`,
                `Address: ${address1}, ${address2}`,
                `Policy Number: ${policyNumber}`,
                `Certificate Number: ${certNumber}`,
                `Total cost of health insurance premium per month, including your children: ${format(totalCost, "currency")}`,
                `Adult's portion of premium: ${format(adultPortion, "currency")}`,
                `Child(ren)'s portion of premium: ${format(childPortion, "currency")}`,
                `Portion of premium to be paid by you each month: ${format(portionYou, "currency")}`,
                `Portion of premium to be paid by employer or other group each month: ${format(portionEmployer, "currency")}`
            ])
        }
    })

    if(listChildrenAddendum.length > 0) {
        data["children.list.addendum"] = "Continued in Financial Affidavit Addendum"
    }

    if(expensesAddendum.length > 0) {
        data["children.expenses.addendum"] = "Continued in Financial Affidavit Addendum"
    }

    if(policiesAddendum.length > 0) {
        data["children.policies.addendum"] = "Continued in Financial Affidavit Addendum"
    }

    let addendum = [
        listChildrenAddendum.length > 0 && ['1. List all of your natural and adopted children (do not include stepchildren), continued:', listChildrenAddendum],
        expensesAddendum.length > 0 && ['2. All expenses you pay and benefits you receive on behalf of all children, continued:', expensesAddendum],
        insuranceOngoingDescAddendum && ['4. If any of the children listed above have ongoing medical expenses, please describe, continued:', insuranceOngoingDescAddendum],
        policiesAddendum.length > 0 && ['5. Additional Health Insurance Policies, continued:', policiesAddendum]
    ].filter(a => !!a)

    return {
        data,
        addendum: [
            ...(addendum.length > 0 ? [
                ['B. CHILDREN'],
                ...addendum
            ]: [])
        ]
    }
}

module.exports = { getAffidavitB }