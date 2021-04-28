const supportTables = require('../assets/support-tables.json')
const { getValueAsNumber } = require('./helpers')
const { currency, format, add, multiply } = require('./currency')

// See https://dphhs.mt.gov/Portals/85/csed/documents/website2021cs4042CSGuidelinesTables.pdf

// TABLE 1
// PERSONAL ALLOWANCE PER YEAR (ARM 37.62.114)
// FOR EACH PARENT
const getPersonalAllowance = () => {
    return currency(getValueAsNumber(supportTables, ["table-1", "personal-allowance"]))
}

// TABLE 2
// PRIMARY CHILD SUPPORT ALLOWANCE PER YEAR (ARM 37.62.121)
const getAllowanceChildren = (child) => {
    return currency(getValueAsNumber(supportTables, ["table-2", "allowance-children", child - 1]))
}

// TABLE 2
// ANNUAL ALLOWANCE FOR OTHER CHILDREN (ARM 37.62.110)
const getAllowanceOtherChildren = (child) => {
    return currency(getValueAsNumber(supportTables, ["table-2", "allowance-other-children", child - 1]))
}

// TABLE 3
// LONG DISTANCE PARENTING ADJUSTMENT (ARM 37.62.130)
const getIRSBusinessMileageRate = () => {
    return currency(getValueAsNumber(supportTables, ["table-3", "irs-business-mileage-rate"]), { precision: 3 })
}

const getStandardExpense = () => {
    return currency(getValueAsNumber(supportTables, ["table-3", "standard-expense"]))
}

module.exports = {
    getPersonalAllowance,
    getAllowanceChildren,
    getAllowanceOtherChildren,
    getIRSBusinessMileageRate,
    getStandardExpense
}