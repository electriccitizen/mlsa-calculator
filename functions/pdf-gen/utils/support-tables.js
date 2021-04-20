const supportTables = require('../assets/support-tables.json')
const { getValueAsNumber } = require('../helpers')

// See https://dphhs.mt.gov/Portals/85/csed/documents/website2021cs4042CSGuidelinesTables.pdf

// TABLE 1
// PERSONAL ALLOWANCE PER YEAR (ARM 37.62.114)
// FOR EACH PARENT
const getPersonalAllowance = () => {
    return getValueAsNumber(supportTables, ["table-1", "personal-allowance"], 0)
}

// TABLE 2
// PRIMARY CHILD SUPPORT ALLOWANCE PER YEAR (ARM 37.62.121)
const getAllowanceChildren = (child) => {
    if (!child) return 0
    return getValueAsNumber(supportTables, ["table-2", "allowance-children", child - 1], 0)
}

// TABLE 2
// ANNUAL ALLOWANCE FOR OTHER CHILDREN (ARM 37.62.110)
const getAllowanceOtherChildren = (child) => {
    if (!child) return 0
    return getValueAsNumber(supportTables, ["table-2", "allowance-other-children", child - 1], 0)
}

// TABLE 3
// LONG DISTANCE PARENTING ADJUSTMENT (ARM 37.62.130)
const getIRSBusinessMileageRate = () => {
    return getValueAsNumber(supportTables, ["table-3", "irs-business-mileage-rate"], 0)
}

const getStandardExpense = () => {
    return getValueAsNumber(supportTables, ["table-3", "standard-expense"], 0)
}

module.exports = {
    getPersonalAllowance,
    getAllowanceChildren,
    getAllowanceOtherChildren,
    getIRSBusinessMileageRate,
    getStandardExpense
}