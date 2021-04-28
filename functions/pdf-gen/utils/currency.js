// Don't use a Dinero instance in this project outside of this file.
// You should use helper functions.
const Dinero = require('dinero.js')

// Compare if the value is a Dinero instance.
const isDinero = (amount) => amount instanceof Object && amount.getAmount

// Dinero instance factory.
const currency = (amount, rest = {}) => {
    if (isDinero(amount)) return amount
    return Dinero({ amount: parseInt((Number(amount) || 0) * 100), ...rest })
}

// Helper functions.
// Access
const getAmount = (currency) => currency.getAmount ? currency.getAmount() : currency

// Manipulation
const add = (a, b) => currency(a).add(currency(b))

const subtract = (a, b) => currency(a).subtract(currency(b))

const multiply = (amount, ...args) => args.reduce((a, b) => a.multiply(b), currency(amount))

const divide = (a, b) => currency(a).divide(b)

const sum = (array) => array.reduce((a, b) => a.add(currency(b)), currency())

const percentage = (a, b) => currency(a).percentage(b)

// Testing
const lt = (a, b) => currency(a).lessThan(currency(b))

const gt = (a, b) => currency(a).greaterThan(currency(b))

const isZero = (amount) => currency(amount).isZero()

const isPositive = (amount) => currency(amount).isPositive()

const isNegative = (amount) => currency(amount).isNegative()

const minimum = (...args) => Dinero.minimum(args.map(amount => currency(amount)))

const maximum = (...args) => Dinero.maximum(args.map(amount => currency(amount)))

// Conversion & formatting
const format = (amount) => currency(amount).toUnit().toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 })

const convertPrecision = (amount, newPrecision) => currency(amount).convertPrecision(newPrecision)

// Format Dinero objects into a string.
const formatData = (data) => {
    if (!data) return {}
    return (Array.isArray(data) ? data : Array(data)).map(nested => {
        return Object.keys(nested).reduce((acc, key) => {
            return {
                ...acc,
                [key]: isDinero(nested[key]) ?
                    format(nested[key]) :
                    nested[key]
            }
        }, {})
    })
}

module.exports = {
    currency,
    format,
    getAmount,
    convertPrecision,
    add,
    subtract,
    multiply,
    divide,
    sum,
    percentage,
    lt,
    gt,
    isZero,
    isPositive,
    isNegative,
    minimum,
    maximum,
    formatData
}